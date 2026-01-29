/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Client } from "@stomp/stompjs";
import { toast } from "react-toastify";
import type {
  LiveCreator,
  LiveNotification,
  WebSocketContextType,
} from "@/lib/types";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { useGetData } from "@/hooks/apiCalls";
import { getWebSocketUrl } from "@/utils/helper";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const [isConnected, setIsConnected] = useState(false);
  const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
    new Map(),
  );

  const stompClientRef = useRef<Client | null>(null);
  const liveNotifySubscriptionRef = useRef<any>(null);

  // Fetch currently live hosts
  const { data: getLiveHosts, refetch: refetchLiveHosts } = useGetData({
    url: `live/hosts`,
    queryKey: ["GetLiveHosts"],
    enabled: !!userObject,
    refetchInterval: 30000,
  });

  const WS_URL = getWebSocketUrl();

  // Initialize WebSocket Connection
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token === undefined) return;

    const client = new Client({
      brokerURL: WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("✅ WebSocket connected");
        setIsConnected(true);
        // Subscribe to live notifications
        subscribeToLiveNotifications();
        // Sync live hosts data on connect
        refetchLiveHosts();
      },

      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
        setIsConnected(false);
      },

      onWebSocketClose: () => {
        console.log("🔌 WebSocket closed");
        setIsConnected(false);
        liveNotifySubscriptionRef.current = null;
      },

      onWebSocketError: (_error) => {
        console.error("❌ WebSocket error");
        setIsConnected(false);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      if (liveNotifySubscriptionRef.current) {
        liveNotifySubscriptionRef.current.unsubscribe();
        liveNotifySubscriptionRef.current = null;
      }

      if (client.active) {
        console.log("⏹️ Deactivating WebSocket");
        client.deactivate();
      }
    };
  }, []);

  // Subscribe to live notifications
  const subscribeToLiveNotifications = () => {
    const client = stompClientRef.current;

    if (!client || !client.connected) {
      console.warn("⚠️ Cannot subscribe: WebSocket not connected");
      return;
    }

    if (liveNotifySubscriptionRef.current) {
      console.log("ℹ️ Already subscribed to live notifications");
      return;
    }

    const topic = "/user/queue/live-notify";
    console.log(`🔔 Subscribing to: ${topic}`);

    try {
      const subscription = client.subscribe(topic, (message) => {
        console.log("🎉 Live notification received!");

        try {
          const payload: LiveNotification = JSON.parse(message.body);
          handleLiveNotification(payload);
        } catch (error) {
          console.error("❌ Error parsing live notification:", error);
        }
      });

      liveNotifySubscriptionRef.current = subscription;
      console.log(`✅ Subscribed to live notifications`);
    } catch (error) {
      console.error(`❌ Error subscribing to live notifications:`, error);
    }
  };

  // Sync live hosts data from API with local state
  useEffect(() => {
    if (getLiveHosts?.data) {
      const liveHostsData = Array.isArray(getLiveHosts?.data)
        ? getLiveHosts?.data
        : getLiveHosts?.data?.content || [];
      setLiveCreators((prev) => {
        const updated = new Map(prev);

        // Add or update live hosts from the API
        liveHostsData.forEach((host: any) => {
          const creatorId = host?.creatorID;
          const sessionId = host?.session;

          if (creatorId) {
            // Only update if not already in the map or if session changed
            const existing = updated.get(creatorId);
            if (!existing || existing.sessionId !== sessionId) {
              updated.set(creatorId, {
                creatorId,
                sessionId,
              });
            }
          }
        });

        return updated;
      });

      console.log(`📊 Synced ${liveHostsData.length} live hosts from API`);
    }
  }, [getLiveHosts]);

  // Handle live notifications from WebSocket
  const handleLiveNotification = (payload: LiveNotification) => {
    const creatorId = payload?.creatorId;
    if (!creatorId) {
      console.warn("⚠️ Live notification missing creatorId");
      return;
    }

    console.log(`🔴 Live notification for creator: ${creatorId}`, payload);

    // Check if already marked as live
    const alreadyLive = liveCreators.has(creatorId);

    setLiveCreators((prev) => {
      const updated = new Map(prev);

      updated.set(creatorId, {
        creatorId,
        sessionId: (payload as any)?.session || (payload as any)?.sessionId,
      });

      return updated;
    });

    // Show toast notification for new live streams
    if (!alreadyLive) {
      toast.info(`🔴 ${creatorId} is now LIVE!`, {
        autoClose: 7000,
        onClick: () => {
          // Navigate to live stream if needed
          const session = liveCreators.get(creatorId);
          if (session?.sessionId) {
            // Add navigation logic here
            console.log(`Navigate to session: ${session.sessionId}`);
          }
        },
      });
    }
  };

  // Check if a creator is currently live
  const isCreatorLive = (creatorId: string): boolean => {
    return liveCreators.has(creatorId);
  };

  // Get live session info for a creator
  const getLiveSession = (creatorId: string): LiveCreator | undefined => {
    return liveCreators.get(creatorId);
  };

  // Send message helper
  const sendMessage = (destination: string, body: any) => {
    const client = stompClientRef.current;

    if (!client || !client.connected) {
      console.error("❌ Cannot send: WebSocket not connected");
      toast.error("Not connected to server");
      return;
    }

    try {
      client.publish({
        destination,
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  const value: WebSocketContextType = {
    isConnected,
    client: stompClientRef.current,
    liveCreators,
    sendMessage,
    isCreatorLive,
    getLiveSession,
    refetchLiveHosts,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
