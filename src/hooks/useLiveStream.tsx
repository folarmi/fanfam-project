/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useWebSocket } from "@/context/WebSocketContext";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type { JoinLeaveMessage, UseLiveStreamProps } from "@/lib/types";
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

  const joinSubRef = useRef<any>(null);
  const leaveSubRef = useRef<any>(null);

  // Subscribe to join/leave events
  useEffect(() => {
    if (!isConnected || !enabled || !sessionId) return;

    console.log(
      `🎥 Setting up live stream subscriptions for session: ${sessionId}`
    );

    // Subscribe to join events
    const joinTopic = `/topic/live/${sessionId}/join`;
    console.log(`🔔 Subscribing to: ${joinTopic}`);

    joinSubRef.current = client?.subscribe(joinTopic, (message) => {
      console.log("👋 User joined:", message.body);

      try {
        const data: JoinLeaveMessage = JSON.parse(message.body);
        setViewerCount((prev) => prev + 1);

        // Optional: Show toast for new viewers
        if (role === "HOST" && data.role === "VIEWER") {
          toast.info(`${data.userId || "Someone"} joined your stream`);
        }
      } catch (error) {
        console.error("Error parsing join message:", error);
      }
    });

    // Subscribe to leave events
    // const leaveTopic = `/topic/live/${sessionId}/leave`;
    // console.log(`🔔 Subscribing to: ${leaveTopic}`);

    // leaveSubRef.current = client?.subscribe(leaveTopic, (message) => {
    //   console.log("👋 User left:", message.body);

    //   try {
    //     const data: JoinLeaveMessage = JSON.parse(message.body);
    //     console.log("leave data", data);
    //     setViewerCount((prev) => Math.max(0, prev - 1));
    //   } catch (error) {
    //     console.error("Error parsing leave message:", error);
    //   }
    // });

    console.log("✅ Live stream subscriptions set up");

    // Cleanup subscriptions
    return () => {
      console.log("🧹 Cleaning up live stream subscriptions");
      joinSubRef.current?.unsubscribe();
      leaveSubRef.current?.unsubscribe();
    };
  }, [isConnected, sessionId, enabled, client, role]);

  // Join the live stream
  const joinLiveStream = () => {
    if (!isConnected) {
      toast.error("Not connected to server");
      return;
    }

    console.log(`📤 Joining live stream: ${sessionId}`);

    sendMessage("/app/live/join", {
      session: sessionId,
      creatorId: creatorId,
      role: role,
    });

    setHasJoined(true);
  };

  // Leave the live stream
  const leaveLiveStream = () => {
    if (!isConnected || !hasJoined) return;

    console.log(`📤 Leaving live stream: ${sessionId}`);

    sendMessage("/app/live/leave", {
      session: sessionId,
      userId: userObject?.usid,
    });

    setHasJoined(false);
  };

  // Auto-join when component mounts (if enabled)
  useEffect(() => {
    if (enabled && isConnected && !hasJoined && sessionId) {
      // Small delay to ensure subscriptions are set up first
      const timer = setTimeout(() => {
        joinLiveStream();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [enabled, isConnected, sessionId]);

  // Auto-leave when component unmounts
  useEffect(() => {
    return () => {
      if (hasJoined) {
        leaveLiveStream();
      }
    };
  }, [hasJoined]);

  return {
    viewerCount,
    hasJoined,
    joinLiveStream,
    leaveLiveStream,
  };
};
