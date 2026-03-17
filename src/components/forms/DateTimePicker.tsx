// DateTimePicker.tsx
import { useRef } from "react";
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

const CalendarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
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

const formatDate = (iso: string) => {
  if (!iso) return "Pick date";
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (val: string) => {
  if (!val) return "Pick time";
  const [h, m] = val.split(":").map(Number);
  const ampm = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2, "0")}${ampm}`;
};

interface ChipProps {
  label: string;
  icon: React.ReactNode;
  isEmpty: boolean;
  onClick: () => void;
}

const Chip = ({ label, icon, isEmpty, onClick }: ChipProps) => (
  <button
    type="button"
    onClick={onClick}
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "7px",
      padding: "9px 16px",
      borderRadius: "6px",
      border: "none",
      background: "#ECEEFB",
      color: isEmpty ? "#8A94B2" : "#1E2A4A",
      fontSize: "14px",
      fontWeight: 500,
      fontFamily: "'Geist', 'DM Sans', 'Helvetica Neue', sans-serif",
      cursor: "pointer",
      letterSpacing: "-0.01em",
      transition: "background 0.15s, transform 0.1s",
      outline: "none",
      whiteSpace: "nowrap",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.background = "#D8E2FF")}
    onMouseLeave={(e) => (e.currentTarget.style.background = "#E8EEFF")}
    onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
    onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <span style={{ opacity: isEmpty ? 0.5 : 0.7, lineHeight: 0 }}>{icon}</span>
    {label}
  </button>
);

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

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      {label && (
        <label
          style={{
            fontSize: "13px",
            fontWeight: 600,
            color: "#4A5578",
            fontFamily: "'Geist', 'DM Sans', 'Helvetica Neue', sans-serif",
            letterSpacing: "0.01em",
          }}
        >
          {label}
        </label>
      )}

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {/* Date chip */}
        <Controller
          control={control}
          name={dateName}
          render={({ field }) => (
            <div style={{ position: "relative" }}>
              <Chip
                label={formatDate(field.value)}
                icon={<CalendarIcon />}
                isEmpty={!field.value}
                onClick={() =>
                  dateInputRef.current?.showPicker?.() ??
                  dateInputRef.current?.click()
                }
              />
              <input
                ref={dateInputRef}
                type="date"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: "1px",
                  height: "1px",
                  pointerEvents: "none",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          )}
        />

        {/* Time chip */}
        <Controller
          control={control}
          name={timeName}
          render={({ field }) => (
            <div style={{ position: "relative" }}>
              <Chip
                label={formatTime(field.value)}
                icon={<ClockIcon />}
                isEmpty={!field.value}
                onClick={() =>
                  timeInputRef.current?.showPicker?.() ??
                  timeInputRef.current?.click()
                }
              />
              <input
                ref={timeInputRef}
                type="time"
                value={field.value ?? ""}
                onChange={(e) => field.onChange(e.target.value)}
                style={{
                  position: "absolute",
                  opacity: 0,
                  width: "1px",
                  height: "1px",
                  pointerEvents: "none",
                  top: 0,
                  left: 0,
                }}
              />
            </div>
          )}
        />
      </div>
    </div>
  );
}
