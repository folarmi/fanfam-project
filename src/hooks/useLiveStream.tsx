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

  // Subscribe to session-specific topics
  // useEffect(() => {
  //   if (!isConnected || !enabled || !sessionId || !client) {
  //     console.log("⚠️ Not ready to subscribe:", {
  //       isConnected,
  //       enabled,
  //       sessionId,
  //     });
  //     return;
  //   }

  //   console.log(
  //     `🎥 Setting up live stream subscriptions for session: ${sessionId}`,
  //   );

  //   try {
  //     // Subscribe to join events
  //     const joinTopic = `/topic/live/${sessionId}/join`;
  //     console.log(`🔔 Subscribing to: ${joinTopic}`);

  //     joinSubRef.current = client.subscribe(joinTopic, (message) => {
  //       console.log("👋 User joined:", message.body);

  //       try {
  //         const data: JoinLeaveMessage = JSON.parse(message.body);
  //         setViewerCount((prev) => prev + 1);

  //         // Show toast for new viewers (only for host)
  //         if (role === "HOST" && data.role === "VIEWER") {
  //           toast.info(`${data.userId || "Someone"} joined your stream`, {
  //             autoClose: 3000,
  //           });
  //         }
  //       } catch (error) {
  //         console.error("Error parsing join message:", error);
  //       }
  //     });

  //     // Subscribe to leave events
  //     // const leaveTopic = `/topic/live/${sessionId}/leave`;
  //     // console.log(`🔔 Subscribing to: ${leaveTopic}`);

  //     // leaveSubRef.current = client.subscribe(leaveTopic, (message) => {
  //     //   console.log("👋 User left:", message.body);

  //     //   try {
  //     //     const data: JoinLeaveMessage = JSON.parse(message.body);
  //     //     setViewerCount((prev) => Math.max(0, prev - 1));
  //     //   } catch (error) {
  //     //     console.error("Error parsing leave message:", error);
  //     //   }
  //     // });

  //     // Subscribe to end events
  //     // const endTopic = `/topic/live/${sessionId}/end`;
  //     // console.log(`🔔 Subscribing to: ${endTopic}`);

  //     // endSubRef.current = client.subscribe(endTopic, (message) => {
  //     //   console.log("🛑 Stream ended:", message.body);

  //     //   try {
  //     //     setIsStreamEnded(true);
  //     //     toast.info("Stream has ended", { autoClose: 5000 });
  //     //   } catch (error) {
  //     //     console.error("Error parsing end message:", error);
  //     //   }
  //     // });

  //     console.log("✅ Live stream subscriptions set up successfully");
  //   } catch (error) {
  //     console.error("❌ Error setting up subscriptions:", error);
  //   }

  //   // Cleanup subscriptions
  //   return () => {
  //     joinSubRef.current?.unsubscribe();
  //     leaveSubRef.current?.unsubscribe();
  //     endSubRef.current?.unsubscribe();

  //     joinSubRef.current = null;
  //     leaveSubRef.current = null;
  //     endSubRef.current = null;
  //   };
  // }, [isConnected, enabled, client, sessionId, role]);

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
