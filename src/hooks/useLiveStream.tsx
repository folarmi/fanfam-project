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
import { toast } from "react-toastify";
import type { StompSubscription } from "@stomp/stompjs";

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

  // Use strict types for subscriptions
  const joinSubRef = useRef<StompSubscription | null>(null);
  const leaveSubRef = useRef<StompSubscription | null>(null);
  const endSubRef = useRef<StompSubscription | null>(null);
  const commentSubRef = useRef<StompSubscription | null>(null);
  const reactionSubRef = useRef<StompSubscription | null>(null);
  
  // Track current sessionId to detect changes
  const currentSessionIdRef = useRef<string | null>(null);

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

    // Only send leave if user had joined and stream isn't ended
    if (hasJoined && isConnected && !isStreamEnded) {
      sendMessage("/app/live/leave", {
        session: sessionId,
        userId: userObject?.usid,
      });
    }

    // Unsubscribe immediately to prevent race conditions
    cleanupSubscriptions();
  }, [sessionId, hasJoined, isConnected, isStreamEnded, sendMessage, userObject?.usid, cleanupSubscriptions]);

  // Main subscription effect
  useEffect(() => {
    if (!enabled || !isConnected || !client || !client.connected || !sessionId) {
      return;
    }

    // If session changed, cleanup old subs first
    if (currentSessionIdRef.current !== sessionId) {
        cleanupSubscriptions();
        currentSessionIdRef.current = sessionId;
        setHasJoined(false);
        setIsStreamEnded(false);
        setViewerCount(0);
    }
    
    // Check if already subscribed to THESE topics
    if (joinSubRef.current) return;

    console.log("🔌 Subscribing to live stream topics for:", sessionId);

    try {
      const joinTopic = `/topic/live/${sessionId}/join`;
      const leaveTopic = `/topic/live/${sessionId}/leave`;
      const endTopic = `/topic/live/${sessionId}/end`;
      const commentTopic = `/topic/live/${sessionId}/comment`;
      const reactionTopic = `/topic/live/${sessionId}/reaction`;

      // JOIN
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
        } catch(e) { console.error("Error parsing join", e); }
      });

      // LEAVE
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
        } catch(e) { console.error("Error parsing leave", e); }
      });

      // END
      endSubRef.current = client.subscribe(endTopic, (message) => {
        console.log("🛑 End Topic Message:", message.body);
        try {
            const payload = parseLiveEvent(message.body);
            console.log("🛑 End Payload:", payload);
            
            // Check for various forms of END event
            if (payload?.event === "CREATOR_ENDED_LIVE" || payload?.event === "END_LIVE" || payload?.type === "END") {
              setIsStreamEnded(true);
              setHasJoined(false);
            }
        } catch (e) { console.error("Error parsing end", e); }
      });

      // COMMENT
      commentSubRef.current = client.subscribe(commentTopic, (message) => {
        try {
            const payload = parseLiveEvent(message.body);
            console.log("💬 Comment Payload:", payload);
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

            if (comment.message && onCommentReceived) {
                onCommentReceived(comment);
            }
        } catch (e) { console.error("Error parsing comment", e); }
      });

      // REACTION
      reactionSubRef.current = client.subscribe(reactionTopic, (message) => {
        try {
             // Sometimes body is already object? strict mode STOMP usually returns string body
            const payload = parseLiveEvent(message.body);
            console.log("❤️ Reaction Payload:", payload);
            if (!payload) return;

            const reaction: LiveReaction = {
                id: payload.id || Date.now(),
                session: payload.session || sessionId,
                reactionType: payload.reactionType || payload.type, // Fallback
                user: payload.user,
                userId: payload.userId,
                timestamp: payload.timestamp || Date.now(),
            };

            if (onReactionReceived) {
                onReactionReceived(reaction);
            }
        } catch (e) { console.error("Error parsing reaction", e); }
      });

    } catch (err) {
      console.error("❌ Error subscribing to live topics:", err);
    }

    return () => {
      // Cleanup on unmount or dependency change
      // Note: we don't send LEAVE here because we handle it in safeLeaveThenCleanup
      // which is called by the component using this hook usually, or we can add it here.
      // But adding it here might cause leaving when just re-rendering if deps change.
      // The established pattern seems to be relying on cleanup.
      
      // Actually, standard hook behavior: if we unmount, we should leave.
      // But we need to use a ref to know if we really joined.
      // We'll rely on the manual `leaveLiveStream` or explicit unmount logic from parent if needed, 
      // OR we just cleanup subscriptions here.
      
      // Let's just cleanup subscriptions here to be safe and avoid memory leaks.
      // We will NOT send the 'leave' message here automatically to avoid accidental leaves on re-renders,
      // unless we are sure it's a permanent unmount.
      cleanupSubscriptions();
      currentSessionIdRef.current = null;
    };
  }, [enabled, isConnected, client, sessionId, onCommentReceived, onReactionReceived]); // Added missing deps

  // Join the live stream
  const joinLiveStream = useCallback(() => {
    if (!enabled || !isConnected || !sessionId || hasJoined || role === "HOST") return;

    // Check if subs are ready
    if (!joinSubRef.current) {
        // Retry shortly if subs aren't ready yet (race condition with effect)
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
  }, [enabled, isConnected, sessionId, hasJoined, role, creatorId, sendMessage]);

  // Auto-join effect
  useEffect(() => {
      const t = setTimeout(() => {
          joinLiveStream();
      }, 500); // Small delay to ensure everything is ready
      return () => clearTimeout(t);
  }, [joinLiveStream]);

  // Send comment
  const sendComment = useCallback(
    (message: string) => {
      if (!sessionId || !message.trim() || !isConnected) return false;

      try {
        sendMessage("/app/live/comment", {
          session: sessionId,
          message: message.trim(),
        });
        return true;
      } catch (error) {
        console.error("❌ Error sending comment:", error);
        toast.error("Failed to send comment");
        return false;
      }
    },
    [sessionId, isConnected, sendMessage],
  );

  // Send reaction
  const sendReaction = useCallback(
    (reactionType: ReactionType) => {
      if (!sessionId || !isConnected) return false;

      sendMessage("/app/live/reaction", {
        session: sessionId,
        reactionType,
      });
      return true;
    },
    [sessionId, isConnected, sendMessage],
  );

  const leaveLiveStream = useCallback(() => {
      safeLeaveThenCleanup();
      setHasJoined(false);
  }, [safeLeaveThenCleanup]);

  // Cleanup on unmount of the hook usage
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
