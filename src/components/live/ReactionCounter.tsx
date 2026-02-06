import type { ReactionCount, ReactionType } from "@/lib/types";
import { REACTION_EMOJIS } from "@/utils/helperTwo";

interface ReactionCounterProps {
  counts: ReactionCount;
  className?: string;
}

export const ReactionCounter = ({
  counts,
  className = "",
}: ReactionCounterProps) => {
  // Only show reactions with count > 0
  const activeReactions = (Object.keys(counts) as ReactionType[]).filter(
    (type) => counts[type] > 0,
  );

  if (activeReactions.length === 0) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {activeReactions.map((type) => (
        <div
          key={type}
          className="flex items-center gap-1 bg-gray-900/80 backdrop-blur px-2 py-1 rounded-full text-white text-sm"
        >
          <span className="text-lg">{REACTION_EMOJIS[type]}</span>
          <span className="font-semibold">{counts[type]}</span>
        </div>
      ))}
    </div>
  );
};
