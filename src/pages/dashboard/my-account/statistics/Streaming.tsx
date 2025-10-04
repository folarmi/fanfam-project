import Tabs from "@components/forms/Tabs";
import TimelineAndOverview from "@components/forms/TimelineAndOverview";
import EmptyState from "@components/molecules/EmptyState";
import { useState } from "react";

const Streaming = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "Purchases",
    },
    {
      id: 2,
      name: "Tips",
    },
    {
      id: 3,
      name: "Views",
    },
    {
      id: 4,
      name: "Likes",
    },
    {
      id: 5,
      name: "Comments",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("Purchases");

  return (
    <div>
      <section className="px-4">
        <Tabs
          tabsArray={tabs}
          setIsActiveTab={setIsActiveTab}
          isActiveTab={isActiveTab}
        />
      </section>

      <TimelineAndOverview
        month="July"
        timeframe="July 18, 2024 - Aug 12, 2024 (local time UTC+01:00)"
        amount=""
      />

      <EmptyState text="    No activity found during selected period" />
    </div>
  );
};

export default Streaming;
