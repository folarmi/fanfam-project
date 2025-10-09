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

// {
//     "profile": {
//         "activityStatus": false,
//         "fansCountOnProfile": false,
//         "mediaCountOnYourProfile": false,
//         "friendsList": false,
//         "password": false
//     },
//     "discoverability": {
//         "optOutOfSuggestion": false
//     },
//     "post": {
//         "posts": false,
//         "allowCommentsFromSubscribers": false,
//         "postTipsSum": false
//     },
//     "watermark": {
//         "pictures": false,
//         "videos": false
//     },
//     "safety": {
//         "blockedByGeneralIpAddresses": [],
//         "blockedByCountry": []
//     },
//     "drmVideoProtection": false
// }
