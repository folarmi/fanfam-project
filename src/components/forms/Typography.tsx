/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { type HTMLAttributes, type ReactNode } from "react";

interface TypographyProps extends HTMLAttributes<HTMLParagraphElement> {
  variant:
    | "default"
    | "heading"
    | "titleOne"
    | "titleTwo"
    | "labelOne"
    | "h4"
    | "h5"
    | "h6"
    | "h8"
    | "p1"
    | "p2"
    | "p3"
    | "subtitle1"
    | "subtitle2"
    | "subtitle3"
    | "caption1";
  className?: string;
  children: ReactNode;
  onClick?: any;
  style?: any;
}

const Typography: React.FC<TypographyProps> = ({
  variant = "default",
  className = "",
  onClick,
  style,
  children,
}) => {
  let classes = "";

  // Determine classes based on the variant
  switch (variant) {
    case "heading":
      classes = "text-4xl font-bold";
      break;
    case "titleOne":
      classes = "text-base font-bold";
      break;
    case "titleTwo":
      classes = "text-sm font-bold";
      break;
    case "labelOne":
      classes = "text-xs font-medium leading-[16px]";
      break;
    case "h4":
      classes = "text-2xl font-bold leading-[16px]";
      break;
    case "h5":
      classes = "text-xl font-semibold leading-[16px]";
      break;
    case "h6":
      classes = "text-2xl font-normal leading-[30px]";
      break;
    case "h8":
      classes = "text-2xl font-bold leading-[16px]";
      break;
    case "p1":
      classes = "text-base font-normal leading-5";
      break;
    case "p2":
      classes = "text-[12px] md:text-sm font-normal leading-5";
      break;
    case "p3":
      classes = "text-[12px] font-normal";
      break;
    case "subtitle1":
      classes = "text-base font-medium leading-[20px]";
      break;
    case "subtitle2":
      classes = "text-sm font-medium leading-[18px]";
      break;
    case "subtitle3":
      classes = "text-xs font-medium";
      break;
    case "caption1":
      classes = "text-xs font-normal leading-[16px]";
      break;
    default:
      classes = "text-base";
      break;
  }

  // Concatenate the provided className with the generated classes
  const mergedClassName = `${classes} ${className}`;

  return (
    <p style={style} onClick={onClick} className={mergedClassName}>
      {children}
    </p>
  );
};

export default Typography;
