import React from "react";

interface DefaultCoverImageProps {
  displayName: string;
  theme?: "modern" | "minimal" | "geometric" | "nature";
  height?: "sm" | "md" | "lg";
  className?: string;
}

const DefaultCoverImage: React.FC<DefaultCoverImageProps> = ({
  displayName,
  theme = "modern",
  height = "md",
  className = "",
}) => {
  const heightClasses = {
    sm: "h-32 sm:h-40 md:h-48",
    md: "h-40 sm:h-52 md:h-64",
    lg: "h-48 sm:h-60 md:h-72",
  };

  const getInitials = (name: string): string => {
    return name
      ?.split(" ")
      ?.map((word) => word.charAt(0))
      ?.join("")
      ?.toUpperCase()
      ?.slice(0, 2);
  };

  const initials = getInitials(displayName);

  // Theme configurations
  const themes = {
    modern: {
      bg: "bg-slate-900",
      pattern: (
        <div className="absolute inset-0">
          {/* Diagonal lines */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute h-full w-px bg-slate-700/20"
              style={{ left: `${i * 5}%`, transform: "skewX(-20deg)" }}
            />
          ))}
          {/* Accent squares */}
          <div className="absolute top-8 right-12 w-24 h-24 border-2 border-blue-500/30 rotate-45"></div>
          <div className="absolute bottom-12 left-16 w-16 h-16 border-2 border-purple-500/30 rotate-12"></div>
          <div className="absolute top-1/2 right-1/4 w-8 h-8 bg-cyan-500/10"></div>
        </div>
      ),
      badgeStyle: "bg-blue-600 shadow-lg shadow-blue-500/50",
      textColor: "text-white",
    },
    minimal: {
      bg: "bg-white",
      pattern: (
        <div className="absolute inset-0">
          {/* Clean circles */}
          <div className="absolute top-12 left-12 w-48 h-48 border border-gray-200 rounded-full"></div>
          <div className="absolute bottom-8 right-16 w-64 h-64 border border-gray-200 rounded-full"></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-32 bg-gray-50 rounded-full"></div>
        </div>
      ),
      badgeStyle: "bg-gray-900 shadow-2xl",
      textColor: "text-gray-900",
    },
    geometric: {
      bg: "bg-indigo-950",
      pattern: (
        <div className="absolute inset-0">
          {/* Geometric shapes */}
          <svg
            className="w-full h-full absolute inset-0"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="hexagons"
                x="0"
                y="0"
                width="100"
                height="86.6"
                patternUnits="userSpaceOnUse"
              >
                <polygon
                  points="50,0 93.3,25 93.3,75 50,100 6.7,75 6.7,25"
                  fill="none"
                  stroke="rgba(99,102,241,0.1)"
                  strokeWidth="2"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hexagons)" />
          </svg>
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-indigo-500/10 rotate-45"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-violet-500/10 -rotate-12"></div>
        </div>
      ),
      badgeStyle: "bg-indigo-600 shadow-lg shadow-indigo-500/50",
      textColor: "text-white",
    },
    nature: {
      bg: "bg-emerald-50",
      pattern: (
        <div className="absolute inset-0">
          {/* Organic shapes */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100/50 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-100/50 rounded-full blur-3xl"></div>
          <svg
            className="absolute inset-0 w-full h-full opacity-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20,50 Q30,30 40,50 T60,50"
              stroke="#059669"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M60,80 Q70,60 80,80 T100,80"
              stroke="#14b8a6"
              strokeWidth="2"
              fill="none"
            />
            <circle cx="30" cy="30" r="4" fill="#10b981" />
            <circle cx="70" cy="70" r="3" fill="#14b8a6" />
          </svg>
        </div>
      ),
      badgeStyle: "bg-emerald-600 shadow-lg shadow-emerald-500/30",
      textColor: "text-emerald-900",
    },
  };

  const currentTheme = themes[theme];

  return (
    <div
      className={`w-full ${heightClasses[height]} ${currentTheme.bg} flex items-center justify-center rounded-md relative overflow-hidden ${className}`}
    >
      {/* Pattern layer */}
      {currentTheme.pattern}

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-4">
        {/* Initials badge */}
        <div
          className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 ${currentTheme.badgeStyle} rounded-2xl flex items-center justify-center transform hover:scale-105 transition-all duration-300 hover:rotate-3`}
        >
          <span className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">
            {initials}
          </span>
        </div>

        {/* Display name */}
        <h1
          className={`${currentTheme.textColor} text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-center px-4`}
        >
          {displayName}
        </h1>
      </div>

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none"></div>
    </div>
  );
};

export { DefaultCoverImage };
