// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// import CustomButton from "@/components/forms/CustomButton";
// import Typography from "@/components/forms/Typography";
// import { ArrowLeft, Mic, Video, MicOff, VideoOff } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import AgoraRTC, {
//   type IAgoraRTCClient,
//   type ICameraVideoTrack,
//   type IMicrophoneAudioTrack,
// } from "agora-rtc-sdk-ng";
// import { useAppSelector } from "@/lib/hook";
// import { useGetData } from "@/hooks/apiCalls";
// import { useNavigate, useParams } from "react-router-dom";
// import { MAX_CHANNEL_LENGTH } from "@/utils/helper";
// import { useWebSocket } from "@/context/WebSocketContext";
// import { useLiveStream } from "@/hooks/useLiveStream";
// import { useFetchProfile } from "@/hooks/apiHooks";
// import type {
//   ChatMessage,
//   FloatingReaction,
//   LiveReaction,
//   ReactionCount,
//   ReactionType,
// } from "@/lib/types";
// import { ReactionCounter } from "@/components/live/ReactionCounter";
// import { FloatingReactions } from "@/components/live/FloatingReactions";
// import { showInlineToast } from "@/utils/toastUtils";

// const LiveStreaming = () => {
//   const navigate = useNavigate();
//   const {
//     isConnected,
//     sendMessage,
//     removeCreatorFromLive,
//     refetchLiveHosts,
//     getLiveSession,
//   } = useWebSocket();
//   const { creatorId: urlCreatorIdEncoded, sessionId: urlSessionId } =
//     useParams();

//   // Decode the creatorId since it was encoded (contains @ symbol)
//   const urlCreatorId = urlCreatorIdEncoded
//     ? decodeURIComponent(urlCreatorIdEncoded)
//     : undefined;

//   const { userObject } = useAppSelector((state) => state.auth);
//   const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
//   const { data: profileData } = useFetchProfile(userObject);
//   // Determine if current user is the host
//   const isHost = !urlCreatorId || urlCreatorId === userObject?.usid;

//   const [channelName, setChannelName] = useState("");
//   const [_streamDuration, setStreamDuration] = useState(0);
//   const [streamStartTime, setStreamStartTime] = useState<number | null>(null);
//   const [streamDescription, setStreamDescription] = useState("");
//   const [showTips, setShowTips] = useState(true);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//   const activeSession = isHost ? channelName : urlSessionId || "";
//   const [chatMessage, setChatMessage] = useState("");
//   const [floatingReactions, setFloatingReactions] = useState<
//     FloatingReaction[]
//   >([]);
//   const [reactionCounts, setReactionCounts] = useState<ReactionCount>({
//     LIKE: 0,
//     LOVE: 0,
//     DISLIKE: 0,
//     LOL: 0,
//   });

//   const handleCommentReceived = useCallback(
//     (comment: any) => {
//       console.log("📨 Received live comment:", comment);

//       const isMe =
//         comment.userId === userObject?.usid ||
//         comment.user === userObject?.usid;

//       if (isMe) {
//         console.log("Ignoring own comment from socket to avoid double render");
//         return;
//       }

//       const newMessage = {
//         id:
//           typeof comment.id === "string"
//             ? parseInt(comment.id)
//             : (comment.id as number),
//         user: comment.user || comment.userId || "Anonymous",
//         username: comment.username,
//         message: comment.message,
//         time: comment.timestamp
//           ? new Date(comment.timestamp).toLocaleTimeString("en-US", {
//               hour: "2-digit",
//               minute: "2-digit",
//             })
//           : new Date().toLocaleTimeString("en-US", {
//               hour: "2-digit",
//               minute: "2-digit",
//             }),
//         isComment: true,
//       };

//       setChatMessages((prev) => [...prev, newMessage]);
//     },
//     [userObject?.usid],
//   );

//   const handleReactionReceived = useCallback(
//     (reaction: LiveReaction) => {
//       // Filter out self-reactions from WebSocket to avoid duplicating the
//       // optimistic update in handleReaction. Also checks the raw `user`
//       // field as a fallback since the reaction broadcast payload shape
//       // isn't guaranteed to include userId in every backend build.
//       const isMe =
//         reaction.userId === userObject?.usid ||
//         (reaction as any).user === userObject?.usid;
//       if (isMe) {
//         return;
//       }

//       setReactionCounts((prev) => ({
//         ...prev,
//         [reaction.reactionType]: prev[reaction.reactionType] + 1,
//       }));

//       const floatingReaction: FloatingReaction = {
//         id: `${reaction.id}-${Date.now()}`,
//         type: reaction.reactionType,
//         x: Math.random() * 80 + 10,
//         y: 0,
//       };

//       setFloatingReactions((prev) => [...prev, floatingReaction]);

//       setTimeout(() => {
//         setFloatingReactions((prev) =>
//           prev.filter((r) => r.id !== floatingReaction.id),
//         );
//       }, 3000);
//     },
//     [userObject?.usid],
//   );

//   const { viewerCount, isStreamEnded, sendComment, sendReaction } =
//     useLiveStream({
//       sessionId: activeSession || "",
//       creatorId: isHost ? userObject?.usid : urlCreatorId,
//       role: isHost ? "HOST" : "VIEWER",
//       enabled: isStreaming && !!activeSession,
//       onCommentReceived: handleCommentReceived,
//       onReactionReceived: handleReactionReceived,
//     });

//   // ✅ Handle reaction clicks — added an isConnected check up front so a tap
//   // while the socket is down shows a toast instead of doing nothing. The
//   // sendReaction() call itself already returns a real boolean (see
//   // useLiveStream), so failures still fall through to the error toast below.
//   const handleReaction = (reactionType: ReactionType) => {
//     if (!isStreaming || !sendReaction) return;

//     if (!isConnected) {
//       showInlineToast({
//         type: "warning",
//         title: "Reconnecting — try that again in a moment",
//       });
//       return;
//     }

//     const success = sendReaction(reactionType);
//     if (success) {
//       setReactionCounts((prev) => ({
//         ...prev,
//         [reactionType]: prev[reactionType] + 1,
//       }));

//       const floatingReaction: FloatingReaction = {
//         id: `optimistic-${Date.now()}`,
//         type: reactionType,
//         x: Math.random() * 80 + 10,
//         y: 0,
//       };

//       setFloatingReactions((prev) => [...prev, floatingReaction]);

//       setTimeout(() => {
//         setFloatingReactions((prev) =>
//           prev.filter((r) => r.id !== floatingReaction.id),
//         );
//       }, 3000);
//     } else {
//       showInlineToast({
//         type: "error",
//         title: "Reaction didn't send — check your connection",
//       });
//     }
//   };

//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const agoraClientRef = useRef<IAgoraRTCClient | null>(null);
//   const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
//   const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
//   const heartbeatRef = useRef<number | null>(null);
//   const chatContainerRef = useRef<HTMLDivElement | null>(null);

//   const startHeartbeat = () => {
//     if (!isHost) return;
//     if (heartbeatRef.current) return; // already running

//     heartbeatRef.current = window.setInterval(() => {
//       sendMessage("/app/live/streaming", { isStreaming: true });
//     }, 25000);
//   };

//   const stopHeartbeat = () => {
//     if (heartbeatRef.current) {
//       window.clearInterval(heartbeatRef.current);
//       heartbeatRef.current = null;
//     }
//   };

//   const { isLoading: isLoadingToken, refetch: fetchToken } = useGetData({
//     url: `/agora/rtc-token?channel=${channelName || activeSession}&uid=${userObject?.usid}`,
//     queryKey: [
//       "GetAgoraRTCToken",
//       channelName || activeSession,
//       userObject?.usid,
//     ],
//     enabled: false,
//   });

