import { formatDistanceToNowStrict } from "date-fns";

export const formatTimeAgo = (date?: string): string => {
  if (!date) return "";
  return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
    .replace("seconds", "s")
    .replace("second", "s")
    .replace("minutes", "m")
    .replace("minute", "m")
    .replace("hours", "h")
    .replace("hour", "h")
    .replace("days", "d")
    .replace("day", "d")
    .replace("months", "mo")
    .replace("month", "mo")
    .replace("years", "y")
    .replace("year", "y");
};
