import type { ButtonHTMLAttributes, ReactNode } from "react";

type HeaderButtonProps = {
  label: string;
  icon?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const HeaderButton = ({
  label,
  icon,
  className = "",
  ...props
}: HeaderButtonProps) => {
  return (
    <button
      className={`
        flex items-center justify-center gap-2
        py-[11px] px-[14px]
        font-medium text-sm
        bg-white_200 border border-primary
        rounded-3xl text-black
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
