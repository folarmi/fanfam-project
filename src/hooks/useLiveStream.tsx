/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useWebSocket } from "@/context/WebSocketContext";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type { UseLiveStreamProps } from "@/lib/types";
import { parseLiveEvent } from "@/utils/helper";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useLiveStream = ({
  sessionId,
  creatorId,
  role,
  enabled = true,
}: UseLiveStreamProps) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { client, isConnected, sendMessage } = useWebSocket();

  const [viewerCount, setViewerCount] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);
  const [isStreamEnded, setIsStreamEnded] = useState(false);

  const joinSubRef = useRef<any>(null);
  const leaveSubRef = useRef<any>(null);
  const endSubRef = useRef<any>(null);
  const commentSubRef = useRef<any>(null);
  const reactionSubRef = useRef<any>(null);

  const safeLeaveThenCleanup = () => {
    if (!sessionId) return;

    // Only send leave if user had joined and stream isn't ended
    if (hasJoined && isConnected && !isStreamEnded) {
      sendMessage("/app/live/leave", {
        session: sessionId,
        userId: userObject?.usid,
      });
    }

    // Delay unsubscribe slightly so the publish isn't racing teardown
    setTimeout(() => {
      joinSubRef.current?.unsubscribe?.();
      leaveSubRef.current?.unsubscribe?.();
      endSubRef.current?.unsubscribe?.();
      commentSubRef.current?.unsubscribe?.();
      reactionSubRef.current?.unsubscribe?.();

      joinSubRef.current = null;
      leaveSubRef.current = null;
      endSubRef.current = null;
      commentSubRef.current = null;
      reactionSubRef.current = null;
    }, 200);
  };

  useEffect(() => {
    if (!enabled) return;
    if (!isConnected) return;
    if (!client || !client.connected) return;
    if (!sessionId) return;

    if (
      joinSubRef.current &&
      leaveSubRef.current &&
      endSubRef.current &&
      commentSubRef.current &&
      reactionSubRef.current
    ) {
      return;
    }

    try {
      const joinTopic = `/topic/live/${sessionId}/join`;
      const leaveTopic = `/topic/live/${sessionId}/leave`;
      const endTopic = `/topic/live/${sessionId}/end`;
      const commentTopic = `/topic/live/${sessionId}/comment`;
      const reactionTopic = `/topic/live/${sessionId}/reaction`;

      // JOIN
      if (!joinSubRef.current) {
        joinSubRef.current = client.subscribe(joinTopic, (message) => {
          const payload = parseLiveEvent(message.body);
          if (!payload) return;

          console.log("👋 JOIN EVENT:", payload);

          if (payload.event !== "USER_JOIN_LIVE") return;

          // Optional: don't count yourself
          const me = userObject?.email || userObject?.usid;
          if (payload.user && payload.user === me) return;

          // if (payload.user && payload.user === userObject?.email) return;

          setViewerCount((prev) => prev + 1);
        });
      }

      // LEAVE
      if (!leaveSubRef.current) {
        leaveSubRef.current = client.subscribe(leaveTopic, (message) => {
          console.log("👋 LEAVE EVENT RAW:", message.body);

          const payload = parseLiveEvent(message.body);
          if (!payload) return;

          console.log("👋 LEAVE EVENT:", payload);

          if (payload.event !== "USER_LEFT_LIVE") return;

          // Optional: don't decrement for yourself twice (if you send leave + receive broadcast)
          if (payload.user && payload.user === userObject?.email) return;

          setViewerCount((prev) => Math.max(0, prev - 1));
        });
      }

      // END
      if (!endSubRef.current) {
        endSubRef.current = client.subscribe(endTopic, (message) => {
          console.log("🛑 END EVENT RAW:", message.body);
          const payload = parseLiveEvent(message.body);
          if (!payload) return;

          console.log("🛑 END EVENT PARSED:", payload);

          if (payload.event !== "CREATOR_ENDED_LIVE") return;

          setIsStreamEnded(true);
          setHasJoined(false);
        });
      }

      // COMMENT
      if (!commentSubRef.current) {
        commentSubRef.current = client.subscribe(commentTopic, (message) => {
          const payload = parseLiveEvent(message.body);
          if (!payload) return;

          console.log("💬 COMMENT EVENT:", payload);

          if (payload.event !== "LIVE_COMMENT") return;

          // next step: push to chat UI
        });
      }

      // REACTION
      if (!reactionSubRef.current) {
        reactionSubRef.current = client.subscribe(reactionTopic, (message) => {
          const payload = parseLiveEvent(message.body);
          if (!payload) return;

          console.log("❤️ REACTION EVENT:", payload);

          if (payload.event !== "LIVE_REACTION") return;

          // next step: show floating hearts / counters
        });
      }

      // console.log("✅ Live topic subscriptions ready for:", sessionId);
    } catch (err) {
      console.error("❌ Error subscribing to live topics:", err);
    }

    // Cleanup when session changes / unmount
    return () => {
      safeLeaveThenCleanup();
      // Optional: reset end state when leaving a session
      setIsStreamEnded(false);
    };
  }, [enabled, isConnected, client, sessionId]);

  // Join the live stream (same as yours, just slightly safer)
  const joinLiveStream = () => {
    if (!enabled) return;

    if (role === "HOST") return;

    if (!isConnected) {
      toast.error("Not connected to server");
      return;
    }

    if (!sessionId) {
      toast.error("Invalid session");
      return;
    }

    if (hasJoined) return;

    // ✅ CHANGE 4: ensure subscriptions exist before join (subscribe-before-send rule)
    if (!joinSubRef.current || !leaveSubRef.current || !endSubRef.current) {
      console.warn("⚠️ Not joining yet: subscriptions not ready");
      return;
    }

    sendMessage("/app/live/join", {
      session: sessionId,
      creatorId,
      role,
    });

    setHasJoined(true);
    setViewerCount((prev) => (prev === 0 ? 1 : prev));
  };

  // ✅ CHANGE 5: clean auto-join (single source of truth)
  useEffect(() => {
    if (!enabled) return;
    if (!isConnected) return;
    if (!sessionId) return;
    if (hasJoined) return;

    if (role === "HOST") return;

    // wait until subscriptions are ready
    if (!joinSubRef.current || !leaveSubRef.current || !endSubRef.current)
      return;

    const t = setTimeout(() => joinLiveStream(), 250);
    return () => clearTimeout(t);
  }, [enabled, isConnected, sessionId, hasJoined, role]);

  // Leave the live stream (unchanged for now)
  const leaveLiveStream = () => {
    if (!isConnected) {
      console.log("⚠️ Not connected, skipping leave message");
      return;
    }

    if (!sessionId) return;
    safeLeaveThenCleanup();
    setHasJoined(false);
  };

  return {
    viewerCount,
    hasJoined,
    isStreamEnded,
    joinLiveStream,
    leaveLiveStream,
  };
};

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

