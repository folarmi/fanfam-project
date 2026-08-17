// import { useRef, type ReactNode } from "react";
// import {
//   Controller,
//   type Control,
//   type FieldValues,
//   type Path,
// } from "react-hook-form";

// const CalendarIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//     <rect
//       x="1"
//       y="3"
//       width="14"
//       height="12"
//       rx="2"
//       stroke="currentColor"
//       strokeWidth="1.5"
//     />
//     <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
//     <path
//       d="M5 1v4M11 1v4"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//     />
//   </svg>
// );

// const ClockIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//     <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />
//     <path
//       d="M8 5v3.5l2 2"
//       stroke="currentColor"
//       strokeWidth="1.5"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     />
//   </svg>
// );

// const formatDate = (value: string) => {
//   if (!value) return "Pick date";

//   const date = new Date(`${value}T00:00:00`);

//   return date.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatTime = (value: string) => {
//   if (!value) return "Pick time";

//   const [hourValue, minuteValue] = value.split(":").map(Number);

//   const period = hourValue >= 12 ? "pm" : "am";
//   const hour = hourValue % 12 || 12;

//   return `${hour}:${String(minuteValue).padStart(2, "0")}${period}`;
// };

// interface ChipProps {
//   label: string;
//   icon: ReactNode;
//   isEmpty: boolean;
//   onClick: () => void;
// }

// const Chip = ({ label, icon, isEmpty, onClick }: ChipProps) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className={`
//         flex h-11 w-full min-w-0 items-center justify-center gap-2
//         rounded-lg bg-[#ECEEFB] px-3
//         text-sm font-medium transition-colors
//         hover:bg-[#D8E2FF]
//         active:bg-[#CBD8FF]
//         sm:px-4
//         ${isEmpty ? "text-[#8A94B2]" : "text-[#1E2A4A]"}
//       `}
//     >
//       <span
//         className={`shrink-0 leading-none ${
//           isEmpty ? "opacity-50" : "opacity-70"
//         }`}
//       >
//         {icon}
//       </span>

//       <span className="min-w-0 truncate whitespace-nowrap">{label}</span>
//     </button>
//   );
// };

// interface DateTimePickerProps<T extends FieldValues> {
//   control: Control<T>;
//   dateName: Path<T>;
//   timeName: Path<T>;
//   label?: string;
// }

// export function DateTimePicker<T extends FieldValues>({
//   control,
//   dateName,
//   timeName,
//   label,
// }: DateTimePickerProps<T>) {
//   const dateInputRef = useRef<HTMLInputElement>(null);
//   const timeInputRef = useRef<HTMLInputElement>(null);

//   const openPicker = (input: HTMLInputElement | null) => {
//     if (!input) return;

//     if (typeof input.showPicker === "function") {
//       input.showPicker();
//       return;
//     }

//     input.click();
//   };

//   return (
//     <div className="w-full">
//       {label && (
//         <label className="mb-2 block text-[13px] font-semibold text-[#4A5578]">
//           {label}
//         </label>
//       )}

//       <div className="grid w-full grid-cols-2 gap-2">
//         {/* Date */}
//         <Controller
//           control={control}
//           name={dateName}
//           render={({ field }) => (
//             <div className="relative min-w-0">
//               <Chip
//                 label={formatDate(field.value)}
//                 icon={<CalendarIcon />}
//                 isEmpty={!field.value}
//                 onClick={() => openPicker(dateInputRef.current)}
//               />

//               <input
//                 ref={dateInputRef}
//                 type="date"
//                 value={field.value ?? ""}
//                 onChange={(event) => field.onChange(event.target.value)}
//                 onBlur={field.onBlur}
//                 className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
//                 tabIndex={-1}
//               />
//             </div>
//           )}
//         />

//         {/* Time */}
//         <Controller
//           control={control}
//           name={timeName}
//           render={({ field }) => (
//             <div className="relative min-w-0">
//               <Chip
//                 label={formatTime(field.value)}
//                 icon={<ClockIcon />}
//                 isEmpty={!field.value}
//                 onClick={() => openPicker(timeInputRef.current)}
//               />

//               <input
//                 ref={timeInputRef}
//                 type="time"
//                 value={field.value ?? ""}
//                 onChange={(event) => field.onChange(event.target.value)}
//                 onBlur={field.onBlur}
//                 className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
//                 tabIndex={-1}
//               />
//             </div>
//           )}
//         />
//       </div>
//     </div>
//   );
// }

