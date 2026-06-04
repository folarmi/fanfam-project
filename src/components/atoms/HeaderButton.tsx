import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";

type BgVariant = "white" | "primary" | "dark";

const bgClasses: Record<BgVariant, string> = {
  white: "bg-white_200 text-black border-primary",
  primary: "bg-primary text-white border-primary",
  dark: "bg-blue_100 text-black border-primary",
};

type HeaderButtonProps = {
  label: string;
  icon?: ReactNode;
  bg?: BgVariant;
  loading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const HeaderButton = ({
  label,
  icon,
  bg = "white",
  loading = false,
  disabled,
  className = "",
  ...props
}: HeaderButtonProps) => {
  return (
    <button
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2
        py-[11px] px-[14px]
        font-medium text-sm
        border
        rounded-3xl
        transition-all
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${bgClasses[bg]}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        <>
          <span>{label}</span>
          {icon && <span className="flex items-center">{icon}</span>}
        </>
      )}
    </button>
  );
};

export default HeaderButton;
