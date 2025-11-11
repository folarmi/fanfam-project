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

// {
//     "phoneNumber": "+2348175988567",
//     "usid": "fafam-20251006HU8P8ehVcXD4LZRoGU87WRKmKCZHWONk6mEL6GXJ",
//     "role": "CREATOR",
//     "email": "excel@mailinator.com",
//     "residence": "sdkfndskf",
//     "fullName": "Brennan Carey",
//     "gender": "Male",
//     "location": "Laudantium quos nem",
//     "profilePic": "http://res.cloudinary.com/dezb6qbwe/image/upload/c_fill,h_250,w_200/v1762332518/image_id_fafam-20251006HU8P8ehVcXD4LZRoGU87WRKmKCZHWONk6mEL6GXJ",
//     "interest": "Blanditiis consectet",
//     "bio": "sjdknfbkjdsfsjkdnf",
//     "username": "testUserName",
//     "websiteUrl": null,
//     "displayName": "Cynthia Kirby",
//     "coverImageUrl": "http://res.cloudinary.com/dezb6qbwe/image/upload/v1762332508/24d0a56e-3bbb-4c2e-8abc-dbd6ffd6da23fafam-20251006HU8P8ehVcXD4LZRoGU87WRKmKCZHWONk6mEL6GXJ.svg"
// }
