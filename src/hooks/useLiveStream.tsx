/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// import { useWebSocket } from "@/context/WebSocketContext";
// import { useAppSelector } from "@/lib/hook";
// import type {
//   LiveComment,
//   LiveReaction,
//   ReactionType,
//   UseLiveStreamProps,
// } from "@/lib/types";
// import { parseLiveEvent } from "@/utils/helper";
// import { useCallback, useEffect, useRef, useState } from "react";
// import type { StompSubscription } from "@stomp/stompjs";
// import { showInlineToast } from "@/utils/toastUtils";

// interface UseLiveStreamPropsExtended extends UseLiveStreamProps {
//   onCommentReceived?: (comment: LiveComment) => void;
//   onReactionReceived?: (reaction: LiveReaction) => void;
// }

// export const useLiveStream = ({
//   sessionId,
//   creatorId,
//   role,
//   enabled = true,
//   onCommentReceived,
//   onReactionReceived,
// }: UseLiveStreamPropsExtended) => {
//   const { userObject } = useAppSelector((state) => state.auth);

//   const { client, isConnected, sendMessage } = useWebSocket();

//   const [viewerCount, setViewerCount] = useState(0);
//   const [hasJoined, setHasJoined] = useState(false);
//   const [isStreamEnded, setIsStreamEnded] = useState(false);

//   const joinSubRef = useRef<StompSubscription | null>(null);
//   const leaveSubRef = useRef<StompSubscription | null>(null);
//   const endSubRef = useRef<StompSubscription | null>(null);
//   const commentSubRef = useRef<StompSubscription | null>(null);
//   const reactionSubRef = useRef<StompSubscription | null>(null);

//   const currentSessionIdRef = useRef<string | null>(null);

//   // Cancels the auto-join retry loop below on unmount so it can't keep
//   // firing setTimeout(joinLiveStream, 200) against a stale closure forever
//   // if the socket never becomes ready while this component is gone.
//   const joinRetryCancelledRef = useRef(false);

//   const cleanupSubscriptions = useCallback(() => {
//     joinSubRef.current?.unsubscribe();
//     leaveSubRef.current?.unsubscribe();
//     endSubRef.current?.unsubscribe();
//     commentSubRef.current?.unsubscribe();
//     reactionSubRef.current?.unsubscribe();

//     joinSubRef.current = null;
//     leaveSubRef.current = null;
//     endSubRef.current = null;
//     commentSubRef.current = null;
//     reactionSubRef.current = null;
//   }, []);

//   const safeLeaveThenCleanup = useCallback(() => {
//     if (!sessionId) return;

//     if (hasJoined && isConnected && !isStreamEnded) {
//       sendMessage("/app/live/leave", {
//         session: sessionId,
//         userId: userObject?.usid,
//       });
//     }

//     cleanupSubscriptions();
//   }, [
//     sessionId,
//     hasJoined,
//     isConnected,
//     isStreamEnded,
//     sendMessage,
//     userObject?.usid,
//     cleanupSubscriptions,
//   ]);

//   useEffect(() => {
//     if (enabled && !isConnected)
//       console.log("⏳ useLiveStream: Enabled but waiting for connection...");
//     if (enabled && isConnected && !sessionId)
//       console.log("⏳ useLiveStream: Enabled & Connected but no Session ID");

//     if (
//       !enabled ||
//       !isConnected ||
//       !client ||
//       !client.connected ||
//       !sessionId
//     ) {
//       return;
//     }

//     if (currentSessionIdRef.current !== sessionId) {
//       console.log(
//         `🔄 Session ID changed from ${currentSessionIdRef.current} to ${sessionId}, cleaning up subs.`,
//       );
//       cleanupSubscriptions();
//       currentSessionIdRef.current = sessionId;
//       setHasJoined(false);
//       setIsStreamEnded(false);
//       setViewerCount(0);
//     }

//     if (joinSubRef.current) return;

//     console.log("🔌 Subscribing to live stream topics for:", sessionId);

//     try {
//       const joinTopic = `/topic/live/${sessionId}/join`;
//       const leaveTopic = `/topic/live/${sessionId}/leave`;
//       const endTopic = `/topic/live/${sessionId}/end`;
//       const commentTopic = `/topic/live/${sessionId}/comment`;
//       const reactionTopic = `/topic/live/${sessionId}/reaction`;

