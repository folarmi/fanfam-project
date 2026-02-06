import type { LocationPermissionCardProps } from "@/lib/types";
import { useMemo, useState } from "react";

export function LocationPermissionCard({
  status,
  location,
  error,
  code,
  onRetry,
}: LocationPermissionCardProps) {
  const [showHelp, setShowHelp] = useState(false);

  const title = useMemo(() => {
    if (status === "granted") return "Location granted";
    if (status === "requesting") return "Requesting location…";
    return "Location required to verify";
  }, [status]);

  const subtitle = useMemo(() => {
    if (status === "granted") return location || "Location captured";
    if (status === "requesting")
      return "Please respond to the browser prompt.";
    return "Optional: Grant location to improve account security.";
  }, [status, location]);

  const badge = useMemo(() => {
    if (status === "granted")
      return (
        <span className="text-xs font-medium text-green-600">✅ Granted</span>
      );
    if (status === "requesting")
      return (
        <span className="text-xs font-medium text-muted">… In progress</span>
      );
    if (status === "denied")
      return (
        <span className="text-xs font-medium text-amber-600">
          ⚠️ Not granted
        </span>
      );
    if (status === "error")
      return <span className="text-xs font-medium text-red-600">⚠️ Error</span>;
    return (
      <span className="text-xs font-medium text-amber-600">⚠️ Not granted</span>
    );
  }, [status]);

  return (
    <div className="mb-4 rounded-2xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-text">{title}</p>
          <p className="mt-1 text-xs text-muted">{subtitle}</p>
        </div>
        <div className="shrink-0">{badge}</div>
      </div>

      {/* Error message */}
      {(status === "denied" || status === "error") && (error || code) && (
        <div className="mt-3 rounded-xl border border-border bg-background p-3">
          <p className="text-xs text-red-600">
            {error || "Location is required to verify your email."}
          </p>

          <button
            type="button"
            className="mt-2 text-xs font-medium text-primary underline underline-offset-2"
            onClick={() => setShowHelp((v) => !v)}
          >
            {showHelp ? "Hide" : "How to enable location"}
          </button>

          {showHelp && (
            <div className="mt-2 space-y-2 text-xs text-muted">
              <div>
                <p className="font-medium text-text">Chrome / Edge (Desktop)</p>
                <p>
                  Click the <span className="font-medium">🔒 lock icon</span> in
                  the address bar →{" "}
                  <span className="font-medium">Site settings</span> →
                  <span className="font-medium"> Location</span> → Allow.
                </p>
              </div>
              <div>
                <p className="font-medium text-text">Safari (Mac)</p>
                <p>
                  Safari → Settings → Websites → Location → set this site to{" "}
                  <span className="font-medium">Allow</span>.
                </p>
              </div>
              <div>
                <p className="font-medium text-text">Mobile</p>
                <p>
                  Enable Location Services for your browser in device settings,
                  then refresh this page and retry.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Retry */}
      {(status === "denied" || status === "error") && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 inline-flex items-center justify-center rounded-xl border border-border px-3 py-2 text-xs font-semibold text-text hover:bg-background"
        >
          🔁 Retry location
        </button>
      )}
    </div>
  );
}
