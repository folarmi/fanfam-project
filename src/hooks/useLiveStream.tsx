/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { useWebSocket } from "@/context/WebSocketContext";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type { UseLiveStreamProps } from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

export const useLiveStream = ({
  sessionId,
  creatorId,
  role,
  enabled = true,
}: UseLiveStreamProps) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { isConnected, sendMessage } = useWebSocket();
  const [viewerCount] = useState(0);
  const [hasJoined, setHasJoined] = useState(false);
  const [isStreamEnded] = useState(false);

  const joinSubRef = useRef<any>(null);
  const leaveSubRef = useRef<any>(null);
  const endSubRef = useRef<any>(null);

  useEffect(() => {
    if (!enabled) return;
    if (!isConnected) return;
    if (!sessionId) return;
    if (hasJoined) return;

    // we only need joinSubRef to be ready
    if (!joinSubRef.current) return;

    const timer = setTimeout(() => {
      joinLiveStream();
    }, 300);

    return () => clearTimeout(timer);
  }, [enabled, isConnected, sessionId, hasJoined, role]);

  // Join the live stream
  // const joinLiveStream = () => {
  //   if (!isConnected) {
  //     toast.error("Not connected to server");
  //     return;
  //   }

  //   if (!sessionId) {
  //     toast.error("Invalid session");
  //     return;
  //   }

  //   console.log(`📤 Joining live stream: ${sessionId}`, {
  //     session: sessionId,
  //     creatorId: creatorId,
  //     role: role,
  //   });

  //   sendMessage("/app/live/join", {
  //     session: sessionId,
  //     creatorId: creatorId,
  //     role: role,
  //   });

  //   setHasJoined(true);
  //   console.log("✅ Join message sent");
  // };

  const joinLiveStream = () => {
    if (!isConnected) {
      toast.error("Not connected to server");
      return;
    }

    if (!sessionId) {
      toast.error("Invalid session");
      return;
    }

    if (hasJoined) return; // prevent duplicates

    sendMessage("/app/live/join", {
      session: sessionId,
      creatorId,
      role, // "VIEWER" or "HOST"
    });
    console.log(sessionId, creatorId, role);
    setHasJoined(true);
  };

  // Leave the live stream
  const leaveLiveStream = () => {
    if (!isConnected) {
      console.log("⚠️ Not connected, skipping leave message");
      return;
    }

    console.log(`📤 Leaving live stream: ${sessionId}`);

    sendMessage("/app/live/leave", {
      session: sessionId,
      userId: userObject?.usid,
      role: role,
    });

    setHasJoined(false);
  };

  // Auto-join when subscriptions are ready (for both HOST and VIEWER)
  useEffect(() => {
    if (
      enabled &&
      isConnected &&
      !hasJoined &&
      sessionId &&
      joinSubRef.current &&
      leaveSubRef.current &&
      endSubRef.current
    ) {
      // Small delay to ensure subscriptions are fully ready
      const timer = setTimeout(() => {
        console.log(`⏰ Auto-joining stream as ${role}...`);
        joinLiveStream();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [enabled, isConnected, sessionId, hasJoined, role]);

  // Auto-leave when component unmounts
  useEffect(() => {
    return () => {
      if (hasJoined && isConnected) {
        console.log("🧹 Component unmounting, leaving stream");
        leaveLiveStream();
      }
    };
  }, [hasJoined, isConnected]);

  return {
    viewerCount,
    hasJoined,
    isStreamEnded,
    joinLiveStream,
    leaveLiveStream,
  };
};
