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
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MAX_CHANNEL_LENGTH } from "@/utils/helper";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const LiveStreaming = () => {
  const navigate = useNavigate();

  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
  const [channelName, setChannelName] = useState("");
  const [isWsConnected, setIsWsConnected] = useState(false);
  const [streamDuration, setStreamDuration] = useState(0);
  const [streamDescription, setStreamDescription] = useState("");
  const [showTips, setShowTips] = useState(true);
  const [isStreaming, setIsStreaming] = useState(false);
  // const [visibility, setVisibility] = useState("All Subscribers");
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [viewerCount, setViewerCount] = useState(0);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [tipsReceived] = useState(2345);
  const [chatMessage, setChatMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      id: 1,
      user: "Mike_R",
      badge: "SUB",
      message: "This is awesome! 🔥",
      time: "06:04 PM",
    },
    {
      id: 2,
      user: "Emma_W",
      badge: "SUB",
      message: "Love the energy today!",
      time: "06:04 PM",
    },
    {
      id: 3,
      user: "Mike_R",
      message: "🔥 Fire",
      time: "06:04 PM",
      isGift: true,
    },
    {
      id: 4,
      user: "Chris_L",
      message: "Can someone explain what's happening?",
      time: "06:05 PM",
    },
    {
      id: 5,
      user: "Jessica_T",
      badge: "SUB",
      message: "So glad I subscribed! Worth every penny",
      time: "06:06 PM",
    },
  ]);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const agoraClientRef = useRef<any>(null);
  const localAudioTrackRef = useRef<any>(null);
  const localVideoTrackRef = useRef<any>(null);
  const streamTimerRef = useRef<any>(null);
  const stompClientRef = useRef<Client | null>(null);

  // Use HTTP (not HTTPS) - the server doesn't support SSL
  // const WS_BASE_URL = "http://fanfam.biyartech.com:7639/api/v1/ws";
  const WS_BASE_URL = "http://fanfam.biyartech.com:7639";
  const WS_ENDPOINT = "/api/v1/ws";

  const {
    // data: agoraTokenData,
    isLoading: isLoadingToken,
    refetch: fetchToken,
  } = useGetData({
    url: `/agora/rtc-token?channel=${channelName}&uid=${userObject?.usid}`,
    queryKey: ["GetAgoraRTCToken", channelName, userObject?.usid],
    enabled: false,
    // enabled: !!userObject?.uid && !!channelName,
  });

  // Initialize WebSocket Connection
  // useEffect(() => {
  //   // Get JWT token from your auth storage
  //   const token = localStorage.getItem("token");

  //   if (!token) {
  //     console.error("No auth token found");
  //     toast.error("Authentication required");
  //     return;
  //   }

  //   // Create STOMP client
  //   const client = new Client({
  //     brokerURL: import.meta.env.VITE_WS_URL,
  //     connectHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     debug: (str) => {
  //       console.log("STOMP Debug:", str);
  //     },
  //     reconnectDelay: 5000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,

  //     onConnect: () => {
  //       console.log("✅ WebSocket Connected Successfully");
  //       setIsWsConnected(true);
  //       toast.success("Connected to live streaming server");
  //     },

  //     onStompError: (frame) => {
  //       console.error("❌ STOMP Error:", frame);
  //       setIsWsConnected(false);
  //       toast.error("WebSocket connection error");
  //     },

  //     onWebSocketClose: () => {
  //       console.log("🔌 WebSocket Closed");
  //       setIsWsConnected(false);
  //     },

  //     onWebSocketError: (error) => {
  //       console.error("❌ WebSocket Error:", error);
  //       setIsWsConnected(false);
  //     },
  //   });

  //   // Activate the client
  //   client.activate();
  //   stompClientRef.current = client;

  //   // Cleanup on unmount
  //   return () => {
  //     if (client.active) {
  //       console.log("Deactivating WebSocket connection");
  //       client.deactivate();
  //     }
  //   };
  // }, []);

  // useEffect(() => {
  //   // Get JWT token from your auth storage
  //   const token = localStorage.getItem("token"); // Adjust this to match your auth implementation

  //   if (!token) {
  //     console.error("No auth token found");
  //     toast.error("Authentication required");
  //     return;
  //   }

  //   console.log("🔄 Initializing WebSocket connection...");
  //   console.log("📍 Base URL:", WS_BASE_URL);
  //   console.log("🔑 Token exists:", !!token);

  //   // Create STOMP client with SockJS
  //   const client = new Client({
  //     // Use SockJS for compatibility with Spring Boot
  //     webSocketFactory: () => {
  //       const sock = new SockJS(WS_BASE_URL + WS_ENDPOINT);
  //       console.log("🔌 SockJS factory created");
  //       return sock as any;
  //     },

  //     connectHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },

  //     debug: (str) => {
  //       console.log("STOMP Debug:", str);
  //     },

  //     reconnectDelay: 50000,
  //     heartbeatIncoming: 4000,
  //     heartbeatOutgoing: 4000,

  //     onConnect: (frame) => {
  //       console.log("✅ WebSocket Connected Successfully");
  //       console.log("📦 Connection Frame:", frame);
  //       setIsWsConnected(true);
  //       toast.success("Connected to live streaming server");
  //     },

  //     onStompError: (frame) => {
  //       console.error("❌ STOMP Error:", frame.headers);
  //       console.error("📄 Error Body:", frame.body);
  //       setIsWsConnected(false);
  //       toast.error(
  //         `WebSocket error: ${frame.headers.message || "Connection failed"}`
  //       );
  //     },

  //     onWebSocketClose: (event) => {
  //       console.log("🔌 WebSocket Closed:", event);
  //       setIsWsConnected(false);
  //     },

  //     onWebSocketError: (error) => {
  //       console.error("❌ WebSocket Error:", error);
  //       setIsWsConnected(false);
  //       toast.error("Cannot connect to streaming server");
  //     },
  //   });

  //   // Activate the client
  //   console.log("▶️ Activating STOMP client...");
  //   client.activate();
  //   stompClientRef.current = client;

  //   // Cleanup on unmount
  //   return () => {
  //     if (client.active) {
  //       console.log("⏹️ Deactivating WebSocket connection");
  //       client.deactivate();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const client = new Client({
      brokerURL: undefined, // REQUIRED when using SockJS

      webSocketFactory: () => {
        return new SockJS(WS_BASE_URL + WS_ENDPOINT);
      },

      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },

      reconnectDelay: 5000,
      debug: (msg) => console.log("STOMP:", msg),

      onConnect: () => {
        console.log("✅ STOMP connected");
        setIsWsConnected(true);
      },

      onStompError: (frame) => {
        console.error("❌ STOMP error", frame.headers, frame.body);
        setIsWsConnected(false);
      },

      onWebSocketError: (e) => {
        console.error("❌ WS error", e);
        setIsWsConnected(false);
      },

      onWebSocketClose: () => {
        console.log("🔌 WS closed");
        setIsWsConnected(false);
      },
    });

    client.activate();
    return () => {
      if (client.active) {
        client.deactivate();
      }
    };
  }, []);

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

  const formatDuration = (seconds: any) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleStartLive = async () => {
    try {
      // Validate App ID
      if (!APP_ID) {
        toast.error("App ID is missing");
        return;
      }

      const res = await fetchToken();
      console.log(res);
      const token = res?.data?.token;
      console.log(token);

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
        setViewerCount((prev) => prev + 1);
      });

      client.on("user-left", (_user) => {
        // console.log("Viewer left:", user.uid);
        setViewerCount((prev) => Math.max(0, prev - 1));
      });

      setIsStreaming(true);
      // console.log("Live stream started! Channel:", channelName);
    } catch (error) {
      // console.error("Error starting live stream:", error);
      toast.error("Failed to start live stream. Check console for details.");
    }
  };

  const handleStopLive = async () => {
    try {
      // Unpublish and close tracks
      if (localAudioTrackRef.current) {
        localAudioTrackRef.current.close();
      }
      if (localVideoTrackRef.current) {
        localVideoTrackRef.current.close();
      }

      // Leave channel
      if (agoraClientRef.current) {
        await agoraClientRef.current.leave();
      }

      setIsStreaming(false);
      setViewerCount(0);

      // Restart preview
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setLocalStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      // console.error("Error stopping stream:", error);
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
  if (!isStreaming) {
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
                {isWsConnected ? (
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
          {/* Visibility Dropdown */}
          {/* <div className="mb-6 w-full bg-brown_100 border border-white/20 text-white px-4 py-2 rounded-lg cursor-pointer">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-6 h-6 text-white" />
              <p className="text-grey_100 font-medium text-sm whitespace-nowrap">
                Available To
              </p>

              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value)}
                className="w-full bg-transparent focus:outline-none text-grey_100 font-medium text-sm cursor-pointer"
              >
                <option>All Subscribers</option>
                <option>Members Only</option>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>
          </div> */}

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

// import CustomButton from "@/components/forms/CustomButton";
// import Typography from "@/components/forms/Typography";
// import {
//   ArrowLeft,
//   Mic,
//   Video,
//   MicOff,
//   VideoOff,
//   Users,
//   Settings,
//   MessageCircle,
//   Send,
//   DollarSign,
//   Phone,
// } from "lucide-react";
// import { useEffect, useRef, useState } from "react";
// import AgoraRTC from "agora-rtc-sdk-ng";
// import type { RootState } from "@/lib/store";
// import { useAppSelector } from "@/lib/hook";
// import { useGetData } from "@/hooks/apiCalls";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import { MAX_CHANNEL_LENGTH } from "@/utils/helper";
// import { Client } from "@stomp/stompjs";
// import type {
//   CommentMessage,
//   JoinLeaveMessage,
//   LiveNotification,
// } from "@/lib/types";

// // WebSocket Message Types

// const LiveStreaming = () => {
//   const navigate = useNavigate();

//   const { userObject } = useAppSelector((state: RootState) => state.auth);
//   const APP_ID = import.meta.env.VITE_AGORA_APP_ID;

//   const [channelName, setChannelName] = useState("");
//   const [sessionId, setSessionId] = useState("");
//   const [streamDuration, setStreamDuration] = useState(0);
//   const [streamDescription, setStreamDescription] = useState("");
//   const [showTips, setShowTips] = useState(true);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [viewerCount, setViewerCount] = useState(0);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [tipsReceived] = useState(2345);
//   const [chatMessage, setChatMessage] = useState("");
//   const [chatMessages, setChatMessages] = useState<any[]>([]);
//   const [isConnected, setIsConnected] = useState(false);

//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const agoraClientRef = useRef<any>(null);
//   const localAudioTrackRef = useRef<any>(null);
//   const localVideoTrackRef = useRef<any>(null);
//   const streamTimerRef = useRef<any>(null);
//   const stompClientRef = useRef<Client | null>(null);

//   const {
//     // data: agoraTokenData,
//     isLoading: isLoadingToken,
//     refetch: fetchToken,
//   } = useGetData({
//     url: `/agora/rtc-token?channel=${channelName}&uid=${userObject?.usid}`,
//     queryKey: ["GetAgoraRTCToken", channelName, userObject?.usid],
//     enabled: false,
//   });

//   // Initialize WebSocket Connection
//   useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.error("Authentication required");
//       return;
//     }

//     const client = new Client({
//       brokerURL: import.meta.env.VITE_WS_URL.replace("ws://", "ws://").replace(
//         "http://",
//         "ws://"
//       ),
//       connectHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//       debug: (str) => {
//         console.log("STOMP Debug:", str);
//       },
//       reconnectDelay: 5000,
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//       onConnect: () => {
//         console.log("WebSocket Connected");
//         setIsConnected(true);

//         // Subscribe to creator live notifications
//         if (userObject?.usid) {
//           client.subscribe(
//             `/topic/live/${userObject.usid}/notify`,
//             (message) => {
//               const notification: LiveNotification = JSON.parse(message.body);
//               console.log("Live notification:", notification);

//               if (notification.status === "live") {
//                 toast.info("You are now live!");
//               }
//             }
//           );
//         }
//       },
//       onStompError: (frame) => {
//         console.error("STOMP error:", frame);
//         toast.error("WebSocket connection error");
//         setIsConnected(false);
//       },
//       onWebSocketClose: () => {
//         console.log("WebSocket closed");
//         setIsConnected(false);
//       },
//     });

//     client.activate();
//     stompClientRef.current = client;

//     return () => {
//       if (client.active) {
//         client.deactivate();
//       }
//     };
//   }, [userObject?.usid]);

//   // Subscribe to session-specific topics when streaming starts
//   useEffect(() => {
//     if (isStreaming && sessionId && stompClientRef.current?.connected) {
//       const client = stompClientRef.current;

//       // Subscribe to join events
//       const joinSub = client.subscribe(
//         `/topic/live/${sessionId}/join`,
//         (message) => {
//           const joinData: JoinLeaveMessage = JSON.parse(message.body);
//           console.log("User joined:", joinData);
//           setViewerCount((prev) => prev + 1);

//           // Add system message to chat
//           setChatMessages((prev) => [
//             ...prev,
//             {
//               id: Date.now(),
//               user: "System",
//               message: `${joinData.userId} joined the stream`,
//               time: new Date().toLocaleTimeString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//               isSystem: true,
//             },
//           ]);
//         }
//       );

//       // Subscribe to leave events
//       const leaveSub = client.subscribe(
//         `/topic/live/${sessionId}/leave`,
//         (message) => {
//           const leaveData: JoinLeaveMessage = JSON.parse(message.body);
//           console.log("User left:", leaveData);
//           setViewerCount((prev) => Math.max(0, prev - 1));

//           // Add system message to chat
//           setChatMessages((prev) => [
//             ...prev,
//             {
//               id: Date.now(),
//               user: "System",
//               message: `${leaveData.userId} left the stream`,
//               time: new Date().toLocaleTimeString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//               isSystem: true,
//             },
//           ]);
//         }
//       );

//       // Subscribe to end events
//       const endSub = client.subscribe(
//         `/topic/live/${sessionId}/end`,
//         (message) => {
//           const endData: JoinLeaveMessage = JSON.parse(message.body);
//           console.log("Stream ended:", endData);
//           toast.info("Stream has ended");
//           handleStopLive();
//         }
//       );

//       // Subscribe to comments (if implemented on backend)
//       const commentSub = client.subscribe(
//         `/topic/live/${sessionId}/comments`,
//         (message) => {
//           const comment: CommentMessage = JSON.parse(message.body);
//           console.log("New comment:", comment);

//           setChatMessages((prev) => [
//             ...prev,
//             {
//               id: Date.now(),
//               user: comment.username || comment.userId || "Anonymous",
//               message: comment.text,
//               time: new Date().toLocaleTimeString("en-US", {
//                 hour: "2-digit",
//                 minute: "2-digit",
//               }),
//             },
//           ]);
//         }
//       );

//       return () => {
//         joinSub.unsubscribe();
//         leaveSub.unsubscribe();
//         endSub.unsubscribe();
//         commentSub.unsubscribe();
//       };
//     }
//   }, [isStreaming, sessionId]);

//   // Initialize preview stream
//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({ video: true, audio: true })
//       .then((stream) => {
//         setLocalStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((_err) => {
//         toast.error("Please allow camera and microphone access");
//       });

//     return () => {
//       stopAllTracks();
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//       if (agoraClientRef.current) {
//         agoraClientRef.current.leave();
//       }
//       if (streamTimerRef.current) {
//         clearInterval(streamTimerRef.current);
//       }
//     };
//   }, []);

//   // Stream duration timer
//   useEffect(() => {
//     if (isStreaming) {
//       streamTimerRef.current = setInterval(() => {
//         setStreamDuration((prev) => prev + 1);
//       }, 1000);
//     } else {
//       if (streamTimerRef.current) {
//         clearInterval(streamTimerRef.current);
//       }
//       setStreamDuration(0);
//     }
//     return () => {
//       if (streamTimerRef.current) {
//         clearInterval(streamTimerRef.current);
//       }
//     };
//   }, [isStreaming]);

//   const formatDuration = (seconds: any) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
//   };

//   const handleStartLive = async () => {
//     try {
//       if (!APP_ID) {
//         toast.error("App ID is missing");
//         return;
//       }

//       if (!isConnected) {
//         toast.error("WebSocket not connected. Please wait...");
//         return;
//       }

//       // Generate session ID
//       const newSessionId = `session_${userObject?.usid}_${Date.now()}`;
//       setSessionId(newSessionId);

//       // Notify backend that we're going live
//       if (stompClientRef.current?.connected) {
//         stompClientRef.current.publish({
//           destination: "/app/live/go",
//           body: JSON.stringify({
//             creatorId: userObject?.usid,
//             session: newSessionId,
//           }),
//         });
//       }

//       const res = await fetchToken();
//       console.log(res);
//       const token = res?.data?.token;
//       console.log(token);

//       if (!token) {
//         toast.error("Failed to obtain streaming token");
//         return;
//       }

//       // Stop preview stream
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }

//       // Initialize Agora Client
//       const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
//       agoraClientRef.current = client;

//       await client.setClientRole("host");
//       await client.join(APP_ID, channelName, token, userObject?.usid);

//       const [audioTrack, videoTrack] =
//         await AgoraRTC.createMicrophoneAndCameraTracks();
//       localAudioTrackRef.current = audioTrack;
//       localVideoTrackRef.current = videoTrack;

//       if (videoRef.current) {
//         videoTrack.play(videoRef.current);
//       }

//       await client.publish([audioTrack, videoTrack]);

//       // Agora events
//       client.on("user-joined", (_user) => {
//         setViewerCount((prev) => prev + 1);
//       });

//       client.on("user-left", (_user) => {
//         setViewerCount((prev) => Math.max(0, prev - 1));
//       });

//       setIsStreaming(true);

//       // Send join event as host
//       if (stompClientRef.current?.connected) {
//         stompClientRef.current.publish({
//           destination: "/app/live/join",
//           body: JSON.stringify({
//             session: newSessionId,
//             creatorId: userObject?.usid,
//             role: "HOST",
//           }),
//         });
//       }

//       toast.success("Live stream started!");
//     } catch (error) {
//       console.error("Error starting live stream:", error);
//       toast.error("Failed to start live stream");
//     }
//   };

//   const handleStopLive = async () => {
//     try {
//       // Notify backend that stream is ending
//       if (stompClientRef.current?.connected && sessionId) {
//         stompClientRef.current.publish({
//           destination: "/app/live/end",
//           body: JSON.stringify({
//             session: sessionId,
//             creatorId: userObject?.usid,
//           }),
//         });
//       }

//       // Unpublish and close tracks
//       if (localAudioTrackRef.current) {
//         localAudioTrackRef.current.close();
//       }
//       if (localVideoTrackRef.current) {
//         localVideoTrackRef.current.close();
//       }

//       // Leave channel
//       if (agoraClientRef.current) {
//         await agoraClientRef.current.leave();
//       }

//       setIsStreaming(false);
//       setViewerCount(0);
//       setSessionId("");
//       setChatMessages([]);

//       // Restart preview
//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: true,
//         audio: true,
//       });
//       setLocalStream(stream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       toast.success("Stream ended");
//     } catch (error) {
//       console.error("Error stopping stream:", error);
//     }
//   };

//   const toggleMic = async () => {
//     if (isStreaming && localAudioTrackRef.current) {
//       await localAudioTrackRef.current.setEnabled(!isMicOn);
//     }
//     setIsMicOn(!isMicOn);
//   };

//   const toggleCamera = async () => {
//     if (isStreaming && localVideoTrackRef.current) {
//       await localVideoTrackRef.current.setEnabled(!isCameraOn);
//     }
//     setIsCameraOn(!isCameraOn);
//   };

//   const handleSendMessage = () => {
//     if (chatMessage.trim() && stompClientRef.current?.connected && sessionId) {
//       // Send comment to backend
//       stompClientRef.current.publish({
//         destination: "/app/live/comment",
//         body: JSON.stringify({
//           sessionID: sessionId,
//           text: chatMessage,
//         }),
//       });

//       // Add to local chat immediately
//       setChatMessages([
//         ...chatMessages,
//         {
//           id: Date.now(),
//           user: "You",
//           message: chatMessage,
//           time: new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//       setChatMessage("");
//     }
//   };

//   const handleSendReaction = (reactionType: string) => {
//     if (stompClientRef.current?.connected && sessionId) {
//       stompClientRef.current.publish({
//         destination: "/app/live/reaction",
//         body: JSON.stringify({
//           sessionID: sessionId,
//           reactionType: reactionType,
//         }),
//       });
//       toast.success(`Sent ${reactionType} reaction!`);
//     }
//   };

//   const stopAllTracks = () => {
//     if (localStream) {
//       localStream.getTracks().forEach((track) => track.stop());
//       setLocalStream(null);
//     }
//     if (videoRef.current) {
//       videoRef.current.srcObject = null;
//     }
//   };

//   const handleGoBack = () => {
//     stopAllTracks();
//     navigate(-1);
//   };

//   // Pre-stream setup UI
//   if (!isStreaming) {
//     return (
//       <div className="min-h-screen bg-brown_200 flex">
//         {/* Left Side - Video Preview */}
//         <div className="flex-1 flex flex-col items-center justify-center p-8">
//           <div className="w-full max-w-3xl">
//             {/* Header */}
//             <div className="flex mb-6">
//               <ArrowLeft
//                 className="text-white cursor-pointer"
//                 onClick={handleGoBack}
//               />
//               <Typography
//                 variant="subtitle2"
//                 className="text-white uppercase pl-2"
//               >
//                 Live Video
//               </Typography>
//               {!isConnected && (
//                 <span className="ml-4 text-yellow-400 text-sm">
//                   Connecting to server...
//                 </span>
//               )}
//             </div>

//             {/* Video Preview */}
//             <div className="relative bg-black/40 backdrop-blur rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/10">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="w-full h-full object-cover"
//               />

//               {!isCameraOn && (
//                 <div className="absolute inset-0 flex items-center justify-center bg-black/60">
//                   <div className="bg-white/10 backdrop-blur-md p-8 rounded-full">
//                     <VideoOff className="w-16 h-16 text-white/60" />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Control Buttons */}
//             <div className="flex items-center justify-center gap-4 mt-6">
//               <button
//                 onClick={toggleMic}
//                 className={`backdrop-blur p-4 rounded-full transition-all shadow-lg ${
//                   isMicOn
//                     ? "bg-gray-700/50 hover:bg-gray-600/50"
//                     : "bg-red-600 hover:bg-red-700"
//                 }`}
//               >
//                 {isMicOn ? (
//                   <Mic className="w-6 h-6 text-white" />
//                 ) : (
//                   <MicOff className="w-6 h-6 text-white" />
//                 )}
//               </button>

//               <CustomButton
//                 className="text-xs w-fit px-6"
//                 onClick={handleStartLive}
//                 disabled={!channelName.trim() || isLoadingToken || !isConnected}
//               >
//                 Start Live Video
//               </CustomButton>

//               <button
//                 onClick={toggleCamera}
//                 className={`backdrop-blur p-4 rounded-full transition-all shadow-lg ${
//                   isCameraOn
//                     ? "bg-gray-700/50 hover:bg-gray-600/50"
//                     : "bg-red-600 hover:bg-red-700"
//                 }`}
//               >
//                 {isCameraOn ? (
//                   <Video className="w-6 h-6 text-white" />
//                 ) : (
//                   <VideoOff className="w-6 h-6 text-white" />
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="w-96 bg-brown_200 p-6 border-l border-white/10">
//           <div className="mb-6">
//             <input
//               type="text"
//               value={channelName}
//               onChange={(e) => {
//                 const value = e.target.value
//                   .toLowerCase()
//                   .replace(/[^a-z0-9_]/g, "_");

//                 if (value.length <= MAX_CHANNEL_LENGTH) {
//                   setChannelName(value);
//                 }
//               }}
//               placeholder="Enter channel name"
//               className="w-full bg-brown_100 text-white placeholder-white/40 px-4 py-3 rounded-lg
//                focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <div className="flex justify-between text-white/60 text-sm mt-1">
//               <span>Only letters, numbers & underscores</span>
//               <span>
//                 {channelName.length}/{MAX_CHANNEL_LENGTH}
//               </span>
//             </div>
//           </div>

//           <div className="mb-6">
//             <textarea
//               value={streamDescription}
//               onChange={(e) => setStreamDescription(e.target.value)}
//               placeholder="Add stream description"
//               maxLength={500}
//               className="w-full bg-brown_100 text-white placeholder-white/40 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-32"
//             />
//             <div className="text-right text-white/60 text-sm mt-1">
//               {streamDescription.length}/500
//             </div>
//           </div>

//           <div className="flex items-center justify-between bg-brown_100 border border-white/20 px-4 py-3 rounded-lg">
//             <p className="text-white font-medium text-sm">
//               Show Tips collected to viewers
//             </p>
//             <button
//               onClick={() => setShowTips(!showTips)}
//               className={`relative w-12 h-6 rounded-full transition-all ${
//                 showTips ? "bg-brown_200" : "bg-gray-600"
//               }`}
//             >
//               <div
//                 className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
//                   showTips ? "translate-x-6" : ""
//                 }`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Live streaming UI
//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col">
//       <div className="flex-1 flex">
//         <div className="flex-1 relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900">
//           <div className="absolute top-4 left-4 flex items-center gap-3 z-10">
//             <div className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold flex items-center gap-2">
//               <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
//               LIVE
//             </div>
//             <div className="bg-gray-900/80 backdrop-blur px-3 py-1 rounded text-white text-sm flex items-center gap-2">
//               <DollarSign className="w-4 h-4" />${tipsReceived.toLocaleString()}{" "}
//               Received
//             </div>
//           </div>

//           <div className="w-full h-full flex items-center justify-center">
//             {isCameraOn ? (
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 muted
//                 playsInline
//                 className="w-full h-full object-cover"
//               />
//             ) : (
//               <div className="flex items-center justify-center">
//                 <Video className="w-32 h-32 text-white/30" />
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="w-80 bg-white flex flex-col">
//           <div className="p-4 border-b">
//             <h3 className="font-semibold text-lg">Live Chat</h3>
//             <p className="text-sm text-gray-500">
//               {chatMessages.length} messages
//             </p>
//           </div>

//           <div className="flex-1 overflow-y-auto p-4 space-y-3">
//             {chatMessages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`${
//                   msg.isGift ? "bg-orange-100 p-3 rounded-lg" : ""
//                 } ${msg.isSystem ? "bg-blue-50 p-2 rounded text-center" : ""}`}
//               >
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="font-semibold text-sm">{msg.user}</span>
//                   {msg.badge && (
//                     <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded">
//                       {msg.badge}
//                     </span>
//                   )}
//                   {msg.isGift && <span className="text-xs">sent 🔥 Fire</span>}
//                   <span className="text-xs text-gray-500 ml-auto">
//                     {msg.time}
//                   </span>
//                 </div>
//                 {!msg.isGift && !msg.isSystem && (
//                   <p className="text-sm text-gray-800">{msg.message}</p>
//                 )}
//                 {msg.isSystem && (
//                   <p className="text-xs text-gray-600">{msg.message}</p>
//                 )}
//               </div>
//             ))}
//           </div>

//           <div className="p-4 border-t">
//             {/* Reactions */}
//             <div className="flex gap-2 mb-3">
//               {["❤️", "👍", "🔥", "😂", "😮"].map((emoji) => (
//                 <button
//                   key={emoji}
//                   onClick={() => handleSendReaction(emoji)}
//                   className="text-2xl hover:scale-125 transition-transform"
//                 >
//                   {emoji}
//                 </button>
//               ))}
//             </div>

//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
//                 placeholder="Send a message..."
//                 className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition"
//               >
//                 <Send className="w-5 h-5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
//         <div className="flex items-center justify-between max-w-7xl mx-auto">
//           <div className="flex items-center gap-6">
//             <div className="flex items-center gap-2 text-white">
//               <Users className="w-5 h-5" />
//               <span className="font-semibold">
//                 {viewerCount.toLocaleString()}
//               </span>
//             </div>
//             <div className="text-white font-mono">
//               {formatDuration(streamDuration)}
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             <button
//               onClick={toggleCamera}
//               className={`p-3 rounded-full transition-all ${
//                 isCameraOn
//                   ? "bg-gray-700 hover:bg-gray-600 text-white"
//                   : "bg-red-600 hover:bg-red-700 text-white"
//               }`}
//             >
//               {isCameraOn ? (
//                 <Video className="w-5 h-5" />
//               ) : (
//                 <VideoOff className="w-5 h-5" />
//               )}
//             </button>

//             <button
//               onClick={toggleMic}
//               className={`p-3 rounded-full transition-all ${
//                 isMicOn
//                   ? "bg-gray-700 hover:bg-gray-600 text-white"
//                   : "bg-red-600 hover:bg-red-700 text-white"
//               }`}
//             >
//               {isMicOn ? (
//                 <Mic className="w-5 h-5" />
//               ) : (
//                 <MicOff className="w-5 h-5" />
//               )}
//             </button>

//             <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all">
//               <MessageCircle className="w-5 h-5" />
//             </button>

//             <button className="p-3 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-all">
//               <Settings className="w-5 h-5" />
//             </button>

//             <button
//               onClick={handleStopLive}
//               className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition-all"
//             >
//               <Phone className="w-5 h-5" />
//               End Stream
//             </button>
//           </div>

//           <div className="w-32"></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { LiveStreaming };
