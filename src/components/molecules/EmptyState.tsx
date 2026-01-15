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
    <div className="flex items-center justify-center py-20 px-4">
      <div
        className={`flex flex-col items-center gap-4 ${className}`}
        style={{ maxWidth: typeof width === "number" ? `${width}px` : width }}
      >
        {/* Icon with subtle animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-xl opacity-50 animate-pulse" />
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-5 rounded-2xl shadow-sm border border-gray-200">
            {icon || (
              <Inbox className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
            )}
          </div>
        </div>

        {/* Text content */}
        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-gray-700 font-medium text-base leading-relaxed">
            {text}
          </p>
          {subtitle && (
            <p className="text-gray-500 text-sm leading-relaxed">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
