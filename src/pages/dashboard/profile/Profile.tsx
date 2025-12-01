import { useAppSelector } from "../../../lib/hook";
import type { RootState } from "../../../lib/store";
import { useState } from "react";
import SearchInput from "../../../components/SearchInput";
import Typography from "../../../components/forms/Typography";
import Post from "../../../components/Post";
import Replies from "../../../components/Replies";
import Media from "../../../components/Media";
import GiftSubscription from "../../../components/modals/GiftSubscription";
import suggestTwo from "../../../assets/suggestTwo.svg";
import { Loader } from "@/components/molecules/Loader";
import { useFetchProfile } from "@/hooks/apiHooks";
import { ProfileHeader } from "@/components/molecules/ProfileHeader";
import { ProfileActions } from "@/components/molecules/ProfileActions";
import { TipModal } from "@/components/molecules/TipModal";
import { actions } from "@/data";
import type { TipData } from "@/lib/types";
import { SubscriptionBundle } from "@/components/molecules/SubscriptionBundle";

const Profile = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data: profileData, isLoading } = useFetchProfile(userObject);

  const [isExpanded, setIsExpanded] = useState(false);
  const [tabs] = useState([
    {
      id: 1,
      name: "Post",
    },
    {
      id: 2,
      name: "Media",
    },
    {
      id: 3,
      name: "Replies",
    },
    {
      id: 4,
      name: "Likes",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("Post");
  // const [linkToProfileModal, setLinkToProfileModal] = useState(false);
  const [showSubscription] = useState(true);
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const test = {
    amount: "200",
    durationInMonths: 3,
    startDate: "2024-06-01",
    endDate: "2024-09-01",
    publicId: "abc123",
    createdDate: "2024-06-01",
    lastModifiedDate: "2024-06-01",
    lastModifiedBy: "admin",
  };

  const subscriptionData = [
    {
      amount: "200",
      durationInMonths: 3,
      startDate: "2024-06-01",
      endDate: "2024-09-01",
      publicId: "abc123",
      createdDate: "2024-06-01",
      lastModifiedDate: "2024-06-01",
      lastModifiedBy: "admin",
    },
    {
      amount: "200",
      durationInMonths: 3,
      startDate: "2024-06-01",
      endDate: "2024-09-01",
      publicId: "abc1235",
      createdDate: "2024-06-01",
      lastModifiedDate: "2024-06-01",
      lastModifiedBy: "admin",
    },
    {
      amount: "200",
      durationInMonths: 3,
      startDate: "2024-06-01",
      endDate: "2024-09-01",
      publicId: "abc12395",
      createdDate: "2024-06-01",
      lastModifiedDate: "2024-06-01",
      lastModifiedBy: "admin",
    },
  ];

  const handleActionClick = (actionType: string): void => {
    if (actionType === "tip") {
      setShowTipModal(!showTipModal);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <SearchInput ifBlur={false} />
          <div className="w-full relative">
            {/* <div className="max-w-4xl mx-auto"> */}
            <ProfileHeader coverImage={suggestTwo}>
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

                  <ProfileActions
                    actions={actions}
                    location={profileData?.data?.location}
                    onActionClick={handleActionClick}
                  />
                </div>

                {showTipModal && (
                  <TipModal
                    recipient={{
                      avatar: profileData?.data?.profilePic,
                      name: profileData?.data?.fullName,
                      username: profileData?.data?.username,
                    }}
                    onClose={() => setShowTipModal(false)}
                    onSend={(data: TipData) => {
                      console.log("Sending tip:", data);
                      setShowTipModal(false);
                    }}
                  />
                )}

                <section className="mt-10">
                  <div className="md:hidden flex items-center">
                    <span className="text-grey_400 text-sm">
                      📍 {profileData?.data?.location}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Typography
                      variant="titleTwo"
                      className="text-grey_800 font-bold pr-1 text-xl"
                    >
                      {profileData?.data?.fullName}
                    </Typography>
                  </div>

                  <Typography
                    variant="p2"
                    className="text-grey_800 pt-1 text-sm"
                  >
                    {profileData?.data?.username}
                  </Typography>

                  <Typography
                    variant="p2"
                    className="text-grey_700 py-4 text-sm"
                  >
                    {profileData?.data?.bio}
                    {isExpanded && (
                      <span>
                        {" "}
                        ... Additional content here that was hidden initially.
                      </span>
                    )}
                    <span
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="font-medium text-sm text-blue_500 cursor-pointer ml-1"
                    >
                      read {isExpanded ? "less" : "more"}
                    </span>
                  </Typography>
                </section>
              </section>
            </ProfileHeader>

            {showSubscription && (
              <SubscriptionBundle
                currentSubscription={test}
                data={subscriptionData}
              />
            )}
            {/* <img src={suggestTwo} alt="demo" className="w-full" /> */}

            {/* <section className="px-4 bg-grey_20 drop-shadow-4xl mb-2">
              <div className="relative flex items-center">
                <div className="absolute -top-8 ">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                    <img
                      src={data?.data?.profilePic}
                      alt="profilePicture"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="w-full mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-x-4 justify-between w-full">
                    <div className="hidden md:flex items-center ml-28">
                      <img src={location} alt="location" />
                      <Typography className="text-grey_400 pl-1" variant="p3">
                        Nigeria
                      </Typography>
                    </div>

                    <div className="cursor-pointer">
                      <CircleChat className="cursor-pointer hover:fill-blue_200" />
                    </div>

                    <div className="cursor-pointer" onClick={toggleTipModal}>
                      <CirclePay className="cursor-pointer hover:fill-blue_200" />
                    </div>


                    <div className="hidden md:block">
                      <img src={circleStar} alt="circleStar" />
                    </div>

                    <>
                      {" "}
                      <Link to="/dashboard/profile/promote">
                        <CustomButton
                          variant="primary"
                          primaryButtonSize="xs px-3"
                        >
                          Promote Profile
                        </CustomButton>
                      </Link>
                      <BlueBorderedButton
                        onClick={() =>
                          navigate("/dashboard/profile/edit-profile")
                        }
                        text="Edit Profile"
                      />
                    </>

                    <div className="relative">
                      <img
                        src={moreIcon}
                        alt="horizontalMore"
                        className="cursor-pointer"
                        onClick={toggleCommentModal}
                        loading="lazy"
                      />
                      {commentModal && (
                        <div className="mt-5 flex flex-col absolute right-[95%] top-[100%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
                          <div className="flex items-center justify-between py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6">
                            <Typography variant="p2" className="text-grey_700">
                              Copy link to profile
                            </Typography>
                            <img src={copy} alt="copy" />
                          </div>
                          <ModalContent
                            content={commentOptions}
                            onClick={getModalValue}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <section className="mt-10">
                <div className="md:hidden flex items-center ">
                  <img src={location} alt="location" />
                  <Typography className="text-grey_400 pl-1" variant="p3">
                    {data?.data?.location || "N/A"}
                  </Typography>
                </div>
                <div className="flex items-center">
                  <Typography
                    variant="titleTwo"
                    className="text-grey_800 font-bold pr-1"
                  >
                    {data?.data?.fullName || ""}
                  </Typography>
                </div>

                <Typography variant="p2" className="text-grey_800 pt-[2px]">
                  {data?.data?.username || ""}
                </Typography>

                <Typography variant="p2" className="text-grey_700 py-4">
                  {data?.data?.bio || "N/A"}
                  {isExpanded && (
                    <>
                      <span>
                        {" "}
                        .... Duis lacinia ligula sit amet lacus egestas, non
                        cursus magna vestibulum. Sed malesuada, eros ut blandit
                        vehicula, nisi sapien volutpat turpis, non fermentum
                        lectus ligula sit amet odio. Suspendisse potenti. Nullam
                        aliquet tincidunt erat, ut condimentum ligula luctus eu.
                        Nam vitae turpis non urna fermentum volutpat sit amet a
                        odio. Sed auctor, ex nec blandit aliquam, nisl nunc
                        dignissim lorem, sed efficitur orci justo ut justo.{" "}
                      </span>
                    </>
                  )}
                  {isActiveTab === "Replies" && (
                    <span
                      onClick={toggleReadMore}
                      className="font-medium text-sm text-blue_500 cursor-pointer"
                    >
                      read {isExpanded ? "less" : "more"}
                    </span>
                  )}
                </Typography>
              </section>
            </section> */}

            <div className="flex items-center justify-between bg-grey_20 border-b border-grey_40 mt-2">
              {tabs.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    className="cursor-pointer"
                    onClick={() => setIsActiveTab(name)}
                  >
                    <Typography
                      variant="subtitle3"
                      className={`px-12 pt-3 pb-1 ${
                        isActiveTab === name
                          ? "text-grey_800 border-b-2 border-grey_800"
                          : "text-grey_500"
                      }`}
                    >
                      {name}
                    </Typography>
                  </div>
                );
              })}
            </div>

            {/* Stop composing here */}

            {isActiveTab === "Post" && <Post />}
            {isActiveTab === "Replies" && <Replies />}
            {isActiveTab === "Media" && <Media />}
          </div>

          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40"
              onClick={toggleModal}
            >
              <div className="" onClick={(e) => e.stopPropagation()}>
                <GiftSubscription toggleModal={toggleModal} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { Profile };

{
  /* Gift Subscription */
}
{
  /* {userObject.role !== UserRole.creator && (
                      <>
                        <div
                          className={`flex items-center gap-x-2 border border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white `}
                        >
                          <img src={blueGift} alt="gift" />
                          <Typography
                            variant="subtitle3"
                            className="text-blue_500"
                          >
                            Gift Subscription
                          </Typography>
                        </div>

                        <CustomButton
                          variant="primary"
                          primaryButtonSize="xs px-3"
                        >
                          Subscribe
                        </CustomButton>
                      </>
                    )} */
}

{
  /* {userObject.role === UserRole.creator && ( */
}
