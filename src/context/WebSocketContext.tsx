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
import type { LiveNotification, WebSocketContextType } from "@/lib/types";

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
  const [isConnected, setIsConnected] = useState(false);
  const [followedCreators, setFollowedCreators] = useState<string[]>([]);

  const stompClientRef = useRef<Client | null>(null);
  const subscriptionsRef = useRef<Map<string, any>>(new Map());

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
        toast.success("Connected to WebSocket");

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
    const fetchFollowedCreators = async () => {
      try {
        const token = localStorage.getItem("authToken");

        // TODO: Replace with your actual API endpoint
        // const response = await fetch('/api/users/me/following', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        // const data = await response.json();
        // const creatorIds = data.map((c: any) => c.id);

        // Mock data for testing
        const creatorIds: string[] = [
          // Add test creator IDs here
        ];

        setFollowedCreators(creatorIds);
        console.log("👥 Followed creators loaded:", creatorIds.length);
      } catch (error) {
        console.error("❌ Error fetching followed creators:", error);
      }
    };

    fetchFollowedCreators();
  }, []);

  // Subscribe to all followed creators
  const subscribeToAllFollowedCreators = () => {
    followedCreators.forEach((creatorId) => {
      subscribeToCreator(creatorId);
    });
  };

  // Subscribe to a specific creator
  const subscribeToCreator = (creatorId: string) => {
    const client = stompClientRef.current;

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
        console.log(`📬 Creator ${creatorId} went live:`, message.body);

        try {
          const payload: LiveNotification = JSON.parse(message.body);
          handleCreatorLiveNotification(creatorId, payload);
        } catch {
          handleCreatorLiveNotification(creatorId, { creatorId });
        }
      });

      subscriptionsRef.current.set(creatorId, subscription);
      console.log(`✅ Subscribed to: ${creatorId}`);
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
    console.log("🎬 Creator went live:", creatorId, payload);

    toast.info(`🔴 ${payload.creatorName || creatorId} is now LIVE!`, {
      autoClose: 7000,
      onClick: () => {
        // TODO: Navigate to live stream
        console.log("Navigate to stream:", payload.sessionId || creatorId);
        // window.location.href = `/live/${payload.sessionId}`;
      },
    });
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
    subscribeToCreator,
    unsubscribeFromCreator,
    sendMessage,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
