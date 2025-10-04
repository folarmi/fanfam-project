import CustomButton from "@components/forms/CustomButton";
import Typography from "@components/forms/Typography";
import { useState } from "react";
import OverviewEarnings from "./OverviewEarnings";
import OverviewActivityStreak from "./OverviewActivityStreak";
import Tabs from "@components/forms/Tabs";

const Overview = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "Earnings",
    },
    {
      id: 2,
      name: "Top Highlights",
    },
    {
      id: 3,
      name: "Activity Streak",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("Earnings");

  return (
    <div className=" bg-white ">
      <div className=" border border-grey_10 rounded mt-6 p-4 mx-4">
        <div className="flex items-center justify-around">
          <div className="">
            <Typography variant="h4" className="text-grey_800 text-center">
              $0.00
            </Typography>
            <Typography variant="p3" className="text-grey_600 pt-4">
              Available Balance
            </Typography>
          </div>

          <div className="">
            <Typography variant="h4" className="text-grey_800 text-center">
              $0.00
            </Typography>
            <Typography variant="p3" className="text-grey_600 pt-4">
              Available Balance
            </Typography>
          </div>
        </div>

        <div className="py-2 px-4 bg-grey_10 my-4">
          <Typography className="text-grey_800 " variant="p2">
            Minimum withdrawal amount is $20
          </Typography>
        </div>

        <CustomButton className="w-full">REQUEST WITHDRAWAL</CustomButton>
      </div>

      <section className="px-4">
        <Tabs
          tabsArray={tabs}
          setIsActiveTab={setIsActiveTab}
          isActiveTab={isActiveTab}
        />
      </section>

      {isActiveTab === "Earnings" && <OverviewEarnings />}
      {isActiveTab === "Activity Streak" && <OverviewActivityStreak />}
    </div>
  );
};

export default Overview;
