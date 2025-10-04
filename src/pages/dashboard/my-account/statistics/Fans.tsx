import Tabs from "@/components/forms/Tabs";
import Typography from "@/components/forms/Typography";
import BankingInformation from "@/components/molecules/BankingInformation";
import { fanPromotionsSummary } from "@/data";
import { useState } from "react";
import FansSubscription from "./FansSubscription";
import TopFan from "./TopFan";

const Fans = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "Subscriptions",
    },
    {
      id: 2,
      name: "Top Fan",
    },
  ]);

  const [isActiveTab, setIsActiveTab] = useState("Subscriptions");

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

        <div className="flex flex-wrap items-center mb-4 w-full">
          {fanPromotionsSummary?.map(({ extra, id, name }) => {
            return (
              <div className="mr-10 w-24" key={id}>
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

      {isActiveTab === "Subscriptions" && <FansSubscription />}
      {isActiveTab === "Top Fan" && <TopFan />}
    </div>
  );
};

export default Fans;
