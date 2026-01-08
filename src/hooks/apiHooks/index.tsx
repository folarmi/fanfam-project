import type { UserObject } from "@/lib/types";
import { useFetchSettings } from "../useFetchSettings";

export const useFetchProfile = (userObject: UserObject) => {
  return useFetchSettings({
    endpoint: "/profile/view",
    queryKeyPrefix: "viewProfile",
    userObject,
  });
};

export const useFetchDisplaySettings = (userObject: UserObject) => {
  return useFetchSettings({
    endpoint: "/profile/settings/display/view",
    queryKeyPrefix: "displaySettings",
    userObject,
  });
};

export const useFetchNotificationSettings = (userObject: UserObject) => {
  return useFetchSettings({
    endpoint: "/profile/settings/notification/view",
    queryKeyPrefix: "notificationSettings",
    userObject,
  });
};

export const useFetchPrivacyAndSafetySettings = (userObject: UserObject) => {
  return useFetchSettings({
    endpoint: "/profile/settings/privacy-safety/view",
    queryKeyPrefix: "privacyAndSafetySettings",
    userObject,
  });
};

export const useFetchAgoraRTCToken = (uid: string, channelName: string) => {
  return useFetchSettings({
    endpoint: `/agora/rtc-token?channel=${channelName}&uid=${uid}`,
    queryKeyPrefix: "fetchAgoraRTCToken",
  });
};
