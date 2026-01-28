/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWebSocket } from "@/context/WebSocketContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreatorLiveCard = () => {
  const { liveCreators, isConnected } = useWebSocket();
  const navigate = useNavigate();

  // If no live creators, show empty state
  if (liveCreators.size === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-gray-500">No live streams at the moment</p>
      </div>
    );
  }
  // console.log("card", liveCreators);
  return (
    <div className="flex flex-wrap items-start gap-10 py-4">
      {Array.from(liveCreators.entries()).map(([creatorId, liveData]) => {
        // Extract data from the live creator object
        const sessionId = liveData?.sessionId || (liveData as any)?.session;
        const displayName =
          (liveData as any)?.firstname && (liveData as any)?.lastname
            ? `${(liveData as any).firstname} ${(liveData as any).lastname}`.trim()
            : (liveData as any)?.creatorName || creatorId;

        const profileImageUrl =
          (liveData as any)?.profileImage || (liveData as any)?.avatarUrl || "";

        const initial = (displayName?.trim()?.[0] || "U").toUpperCase();

        const handleWatchLive = () => {
          if (!sessionId) {
            console.error("No session ID available for creator:", creatorId);
            toast.error("Unable to join stream - missing session ID");
            return;
          }

          if (!isConnected) {
            toast.error("Not connected to server. Please wait...");
            return;
          }

          // Simply navigate - useLiveStream will handle the join message
          const encodedCreatorId = encodeURIComponent(creatorId);
          navigate(`/dashboard/livestreaming/${encodedCreatorId}/${sessionId}`);
        };

        return (
          <div
            key={creatorId}
            className="creator-item flex flex-col items-center cursor-pointer"
          >
            {/* Clickable Avatar + LIVE badge */}
            <button
              type="button"
              onClick={handleWatchLive}
              disabled={!sessionId || !isConnected}
              className="relative w-[72px] h-[72px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Watch ${displayName} live`}
            >
              {/* Red ring with pulse animation */}
              <div className="absolute inset-0 rounded-full border-[3px] border-red-500 animate-pulse" />

              {/* Inner ring for extra effect */}
              <div className="absolute inset-[1px] rounded-full border-[2px] border-red-400/50" />

              {/* Avatar image / fallback */}
              <div className="absolute inset-[3px] rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                {profileImageUrl ? (
                  <img
                    src={profileImageUrl}
                    alt={displayName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-700">
                    {initial}
                  </span>
                )}
              </div>

              {/* LIVE badge */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-12px] bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                LIVE
              </div>
            </button>

            {/* Name */}
            <p className="mt-5 max-w-[90px] text-center text-sm font-semibold text-black truncate">
              {displayName}
            </p>

            {/* Optional: Show viewer count if available */}
            {(liveData as any)?.viewerCount !== undefined && (
              <p className="text-xs text-gray-500 mt-1">
                {(liveData as any).viewerCount} watching
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export { CreatorLiveCard };
