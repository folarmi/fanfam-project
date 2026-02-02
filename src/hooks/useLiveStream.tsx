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
