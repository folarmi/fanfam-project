// utils/fcmToken.ts

import { getFCMToken } from "@/oauth/firebaseConfig";

export const requestNotificationAndSendToken = async (accessToken: string) => {
  try {
    // Request notification permission
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      // Get FCM token
      const fcmToken = await getFCMToken();

      if (fcmToken) {
        // Send to backend
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/user/fcm-token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ fcmToken }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to send FCM token");
        }

        console.log("FCM token sent successfully");
        return true;
      }
    } else {
      console.log("Notification permission denied");
      return false;
    }
  } catch (error) {
    console.error("Error handling FCM token:", error);
    return false;
  }
};
