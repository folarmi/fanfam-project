import Tabs from "@components/forms/Tabs";
import Typography from "@components/forms/Typography";
import BankingInformation from "@components/molecules/BankingInformation";

import { reachTypeData } from "@utils/helper";
import { useState } from "react";
import ReachProfileVisitors from "./ReachProfileVisitors";
import ReachPromotions from "./ReachPromotions";
import ReachTrackingLink from "./ReachTrackingLink";

const Reach = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "Profile Visitors",
    },
    {
      id: 2,
      name: "Promotions",
    },
    {
      id: 3,
      name: "Trial Links",
    },
    {
      id: 4,
      name: "Tracking Links",
    },
  ]);

  const [isActiveTab, setIsActiveTab] = useState("Profile Visitors");

  return (
    <div>
      <BankingInformation />

      <section className="px-4">
        <Tabs
          tabsArray={tabs}
          setIsActiveTab={setIsActiveTab}
          isActiveTab={isActiveTab}
        />
      </section>

      <section className="mx-4 border border-grey_10 rounded p-4">
        <Typography variant="subtitle3" className="text-grey_800 pb-4">
          Summary
        </Typography>

        <div className="flex items-center mb-4">
          {reachTypeData(isActiveTab)?.map(({ extra, id, name }) => {
            return (
              <div className="mr-6 w-24" key={id}>
                <Typography
                  variant="p3"
                  className="text-grey_600 whitespace-nowrap"
                >
                  {name}
                </Typography>
                <Typography
                  variant="titleTwo"
                  className="text-grey_800 pt-[2px]"
                >
                  {extra}
                </Typography>
              </div>
            );
          })}
        </div>
      </section>

      {isActiveTab === "Profile Visitors" && <ReachProfileVisitors />}
      {(isActiveTab === "Promotions" || isActiveTab === "Trial Links") && (
        <ReachPromotions isActiveTab={isActiveTab} />
      )}
      {isActiveTab === "Tracking Links" && <ReachTrackingLink />}
    </div>
  );
};

export default Reach;
