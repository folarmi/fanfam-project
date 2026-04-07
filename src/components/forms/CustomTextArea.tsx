// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
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
//   readOnly?: boolean;
//   onFocus?: () => void;
//   onBlur?: () => void;
//   /** Applied to the outer wrapper div, not the textarea itself */
//   className?: string;
// }

// const CustomTextArea = ({
//   name,
//   control,
//   rules,
//   placeholder = "Write something…",
//   rows = 5,
//   readOnly = false,
//   onFocus,
//   onBlur,
//   className = "",
// }: TextAreaFieldProps) => {
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <Controller
//       name={name}
//       control={control}
//       rules={rules}
//       render={({ field, fieldState: { error } }) => {
//         const borderColor = error
//           ? "border-red-400"
//           : isFocused
//             ? "border-primary"
//             : "border-grey_10";

//         return (
//           <div className={`w-full ${className}`}>
//             {/* Card wrapper — border carries all state feedback */}
//             <div
//               className={`
//                 bg-grey_20 rounded-xl border-2 transition-colors duration-200
//                 ${borderColor}
//                 ${readOnly ? "opacity-60" : ""}
//               `}
//             >
//               <textarea
//                 readOnly={readOnly}
//                 id={name}
//                 name={field.name}
//                 ref={field.ref}
//                 onChange={field.onChange}
//                 rows={rows}
//                 value={field.value || ""}
//                 placeholder={placeholder}
//                 onFocus={() => {
//                   setIsFocused(true);
//                   onFocus?.();
//                 }}
//                 onBlur={() => {
//                   setIsFocused(false);
//                   field.onBlur();
//                   onBlur?.();
//                 }}
//                 style={{
//                   resize: "none",
//                   cursor: readOnly ? "not-allowed" : "text",
//                 }}
//                 className="
//                   w-full px-4 pt-4 pb-2
//                   bg-transparent outline-none
//                   text-sm text-grey_400 placeholder-grey_60
//                   leading-relaxed break-words whitespace-pre-wrap
//                 "
//               />
//             </div>

//             {/* Error message — sits below the card, not inside it */}
//             {error && (
//               <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
//                 <svg
//                   width="12"
//                   height="12"
//                   viewBox="0 0 24 24"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   className="flex-shrink-0"
//                 >
//                   <circle cx="12" cy="12" r="10" />
//                   <line x1="12" y1="8" x2="12" y2="12" />
//                   <line x1="12" y1="16" x2="12.01" y2="16" />
//                 </svg>
//                 {error.message}
//               </p>
//             )}
//           </div>
//         );
//       }}
//     />
//   );
// };

// export { CustomTextArea };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
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
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  // ← Add these three
  textareaRef?: React.RefObject<HTMLTextAreaElement | null>;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
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
  textareaRef,
  onChange,
  onKeyDown,
}: TextAreaFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => {
        const borderColor = error
          ? "border-red-400"
          : isFocused
            ? "border-primary"
            : "border-grey_10";

        return (
          <div className={`w-full ${className}`}>
            <div
              className={`
                bg-grey_20 rounded-xl border-2 transition-colors duration-200
                ${borderColor}
                ${readOnly ? "opacity-60" : ""}
              `}
            >
              <textarea
                readOnly={readOnly}
                id={name}
                name={field.name}
                // ← Merge RHF's ref with the external textareaRef
                ref={(el) => {
                  field.ref(el);
                  if (textareaRef) {
                    (
                      textareaRef as React.MutableRefObject<HTMLTextAreaElement | null>
                    ).current = el;
                  }
                }}
                rows={rows}
                value={field.value || ""}
                placeholder={placeholder}
                onFocus={() => {
                  setIsFocused(true);
                  onFocus?.();
                }}
                onBlur={() => {
                  setIsFocused(false);
                  field.onBlur();
                  onBlur?.();
                }}
                // ← Call both RHF's onChange and the external one
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.(e);
                }}
                onKeyDown={onKeyDown}
                style={{
                  resize: "none",
                  cursor: readOnly ? "not-allowed" : "text",
                }}
                className="
                  w-full px-4 pt-4 pb-2
                  bg-transparent outline-none
                  text-sm text-grey_400 placeholder-grey_60
                  leading-relaxed break-words whitespace-pre-wrap
                "
              />
            </div>

            {error && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs text-red-500">
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  className="flex-shrink-0"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                {error.message}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export { CustomTextArea };
