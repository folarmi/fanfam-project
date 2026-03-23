/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ApiComment,
  MediaType,
  PromotionCampaignQualifier,
  PromotionCampaignType,
  ReactionType,
} from "@/lib/types";
// import { formatDistanceToNowStrict } from "date-fns";

export const formatTimeAgo = (dateString: string) => {
  // If the date string doesn't have timezone info, assume UTC
  const dateWithTimezone =
    dateString?.endsWith("Z") ||
    dateString?.includes("+") ||
    (dateString?.includes("T") && dateString?.split("T")[1]?.includes("-"))
      ? dateString
      : `${dateString}Z`;

  const date = new Date(dateWithTimezone);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  // Handle future dates
  if (seconds < 0) return "just now";

  // Just now for very recent
  if (seconds < 10) return "just now";
  if (seconds < 60) return `${seconds}s ago`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;

  const years = Math.floor(days / 365);
  return `${years}y ago`;
};

// export const getFileName = (url: string): string => {
//   try {
//     const urlPath = new URL(url).pathname;
//     const fileName = urlPath.split("/").pop() || "Document";
//     // Decode URI and limit length
//     return (
//       decodeURIComponent(fileName).slice(0, 30) +
//       (fileName.length > 30 ? "..." : "")
//     );
//   } catch {
//     return "Document";
//   }
// };

// export const getFileIcon = (url: string) => {
//   const ext = url.split(".").pop()?.toLowerCase();

//   const iconClass = "w-12 h-12 mb-2";

//   if (ext === "pdf") {
//     return <span className={`${iconClass} text-red-600`}>📄</span>;
//   } else if (["doc", "docx"].includes(ext || "")) {
//     return <span className={`${iconClass} text-blue-600`}>📘</span>;
//   } else if (["xls", "xlsx"].includes(ext || "")) {
//     return <span className={`${iconClass} text-green-600`}>📊</span>;
//   } else if (["zip", "rar"].includes(ext || "")) {
//     return <span className={`${iconClass} text-yellow-600`}>📦</span>;
//   }

//   return (
//     <svg
//       className={`${iconClass} text-gray-600`}
//       fill="none"
//       stroke="currentColor"
//       viewBox="0 0 24 24"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth={2}
//         d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
//       />
//     </svg>
//   );
// };

// Determine media type based on files

export const getFileName = (url: string) =>
  decodeURIComponent(url?.split("/").pop()?.split("?")[0] || "File");

export const getFileIcon = (url: string) => {
  const ext = url?.split(".").pop()?.toLowerCase();
  const map: Record<string, { color: string; label: string }> = {
    pdf: { color: "#ef4444", label: "PDF" },
    doc: { color: "#3b82f6", label: "DOC" },
    docx: { color: "#3b82f6", label: "DOC" },
    xls: { color: "#22c55e", label: "XLS" },
    xlsx: { color: "#22c55e", label: "XLS" },
    ppt: { color: "#f97316", label: "PPT" },
    pptx: { color: "#f97316", label: "PPT" },
    zip: { color: "#a855f7", label: "ZIP" },
  };
  const info = map[ext || ""] || { color: "#6b7280", label: "FILE" };
  return (
    <div
      style={{ background: info.color }}
      className="flex h-12 w-12 items-center justify-center rounded-xl shadow-md"
    >
      <span className="text-xs font-black tracking-wider text-white">
        {info.label}
      </span>
    </div>
  );
};

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
  value: string | PromotionCampaignQualifier,
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
  value: string | PromotionCampaignType,
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
  creatorUsid: string | undefined,
): { isActive: boolean; subscription: any } {
  // Find the subscription for this creator
  const subscription = subscriptions?.find(
    (sub) => sub?.creator?.usid === creatorUsid,
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

export const MAX_LENGTH = 120;

export const formatDuration = (seconds: any) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
};

export const REACTION_EMOJIS: Record<ReactionType, string> = {
  LIKE: "👍",
  LOVE: "❤️",
  DISLIKE: "👎",
  LOL: "😂",
};

export function extractComments(raw: any): ApiComment[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw.comments)) return raw.comments;
  if (raw.data) {
    if (Array.isArray(raw.data)) return raw.data;
    if (Array.isArray(raw.data.comments)) return raw.data.comments;
  }
  console.warn("[CommentThread] Unrecognised commentsData shape:", raw);
  return [];
}

export const combineDateAndTimeToISO = (
  eventDate: string,
  eventTime: string,
) => {
  return new Date(`${eventDate}T${eventTime}:00`).toISOString();
};

export function getPollExpiryDate(
  createdDate: string,
  pollDuration: { days: number; hours: number; minutes: number },
): string {
  const created = new Date(createdDate).getTime();
  const durationMs =
    (pollDuration.days * 24 * 60 * 60 +
      pollDuration.hours * 60 * 60 +
      pollDuration.minutes * 60) *
    1000;

  return new Date(created + durationMs).toISOString();
}

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function linkify(text: string): React.ReactNode[] {
  const parts = text.split(URL_REGEX);

  return parts.map((part, i) =>
    /^https?:\/\/[^\s]+$/.test(part) ? (
      <a
        key={i}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline break-all"
      >
        {part}
      </a>
    ) : (
      part
    ),
  );
}
