/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ComponentType } from "react";
import { Client } from "@stomp/stompjs";

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
  replies: StoryPost[];
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

export interface UserProfile {
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

export const EMPTY_CREATOR_USER_PROFILE: UserProfile = {
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

export interface CreatorInfo {
  phoneNumber: string | null;
  usid: string;
  email: string;
  fullName: string;
  gender: string;
  location: string;
  profilePic: string;
  bio: string;
  username: string;
  websiteUrl: string;
  displayName: string;
  coverImageUrl: string;
}

export interface SubscriberInfo {
  phoneNumber: string;
  usid: string;
  role: UserRoleType;
  email: string;
  residence: string;
  fullName: string;
  gender: string;
  location: string;
  interest: string;
  bio: string;
  username: string;
  displayName: string;
}

export interface SubscriberProfile {
  publicId: string;
  endDate: string;
  creator: CreatorInfo;
  subscriber: SubscriberInfo;
  fee: number;
}

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
  displayName: string;
  stats?: Stat[];
  children?: React.ReactNode;
}

export interface ProfileInfoProps {
  profileData: UserProfile;
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
  data?: SubscriptionBundle[];
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

export interface NotificationType {
  subject: string;
  to: string;
  from: string;
  message: string;
  createdAt: string;
  attachments: string[] | null;
  updatedAt: string;
}

export type FCMNotificationPayload = {
  // from: string;
  // messageId: string;
  // notification: {
  //   title: string;
  //   body: string;
  //   image: string;
  // };
  // data: {
  //   Post: string;
  //   time: string;
  // };
  title: string;
  body: string;
  image: string;
};

export type ProfilePostProps = {
  creatorContent: any;
  creatorContentIsLoading: boolean;
};

export interface LiveNotification {
  creatorId: string;
}

export interface JoinLeaveMessage {
  session: string;
  creatorId?: string;
  userId?: string;
  role?: "VIEWER" | "HOST";
}

export interface CommentMessage {
  sessionID: string;
  text: string;
  userId?: string;
  username?: string;
  timestamp?: string;
}

export interface ReactionMessage {
  sessionID: string;
  reactionType: string;
  userId?: string;
}

export interface LiveCreator {
  creatorId: string;
  sessionId: string;
}

export interface WebSocketContextType {
  isConnected: boolean;
  client: Client | null;
  liveCreators: Map<string, LiveCreator>;
  // subscribeToCreator: (creatorId: string) => void;
  // markCreatorOffline: (creatorId: string) => void;
  // unsubscribeFromCreator: (creatorId: string) => void;
  sendMessage: (destination: string, body: any) => void;
  isCreatorLive: (creatorId: string) => boolean;
  getLiveSession: (creatorId: string) => LiveCreator | undefined;
  refetchLiveHosts: () => void;
}

export interface JoinLeaveMessage {
  session: string;
  userId?: string;
  creatorId?: string;
  role?: "VIEWER" | "HOST";
}

export interface LiveComment {
  id: string | number;
  sessionID: string;
  message: string;
  user?: string;
  userId?: string;
  username?: string;
  timestamp?: string | number;
  createdAt?: string;
}

export interface UseLiveStreamProps {
  sessionId: string;
  creatorId: string;
  role: "VIEWER" | "HOST";
  enabled?: boolean;
  onCommentReceived?: (comment: LiveComment) => void;
}

export interface ChatMessage {
  id: number;
  user: string;
  username?: string;
  userId?: string;
  badge?: string;
  message: string;
  time: string;
  isGift?: boolean;
  isComment?: boolean; // ✅ NEW: To distinguish WebSocket comments from local messages
  isPinned?: boolean; // ✅ OPTIONAL: For future pinned messages feature
}

export type LocStatus = "idle" | "requesting" | "granted" | "denied" | "error";

export type LocationErrorCode =
  | "PERMISSION_DENIED"
  | "POSITION_UNAVAILABLE"
  | "TIMEOUT"
  | "UNSUPPORTED"
  | "GEOCODE_FAILED"
  | "UNKNOWN";

export interface LocationResult {
  success: boolean;
  location?: string;
  coords?: { latitude: number; longitude: number };
  error?: string;
  code?: LocationErrorCode;
}
export interface LocationPermissionCardProps {
  status: LocStatus;
  location?: string;
  error?: string | null;
  code?: LocationErrorCode;
  onRetry: () => void;
}

export type LiveEventType =
  | "USER_JOIN_LIVE"
  | "USER_LEFT_LIVE"
  | "CREATOR_LIVE_STARTED"
  | "LIVE_COMMENT"
  | "LIVE_REACTION"
  | "CREATOR_ENDED_LIVE";

export type LiveEventPayload = {
  event: LiveEventType;
  user?: string; // you already received this
  session?: string;
  text?: string; // likely for LIVE_COMMENT
  reactionType?: string; // likely for LIVE_REACTION
  [key: string]: any;
};
