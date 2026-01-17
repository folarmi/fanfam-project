import type { ButtonHTMLAttributes, ReactNode } from "react";

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
} & ButtonHTMLAttributes<HTMLButtonElement>;

const HeaderButton = ({
  label,
  icon,
  bg = "white",
  className = "",
  ...props
}: HeaderButtonProps) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2
        py-[11px] px-[14px]
        font-medium text-sm
        border
        rounded-3xl
        ${bgClasses[bg]}
        ${className}
      `}
      {...props}
    >
      <span>{label}</span>
      {icon && <span className="flex items-center">{icon}</span>}
    </button>
  );
};

export default HeaderButton;
