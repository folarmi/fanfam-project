import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Typography from "./Typography";

export type PollChoice = {
  choice?: string;
  publicId?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdDate?: string;
  lastModifiedDate?: string;
  /** Populated by the API after votes exist */
  voteCount?: number;
};

// ─── Shared base props ────────────────────────────────────────────────────────

type BaseProps = {
  pollChoices: PollChoice[];
  className?: string;
};

// ─── Results view (no react-hook-form needed) ─────────────────────────────────

type PollResultsProps = BaseProps & {
  /** publicId the current user voted for — highlights their choice */
  userVote?: string;
  totalVotes?: number;
};

const PollResults = ({
  pollChoices,
  className = "",
  userVote,
  totalVotes = 0,
}: PollResultsProps) => {
  const winnerCount = Math.max(...pollChoices.map((c) => c.voteCount ?? 0));

  return (
    <div className={className}>
      {pollChoices.map((item, index) => {
        const optionValue = item?.publicId ?? `option-${index}`;
        const votes = item?.voteCount ?? 0;
        const pct = totalVotes > 0 ? Math.round((votes / totalVotes) * 100) : 0;
        const isWinner = votes === winnerCount && winnerCount > 0;
        const isUserChoice = optionValue === userVote;

        return (
          <div
            key={optionValue}
            className="relative mb-[10px] overflow-hidden rounded-full"
            style={{
              border: isUserChoice
                ? "2px solid #0567B5"
                : "1.5px solid #2599F6",
            }}
          >
            {/* Animated fill bar */}
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
              style={{
                width: `${pct}%`,
                background: isUserChoice
                  ? "#93c5fd"
                  : isWinner
                    ? "#b3d9ff"
                    : "#dbeeff",
              }}
            />

            <div className="relative z-10 flex items-center justify-between px-4 py-[10px]">
              <Typography
                variant="p2"
                className="text-grey_800"
                style={{
                  fontWeight: isWinner || isUserChoice ? 500 : 400,
                  color: isUserChoice ? "#0567B5" : undefined,
                }}
              >
                {item?.choice || `Option ${index + 1}`}
                {isUserChoice && <span className="ml-1.5 text-xs">✓</span>}
              </Typography>

              <span
                className="ml-3 min-w-[36px] text-right text-sm font-medium"
                style={{ color: "#0567B5" }}
              >
                {pct}%
              </span>
            </div>
          </div>
        );
      })}

      {totalVotes > 0 && (
        <p className="mt-1.5 text-xs text-grey_60">
          {totalVotes.toLocaleString()} vote{totalVotes !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
};

// ─── Voting view (controlled via react-hook-form) ─────────────────────────────

interface PollChoicesProps<T extends FieldValues> extends BaseProps {
  name: Path<T>;
  control: Control<T>;
}

const PollChoices = <T extends FieldValues>({
  pollChoices,
  name,
  control,
  className = "",
}: PollChoicesProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: { required: "Please select an option" },
  });

  return (
    <div className={`${className} mt-4`}>
      {pollChoices?.map((item, index) => {
        const optionValue = item?.publicId ?? `option-${index}`;
        const isSelected = value === optionValue;

        return (
          <label key={optionValue} className="mb-[10px] block cursor-pointer">
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={isSelected}
              onChange={() => onChange(optionValue)}
              className="sr-only"
            />
            <div
              className="flex items-center justify-between rounded-full px-4 py-[10px] transition-colors duration-150"
              style={{
                border: "1.5px solid #2599F6",
                background: isSelected ? "#2599F6" : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isSelected)
                  (e.currentTarget as HTMLDivElement).style.background =
                    "#dbeeff";
              }}
              onMouseLeave={(e) => {
                if (!isSelected)
                  (e.currentTarget as HTMLDivElement).style.background =
                    "transparent";
              }}
            >
              <Typography
                variant="p2"
                className="text-grey_800"
                style={{ color: isSelected ? "#fff" : undefined }}
              >
                {item?.choice || `Option ${index + 1}`}
              </Typography>
            </div>
          </label>
        );
      })}

      {error && (
        <Typography variant="p2" className="mt-1 text-red-500">
          {error.message}
        </Typography>
      )}
    </div>
  );
};

export { PollChoices, PollResults };
