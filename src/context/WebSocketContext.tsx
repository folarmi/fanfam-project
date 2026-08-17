// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-refresh/only-export-components */
// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import type {
//   LiveCreator,
//   LiveNotification,
//   WebSocketContextType,
// } from "@/lib/types";
// import { useAppSelector } from "@/lib/hook";
// import { useGetData } from "@/hooks/apiCalls";
// import { useStompClient } from "@/hooks/useStompClient";
// import type { StompSubscription } from "@stomp/stompjs";
// import { showInlineToast } from "@/utils/toastUtils";

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
//   const { userObject } = useAppSelector((state) => state.auth);
//   const token = localStorage.getItem("token");
//   // console.log(token);
//   // State for live creators
//   const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
//     new Map(),
//   );

//   // Refs for tracking subscriptions to avoid stale closures and duplicates
//   const liveNotifySubscriptionRef = useRef<StompSubscription | undefined>(
//     undefined,
//   );

//   // Track notified creators to avoid spamming toasts
//   const notifiedCreatorsRef = useRef<Set<string>>(new Set());

//   // Data fetching
//   const { data: getLiveHosts, refetch: refetchLiveHosts } = useGetData({
//     url: `live/hosts`,
//     queryKey: ["GetLiveHosts"],
//     enabled: !!userObject,
//     refetchInterval: 30000,
//   });

//   // Handle new live notification
//   const handleLiveNotification = useCallback((payload: LiveNotification) => {
//     const creatorId = payload?.creatorId;
//     if (!creatorId) return;

//     // We cast payload to any because the type definition might be missing some fields
//     // present in the raw message (like timestamp/session)
//     const rawPayload = payload as any;
//     const streamStartTime = rawPayload.timestamp || Date.now();

//     setLiveCreators((prev) => {
//       // Notify user if not already notified recently
//       // We do this check FIRST to ensure we toast even if polling already added the creator to the map
//       if (!notifiedCreatorsRef.current.has(creatorId)) {
//         console.log(`🔔 Live notification for ${creatorId}`);

//         showInlineToast({
//           type: "info",
//           title: `🔴 ${creatorId} is now LIVE!`,
//         });
//         notifiedCreatorsRef.current.add(creatorId);
//       }

//       // Check if already known in state after handling notification
//       if (prev.has(creatorId)) {
//         return prev;
//       }

//       const updated = new Map(prev);
//       updated.set(creatorId, {
//         creatorId,
//         sessionId: rawPayload.session || rawPayload.sessionId || "",
//         streamStartTime: Number(streamStartTime),
//       });
//       return updated;
//     });
//   }, []);

//   // Callback when connected
//   const handleConnect = useCallback(() => {
//     // Refresh the extensive list from API
//     refetchLiveHosts();
//   }, [refetchLiveHosts]);

//   // Initialize Custom Hook
//   const { client, isConnected, subscribe, sendMessage } = useStompClient(
//     token,
//     {
//       onConnect: handleConnect,
//     },
//   );

//   // Subscribe to notifications when connected
//   useEffect(() => {
//     if (isConnected && subscribe) {
//       // Clean up previous subscription if any (though useStompClient clears on disconnect,
//       // this is for re-subscribing safely)
//       if (liveNotifySubscriptionRef.current) {
//         liveNotifySubscriptionRef.current.unsubscribe();
//       }

//       const topic = "/user/queue/live-notify";
//       const sub = subscribe(topic, (message) => {
//         try {
//           const payload = JSON.parse(message.body);
//           handleLiveNotification(payload);
//         } catch (e) {
//           console.error("❌ Error parsing live notification:", e);
//         }
//       });

//       liveNotifySubscriptionRef.current = sub;

//       return () => {
//         if (liveNotifySubscriptionRef.current) {
//           liveNotifySubscriptionRef.current.unsubscribe();
//           liveNotifySubscriptionRef.current = undefined;
//         }
//       };
//     }
//   }, [isConnected, subscribe, handleLiveNotification]);

//   // Sync with API data
//   useEffect(() => {
//     if (!getLiveHosts?.data) return;

//     const liveHostsData = Array.isArray(getLiveHosts.data)
//       ? getLiveHosts.data
//       : getLiveHosts.data.content || [];

//     console.log(`📊 Syncing ${liveHostsData.length} live hosts from API`);

//     setLiveCreators((prev) => {
//       const updated = new Map(prev);
//       const activeCreatorIds = new Set<string>();

//       liveHostsData.forEach((host: any) => {
//         const creatorId = host?.creatorID;
//         if (creatorId) {
//           activeCreatorIds.add(creatorId);
//           updated.set(creatorId, {
//             creatorId,
//             sessionId: host?.session,
//             streamStartTime: host?.liveAt ? Number(host.liveAt) : undefined,
//           });
//         }
//       });

