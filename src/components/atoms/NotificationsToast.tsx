// components/NotificationToast.tsx
import { useNotifications } from "@/context/NotificationsContext";
import { X } from "lucide-react"; // or your icon library

function NotificationToast() {
  const { liveNotification, clearLiveNotification } = useNotifications();
  if (!liveNotification) return null;

  // // Clean up the body text - remove the long subscription ID or shorten it
  // const cleanBody = (body: string) => {
  //   if (!body) return "";

  //   // Remove "null"
  //   let cleaned = body.replace(/null/gi, "Someone");

  //   // Shorten subscription ID if present
  //   if (cleaned.includes("subscriptionID:")) {
  //     const parts = cleaned.split("subscriptionID:");
  //     const subId = parts[1]?.trim().slice(0, 10); // Take first 10 chars
  //     cleaned = `${parts[0]}(ID: ${subId}...)`;
  //   }

  //   return cleaned;
  // };

  return (
    <div className="fixed top-4 right-4 bg-primary border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-[9999] animate-slide-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {liveNotification.notification?.image && (
            <img
              src={liveNotification?.image}
              alt="notification"
              className="w-12 h-12 rounded-full object-cover mb-2"
            />
          )}
          <h4 className="font-semibold text-white">
            {liveNotification?.title}
          </h4>
          <p className="text-white text-sm mt-1">
            {liveNotification?.body || ""}
          </p>
        </div>
        <button
          onClick={() => clearLiveNotification?.()}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default NotificationToast;
