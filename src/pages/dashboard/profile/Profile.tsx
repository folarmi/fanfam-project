import { useAppSelector } from "../../../lib/hook";
import type { RootState } from "../../../lib/store";
import { useState } from "react";
import SearchInput from "../../../components/SearchInput";
import Typography from "../../../components/forms/Typography";
import Post from "../../../components/Post";
import Replies from "../../../components/Replies";
import Media from "../../../components/Media";
import GiftSubscription from "../../../components/modals/GiftSubscription";
import { Loader } from "@/components/molecules/Loader";
import { useFetchProfile } from "@/hooks/apiHooks";
import { ProfileHeader } from "@/components/molecules/ProfileHeader";
import { ProfileActions } from "@/components/molecules/ProfileActions";
import { TipModal } from "@/components/molecules/TipModal";
import { actions } from "@/data";
import type { TipData } from "@/lib/types";
import { useGetData } from "@/hooks/apiCalls";
import DefaultAvatar from "@/components/molecules/DefaultAvatar";
import { MAX_LENGTH } from "@/utils/helperTwo";

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
  const [showTipModal, setShowTipModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleActionClick = (actionType: string): void => {
    if (actionType === "tip") {
      setShowTipModal(!showTipModal);
    }
  };

  const { data: creatorContent, isLoading: creatorContentIsLoading } =
    useGetData({
      url: `${`contents?creator=${userObject?.email}&page=0&size=20&sort=createdDate,desc`}`,
      queryKey: ["GetUserContent"],
    });

  const bio = profileData?.data?.bio ?? "";
  const shouldTruncate = bio.length > MAX_LENGTH;
  const visibleBio = isExpanded ? bio : bio.slice(0, MAX_LENGTH);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <SearchInput ifBlur={false} />
          <div className="w-full relative">
            <ProfileHeader
              coverImage={profileData?.data?.coverImageUrl}
              displayName={
                profileData?.data?.displayName || profileData?.data?.email
              }
            >
              <section className="px-4 bg-grey_20 drop-shadow-4xl mb-2">
                <div className="relative flex items-center">
                  <div className="absolute -top-8">
                    {!profileData?.data?.profileImageUrl ? (
                      <DefaultAvatar
                        size="24"
                        fullName={
                          profileData?.data?.fullName ||
                          profileData?.data?.email
                        }
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
                        <img
                          src={profileData?.data?.profileImageUrl}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
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
                      {profileData?.data?.displayName}
                    </Typography>
                  </div>
                  <Typography
                    variant="p2"
                    className="text-grey_800 pt-1 text-sm"
                  >
                    {profileData?.data?.username}
                  </Typography>
                  {/* <Typography
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
                  </Typography> */}

                  {bio && (
                    <Typography
                      variant="p2"
                      className="text-grey_700 py-4 text-sm"
                    >
                      {visibleBio}
                      {!isExpanded && shouldTruncate && "..."}

                      {shouldTruncate && (
                        <span
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="font-medium text-sm text-blue_500 cursor-pointer ml-1"
                        >
                          read {isExpanded ? "less" : "more"}
                        </span>
                      )}
                    </Typography>
                  )}
                </section>
              </section>
            </ProfileHeader>

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

            {isActiveTab === "Post" && (
              <Post
                creatorContent={creatorContent?.data?.content}
                creatorContentIsLoading={creatorContentIsLoading}
              />
            )}
            {isActiveTab === "Replies" && (
              <Replies
                creatorContent={creatorContent?.data?.content}
                creatorContentIsLoading={creatorContentIsLoading}
              />
            )}
            {isActiveTab === "Media" && (
              <Media
                creatorContent={creatorContent?.data?.content}
                creatorContentIsLoading={creatorContentIsLoading}
              />
            )}
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
