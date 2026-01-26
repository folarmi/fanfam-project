import type { HTMLAttributes } from "react";

type HeaderTextColor = "default" | "muted" | "primary" | "inverse" | "danger";

type HeaderTextProps = {
  text: string;
  color?: HeaderTextColor;
} & HTMLAttributes<HTMLSpanElement>;

const colorClasses: Record<HeaderTextColor, string> = {
  default: "text-white",
  muted: "text-black",
  primary: "text-primary",
  inverse: "text-white",
  danger: "text-red-500",
};

const HeaderText = ({
  text,
  color = "default",
  className = "",
  ...props
}: HeaderTextProps) => {
  return (
    <span
      className={`
        text-[64px] font-bold font-clash
        ${colorClasses[color]}
        ${className}
      `}
      {...props}
    >
      {text}
    </span>
  );
};

export default HeaderText;
