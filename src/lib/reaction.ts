/* eslint-disable @typescript-eslint/no-explicit-any */
import Dislike from "@/assets/icons/dislike";
import Like from "@/assets/icons/like";
import Lol from "@/assets/icons/lol";
import Love from "@/assets/icons/love";
import type { Reaction, ReactionItem, ReactionType } from "@/lib/types";
import type { ComponentType } from "react";

const REACTION_CONFIG: Record<ReactionType, ComponentType<any>> = {
  LIKE: Like,
  DISLIKE: Dislike,
  LOL: Lol,
  LOVE: Love,
};

export const transformReactions = (
  reactions: Reaction[] = []
): ReactionItem[] => {
  // Count reactions by type
  const counts = reactions.reduce((acc, { type }) => {
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<ReactionType, number>);

  // Return all reaction types with their counts
  return (Object.keys(REACTION_CONFIG) as ReactionType[]).map((type) => ({
    type,
    icon: REACTION_CONFIG[type],
    number: counts[type] || 0,
  }));
};
