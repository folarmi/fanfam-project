// import React from "react";
// import { Inbox } from "lucide-react";

// type Props = {
//   text: string;
//   width?: number | string;
//   className?: string;
//   icon?: React.ReactNode;
//   subtitle?: string;
// };

// const EmptyState = ({
//   text,
//   width = 400,
//   className = "",
//   icon,
//   subtitle,
// }: Props) => {
//   return (
//     <div className="flex items-center justify-center py-20 px-4">
//       <div
//         className={`flex flex-col items-center gap-4 ${className}`}
//         style={{ maxWidth: typeof width === "number" ? `${width}px` : width }}
//       >
//         {/* Icon with subtle animation */}
//         <div className="relative">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-xl opacity-50 animate-pulse" />
//           <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl shadow-sm border border-gray-200">
//             {icon || (
//               <Inbox className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
//             )}
//           </div>
//         </div>

//         {/* Text content */}
//         <div className="flex flex-col items-center gap-2 text-center">
//           <p className="text-gray-700 font-medium text-base leading-relaxed">
//             {text}
//           </p>
//           {subtitle && (
//             <p className="text-gray-500 text-sm leading-relaxed">{subtitle}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EmptyState;

// Version 2 with updated design and structure

import React from "react";
import { Inbox } from "lucide-react";

type Props = {
  text: string;
  width?: number | string;
  className?: string;
  icon?: React.ReactNode;
  subtitle?: string;
};

const EmptyState = ({
  text,
  width = 400,
  className = "",
  icon,
  subtitle,
}: Props) => {
  return (
    <div className="flex items-center justify-center px-4 py-20">
      <div
        className={`flex flex-col items-center text-center ${className}`}
        style={{ maxWidth: typeof width === "number" ? `${width}px` : width }}
      >
        {/* Icon */}
        <div className="relative mb-5 flex items-center justify-center">
          <div className="absolute h-20 w-20 rounded-full bg-[#2599F6]/10 blur-2xl" />
          <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#2599F6]/10 bg-white shadow-[0px_8px_30px_rgba(37,153,246,0.08)]">
            <div className="text-[#0567B5]">
              {icon || <Inbox className="h-7 w-7" strokeWidth={1.7} />}
            </div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2">
          <p className="text-base font-semibold leading-6 text-grey_900">
            {text}
          </p>

          {subtitle && (
            <p className="mx-auto max-w-[320px] text-sm leading-6 text-grey_400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
