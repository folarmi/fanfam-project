interface Requirement {
  label: string;
  test: (value: string) => boolean;
}

interface PasswordStrengthChecklistProps {
  value?: string;
  className?: string;
  requirements?: Requirement[];
}

const defaultRequirements: Requirement[] = [
  { label: "At least 8 characters", test: (val) => val.length >= 8 },
  { label: "Uppercase letter", test: (val) => /[A-Z]/.test(val) },
  { label: "Lowercase letter", test: (val) => /[a-z]/.test(val) },
  { label: "Number", test: (val) => /\d/.test(val) },
  { label: "Special character", test: (val) => /[^A-Za-z0-9]/.test(val) },
];

const strengthConfig = [
  { label: "Weak", color: "#FC0404", track: "#FFD1D1" },
  { label: "Fair", color: "#F69625", track: "#FDE8C8" },
  { label: "Good", color: "#F69625", track: "#FDE8C8" },
  { label: "Strong", color: "#29AF1D", track: "#EFFAED" },
  { label: "Secure", color: "#29AF1D", track: "#EFFAED" },
];

const PasswordStrengthChecklist = ({
  value = "",
  className = "",
  requirements = defaultRequirements,
}: PasswordStrengthChecklistProps) => {
  const metCount = requirements.filter((r) => r.test(value)).length;
  const total = requirements.length;
  const pct = total > 0 ? (metCount / total) * 100 : 0;
  const strengthIndex =
    value.length === 0 ? -1 : Math.min(metCount - 1, strengthConfig.length - 1);
  const strength = strengthIndex >= 0 ? strengthConfig[strengthIndex] : null;

  return (
    <div
      className={`rounded-2xl p-4 space-y-4 ${className}`}
      style={{
        backgroundColor: "#FAFAFA", // grey_20
        border: "1px solid #E7E8F1", // grey_40
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header: label + strength badge */}
      <div className="flex justify-between items-center">
        <span
          className="text-[11px] font-semibold tracking-widest uppercase"
          style={{ color: "#8D8E96" /* grey_400 */ }}
        >
          Password Strength
        </span>
        {strength ? (
          <span
            className="text-[11px] font-semibold px-2 py-0.5 rounded-full transition-all duration-500"
            style={{
              color: strength.color,
              backgroundColor: strength.track,
            }}
          >
            {strength.label}
          </span>
        ) : (
          <span
            className="text-[11px] font-medium px-2 py-0.5 rounded-full"
            style={{ color: "#BDBFC9", backgroundColor: "#F3F4FC" }}
          >
            None
          </span>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 w-full rounded-full overflow-hidden"
        style={{ backgroundColor: "#E7E8F1" /* grey_40 */ }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            backgroundColor: strength?.color ?? "#D3D5E0",
          }}
        />
      </div>

      {/* Segment track */}
      <div className="flex gap-1.5">
        {requirements.map((req, idx) => {
          const met = req.test(value);
          return (
            <div
              key={idx}
              className="h-0.5 flex-1 rounded-full transition-all duration-300"
              style={{
                backgroundColor: met ? strength?.color : "#E0E2EE",
                transitionDelay: `${idx * 40}ms`,
              }}
            />
          );
        })}
      </div>

      {/* Checklist */}
      <ul className="space-y-2.5">
        {requirements.map((req, idx) => {
          const met = req.test(value);
          return (
            <li
              key={idx}
              className="flex items-center gap-3 transition-all duration-300"
              style={{ transitionDelay: `${idx * 30}ms` }}
            >
              {/* Indicator dot */}
              <span
                className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-all duration-300"
                style={{
                  backgroundColor: met
                    ? (strength?.track ?? "#E4F1FC")
                    : "#F3F4FC",
                  border: `1.5px solid ${met ? (strength?.color ?? "#2599F6") : "#D3D5E0"}`,
                }}
              >
                {met && (
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                    <path
                      d="M1.5 4L3.2 5.7L6.5 2.5"
                      stroke={strength?.color}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>

              {/* Label */}
              <span
                className="text-xs transition-colors duration-300"
                style={{
                  color: met
                    ? "#414245" /* grey_700 */
                    : "#A5A7AF" /* grey_300 */,
                }}
              >
                {req.label}
              </span>

              {/* Met tag */}
              {met && (
                <span
                  className="ml-auto text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={{
                    color: strength?.color,
                    backgroundColor: strength?.track,
                  }}
                >
                  ✓
                </span>
              )}
            </li>
          );
        })}
      </ul>

      {/* Footer hint */}
      {value.length > 0 && metCount < total && (
        <p
          className="text-[11px] leading-relaxed"
          style={{ color: "#8D8E96" /* grey_400 */ }}
        >
          {total - metCount} requirement{total - metCount > 1 ? "s" : ""}{" "}
          remaining
        </p>
      )}
    </div>
  );
};

export default PasswordStrengthChecklist;
