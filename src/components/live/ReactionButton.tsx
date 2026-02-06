import { useState } from "react";
import type { ReactionType } from "@/lib/types";

interface ReactionButtonProps {
  onReaction: (type: ReactionType) => void;
  disabled?: boolean;
}

// Reaction emoji mapping
const REACTION_EMOJIS: Record<ReactionType, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  DISLIKE: "👎",
  LOL: "😂",
};

export const ReactionButton = ({
  onReaction,
  disabled,
}: ReactionButtonProps) => {
  const [showReactions, setShowReactions] = useState(false);
  const [lastReaction, setLastReaction] = useState<ReactionType | null>(null);

  const handleReaction = (type: ReactionType) => {
    onReaction(type);
    setLastReaction(type);
    setShowReactions(false);

    // Clear last reaction after animation
    setTimeout(() => setLastReaction(null), 1000);
  };

  return (
    <div className="relative">
      {/* Main Reaction Button */}
      <button
        onClick={() => setShowReactions(!showReactions)}
        disabled={disabled}
        className={`p-3 rounded-full transition-all ${
          lastReaction
            ? "bg-pink-600 scale-110"
            : "bg-gray-700 hover:bg-gray-600"
        } text-white disabled:bg-gray-500 disabled:cursor-not-allowed`}
      >
        <span className="text-xl">
          {lastReaction ? REACTION_EMOJIS[lastReaction] : "❤️"}
        </span>
      </button>

      {/* Reaction Picker Popup */}
      {showReactions && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowReactions(false)}
          />

          {/* Reactions Panel */}
          <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-gray-900 rounded-full p-2 flex gap-2 shadow-lg z-50 animate-bounce-in">
            {(Object.keys(REACTION_EMOJIS) as ReactionType[]).map((type) => (
              <button
                key={type}
                onClick={() => handleReaction(type)}
                className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-700 transition-all hover:scale-125 text-2xl"
                title={type}
              >
                {REACTION_EMOJIS[type]}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
