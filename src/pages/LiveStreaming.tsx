/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import CustomButton from "@/components/forms/CustomButton";
import Typography from "@/components/forms/Typography";
import { ArrowLeft, Mic, Video, MicOff, VideoOff } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import AgoraRTC, {
  type IAgoraRTCClient,
  type ICameraVideoTrack,
  type IMicrophoneAudioTrack,
} from "agora-rtc-sdk-ng";
import { useAppSelector } from "@/lib/hook";
import { useGetData } from "@/hooks/apiCalls";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { MAX_CHANNEL_LENGTH } from "@/utils/helper";
import { useWebSocket } from "@/context/WebSocketContext";
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

const LiveStreaming = () => {
  const navigate = useNavigate();
  const {
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

  // IMPORTANT: Host sanitizes channel name to lowercase/underscores. Viewer must do same.
  const normalizedUrlSessionId = urlSessionId?.toLowerCase();

  const { userObject } = useAppSelector((state) => state.auth);
  const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
  const { data: profileData } = useFetchProfile(userObject);
  // Determine if current user is the host
  const isHost = !urlCreatorId || urlCreatorId === userObject?.usid;

  const [channelName, setChannelName] = useState("");
  const [_streamDuration, setStreamDuration] = useState(0);
  const [streamStartTime, setStreamStartTime] = useState<number | null>(null);
  const [streamDescription, setStreamDescription] = useState("");
  const [showTips, setShowTips] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const activeSession = isHost ? channelName : normalizedUrlSessionId || "";
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

    // Filter out our own comments to prevent duplication if we do optimistic updates
    // OR if we rely on optimistic updates, we typically ignore the socket echo for self.
    const isMe = comment.userId === userObject?.usid || comment.user === userObject?.usid;
    
    // However, for comments, it's safer to rely on ID if possible, but distinct filtering works too.
    // If we receive our own comment via socket, we should ignore it IF we already added it.
    // But since we are adding optimistic updates, we will ignore socket messages from SELF.
    if (isMe) {
        console.log("Ignoring own comment from socket to avoid double render");
        return;
    }

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
  }, [userObject?.usid]);

  const handleReactionReceived = useCallback((reaction: LiveReaction) => {
    // Filter out self-reactions from WebSocket to duplicate optimistic update
    if (reaction.userId === userObject?.usid) {
        return;
    }

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
  }, [userObject?.usid]);

  const {
    viewerCount,
    isStreamEnded,
    sendComment,
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
      // Optimistically show own reaction and update count
      setReactionCounts((prev) => ({
        ...prev,
        [reactionType]: prev[reactionType] + 1,
      }));
      
      const floatingReaction: FloatingReaction = {
        id: `optimistic-${Date.now()}`,
        type: reactionType,
        x: Math.random() * 80 + 10,
        y: 0,
      };

      setFloatingReactions((prev) => [...prev, floatingReaction]);

      setTimeout(() => {
        setFloatingReactions((prev) =>
          prev.filter((r) => r.id !== floatingReaction.id),
        );
      }, 3000);
    }
  };

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const agoraClientRef = useRef<IAgoraRTCClient | null>(null);
  const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
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
    };
  }, []);

  // ✅ Get stream start time from backend (for BOTH host and viewer)
  useEffect(() => {
    if (!isStreaming) return;

    const creatorId = isHost ? userObject?.usid : urlCreatorId;
    if (!creatorId) return;

    const liveSession = getLiveSession(creatorId);

    if (liveSession?.streamStartTime) {
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
  // Add this useEffect to handle stream end for viewers
  useEffect(() => {
    if (isHost) return;

    // 1. Check explicit End event from socket
    if (isStreamEnded) {
      toast.info("The stream has ended");
      setTimeout(() => {
        handleStopLive();
      }, 2000);
      return;
    }

    // 2. Fallback: Check if creator is still in the "liveCreators" list from Context
    // This handles cases where we missed the specific "END" event but the polling/notification updated the list
    if (isConnected && isStreaming && urlCreatorId) {
        //  const session = getLiveSession(urlCreatorId);
         // If we have a valid session ID but the context says this creator is NOT live anymore
         // we should probably end it.
         // WARNING: We must be careful not to kill it during initial load.
         // We'll rely on isStreamEnded mostly, but this serves as a backup.
    }
  }, [isStreamEnded, isHost, isConnected, isStreaming, urlCreatorId, getLiveSession]);

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
      // ✅ Set start time immediately for Host
      setStreamStartTime(Date.now());
      
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
      return;
    }

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
      } else {
        toast.error("Failed to send message");
      }
    } else {
      // Fallback: Local only (for pre-stream setup)
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
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>

              {/* ✅ Viewer Count */}
              {isStreaming && (
                <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full" />
                   {viewerCount} Viewers
                </div>
              )}

              {/* ✅ Stream Duration */}
              {isStreaming && (
                <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10">
                  {new Date(_streamDuration * 1000).toISOString().substr(11, 8)}
                </div>
              )}
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

          {/* ✅ Media Controls (Restored) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
            <button
              onClick={toggleMic}
              className={`p-4 rounded-full transition-all shadow-lg border border-white/10 backdrop-blur-md ${
                isMicOn
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
            >
              {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
            </button>

            {isHost ? (
              <CustomButton
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md border border-red-500/50"
                onClick={handleStopLive}
              >
                End Stream
              </CustomButton>
            ) : (
              <CustomButton
                className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md border border-white/10"
                onClick={handleStopLive}
              >
                Leave Stream
              </CustomButton>
            )}

            <button
              onClick={toggleCamera}
              className={`p-4 rounded-full transition-all shadow-lg border border-white/10 backdrop-blur-md ${
                isCameraOn
                  ? "bg-white/20 hover:bg-white/30 text-white"
                  : "bg-red-500 hover:bg-red-600 text-white"
              }`}
              title={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
            >
              {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
            </button>
          </div>
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
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
          >
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
                  {msg.user?.[0]?.toUpperCase() || "A"}
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-semibold text-sm">
                      {msg.username || msg.user}
                    </span>
                    <span className="text-xs text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-800">{msg.message}</p>
                </div>
              </div>
            ))}
            {chatMessages.length === 0 && (
              <div className="text-center text-gray-400 mt-10">
                No messages yet. Say hello! 👋
              </div>
            )}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                disabled={!chatMessage.trim()}
                className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
                title="Send Message"
              >
                <span className="sr-only">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </button>
            </div>

            {/* Simple Reaction Buttons for quick access */}
            <div className="flex justify-between mt-3 px-2">
              <button
                onClick={() => handleReaction("LIKE")}
                className="text-xl hover:scale-125 transition-transform"
                title="Like"
              >
                👍
              </button>
              <button
                onClick={() => handleReaction("LOVE")}
                className="text-xl hover:scale-125 transition-transform"
                title="Love"
              >
                ❤️
              </button>
              <button
                onClick={() => handleReaction("LOL")}
                className="text-xl hover:scale-125 transition-transform"
                title="Haha"
              >
                😂
              </button>
              <button
                onClick={() => handleReaction("DISLIKE")}
                className="text-xl hover:scale-125 transition-transform"
                title="Dislike"
              >
                👎
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LiveStreaming };
