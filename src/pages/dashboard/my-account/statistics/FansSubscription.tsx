import StatTableHeader from "@/components/forms/StatTableHeader";
import Tabs from "@/components/forms/Tabs";
import TimelineAndOverview from "@/components/forms/TimelineAndOverview";
import Typography from "@/components/forms/Typography";
import { fanSubHeader } from "@/data";
import { useState } from "react";

const FansSubscription = () => {
  const [fansSub] = useState([
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Renews",
    },
    {
      id: 2,
      name: "New Subscribers",
    },
  ]);
  const [isFanSubActive, setIsFanSubActive] = useState("All");

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
          tabsArray={fansSub}
          setIsActiveTab={setIsFanSubActive}
          isActiveTab={isFanSubActive}
        />
      </section>

      <div className="mt-10 px-4">
        <StatTableHeader data={fanSubHeader} />

        <div className="flex items-center justify-between py-5">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-grey_80 flex items-center justify-center">
              <Typography variant="p1">J</Typography>
            </div>

            <div className="ml-2">
              <Typography variant="subtitle1">Jack Gran</Typography>
              <Typography variant="p2">@rgtyh</Typography>
            </div>
          </div>

          <Typography variant="p2">$0.00</Typography>
          <Typography variant="p2">7 days</Typography>
        </div>
      </div>
    </div>
  );
};

export default FansSubscription;
