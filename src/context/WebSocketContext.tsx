// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */

// import React, {
//   createContext,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import { Client } from "@stomp/stompjs";
// import { toast } from "react-toastify";
// import type {
//   LiveCreator,
//   LiveNotification,
//   WebSocketContextType,
// } from "@/lib/types";
// import type { RootState } from "@/lib/store";
// import { useAppSelector } from "@/lib/hook";
// import { useGetData } from "@/hooks/apiCalls";

// interface WebSocketProviderProps {
//   children: React.ReactNode;
// }

// const WebSocketContext = createContext<WebSocketContextType | undefined>(
//   undefined,
// );

// export const useWebSocket = () => {
//   const context = useContext(WebSocketContext);
//   if (!context) {
//     throw new Error("useWebSocket must be used within WebSocketProvider");
//   }
//   return context;
// };

// export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
//   children,
// }) => {
//   // Get user info from Redux
//   const { userObject } = useAppSelector((state: RootState) => state.auth);
//   const isCreator = userObject?.role === "CREATOR";

//   const [isConnected, setIsConnected] = useState(false);
//   const [followedCreators, setFollowedCreators] = useState<string[]>([]);
//   const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
//     new Map(),
//   );

//   const stompClientRef = useRef<Client | null>(null);
//   const subscriptionsRef = useRef<Map<string, any>>(new Map());

//   // Fetch subscriptions for creators (who follows them)
//   //   const { data: getCreatorSubscriptions } = useGetData({
//   //     url: `subscriptions/creator/${userObject?.usid}/subscribers?page=0&size=20`,
//   //     queryKey: ["GetSubscriptions", userObject?.usid],
//   //     enabled: !!userObject?.usid && isCreator,
//   //   });

//   // Fetch subscriptions for viewers (who they follow)
//   const { data: getViewerSubscriptions } = useGetData({
//     url: `subscriptions?page=0&size=20&subscriberEmail=${userObject?.email}`,
//     queryKey: ["GetSubscriptionsForViewer", userObject?.email],
//     enabled: !!userObject?.email && !isCreator,
//   });

//   const getWebSocketUrl = () => {
//     if (import.meta.env.DEV) {
//       return "ws://localhost:3000/api/v1/ws";
//     }
//     return (
//       import.meta.env.VITE_WS_URL || "ws://fanfam.biyartech.com:7639/api/v1/ws"
//     );
//   };

//   const WS_URL = getWebSocketUrl();

//   // Initialize WebSocket Connection
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.warn("⚠️ No auth token - WebSocket not initialized");
//       return;
//     }

//     const client = new Client({
//       brokerURL: WS_URL,
//       connectHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//       debug: (str) => {
//         console.log("STOMP Debug:", str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,

//       onConnect: () => {
//         setIsConnected(true);
//         // Re-subscribe to all followed creators after reconnect
//         subscribeToAllFollowedCreators();
//       },

//       onStompError: (frame) => {
//         console.error("❌ STOMP Error:", frame);
//         setIsConnected(false);
//       },

//       onWebSocketClose: () => {
//         setIsConnected(false);
//       },

//       onWebSocketError: (_error) => {
//         setIsConnected(false);
//       },
//     });

//     client.activate();
//     stompClientRef.current = client;

//     return () => {
//       subscriptionsRef.current.forEach((sub) => sub.unsubscribe());
//       subscriptionsRef.current.clear();

//       if (client.active) {
//         console.log("⏹️ Deactivating WebSocket");
//         client.deactivate();
//       }
//     };
//   }, []);

//   // Fetch followed creators
//   useEffect(() => {
//     // For viewers: Get list of creators they follow
//     // if (!isCreator && getViewerSubscriptions) {
//     //   try {
//     //     const creatorIds: string[] = (
//     //       getViewerSubscriptions?.data?.content ?? []
//     //     )
//     //       .map((sub: any) => sub?.creator?.usid)
//     //       .filter((id: any): id is string => Boolean(id));

//     //     setFollowedCreators(creatorIds);
//     //   } catch (error) {
//     //     console.error("❌ Error processing viewer subscriptions:", error);
//     //   }
//     // }
//     sendMessage("/queue/live-notify", {});
//   }, []);

//   // Subscribe to all followed creators
//   const subscribeToAllFollowedCreators = () => {
//     followedCreators?.forEach((creatorId) => {
//       subscribeToCreator(creatorId);
//     });
//   };

//   // Subscribe to a specific creator
//   const subscribeToCreator = (creatorId: string) => {
//     const client = stompClientRef.current;
//     console.log(creatorId);
//     if (!client || !client.connected) {
//       console.warn("⚠️ Cannot subscribe: WebSocket not connected");
//       return;
//     }

