import { useWebSocket } from "@/context/WebSocketContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Creator {
  id: string;
  avatar: string;
  name: string;
}

const CreatorLiveCard = () => {
  const [creators] = useState<Creator[]>([]);
  const { isCreatorLive, getLiveSession } = useWebSocket();
  const navigate = useNavigate();

  return (
    <div className="feed">
      {creators.map((creator) => (
        <div key={creator.id} className="creator-item">
          <img src={creator.avatar} />

          {/* Show LIVE badge if creator is streaming */}
          {isCreatorLive(creator.id) && (
            <span className="bg-red-600 text-white px-2 py-1 rounded">
              🔴 LIVE
            </span>
          )}

          <p>{creator.name}</p>

          {/* Show "Watch Live" button if they're live */}
          {isCreatorLive(creator.id) && (
            <button
              onClick={() => {
                const session = getLiveSession(creator.id);
                navigate(`/live/${creator.id}/${session?.sessionId}`);
              }}
            >
              Watch Live
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export { CreatorLiveCard };
