/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  MediaType,
  PromotionCampaignQualifier,
  PromotionCampaignType,
} from "@/lib/types";
// import { formatDistanceToNowStrict } from "date-fns";

// export const formatTimeAgo = (date?: string): string => {
//   if (!date) return "";
//   return formatDistanceToNowStrict(new Date(date), { addSuffix: true })
//     .replace("seconds", "s")
//     .replace("second", "s")
//     .replace("minutes", "m")
//     .replace("minute", "m")
//     .replace("hours", "h")
//     .replace("hour", "h")
//     .replace("days", "d")
//     .replace("day", "d")
//     .replace("months", "mo")
//     .replace("month", "mo")
//     .replace("years", "y")
//     .replace("year", "y");
// };

export const formatTimeAgo = (dateString: string) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return `${seconds}s ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
};

export const getFileName = (url: string): string => {
  try {
    const urlPath = new URL(url).pathname;
    const fileName = urlPath.split("/").pop() || "Document";
    // Decode URI and limit length
    return (
      decodeURIComponent(fileName).slice(0, 30) +
      (fileName.length > 30 ? "..." : "")
    );
  } catch {
    return "Document";
  }
};

export const getFileIcon = (url: string) => {
  const ext = url.split(".").pop()?.toLowerCase();

  const iconClass = "w-12 h-12 mb-2";

  if (ext === "pdf") {
    return <span className={`${iconClass} text-red-600`}>📄</span>;
  } else if (["doc", "docx"].includes(ext || "")) {
    return <span className={`${iconClass} text-blue-600`}>📘</span>;
  } else if (["xls", "xlsx"].includes(ext || "")) {
    return <span className={`${iconClass} text-green-600`}>📊</span>;
  } else if (["zip", "rar"].includes(ext || "")) {
    return <span className={`${iconClass} text-yellow-600`}>📦</span>;
  }

  return (
    <svg
      className={`${iconClass} text-gray-600`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
      />
    </svg>
  );
};

// Determine media type based on files
export const getMediaType = (files: File[]): MediaType => {
  if (files.length === 0) return "PHOTO";

  const firstFile = files[0];
  const fileType = firstFile.type;

  if (fileType.startsWith("image/")) return "PHOTO";
  if (fileType.startsWith("video/")) return "VIDEO";
  if (fileType.startsWith("audio/")) return "AUDIO";
  return "DOCUMENT";
};

export const parseFormattedNumber = (value?: string | number): number => {
  if (value === null || value === undefined) return 0;

  const str = String(value); // ensure it's always a string

  return Number(str.replace(/,/g, ""));
};

export const mapQualifier = (
  value: string | PromotionCampaignQualifier
): string | PromotionCampaignQualifier | undefined => {
  const nameToType: Record<string, PromotionCampaignQualifier> = {
    "Both new and expired": "BOTH",
    "New subscribers only": "NEW_SUBSCRIBERS",
    "Expired subscribers only": "EXPIRED_SUBSCRIBERS",
  };

  const typeToName: Record<PromotionCampaignQualifier, string> = {
    BOTH: "Both new and expired",
    NEW_SUBSCRIBERS: "New subscribers only",
    EXPIRED_SUBSCRIBERS: "Expired subscribers only",
  };

  // If value is a UI label → return backend type
  if (value in nameToType) {
    return nameToType[value];
  }

  // If value is a backend enum → return UI label
  if (value in typeToName) {
    return typeToName[value as PromotionCampaignQualifier];
  }

  return undefined;
};

export const mapPromotionType = (
  value: string | PromotionCampaignType
): string | PromotionCampaignType | undefined => {
  const nameToType: Record<string, PromotionCampaignType> = {
    "Free trial": "FREE_TRIAL",
    "First month discount": "FIRST_MONTH_DISCOUNT",
  };

  const typeToName: Record<PromotionCampaignType, string> = {
    FREE_TRIAL: "Free trial",
    FIRST_MONTH_DISCOUNT: "First month discount",
  };

  if (value in nameToType) return nameToType[value];
  if (value in typeToName) return typeToName[value as PromotionCampaignType];

  return undefined;
};

export function isActivelySubscribed(
  subscriptions: any[],
  creatorUsid: string | undefined
): { isActive: boolean; subscription: any } {
  // Find the subscription for this creator
  const subscription = subscriptions?.find(
    (sub) => sub?.creator?.usid === creatorUsid
  );

  // If no subscription found, return false
  if (!subscription) {
    return { isActive: false, subscription: null };
  }

  // Check if subscription is still active (end date is in the future)
  const isActive = new Date(subscription?.endDate) > new Date();

  return {
    isActive,
    subscription,
  };
}
