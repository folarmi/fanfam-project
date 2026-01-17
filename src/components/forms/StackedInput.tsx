import React from "react";
import {
  useController,
  type Control,
  type FieldValues,
  type Path,
  type RegisterOptions,
} from "react-hook-form";

type Radius = "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";

const radiusClass: Record<Radius, string> = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  "2xl": "rounded-2xl",
  "3xl": "rounded-3xl",
  full: "rounded-full",
};

type TextColor = "white" | "black" | "grey";

const labelColorClass: Record<TextColor, string> = {
  white: "text-white",
  black: "text-black",
  grey: "text-grey_200",
};

type BorderStyle = "none" | "light" | "primary";

const borderClass: Record<BorderStyle, string> = {
  none: "border-transparent",
  light: "border-gray-200",
  primary: "border-primary",
};

export interface StackedInputProps<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "name"> {
  name: TName;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label: string;

  /** styling */
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;

  labelColor?: TextColor;
  borderRadius?: Radius;
  borderStyle?: BorderStyle;

  /** behavior */
  readOnly?: boolean;
}

export default function StackedInput<
  TFieldValues extends FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>,
>({
  name,
  control,
  rules,
  label,
  wrapperClassName,
  labelClassName,
  inputClassName,
  labelColor = "white",
  borderRadius = "xl",
  borderStyle = "light",
  readOnly,
  type = "text",
  ...rest
}: StackedInputProps<TFieldValues, TName>) {
  const {
    field,
    fieldState: { error },
  } = useController({ name, control, rules });

  return (
    <div className={`flex flex-col gap-2 w-full ${wrapperClassName ?? ""}`}>
      <label
        htmlFor={name}
        className={`text-xs font-medium ${labelColorClass[labelColor]} ${
          labelClassName ?? ""
        }`}
      >
        {label}
      </label>

      <input
        id={name}
        type={type}
        readOnly={readOnly}
        {...field}
        {...rest}
        value={field.value ?? ""}
        className={[
          "w-full h-12 px-4 text-sm bg-white outline-none",
          "border",
          radiusClass[borderRadius],
          error ? "border-red-500" : borderClass[borderStyle],
          readOnly ? "bg-[#E5E5E5] cursor-not-allowed" : "",
          inputClassName ?? "",
        ].join(" ")}
      />

      {error?.message ? (
        <p className="text-xs text-red-500">{error.message}</p>
      ) : null}
    </div>
  );
}