//     if (subscriptionsRef.current.has(creatorId)) {
//       console.log(`ℹ️ Already subscribed to: ${creatorId}`);
//       return;
//     }

//     const topic = `/topic/live/${creatorId}/stream`;
//     // console.log(`🔔 Subscribing to: ${topic}`);

//     try {
//       const subscription = client.subscribe(topic, (message) => {
//         // This callback is ONLY called when backend sends a message to this topic
//         // console.log("🎉 MESSAGE RECEIVED!", subscription.id);

//         try {
//           const payload: LiveNotification = JSON.parse(message.body);
//           handleCreatorLiveNotification(creatorId, payload);
//         } catch {
//           handleCreatorLiveNotification(creatorId, { creatorId });
//         }
//       });

//       subscriptionsRef.current.set(creatorId, subscription);
//       //   console.log(`✅ Subscribed to: ${creatorId}`);
//     } catch (error) {
//       console.error(`❌ Error subscribing to ${creatorId}:`, error);
//     }
//   };

//   // Unsubscribe from a creator
//   const unsubscribeFromCreator = (creatorId: string) => {
//     const subscription = subscriptionsRef.current.get(creatorId);

//     if (subscription) {
//       console.log(`🔕 Unsubscribing from: ${creatorId}`);
//       subscription.unsubscribe();
//       subscriptionsRef.current.delete(creatorId);
//     }
//   };

//   // Handle live notifications

//   const handleCreatorLiveNotification = (
//     creatorIdFromTopic: string,
//     payload: LiveNotification,
//   ) => {
//     // Use payload.creatorId if present; otherwise fall back to the topic param
//     const creatorId = payload?.creatorId || creatorIdFromTopic;
//     if (!creatorId) return;
//     // console.log(payload);
//     // If already marked live, don't spam toast / reset startedAt
//     const alreadyLive = liveCreators.has(creatorId);

//     setLiveCreators((prev) => {
//       const updated = new Map(prev);

//       if (!updated.has(creatorId)) {
//         updated.set(creatorId, {
//           creatorId,
//           sessionId: (payload as any)?.session || (payload as any)?.sessionId,
//         });
//       }

//       return updated;
//     });

//     if (!alreadyLive) {
//       toast.info(`🔴 ${creatorId} is now LIVE!`, {
//         autoClose: 7000,
//         onClick: () => {
//           // You can navigate only if you can derive sessionId elsewhere
//         },
//       });
//     }
//   };

//   // Check if a creator is currently live
//   const isCreatorLive = (creatorId: string): boolean => {
//     console.log("is live", creatorId);
//     return liveCreators.has(creatorId);
//   };

//   // Get live session info for a creator
//   const getLiveSession = (creatorId: string): LiveCreator | undefined => {
//     return liveCreators.get(creatorId);
//   };

//   // Send message helper
//   const sendMessage = (destination: string, body: any) => {
//     const client = stompClientRef.current;

//     if (!client || !client.connected) {
//       console.error("❌ Cannot send: WebSocket not connected");
//       toast.error("Not connected to server");
//       return;
//     }

//     try {
//       client.publish({
//         destination,
//         body: JSON.stringify(body),
//       });
//       console.log(`📤 Sent to ${destination}:`, body);
//     } catch (error) {
//       console.error("❌ Error sending message:", error);
//     }
//   };

//   // Auto-subscribe when followedCreators changes
//   useEffect(() => {
//     if (!isConnected) return;

//     const currentSubs = new Set(subscriptionsRef.current.keys());
//     const newCreators = new Set(followedCreators);

//     // Subscribe to new creators
//     followedCreators.forEach((creatorId) => {
//       if (!currentSubs.has(creatorId)) {
//         subscribeToCreator(creatorId);
//       }
//     });

//     // Unsubscribe from unfollowed creators
//     currentSubs.forEach((creatorId) => {
//       if (!newCreators.has(creatorId)) {
//         unsubscribeFromCreator(creatorId);
//       }
//     });
//   }, [followedCreators, isConnected]);

//   const value: WebSocketContextType = {
//     isConnected,
//     client: stompClientRef.current,
//     liveCreators,
//     subscribeToCreator,
//     unsubscribeFromCreator,
//     sendMessage,
//     isCreatorLive,
//     getLiveSession,
//   };