//       // Remove creators who are no longer in the API response (went offline)
//       // Only if we trust the API is the source of truth for "currently live"
//       for (const id of updated.keys()) {
//         if (!activeCreatorIds.has(id)) {
//           updated.delete(id);
//           notifiedCreatorsRef.current.delete(id); // Reset notification memory
//         }
//       }

//       return updated;
//     });
//   }, [getLiveHosts]);

//   const removeCreatorFromLive = useCallback((creatorId: string) => {
//     setLiveCreators((prev) => {
//       if (!prev.has(creatorId)) return prev;
//       const updated = new Map(prev);
//       updated.delete(creatorId);
//       return updated;
//     });
//     notifiedCreatorsRef.current.delete(creatorId);
//   }, []);

//   const isCreatorLive = useCallback(
//     (creatorId: string) => {
//       return liveCreators.has(creatorId);
//     },
//     [liveCreators],
//   );

//   const getLiveSession = useCallback(
//     (creatorId: string) => {
//       return liveCreators.get(creatorId);
//     },
//     [liveCreators],
//   );

//   const value: WebSocketContextType = {
//     isConnected,
//     client: client,
//     liveCreators,
//     sendMessage,
//     isCreatorLive,
//     getLiveSession,
//     refetchLiveHosts,
//     removeCreatorFromLive,
//   };

//   return (
//     <WebSocketContext.Provider value={value}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-refresh/only-export-components */
// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useRef,
//   useState,
// } from "react";
// import type {
//   LiveCreator,
//   LiveNotification,
//   WebSocketContextType,
// } from "@/lib/types";
// import { useAppSelector } from "@/lib/hook";
// import { useGetData } from "@/hooks/apiCalls";
// import { useStompClient } from "@/hooks/useStompClient";
// import type { StompSubscription } from "@stomp/stompjs";
// import { showInlineToast } from "@/utils/toastUtils";

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
//   const { userObject } = useAppSelector((state) => state.auth);

//   // Token used to be read once via `localStorage.getItem("token")` at
//   // render time. If this provider mounted before login finished, `token`
//   // stayed null forever for that instance and the socket never connected
//   // even after the user logged in. It's now state, resynced whenever a
//   // login completes (useSignIn already dispatches "auth-complete") or
//   // another tab changes localStorage.
//   const [token, setToken] = useState<string | null>(() =>
//     localStorage.getItem("token"),
//   );

//   useEffect(() => {
//     const syncToken = () => setToken(localStorage.getItem("token"));
//     window.addEventListener("auth-complete", syncToken);
//     window.addEventListener("storage", syncToken);
//     return () => {
//       window.removeEventListener("auth-complete", syncToken);
//       window.removeEventListener("storage", syncToken);
//     };
//   }, []);

//   useEffect(() => {
//     // Diagnostic: confirms the provider actually has a token to hand to
//     // useStompClient. If this logs `false` right when you expect to be
//     // logged in, that's why the socket never connects.
//     console.log("🔑 [WebSocketProvider] token present:", !!token);
//   }, [token]);

//   const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
//     new Map(),
//   );

//   const liveNotifySubscriptionRef = useRef<StompSubscription | undefined>(
//     undefined,
//   );
//   const notifiedCreatorsRef = useRef<Set<string>>(new Set());

//   const { data: getLiveHosts, refetch: refetchLiveHosts } = useGetData({
//     url: `live/hosts`,
//     queryKey: ["GetLiveHosts"],
//     enabled: !!userObject,
//     refetchInterval: 30000,
//   });

//   const handleLiveNotification = useCallback((payload: LiveNotification) => {
//     const creatorId = payload?.creatorId;
//     if (!creatorId) return;

//     const rawPayload = payload as any;
//     const streamStartTime = rawPayload.timestamp || Date.now();

//     setLiveCreators((prev) => {
//       if (!notifiedCreatorsRef.current.has(creatorId)) {
//         console.log(`🔔 Live notification for ${creatorId}`);

//         showInlineToast({
//           type: "info",
//           title: `🔴 ${creatorId} is now LIVE!`,
//         });
//         notifiedCreatorsRef.current.add(creatorId);
//       }

//       if (prev.has(creatorId)) {
//         return prev;
//       }

//       const updated = new Map(prev);
//       updated.set(creatorId, {
//         creatorId,
//         sessionId: rawPayload.session || rawPayload.sessionId || "",
//         streamStartTime: Number(streamStartTime),
//       });
//       return updated;
//     });
//   }, []);

//   const handleConnect = useCallback(() => {
//     refetchLiveHosts();
//   }, [refetchLiveHosts]);

