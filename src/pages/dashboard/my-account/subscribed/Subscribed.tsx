import { useState } from "react";
import avatar from "../../../../assets/avatarOne.svg";
import { SubscriptionHeader } from "../settings/SubscriptionHeader";
import Tabs from "../../../../components/forms/Tabs";
import SubscribedCard from "../../../../components/cards/SubscribedCard";

const Subscribed = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "All Creators",
    },
    {
      id: 2,
      name: "Active Subscriptions",
    },
    {
      id: 3,
      name: "Expired Subscriptions",
    },
    {
      id: 4,
      name: "Attention Required",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("All Creators");
  return (
    <div className="px-7">
      <SubscriptionHeader />

      <Tabs
        tabsArray={tabs}
        setIsActiveTab={setIsActiveTab}
        isActiveTab={isActiveTab}
      />

      <div className="mt-6 flex items-center w-full">
        <SubscribedCard
          img={avatar}
          userName="Emmanuel Ekpess"
          tag="@babyekpess"
          expiryStatus="No Expiry"
          buttonText="FOR FREE"
          freeSub
        />
        <SubscribedCard
          img={avatar}
          userName="Emmanuel Ekpess"
          tag="@babyekpess"
          expiryStatus="31 Sept. 2024"
          buttonText="$4.55"
          freeSub
        />
      </div>

      <div className="mt-[18px] flex items-center w-full">
        <SubscribedCard
          img={avatar}
          userName="Saver Jesse"
          tag="@jesseblink"
          expiryStatus="Expires in 4 days"
          buttonText="$15 per month"
          expiryColor="#E19A05"
          freeSub={false}
        />
        <SubscribedCard
          img={avatar}
          userName="Saver Jesse"
          tag="@jesseblink"
          expiryStatus="Expired"
          buttonText="$23.45 per month"
          expiryColor="#D10E0E"
          freeSub={false}
        />
      </div>
    </div>
  );
};

export { Subscribed };