//   // If viewer, join existing stream
//   useEffect(() => {
//     if (!isHost && activeSession && urlCreatorId) {
//       setChannelName(activeSession);
//       setIsStreaming(true);

//       joinExistingStream(activeSession);
//     }
//   }, [isHost, activeSession, urlCreatorId]);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({
//         video: { facingMode: "user", aspectRatio: 16 / 9 },
//         audio: true,
//       })
//       .then((stream) => {
//         setLocalStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((_err) => {
//         showInlineToast({
//           type: "error",
//           title: "Please allow camera and microphone access",
//         });
//       });

//     return () => {
//       stopHeartbeat();
//       stopAllTracks();
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//       if (agoraClientRef.current) {
//         agoraClientRef.current.leave();
//       }
//     };
//   }, []);

//   // ✅ Get stream start time from backend (for BOTH host and viewer)
//   useEffect(() => {
//     if (!isStreaming) return;

//     const creatorId = isHost ? userObject?.usid : urlCreatorId;
//     if (!creatorId) return;

//     const liveSession = getLiveSession(creatorId);

//     if (liveSession?.streamStartTime) {
//       setStreamStartTime(liveSession.streamStartTime);
//     } else {
//       console.warn("⚠️ No start time from backend yet, waiting...");
//     }
//   }, [isStreaming, isHost, userObject?.usid, urlCreatorId, getLiveSession]);

//   // ✅ Stream duration timer - simple and clean
//   useEffect(() => {
//     if (!isStreaming) {
//       setStreamDuration(0);
//       setStreamStartTime(null);
//       return;
//     }

//     if (!streamStartTime) {
//       return;
//     }

//     const updateDuration = () => {
//       const elapsed = Math.floor((Date.now() - streamStartTime) / 1000);
//       setStreamDuration(elapsed);
//     };

//     updateDuration();
//     const interval = setInterval(updateDuration, 1000);

//     return () => clearInterval(interval);
//   }, [isStreaming, streamStartTime]);

//   // Add this useEffect to handle stream end for viewers
//   useEffect(() => {
//     if (isHost) return;

//     if (isStreamEnded) {
//       showInlineToast({
//         type: "info",
//         title: "The stream has ended",
//       });
//       setTimeout(() => {
//         handleStopLive();
//       }, 2000);
//       return;
//     }

//     if (isConnected && isStreaming && urlCreatorId) {
//       // Reserved for a future backup check against the live creators list
//       // if we ever need it — see original notes.
//     }
//   }, [
//     isStreamEnded,
//     isHost,
//     isConnected,
//     isStreaming,
//     urlCreatorId,
//     getLiveSession,
//   ]);

//   useEffect(() => {
//     if (!isHost) return;
//     if (!isStreaming) return;
//     if (!isConnected) return;

//     startHeartbeat();
//   }, [isConnected, isStreaming, isHost]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatMessages]);

//   const handleStartLive = async () => {
//     // ✅ Main fix: block going live if the websocket isn't connected. Before
//     // this, only APP_ID/channelName were checked — a dead STOMP connection
//     // meant /app/live/go silently never reached the backend, so the host
//     // would see their own preview go live locally while the backend (and
//     // therefore every viewer) never found out.
//     if (!isConnected) {
//       showInlineToast({
//         type: "error",
//         title: "Not connected to the server yet — please wait and try again",
//       });
//       return;
//     }

//     try {
//       if (!APP_ID) {
//         showInlineToast({ type: "error", title: "App ID is missing" });
//         return;
//       }

//       if (!channelName?.trim()) {
//         showInlineToast({ type: "error", title: "Channel name is required" });
//         return;
//       }

//       const res = await fetchToken();
//       const token = res?.data?.token;

//       if (!token) {
//         showInlineToast({
//           type: "error",
//           title: "Failed to obtain streaming token",
//         });
//         return;
//       }

//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }

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

//       client.on("user-joined", (_user) => {});
//       client.on("user-left", (_user) => {});

//       setIsStreaming(true);
//       setStreamStartTime(Date.now());

//       await new Promise((resolve) => setTimeout(resolve, 100));

//       // Re-check right before sending — the Agora token fetch + track setup
//       // above takes real time, and the socket could have dropped mid-setup.
//       if (!isConnected) {
//         showInlineToast({
//           type: "error",
//           title: "Lost connection while starting — please retry",
//         });
//         return;
//       }

//       console.log("📡 Sending GO LIVE message");

//       sendMessage("/app/live/go", {
//         creatorId: profileData?.data?.username,
//         session: channelName,
//       });
//       console.log(
//         "📡 Sent GO LIVE message",
//         profileData?.data?.username,
//         channelName,
//       );
//     } catch (error) {
//       showInlineToast({
//         type: "error",
//         title: "Failed to start live stream.Check console for details.",
//       });
//     }
//   };

//   const joinExistingStream = async (channel: string) => {
//     try {
//       if (!APP_ID) {
//         showInlineToast({
//           type: "error",
//           title: "App ID is missing",
//         });
//         return;
//       }

//       if (!channel) {
//         showInlineToast({
//           type: "error",
//           title: "Channel name is missing",
//         });
//         return;
//       }

//       const res = await fetchToken();
//       const token = res?.data?.token;

//       if (!token) {
//         showInlineToast({
//           type: "error",
//           title: "Failed to obtain streaming token",
//         });
//         return;
//       }

//       const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
//       agoraClientRef.current = client;

//       await client.setClientRole("audience");
//       await client.join(APP_ID, channel, token, userObject?.usid);

//       client.on("user-published", async (user, mediaType) => {
//         await client.subscribe(user, mediaType);

//         if (mediaType === "video") {
//           user.videoTrack?.play(videoRef.current!);
//         }

//         if (mediaType === "audio") {
//           user.audioTrack?.play();
//         }
//       });

//       showInlineToast({
//         type: "success",
//         title: "Successfully joined live stream",
//       });
//     } catch (error) {
//       console.error("Error joining stream:", error);
//       showInlineToast({
//         type: "error",
//         title: "Failed to join live stream",
//       });
//     }
//   };

//   const handleStopLive = async () => {
//     try {
//       stopHeartbeat();
//       if (isHost && channelName) {
//         sendMessage("/app/live/end", {
//           session: channelName,
//           creatorId: userObject?.usid,
//         });
//       }

//       if (userObject?.usid && isHost) {
//         removeCreatorFromLive(userObject?.usid);
//       }

//       setTimeout(() => {
//         refetchLiveHosts();
//       }, 500);

//       if (localAudioTrackRef.current) {
//         localAudioTrackRef.current.close();
//       }
//       if (localVideoTrackRef.current) {
//         localVideoTrackRef.current.close();
//       }

//       if (agoraClientRef.current) {
//         await agoraClientRef.current.leave();
//       }

//       setIsStreaming(false);
//       setChatMessages([]);

//       if (!isHost) {
//         navigate(-1);
//         return;
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user", aspectRatio: 16 / 9 },
//         audio: true,
//       });
//       setLocalStream(stream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       showInlineToast({
//         type: "success",
//         title: "Stream ended",
//       });
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
//     const message = chatMessage.trim();

//     if (!message) {
//       return;
//     }

//     if (isStreaming && sendComment) {
//       const success = sendComment(message);

//       if (success) {
//         const newMessage = {
//           id: Date.now(),
//           user: "You",
//           message: message,
//           time: new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//           isComment: true,
//         };

