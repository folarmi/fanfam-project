interface LoaderProps {
  fullScreen?: boolean;
  size?: "sm" | "md" | "lg";
  background?: boolean;
}

const Loader = ({
  fullScreen = true,
  size = "lg",
  background = true,
}: LoaderProps) => {
  const sizeMap = {
    sm: {
      glow: "h-14 w-14",
      ring: "h-10 w-10",
      center: "h-6 w-6",
      dot: "h-2 w-2",
    },
    md: {
      glow: "h-20 w-20",
      ring: "h-14 w-14",
      center: "h-8 w-8",
      dot: "h-3 w-3",
    },
    lg: {
      glow: "h-28 w-28",
      ring: "h-20 w-20",
      center: "h-10 w-10",
      dot: "h-4 w-4",
    },
  };

  const current = sizeMap[size];

  return (
    <div
      className={`flex items-center justify-center ${
        fullScreen ? "min-h-screen" : "py-6"
      } ${background ? "bg-white" : ""}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Glow */}
        <div className={`${current.glow} rounded-full bg-primary/10 blur-xl`} />

        {/* Spinner */}
        <div
          className={`absolute ${current.ring} animate-spin rounded-full border-[3px] border-transparent border-t-primary border-r-primaryTwo`}
        />

        {/* Center circle */}
        <div
          className={`absolute ${current.center} rounded-full bg-white shadow-md`}
        />

        {/* Pulse dot */}
        <div
          className={`absolute ${current.dot} animate-pulse rounded-full bg-primaryTwo`}
        />
      </div>
    </div>
  );
};

export { Loader };
