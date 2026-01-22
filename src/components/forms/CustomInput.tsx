/* eslint-disable @typescript-eslint/no-explicit-any */
// import { CheckCircle2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { useController, type UseControllerProps } from "react-hook-form";

// interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   name: string;
//   control: any;
//   rules?: UseControllerProps["rules"];
//   label?: string;
//   readOnly?: boolean;
//   isVerified?: boolean;
//   type?: string;
//   borderRadius?: string;
//   className?: string;
//   multiline?: boolean;
//   onFocus?: () => void;
//   onBlur?: () => void;
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//   name,
//   control,
//   rules,
//   label,
//   readOnly,
//   type,
//   className,
//   borderRadius = "3xl",
//   onFocus,
//   onBlur,
//   isVerified,
//   ...rest
// }) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//     rules,
//   });

//   const [isFocused, setIsFocused] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   useEffect(() => {
//     if (field.value) {
//       setIsFocused(true);
//     }
//   }, [field.value]);

//   return (
//     // <div className={`relative flex flex-col gap-2 mb-6 w-full ${className}`}>
//     //   <input
//     //     readOnly={readOnly}
//     //     id={name}
//     //     type={showPassword ? "text" : type}
//     //     {...field}
//     //     {...rest}
//     //     className={`block w-full h-12 rounded-${borderRadius} px-4 text-sm bg-white border appearance-none focus:outline-none focus:ring-0 peer ${
//     //       error
//     //         ? "border border-red-500"
//     //         : "border-gray-300 focus:border-primary"
//     //     }`}
//     //     placeholder=" "
//     //     value={field.value || ""}
//     //     onFocus={() => {
//     //       setIsFocused(true);
//     //       if (onFocus) onFocus();
//     //     }}
//     //     // onBlur={() => setIsFocused(!!field.value)}
//     //     onBlur={() => {
//     //       field.onBlur(); // ✅ preserve react-hook-form’s built-in blur handling
//     //       setIsFocused(!!field.value);
//     //       if (onBlur) onBlur(); // ✅ trigger parent onBlur logic (e.g. mutation)
//     //     }}
//     //     style={{
//     //       backgroundColor: readOnly ? "hsl(0,0%, 90%)" : "",
//     //       cursor: readOnly ? "not-allowed" : "initial",
//     //     }}
//     //   />

//     //   {type === "password" && (
//     //     <button
//     //       type="button"
//     //       onClick={togglePasswordVisibility}
//     //       className="absolute right-4 top-3 text-gray-500 focus:outline-none"
//     //     >
//     //       {showPassword ? "👁️" : "🙈"}
//     //     </button>
//     //   )}

//     //   <label
//     //     htmlFor={name}
//     //     className={`absolute left-4 text-sm font-normal text-grey_200 duration-300 transform scale-75 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-4 ${
//     //       isFocused || field.value
//     //         ? "-translate-y-4 scale-75"
//     //         : "top-1/2 transform -translate-y-2 scale-100"
//     //     }`}
//     //   >
//     //     {label}
//     //   </label>
//     //   {error && <span className="text-red-500 text-xs">{error.message}</span>}
//     // </div>

//     <div className={`relative flex flex-col gap-2 mb-6 w-full ${className}`}>
//       <input
//         readOnly={readOnly}
//         id={name}
//         type={showPassword ? "text" : type}
//         {...field}
//         {...rest}
//         className={`block w-full h-12 rounded-${borderRadius} px-4 text-sm bg-white border appearance-none focus:outline-none focus:ring-0 peer ${
//           error
//             ? "border border-red-500"
//             : "border-gray-300 focus:border-primary"
//         } ${isVerified ? "pr-12" : ""}`} // Add padding-right when verified icon is shown
//         placeholder=" "
//         value={field.value || ""}
//         onFocus={() => {
//           setIsFocused(true);
//           if (onFocus) onFocus();
//         }}
//         onBlur={() => {
//           field.onBlur();
//           setIsFocused(!!field.value);
//           if (onBlur) onBlur();
//         }}
//         style={{
//           backgroundColor: readOnly ? "hsl(0,0%, 90%)" : "",
//           cursor: readOnly ? "not-allowed" : "initial",
//         }}
//       />

//       {/* Verification Icon */}
//       {isVerified && (
//         <div className="absolute right-4 top-1/2 transform -translate-y-1/2 ">
//           <CheckCircle2 className="text-green-500" />
//         </div>
//       )}

//       {/* Password Toggle */}
//       {type === "password" && (
//         <button
//           type="button"
//           onClick={togglePasswordVisibility}
//           className="absolute right-4 top-3 text-gray-500 focus:outline-none"
//         >
//           {showPassword ? "👁️" : "🙈"}
//         </button>
//       )}

//       <label
//         htmlFor={name}
//         className={`absolute left-4 text-sm font-normal text-grey_200 duration-300 transform scale-75 origin-[0] peer-focus:scale-75 peer-focus:-translate-y-4 ${
//           isFocused || field.value
//             ? "-translate-y-4 scale-75"
//             : "top-1/2 transform -translate-y-2 scale-100"
//         }`}
//       >
//         {label}
//       </label>
//       {error && <span className="text-red-500 text-xs">{error.message}</span>}
//     </div>
//   );
// };

// export default CustomInput;

// Chat gpt version
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
    if (type === "password" || isVerified) return "pr-14";
    return "pr-4";
  }, [type, isVerified]);

  const isFloating = isFocused || !!field.value;

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
              className="h-8 w-8 grid place-items-center rounded-full text-gray-500 hover:bg-gray-100"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          )}
        </div>
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default CustomInput;

// Claude version
// import { useEffect, useState } from "react";
// import { useController, type UseControllerProps } from "react-hook-form";

// interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   name: string;
//   control: any;
//   rules?: UseControllerProps["rules"];
//   label?: string;
//   type?: string;
//   className?: string;
// }

// const CustomInput: React.FC<CustomInputProps> = ({
//   name,
//   control,
//   rules,
//   label,
//   type = "text",
//   className,
//   ...rest
// }) => {
//   const {
//     field,
//     fieldState: { error },
//   } = useController({
//     name,
//     control,
//     rules,
//   });

//   const [isFocused, setIsFocused] = useState(false);

//   useEffect(() => {
//     if (field.value) {
//       setIsFocused(true);
//     }
//   }, [field.value]);

//   return (
//     <div className={`relative w-full mb-6 ${className}`}>
//       <input
//         id={name}
//         type={type}
//         {...field}
//         {...rest}
//         className="block w-full h-12 rounded-full px-6 text-sm bg-white border-0 appearance-none focus:outline-none focus:ring-0 peer shadow-sm"
//         placeholder=" "
//         value={field.value || ""}
//         onFocus={() => setIsFocused(true)}
//         onBlur={() => {
//           field.onBlur();
//           setIsFocused(!!field.value);
//         }}
//       />

//       <label
//         htmlFor={name}
//         className={`absolute left-6 text-gray-400 duration-200 transform origin-left pointer-events-none ${
//           isFocused || field.value
//             ? "top-4 text-xs scale-90"
//             : "top-1/2 -translate-y-1/2 text-base scale-100"
//         }`}
//       >
//         {label}
//       </label>

//       {error && (
//         <span className="text-red-500 text-xs mt-1 ml-6 block">
//           {error.message}
//         </span>
//       )}
//     </div>
//   );
// };

// export default CustomInput;
