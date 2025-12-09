/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
// context/NotificationsContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useSelector } from "react-redux";
import { useGetData } from "@/hooks/apiCalls";
import { onMessageListener } from "@/oauth/firebaseConfig";
import type { FCMNotificationPayload, NotificationType } from "@/lib/types";

interface NotificationsContextType {
  notifications: NotificationType[];
  //   unreadCount: number;
  liveNotification: FCMNotificationPayload;
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
  const [liveNotification, setLiveNotification] = useState<any>(null);

  // Get user email from Redux store
  const userObject = useSelector((state: any) => state.auth.userObject); // Adjust based on your Redux structure

  // Fetch notifications using your custom hook
  const { data, isLoading, refetch } = useGetData({
    url: `notifications?email=${userObject?.email}`,
    queryKey: ["GetNotificationsByEmail"],
    enabled: !!userObject?.email,
  });
  const notifications = data || [];

  // Mark notification as read
  const markAsRead = async (id: string) => {
    try {
      await fetch(`YOUR_BACKEND_API/notifications/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Refetch notifications after marking as read
      refetch();
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const clearLiveNotification = () => {
    setLiveNotification(null);
  };

  // Listen for real-time Firebase notifications
  // context/NotificationsContext.tsx
  useEffect(() => {
    onMessageListener()
      .then((payload: any) => {
        setLiveNotification(payload.notification);
        // Show browser notification
        if (Notification.permission === "granted") {
          new Notification(payload.notification.title, {
            body: payload.notification.body,
            icon: payload.notification.icon || "/logo.png",
          });
        } else {
          console.log(
            "❌ Notification permission not granted:",
            Notification.permission
          );
        }

        refetch();
        setTimeout(() => setLiveNotification(null), 5000);
      })
      .catch((err) => console.error("❌ Error receiving notification:", err));
  }, [refetch]);

  //   const unreadCount = notifications.filter((n: Notification) => !n.read).length;

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        // unreadCount,
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
      "useNotifications must be used within NotificationsProvider"
    );
  }
  return context;
};

// {
//     "title": "Post",
//     "body": "theCreator@mailinator.com made a new post",
//     "image": "http://res.cloudinary.com/dkkelxvme/image/upload/v1747388455/lmclra2yqjmarbmn7mti.svg"
// }
