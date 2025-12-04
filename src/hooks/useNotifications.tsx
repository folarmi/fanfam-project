// src/hooks/useNotifications.js
import { onMessageListener } from "@/oauth/firebaseConfig";
import { useState, useEffect } from "react";

export const useNotifications = () => {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Only listen for foreground messages
    onMessageListener()
      .then((payload) => {
        console.log("Foreground notification:", payload);
        setNotification(payload.notification);

        // Show browser notification when app is open
        if (Notification.permission === "granted") {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon || "/logo.png",
          });
        }
      })
      .catch((err) => console.error("Notification error:", err));
  }, []);

  return { notification };
};