//         setChatMessages((prev) => [...prev, newMessage]);
//         setChatMessage("");
//       } else {
//         showInlineToast({
//           type: "error",
//           title: "Failed to send message",
//         });
//       }
//     } else {
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           user: "You",
//           message: message,
//           time: new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//       setChatMessage("");
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
//   if (!isStreaming && isHost) {
//     return (
//       <div className="min-h-screen bg-brown_200 flex flex-col lg:flex-row">
//         <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
//           <div className="w-full max-w-3xl">
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

//               <div className="ml-auto">
//                 {isConnected ? (
//                   <span className="flex items-center gap-2 text-green-400 text-sm">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                     Connected
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-2 text-yellow-400 text-sm">
//                     <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
//                     Connecting...
//                   </span>
//                 )}
//               </div>
//             </div>

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

//               {/* Disabled (and relabeled) while the socket is down, mirroring
//                   the guard inside handleStartLive, so the button visibly
//                   communicates "not ready" instead of looking clickable and
//                   then silently doing nothing useful. */}
//               <CustomButton
//                 className="text-xs w-fit px-6"
//                 onClick={handleStartLive}
//                 disabled={!channelName.trim() || isLoadingToken || !isConnected}
//                 title={!isConnected ? "Waiting for connection..." : undefined}
//               >
//                 {isConnected ? "Start Live Video" : "Connecting..."}
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

//         <div className="w-full lg:w-96 bg-brown_200 p-6 border-t lg:border-t-0 lg:border-l border-white/10">
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
//       <div className="flex-1 flex flex-col lg:flex-row min-h-0">
//         <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 aspect-video lg:aspect-auto lg:flex-1">
//           <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
//             <div className="flex items-center gap-3">
//               <div className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold flex items-center gap-2">
//                 <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
//                 LIVE
//               </div>

//               {isStreaming && (
//                 <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-green-500 rounded-full" />
//                   {viewerCount} Viewers
//                 </div>
//               )}

//               {isStreaming && (
//                 <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10">
//                   {new Date(_streamDuration * 1000).toISOString().substr(11, 8)}
//                 </div>
//               )}

//               {/* Surfaces a dropped connection during an active stream, since
//                   reactions/comments/heartbeats all silently stop working
//                   otherwise with no visible indicator. */}
//               {isStreaming && !isConnected && (
//                 <div className="bg-yellow-600/80 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10 flex items-center gap-2">
//                   <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse" />
//                   Reconnecting...
//                 </div>
//               )}
//             </div>

//             <ReactionCounter counts={reactionCounts} />
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

//           <FloatingReactions reactions={floatingReactions} />

//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
//             <button
//               onClick={toggleMic}
//               className={`p-4 rounded-full transition-all shadow-lg border border-white/10 backdrop-blur-md ${
//                 isMicOn
//                   ? "bg-white/20 hover:bg-white/30 text-white"
//                   : "bg-red-500 hover:bg-red-600 text-white"
//               }`}
//               title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
//             >
//               {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
//             </button>

//             {isHost ? (
//               <CustomButton
//                 className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md border border-red-500/50"
//                 onClick={handleStopLive}
//               >
//                 End Stream
//               </CustomButton>
//             ) : (
//               <CustomButton
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md border border-white/10"
//                 onClick={handleStopLive}
//               >
//                 Leave Stream
//               </CustomButton>
//             )}

//             <button
//               onClick={toggleCamera}
//               className={`p-4 rounded-full transition-all shadow-lg border border-white/10 backdrop-blur-md ${
//                 isCameraOn
//                   ? "bg-white/20 hover:bg-white/30 text-white"
//                   : "bg-red-500 hover:bg-red-600 text-white"
//               }`}
//               title={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
//             >
//               {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
//             </button>
//           </div>
//         </div>

//         <div className="w-full lg:w-80 bg-white flex flex-col flex-1 lg:flex-none min-h-0">
//           <div className="p-4 border-b">
//             <h3 className="font-semibold text-lg">Live Chat</h3>
//             <p className="text-sm text-gray-500">
//               {chatMessages.length} messages
//             </p>
//           </div>

//           <div
//             ref={chatContainerRef}
//             className="flex-1 overflow-y-auto p-4 space-y-3"
//           >
//             {chatMessages.map((msg) => (
//               <div key={msg.id} className="flex gap-2">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
//                   {msg.user?.[0]?.toUpperCase() || "A"}
//                 </div>
//                 <div>
//                   <div className="flex items-baseline gap-2">
//                     <span className="font-semibold text-sm">
//                       {msg.username || msg.user}
//                     </span>
//                     <span className="text-xs text-gray-400">{msg.time}</span>
//                   </div>
//                   <p className="text-sm text-gray-800">{msg.message}</p>
//                 </div>
//               </div>
//             ))}
//             {chatMessages.length === 0 && (
//               <div className="text-center text-gray-400 mt-10">
//                 No messages yet. Say hello! 👋
//               </div>
//             )}
//           </div>

//           <div className="p-4 border-t bg-gray-50">
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                 placeholder="Type a message..."
//                 className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!chatMessage.trim()}
//                 className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                 title="Send Message"
//               >
//                 <span className="sr-only">Send</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <line x1="22" y1="2" x2="11" y2="13"></line>
//                   <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//                 </svg>
//               </button>
//             </div>

//             {/* Dimmed (not hard-disabled — a tap while offline still gives
//                 feedback via the toast in handleReaction) when the socket
//                 is down. */}
//             <div
//               className={`flex justify-between mt-3 px-2 ${
//                 !isConnected ? "opacity-50" : ""
//               }`}
//             >
//               <button
//                 onClick={() => handleReaction("LIKE")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Like"
//               >
//                 👍
//               </button>
//               <button
//                 onClick={() => handleReaction("LOVE")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Love"
//               >
//                 ❤️
//               </button>
//               <button
//                 onClick={() => handleReaction("LOL")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Haha"
//               >
//                 😂
//               </button>
//               <button
//                 onClick={() => handleReaction("DISLIKE")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Dislike"
//               >
//                 👎
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { LiveStreaming };

// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// import CustomButton from "@/components/forms/CustomButton";
// import Typography from "@/components/forms/Typography";
// import { ArrowLeft, Mic, Video, MicOff, VideoOff } from "lucide-react";
// import { useCallback, useEffect, useRef, useState } from "react";
// import AgoraRTC, {
//   type IAgoraRTCClient,
//   type ICameraVideoTrack,
//   type IMicrophoneAudioTrack,
// } from "agora-rtc-sdk-ng";
// import { useAppSelector } from "@/lib/hook";
// import { useGetData } from "@/hooks/apiCalls";
// import { useNavigate, useParams } from "react-router-dom";
// import { MAX_CHANNEL_LENGTH } from "@/utils/helper";
// import { useWebSocket } from "@/context/WebSocketContext";
// import { useLiveStream } from "@/hooks/useLiveStream";
// import { useFetchProfile } from "@/hooks/apiHooks";
// import type {
//   ChatMessage,
//   FloatingReaction,
//   LiveReaction,
//   ReactionCount,
//   ReactionType,
// } from "@/lib/types";
// import { ReactionCounter } from "@/components/live/ReactionCounter";
// import { FloatingReactions } from "@/components/live/FloatingReactions";
// import { showInlineToast } from "@/utils/toastUtils";

// const LiveStreaming = () => {
//   const navigate = useNavigate();
//   const {
//     isConnected,
//     sendMessage,
//     removeCreatorFromLive,
//     refetchLiveHosts,
//     getLiveSession,
//   } = useWebSocket();
//   const { creatorId: urlCreatorIdEncoded, sessionId: urlSessionId } =
//     useParams();

//   // Decode the creatorId since it was encoded (contains @ symbol)
//   const urlCreatorId = urlCreatorIdEncoded
//     ? decodeURIComponent(urlCreatorIdEncoded)
//     : undefined;

