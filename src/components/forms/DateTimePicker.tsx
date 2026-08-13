// // DateTimePicker.tsx
// import { useRef } from "react";
// import {
//   Controller,
//   type Control,
//   type FieldValues,
//   type Path,
// } from "react-hook-form";

// const CalendarIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
//   <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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

// const formatDate = (iso: string) => {
//   if (!iso) return "Pick date";
//   const d = new Date(iso + "T00:00:00");
//   return d.toLocaleDateString("en-US", {
//     month: "short",
//     day: "numeric",
//     year: "numeric",
//   });
// };

// const formatTime = (val: string) => {
//   if (!val) return "Pick time";
//   const [h, m] = val.split(":").map(Number);
//   const ampm = h >= 12 ? "pm" : "am";
//   const hour = h % 12 || 12;
//   return `${hour}:${String(m).padStart(2, "0")}${ampm}`;
// };

// interface ChipProps {
//   label: string;
//   icon: React.ReactNode;
//   isEmpty: boolean;
//   onClick: () => void;
// }

// const Chip = ({ label, icon, isEmpty, onClick }: ChipProps) => (
//   <button
//     type="button"
//     onClick={onClick}
//     style={{
//       display: "inline-flex",
//       alignItems: "center",
//       gap: "7px",
//       padding: "9px 16px",
//       borderRadius: "6px",
//       border: "none",
//       background: "#ECEEFB",
//       color: isEmpty ? "#8A94B2" : "#1E2A4A",
//       fontSize: "14px",
//       fontWeight: 500,
//       fontFamily: "'Geist', 'DM Sans', 'Helvetica Neue', sans-serif",
//       cursor: "pointer",
//       letterSpacing: "-0.01em",
//       transition: "background 0.15s, transform 0.1s",
//       outline: "none",
//       whiteSpace: "nowrap",
//     }}
//     onMouseEnter={(e) => (e.currentTarget.style.background = "#D8E2FF")}
//     onMouseLeave={(e) => (e.currentTarget.style.background = "#E8EEFF")}
//     onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
//     onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
//   >
//     <span style={{ opacity: isEmpty ? 0.5 : 0.7, lineHeight: 0 }}>{icon}</span>
//     {label}
//   </button>
// );

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

//   return (
//     <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
//       {label && (
//         <label
//           style={{
//             fontSize: "13px",
//             fontWeight: 600,
//             color: "#4A5578",
//             fontFamily: "'Geist', 'DM Sans', 'Helvetica Neue', sans-serif",
//             letterSpacing: "0.01em",
//           }}
//         >
//           {label}
//         </label>
//       )}

//       <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
//         {/* Date chip */}
//         <Controller
//           control={control}
//           name={dateName}
//           render={({ field }) => (
//             <div style={{ position: "relative" }}>
//               <Chip
//                 label={formatDate(field.value)}
//                 icon={<CalendarIcon />}
//                 isEmpty={!field.value}
//                 onClick={() =>
//                   dateInputRef.current?.showPicker?.() ??
//                   dateInputRef.current?.click()
//                 }
//               />
//               <input
//                 ref={dateInputRef}
//                 type="date"
//                 value={field.value ?? ""}
//                 onChange={(e) => field.onChange(e.target.value)}
//                 style={{
//                   position: "absolute",
//                   opacity: 0,
//                   width: "1px",
//                   height: "1px",
//                   pointerEvents: "none",
//                   top: 0,
//                   left: 0,
//                 }}
//               />
//             </div>
//           )}
//         />

//         {/* Time chip */}
//         <Controller
//           control={control}
//           name={timeName}
//           render={({ field }) => (
//             <div style={{ position: "relative" }}>
//               <Chip
//                 label={formatTime(field.value)}
//                 icon={<ClockIcon />}
//                 isEmpty={!field.value}
//                 onClick={() =>
//                   timeInputRef.current?.showPicker?.() ??
//                   timeInputRef.current?.click()
//                 }
//               />
//               <input
//                 ref={timeInputRef}
//                 type="time"
//                 value={field.value ?? ""}
//                 onChange={(e) => field.onChange(e.target.value)}
//                 style={{
//                   position: "absolute",
//                   opacity: 0,
//                   width: "1px",
//                   height: "1px",
//                   pointerEvents: "none",
//                   top: 0,
//                   left: 0,
//                 }}
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
  if (!value) return "Pick date";

  const date = new Date(`${value}T00:00:00`);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (value: string) => {
  if (!value) return "Pick time";

  const [hourValue, minuteValue] = value.split(":").map(Number);

  const period = hourValue >= 12 ? "pm" : "am";
  const hour = hourValue % 12 || 12;

  return `${hour}:${String(minuteValue).padStart(2, "0")}${period}`;
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
        flex h-11 w-full min-w-0 items-center justify-center gap-2
        rounded-lg bg-[#ECEEFB] px-3
        text-sm font-medium transition-colors
        hover:bg-[#D8E2FF]
        active:bg-[#CBD8FF]
        sm:px-4
        ${isEmpty ? "text-[#8A94B2]" : "text-[#1E2A4A]"}
      `}
    >
      <span
        className={`shrink-0 leading-none ${
          isEmpty ? "opacity-50" : "opacity-70"
        }`}
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

      <div className="grid w-full grid-cols-2 gap-2">
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
                className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
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
                className="pointer-events-none absolute left-0 top-0 h-px w-px opacity-0"
                tabIndex={-1}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
