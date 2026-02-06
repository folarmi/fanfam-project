/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useWebSocket } from "@/context/WebSocketContext";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type {
  LiveComment,
  LiveReaction,
  ReactionType,
  UseLiveStreamProps,
} from "@/lib/types";
import { parseLiveEvent } from "@/utils/helper";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
          // console.log("🛑 END EVENT RAW:", message.body);
          const payload = parseLiveEvent(message.body);
          if (!payload) return;

          // console.log("🛑 END EVENT PARSED:", payload);

          if (payload.event !== "CREATOR_ENDED_LIVE") return;

          setIsStreamEnded(true);
          setHasJoined(false);
        });
      }

      // COMMENT subscription
      if (!commentSubRef.current) {
        commentSubRef.current = client.subscribe(commentTopic, (message) => {
          console.log("💬 COMMENT EVENT RAW:", message.body);

          const payload = parseLiveEvent(message.body);
          if (!payload) return;

          console.log("💬 COMMENT EVENT PARSED:", payload);

          // ✅ FLEXIBLE: Check for different event field formats
          if (payload.event !== "LIVE_COMMENT") {
            // console.log("⚠️ Skipping non-comment event:", eventType);
            return;
          }

          // ✅ Extract comment data with flexible field names
          const comment: LiveComment = {
            id:
              payload.id ||
              payload.commentId ||
              payload.messageId ||
              Date.now(),
            sessionID: payload.sessionID || payload.session || sessionId,
            message: payload.message || payload.text || payload.content || "",
            user: payload.user || payload.username || payload.userName,
            userId: payload.userId || payload.usid || payload.uid,
            username:
              payload.username || payload.userName || payload.displayName,
            timestamp:
              payload.timestamp ||
              payload.createdAt ||
              payload.time ||
              Date.now(),
          };

          console.log("✅ Comment received:", comment);

          // Validate comment has required fields
          if (!comment.message) {
            console.warn("⚠️ Received comment with no message, ignoring");
            return;
          }

          // Call the callback if provided
          if (onCommentReceived) {
            onCommentReceived(comment);
          }
        });
        console.log("✅ Subscribed to:", commentTopic);
      }

      // REACTION
      if (!reactionSubRef.current) {
        console.log("reactedddd");

        reactionSubRef.current = client.subscribe(reactionTopic, (message) => {
          const payload = parseLiveEvent(message.body);
          console.log("🛑 REACTION EVENT RAW:", message.body);
          if (!payload) return;

          const reaction: LiveReaction = {
            id: payload?.id || Date.now(),
            session: payload.session || sessionId,
            reactionType: payload?.reactionType,
            user: payload.user,
            userId: payload.userId,
            timestamp: payload.timestamp || Date.now(),
          };

          if (onReactionReceived) {
            onReactionReceived(reaction);
          }
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

  const sendComment = useCallback(
    (message: string) => {
      if (!sessionId) {
        console.error("❌ Cannot send comment: No session ID");
        return false;
      }

      if (!message.trim()) {
        console.error("❌ Cannot send comment: Message is empty");
        return false;
      }

      if (!isConnected) {
        console.error("❌ Cannot send comment: Not connected");
        toast.error("Not connected to server");
        return false;
      }

      try {
        sendMessage("/app/live/comment", {
          session: sessionId,
          message: message.trim(),
        });

        console.log("✅ Comment sent successfully");
        return true;
      } catch (error) {
        console.error("❌ Error sending comment:", error);
        toast.error("Failed to send comment");
        return false;
      }
    },
    [sessionId, isConnected, sendMessage],
  );

  // Add sendReaction function
  const sendReaction = useCallback(
    (reactionType: ReactionType) => {
      if (!sessionId || !isConnected) {
        return false;
      }

      sendMessage("/app/live/reaction", {
        session: sessionId,
        reactionType: reactionType,
      });
      console.log({
        session: sessionId,
        reactionType: reactionType,
      });
      return true;
    },
    [sessionId, isConnected, sendMessage],
  );

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
    sendComment,
    sendReaction,
  };
};