//   const { userObject } = useAppSelector((state) => state.auth);
//   const APP_ID = import.meta.env.VITE_AGORA_APP_ID;
//   const { data: profileData } = useFetchProfile(userObject);
//   // Determine if current user is the host
//   const isHost = !urlCreatorId || urlCreatorId === userObject?.usid;

//   const [channelName, setChannelName] = useState("");
//   const [_streamDuration, setStreamDuration] = useState(0);
//   const [streamStartTime, setStreamStartTime] = useState<number | null>(null);
//   const [streamDescription, setStreamDescription] = useState("");
//   const [showTips, setShowTips] = useState(true);
//   const [isStreaming, setIsStreaming] = useState(false);
//   const [isMicOn, setIsMicOn] = useState(true);
//   const [isCameraOn, setIsCameraOn] = useState(true);
//   const [localStream, setLocalStream] = useState<MediaStream | null>(null);
//   const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
//   const activeSession = isHost ? channelName : urlSessionId || "";
//   const [chatMessage, setChatMessage] = useState("");
//   const [floatingReactions, setFloatingReactions] = useState<
//     FloatingReaction[]
//   >([]);
//   const [reactionCounts, setReactionCounts] = useState<ReactionCount>({
//     LIKE: 0,
//     LOVE: 0,
//     DISLIKE: 0,
//     LOL: 0,
//   });

//   // Tracks client-generated ids for comments this tab has sent, so the
//   // broadcast echo of our own message can be recognized and dropped without
//   // depending on the backend's user-identity field names matching what we
//   // expect (see sendComment in useLiveStream — that's what was causing
//   // the sender's own message to double up, and to show as "Anonymous"
//   // with "Invalid Date" instead of being filtered).
//   const sentCommentIdsRef = useRef<Set<string>>(new Set());

//   const handleCommentReceived = useCallback(
//     (comment: any) => {
//       console.log("📨 Received live comment:", comment);

//       const echoId = comment.clientMessageId;
//       if (echoId && sentCommentIdsRef.current.has(echoId)) {
//         sentCommentIdsRef.current.delete(echoId);
//         console.log("Ignoring echo of our own comment:", echoId);
//         return;
//       }

//       // Fallback for the case where clientMessageId isn't echoed back at
//       // all (older backend build, or it strips unknown fields).
//       const isMe =
//         comment.userId === userObject?.usid ||
//         comment.user === userObject?.usid ||
//         comment.username === userObject?.usid;

//       if (isMe) {
//         return;
//       }

//       const rawTimestamp =
//         comment.timestamp || comment.sentAt || comment.createdAt;
//       const parsedDate = rawTimestamp ? new Date(rawTimestamp) : new Date();
//       const time = Number.isNaN(parsedDate.getTime())
//         ? new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           })
//         : parsedDate.toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           });

//       const newMessage = {
//         id:
//           typeof comment.id === "string"
//             ? parseInt(comment.id)
//             : (comment.id as number),
//         user:
//           comment.username ||
//           comment.user ||
//           comment.displayName ||
//           comment.senderName ||
//           "Anonymous",
//         username: comment.username,
//         message: comment.message,
//         time,
//         isComment: true,
//       };

//       setChatMessages((prev) => [...prev, newMessage]);
//     },
//     [userObject?.usid],
//   );

//   const handleReactionReceived = useCallback(
//     (reaction: LiveReaction) => {
//       // Filter out self-reactions from WebSocket to avoid duplicating the
//       // optimistic update in handleReaction. Also checks the raw `user`
//       // field as a fallback since the reaction broadcast payload shape
//       // isn't guaranteed to include userId in every backend build.
//       const isMe =
//         reaction.userId === userObject?.usid ||
//         (reaction as any).user === userObject?.usid;
//       if (isMe) {
//         return;
//       }

//       setReactionCounts((prev) => ({
//         ...prev,
//         [reaction.reactionType]: prev[reaction.reactionType] + 1,
//       }));

//       const floatingReaction: FloatingReaction = {
//         id: `${reaction.id}-${Date.now()}`,
//         type: reaction.reactionType,
//         x: Math.random() * 80 + 10,
//         y: 0,
//       };

//       setFloatingReactions((prev) => [...prev, floatingReaction]);

//       setTimeout(() => {
//         setFloatingReactions((prev) =>
//           prev.filter((r) => r.id !== floatingReaction.id),
//         );
//       }, 3000);
//     },
//     [userObject?.usid],
//   );

//   const { viewerCount, isStreamEnded, sendComment, sendReaction } =
//     useLiveStream({
//       sessionId: activeSession || "",
//       creatorId: isHost ? userObject?.usid : urlCreatorId,
//       role: isHost ? "HOST" : "VIEWER",
//       enabled: isStreaming && !!activeSession,
//       onCommentReceived: handleCommentReceived,
//       onReactionReceived: handleReactionReceived,
//     });

//   // ✅ Handle reaction clicks — added an isConnected check up front so a tap
//   // while the socket is down shows a toast instead of doing nothing. The
//   // sendReaction() call itself already returns a real boolean (see
//   // useLiveStream), so failures still fall through to the error toast below.
//   const handleReaction = (reactionType: ReactionType) => {
//     if (!isStreaming || !sendReaction) return;

//     if (!isConnected) {
//       showInlineToast({
//         type: "warning",
//         title: "Reconnecting — try that again in a moment",
//       });
//       return;
//     }

//     const success = sendReaction(reactionType);
//     if (success) {
//       setReactionCounts((prev) => ({
//         ...prev,
//         [reactionType]: prev[reactionType] + 1,
//       }));

//       const floatingReaction: FloatingReaction = {
//         id: `optimistic-${Date.now()}`,
//         type: reactionType,
//         x: Math.random() * 80 + 10,
//         y: 0,
//       };

//       setFloatingReactions((prev) => [...prev, floatingReaction]);

//       setTimeout(() => {
//         setFloatingReactions((prev) =>
//           prev.filter((r) => r.id !== floatingReaction.id),
//         );
//       }, 3000);
//     } else {
//       showInlineToast({
//         type: "error",
//         title: "Reaction didn't send — check your connection",
//       });
//     }
//   };

//   const videoRef = useRef<HTMLVideoElement | null>(null);
//   const agoraClientRef = useRef<IAgoraRTCClient | null>(null);
//   const localAudioTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
//   const localVideoTrackRef = useRef<ICameraVideoTrack | null>(null);
//   const heartbeatRef = useRef<number | null>(null);
//   const chatContainerRef = useRef<HTMLDivElement | null>(null);

//   const startHeartbeat = () => {
//     if (!isHost) return;
//     if (heartbeatRef.current) return; // already running

//     heartbeatRef.current = window.setInterval(() => {
//       sendMessage("/app/live/streaming", { isStreaming: true });
//     }, 25000);
//   };

//   const stopHeartbeat = () => {
//     if (heartbeatRef.current) {
//       window.clearInterval(heartbeatRef.current);
//       heartbeatRef.current = null;
//     }
//   };

//   const { isLoading: isLoadingToken, refetch: fetchToken } = useGetData({
//     url: `/agora/rtc-token?channel=${channelName || activeSession}&uid=${userObject?.usid}`,
//     queryKey: [
//       "GetAgoraRTCToken",
//       channelName || activeSession,
//       userObject?.usid,
//     ],
//     enabled: false,
//   });

//   // If viewer, join existing stream
//   useEffect(() => {
//     if (!isHost && activeSession && urlCreatorId) {
//       setChannelName(activeSession);
//       setIsStreaming(true);

//       joinExistingStream(activeSession);
//     }
//   }, [isHost, activeSession, urlCreatorId]);