//   return (
//     <WebSocketContext.Provider value={value}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

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
// import type { RootState } from "@/lib/store";
// import { useAppSelector } from "@/lib/hook";

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
  // Get user info from Redux
  // const { userObject } = useAppSelector((state: RootState) => state.auth);
  // const isCreator = userObject?.role === "CREATOR";

  const [isConnected, setIsConnected] = useState(false);
  const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
    new Map(),
  );

  const stompClientRef = useRef<Client | null>(null);
  const liveNotifySubscriptionRef = useRef<any>(null);

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

    if (token === undefined) return;
    // if (!token) {
    //   toast.warn("⚠️ No auth token - WebSocket not initialized");
    //   return;
    // }

    const client = new Client({
      brokerURL: WS_URL,
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      debug: (str) => {
        console.log("STOMP Debug:", str);
      },
      reconnectDelay: 5000,
      // reconnectDelay: 500000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("✅ WebSocket Connected");
        setIsConnected(true);
        // Subscribe to live notifications after connection
        subscribeToLiveNotifications();
      },

      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
        setIsConnected(false);
      },

      onWebSocketClose: () => {
        console.log("🔌 WebSocket Closed");
        setIsConnected(false);
      },

      onWebSocketError: (error) => {
        console.error("❌ WebSocket Error:", error);
        setIsConnected(false);
      },
    });

    client.activate();
    stompClientRef.current = client;

    return () => {
      // Unsubscribe from live notifications
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

  // Subscribe to live notifications queue
  const subscribeToLiveNotifications = () => {
    const client = stompClientRef.current;

    if (!client || !client.connected) {
      console.warn("⚠️ Cannot subscribe: WebSocket not connected");
      return;
    }

    // Unsubscribe if already subscribed
    if (liveNotifySubscriptionRef.current) {
      console.log("ℹ️ Already subscribed to live notifications");
      return;
    }

    const destination = "/user/queue/live-notify";
    console.log(`🔔 Subscribing to (from websocket): ${destination}`);

    try {
      const subscription = client.subscribe(destination, (message) => {
        console.log("🎉 Live notification received!");

        try {
          const payload: LiveNotification = JSON.parse(message.body);
          console.log("📦 Notification payload:", payload);
          handleLiveNotification(payload);
        } catch (error) {
          console.error("❌ Error parsing notification:", error);
        }
      });

      liveNotifySubscriptionRef.current = subscription;
      // console.log(
      //   `✅ Subscribed to /user/queue/live-notify - ready to receive notifications`,
      // );
    } catch (error) {
      console.error(`❌ Error subscribing to live notifications:`, error);
    }
  };

  // Handle live notifications
  const handleLiveNotification = (payload: LiveNotification) => {
    const creatorId = payload?.creatorId;

    if (!creatorId) {
      console.warn("⚠️ Received notification without creatorId");
      return;
    }

    console.log(`🔴 Creator ${creatorId} is going live!`);

    // Check if already marked as live
    const alreadyLive = liveCreators.has(creatorId);

    // Update live creators map
    setLiveCreators((prev) => {
      const updated = new Map(prev);

      updated.set(creatorId, {
        sessionId: (payload as any)?.session || (payload as any)?.sessionId,
        // Add any other fields from payload
        ...payload,
      });

      return updated;
    });

    // Show toast notification only if not already live
    if (!alreadyLive) {
      const creatorName = (payload as any)?.creatorName || creatorId;

      toast.info(`🔴 ${creatorName} is now LIVE!`, {
        autoClose: 7000,
        onClick: () => {
          // Navigate to live stream
          const sessionId =
            (payload as any)?.session || (payload as any)?.sessionId;
          if (sessionId) {
            // window.location.href = `/live/${sessionId}`;
            console.log(`Navigate to: /live/${sessionId}`);
          }
        },
      });
    }
  };

  // Mark a creator as offline
  const markCreatorOffline = (creatorId: string) => {
    setLiveCreators((prev) => {
      const updated = new Map(prev);
      updated.delete(creatorId);
      return updated;
    });
    console.log(`📴 Creator ${creatorId} is now offline`);
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

  // Legacy functions - keeping for backward compatibility
  const subscribeToCreator = (_creatorId: string) => {
    console.warn(
      "⚠️ subscribeToCreator is deprecated - using /queue/live-notify instead",
    );
  };

  const unsubscribeFromCreator = (_creatorId: string) => {
    console.warn(
      "⚠️ unsubscribeFromCreator is deprecated - using /queue/live-notify instead",
    );
  };

  const value: WebSocketContextType = {
    isConnected,
    client: stompClientRef.current,
    liveCreators,
    subscribeToCreator, // Deprecated but kept for compatibility
    unsubscribeFromCreator, // Deprecated but kept for compatibility
    sendMessage,
    isCreatorLive,
    getLiveSession,
    markCreatorOffline, // New function to manually mark creator as offline
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