//       joinSubRef.current = client.subscribe(joinTopic, (message) => {
//         try {
//           const payload = parseLiveEvent(message.body);
//           console.log("👋 Join Event:", payload);
//           if (!payload) return;

//           if (payload.event === "USER_JOIN_LIVE") {
//             const me = userObject?.email || userObject?.usid;
//             if (payload.user !== me) {
//               setViewerCount((prev) => prev + 1);
//             }
//           }
//         } catch (e) {
//           console.error("Error parsing join", e);
//         }
//       });

//       leaveSubRef.current = client.subscribe(leaveTopic, (message) => {
//         try {
//           const payload = parseLiveEvent(message.body);
//           console.log("👋 Leave Event:", payload);
//           if (!payload) return;

//           if (payload.event === "USER_LEFT_LIVE") {
//             const me = userObject?.email || userObject?.usid;
//             if (payload.user !== me) {
//               setViewerCount((prev) => Math.max(0, prev - 1));
//             }
//           }
//         } catch (e) {
//           console.error("Error parsing leave", e);
//         }
//       });

//       endSubRef.current = client.subscribe(endTopic, (message) => {
//         console.log("🛑 End Topic Message:", message.body);
//         try {
//           const payload = parseLiveEvent(message.body);
//           console.log("🛑 End Payload:", payload);

//           if (payload?.event === "CREATOR_ENDED_LIVE") {
//             setIsStreamEnded(true);
//             setHasJoined(false);
//           } else {
//             console.log(
//               "⚠️ Stream End Event received but condition NOT met:",
//               payload,
//             );
//           }
//         } catch (e) {
//           console.error("Error parsing end", e);
//         }
//       });

//       commentSubRef.current = client.subscribe(commentTopic, (message) => {
//         try {
//           const payload = parseLiveEvent(message.body);
//           console.log("💬 Comment Payload:", payload);
//           if (!payload || payload.event !== "LIVE_COMMENT") return;

//           const comment: LiveComment = {
//             id: payload.id || payload.commentId || Date.now(),
//             sessionID: payload.sessionID || sessionId,
//             message: payload.message || payload.text || "",
//             user: payload.user || payload.username || "Anonymous",
//             userId: payload.userId || payload.usid,
//             username: payload.username || payload.displayName || payload.user,
//             timestamp: payload.timestamp || Date.now(),
//           };

//           if (comment.message && onCommentReceived) {
//             onCommentReceived(comment);
//           }
//         } catch (e) {
//           console.error("Error parsing comment", e);
//         }
//       });

//       reactionSubRef.current = client.subscribe(reactionTopic, (message) => {
//         try {
//           const payload = parseLiveEvent(message.body);
//           console.log("❤️ Reaction Payload:", payload);
//           if (!payload) return;

//           const reaction: LiveReaction = {
//             id: payload.id || Date.now(),
//             session: payload.session || sessionId,
//             reactionType: payload.reactionType || payload.type,
//             user: payload.user,
//             userId: payload.userId,
//             timestamp: payload.timestamp || Date.now(),
//           };

//           if (onReactionReceived) {
//             onReactionReceived(reaction);
//           }
//         } catch (e) {
//           console.error("Error parsing reaction", e);
//         }
//       });
//     } catch (err) {
//       console.error("❌ Error subscribing to live topics:", err);
//     }

//     return () => {
//       cleanupSubscriptions();
//       currentSessionIdRef.current = null;
//     };
//   }, [
//     enabled,
//     isConnected,
//     client,
//     sessionId,
//     onCommentReceived,
//     onReactionReceived,
//   ]);

//   const joinLiveStream = useCallback(() => {
//     if (!enabled || !isConnected || !sessionId || hasJoined || role === "HOST")
//       return;

//     if (!joinSubRef.current) {
//       if (joinRetryCancelledRef.current) return;
//       setTimeout(joinLiveStream, 200);
//       return;
//     }

//     sendMessage("/app/live/join", {
//       session: sessionId,
//       creatorId,
//       role,
//     });

//     setHasJoined(true);
//     setViewerCount((prev) => (prev === 0 ? 1 : prev));
//   }, [
//     enabled,
//     isConnected,
//     sessionId,
//     hasJoined,
//     role,
//     creatorId,
//     sendMessage,
//   ]);

//   useEffect(() => {
//     joinRetryCancelledRef.current = false;
//     const t = setTimeout(() => {
//       joinLiveStream();
//     }, 500);
//     return () => {
//       joinRetryCancelledRef.current = true;
//       clearTimeout(t);
//     };
//   }, [joinLiveStream]);

