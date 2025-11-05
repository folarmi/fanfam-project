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

export interface MediaType {
  PHOTO: "photo";
  VIDEO: "video";
  AUDIO: "audio";
  DOCUMENT: "document";
}

export interface StoryPost {
  publicId: string;
  createdBy: string;
  lastModifiedBy: string;
  createdDate: string;
  lastModifiedDate: string;
  creator: string;
  message: string;
  mediaLinks: string[];
  comments: Comment[];
  reactions: Reaction[];
  mediaType: "PHOTO" | "VIDEO" | "AUDIO" | "TEXT";
}

// Optional child interfaces if you plan to expand later:
export interface Comment {
  id?: string;
  author?: string;
  text?: string;
  createdAt?: string;
}

export interface Reaction {
  id?: string;
  user?: string;
  type?: string; // e.g. "LIKE" | "LOVE" | "WOW"
}

export type MediaItem = {
  mediaType: "PHOTO" | "DOCUMENT" | "VIDEO";
  mediaLink: string;
}[];
