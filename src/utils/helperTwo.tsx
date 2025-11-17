import type {
  MediaType,
  PromotionCampaignQualifier,
  PromotionCampaignType,
} from "@/lib/types";
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
  return "DOCUMENT";
};

export const mapQualifierNameToType = (
  name: string
): PromotionCampaignQualifier | undefined => {
  const mapping: Record<string, PromotionCampaignQualifier> = {
    "Both new and expired": "BOTH",
    "New subscribers only": "NEW_SUBSCRIBERS",
    "Expired subscribers only": "EXPIRED_SUBSCRIBERS",
  };
  return mapping[name];
};

// Map qualifier type to ID
export const mapQualifierTypeToId = (
  type: PromotionCampaignQualifier
): number | undefined => {
  const mapping: Record<PromotionCampaignQualifier, number> = {
    BOTH: 1,
    NEW_SUBSCRIBERS: 2,
    EXPIRED_SUBSCRIBERS: 3,
  };
  return mapping[type];
};

// Map promotion type name to backend type
export const mapPromotionTypeNameToType = (
  name: string
): PromotionCampaignType | undefined => {
  const mapping: Record<string, PromotionCampaignType> = {
    "Free trial": "FREE_TRIAL",
    "First month discount": "FIRST_MONTH_DISCOUNT",
  };
  return mapping[name];
};

// Map promotion type ID to type
export const mapPromotionTypeIdToType = (
  id: number
): PromotionCampaignType | undefined => {
  const mapping: Record<number, PromotionCampaignType> = {
    1: "FREE_TRIAL",
    2: "FIRST_MONTH_DISCOUNT",
  };
  return mapping[id];
};

// Map promotion type to ID
export const mapPromotionTypeToId = (
  type: PromotionCampaignType
): number | undefined => {
  const mapping: Record<PromotionCampaignType, number> = {
    FREE_TRIAL: 1,
    FIRST_MONTH_DISCOUNT: 2,
  };
  return mapping[type];
};
