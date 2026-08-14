/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import { useSelector } from "react-redux";
import { useGetData } from "@/hooks/apiCalls";
import { onMessageListener } from "@/oauth/firebaseConfig";
import type { FCMNotificationPayload, NotificationType } from "@/lib/types";

interface NotificationsContextType {
  notifications: NotificationType[];
  liveNotification: FCMNotificationPayload | null;
  markAsRead: (id: string) => void;
  refetchNotifications: () => void;
  clearLiveNotification: () => void;
  isLoading: boolean;
}

const NotificationsContext = createContext<
  NotificationsContextType | undefined
>(undefined);

export const NotificationsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [liveNotification, setLiveNotification] =
    useState<FCMNotificationPayload | null>(null);

  // Get user from Redux store
  const userObject = useSelector((state: any) => state.auth.userObject);

  // Fetch notifications
  const { data, isLoading, refetch } = useGetData({
    url: `notifications?email=${userObject?.email}`,
    queryKey: ["GetNotificationsByEmail", userObject?.email],
    enabled: !!userObject?.email,
  });

  const notifications = data || [];

  // Mark notification as read
  const markAsRead = useCallback(
    async (id: string) => {
      try {
        await fetch(`YOUR_BACKEND_API/notifications/${id}/read`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        });
        refetch();
      } catch (error) {
        console.error("❌ Error marking notification as read:", error);
      }
    },
    [refetch],
  );

  const clearLiveNotification = useCallback(() => {
    setLiveNotification(null);
  }, []);

  // Handle incoming FCM message
  const handleIncomingMessage = useCallback(
    (payload: any) => {
      const notification = payload.notification || payload.data;
      setLiveNotification(notification);

      // Show browser notification if permission granted
      if (Notification.permission === "granted") {
        new Notification(notification.title, {
          body: notification.body,
          icon: notification.icon || notification.image || "/logo.png",
        });
      } else {
        console.warn(
          "⚠️ Notification permission not granted:",
          Notification.permission,
        );
      }

      // Refetch notifications to update the list
      refetch();

      // Clear live notification after 5 seconds
      setTimeout(() => setLiveNotification(null), 5000);
    },
    [refetch],
  );

  // Listen for real-time Firebase notifications - FIXED VERSION
  useEffect(() => {
    let isListening = true;

    // Recursive function to continuously listen for messages
    const setupListener = () => {
      if (!isListening) return;

      onMessageListener()
        .then((payload: any) => {
          handleIncomingMessage(payload);
          // Immediately set up the next listener
          setupListener();
        })
        .catch((err) => {
          console.error("❌ Error receiving FCM notification:", err);
          // Retry after a delay if there's an error
          if (isListening) {
            setTimeout(setupListener, 1000);
          }
        });
    };

    setupListener();

    // Cleanup function
    return () => {
      isListening = false;
      console.log("🔌 FCM listener cleaned up");
    };
  }, [handleIncomingMessage]);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      console.log("🔔 Requesting notification permission...");
      Notification.requestPermission().then((permission) => {
        console.log("🔔 Notification permission:", permission);
      });
    }
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        liveNotification,
        markAsRead,
        refetchNotifications: refetch,
        clearLiveNotification,
        isLoading,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within NotificationsProvider",
    );
  }
  return context;
};
