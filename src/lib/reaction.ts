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
): (ReactionItem & { createdBy: string[] })[] => {
  // ✅ Count reactions by type and collect createdBy emails
  const grouped = reactions.reduce((acc, { type, createdBy }) => {
    const normalized = type?.toUpperCase() as ReactionType;
    if (!acc[normalized]) acc[normalized] = { count: 0, users: [] };
    acc[normalized].count += 1;
    acc[normalized].users.push(createdBy);
    return acc;
  }, {} as Record<ReactionType, { count: number; users: string[] }>);

  // ✅ Return all reaction types with their counts + createdBy users
  return (Object.keys(REACTION_CONFIG) as ReactionType[]).map((type) => ({
    type,
    icon: REACTION_CONFIG[type],
    number: grouped[type]?.count || 0,
    createdBy: grouped[type]?.users || [],
  }));
};
