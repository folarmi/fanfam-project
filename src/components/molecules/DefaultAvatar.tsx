import React from "react";

interface DefaultAvatarProps {
  fullName?: string | null;
  size?: string;
  rounded?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const DefaultAvatar: React.FC<DefaultAvatarProps> = ({
  fullName,
  size = "12",
  rounded = "full",
  bgColor = "bg-primary",
  textColor = "text-white",
  className = "",
}) => {
  // Extract initials (supporting 1 or 2 names) with full null/undefined safety
  const getInitials = (name?: string | null): string => {
    // Handle null, undefined, or empty string
    if (!name || typeof name !== "string") return "?";

    const trimmedName = name.trim();
    if (!trimmedName) return "?";

    const parts = trimmedName.split(/\s+/).filter(Boolean); // Split by whitespace and remove empty strings

    if (parts.length === 0) return "?";
    if (parts.length === 1) {
      const firstChar = parts[0]?.[0];
      return firstChar ? firstChar.toUpperCase() : "?";
    }

    // Get first and last name initials
    const firstInitial = parts[0]?.[0];
    const lastInitial = parts[parts.length - 1]?.[0];

    if (!firstInitial && !lastInitial) return "?";
    if (!firstInitial) return lastInitial?.toUpperCase() ?? "?";
    if (!lastInitial) return firstInitial?.toUpperCase() ?? "?";

    return (firstInitial + lastInitial).toUpperCase();
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
      `.trim()}
    >
      {initials}
    </div>
  );
};

export default DefaultAvatar;
