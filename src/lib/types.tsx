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