//   const sendComment = useCallback(
//     (message: string) => {
//       if (!sessionId || !message.trim() || !isConnected) return false;

//       try {
//         sendMessage("/app/live/comment", {
//           session: sessionId,
//           message: message.trim(),
//         });
//         return true;
//       } catch (error) {
//         console.error("❌ Error sending comment:", error);
//         showInlineToast({
//           type: "error",
//           title: "Failed to send comment",
//         });
//         return false;
//       }
//     },
//     [sessionId, isConnected, sendMessage],
//   );

//   // Previously this had no try/catch at all, unlike sendComment right
//   // above it — if publish() threw, it would go uncaught and the caller
//   // would never find out the reaction didn't actually send. Brought it in
//   // line with sendComment's error handling so a failed reaction reports
//   // back false and shows the same kind of toast instead of failing silently.
//   const sendReaction = useCallback(
//     (reactionType: ReactionType) => {
//       if (!sessionId || !isConnected) return false;

//       try {
//         sendMessage("/app/live/reaction", {
//           session: sessionId,
//           reactionType,
//         });
//         return true;
//       } catch (error) {
//         console.error("❌ Error sending reaction:", error);
//         showInlineToast({
//           type: "error",
//           title: "Failed to send reaction",
//         });
//         return false;
//       }
//     },
//     [sessionId, isConnected, sendMessage],
//   );

//   const leaveLiveStream = useCallback(() => {
//     safeLeaveThenCleanup();
//     setHasJoined(false);
//   }, [safeLeaveThenCleanup]);

//   useEffect(() => {
//     return () => {
//       safeLeaveThenCleanup();
//     };
//   }, [safeLeaveThenCleanup]);

//   return {
//     viewerCount,
//     hasJoined,
//     isStreamEnded,
//     joinLiveStream,
//     leaveLiveStream,
//     sendComment,
//     sendReaction,
//   };
// };

/* eslint-disable react-hooks/exhaustive-deps */
import { useWebSocket } from "@/context/WebSocketContext";
import { useAppSelector } from "@/lib/hook";
import type {
  LiveComment,
  LiveReaction,
  ReactionType,
  UseLiveStreamProps,
} from "@/lib/types";
import { parseLiveEvent } from "@/utils/helper";
import { useCallback, useEffect, useRef, useState } from "react";
import type { StompSubscription } from "@stomp/stompjs";
import { showInlineToast } from "@/utils/toastUtils";

interface UseLiveStreamPropsExtended extends UseLiveStreamProps {
  onCommentReceived?: (comment: LiveComment) => void;
  onReactionReceived?: (reaction: LiveReaction) => void;
}

