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
  DollarSign,
  Phone,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
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

const LiveStreaming = () => {
  const navigate = useNavigate();
  const { client: stompClient, isConnected, sendMessage } = useWebSocket();
  const { creatorId: urlCreatorIdEncoded, sessionId } = useParams();

  // Decode the creatorId since it was encoded (contains @ symbol)
  const urlCreatorId = urlCreatorIdEncoded
    ? decodeURIComponent(urlCreatorIdEncoded)
    : undefined;

  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
  const { data: profileData } = useFetchProfile(userObject);
  // Determine if current user is the host
  const isHost = !urlCreatorId || urlCreatorId === userObject?.usid;
  // const isHost = !urlCreatorId || urlCreatorId === userObject?.email;

  const [channelName, setChannelName] = useState("");
  const [streamDuration, setStreamDuration] = useState(0);
  const [streamDescription, setStreamDescription] = useState("");
  const [showTips, setShowTips] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [tipsReceived] = useState(2345);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<
    Array<{
      id: number;
      user: string;
      badge?: string;
      message: string;
      time: string;
      isGift?: boolean;
    }>
  >([
    // {
    //   id: 1,
    //   user: "Mike_R",
    //   badge: "SUB",
    //   message: "This is awesome! 🔥",
    //   time: "06:04 PM",
    // },
    // {
    //   id: 2,
    //   user: "Emma_W",
    //   badge: "SUB",
    //   message: "Love the energy today!",
    //   time: "06:04 PM",
    // },
    // {
    //   id: 3,
    //   user: "Mike_R",
    //   message: "🔥 Fire",
    //   time: "06:04 PM",
    //   isGift: true,
    // },
    // {
    //   id: 4,
    //   user: "Chris_L",
    //   message: "Can someone explain what's happening?",
    //   time: "06:05 PM",
    // },
    // {
    //   id: 5,
    //   user: "Jessica_T",
    //   badge: "SUB",
    //   message: "So glad I subscribed! Worth every penny",
    //   time: "06:06 PM",
    // },
  ]);

  const { viewerCount, isStreamEnded } = useLiveStream({
    sessionId: sessionId || "",
    creatorId: isHost ? userObject?.usid : urlCreatorId,
    role: isHost ? "HOST" : "VIEWER",
    enabled: isStreaming && !!sessionId,
  });

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const agoraClientRef = useRef<any>(null);
  const localAudioTrackRef = useRef<any>(null);
  const localVideoTrackRef = useRef<any>(null);
  const streamTimerRef = useRef<any>(null);
  const joinSubRef = useRef<any>(null);

  // const {
  //   // data: agoraTokenData,
  //   isLoading: isLoadingToken,
  //   refetch: fetchToken,
  // } = useGetData({
  //   url: `/agora/rtc-token?channel=${channelName}&uid=${userObject?.usid}`,
  //   queryKey: ["GetAgoraRTCToken", channelName, userObject?.usid],
  //   enabled: false,
  //   // enabled: !!userObject?.uid && !!channelName,
  // });

  const { isLoading: isLoadingToken, refetch: fetchToken } = useGetData({
    url: `/agora/rtc-token?channel=${channelName || sessionId}&uid=${userObject?.usid}`,
    queryKey: ["GetAgoraRTCToken", channelName || sessionId, userObject?.usid],
    enabled: false,
  });

  // If viewer, join existing stream
  useEffect(() => {
    if (!isHost && sessionId && urlCreatorId) {
      setChannelName(sessionId);
      setIsStreaming(true);

      // pass it directly so we don’t depend on async state updates
      joinExistingStream(sessionId);
    }
  }, [isHost, sessionId, urlCreatorId]);

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

  // Stream duration timer
  useEffect(() => {
    if (isStreaming) {
      streamTimerRef.current = setInterval(() => {
        setStreamDuration((prev) => prev + 1);
      }, 1000);
    } else {
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }
      setStreamDuration(0);
    }
    return () => {
      if (streamTimerRef.current) {
        clearInterval(streamTimerRef.current);
      }
    };
  }, [isStreaming]);

  // Add this useEffect to handle stream end for viewers
  useEffect(() => {
    if (!isHost && isStreamEnded) {
      toast.info("The stream has ended");
      setTimeout(() => {
        handleStopLive();
      }, 2000);
    }
  }, [isStreamEnded, isHost]);

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

      if (isConnected && stompClient?.connected && !joinSubRef.current) {
        joinSubRef.current = stompClient.subscribe(
          `/topic/live/${channelName}/join`,
          (message) => {
            console.log("👋 JOIN EVENT:", message.body);
          },
        );
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
      client.on("user-joined", (_user) => {
        // console.log("Viewer joined:", user.uid);
        // setViewerCount((prev) => prev + 1);
      });

      client.on("user-left", (_user) => {
        // console.log("Viewer left:", user.uid);
        // setViewerCount((prev) => Math.max(0, prev - 1));
      });

      // Send "go live" message
      sendMessage("/app/live/go", {
        creatorId: profileData?.data?.username,
        session: channelName,
      });

      setIsStreaming(true);
    } catch (error) {
      // console.error("Error starting live stream:", error);
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
        console.log("✅ VIEWER RECEIVED HOST STREAM", {
          hostUid: user.uid,
          mediaType,
          channel: channel,
        });

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
      if (isHost && sessionId) {
        sendMessage("/app/live/end", {
          session: sessionId,
          creatorId: userObject?.usid,
        });
      }

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
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: Date.now(),
          user: "You",
          message: chatMessage,
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
            <div className="bg-gray-900/80 backdrop-blur px-3 py-1 rounded text-white text-sm flex items-center gap-2">
              <DollarSign className="w-4 h-4" />${tipsReceived.toLocaleString()}{" "}
              Received
            </div>
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
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((msg) => (
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
                  {msg.isGift && <span className="text-xs">sent 🔥 Fire</span>}
                  <span className="text-xs text-gray-500 ml-auto">
                    {msg.time}
                  </span>
                </div>
                {!msg.isGift && (
                  <p className="text-sm text-gray-800">{msg.message}</p>
                )}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Send a message..."
                className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSendMessage}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
              >
                <Send className="w-5 h-5" />
              </button>
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
              onClick={handleStopLive}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all"
            >
              <Phone className="w-5 h-5" />
              End Stream
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
