import Tabs from "@/components/forms/Tabs";
import TimelineAndOverview from "@/components/forms/TimelineAndOverview";
import Typography from "@/components/forms/Typography";
import { useState } from "react";

const TopFan = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "Total",
    },
    {
      id: 2,
      name: "Subscriptions",
    },
    {
      id: 3,
      name: "Tips",
    },
    {
      id: 4,
      name: "Messages",
    },
    {
      id: 5,
      name: "Posts",
    },
    {
      id: 6,
      name: "Streams",
    },
  ]);

  const [isActiveTab, setIsActiveTab] = useState("Total");
  return (
    <div>
      <div className="">
        <TimelineAndOverview
          month="July"
          timeframe="July 18, 2024 - Aug 12, 2024 (local time UTC+01:00)"
          amount="2 Subscribers, $0.00"
        />
      </div>

      <section className="px-4">
        <Tabs
          tabsArray={tabs}
          setIsActiveTab={setIsActiveTab}
          isActiveTab={isActiveTab}
        />
      </section>

      <div className="flex items-center justify-center py-16">
        <Typography variant="p2" className="text-grey_600">
          No users found
        </Typography>
      </div>
    </div>
  );
};

export default TopFan;