// import { useWebSocket } from "@/context/WebSocketContext";
// import { useAppSelector } from "@/lib/hook";
// import type { RootState } from "@/lib/store";
// import type { UseLiveStreamProps } from "@/lib/types";
// import { useEffect, useRef, useState } from "react";
// import { toast } from "react-toastify";

// export const useLiveStream = ({
//   sessionId,
//   creatorId,
//   role,
//   enabled = true,
// }: UseLiveStreamProps) => {
//   const { userObject } = useAppSelector((state: RootState) => state.auth);

//   const { client, isConnected, sendMessage } = useWebSocket();

//   const [viewerCount, setViewerCount] = useState(0);
//   const [hasJoined, setHasJoined] = useState(false);
//   const [isStreamEnded, setIsStreamEnded] = useState(false);

//   const joinSubRef = useRef<any>(null);
//   const leaveSubRef = useRef<any>(null);
//   const endSubRef = useRef<any>(null);
//   const commentSubRef = useRef<any>(null);
//   const reactionSubRef = useRef<any>(null);

//   const safeLeaveThenCleanup = () => {
//     if (!sessionId) return;

//     // Only send leave if user had joined and stream isn't ended
//     if (hasJoined && isConnected && !isStreamEnded) {
//       sendMessage("/app/live/leave", {
//         session: sessionId,
//         userId: userObject?.usid,
//       });
//     }

//     // Delay unsubscribe slightly so the publish isn't racing teardown
//     setTimeout(() => {
//       joinSubRef.current?.unsubscribe?.();
//       leaveSubRef.current?.unsubscribe?.();
//       endSubRef.current?.unsubscribe?.();
//       commentSubRef.current?.unsubscribe?.();
//       reactionSubRef.current?.unsubscribe?.();

//       joinSubRef.current = null;
//       leaveSubRef.current = null;
//       endSubRef.current = null;
//       commentSubRef.current = null;
//       reactionSubRef.current = null;
//     }, 200);
//   };

