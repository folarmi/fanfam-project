import type { Reaction } from "./types";

export type ReactionType = "LIKE" | "DISLIKE" | "LOVE" | "LOL";

export interface ReactionSummary {
  type: ReactionType;
  number: number;
  createdBy: string[]; // list of emails who reacted with this type
}

export const transformReactions = (
  reactions: Reaction[] = [],
): ReactionSummary[] => {
  const grouped = reactions.reduce(
    (acc, { type, createdBy }) => {
      const normalized = type?.toUpperCase() as ReactionType;
      if (!acc[normalized]) acc[normalized] = { count: 0, users: [] };
      acc[normalized].count += 1;
      acc[normalized].users.push(createdBy);
      return acc;
    },
    {} as Record<ReactionType, { count: number; users: string[] }>,
  );

  // Return all 4 types so counts are always present (0 if none)
  return (["LIKE", "DISLIKE", "LOVE", "LOL"] as ReactionType[]).map((type) => ({
    type,
    number: grouped[type]?.count || 0,
    createdBy: grouped[type]?.users || [],
  }));
};
