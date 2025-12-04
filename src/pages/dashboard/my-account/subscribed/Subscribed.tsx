import { useState } from "react";
import avatar from "../../../../assets/avatarOne.svg";
import { SubscriptionHeader } from "../settings/SubscriptionHeader";
import Tabs from "../../../../components/forms/Tabs";
import SubscribedCard from "../../../../components/cards/SubscribedCard";
import { useGetData } from "@/hooks/apiCalls";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { Loader } from "@/components/molecules/Loader";
import type { SubscriberProfile } from "@/lib/types";
import { convertToHumanReadableDate } from "@/utils/helper";

const Subscribed = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { data, isLoading: getProfileIsLoading } = useGetData({
    url: `profile/${userObject?.email}`,
    queryKey: ["GetProfileByEmail"],
  });

  const { data: getSubscriptions, isLoading } = useGetData({
    url: `subscriptions?page=0&size=20`,
    queryKey: ["GetSubscriptions"],
  });
  console.log(data);
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
    <>
      {getProfileIsLoading || isLoading ? (
        <Loader />
      ) : (
        <div className="px-7">
          <SubscriptionHeader />

          <Tabs
            tabsArray={tabs}
            setIsActiveTab={setIsActiveTab}
            isActiveTab={isActiveTab}
          />

          <div className="mt-6 flex flex-wrap gap-4">
            {getSubscriptions?.data?.content?.map((item: SubscriberProfile) => {
              return (
                <SubscribedCard
                  img={avatar}
                  userName={item?.displayName || "N/A"}
                  tag={item?.username ? `@${item.username}` : "N/A"}
                  expiryStatus={convertToHumanReadableDate(item?.endDate)}
                  buttonText={item?.fee ? `$${item.fee} per month` : "FOR FREE"}
                  freeSub
                  key={item?.usid}
                  profileName={item?.displayName || "Unknown User"}
                />
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export { Subscribed };
