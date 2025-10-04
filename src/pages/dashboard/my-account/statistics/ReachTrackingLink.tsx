import TimelineAndOverview from "@components/forms/TimelineAndOverview";
import EmptyState from "@components/molecules/EmptyState";

const ReachTrackingLink = () => {
  return (
    <div>
      <TimelineAndOverview
        month="July"
        timeframe="July 18, 2024 - Aug 12, 2024 (local time UTC+01:00)"
        amount=""
      />

      <EmptyState text="No activity found during selected period" />
    </div>
  );
};

export default ReachTrackingLink;
