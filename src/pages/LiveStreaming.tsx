/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */

import CustomButton from "@/components/forms/CustomButton";
import Typography from "@/components/forms/Typography";
import {
  ArrowLeft,
  Mic,
  Video,
  MicOff,
  VideoOff,
  Users,
  Settings,
  MessageCircle,
  Send,
  Phone,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import AgoraRTC from "agora-rtc-sdk-ng";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { useGetData } from "@/hooks/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MAX_CHANNEL_LENGTH } from "@/utils/helper";
import { useWebSocket } from "@/context/WebSocketContext";
import { formatDuration } from "@/utils/helperTwo";
import { useLiveStream } from "@/hooks/useLiveStream";
import { useFetchProfile } from "@/hooks/apiHooks";
import type {
  ChatMessage,
  FloatingReaction,
  LiveReaction,
  ReactionCount,
  ReactionType,
} from "@/lib/types";
import { ReactionCounter } from "@/components/live/ReactionCounter";
import { FloatingReactions } from "@/components/live/FloatingReactions";
import { ReactionButton } from "@/components/live/ReactionButton";

const LiveStreaming = () => {
  const navigate = useNavigate();
  const {
    client: stompClient,
    isConnected,
    sendMessage,
    removeCreatorFromLive,
    refetchLiveHosts,
    getLiveSession,
  } = useWebSocket();
  const { creatorId: urlCreatorIdEncoded, sessionId: urlSessionId } =
    useParams();

  // Decode the creatorId since it was encoded (contains @ symbol)
  const urlCreatorId = urlCreatorIdEncoded
    ? decodeURIComponent(urlCreatorIdEncoded)
    : undefined;

  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
  const { data: profileData } = useFetchProfile(userObject);
  // Determine if current user is the host
  const isHost = !urlCreatorId || urlCreatorId === userObject?.usid;

  const [channelName, setChannelName] = useState("");
  const [streamDuration, setStreamDuration] = useState(0);
  const [streamStartTime, setStreamStartTime] = useState<number | null>(null);
  const [streamDescription, setStreamDescription] = useState("");
  const [showTips, setShowTips] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const activeSession = isHost ? channelName : urlSessionId || "";
  const [chatMessage, setChatMessage] = useState("");
  const [floatingReactions, setFloatingReactions] = useState<
    FloatingReaction[]
  >([]);
  const [reactionCounts, setReactionCounts] = useState<ReactionCount>({
    LIKE: 0,
    LOVE: 0,
    DISLIKE: 0,
    LOL: 0,
  });

  const handleCommentReceived = useCallback((comment: any) => {
    console.log("📨 Received live comment:", comment);

    const newMessage = {
      id:
        typeof comment.id === "string"
          ? parseInt(comment.id)
          : (comment.id as number),
      user: comment.user || comment.userId || "Anonymous",
      username: comment.username,
      message: comment.message,
      time: comment.timestamp
        ? new Date(comment.timestamp).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
      isComment: true,
    };

    setChatMessages((prev) => [...prev, newMessage]);
  }, []);

  const handleReactionReceived = useCallback((reaction: LiveReaction) => {
    // Update counts
    setReactionCounts((prev) => ({
      ...prev,
      [reaction.reactionType]: prev[reaction.reactionType] + 1,
    }));

    // Add floating animation
    const floatingReaction: FloatingReaction = {
      id: `${reaction.id}-${Date.now()}`,
      type: reaction.reactionType,
      x: Math.random() * 80 + 10,
      y: 0,
    };

    setFloatingReactions((prev) => [...prev, floatingReaction]);

    // Remove after 3 seconds
    setTimeout(() => {
      setFloatingReactions((prev) =>
        prev.filter((r) => r.id !== floatingReaction.id),
      );
    }, 3000);
  }, []);

  const {
    viewerCount,
    isStreamEnded,
    sendComment,
    leaveLiveStream,
    sendReaction,
  } = useLiveStream({
    sessionId: activeSession || "",
    creatorId: isHost ? userObject?.usid : urlCreatorId,
    role: isHost ? "HOST" : "VIEWER",
    enabled: isStreaming && !!activeSession,
    onCommentReceived: handleCommentReceived,
    onReactionReceived: handleReactionReceived,
  });

  // ✅ Handle reaction clicks
  const handleReaction = (reactionType: ReactionType) => {
    if (!isStreaming || !sendReaction) return;

    const success = sendReaction(reactionType);
    if (success) {
      // Optimistically show own reaction
      handleReactionReceived({
        id: Date.now(),
        session: activeSession || "",
        reactionType: reactionType,
        user: "You",
        userId: userObject?.usid,
        timestamp: Date.now(),
      });
    }
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const agoraClientRef = useRef<any>(null);
  const localAudioTrackRef = useRef<any>(null);
  const localVideoTrackRef = useRef<any>(null);
  const streamTimerRef = useRef<any>(null);
  const joinSubRef = useRef<any>(null);
  const heartbeatRef = useRef<number | null>(null);
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  const startHeartbeat = () => {
    if (!isHost) return;
    if (heartbeatRef.current) return; // already running

    heartbeatRef.current = window.setInterval(() => {
      sendMessage("/app/live/streaming", { isStreaming: true });
    }, 25000);
  };

  const stopHeartbeat = () => {
    if (heartbeatRef.current) {
      window.clearInterval(heartbeatRef.current);
      heartbeatRef.current = null;
      // console.log("💓 HEARTBEAT STOP");
    }
  };

  const { isLoading: isLoadingToken, refetch: fetchToken } = useGetData({
    url: `/agora/rtc-token?channel=${channelName || activeSession}&uid=${userObject?.usid}`,
    queryKey: [
      "GetAgoraRTCToken",
      channelName || activeSession,
      userObject?.usid,
    ],
    enabled: false,
  });

  // If viewer, join existing stream
  useEffect(() => {
    if (!isHost && activeSession && urlCreatorId) {
      setChannelName(activeSession);
      setIsStreaming(true);

      // pass it directly so we don’t depend on async state updates
      joinExistingStream(activeSession);
    }
  }, [isHost, activeSession, urlCreatorId]);

  useEffect(() => {
    // Initialize preview stream
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((_err) => {
        // console.error("Error accessing media devices:", err);
        toast.error("Please allow camera and microphone access");
      });

    return () => {
      stopHeartbeat();
      stopAllTracks();
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      if (agoraClientRef.current) {
        agoraClientRef.current.leave();
      }
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }
    };
  }, []);

  // ✅ Get stream start time from backend (for BOTH host and viewer)
  useEffect(() => {
    if (!isStreaming) return;

    const creatorId = isHost ? userObject?.usid : urlCreatorId;
    if (!creatorId) return;

    console.log(
      "userObjectUSID",
      userObject?.usid,
      "urlCreatorId",
      urlCreatorId,
    );

    console.log("Live session from webSocket:", getLiveSession(creatorId));
    const liveSession = getLiveSession(creatorId);
    console.log("Live session data:", liveSession);

    if (liveSession?.streamStartTime) {
      console.log("⏰ Using backend start time:", liveSession.streamStartTime);
      console.log(
        "⏰ Stream has been live for:",
        (Date.now() - liveSession.streamStartTime) / 1000,
        "seconds",
      );
      setStreamStartTime(liveSession.streamStartTime);
    } else {
      console.warn("⚠️ No start time from backend yet, waiting...");
    }
  }, [isStreaming, isHost, userObject?.usid, urlCreatorId, getLiveSession]);

  // ✅ Stream duration timer - simple and clean
  useEffect(() => {
    if (!isStreaming) {
      setStreamDuration(0);
      setStreamStartTime(null);
      return;
    }

    if (!streamStartTime) {
      console.log("⏰ Waiting for backend start time...");
      return;
    }

    const updateDuration = () => {
      const elapsed = Math.floor((Date.now() - streamStartTime) / 1000);
      setStreamDuration(elapsed);
    };

    updateDuration(); // Update immediately
    const interval = setInterval(updateDuration, 1000);

    return () => clearInterval(interval);
  }, [isStreaming, streamStartTime]);

  // Add this useEffect to handle stream end for viewers
  useEffect(() => {
    if (!isHost && isStreamEnded) {
      toast.info("The stream has ended");
      setTimeout(() => {
        handleStopLive();
      }, 2000);
    }
  }, [isStreamEnded, isHost]);

  useEffect(() => {
    if (!isHost) return;
    if (!isStreaming) return;
    if (!isConnected) return;

    // if we’re live and reconnected, ensure heartbeat is running
    startHeartbeat();
  }, [isConnected, isStreaming, isHost]);

  // ADD auto-scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleStartLive = async () => {
    try {
      // Validate App ID
      if (!APP_ID) {
        toast.error("App ID is missing");
        return;
      }

      if (!channelName?.trim()) {
        toast.error("Channel name is required");
        return;
      }

      const res = await fetchToken();
      const token = res?.data?.token;

      if (!token) {
        toast.error("Failed to obtain streaming token");
        return;
      }

      // Stop preview stream
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }

      // Initialize Agora Client
      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      agoraClientRef.current = client;

      // Set client role to host (broadcaster)
      await client.setClientRole("host");

      // Join channel with token
      await client.join(APP_ID, channelName, token, userObject?.usid);

      // Create and publish audio/video tracks
      const [audioTrack, videoTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks();
      localAudioTrackRef.current = audioTrack;
      localVideoTrackRef.current = videoTrack;

      // Play local video
      if (videoRef.current) {
        videoTrack.play(videoRef.current);
      }

      // Publish tracks to the channel
      await client.publish([audioTrack, videoTrack]);

      // Listen for remote users joining
      client.on("user-joined", (_user) => {});
      client.on("user-left", (_user) => {});

      setIsStreaming(true);
      await new Promise((resolve) => setTimeout(resolve, 100));
      // Send "go live" message
      console.log("📡 Sending GO LIVE message");

      sendMessage("/app/live/go", {
        creatorId: profileData?.data?.username,
        session: channelName,
      });
    } catch (error) {
      toast.error("Failed to start live stream. Check console for details.");
    }
  };

  const joinExistingStream = async (channel: string) => {
    try {
      if (!APP_ID) {
        toast.error("App ID is missing");
        return;
      }

      if (!channel) {
        toast.error("Channel name is missing");
        return;
      }

      const res = await fetchToken();
      const token = res?.data?.token;

      if (!token) {
        toast.error("Failed to obtain streaming token");
        return;
      }

      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      agoraClientRef.current = client;

      await client.setClientRole("audience");
      await client.join(APP_ID, channel, token, userObject?.usid);

      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);

        if (mediaType === "video") {
          user.videoTrack?.play(videoRef.current!);
        }

        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      toast.success("Joined live stream!");
    } catch (error) {
      console.error("Error joining stream:", error);
      toast.error("Failed to join live stream");
    }
  };

  const handleStopLive = async () => {
    try {
      stopHeartbeat();
      if (isHost && channelName) {
        sendMessage("/app/live/end", {
          session: channelName,
          creatorId: userObject?.usid,
        });
      }

      // ✅ NEW: Remove self from live list immediately
      if (userObject?.usid && isHost) {
        removeCreatorFromLive(userObject?.usid);
      }

      // ✅ NEW: Force refetch for other users
      setTimeout(() => {
        refetchLiveHosts();
      }, 500);

      if (localAudioTrackRef.current) {
        localAudioTrackRef.current.close();
      }
      if (localVideoTrackRef.current) {
        localVideoTrackRef.current.close();
      }

      if (agoraClientRef.current) {
        await agoraClientRef.current.leave();
      }

      setIsStreaming(false);
      setChatMessages([]);

      if (!isHost) {
        navigate(-1);
        return;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      joinSubRef.current?.unsubscribe();
      joinSubRef.current = null;

      toast.success("Stream ended");
    } catch (error) {
      console.error("Error stopping stream:", error);
    }
  };

  const toggleMic = async () => {
    if (isStreaming && localAudioTrackRef.current) {
      await localAudioTrackRef.current.setEnabled(!isMicOn);
    }
    setIsMicOn(!isMicOn);
  };

  const toggleCamera = async () => {
    if (isStreaming && localVideoTrackRef.current) {
      await localVideoTrackRef.current.setEnabled(!isCameraOn);
    }
    setIsCameraOn(!isCameraOn);
  };

  const handleSendMessage = () => {
    const message = chatMessage.trim();

    if (!message) {
      console.log("⚠️ Empty message, not sending");
      return;
    }

    console.log("📤 Attempting to send message:", message);

    // If streaming, send via WebSocket
    if (isStreaming && sendComment) {
      const success = sendComment(message);

      if (success) {
        // Optimistically add own message to chat
        const newMessage = {
          id: Date.now(),
          user: "You",
          message: message,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isComment: true,
        };

        setChatMessages((prev) => [...prev, newMessage]);
        setChatMessage("");

        console.log("✅ Message sent and added to local chat");
      } else {
        console.error("❌ Failed to send message");
        toast.error("Failed to send message");
      }
    } else {
      // Fallback: Local only (for pre-stream setup)
      console.log("ℹ️ Not streaming, adding message locally only");

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          user: "You",
          message: message,
          time: new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
      setChatMessage("");
    }
  };

  const stopAllTracks = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleGoBack = () => {
    stopAllTracks();
    navigate(-1);
  };

  // Pre-stream setup UI
  if (!isStreaming && isHost) {
    return (
      <div className="min-h-screen bg-brown_200 flex">
        {/* Left Side - Video Preview */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-3xl">
            {/* Header */}
            <div className="flex mb-6">
              <ArrowLeft
                className="text-white cursor-pointer"
                onClick={handleGoBack}
              />
              <Typography
                variant="subtitle2"
                className="text-white uppercase pl-2"
              >
                Live Video
              </Typography>

              {/* WebSocket Connection Status */}
              <div className="ml-auto">
                {isConnected ? (
                  <span className="flex items-center gap-2 text-green-400 text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Connected
                  </span>
                ) : (
                  <span className="flex items-center gap-2 text-yellow-400 text-sm">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    Connecting...
                  </span>
                )}
              </div>
            </div>

            {/* Video Preview */}
            <div className="relative bg-black/40 backdrop-blur rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/10">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {/* Camera Icon Overlay */}
              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-full">
                    <VideoOff className="w-16 h-16 text-white/60" />
                  </div>
                </div>
              )}
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {/* Mic Button */}
              <button
                onClick={toggleMic}
                className={`backdrop-blur p-4 rounded-full transition-all shadow-lg ${
                  isMicOn
                    ? "bg-gray-700/50 hover:bg-gray-600/50"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isMicOn ? (
                  <Mic className="w-6 h-6 text-white" />
                ) : (
                  <MicOff className="w-6 h-6 text-white" />
                )}
              </button>

              {/* Start Live Video Button */}
              <CustomButton
                className="text-xs w-fit px-6"
                onClick={handleStartLive}
                disabled={!channelName.trim() || isLoadingToken}
              >
                Start Live Video
              </CustomButton>

              {/* Camera Button */}
              <button
                onClick={toggleCamera}
                className={`backdrop-blur p-4 rounded-full transition-all shadow-lg ${
                  isCameraOn
                    ? "bg-gray-700/50 hover:bg-gray-600/50"
                    : "bg-red-600 hover:bg-red-700"
                }`}
              >
                {isCameraOn ? (
                  <Video className="w-6 h-6 text-white" />
                ) : (
                  <VideoOff className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="w-96 bg-brown_200 p-6 border-l border-white/10">
          <div className="mb-6">
            <input
              type="text"
              value={channelName}
              onChange={(e) => {
                const value = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9_]/g, "_"); // Agora-safe

                if (value.length <= MAX_CHANNEL_LENGTH) {
                  setChannelName(value);
                }
              }}
              placeholder="Enter channel name"
              className="w-full bg-brown_100 text-white placeholder-white/40 px-4 py-3 rounded-lg
               focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex justify-between text-white/60 text-sm mt-1">
              <span>Only letters, numbers & underscores</span>
              <span>
                {channelName.length}/{MAX_CHANNEL_LENGTH}
              </span>
            </div>
          </div>

          {/* Stream Description */}
          <div className="mb-6">
            <textarea
              value={streamDescription}
              onChange={(e) => setStreamDescription(e.target.value)}
              placeholder="Add stream description"
              maxLength={500}
              className="w-full bg-brown_100 text-white placeholder-white/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
            />
            <div className="text-right text-white/60 text-sm mt-1">
              {streamDescription.length}/500
            </div>
          </div>

          {/* Show Tips Toggle */}
          <div className="flex items-center justify-between bg-brown_100 border border-white/20 px-4 py-3 rounded-lg">
            <p className="text-white font-medium text-sm">
              Show Tips collected to viewers
            </p>
            <button
              onClick={() => setShowTips(!showTips)}
              className={`relative w-12 h-6 rounded-full transition-all ${
                showTips ? "bg-brown_200" : "bg-gray-600"
              }`}
            >
              <div
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  showTips ? "translate-x-6" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Live streaming UI
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Video Area */}
      <div className="flex-1 flex">
        {/* Main Video Stream */}
        <div className="flex-1 relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
          {/* Top Bar */}
          <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
            <div className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold flex items-center gap-2">
              <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
              LIVE
            </div>

            {/* ✅ Reaction Counter */}
            <ReactionCounter counts={reactionCounts} />
          </div>

          {/* Video */}
          <div className="w-full h-full flex items-center justify-center">
            {isCameraOn ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center">
                <Video className="w-32 h-32 text-white/30" />
              </div>
            )}
          </div>

          {/* ✅ Floating Reactions */}
          <FloatingReactions reactions={floatingReactions} />
        </div>

        {/* Chat Sidebar */}
        <div className="w-80 bg-white flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">Live Chat</h3>
            <p className="text-sm text-gray-500">
              {chatMessages.length} messages
            </p>
          </div>

          {/* Chat Messages */}
          <div
            ref={chatContainerRef} // ✅ ADD ref
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {chatMessages.length === 0 ? (
              <div className="text-center text-gray-400 text-sm mt-4">
                No messages yet. Be the first to comment!
              </div>
            ) : (
              chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={msg.isGift ? "bg-orange-100 p-3 rounded-lg" : ""}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{msg.user}</span>
                    {msg.badge && (
                      <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">
                        {msg.badge}
                      </span>
                    )}
                    {msg.isGift && (
                      <span className="text-xs">sent 🔥 Fire</span>
                    )}
                    <span className="text-xs text-gray-500 ml-auto">
                      {msg.time}
                    </span>
                  </div>
                  {!msg.isGift && (
                    <p className="text-sm text-gray-800">{msg.message}</p>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder={
                  isStreaming
                    ? "Send a message..."
                    : "Start streaming to enable chat"
                }
                disabled={!isStreaming}
                maxLength={500}
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={!isStreaming || !chatMessage.trim()}
                className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-full transition"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>

            {/* Character count */}
            <div className="text-xs text-gray-400 text-right mt-1">
              {chatMessage.length}/500
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Left - Stats */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-white">
              <Users className="w-5 h-5" />
              <span className="font-semibold">
                {viewerCount.toLocaleString()}
              </span>
            </div>
            <div className="text-white font-mono">
              {formatDuration(streamDuration)}
            </div>
          </div>

          {/* Center - Controls */}
          <div className="flex items-center gap-4">
            <ReactionButton
              onReaction={handleReaction}
              disabled={!isStreaming}
            />
            <button
              onClick={toggleCamera}
              className={`p-3 rounded-full transition-all ${
                isCameraOn
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {isCameraOn ? (
                <Video className="w-5 h-5" />
              ) : (
                <VideoOff className="w-5 h-5" />
              )}
            </button>

            <button
              onClick={toggleMic}
              className={`p-3 rounded-full transition-all ${
                isMicOn
                  ? "bg-gray-700 hover:bg-gray-600 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              }`}
            >
              {isMicOn ? (
                <Mic className="w-5 h-5" />
              ) : (
                <MicOff className="w-5 h-5" />
              )}
            </button>

            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all">
              <MessageCircle className="w-5 h-5" />
            </button>

            <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all">
              <Settings className="w-5 h-5" />
            </button>

            <button
              onClick={async () => {
                if (isHost) {
                  await handleStopLive();
                } else {
                  leaveLiveStream(); // send leave + keep subs alive briefly
                  setTimeout(() => handleStopLive(), 600); // leave agora + navigate after 600ms
                }
              }}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all"
            >
              <Phone className="w-5 h-5" />
              {isHost ? "End Stream" : "Leave Stream"}
            </button>
          </div>

          {/* Right - Placeholder */}
          <div className="w-32"></div>
        </div>
      </div>
    </div>
  );
};

export { LiveStreaming };