//   const { client, isConnected, subscribe, sendMessage } = useStompClient(
//     token,
//     { onConnect: handleConnect },
//   );

//   useEffect(() => {
//     if (isConnected && subscribe) {
//       if (liveNotifySubscriptionRef.current) {
//         liveNotifySubscriptionRef.current.unsubscribe();
//       }

//       const topic = "/user/queue/live-notify";
//       const sub = subscribe(topic, (message) => {
//         try {
//           const payload = JSON.parse(message.body);
//           handleLiveNotification(payload);
//         } catch (e) {
//           console.error("❌ Error parsing live notification:", e);
//         }
//       });

//       liveNotifySubscriptionRef.current = sub;

//       return () => {
//         if (liveNotifySubscriptionRef.current) {
//           liveNotifySubscriptionRef.current.unsubscribe();
//           liveNotifySubscriptionRef.current = undefined;
//         }
//       };
//     }
//   }, [isConnected, subscribe, handleLiveNotification]);

//   useEffect(() => {
//     if (!getLiveHosts?.data) return;

//     const liveHostsData = Array.isArray(getLiveHosts.data)
//       ? getLiveHosts.data
//       : getLiveHosts.data.content || [];
//     console.log(liveHostsData);
//     console.log(`📊 Syncing ${liveHostsData.length} live hosts from API`);

//     setLiveCreators((prev) => {
//       const updated = new Map(prev);
//       const activeCreatorIds = new Set<string>();

//       liveHostsData.forEach((host: any) => {
//         const creatorId = host?.creatorID;
//         if (creatorId) {
//           activeCreatorIds.add(creatorId);
//           updated.set(creatorId, {
//             creatorId,
//             sessionId: host?.session,
//             streamStartTime: host?.liveAt ? Number(host.liveAt) : undefined,
//           });
//         }
//       });

//       for (const id of updated.keys()) {
//         if (!activeCreatorIds.has(id)) {
//           updated.delete(id);
//           notifiedCreatorsRef.current.delete(id);
//         }
//       }

//       return updated;
//     });
//   }, [getLiveHosts]);

//   const removeCreatorFromLive = useCallback((creatorId: string) => {
//     setLiveCreators((prev) => {
//       if (!prev.has(creatorId)) return prev;
//       const updated = new Map(prev);
//       updated.delete(creatorId);
//       return updated;
//     });
//     notifiedCreatorsRef.current.delete(creatorId);
//   }, []);

//   const isCreatorLive = useCallback(
//     (creatorId: string) => {
//       return liveCreators.has(creatorId);
//     },
//     [liveCreators],
//   );

//   const getLiveSession = useCallback(
//     (creatorId: string) => {
//       return liveCreators.get(creatorId);
//     },
//     [liveCreators],
//   );

//   const value: WebSocketContextType = {
//     isConnected,
//     client,
//     liveCreators,
//     sendMessage,
//     isCreatorLive,
//     getLiveSession,
//     refetchLiveHosts,
//     removeCreatorFromLive,
//   };

