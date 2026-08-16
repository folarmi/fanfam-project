/* eslint-disable no-constant-condition */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { UAParser } from "ua-parser-js";
import {
  engagementMessagesStories,
  engagementMessagesSummary,
  engagementSummary,
  reachProfileSummary,
  reachPromotionsSummary,
} from "../data";
import type { LiveEventPayload, LocationResult } from "@/lib/types";
import moment from "moment";

export const phoneRegex =
  // /^(\+\d{1,3}\s?)?\(?\d{3,4}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  /^(?=.{1,14}$)(\+\d{1,3}\s?)?\(?\d{3,4}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault(); // Prevent pasting
};

export const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault(); // Prevent copying
};

export const handleCut = (e: React.ClipboardEvent<HTMLInputElement>) => {
  e.preventDefault(); // Prevent cutting
};

export const engagementTypeData = (type: string) => {
  let typeData;
  if (type === "Posts") typeData = engagementSummary;
  else if (type === "Messages") typeData = engagementMessagesSummary;
  else if (type === "Streaming") typeData = engagementMessagesSummary;
  else if (type === "Stories") typeData = engagementMessagesStories;

  return typeData;
};

export const reachTypeData = (type: string) => {
  let typeData;
  if (type === "Profile Visitors") typeData = reachProfileSummary;
  else if (type === "Promotions" || "Trial Links")
    typeData = reachPromotionsSummary;

  return typeData;
};

export const statTimeLine = (type: string | undefined) => {
  let name;
  if (type === "Tips") name = "1 Story, $0.00";
  else if (type === "Views") name = "1 Story, $0.00";
  else if (type === "Likes") name = "1 Story, 0 Likes";
  else if (type === "Comments") name = "1 Story, 0 Comments";

  return name;
};

export const getDeviceOS = (): string => {
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  if (/windows phone/i.test(userAgent)) return "Windows Phone";
  if (/android/i.test(userAgent)) return "Android";
  if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream)
    return "iOS";

  switch (true) {
    case /Win/.test(userAgent):
      return "Windows";
    case /Mac/.test(userAgent):
      return "MacOS";
    case /Linux/.test(userAgent):
      return "Linux";
    default:
      return "Unknown OS";
  }
};

export const fetchDeviceIP = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Failed to fetch IP:", error);
    return "Unable to fetch IP";
  }
};

export const getPlatform = (): string => {
  if (
    "userAgentData" in navigator &&
    typeof navigator.userAgentData === "object" &&
    navigator.userAgentData !== null &&
    "platform" in navigator.userAgentData
  ) {
    // Type assertion to access platform safely
    return (navigator.userAgentData as { platform: string }).platform;
  }
  // Fallback for older browsers
  return navigator.platform || "Unknown platform";
};

export const getBrowserInfo = (): string => {
  const parser = new UAParser();
  const browser = parser.getBrowser();
  return `${browser.name || "Unknown"} ${browser.version || ""}`;
};

export const getPlatformFromUAParser = (): string => {
  const parser = new UAParser();
  return parser.getOS().name || "Unknown Platform";
};

export const getGeolocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject({ code: 0, message: "Geolocation not supported" });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) =>
        resolve({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }),
      (err) => reject(err),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  });
};

export const getReadableLocation = async (): Promise<LocationResult> => {
  try {
    if (!navigator.geolocation) {
      return {
        success: false,
        code: "UNSUPPORTED",
        error: "Your browser does not support location access.",
      };
    }

    const coords = await getGeolocation();

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`,
    );

    if (!response.ok) {
      return {
        success: false,
        code: "GEOCODE_FAILED",
        error: `Location service error (${response.status}). Please try again.`,
      };
    }

    const data = await response.json();

    const locationParts = [
      data.locality || data.city,
      data.principalSubdivision,
      data.countryName,
    ].filter(Boolean);

    const location =
      locationParts.length > 0
        ? locationParts.join(", ")
        : data.localityInfo?.administrative?.[0]?.name ||
          "Location unavailable";

    return { success: true, location, coords };
  } catch (error: any) {
    const code = error?.code;

    if (code === 1) {
      return {
        success: false,
        code: "PERMISSION_DENIED",
        error:
          "Location permission was denied. Please allow it to verify your email.",
      };
    }
    if (code === 2) {
      return {
        success: false,
        code: "POSITION_UNAVAILABLE",
        error:
          "We couldn’t detect your location. Turn on location services and try again.",
      };
    }
    if (code === 3) {
      return {
        success: false,
        code: "TIMEOUT",
        error: "Location request timed out. Please retry.",
      };
    }

    return {
      success: false,
      code: "UNKNOWN",
      error: error?.message || "An unexpected error occurred.",
    };
  }
};

export const convertToHumanReadableDate = (date?: string) => {
  if (!date) return undefined;
  return moment(date, "YYYY-MM-DD").format("MMM DD YYYY");
};

export const getRemainingDays = (dateString: string) => {
  if (!dateString) return undefined;

  const target = moment(dateString, "YYYY-MM-DD");
  const now = moment();

  const diff = target.diff(now, "days");

  return Math.max(0, diff);
};

export const MAX_CHANNEL_LENGTH = 64;

// export const getWebSocketUrl = () => {
//   if (import.meta.env.DEV) {
//     return "ws://localhost:3002/api/v1/ws";
//   }
//   return import.meta.env.VITE_WS_URL || "ws://dev.fanation.app:7639/api/v1/ws";
// };

export const getWebSocketUrl = () => {
  // Previously this returned "ws://localhost:3002/api/v1/ws" in dev
  // unconditionally — but 3002 is the Vite dev server's own port, not the
  // backend. Nothing was listening there, so every connection attempt
  // failed immediately with a 1006 (abnormal closure).
  //
  // Now it always resolves the real backend WS endpoint, with VITE_WS_URL
  // as an override in case you ever run the Spring Boot backend locally
  // (e.g. on localhost:8080) instead of pointing at staging.
  return import.meta.env.VITE_WS_URL || "ws://dev.fanation.app:7639/api/v1/ws";
};

export const parseLiveEvent = (body: string): LiveEventPayload | null => {
  try {
    return JSON.parse(body);
  } catch (e) {
    console.error("❌ Failed to parse live event:", body, e);
    return null;
  }
};

export const isEmail = (value?: string) => {
  if (!value) return false;

  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
};