//   // ✅ HELPER: Parse live event safely
//   const parseLiveEventSafe = (messageBody: string): any | null => {
//     try {
//       return JSON.parse(messageBody);
//     } catch (error) {
//       console.error("❌ Error parsing message:", error, messageBody);
//       return null;
//     }
//   };

//   useEffect(() => {
//     if (!enabled) return;
//     if (!isConnected) return;
//     if (!client || !client.connected) return;
//     if (!sessionId) return;

//     if (
//       joinSubRef.current &&
//       leaveSubRef.current &&
//       endSubRef.current &&
//       commentSubRef.current &&
//       reactionSubRef.current
//     ) {
//       console.log("ℹ️ All subscriptions already exist for session:", sessionId);
//       return;
//     }

//     try {
//       const joinTopic = `/topic/live/${sessionId}/join`;
//       const leaveTopic = `/topic/live/${sessionId}/leave`;
//       const endTopic = `/topic/live/${sessionId}/end`;
//       const commentTopic = `/topic/live/${sessionId}/comment`;
//       const reactionTopic = `/topic/live/${sessionId}/reaction`;

//       // console.log("🔔 Setting up live stream subscriptions for:", sessionId);

//       // JOIN
//       if (!joinSubRef.current) {
//         joinSubRef.current = client.subscribe(joinTopic, (message) => {
//           const payload = parseLiveEventSafe(message.body);
//           if (!payload) return;

//           console.log("👋 JOIN EVENT:", payload);

//           // ✅ FLEXIBLE: Check for different event field formats
//           const eventType = payload.event || payload.eventType || payload.type;
//           if (
//             eventType &&
//             eventType !== "USER_JOIN_LIVE" &&
//             eventType !== "JOIN"
//           ) {
//             return;
//           }

//           // Don't count yourself
//           const me = userObject?.email || userObject?.usid;
//           const joiningUser = payload.user || payload.userId || payload.email;

//           if (joiningUser && joiningUser === me) {
//             console.log("ℹ️ Ignoring own join event");
//             return;
//           }

//           setViewerCount((prev) => prev + 1);
//         });
//         console.log("✅ Subscribed to:", joinTopic);
//       }

//       // LEAVE
//       if (!leaveSubRef.current) {
//         leaveSubRef.current = client.subscribe(leaveTopic, (message) => {
//           console.log("👋 LEAVE EVENT RAW:", message.body);

//           const payload = parseLiveEventSafe(message.body);
//           if (!payload) return;

//           console.log("👋 LEAVE EVENT PARSED:", payload);

//           // ✅ FLEXIBLE: Check for different event field formats
//           const eventType = payload.event || payload.eventType || payload.type;
//           if (
//             eventType &&
//             eventType !== "USER_LEFT_LIVE" &&
//             eventType !== "LEAVE"
//           ) {
//             return;
//           }

//           // Don't decrement for yourself
//           const leavingUser = payload.user || payload.userId || payload.email;
//           if (leavingUser && leavingUser === userObject?.email) {
//             console.log("ℹ️ Ignoring own leave event");
//             return;
//           }

//           setViewerCount((prev) => Math.max(0, prev - 1));
//         });
//         console.log("✅ Subscribed to:", leaveTopic);
//       }

//       // ✅ IMPROVED: END subscription with better handling
//       if (!endSubRef.current) {
//         endSubRef.current = client.subscribe(endTopic, (message) => {
//           console.log("🛑 END EVENT RAW:", message.body);

//           const payload = parseLiveEventSafe(message.body);
//           if (!payload) {
//             console.error("❌ Could not parse end event payload");
//             return;
//           }

//           console.log("🛑 END EVENT PARSED:", payload);

//           // ✅ FLEXIBLE: Accept different event formats or no event field
//           const eventType = payload.event || payload.eventType || payload.type;

//           // If there's an event field, verify it's an end event
//           if (
//             eventType &&
//             eventType !== "CREATOR_ENDED_LIVE" &&
//             eventType !== "STREAM_ENDED" &&
//             eventType !== "END"
//           ) {
//             console.warn("⚠️ Unexpected event type on end topic:", eventType);
//             return;
//           }

//           // ✅ OPTIONAL: Verify it's for the correct session
//           const endedSessionId =
//             payload.sessionID || payload.session || payload.sessionId;
//           if (endedSessionId && endedSessionId !== sessionId) {
//             console.warn(
//               "⚠️ End event for different session:",
//               endedSessionId,
//               "expected:",
//               sessionId,
//             );
//             return;
//           }

