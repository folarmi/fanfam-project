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
import type { GeolocationCoords, LocationResult } from "@/lib/types";

export const phoneRegex =
  // /^(\+\d{1,3}\s?)?\(?\d{3,4}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  /^(?=.{1,14}$)(\+\d{1,3}\s?)?\(?\d{3,4}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

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

export const getGeolocation = (): Promise<GeolocationCoords> => {
  return new Promise((resolve, reject) => {
    if (!("geolocation" in navigator)) {
      reject(new Error("Geolocation is not supported by your browser."));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        resolve({ latitude, longitude });
      },
      (error) => {
        // More specific error messages
        const errorMessages: Record<number, string> = {
          1: "Location permission denied. Please enable location access.",
          2: "Location unavailable. Please check your device settings.",
          3: "Location request timed out. Please try again.",
        };

        reject(
          new Error(errorMessages[error.code] || "Failed to retrieve location.")
        );
      },
      {
        timeout: 10000, // 10 seconds
        maximumAge: 60000, // Cache for 1 minute
        enableHighAccuracy: false, // Faster, less battery drain
      }
    );
  });
};

export const getReadableLocation = async (): Promise<LocationResult> => {
  try {
    const coords = await getGeolocation();

    // BigDataCloud free API (no key required, better rate limits)
    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${coords.latitude}&longitude=${coords.longitude}&localityLanguage=en`
    );

    if (!response.ok) {
      throw new Error(`Geocoding service error: ${response.status}`);
    }

    const data = await response.json();

    // Build readable location
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

    return {
      success: true,
      location,
      coords,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || "An unexpected error occurred.",
    };
  }
};
