// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useRef, useState, useEffect, useCallback } from "react";
// import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
// import { getWebSocketUrl } from "@/utils/helper";

// interface UseStompClientOptions {
//   onConnect?: () => void;
//   onDisconnect?: () => void;
//   onError?: (error: any) => void;
// }

// export const useStompClient = (
//   token: string | null,
//   options: UseStompClientOptions = {},
// ) => {
//   const { onConnect, onDisconnect, onError } = options;
//   const clientRef = useRef<Client | null>(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());

//   const disconnect = useCallback(() => {
//     if (clientRef.current) {
//       console.log("⏹️ Deactivating WebSocket");
//       clientRef.current.deactivate();
//       clientRef.current = null;
//       setIsConnected(false);
//       // Clear all tracked subscriptions on disconnect
//       subscriptionsRef.current.clear();
//     }
//   }, []);

//   const connect = useCallback(() => {
//     if (!token) {
//       console.warn("⚠️ No auth token found, skipping WebSocket connection");
//       return;
//     }

//     if (clientRef.current?.active) return;

//     const wsUrl = getWebSocketUrl();
//     console.log("🔌 Connecting to WebSocket at", wsUrl);

//     const client = new Client({
//       brokerURL: getWebSocketUrl(),
//       connectHeaders: { Authorization: `Bearer ${token}` },
//       debug: (_str) => {
//         // Only log debug in dev or if specifically needed to avoid noise
//         if (process.env.NODE_ENV === "development") {
//           console.log("STOMP Debug:", _str);
//         }
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,

//       onConnect: () => {
//         console.log("✅ WebSocket connected");
//         setIsConnected(true);
//         onConnect?.();
//       },

//       onStompError: (frame) => {
//         console.error("❌ STOMP Error:", frame);
//         setIsConnected(false);
//         onError?.(frame);
//       },

//       onWebSocketClose: () => {
//         console.log("🔌 WebSocket closed");
//         setIsConnected(false);
//         onDisconnect?.();
//       },

//       onWebSocketError: (event) => {
//         console.error("❌ WebSocket error", event);
//         setIsConnected(false);
//         onError?.(event);
//       },
//     });

//     client.activate();
//     clientRef.current = client;
//   }, [token, onConnect, onDisconnect, onError]);

//   useEffect(() => {
//     connect();
//     return () => disconnect();
//   }, [connect, disconnect]);

//   const subscribe = useCallback(
//     (destination: string, callback: (message: IMessage) => void) => {
//       const client = clientRef.current;
//       if (!client || !client.connected) {
//         console.warn(
//           `⚠️ Cannot subscribe to ${destination}: WebSocket not connected`,
//         );
//         return undefined;
//       }

//       // Avoid double subscription if possible, though STOMP handles it, good to track
//       const existingSub = subscriptionsRef.current.get(destination);
//       if (existingSub) {
//         // If we want to allow multiple subs to same topic, we'd need a different key or array
//         // For now, let's assume one handler per topic per context usage pattern, or refine logic
//         // But actually, multiple components might sub to same topic.
//         // The Context usage usually centralizes it properly.
//         // Let's just subscribe and return the sub.
//       }

//       try {
//         const subscription = client.subscribe(destination, callback);
//         // We might want to track it by ID if we need to unsubscribe specifically from here
//         // For now, just return it.
//         return subscription;
//       } catch (error) {
//         console.error(`❌ Error subscribing to ${destination}:`, error);
//         return undefined;
//       }
//     },
//     [],
//   );

//   const sendMessage = useCallback((destination: string, body: any) => {
//     const client = clientRef.current;
//     if (!client || !client.connected) {
//       console.warn("⚠️ Cannot send message: WebSocket not connected");
//       return;
//     }
//     try {
//       client.publish({
//         destination,
//         body: JSON.stringify(body),
//       });
//     } catch (error) {
//       console.error("❌ Failed to send message:", error);
//     }
//   }, []);

//   // Life cycle management
//   // useEffect(() => {
//   //   connect();
//   //   return () => {
//   //     disconnect();
//   //   };
//   // }, [connect, disconnect]);

//   // Handle token changes - if token changes, we might want to reconnect?
//   // Usually covered by component mount/unmount or explicit reconn logic
//   // For now, simplistic approach is fine.

