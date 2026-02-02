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
  const hasSubscribedThisConnection = useRef(false);

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
    if (!token) return;

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

        // ✅ CHANGED: Reset subscription tracking on new connection
        hasSubscribedThisConnection.current = false;

        // ✅ IMPROVED: Add small delay to ensure connection is fully ready
        setTimeout(() => {
          subscribeToLiveNotifications();
          refetchLiveHosts();
        }, 100);
      },

      // onStompError: (frame) => {
      //   console.error("❌ STOMP Error:", frame);
      //   setIsConnected(false);
      //   liveNotifySubscriptionRef.current = null;
      // },

      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
        setIsConnected(false);
        // ✅ CHANGED: Reset tracking flags
        hasSubscribedThisConnection.current = false;
        liveNotifySubscriptionRef.current = null;
      },

      onWebSocketClose: () => {
        console.log("🔌 WebSocket closed");
        setIsConnected(false);
        // ✅ CHANGED: Reset tracking flags
        hasSubscribedThisConnection.current = false;
        liveNotifySubscriptionRef.current = null;
      },

      onWebSocketError: (_error) => {
        console.error("❌ WebSocket error");
        setIsConnected(false);
        // ✅ CHANGED: Reset tracking flags
        hasSubscribedThisConnection.current = false;
        liveNotifySubscriptionRef.current = null;
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

  // ✅ IMPROVED: Subscribe to live notifications with retry logic
  const subscribeToLiveNotifications = () => {
    const client = stompClientRef.current;

    if (!client || !client.connected) {
      console.warn("⚠️ Cannot subscribe: WebSocket not connected");
      return;
    }

    // ✅ CHANGED: Check if we already have an active subscription on THIS connection
    if (
      liveNotifySubscriptionRef.current &&
      hasSubscribedThisConnection.current
    ) {
      console.log(
        "ℹ️ Already subscribed to /user/queue/live-notify on this connection",
      );
      return;
    }

    // ✅ ADDED: Unsubscribe from any stale subscription before creating new one
    if (liveNotifySubscriptionRef.current) {
      console.log("🔄 Cleaning up stale subscription before re-subscribing");
      try {
        liveNotifySubscriptionRef.current.unsubscribe();
      } catch (e) {
        console.warn("Failed to unsubscribe from stale subscription:", e);
      }
      liveNotifySubscriptionRef.current = null;
    }

    const topic = "/user/queue/live-notify";
    console.log("🔔 Subscribing to:", topic);

    try {
      liveNotifySubscriptionRef.current = client.subscribe(topic, (message) => {
        console.log(`🎉 Live notification received on ${topic}`);
        console.log("📨 Raw message:", message.body);

        try {
          const payload: LiveNotification = JSON.parse(message.body);
          console.log("📦 Parsed payload:", payload);
          handleLiveNotification(payload);
        } catch (error) {
          console.error(
            "❌ Error parsing live notification:",
            error,
            message.body,
          );
        }
      });

      // ✅ ADDED: Mark that we've subscribed on this connection
      hasSubscribedThisConnection.current = true;
      console.log("✅ Successfully subscribed to live notifications");
    } catch (error) {
      console.error("❌ Error subscribing to live notifications:", error);
      hasSubscribedThisConnection.current = false;
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
    console.log(payload);
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
