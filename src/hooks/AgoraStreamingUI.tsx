import { useState, useEffect, useRef } from "react";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Users,
  Settings,
  PhoneOff,
  Monitor,
  MonitorOff,
} from "lucide-react";

export default function AgoraStreamingUI() {
  const [isJoined, setIsJoined] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [channelName, setChannelName] = useState("");
  const [appId, setAppId] = useState("");
  const [token, setToken] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [localStream, setLocalStream] = useState(null);

  const localVideoRef = useRef(null);

  // Simulate getting local video stream
  useEffect(() => {
    if (isJoined && isCameraOn && localVideoRef.current && !localStream) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: isMicOn })
        .then((stream) => {
          setLocalStream(stream);
          if (localVideoRef.current) {
            localVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    }

    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isJoined, isCameraOn]);

  const handleJoinChannel = () => {
    if (!channelName || !appId) {
      alert("Please enter Channel Name and App ID");
      return;
    }
    setIsJoined(true);
    // Simulate adding participants
    setTimeout(() => {
      setParticipants([
        { id: "1", name: "User 1", isVideoOn: true, isMicOn: true },
        { id: "2", name: "User 2", isVideoOn: true, isMicOn: false },
      ]);
    }, 1000);
  };

  const handleLeaveChannel = () => {
    if (localStream) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setIsJoined(false);
    setParticipants([]);
  };

  const toggleCamera = () => {
    if (localStream) {
      const videoTrack = localStream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isCameraOn;
      }
    }
    setIsCameraOn(!isCameraOn);
  };

  const toggleMic = () => {
    if (localStream) {
      const audioTrack = localStream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isMicOn;
      }
    }
    setIsMicOn(!isMicOn);
  };

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing);
    // In production, implement actual screen sharing logic
  };

  if (!isJoined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full border border-white/20 shadow-2xl">
          <h1 className="text-3xl font-bold text-white mb-6 text-center">
            Agora Stream
          </h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                App ID
              </label>
              <input
                type="text"
                value={appId}
                onChange={(e) => setAppId(e.target.value)}
                placeholder="Enter your Agora App ID"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Channel Name
              </label>
              <input
                type="text"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                placeholder="Enter channel name"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/90 mb-2">
                Token (Optional)
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                placeholder="Enter token if required"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <button
              onClick={handleJoinChannel}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
            >
              Join Channel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-white font-semibold">
            Channel: {channelName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition"
          >
            <Settings size={20} />
          </button>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-700">
            <Users size={18} className="text-white" />
            <span className="text-white font-medium">
              {participants.length + 1}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-auto">
        {/* Local Video */}
        <div className="relative bg-gray-800 rounded-xl overflow-hidden aspect-video shadow-lg border border-gray-700">
          {isCameraOn ? (
            <video
              ref={localVideoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
              <VideoOff size={48} className="text-gray-600" />
            </div>
          )}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full">
            <span className="text-white text-sm font-medium">You</span>
          </div>
          {!isMicOn && (
            <div className="absolute top-4 right-4 p-2 bg-red-500 rounded-full">
              <MicOff size={16} className="text-white" />
            </div>
          )}
        </div>

        {/* Remote Participants */}
        {participants.map((participant) => (
          <div
            key={participant.id}
            className="relative bg-gray-800 rounded-xl overflow-hidden aspect-video shadow-lg border border-gray-700"
          >
            {participant.isVideoOn ? (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
                <Users size={64} className="text-white/30" />
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <VideoOff size={48} className="text-gray-600" />
              </div>
            )}
            <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/60 backdrop-blur rounded-full">
              <span className="text-white text-sm font-medium">
                {participant.name}
              </span>
            </div>
            {!participant.isMicOn && (
              <div className="absolute top-4 right-4 p-2 bg-red-500 rounded-full">
                <MicOff size={16} className="text-white" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Control Bar */}
      <div className="bg-gray-800 border-t border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={toggleMic}
            className={`p-4 rounded-full transition-all shadow-lg ${
              isMicOn
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isMicOn ? <Mic size={24} /> : <MicOff size={24} />}
          </button>

          <button
            onClick={toggleCamera}
            className={`p-4 rounded-full transition-all shadow-lg ${
              isCameraOn
                ? "bg-gray-700 hover:bg-gray-600 text-white"
                : "bg-red-600 hover:bg-red-700 text-white"
            }`}
          >
            {isCameraOn ? <Video size={24} /> : <VideoOff size={24} />}
          </button>

          <button
            onClick={toggleScreenShare}
            className={`p-4 rounded-full transition-all shadow-lg ${
              isScreenSharing
                ? "bg-blue-600 hover:bg-blue-700 text-white"
                : "bg-gray-700 hover:bg-gray-600 text-white"
            }`}
          >
            {isScreenSharing ? <Monitor size={24} /> : <MonitorOff size={24} />}
          </button>

          <button
            onClick={handleLeaveChannel}
            className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all shadow-lg"
          >
            <PhoneOff size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