//   return {
//     client: clientRef.current,
//     isConnected,
//     subscribe,
//     sendMessage,
//     reconnect: () => {
//       disconnect();
//       setTimeout(connect, 100);
//     },
//   };
// };

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState, useEffect, useCallback } from "react";
import { Client, type IMessage, type StompSubscription } from "@stomp/stompjs";
import { getWebSocketUrl } from "@/utils/helper";

interface UseStompClientOptions {
  onConnect?: () => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
}

export const useStompClient = (
  token: string | null,
  options: UseStompClientOptions = {},
) => {
  const { onConnect, onDisconnect, onError } = options;
  const clientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const subscriptionsRef = useRef<Map<string, StompSubscription>>(new Map());

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      console.log("⏹️ Deactivating WebSocket");
      clientRef.current.deactivate();
      clientRef.current = null;
      setIsConnected(false);
      subscriptionsRef.current.clear();
    }
  }, []);

  const connect = useCallback(() => {
    if (!token) {
      // If you never see this line in the console, connect() isn't the
      // problem — check that WebSocketProvider is actually mounted, and
      // that this hook is being called at all.
      console.warn(
        "⚠️ [useStompClient] No auth token found, skipping WebSocket connection",
      );
      return;
    }

    if (clientRef.current?.active) {
      console.log("ℹ️ [useStompClient] Client already active, skipping");
      return;
    }

    const brokerURL = getWebSocketUrl();
    // Temporary diagnostic — unconditional so it shows up regardless of
    // console filters. Remove once the connection issue is confirmed fixed.
    console.log("🔌 [useStompClient] Connecting to:", brokerURL);

    const client = new Client({
      brokerURL,
      connectHeaders: { Authorization: `Bearer ${token}` },
      debug: (_str) => {
        // `process.env` doesn't exist in a Vite browser bundle unless
        // polyfilled — referencing it here threw on every debug tick,
        // which fires very frequently. import.meta.env is the Vite-safe
        // equivalent.
        if (import.meta.env.DEV) {
          // console.log("STOMP Debug:", _str);
        }
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,

      onConnect: () => {
        console.log("✅ WebSocket connected");
        setIsConnected(true);
        onConnect?.();
      },

      onStompError: (frame) => {
        console.error("❌ STOMP Error:", frame);
        setIsConnected(false);
        onError?.(frame);
      },

      onWebSocketClose: (event) => {
        console.log("🔌 WebSocket closed", event);
        setIsConnected(false);
        onDisconnect?.();
      },

      onWebSocketError: (event) => {
        console.error("❌ WebSocket error", event);
        setIsConnected(false);
        onError?.(event);
      },
    });

    client.activate();
    clientRef.current = client;
  }, [token, onConnect, onDisconnect, onError]);

  // Was previously declared twice in this file (once here, once again
  // further down under "Life cycle management"). Both ran on every mount,
  // so the real sequence was connect -> disconnect -> connect on load,
  // which can present as "never connects." Only one copy now.
  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const subscribe = useCallback(
    (destination: string, callback: (message: IMessage) => void) => {
      const client = clientRef.current;
      if (!client || !client.connected) {
        console.warn(
          `⚠️ Cannot subscribe to ${destination}: WebSocket not connected`,
        );
        return undefined;
      }

      // Previously tracked in subscriptionsRef but never actually written
      // to, so it did nothing. Now replaces a stale subscription to the
      // same destination instead of silently stacking a duplicate on top.
      const existing = subscriptionsRef.current.get(destination);
      if (existing) {
        existing.unsubscribe();
      }

      try {
        const subscription = client.subscribe(destination, callback);
        subscriptionsRef.current.set(destination, subscription);
        return subscription;
      } catch (error) {
        console.error(`❌ Error subscribing to ${destination}:`, error);
        return undefined;
      }
    },
    [],
  );

  const sendMessage = useCallback((destination: string, body: any) => {
    const client = clientRef.current;
    if (!client || !client.connected) {
      console.warn("⚠️ Cannot send message: WebSocket not connected");
      return;
    }
    try {
      client.publish({
        destination,
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error("❌ Failed to send message:", error);
    }
  }, []);

  return {
    client: clientRef.current,
    isConnected,
    subscribe,
    sendMessage,
    reconnect: () => {
      disconnect();
      setTimeout(connect, 100);
    },
  };
};
