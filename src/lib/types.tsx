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
  comments: PostComment[];
  reactions: Reaction[];
  viewers: string[];
  meta: PostMeta;
}

export interface PostComment {
  publicId: string;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  message: string;
  replies: PostComment[];
  reactions: Reaction[];
}

export interface PostMeta {
  reactionCount: number;
  commentCount: number;
  viewCount: number;
}

export interface SortInfo {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface StoryPostData {
  content: StoryPost[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: SortInfo;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface StoryPostResponse {
  data: StoryPostData;
  message: string;
  success: boolean;
  timestamp: string;
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
  amount: string;
  durationInMonths: number;
  startDate: string;
  endDate: string;
  publicId: string;
  createdDate: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
};

export type PromotionalCampaignType = {
  publicId: string;
  createdDate: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  name: string;
  limitSize: number;
  endDate: string;
  duration: number;
  message: string;
  qualifier: PromotionCampaignQualifier;
  type: PromotionCampaignType;
};

export const EMPTY_BUNDLE: SubscriptionBundle = {
  amount: "",
  durationInMonths: 0,
  startDate: "",
  endDate: "",
  publicId: "",
  createdDate: "",
  lastModifiedDate: "",
  lastModifiedBy: "",
};

export interface CreatorProfile {
  monthlyFee: number;
  personaInquiryId: string;
  verified: boolean;
  creatorBankInfo: BankingInfo;
  subscriptions: any[];
  freeTrialLinks: FreeTrial[];
  subscriptionBundles: SubscriptionBundle[];
  promotionCampaigns: PromotionalCampaignType[];
}

export interface CreatorUserProfile {
  phoneNumber: string;
  usid: string;
  role: UserRoleType;
  email: string;
  residence: string;
  fullName: string;
  gender: string;
  location: string;
  profilePic: string | null;
  interest: string;
  bio: string;
  username: string;
  websiteUrl: string;
  displayName: string;
  coverImageUrl: string;
  creatorProfile: CreatorProfile | null;
}

export const EMPTY_CREATOR_USER_PROFILE: CreatorUserProfile = {
  phoneNumber: "",
  usid: "",
  role: "VIEWER",
  email: "",
  residence: "",
  fullName: "",
  gender: "",
  location: "",
  profilePic: null,
  interest: "",
  bio: "",
  username: "",
  websiteUrl: "",
  displayName: "",
  coverImageUrl: "",
  creatorProfile: null,
};

export interface Stat {
  icon: React.ReactNode;
  count: number;
}

export interface Action {
  type: string;
  component: React.ReactNode;
}

export interface Recipient {
  avatar: string;
  name: string;
  username: string;
}

export interface TipData {
  amount: string;
  message: string;
}

export interface ProfileHeaderProps {
  coverImage: string;
  stats?: Stat[];
  children?: React.ReactNode;
}

export interface ProfileInfoProps {
  profileData: CreatorUserProfile;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  showReadMore?: boolean;
}

export interface ProfileActionsProps {
  actions?: Action[];
  showLocation?: boolean;
  location?: string;
  onActionClick?: (actionType: string) => void;
}

export interface SubscriptionBundleProps {
  currentSubscription?: SubscriptionBundle;
  bundles?: SubscriptionBundle[];
  onSubscribe?: (bundle: SubscriptionBundle) => void;
}

export interface TipModalProps {
  recipient: Recipient;
  onClose: () => void;
  onSend?: (data: TipData) => void;
}

export type IconAndNumberProp = {
  Icon: any;
  number?: number;
  numberColor?: string;
  className?: string;
  reactionType: ReactionType;
  publicid: string | undefined;
  isActive?: boolean;
};
