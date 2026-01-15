// import { useState } from "react";
import { SubscriptionHeader } from "../settings/SubscriptionHeader";
// import Tabs from "../../../../components/forms/Tabs";
import SubscribedCard from "../../../../components/cards/SubscribedCard";
import { useGetData } from "@/hooks/apiCalls";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { Loader } from "@/components/molecules/Loader";
import type { SubscriberProfile } from "@/lib/types";
import { convertToHumanReadableDate } from "@/utils/helper";
import { UserRole } from "@/data";

const Subscribed = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const isCreator = userObject?.role === UserRole.creator;

  const {
    data: getCreatorSubscriptions,
    isLoading: getCreatorSubscriptionsIsLoading,
  } = useGetData({
    url: `subscriptions/creator/${userObject?.usid}/subscribers?page=0&size=20`,
    queryKey: ["GetSubscriptions"],
    enabled: isCreator,
  });

  const {
    data: getViewerSubscriptions,
    isLoading: getViewerSubscriptionsIsLoading,
  } = useGetData({
    url: `subscriptions?page=0&size=20&subscriberEmail=${userObject?.email}`,
    queryKey: ["GetSubscriptionsForViewer"],
    enabled: !isCreator,
  });

  const subscribersData = isCreator
    ? getCreatorSubscriptions
    : getViewerSubscriptions;

  // const [tabs] = useState([
  //   {
  //     id: 1,
  //     name: "All Creators",
  //   },
  //   {
  //     id: 2,
  //     name: "Active Subscriptions",
  //   },
  //   {
  //     id: 3,
  //     name: "Expired Subscriptions",
  //   },
  //   {
  //     id: 4,
  //     name: "Attention Required",
  //   },
  // ]);

  // const [isActiveTab, setIsActiveTab] = useState("All Creators");

  console.log(getCreatorSubscriptions);
  return (
    <>
      {getCreatorSubscriptionsIsLoading || getViewerSubscriptionsIsLoading ? (
        <Loader />
      ) : (
        <div className="px-7">
          <SubscriptionHeader />

          {/* <Tabs
            tabsArray={tabs}
            setIsActiveTab={setIsActiveTab}
            isActiveTab={isActiveTab}
          /> */}

          <div className="mt-6 flex flex-wrap gap-4">
            {subscribersData?.data?.content?.map((item: SubscriberProfile) => {
              return (
                <>
                  {userObject?.role === UserRole.viewer ? (
                    <SubscribedCard
                      img={item?.creator?.profilePic}
                      userName={item?.creator?.username || "N/A"}
                      tag={item?.creator?.displayName || "N/A"}
                      expiryStatus={`Expires ${convertToHumanReadableDate(
                        item?.endDate
                      )}`}
                      buttonText={
                        item?.fee ? `$${item.fee} per month` : "FOR FREE"
                      }
                      freeSub
                      key={item?.publicId}
                      profileName={item?.creator?.fullName || "Unknown User"}
                    />
                  ) : (
                    <SubscribedCard
                      // img={item?.subscriber?.profilePic}
                      img=""
                      userName={item?.subscriber?.username || "N/A"}
                      tag={item?.subscriber?.displayName || "N/A"}
                      expiryStatus={`Expires ${convertToHumanReadableDate(
                        item?.endDate
                      )}`}
                      buttonText={
                        item?.fee ? `$${item.fee} per month` : "FOR FREE"
                      }
                      freeSub
                      key={item?.publicId}
                      profileName={item?.subscriber?.fullName || "Unknown User"}
                    />
                  )}
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export { Subscribed };