//           // ✅ OPTIONAL: Verify it's from the correct creator
//           const endedCreatorId = payload.creatorId || payload.creator;
//           if (endedCreatorId && creatorId && endedCreatorId !== creatorId) {
//             console.warn(
//               "⚠️ End event from different creator:",
//               endedCreatorId,
//               "expected:",
//               creatorId,
//             );
//             return;
//           }

//           console.log("✅ Stream end confirmed - updating state");
//           setIsStreamEnded(true);
//           setHasJoined(false);
//         });
//         console.log("✅ Subscribed to:", endTopic);
//       }

//       // COMMENT
//       if (!commentSubRef.current) {
//         commentSubRef.current = client.subscribe(commentTopic, (message) => {
//           const payload = parseLiveEventSafe(message.body);
//           if (!payload) return;

//           console.log("💬 COMMENT EVENT:", payload);

//           const eventType = payload.event || payload.eventType || payload.type;
//           if (
//             eventType &&
//             eventType !== "LIVE_COMMENT" &&
//             eventType !== "COMMENT"
//           ) {
//             return;
//           }

//           // TODO: Push to chat UI
//         });
//         console.log("✅ Subscribed to:", commentTopic);
//       }

//       // REACTION
//       if (!reactionSubRef.current) {
//         reactionSubRef.current = client.subscribe(reactionTopic, (message) => {
//           const payload = parseLiveEventSafe(message.body);
//           if (!payload) return;

//           console.log("❤️ REACTION EVENT:", payload);

//           const eventType = payload.event || payload.eventType || payload.type;
//           if (
//             eventType &&
//             eventType !== "LIVE_REACTION" &&
//             eventType !== "REACTION"
//           ) {
//             return;
//           }

//           // TODO: Show floating hearts / counters
//         });
//         console.log("✅ Subscribed to:", reactionTopic);
//       }

//       console.log("✅ All live topic subscriptions ready for:", sessionId);
//     } catch (err) {
//       console.error("❌ Error subscribing to live topics:", err);
//     }

//     // Cleanup when session changes / unmount
//     return () => {
//       console.log("🧹 Cleaning up live stream subscriptions for:", sessionId);
//       safeLeaveThenCleanup();
//       setIsStreamEnded(false);
//     };
//   }, [enabled, isConnected, client, sessionId]);

//   // Join the live stream
//   const joinLiveStream = () => {
//     if (!enabled) return;
//     if (role === "HOST") return;

//     if (!isConnected) {
//       toast.error("Not connected to server");
//       return;
//     }

//     if (!sessionId) {
//       toast.error("Invalid session");
//       return;
//     }

//     if (hasJoined) {
//       console.log("ℹ️ Already joined session");
//       return;
//     }

//     // Ensure subscriptions exist before join
//     if (!joinSubRef.current || !leaveSubRef.current || !endSubRef.current) {
//       console.warn("⚠️ Not joining yet: subscriptions not ready");
//       return;
//     }

//     console.log("📤 Sending join message for session:", sessionId);
//     sendMessage("/app/live/join", {
//       session: sessionId,
//       creatorId,
//       role,
//     });

//     setHasJoined(true);
//     setViewerCount((prev) => (prev === 0 ? 1 : prev));
//   };

//   // Auto-join effect
//   useEffect(() => {
//     if (!enabled) return;
//     if (!isConnected) return;
//     if (!sessionId) return;
//     if (hasJoined) return;
//     if (role === "HOST") return;

//     // Wait until subscriptions are ready
//     if (!joinSubRef.current || !leaveSubRef.current || !endSubRef.current) {
//       return;
//     }

//     const t = setTimeout(() => {
//       console.log("⏰ Auto-joining stream after delay");
//       joinLiveStream();
//     }, 250);

//     return () => clearTimeout(t);
//   }, [enabled, isConnected, sessionId, hasJoined, role]);

//   // Leave the live stream
//   const leaveLiveStream = () => {
//     if (!isConnected) {
//       console.log("⚠️ Not connected, skipping leave message");
//       return;
//     }

//     if (!sessionId) return;

//     console.log("🚪 Leaving stream:", sessionId);
//     safeLeaveThenCleanup();
//     setHasJoined(false);
//   };

//   return {
//     viewerCount,
//     hasJoined,
//     isStreamEnded,
//     joinLiveStream,
//     leaveLiveStream,
//   };
// };