//   return (
//     <WebSocketContext.Provider value={value}>
//       {children}
//     </WebSocketContext.Provider>
//   );
// };

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  LiveCreator,
  LiveNotification,
  WebSocketContextType,
} from "@/lib/types";
import { useAppSelector } from "@/lib/hook";
import { useGetData } from "@/hooks/apiCalls";
import { useStompClient } from "@/hooks/useStompClient";
import type { StompSubscription } from "@stomp/stompjs";
import { showInlineToast } from "@/utils/toastUtils";

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
  const { userObject } = useAppSelector((state) => state.auth);

  // Token used to be read once via `localStorage.getItem("token")` at
  // render time. If this provider mounted before login finished, `token`
  // stayed null forever for that instance and the socket never connected
  // even after the user logged in. It's now state, resynced whenever a
  // login completes (useSignIn already dispatches "auth-complete") or
  // another tab changes localStorage.
  const [token, setToken] = useState<string | null>(() =>
    localStorage.getItem("token"),
  );

  useEffect(() => {
    const syncToken = () => setToken(localStorage.getItem("token"));
    window.addEventListener("auth-complete", syncToken);
    window.addEventListener("storage", syncToken);
    return () => {
      window.removeEventListener("auth-complete", syncToken);
      window.removeEventListener("storage", syncToken);
    };
  }, []);

  useEffect(() => {
    // Diagnostic: confirms the provider actually has a token to hand to
    // useStompClient. If this logs `false` right when you expect to be
    // logged in, that's why the socket never connects.
    console.log("🔑 [WebSocketProvider] token present:", !!token);
  }, [token]);

  const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
    new Map(),
  );

  const liveNotifySubscriptionRef = useRef<StompSubscription | undefined>(
    undefined,
  );
  const notifiedCreatorsRef = useRef<Set<string>>(new Set());

  const { data: getLiveHosts, refetch: refetchLiveHosts } = useGetData({
    url: `live/hosts`,
    queryKey: ["GetLiveHosts"],
    enabled: !!userObject,
    refetchInterval: 30000,
  });

  const handleLiveNotification = useCallback((payload: LiveNotification) => {
    // Confirmed from a real payload capture: the backend sends `creatorID`
    // (capital ID), not `creatorId`. The mismatch meant every notification
    // arrived successfully but was silently dropped right here — which is
    // exactly why it only ever showed up after a manual refresh (a refresh
    // re-fetches live hosts over REST, which uses a different, already-
    // correct field name).
    const rawPayload = payload as any;
    const creatorId = rawPayload?.creatorID || rawPayload?.creatorId;
    if (!creatorId) return;

    const streamStartTime = rawPayload.timestamp || Date.now();

    setLiveCreators((prev) => {
      if (!notifiedCreatorsRef.current.has(creatorId)) {
        console.log(`🔔 Live notification for ${creatorId}`);

        showInlineToast({
          type: "info",
          title: `🔴 ${creatorId} is now LIVE!`,
        });
        notifiedCreatorsRef.current.add(creatorId);
      }

      if (prev.has(creatorId)) {
        return prev;
      }

      const updated = new Map(prev);
      updated.set(creatorId, {
        creatorId,
        sessionId: rawPayload.session || rawPayload.sessionId || "",
        streamStartTime: Number(streamStartTime),
      });
      return updated;
    });
  }, []);

  const handleConnect = useCallback(() => {
    refetchLiveHosts();
  }, [refetchLiveHosts]);

  const { client, isConnected, subscribe, sendMessage } = useStompClient(
    token,
    { onConnect: handleConnect },
  );

  useEffect(() => {
    if (isConnected && subscribe) {
      if (liveNotifySubscriptionRef.current) {
        liveNotifySubscriptionRef.current.unsubscribe();
      }

      const topic = "/user/queue/live-notify";
      const sub = subscribe(topic, (message) => {
        // Unconditional log — helps confirm whether the message is even
        // arriving at all versus arriving but being suppressed somewhere
        // downstream (e.g. by the already-notified de-dup check).
        console.log("🔔 [live-notify] raw message received:", message.body);
        try {
          const payload = JSON.parse(message.body);
          handleLiveNotification(payload);
        } catch (e) {
          console.error("❌ Error parsing live notification:", e);
        }
      });

      liveNotifySubscriptionRef.current = sub;

      return () => {
        if (liveNotifySubscriptionRef.current) {
          liveNotifySubscriptionRef.current.unsubscribe();
          liveNotifySubscriptionRef.current = undefined;
        }
      };
    }
  }, [isConnected, subscribe, handleLiveNotification]);

  useEffect(() => {
    if (!getLiveHosts?.data) return;

    const liveHostsData = Array.isArray(getLiveHosts.data)
      ? getLiveHosts.data
      : getLiveHosts.data.content || [];

    console.log(`📊 Syncing ${liveHostsData.length} live hosts from API`);

    setLiveCreators((prev) => {
      const updated = new Map(prev);
      const activeCreatorIds = new Set<string>();

      liveHostsData.forEach((host: any) => {
        const creatorId = host?.creatorID;
        if (creatorId) {
          activeCreatorIds.add(creatorId);
          updated.set(creatorId, {
            creatorId,
            sessionId: host?.session,
            streamStartTime: host?.liveAt ? Number(host.liveAt) : undefined,
          });
        }
      });

      for (const id of updated.keys()) {
        if (!activeCreatorIds.has(id)) {
          updated.delete(id);
          notifiedCreatorsRef.current.delete(id);
        }
      }

      return updated;
    });
  }, [getLiveHosts]);

  const removeCreatorFromLive = useCallback((creatorId: string) => {
    setLiveCreators((prev) => {
      if (!prev.has(creatorId)) return prev;
      const updated = new Map(prev);
      updated.delete(creatorId);
      return updated;
    });
    notifiedCreatorsRef.current.delete(creatorId);
  }, []);

  const isCreatorLive = useCallback(
    (creatorId: string) => {
      return liveCreators.has(creatorId);
    },
    [liveCreators],
  );

  const getLiveSession = useCallback(
    (creatorId: string) => {
      return liveCreators.get(creatorId);
    },
    [liveCreators],
  );

  const value: WebSocketContextType = {
    isConnected,
    client,
    liveCreators,
    sendMessage,
    isCreatorLive,
    getLiveSession,
    refetchLiveHosts,
    removeCreatorFromLive,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