export const useLiveStream = ({
  sessionId,
  creatorId,
  role,
  enabled = true,
  onCommentReceived,
  onReactionReceived,
}: UseLiveStreamPropsExtended) => {
  const { userObject } = useAppSelector((state) => state.auth);

  const { client, isConnected, sendMessage } = useWebSocket();

  const [viewerCount, setViewerCount] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);
  const [isStreamEnded, setIsStreamEnded] = useState(false);

  const joinSubRef = useRef<StompSubscription | null>(null);
  const leaveSubRef = useRef<StompSubscription | null>(null);
  const endSubRef = useRef<StompSubscription | null>(null);
  const commentSubRef = useRef<StompSubscription | null>(null);
  const reactionSubRef = useRef<StompSubscription | null>(null);

  const currentSessionIdRef = useRef<string | null>(null);

  // Cancels the auto-join retry loop below on unmount so it can't keep
  // firing setTimeout(joinLiveStream, 200) against a stale closure forever
  // if the socket never becomes ready while this component is gone.
  const joinRetryCancelledRef = useRef(false);

  const cleanupSubscriptions = useCallback(() => {
    joinSubRef.current?.unsubscribe();
    leaveSubRef.current?.unsubscribe();
    endSubRef.current?.unsubscribe();
    commentSubRef.current?.unsubscribe();
    reactionSubRef.current?.unsubscribe();

    joinSubRef.current = null;
    leaveSubRef.current = null;
    endSubRef.current = null;
    commentSubRef.current = null;
    reactionSubRef.current = null;
  }, []);

  const safeLeaveThenCleanup = useCallback(() => {
    if (!sessionId) return;

    if (hasJoined && isConnected && !isStreamEnded) {
      sendMessage("/app/live/leave", {
        session: sessionId,
        userId: userObject?.usid,
      });
    }

    cleanupSubscriptions();
  }, [
    sessionId,
    hasJoined,
    isConnected,
    isStreamEnded,
    sendMessage,
    userObject?.usid,
    cleanupSubscriptions,
  ]);

  useEffect(() => {
    if (enabled && !isConnected)
      console.log("⏳ useLiveStream: Enabled but waiting for connection...");
    if (enabled && isConnected && !sessionId)
      console.log("⏳ useLiveStream: Enabled & Connected but no Session ID");

    if (
      !enabled ||
      !isConnected ||
      !client ||
      !client.connected ||
      !sessionId
    ) {
      return;
    }

    if (currentSessionIdRef.current !== sessionId) {
      console.log(
        `🔄 Session ID changed from ${currentSessionIdRef.current} to ${sessionId}, cleaning up subs.`,
      );
      cleanupSubscriptions();
      currentSessionIdRef.current = sessionId;
      setHasJoined(false);
      setIsStreamEnded(false);
      setViewerCount(0);
    }

    if (joinSubRef.current) return;

    console.log("🔌 Subscribing to live stream topics for:", sessionId);

    try {
      const joinTopic = `/topic/live/${sessionId}/join`;
      const leaveTopic = `/topic/live/${sessionId}/leave`;
      const endTopic = `/topic/live/${sessionId}/end`;
      const commentTopic = `/topic/live/${sessionId}/comment`;
      const reactionTopic = `/topic/live/${sessionId}/reaction`;

      joinSubRef.current = client.subscribe(joinTopic, (message) => {
        try {
          const payload = parseLiveEvent(message.body);
          console.log("👋 Join Event:", payload);
          if (!payload) return;

          if (payload.event === "USER_JOIN_LIVE") {
            const me = userObject?.email || userObject?.usid;
            if (payload.user !== me) {
              setViewerCount((prev) => prev + 1);
            }
          }
        } catch (e) {
          console.error("Error parsing join", e);
        }
      });

      leaveSubRef.current = client.subscribe(leaveTopic, (message) => {
        try {
          const payload = parseLiveEvent(message.body);
          console.log("👋 Leave Event:", payload);
          if (!payload) return;

          if (payload.event === "USER_LEFT_LIVE") {
            const me = userObject?.email || userObject?.usid;
            if (payload.user !== me) {
              setViewerCount((prev) => Math.max(0, prev - 1));
            }
          }
        } catch (e) {
          console.error("Error parsing leave", e);
        }
      });

      endSubRef.current = client.subscribe(endTopic, (message) => {
        console.log("🛑 End Topic Message:", message.body);
        // This topic (/topic/live/{sessionId}/end) is scoped to this one
        // session and only ever carries an end signal — there's no other
        // reason a message would land here. Previously this only counted
        // as "ended" if payload.event === "CREATOR_ENDED_LIVE", an assumed
        // shape that isn't actually guaranteed by the backend. That gate
        // silently prevented viewers from ever auto-leaving when the host
        // ended the stream. Now any message here is treated as authoritative.
        try {
          const payload = parseLiveEvent(message.body);
          console.log("🛑 End Payload:", payload);
        } catch (e) {
          console.error(
            "Error parsing end payload (treating as end anyway)",
            e,
          );
        }
        setIsStreamEnded(true);
        setHasJoined(false);
      });

      commentSubRef.current = client.subscribe(commentTopic, (message) => {
        try {
          const payload = parseLiveEvent(message.body);
          console.log(
            "💬 Comment Payload:",
            payload,
            "keys:",
            payload ? Object.keys(payload) : [],
          );
          if (!payload || payload.event !== "LIVE_COMMENT") return;

          const comment: LiveComment = {
            id: payload.id || payload.commentId || Date.now(),
            sessionID: payload.sessionID || sessionId,
            message: payload.message || payload.text || "",
            user: payload.user || payload.username || "Anonymous",
            userId: payload.userId || payload.usid,
            username: payload.username || payload.displayName || payload.user,
            timestamp: payload.timestamp || Date.now(),
          };
          // Carried through so the UI can recognize the echo of its own
          // optimistically-added message without depending on any
          // particular user-identity field name (see sendComment below).
          (comment as any).clientMessageId = payload.clientMessageId;

          if (comment.message && onCommentReceived) {
            onCommentReceived(comment);
          }
        } catch (e) {
          console.error("Error parsing comment", e);
        }
      });

      reactionSubRef.current = client.subscribe(reactionTopic, (message) => {
        try {
          const payload = parseLiveEvent(message.body);
          console.log("❤️ Reaction Payload:", payload);
          if (!payload) return;

          const reaction: LiveReaction = {
            id: payload.id || Date.now(),
            session: payload.session || sessionId,
            reactionType: payload.reactionType || payload.type,
            user: payload.user,
            userId: payload.userId,
            timestamp: payload.timestamp || Date.now(),
          };

          if (onReactionReceived) {
            onReactionReceived(reaction);
          }
        } catch (e) {
          console.error("Error parsing reaction", e);
        }
      });
    } catch (err) {
      console.error("❌ Error subscribing to live topics:", err);
    }

    return () => {
      cleanupSubscriptions();
      currentSessionIdRef.current = null;
    };
  }, [
    enabled,
    isConnected,
    client,
    sessionId,
    onCommentReceived,
    onReactionReceived,
  ]);

  const joinLiveStream = useCallback(() => {
    if (!enabled || !isConnected || !sessionId || hasJoined || role === "HOST")
      return;

    if (!joinSubRef.current) {
      if (joinRetryCancelledRef.current) return;
      setTimeout(joinLiveStream, 200);
      return;
    }

    sendMessage("/app/live/join", {
      session: sessionId,
      creatorId,
      role,
    });

    setHasJoined(true);
    setViewerCount((prev) => (prev === 0 ? 1 : prev));
  }, [
    enabled,
    isConnected,
    sessionId,
    hasJoined,
    role,
    creatorId,
    sendMessage,
  ]);

  useEffect(() => {
    joinRetryCancelledRef.current = false;
    const t = setTimeout(() => {
      joinLiveStream();
    }, 500);
    return () => {
      joinRetryCancelledRef.current = true;
      clearTimeout(t);
    };
  }, [joinLiveStream]);

  // Previously returned a plain boolean and the caller had no reliable way
  // to recognize its own message when it came back through the comment
  // broadcast (relying on comment.userId === userObject.usid, which
  // silently fails if the backend's field name differs — this is what was
  // causing the sender's own message to double up, and to display as
  // "Anonymous" instead of being filtered out). Now every outgoing comment
  // gets a client-generated correlation id; the caller tracks it locally
  // and drops the echo when it comes back, regardless of what identity
  // fields the backend does or doesn't include on the broadcast.
  const sendComment = useCallback(
    (message: string): string | null => {
      if (!sessionId || !message.trim() || !isConnected) return null;

      const clientMessageId = `local-${Date.now()}-${Math.random()
        .toString(36)
        .slice(2, 8)}`;

      try {
        sendMessage("/app/live/comment", {
          session: sessionId,
          message: message.trim(),
          clientMessageId,
        });
        return clientMessageId;
      } catch (error) {
        console.error("❌ Error sending comment:", error);
        showInlineToast({
          type: "error",
          title: "Failed to send comment",
        });
        return null;
      }
    },
    [sessionId, isConnected, sendMessage],
  );

  // Previously this had no try/catch at all, unlike sendComment right
  // above it — if publish() threw, it would go uncaught and the caller
  // would never find out the reaction didn't actually send. Brought it in
  // line with sendComment's error handling so a failed reaction reports
  // back false and shows the same kind of toast instead of failing silently.
  const sendReaction = useCallback(
    (reactionType: ReactionType) => {
      if (!sessionId || !isConnected) return false;

      try {
        sendMessage("/app/live/reaction", {
          session: sessionId,
          reactionType,
        });
        return true;
      } catch (error) {
        console.error("❌ Error sending reaction:", error);
        showInlineToast({
          type: "error",
          title: "Failed to send reaction",
        });
        return false;
      }
    },
    [sessionId, isConnected, sendMessage],
  );

  const leaveLiveStream = useCallback(() => {
    safeLeaveThenCleanup();
    setHasJoined(false);
  }, [safeLeaveThenCleanup]);

  useEffect(() => {
    return () => {
      safeLeaveThenCleanup();
    };
  }, [safeLeaveThenCleanup]);

  return {
    viewerCount,
    hasJoined,
    isStreamEnded,
    joinLiveStream,
    leaveLiveStream,
    sendComment,
    sendReaction,
  };
};
