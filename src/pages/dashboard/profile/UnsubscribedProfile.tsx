import { ConfirmActionModal } from "@/components/modals/ConfirmActionModal";
import Modal from "@/components/modals/Modal";
import { Loader } from "@/components/molecules/Loader";
import { ProfileHeader } from "@/components/molecules/ProfileHeader";
import { useCustomMutation, useGetData } from "@/hooks/apiCalls";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import blueGift from "@/assets/icons/blueGift.svg";
import Typography from "@/components/forms/Typography";
import CustomButton from "@/components/forms/CustomButton";
// import { SubscriptionBundle } from "@/components/molecules/SubscriptionBundle";
import { EMPTY_BUNDLE, type SubscriptionBundle } from "@/lib/types";
import { ProfileSubscriptionBundle } from "@/components/molecules/ProfileSubscriptionBundle";

const UnsubscribedProfile = () => {
  const { id } = useParams();
  const { email } = useLocation().state;
  const [confirmSubscription, setConfirmSubscription] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState(EMPTY_BUNDLE);
  const [showSubscription] = useState(true);

  const toggleSubscriptionModal = () => {
    setConfirmSubscription(!confirmSubscription);
  };

  const { data: profileData, isLoading: getCreatorIsLoading } = useGetData({
    url: `profile/${email}`,
    queryKey: ["GetProfileByEmail", email],
  });

  const subscribeToCreatorMutation = useCustomMutation({
    endpoint: `subscriptions/subscribe/${id}?planPass=${selectedBundle?.amount}`,
    // method: "delete",
    successMessage: () => "Subscription successfull",
    onSuccessCallback: () => {
      // refetch();
    },
  });

  return (
    <>
      {getCreatorIsLoading ? (
        <Loader />
      ) : (
        <div className="w-full relative">
          <ProfileHeader
            coverImage={profileData?.data?.coverImageUrl}
            displayName={profileData?.data?.displayName}
          >
            <section className="px-4 bg-grey_20 drop-shadow-4xl mb-2">
              <div className="relative flex items-center">
                <div className="absolute -top-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                      src={profileData?.data?.profilePic}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* <ProfileActions
                  actions={actions}
                  location={profileData?.data?.location}
                  onActionClick={handleActionClick}
                /> */}
              </div>

              <section className="mt-10">
                <div className="flex justify-end items-center">
                  <div
                    className={`flex mr-4 items-center gap-x-2 border border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white `}
                  >
                    <img src={blueGift} alt="gift" />
                    <Typography variant="subtitle3" className="text-blue_500">
                      Gift Subscription
                    </Typography>
                  </div>

                  <CustomButton
                    onClick={() => toggleSubscriptionModal()}
                    variant="primary"
                    primaryButtonSize="xs px-3 "
                  >
                    Subscribe
                  </CustomButton>
                </div>

                <div className="md:hidden flex items-center">
                  <span className="text-grey_400 text-sm">
                    📍 {profileData?.data?.location}
                  </span>
                </div>

                <div className="flex items-center">
                  <Typography
                    variant="titleTwo"
                    className="text-grey_800 font-bold pr-1"
                  >
                    {profileData?.data?.displayName}
                  </Typography>
                </div>

                <Typography variant="p2" className="text-grey_800 pt-1 text-sm">
                  @{profileData?.data?.username}
                </Typography>

                <Typography variant="p2" className="text-grey_700 py-4 text-sm">
                  {profileData?.data?.bio}
                  {/* {isExpanded && (
                    <span>
                      {" "}
                      ... Additional content here that was hidden initially.
                    </span>
                  )} */}
                  {/* <span
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="font-medium text-sm text-blue_500 cursor-pointer ml-1"
                  >
                    read {isExpanded ? "less" : "more"}
                  </span> */}
                </Typography>
              </section>
            </section>
          </ProfileHeader>

          {showSubscription && (
            <ProfileSubscriptionBundle
              currentSubscription={EMPTY_BUNDLE}
              data={profileData?.data?.creatorProfile?.subscriptionBundles}
              onSubscribe={(bundle: SubscriptionBundle) => {
                setSelectedBundle(bundle);
                toggleSubscriptionModal();
              }}
            />
          )}
          <Modal
            show={confirmSubscription}
            toggleModal={toggleSubscriptionModal}
          >
            <div className="p-4">
              <ConfirmActionModal
                toggleModal={toggleSubscriptionModal}
                message=" Are you sure you want to subscribe to this creator?"
                title="Subscribe to Creator"
                deleteFn={subscribeToCreatorMutation.mutate}
                isDeleting={subscribeToCreatorMutation.isPending}
                buttonText="Yes, Subscribe"
              />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export { UnsubscribedProfile };
