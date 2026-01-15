/* eslint-disable @typescript-eslint/no-explicit-any */
import { useWebSocket } from "@/context/WebSocketContext";
import { useNavigate } from "react-router-dom";

const CreatorLiveCard = () => {
  const {
    liveCreators,
    //  getLiveSession
  } = useWebSocket();
  const navigate = useNavigate();

  console.log("These are the creators that are live", liveCreators);
  return (
    // <div className="feed">
    //   {/* {creators.map((creator) => (
    //     <div key={creator.id} className="creator-item">
    //       <img src={creator.avatar} />

    //       {isCreatorLive(creator.id) && (
    //         <span className="bg-red-600 text-white px-2 py-1 rounded">
    //           🔴 LIVE
    //         </span>
    //       )}

    //       <p>{creator.name}</p>

    //       {isCreatorLive(creator.id) && (
    //         <button
    //           onClick={() => {
    //             const session = getLiveSession(creator.id);
    //             navigate(`/live/${creator.id}/${session?.sessionId}`);
    //           }}
    //         >
    //           Watch Live
    //         </button>
    //       )}
    //     </div>
    //   ))} */}

    // </div>

    <div className="flex flex-wrap items-start gap-10 py-4">
      {Array.from(liveCreators.entries()).map(([creatorId, liveData]) => {
        // Dummy fields for now (replace when backend sends real data)
        const displayName = (liveData as any)?.creatorName || "Regina Johnson";
        const profileImageUrl = (liveData as any)?.creatorAvatarUrl || "";
        const sessionId = (liveData as any)?.sessionId; // may be undefined for now

        const initial = (displayName?.trim()?.[0] || "U").toUpperCase();

        const handleWatchLive = () => {
          // If you later require sessionId, handle it here
          // For now, navigate using creatorId (or your preferred route)
          navigate(`/live/${creatorId}${sessionId ? `/${sessionId}` : ""}`);
        };

        return (
          <div
            key={creatorId}
            className="creator-item flex flex-col items-center"
          >
            {/* Clickable Avatar + LIVE badge */}
            <button
              type="button"
              onClick={handleWatchLive}
              className="relative w-[72px] h-[72px] cursor-pointer"
              aria-label={`Watch ${displayName} live`}
            >
              {/* Red ring */}
              <div className="absolute inset-0 rounded-full border-[3px] border-red-500" />

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

              {/* LIVE pill (pulsing) */}
              <div className="absolute left-1/2 -translate-x-1/2 bottom-[-12px] bg-[#3B82F6] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow animate-pulse">
                LIVE
              </div>
            </button>

            {/* Name */}
            <p className="mt-5 max-w-[90px] text-center text-lg font-semibold text-black truncate">
              {displayName}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export { CreatorLiveCard };