//   useEffect(() => {
//     navigator.mediaDevices
//       .getUserMedia({
//         video: { facingMode: "user", aspectRatio: 16 / 9 },
//         audio: true,
//       })
//       .then((stream) => {
//         setLocalStream(stream);
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((_err) => {
//         showInlineToast({
//           type: "error",
//           title: "Please allow camera and microphone access",
//         });
//       });

//     return () => {
//       stopHeartbeat();
//       stopAllTracks();
//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }
//       if (agoraClientRef.current) {
//         agoraClientRef.current.leave();
//       }
//     };
//   }, []);

//   // ✅ Get stream start time from backend (for BOTH host and viewer)
//   useEffect(() => {
//     if (!isStreaming) return;

//     const creatorId = isHost ? userObject?.usid : urlCreatorId;
//     if (!creatorId) return;

//     const liveSession = getLiveSession(creatorId);

//     if (liveSession?.streamStartTime) {
//       setStreamStartTime(liveSession.streamStartTime);
//     } else {
//       console.warn("⚠️ No start time from backend yet, waiting...");
//     }
//   }, [isStreaming, isHost, userObject?.usid, urlCreatorId, getLiveSession]);

//   // ✅ Stream duration timer - simple and clean
//   useEffect(() => {
//     if (!isStreaming) {
//       setStreamDuration(0);
//       setStreamStartTime(null);
//       return;
//     }

//     if (!streamStartTime) {
//       return;
//     }

//     const updateDuration = () => {
//       const elapsed = Math.floor((Date.now() - streamStartTime) / 1000);
//       setStreamDuration(elapsed);
//     };

//     updateDuration();
//     const interval = setInterval(updateDuration, 1000);

//     return () => clearInterval(interval);
//   }, [isStreaming, streamStartTime]);

//   // Add this useEffect to handle stream end for viewers
//   useEffect(() => {
//     if (isHost) return;

//     if (isStreamEnded) {
//       showInlineToast({
//         type: "info",
//         title: "The stream has ended",
//       });
//       setTimeout(() => {
//         handleStopLive();
//       }, 2000);
//       return;
//     }

//     if (isConnected && isStreaming && urlCreatorId) {
//       // Reserved for a future backup check against the live creators list
//       // if we ever need it — see original notes.
//     }
//   }, [
//     isStreamEnded,
//     isHost,
//     isConnected,
//     isStreaming,
//     urlCreatorId,
//     getLiveSession,
//   ]);

//   useEffect(() => {
//     if (!isHost) return;
//     if (!isStreaming) return;
//     if (!isConnected) return;

//     startHeartbeat();
//   }, [isConnected, isStreaming, isHost]);

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop =
//         chatContainerRef.current.scrollHeight;
//     }
//   }, [chatMessages]);

//   const handleStartLive = async () => {
//     // ✅ Main fix: block going live if the websocket isn't connected. Before
//     // this, only APP_ID/channelName were checked — a dead STOMP connection
//     // meant /app/live/go silently never reached the backend, so the host
//     // would see their own preview go live locally while the backend (and
//     // therefore every viewer) never found out.
//     if (!isConnected) {
//       showInlineToast({
//         type: "error",
//         title: "Not connected to the server yet — please wait and try again",
//       });
//       return;
//     }

//     try {
//       if (!APP_ID) {
//         showInlineToast({ type: "error", title: "App ID is missing" });
//         return;
//       }

//       if (!channelName?.trim()) {
//         showInlineToast({ type: "error", title: "Channel name is required" });
//         return;
//       }

//       const res = await fetchToken();
//       const token = res?.data?.token;

//       if (!token) {
//         showInlineToast({
//           type: "error",
//           title: "Failed to obtain streaming token",
//         });
//         return;
//       }

//       if (localStream) {
//         localStream.getTracks().forEach((track) => track.stop());
//       }

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

//       client.on("user-joined", (_user) => {});
//       client.on("user-left", (_user) => {});

//       setIsStreaming(true);
//       setStreamStartTime(Date.now());

//       await new Promise((resolve) => setTimeout(resolve, 100));

//       // Re-check right before sending — the Agora token fetch + track setup
//       // above takes real time, and the socket could have dropped mid-setup.
//       if (!isConnected) {
//         showInlineToast({
//           type: "error",
//           title: "Lost connection while starting — please retry",
//         });
//         return;
//       }

//       console.log("📡 Sending GO LIVE message");

//       sendMessage("/app/live/go", {
//         creatorId: profileData?.data?.username,
//         session: channelName,
//       });
//       console.log(
//         "📡 Sent GO LIVE message",
//         profileData?.data?.username,
//         channelName,
//       );
//     } catch (error) {
//       showInlineToast({
//         type: "error",
//         title: "Failed to start live stream.Check console for details.",
//       });
//     }
//   };

//   const joinExistingStream = async (channel: string) => {
//     try {
//       if (!APP_ID) {
//         showInlineToast({
//           type: "error",
//           title: "App ID is missing",
//         });
//         return;
//       }

//       if (!channel) {
//         showInlineToast({
//           type: "error",
//           title: "Channel name is missing",
//         });
//         return;
//       }

//       const res = await fetchToken();
//       const token = res?.data?.token;

//       if (!token) {
//         showInlineToast({
//           type: "error",
//           title: "Failed to obtain streaming token",
//         });
//         return;
//       }

//       const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
//       agoraClientRef.current = client;

//       await client.setClientRole("audience");
//       await client.join(APP_ID, channel, token, userObject?.usid);

//       client.on("user-published", async (user, mediaType) => {
//         await client.subscribe(user, mediaType);

//         if (mediaType === "video") {
//           user.videoTrack?.play(videoRef.current!);
//         }

//         if (mediaType === "audio") {
//           user.audioTrack?.play();
//         }
//       });

//       showInlineToast({
//         type: "success",
//         title: "Successfully joined live stream",
//       });
//     } catch (error) {
//       console.error("Error joining stream:", error);
//       showInlineToast({
//         type: "error",
//         title: "Failed to join live stream",
//       });
//     }
//   };

//   const handleStopLive = async () => {
//     try {
//       stopHeartbeat();
//       if (isHost && channelName) {
//         sendMessage("/app/live/end", {
//           session: channelName,
//           creatorId: userObject?.usid,
//         });
//       }

//       if (userObject?.usid && isHost) {
//         removeCreatorFromLive(userObject?.usid);
//       }

//       setTimeout(() => {
//         refetchLiveHosts();
//       }, 500);

//       if (localAudioTrackRef.current) {
//         localAudioTrackRef.current.close();
//       }
//       if (localVideoTrackRef.current) {
//         localVideoTrackRef.current.close();
//       }

//       if (agoraClientRef.current) {
//         await agoraClientRef.current.leave();
//       }

//       setIsStreaming(false);
//       setChatMessages([]);

//       if (!isHost) {
//         navigate(-1);
//         return;
//       }

//       const stream = await navigator.mediaDevices.getUserMedia({
//         video: { facingMode: "user", aspectRatio: 16 / 9 },
//         audio: true,
//       });
//       setLocalStream(stream);
//       if (videoRef.current) {
//         videoRef.current.srcObject = stream;
//       }

//       showInlineToast({
//         type: "success",
//         title: "Stream ended",
//       });
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
//     const message = chatMessage.trim();

//     if (!message) {
//       return;
//     }

//     if (isStreaming && sendComment) {
//       const clientMessageId = sendComment(message);

//       if (clientMessageId) {
//         // Remember this id so the broadcast echo of this exact message
//         // gets recognized and skipped in handleCommentReceived instead of
//         // being added a second time.
//         sentCommentIdsRef.current.add(clientMessageId);

//         const newMessage = {
//           id: Date.now(),
//           user: "You",
//           message: message,
//           time: new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//           isComment: true,
//         };

//         setChatMessages((prev) => [...prev, newMessage]);
//         setChatMessage("");
//       } else {
//         showInlineToast({
//           type: "error",
//           title: "Failed to send message",
//         });
//       }
//     } else {
//       setChatMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now(),
//           user: "You",
//           message: message,
//           time: new Date().toLocaleTimeString("en-US", {
//             hour: "2-digit",
//             minute: "2-digit",
//           }),
//         },
//       ]);
//       setChatMessage("");
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
//   if (!isStreaming && isHost) {
//     return (
//       <div className="min-h-screen bg-brown_200 flex flex-col lg:flex-row">
//         <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
//           <div className="w-full max-w-3xl">
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

//               <div className="ml-auto">
//                 {isConnected ? (
//                   <span className="flex items-center gap-2 text-green-400 text-sm">
//                     <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
//                     Connected
//                   </span>
//                 ) : (
//                   <span className="flex items-center gap-2 text-yellow-400 text-sm">
//                     <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
//                     Connecting...
//                   </span>
//                 )}
//               </div>
//             </div>

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

//               {/* Disabled (and relabeled) while the socket is down, mirroring
//                   the guard inside handleStartLive, so the button visibly
//                   communicates "not ready" instead of looking clickable and
//                   then silently doing nothing useful. */}
//               <CustomButton
//                 className="text-xs w-fit px-6"
//                 onClick={handleStartLive}
//                 disabled={!channelName.trim() || isLoadingToken || !isConnected}
//                 title={!isConnected ? "Waiting for connection..." : undefined}
//               >
//                 {isConnected ? "Start Live Video" : "Connecting..."}
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

//         <div className="w-full lg:w-96 bg-brown_200 p-6 border-t lg:border-t-0 lg:border-l border-white/10">
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
//       <div className="flex-1 flex flex-col lg:flex-row min-h-0">
//         <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 aspect-video lg:aspect-auto lg:flex-1">
//           <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
//             <div className="flex items-center gap-3">
//               <div className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold flex items-center gap-2">
//                 <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
//                 LIVE
//               </div>

//               {isStreaming && (
//                 <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10 flex items-center gap-2">
//                   <span className="w-2 h-2 bg-green-500 rounded-full" />
//                   {viewerCount} Viewers
//                 </div>
//               )}

//               {isStreaming && (
//                 <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10">
//                   {new Date(_streamDuration * 1000).toISOString().substr(11, 8)}
//                 </div>
//               )}

//               {/* Surfaces a dropped connection during an active stream, since
//                   reactions/comments/heartbeats all silently stop working
//                   otherwise with no visible indicator. */}
//               {isStreaming && !isConnected && (
//                 <div className="bg-yellow-600/80 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10 flex items-center gap-2">
//                   <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse" />
//                   Reconnecting...
//                 </div>
//               )}
//             </div>

//             <ReactionCounter counts={reactionCounts} />
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

//           <FloatingReactions reactions={floatingReactions} />

//           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 z-20">
//             <button
//               onClick={toggleMic}
//               className={`p-4 rounded-full transition-all shadow-lg border border-white/10 backdrop-blur-md ${
//                 isMicOn
//                   ? "bg-white/20 hover:bg-white/30 text-white"
//                   : "bg-red-500 hover:bg-red-600 text-white"
//               }`}
//               title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
//             >
//               {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
//             </button>

//             {isHost ? (
//               <CustomButton
//                 className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md border border-red-500/50"
//                 onClick={handleStopLive}
//               >
//                 End Stream
//               </CustomButton>
//             ) : (
//               <CustomButton
//                 className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg backdrop-blur-md border border-white/10"
//                 onClick={handleStopLive}
//               >
//                 Leave Stream
//               </CustomButton>
//             )}

//             <button
//               onClick={toggleCamera}
//               className={`p-4 rounded-full transition-all shadow-lg border border-white/10 backdrop-blur-md ${
//                 isCameraOn
//                   ? "bg-white/20 hover:bg-white/30 text-white"
//                   : "bg-red-500 hover:bg-red-600 text-white"
//               }`}
//               title={isCameraOn ? "Turn Off Camera" : "Turn On Camera"}
//             >
//               {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
//             </button>
//           </div>
//         </div>

//         <div className="w-full lg:w-80 bg-white flex flex-col flex-1 lg:flex-none min-h-0">
//           <div className="p-4 border-b">
//             <h3 className="font-semibold text-lg">Live Chat</h3>
//             <p className="text-sm text-gray-500">
//               {chatMessages.length} messages
//             </p>
//           </div>

//           <div
//             ref={chatContainerRef}
//             className="flex-1 overflow-y-auto p-4 space-y-3"
//           >
//             {chatMessages.map((msg) => (
//               <div key={msg.id} className="flex gap-2">
//                 <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xs">
//                   {msg.user?.[0]?.toUpperCase() || "A"}
//                 </div>
//                 <div>
//                   <div className="flex items-baseline gap-2">
//                     <span className="font-semibold text-sm">
//                       {msg.username || msg.user}
//                     </span>
//                     <span className="text-xs text-gray-400">{msg.time}</span>
//                   </div>
//                   <p className="text-sm text-gray-800">{msg.message}</p>
//                 </div>
//               </div>
//             ))}
//             {chatMessages.length === 0 && (
//               <div className="text-center text-gray-400 mt-10">
//                 No messages yet. Say hello! 👋
//               </div>
//             )}
//           </div>

//           <div className="p-4 border-t bg-gray-50">
//             <div className="flex items-center gap-2">
//               <input
//                 type="text"
//                 value={chatMessage}
//                 onChange={(e) => setChatMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
//                 placeholder="Type a message..."
//                 className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 onClick={handleSendMessage}
//                 disabled={!chatMessage.trim()}
//                 className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 transition-colors"
//                 title="Send Message"
//               >
//                 <span className="sr-only">Send</span>
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="20"
//                   height="20"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 >
//                   <line x1="22" y1="2" x2="11" y2="13"></line>
//                   <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
//                 </svg>
//               </button>
//             </div>

//             {/* Dimmed (not hard-disabled — a tap while offline still gives
//                 feedback via the toast in handleReaction) when the socket
//                 is down. */}
//             <div
//               className={`flex justify-between mt-3 px-2 ${
//                 !isConnected ? "opacity-50" : ""
//               }`}
//             >
//               <button
//                 onClick={() => handleReaction("LIKE")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Like"
//               >
//                 👍
//               </button>
//               <button
//                 onClick={() => handleReaction("LOVE")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Love"
//               >
//                 ❤️
//               </button>
//               <button
//                 onClick={() => handleReaction("LOL")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Haha"
//               >
//                 😂
//               </button>
//               <button
//                 onClick={() => handleReaction("DISLIKE")}
//                 className="text-xl hover:scale-125 transition-transform"
//                 title="Dislike"
//               >
//                 👎
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { LiveStreaming };

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
import { MAX_CHANNEL_LENGTH } from "@/utils/helper";
import { useWebSocket } from "@/context/WebSocketContext";
import { useLiveStream } from "@/hooks/useLiveStream";
import { useFetchProfile } from "@/hooks/apiHooks";
import type {
  ChatMessage,
  FloatingReaction,
  // LiveReaction,
  ReactionCount,
  ReactionType,
} from "@/lib/types";
import { ReactionCounter } from "@/components/live/ReactionCounter";
import { FloatingReactions } from "@/components/live/FloatingReactions";
import { showInlineToast } from "@/utils/toastUtils";

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

  // Tracks client-generated ids for comments this tab has sent, so the
  // broadcast echo of our own message can be recognized and dropped without
  // depending on the backend's user-identity field names matching what we
  // expect (see sendComment in useLiveStream — that's what was causing
  // the sender's own message to double up, and to show as "Anonymous"
  // with "Invalid Date" instead of being filtered).
  const sentCommentIdsRef = useRef<Set<string>>(new Set());

  const handleCommentReceived = useCallback(
    (comment: any) => {
      console.log("📨 Received live comment:", comment);

      const echoId = comment.clientMessageId;
      if (echoId && sentCommentIdsRef.current.has(echoId)) {
        sentCommentIdsRef.current.delete(echoId);
        console.log("Ignoring echo of our own comment:", echoId);
        return;
      }

      // The backend identifies the sender by email (`sender`), not a
      // usid/userId — confirmed from a real payload capture. Checking
      // both since we don't know if every backend build will be
      // consistent about it.
      const isMe =
        comment.sender === userObject?.email ||
        comment.userId === userObject?.usid ||
        comment.user === userObject?.usid ||
        comment.username === userObject?.usid;

      if (isMe) {
        return;
      }

      const rawTimestamp =
        comment.timestamp || comment.sentAt || comment.createdAt;
      const parsedDate = rawTimestamp ? new Date(rawTimestamp) : new Date();
      const time = Number.isNaN(parsedDate.getTime())
        ? new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        : parsedDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          });

      const newMessage = {
        id:
          typeof comment.id === "string"
            ? parseInt(comment.id)
            : (comment.id as number),
        user:
          comment.username ||
          comment.user ||
          comment.displayName ||
          comment.senderName ||
          "Anonymous",
        username: comment.username,
        message: comment.message,
        time,
        isComment: true,
      };

      setChatMessages((prev) => [...prev, newMessage]);
    },
    [userObject?.usid],
  );

  const handleReactionReceived = useCallback(
    (reaction: any) => {
      const isMe =
        reaction.sender === userObject?.email ||
        reaction.userId === userObject?.usid ||
        reaction.user === userObject?.usid;

      if (isMe) {
        // Already applied optimistically in handleReaction below when we
        // sent it — skip so it isn't counted twice.
        return;
      }

      const reactionKey = reaction.reactionType as keyof ReactionCount;

      // NOTE: this previously set the count directly from the backend's
      // `count` field, on the assumption it was a shared running total for
      // this reaction type across all users. Comparing an actual
      // creator-originated payload (count: 1, their first reaction) against
      // a viewer-originated one (count: 2) from the same test session shows
      // that assumption doesn't hold — `count` doesn't behave like a global
      // total. Reverting to a plain local increment, which is reliable now
      // that self-filtering above is actually correct (it was broken before
      // due to checking userId/user instead of the real `sender` field —
      // that mismatch, not the increment logic, was the real cause of the
      // original creator/viewer desync).
      setReactionCounts((prev) => ({
        ...prev,
        [reactionKey]: prev[reactionKey] + 1,
      }));

      const floatingReaction: FloatingReaction = {
        id: `${reaction.id}-${Date.now()}`,
        type: reaction.reactionType,
        x: Math.random() * 80 + 10,
        y: 0,
      };

      setFloatingReactions((prev) => [...prev, floatingReaction]);

      setTimeout(() => {
        setFloatingReactions((prev) =>
          prev.filter((r) => r.id !== floatingReaction.id),
        );
      }, 3000);
    },
    [userObject?.usid, userObject?.email],
  );

  const { viewerCount, isStreamEnded, sendComment, sendReaction } =
    useLiveStream({
      sessionId: activeSession || "",
      creatorId: isHost ? userObject?.usid : urlCreatorId,
      role: isHost ? "HOST" : "VIEWER",
      enabled: isStreaming && !!activeSession,
      onCommentReceived: handleCommentReceived,
      onReactionReceived: handleReactionReceived,
    });

  // ✅ Handle reaction clicks — added an isConnected check up front so a tap
  // while the socket is down shows a toast instead of doing nothing. The
  // sendReaction() call itself already returns a real boolean (see
  // useLiveStream), so failures still fall through to the error toast below.
  const handleReaction = (reactionType: ReactionType) => {
    if (!isStreaming || !sendReaction) return;

    if (!isConnected) {
      showInlineToast({
        type: "warning",
        title: "Reconnecting — try that again in a moment",
      });
      return;
    }

    const success = sendReaction(reactionType);
    if (success) {
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
    } else {
      showInlineToast({
        type: "error",
        title: "Reaction didn't send — check your connection",
      });
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

      joinExistingStream(activeSession);
    }
  }, [isHost, activeSession, urlCreatorId]);

  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    // Viewers never publish their own camera/mic — they only watch the
    // host's Agora remote track (see joinExistingStream below). Requesting
    // getUserMedia here for viewers too was turning on their camera/mic
    // for no reason just from opening a live stream page.
    if (!isHost) return;

    navigator.mediaDevices
      .getUserMedia({
        video: { facingMode: "user", aspectRatio: 16 / 9 },
        audio: true,
      })
      .then((stream) => {
        localStreamRef.current = stream;
        setLocalStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((_err) => {
        showInlineToast({
          type: "error",
          title: "Please allow camera and microphone access",
        });
      });

    return () => {
      stopHeartbeat();
      // Using the ref here, not the `localStream` state variable. This
      // effect has an empty-ish dependency array ([isHost], which doesn't
      // change during the component's life), so a cleanup that referenced
      // `localStream` directly would close over whatever it was AT MOUNT
      // TIME — null, since getUserMedia hadn't resolved yet — and this
      // check would silently never run, meaning the camera track was never
      // actually released on unmount. That's almost certainly why the
      // browser's camera-in-use indicator kept showing after leaving the
      // page. The ref always reflects the current stream.
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      if (agoraClientRef.current) {
        agoraClientRef.current.leave();
      }
    };
  }, [isHost]);

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

    updateDuration();
    const interval = setInterval(updateDuration, 1000);

    return () => clearInterval(interval);
  }, [isStreaming, streamStartTime]);

  // Add this useEffect to handle stream end for viewers
  useEffect(() => {
    if (isHost) return;

    if (isStreamEnded) {
      showInlineToast({
        type: "info",
        title: "The stream has ended",
      });
      setTimeout(() => {
        handleStopLive();
      }, 2000);
      return;
    }

    if (isConnected && isStreaming && urlCreatorId) {
      // Reserved for a future backup check against the live creators list
      // if we ever need it — see original notes.
    }
  }, [
    isStreamEnded,
    isHost,
    isConnected,
    isStreaming,
    urlCreatorId,
    getLiveSession,
  ]);

  useEffect(() => {
    if (!isHost) return;
    if (!isStreaming) return;
    if (!isConnected) return;

    startHeartbeat();
  }, [isConnected, isStreaming, isHost]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [chatMessages]);

  const handleStartLive = async () => {
    // ✅ Main fix: block going live if the websocket isn't connected. Before
    // this, only APP_ID/channelName were checked — a dead STOMP connection
    // meant /app/live/go silently never reached the backend, so the host
    // would see their own preview go live locally while the backend (and
    // therefore every viewer) never found out.
    if (!isConnected) {
      showInlineToast({
        type: "error",
        title: "Not connected to the server yet — please wait and try again",
      });
      return;
    }

    try {
      if (!APP_ID) {
        showInlineToast({ type: "error", title: "App ID is missing" });
        return;
      }

      if (!channelName?.trim()) {
        showInlineToast({ type: "error", title: "Channel name is required" });
        return;
      }

      const res = await fetchToken();
      const token = res?.data?.token;

      if (!token) {
        showInlineToast({
          type: "error",
          title: "Failed to obtain streaming token",
        });
        return;
      }

      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
        localStreamRef.current = null;
      }

      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      agoraClientRef.current = client;

      await client.setClientRole("host");
      await client.join(APP_ID, channelName, token, userObject?.usid);

      const [audioTrack, videoTrack] =
        await AgoraRTC.createMicrophoneAndCameraTracks();
      localAudioTrackRef.current = audioTrack;
      localVideoTrackRef.current = videoTrack;

      if (videoRef.current) {
        videoTrack.play(videoRef.current);
      }

      await client.publish([audioTrack, videoTrack]);

      client.on("user-joined", (_user) => {});
      client.on("user-left", (_user) => {});

      setIsStreaming(true);
      setStreamStartTime(Date.now());

      await new Promise((resolve) => setTimeout(resolve, 100));

      // Re-check right before sending — the Agora token fetch + track setup
      // above takes real time, and the socket could have dropped mid-setup.
      if (!isConnected) {
        showInlineToast({
          type: "error",
          title: "Lost connection while starting — please retry",
        });
        return;
      }

      console.log("📡 Sending GO LIVE message");

      sendMessage("/app/live/go", {
        creatorId: profileData?.data?.username,
        session: channelName,
      });
      console.log(
        "📡 Sent GO LIVE message",
        profileData?.data?.username,
        channelName,
      );
    } catch (error) {
      showInlineToast({
        type: "error",
        title: "Failed to start live stream.Check console for details.",
      });
    }
  };

  const joinExistingStream = async (channel: string) => {
    try {
      if (!APP_ID) {
        showInlineToast({
          type: "error",
          title: "App ID is missing",
        });
        return;
      }

      if (!channel) {
        showInlineToast({
          type: "error",
          title: "Channel name is missing",
        });
        return;
      }

      const res = await fetchToken();
      const token = res?.data?.token;

      if (!token) {
        showInlineToast({
          type: "error",
          title: "Failed to obtain streaming token",
        });
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

      showInlineToast({
        type: "success",
        title: "Successfully joined live stream",
      });
    } catch (error) {
      console.error("Error joining stream:", error);
      showInlineToast({
        type: "error",
        title: "Failed to join live stream",
      });
    }
  };

  const handleStopLive = async () => {
    // Previously every teardown step below shared one try/catch — if any
    // single call threw (a track already closed, leave() rejecting, etc.)
    // execution jumped straight to the catch block and skipped
    // setIsStreaming(false) and the video element cleanup entirely. That's
    // almost certainly why the stream appeared to stay "live" visually
    // until a manual refresh. Each risky step now has its own try/catch so
    // one failure can't block the rest, and the critical state resets
    // always run regardless.
    stopHeartbeat();

    if (isHost && channelName) {
      try {
        sendMessage("/app/live/end", {
          session: channelName,
          creatorId: userObject?.usid,
        });
      } catch (error) {
        console.error("Error sending end signal", error);
      }
    }

    if (userObject?.usid && isHost) {
      removeCreatorFromLive(userObject?.usid);
    }

    setTimeout(() => {
      refetchLiveHosts();
    }, 500);

    try {
      localAudioTrackRef.current?.close();
    } catch (error) {
      console.error("Error closing audio track", error);
    }
    try {
      localVideoTrackRef.current?.close();
    } catch (error) {
      console.error("Error closing video track", error);
    }
    localAudioTrackRef.current = null;
    localVideoTrackRef.current = null;

    try {
      await agoraClientRef.current?.leave();
    } catch (error) {
      console.error("Error leaving Agora channel", error);
    }
    agoraClientRef.current = null;

    // Explicitly clear the video element so a stale frame can't linger
    // even if track/client teardown above silently failed.
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    setIsStreaming(false);
    setChatMessages([]);

    if (!isHost) {
      navigate(-1);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", aspectRatio: 16 / 9 },
        audio: true,
      });
      localStreamRef.current = stream;
      setLocalStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error restarting camera preview", error);
    }

    showInlineToast({
      type: "success",
      title: "Stream ended",
    });
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

    if (isStreaming && sendComment) {
      const clientMessageId = sendComment(message);

      if (clientMessageId) {
        // Remember this id so the broadcast echo of this exact message
        // gets recognized and skipped in handleCommentReceived instead of
        // being added a second time.
        sentCommentIdsRef.current.add(clientMessageId);

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
        showInlineToast({
          type: "error",
          title: "Failed to send message",
        });
      }
    } else {
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
    // Stop via the ref too (not just state) so this reliably releases the
    // camera even in edge cases where state hasn't caught up yet.
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    localStreamRef.current = null;
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
      <div className="min-h-screen bg-brown_200 flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
          <div className="w-full max-w-3xl">
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

            <div className="relative bg-black/40 backdrop-blur rounded-2xl overflow-hidden aspect-video shadow-2xl border border-white/10">
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
              />

              {!isCameraOn && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                  <div className="bg-white/10 backdrop-blur-md p-8 rounded-full">
                    <VideoOff className="w-16 h-16 text-white/60" />
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-center gap-4 mt-6">
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

              {/* Disabled (and relabeled) while the socket is down, mirroring
                  the guard inside handleStartLive, so the button visibly
                  communicates "not ready" instead of looking clickable and
                  then silently doing nothing useful. */}
              <CustomButton
                className="text-xs w-fit px-6"
                onClick={handleStartLive}
                disabled={!channelName.trim() || isLoadingToken || !isConnected}
                title={!isConnected ? "Waiting for connection..." : undefined}
              >
                {isConnected ? "Start Live Video" : "Connecting..."}
              </CustomButton>

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

        <div className="w-full lg:w-96 bg-brown_200 p-6 border-t lg:border-t-0 lg:border-l border-white/10">
          <div className="mb-6">
            <input
              type="text"
              value={channelName}
              onChange={(e) => {
                const value = e.target.value
                  .toLowerCase()
                  .replace(/[^a-z0-9_]/g, "_");

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
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">
        <div className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 aspect-video lg:aspect-auto lg:flex-1">
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <div className="flex items-center gap-3">
              <div className="bg-red-600 px-3 py-1 rounded text-white text-sm font-bold flex items-center gap-2">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                LIVE
              </div>

              {isStreaming && (
                <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  {viewerCount} {viewerCount === 1 ? "Viewer" : "Viewers"}
                </div>
              )}

              {isStreaming && (
                <div className="bg-black/30 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10">
                  {new Date(_streamDuration * 1000).toISOString().substr(11, 8)}
                </div>
              )}

              {/* Surfaces a dropped connection during an active stream, since
                  reactions/comments/heartbeats all silently stop working
                  otherwise with no visible indicator. */}
              {isStreaming && !isConnected && (
                <div className="bg-yellow-600/80 backdrop-blur-md px-3 py-1 rounded text-white text-sm font-medium border border-white/10 flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse" />
                  Reconnecting...
                </div>
              )}
            </div>

            <ReactionCounter counts={reactionCounts} />
          </div>

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

          <FloatingReactions reactions={floatingReactions} />

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

        <div className="w-full lg:w-80 bg-white flex flex-col flex-1 lg:flex-none min-h-0">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-lg">Live Chat</h3>
            <p className="text-sm text-gray-500">
              {chatMessages.length} messages
            </p>
          </div>

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

            {/* Dimmed (not hard-disabled — a tap while offline still gives
                feedback via the toast in handleReaction) when the socket
                is down. */}
            <div
              className={`flex justify-between mt-3 px-2 ${
                !isConnected ? "opacity-50" : ""
              }`}
            >
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
