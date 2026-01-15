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

interface WebSocketProviderProps {
  children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined
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
  // Get user info from Redux
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const isCreator = userObject?.role === "CREATOR";

  const [isConnected, setIsConnected] = useState(false);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);
  const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
    new Map()
  );

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<Map<string, any>>(new Map());

  // Fetch subscriptions for creators (who follows them)
  //   const { data: getCreatorSubscriptions } = useGetData({
  //     url: `subscriptions/creator/${userObject?.usid}/subscribers?page=0&size=20`,
  //     queryKey: ["GetSubscriptions", userObject?.usid],
  //     enabled: !!userObject?.usid && isCreator,
  //   });

  // Fetch subscriptions for viewers (who they follow)
  const { data: getViewerSubscriptions } = useGetData({
    url: `subscriptions?page=0&size=20&subscriberEmail=${userObject?.email}`,
    queryKey: ["GetSubscriptionsForViewer", userObject?.email],
    enabled: !!userObject?.email && !isCreator,
  });

  const getWebSocketUrl = () => {
    if (import.meta.env.DEV) {
      return "ws://localhost:3000/api/v1/ws";
    }
    return (
      import.meta.env.VITE_WS_URL || "ws://fanfam.biyartech.com:7639/api/v1/ws"
    );
  };

  const WS_URL = getWebSocketUrl();

  // Initialize WebSocket Connection
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warn("⚠️ No auth token - WebSocket not initialized");
      return;
    }

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
        setIsConnected(true);
        // Re-subscribe to all followed creators after reconnect
        subscribeToAllFollowedCreators();
      },

      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
        setIsConnected(false);
      },

      onWebSocketClose: () => {
        setIsConnected(false);
      },

      onWebSocketError: (_error) => {
        setIsConnected(false);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
      subscriptionsRef.current.clear();

      if (client.active) {
        console.log("⏹️ Deactivating WebSocket");
        client.deactivate();
      }
    };
  }, []);

  // Fetch followed creators
  useEffect(() => {
    // For viewers: Get list of creators they follow
    if (!isCreator && getViewerSubscriptions) {
      try {
        const creatorIds: string[] = (
          getViewerSubscriptions?.data?.content ?? []
        )
          .map((sub: any) => sub?.creator?.usid)
          .filter((id: any): id is string => Boolean(id));

        setFollowedCreators(creatorIds);
      } catch (error) {
        console.error("❌ Error processing viewer subscriptions:", error);
      }
    }

    // For creators: They might want to follow other creators too
    // You can add similar logic here if needed
  }, [getViewerSubscriptions, isCreator]);

  // Subscribe to all followed creators
  const subscribeToAllFollowedCreators = () => {
    followedCreators?.forEach((creatorId) => {
      subscribeToCreator(creatorId);
    });
  };

  // Subscribe to a specific creator
  const subscribeToCreator = (creatorId: string) => {
    const client = stompClientRef.current;
    console.log(creatorId);
    if (!client || !client.connected) {
      console.warn("⚠️ Cannot subscribe: WebSocket not connected");
      return;
    }

    if (subscriptionsRef.current.has(creatorId)) {
      console.log(`ℹ️ Already subscribed to: ${creatorId}`);
      return;
    }

    const topic = `/topic/live/${creatorId}/stream`;
    console.log(`🔔 Subscribing to: ${topic}`);

    try {
      const subscription = client.subscribe(topic, (message) => {
        // This callback is ONLY called when backend sends a message to this topic
        console.log("🎉 MESSAGE RECEIVED!", subscription.id);
        console.log(`📬 Creator ${creatorId} went live:`, message.body);
        try {
          const payload: LiveNotification = JSON.parse(message.body);
          handleCreatorLiveNotification(creatorId, payload);
        } catch {
          handleCreatorLiveNotification(creatorId, { creatorId });
        }
      });

      subscriptionsRef.current.set(creatorId, subscription);
      //   console.log(`✅ Subscribed to: ${creatorId}`);
    } catch (error) {
      console.error(`❌ Error subscribing to ${creatorId}:`, error);
    }
  };

  // Unsubscribe from a creator
  const unsubscribeFromCreator = (creatorId: string) => {
    const subscription = subscriptionsRef.current.get(creatorId);

    if (subscription) {
      console.log(`🔕 Unsubscribing from: ${creatorId}`);
      subscription.unsubscribe();
      subscriptionsRef.current.delete(creatorId);
    }
  };

  // Handle live notifications
  const handleCreatorLiveNotification = (
    creatorId: string,
    payload: LiveNotification
  ) => {
    console.log("🎬 Creator live notification:", creatorId, payload);

    if (payload.status === "ended" || !payload.sessionId) {
      // Remove from live creators
      setLiveCreators((prev) => {
        const updated = new Map(prev);
        updated.delete(creatorId);
        return updated;
      });

      toast.info(`${payload.creatorName || creatorId}'s live stream has ended`);
      return;
    }

    // Add to live creators
    setLiveCreators((prev) => {
      const updated = new Map(prev);
      updated.set(creatorId, {
        creatorId,
        sessionId: payload.sessionId!,
        creatorName: payload.creatorName,
        startedAt: Date.now(),
      });
      return updated;
    });

    toast.info(`🔴 ${payload.creatorName || creatorId} is now LIVE!`, {
      autoClose: 7000,
      onClick: () => {
        // TODO: Navigate to live stream
        console.log("Navigate to stream:", payload.sessionId);
        // window.location.href = `/live/${payload.sessionId}`;
      },
    });
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
      console.log(`📤 Sent to ${destination}:`, body);
    } catch (error) {
      console.error("❌ Error sending message:", error);
    }
  };

  // Auto-subscribe when followedCreators changes
  useEffect(() => {
    if (!isConnected) return;

    const currentSubs = new Set(subscriptionsRef.current.keys());
    const newCreators = new Set(followedCreators);

    // Subscribe to new creators
    followedCreators.forEach((creatorId) => {
      if (!currentSubs.has(creatorId)) {
        subscribeToCreator(creatorId);
      }
    });

    // Unsubscribe from unfollowed creators
    currentSubs.forEach((creatorId) => {
      if (!newCreators.has(creatorId)) {
        unsubscribeFromCreator(creatorId);
      }
    });
  }, [followedCreators, isConnected]);

  const value: WebSocketContextType = {
    isConnected,
    client: stompClientRef.current,
    liveCreators,
    subscribeToCreator,
    unsubscribeFromCreator,
    sendMessage,
    isCreatorLive,
    getLiveSession,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
