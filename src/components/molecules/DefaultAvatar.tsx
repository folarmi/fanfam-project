import React from "react";

interface DefaultAvatarProps {
  fullName: string;
  size?: string; // tailwind size e.g. "12", "14", "16"
  rounded?: string; // tailwind rounding e.g. "full", "lg", "md"
  bgColor?: string; // tailwind background e.g. "bg-blue-500"
  textColor?: string; // tailwind text color e.g. "text-white"
  className?: string; // extra custom styles
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({
  fullName,
  size = "12",
  rounded = "full",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "",
}) => {
  // Extract initials (supporting 1 or 2 names)
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length === 1) return parts[0][0]?.toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(fullName);

  return (
    <div
      className={`
        flex 
        items-center 
        justify-center 
        ${bgColor} 
        ${textColor} 
        rounded-${rounded} 
        w-${size} 
        h-${size} 
        font-semibold 
        text-lg
        ${className}
      `}
    >
      {initials}
    </div>
  );
};

export default DefaultAvatar;
