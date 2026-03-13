// /* eslint-disable @typescript-eslint/no-explicit-any */
// import {
//   Controller,
//   type Control,
//   type RegisterOptions,
// } from "react-hook-form";

// interface TextAreaFieldProps {
//   name: string;
//   control: Control<any>;
//   rules?: RegisterOptions;
//   placeholder?: string;
//   rows?: number;
//   cols?: number;
//   readOnly?: boolean;
//   onFocus?: () => void;
//   onBlur?: () => void;
//   className?: string;
//   borderRadius?: string;
// }

// const CustomTextArea = ({
//   name,
//   control,
//   rules,
//   placeholder = " ",
//   rows = 5,
//   cols = 5,
//   readOnly = false,
//   onFocus,
//   className = "",
// }: TextAreaFieldProps) => {
//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field, fieldState: { error } }) => (
//         <div className={`flex flex-col gap-2 mb-6 w-full ${className}`}>
//           <textarea
//             readOnly={readOnly}
//             id={name}
//             name={field.name}
//             ref={field.ref}
//             onChange={field.onChange}
//             rows={rows}
//             cols={cols}
//             className="w-full outline-none pt-3 bg-grey_20"
//             placeholder={placeholder}
//             value={field.value || ""}
//             onFocus={() => {
//               if (onFocus) onFocus();
//             }}
//             style={{
//               backgroundColor: readOnly ? "hsl(0,0%, 90%)" : "",
//               cursor: readOnly ? "not-allowed" : "initial",
//             }}
//           />

//           {error && (
//             <span className="text-red-500 text-xs">{error.message}</span>
//           )}
//         </div>
//       )}
//     />
//   );
// };

// export { CustomTextArea };

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  type Control,
  type RegisterOptions,
} from "react-hook-form";

interface TextAreaFieldProps {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  placeholder?: string;
  rows?: number;
  cols?: number;
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
}

const CustomTextArea = ({
  name,
  control,
  rules,
  placeholder = "Write something…",
  rows = 5,
  readOnly = false,
  onFocus,
  onBlur,
  className = "",
}: TextAreaFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={`relative w-full group ${className}`}>
          <textarea
            readOnly={readOnly}
            id={name}
            name={field.name}
            ref={field.ref}
            onChange={field.onChange}
            rows={rows}
            value={field.value || ""}
            placeholder={placeholder}
            onFocus={onFocus}
            onBlur={() => {
              field.onBlur();
              onBlur?.();
            }}
            style={{
              cursor: readOnly ? "not-allowed" : "text",
              resize: "none",
            }}
            className={[
              // Base layout
              "w-full px-0 py-2",
              // Typography
              "text-sm text-gray-900 placeholder-gray-400 leading-relaxed",
              // Background — transparent, sits on parent bg
              "bg-transparent",
              // Border — only bottom, transitions to brand colour on focus
              "border-0 border-b border-gray-200",
              "focus:border-blue_20 focus:outline-none",
              "transition-colors duration-200",
              // Disabled / readonly state
              readOnly ? "opacity-50" : "",
              // Break long words so text never overflows
              "break-words whitespace-pre-wrap overflow-auto",
            ]
              .filter(Boolean)
              .join(" ")}
          />

          {/* Animated underline accent */}
          <span
            className={[
              "absolute bottom-0 left-0 h-[2px] bg-blue_20",
              "w-0 group-focus-within:w-full",
              "transition-all duration-300 ease-out",
            ].join(" ")}
          />

          {error && (
            <span className="mt-1 flex items-center gap-1 text-xs text-red-500">
              {/* Inline warning dot */}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {error.message}
            </span>
          )}
        </div>
      )}
    />
  );
};

export { CustomTextArea };
