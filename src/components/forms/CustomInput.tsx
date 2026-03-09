/* eslint-disable @typescript-eslint/no-explicit-any */


import { CheckCircle2, Eye, EyeOff } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useController, type UseControllerProps } from "react-hook-form";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  label?: string;
  readOnly?: boolean;
  isVerified?: boolean;
  type?: string;
  borderRadius?: "md" | "lg" | "xl" | "2xl" | "3xl";
  className?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  rightIcon?: React.ReactNode;
}

const radiusMap = {
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
} as const;

const CustomInput: React.FC<CustomInputProps> = ({
  name,
  control,
  rules,
  label,
  readOnly,
  type = "text",
  className,
  borderRadius = "3xl",
  onFocus,
  onBlur,
  isVerified,
  rightIcon,
  ...rest
}) => {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (field.value) setIsFocused(true);
  }, [field.value]);

  const rightSlotWidth = useMemo(() => {
    // allocate room so text never runs under icons
    if (type === "password" && isVerified) return "pr-20";
    if (type === "password" || isVerified || rightIcon) return "pr-14";
    return "pr-4";
  }, [type, isVerified, rightIcon]);

  const isFloating = isFocused || !!field.value || type === "date" || type === "time";

  return (
    <div className={`w-full mb-6 ${className ?? ""}`}>
      <div className="relative">
        <input
          {...field}
          {...rest}
          id={name}
          readOnly={readOnly}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          value={field.value ?? ""}
          onFocus={() => {
            setIsFocused(true);
            onFocus?.();
          }}
          onBlur={() => {
            field.onBlur();
            setIsFocused(!!field.value);
            onBlur?.();
          }}
          placeholder={label ? " " : rest.placeholder}
          className={[
            "peer w-full h-12 bg-white border text-sm outline-none transition",
            "px-4 pt-5 pb-2", // ✅ reserves space for the label
            rightSlotWidth,
            radiusMap[borderRadius],
            error
              ? "border-red-500 focus:border-red-500"
              : "border-gray-300 focus:border-primary",
            readOnly ? "bg-gray-100 cursor-not-allowed text-gray-600" : "",
            type === "date" ? "[&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3 [&::-webkit-calendar-picker-indicator]:w-8 [&::-webkit-calendar-picker-indicator]:h-8 [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:z-10" : "",
          ].join(" ")}
        />

        {label && (
          <label
            htmlFor={name}
            className={[
              "absolute left-4 pointer-events-none select-none transition-all",
              isFloating
                ? "top-2 text-[11px] text-gray-500"
                : "top-1/2 -translate-y-1/2 text-sm text-gray-400",
            ].join(" ")}
          >
            {label}
          </label>
        )}

        {/* Right side icons */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {isVerified && <CheckCircle2 className="h-5 w-5 text-green-500" />}

          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="h-8 w-8 grid place-items-center rounded-full text-gray-500 hover:bg-gray-100 relative z-20"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}

          {rightIcon && (
            <div className="h-8 w-8 grid place-items-center text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default CustomInput;


