/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
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
  votes?: string[];
};

const ListIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

const ChartIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

type PollResultsProps = {
  pollChoices: PollChoice[];
  userVote?: string;
  totalVotes: number;
  /** e.g. "4h 26min left" — pass undefined to hide */
  timeLeft?: string;
  className?: string;
};

const PollResults = ({
  pollChoices,
  userVote,
  totalVotes,
  timeLeft,
  className = "",
}: PollResultsProps) => {
  const [view, setView] = useState<"list" | "chart">("list");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chartRef = useRef<any>(null);

  const voteCounts = pollChoices.map((c) => c.votes?.length ?? 0);
  const winnerCount = Math.max(...voteCounts, 0);

  const percentages = pollChoices.map((c) => {
    const count = c.votes?.length ?? 0;
    return totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
  });

  // Build/destroy chart when switching to chart view
  useEffect(() => {
    if (view !== "chart" || !canvasRef.current) return;

    // Dynamically import Chart.js to avoid SSR issues
    import("chart.js/auto").then(({ default: Chart }) => {
      if (chartRef.current) chartRef.current.destroy();

      const labels = pollChoices.map((c, i) => c.choice || `Option ${i + 1}`);
      const colors = pollChoices.map((c, i) => {
        const optionValue = c.publicId ?? `option-${i}`;
        return optionValue === userVote ? "#2599F6" : "#2599F6";
      });

      chartRef.current = new Chart(canvasRef.current!, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              data: percentages,
              backgroundColor: colors,
              borderRadius: 4,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: (ctx) => ctx.parsed.y + "%" },
            },
          },
          scales: {
            y: {
              min: 0,
              max: 100,
              ticks: {
                stepSize: 25,
                callback: (v) => v + "%",
                font: { size: 11 },
                color: "#888",
              },
              grid: { color: "rgba(0,0,0,0.06)" },
              border: { display: false },
            },
            x: {
              ticks: {
                font: { size: 12 },
                color: "#888",
                maxRotation: 0,
                callback: function (_val, index) {
                  const label = labels[index];
                  return label.length > 10 ? label.slice(0, 10) + "…" : label;
                },
              },
              grid: { display: false },
              border: { display: false },
            },
          },
        },
      });
    });

    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, [view]);

  return (
    <div className={className}>
      {/* Header row — vote count + view toggle */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-grey_60">
          {totalVotes.toLocaleString()} vote{totalVotes !== 1 ? "s" : ""}
          {timeLeft ? ` · ${timeLeft}` : ""}
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setView("list")}
            className="p-1 rounded transition-colors"
            style={{
              color: view === "list" ? "#2599F6" : undefined,
              background: view === "list" ? "#e8f4fe" : "transparent",
            }}
            aria-label="List view"
          >
            <ListIcon />
          </button>
          <button
            type="button"
            onClick={() => setView("chart")}
            className="p-1 rounded transition-colors"
            style={{
              color: view === "chart" ? "#2599F6" : undefined,
              background: view === "chart" ? "#e8f4fe" : "transparent",
            }}
            aria-label="Chart view"
          >
            <ChartIcon />
          </button>
        </div>
      </div>

      {/* ── List view ── */}
      {view === "list" && (
        <div>
          {pollChoices.map((item, index) => {
            const optionValue = item?.publicId ?? `option-${index}`;
            const pct = percentages[index];
            const isWinner =
              (item.votes?.length ?? 0) === winnerCount && winnerCount > 0;
            const isUserChoice = optionValue === userVote;

            return (
              <div
                key={optionValue}
                className="flex items-center gap-2 mb-[10px]"
              >
                {/* Label — truncated, fixed width */}
                <span
                  className="text-sm truncate flex-shrink-0"
                  style={{
                    width: "160px",
                    fontWeight: isWinner || isUserChoice ? 500 : 400,
                    color: isUserChoice
                      ? "#2599F6"
                      : "var(--color-text-primary)",
                  }}
                >
                  {item?.choice || `Option ${index + 1}`}
                  {isUserChoice && <span className="ml-1 text-xs">✓</span>}
                </span>

                {/* Bar track */}
                <div
                  className="flex-1 h-[10px] rounded-full overflow-hidden"
                  style={{ background: "#e8f4fe" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: isUserChoice ? "#2599F6" : "#2599F6",
                    }}
                  />
                </div>

                {/* Percentage */}
                <span
                  className="text-xs font-medium text-right flex-shrink-0"
                  style={{
                    minWidth: "32px",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  {pct}%
                </span>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Chart view ── */}
      {view === "chart" && (
        <div style={{ position: "relative", width: "100%", height: "180px" }}>
          <canvas ref={canvasRef} />
        </div>
      )}
    </div>
  );
};

// ─── Voting view ──────────────────────────────────────────────────────────────

interface PollChoicesProps<T extends FieldValues> {
  pollChoices: PollChoice[];
  name: Path<T>;
  control: Control<T>;
  className?: string;
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
    <div className={className}>
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
