/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";

export type UserRoleType = "CREATOR" | "VIEWER";
export type UserObject = {
  email: string;
  role: string;
  usid: string;
};
export type DisplayObject = {
  lightTheme: boolean;
  darkTheme: boolean;
  systemTheme: boolean;
  englishLanguage: boolean;
  frenchLanguage: boolean;
  spanishLanguage: boolean;
};

export type NotificationObject = {
  email: boolean;
  inAppNotification: boolean;
  mentioned: boolean;
};

export type PrivacyAndSafetyData = {
  profile: Record<string, boolean>;
  discoverability: Record<string, boolean>;
  post: Record<string, boolean>;
  watermark: Record<string, boolean>;
  safety: {
    blockedByGeneralIpAddresses: string[];
    blockedByCountry: string[];
  };
  drmVideoProtection: boolean;
};

export interface GeolocationCoords {
  latitude: number;
  longitude: number;
}

export interface LocationResult {
  success: boolean;
  location?: string;
  error?: string;
  coords?: GeolocationCoords;
}

export type MediaType = "PHOTO" | "VIDEO" | "AUDIO" | "DOCUMENT";
export type ReactionType = "LIKE" | "LOVE" | "DISLIKE" | "LOL";
export interface IsReactionLiked {
  isLiked: boolean;
}
export interface MediaFile {
  publicId: string;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  mediaType: MediaType;
  mediaLink: string;
}
export interface Reaction {
  publicId: string;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  type: ReactionType;
}

export interface ReactionItem {
  type: ReactionType;
  icon: ComponentType<any>;
  number?: number;
  createdBy: string[];
}

export interface StoryPost {
  publicId: string;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  creator: string;
  message: string;
  mediaFiles: MediaFile[];
  comments: Comment[];
  reactions: Reaction[];
  viewers: string[];
  meta: {
    reactionCount: number;
    commentCount: number;
    viewCount: number;
  };
}

// Optional child interfaces if you plan to expand later:
export interface Comment {
  id?: string;
  author?: string;
  text?: string;
  createdAt?: string;
}

export type MediaItem = {
  mediaType: MediaType;
  mediaLink: string;
};

export interface BankingInfo {
  country: string;
  bankName: string;
  bankCode: string;
  accountNo: string;
  accountName: string;
}

export type PromotionCampaignQualifier =
  | "NEW_SUBSCRIBERS"
  | "EXPIRED_SUBSCRIBERS"
  | "BOTH";

export type PromotionCampaignType = "FREE_TRIAL" | "FIRST_MONTH_DISCOUNT";

export type FreeTrial = {
  name: string;
  limitSize: number;
  endDate: string;
  duration: number;
  publicId: string;
  createdDate: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
};

export type SubscriptionBundle = {
  amount: number;
  durationInMonths: number;
  startDate: string;
  endDate: string;
  publicId: string;
  createdDate: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
};
