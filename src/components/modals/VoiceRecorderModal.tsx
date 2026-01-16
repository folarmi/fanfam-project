import { useVoiceRecorder } from "@/hooks/useVoiceRecorder";
import Typography from "../forms/Typography";
import CustomButton from "../forms/CustomButton";

interface VoiceRecorderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordingComplete: (audioBlob: Blob) => void;
}

const VoiceRecorderModal = ({
  isOpen,
  onClose,
  onRecordingComplete,
}: VoiceRecorderModalProps) => {
  const {
    isRecording,
    isPaused,
    recordingTime,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    cancelRecording,
  } = useVoiceRecorder({
    onRecordingComplete: (blob) => {
      onRecordingComplete(blob);
      onClose();
    },
    maxDuration: 300, // 5 minutes
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  const handleClose = () => {
    if (isRecording) {
      cancelRecording();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="titleOne" className="text-gray-900">
            Voice Recording
          </Typography>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="flex flex-col items-center py-8">
          {/* Recording Animation */}
          <div className="relative mb-6">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center ${
                isRecording && !isPaused
                  ? "bg-red-500 animate-pulse"
                  : "bg-gray-300"
              }`}
            >
              <svg
                className="w-12 h-12 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {isRecording && !isPaused && (
              <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-ping" />
            )}
          </div>

          {/* Timer */}
          <Typography variant="titleOne" className="text-3xl font-mono mb-2">
            {formatTime(recordingTime)}
          </Typography>

          {/* Status */}
          <Typography variant="p2" className="text-gray-600 mb-8">
            {!isRecording
              ? "Ready to record"
              : isPaused
              ? "Paused"
              : "Recording..."}
          </Typography>

          {/* Controls */}
          <div className="flex gap-4 w-full">
            {!isRecording ? (
              <>
                <CustomButton
                  variant="secondary"
                  onClick={handleClose}
                  className="flex-1"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  variant="primary"
                  onClick={startRecording}
                  className="flex-1"
                >
                  Start Recording
                </CustomButton>
              </>
            ) : (
              <>
                <CustomButton
                  variant="secondary"
                  onClick={cancelRecording}
                  className="flex-1"
                >
                  Cancel
                </CustomButton>
                <CustomButton
                  variant={isPaused ? "primary" : "secondary"}
                  onClick={isPaused ? resumeRecording : pauseRecording}
                  className="flex-1"
                >
                  {isPaused ? "Resume" : "Pause"}
                </CustomButton>
                <CustomButton
                  variant="primary"
                  onClick={stopRecording}
                  className="flex-1"
                >
                  Done
                </CustomButton>
              </>
            )}
          </div>

          {/* Max duration info */}
          <Typography variant="p3" className="text-gray-500 mt-4 text-center">
            Maximum recording duration: 5 minutes
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorderModal;
