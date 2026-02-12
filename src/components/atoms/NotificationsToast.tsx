// // components/NotificationToast.tsx
// import { useNotifications } from "@/context/NotificationsContext";
// import { X } from "lucide-react"; // or your icon library

import { useNotifications } from "@/context/NotificationsContext";
import { X } from "lucide-react";

// function NotificationToast() {
//   const { liveNotification, clearLiveNotification } = useNotifications();
//   if (!liveNotification) return null;


//   return (
//     <div className="fixed top-4 right-4 bg-primary border border-gray-200 rounded-lg shadow-lg p-4 max-w-sm z-[9999] animate-slide-in">
//       <div className="flex items-start justify-between gap-3">
//         <div className="flex-1">
//           {/* {liveNotification.notification?.image && ( */}
//           {liveNotification?.image && (
//             <img
//               src={liveNotification?.image}
//               alt="notification"
//               className="w-12 h-12 rounded-full object-cover mb-2"
//             />
//           )}
//           <h4 className="font-semibold text-white">
//             {liveNotification?.title}
//           </h4>
//           <p className="text-white text-sm mt-1">
//             {liveNotification?.body || ""}
//           </p>
//         </div>
//         <button
//           onClick={() => clearLiveNotification?.()}
//           className="text-gray-400 hover:text-gray-600"
//         >
//           <X size={18} />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default NotificationToast;


function NotificationToast() {
  const { liveNotification, clearLiveNotification } = useNotifications();
  
  if (!liveNotification) return null;

  return (
    <div className="fixed top-4 right-4 bg-primary  rounded-lg shadow-xl p-4 max-w-sm z-[9999] animate-slide-in">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          {/* {liveNotification?.image && (
            <img
              src={liveNotification?.image}
              alt="notification"
              className="w-12 h-12 rounded-full object-cover mb-2 ring-2 ring-gray-100 dark:ring-gray-700"
            />
          )} */}
          <h4 className="font-semibold text-white">
            {liveNotification?.title}
          </h4>
          <p className="text-white text-sm mt-1">
            {liveNotification?.body || ""}
          </p>
        </div>
        <button
          onClick={() => clearLiveNotification?.()}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors flex-shrink-0"
          aria-label="Close notification"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default NotificationToast;