import { useEffect, useState } from "react";
import type { FloatingReaction } from "@/lib/types";
import { REACTION_EMOJIS } from "@/utils/helperTwo";

interface FloatingReactionsProps {
  reactions: FloatingReaction[];
}

export const FloatingReactions = ({ reactions }: FloatingReactionsProps) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {reactions.map((reaction) => (
        <FloatingReactionItem key={reaction.id} reaction={reaction} />
      ))}
    </div>
  );
};

const FloatingReactionItem = ({ reaction }: { reaction: FloatingReaction }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className="absolute text-4xl transition-all duration-[3000ms] ease-out"
      style={{
        left: `${reaction.x}%`,
        bottom: mounted ? "100%" : "10%",
        opacity: mounted ? 0 : 1,
        transform: mounted
          ? `translateY(-50px) scale(1.5)`
          : "translateY(0) scale(1)",
      }}
    >
      {REACTION_EMOJIS[reaction.type]}
    </div>
  );
};