import { useRef, type ReactNode } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="1"
      y="3"
      width="14"
      height="12"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path d="M1 7h14" stroke="currentColor" strokeWidth="1.5" />
    <path
      d="M5 1v4M11 1v4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.5" />

    <path
      d="M8 5v3.5l2 2"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const formatDate = (value: string) => {
  if (!value) return "Select Day";

  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value: string) => {
  if (!value) return "Select Time";

  const [hourValue, minuteValue] = value.split(":").map(Number);

  const period = hourValue >= 12 ? "pm" : "am";
  const hour = hourValue % 12 || 12;

  return `${hour}:${String(minuteValue).padStart(2, "0")} ${period}`;
};

interface ChipProps {
  label: string;
  icon: ReactNode;
  isEmpty: boolean;
  onClick: () => void;
}

const Chip = ({ label, icon, isEmpty, onClick }: ChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        h-12
        w-full
        min-w-0
        items-center
        justify-center
        gap-2
        rounded-xl
        bg-[#F1F1FF]
        px-3
        text-base
        font-normal
        transition-colors
        hover:bg-[#E8E9FA]
        active:bg-[#DFE1F7]

        sm:h-11
        sm:rounded-lg
        sm:px-4
        sm:text-sm
        sm:font-medium

        ${isEmpty ? "text-[#4B4B5A]" : "text-[#1E2A4A]"}
      `}
    >
      {/* Icons hidden on mobile to match QA design */}
      <span
        className={`
          hidden
          shrink-0
          leading-none
          sm:inline-flex
          ${isEmpty ? "opacity-50" : "opacity-70"}
        `}
      >
        {icon}
      </span>

      <span className="min-w-0 truncate whitespace-nowrap">{label}</span>
    </button>
  );
};

interface DateTimePickerProps<T extends FieldValues> {
  control: Control<T>;
  dateName: Path<T>;
  timeName: Path<T>;
  label?: string;
}

export function DateTimePicker<T extends FieldValues>({
  control,
  dateName,
  timeName,
  label,
}: DateTimePickerProps<T>) {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const timeInputRef = useRef<HTMLInputElement>(null);

  const openPicker = (input: HTMLInputElement | null) => {
    if (!input) return;

    if (typeof input.showPicker === "function") {
      input.showPicker();
      return;
    }

    input.click();
  };

  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-[13px] font-semibold text-[#4A5578]">
          {label}
        </label>
      )}

      {/* 
        Mobile:
        One bordered container around both controls.

        Desktop:
        Remove outer border/padding and retain original layout.
      */}
      <div
        className="
          w-full
          rounded-xl
          border
          border-[#B8B8B8]
          bg-white
          p-4

          sm:rounded-none
          sm:border-0
          sm:bg-transparent
          sm:p-0
        "
      >
        <div className="grid w-full grid-cols-2 gap-4 sm:gap-2">
          {/* Date */}
          <Controller
            control={control}
            name={dateName}
            render={({ field }) => (
              <div className="relative min-w-0">
                <Chip
                  label={formatDate(field.value)}
                  icon={<CalendarIcon />}
                  isEmpty={!field.value}
                  onClick={() => openPicker(dateInputRef.current)}
                />

                <input
                  ref={dateInputRef}
                  type="date"
                  value={field.value ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                  onBlur={field.onBlur}
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-px
                    w-px
                    opacity-0
                  "
                  tabIndex={-1}
                />
              </div>
            )}
          />

          {/* Time */}
          <Controller
            control={control}
            name={timeName}
            render={({ field }) => (
              <div className="relative min-w-0">
                <Chip
                  label={formatTime(field.value)}
                  icon={<ClockIcon />}
                  isEmpty={!field.value}
                  onClick={() => openPicker(timeInputRef.current)}
                />

                <input
                  ref={timeInputRef}
                  type="time"
                  value={field.value ?? ""}
                  onChange={(event) => field.onChange(event.target.value)}
                  onBlur={field.onBlur}
                  className="
                    pointer-events-none
                    absolute
                    left-0
                    top-0
                    h-px
                    w-px
                    opacity-0
                  "
                  tabIndex={-1}
                />
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
}
