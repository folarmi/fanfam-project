/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from "../../../lib/hook";
import type { RootState } from "../../../lib/store";
import { useState, useCallback, useMemo } from "react";
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
import { useGetData, useInfiniteGetData } from "@/hooks/apiCalls";
import DefaultAvatar from "@/components/molecules/DefaultAvatar";
import { MAX_LENGTH } from "@/utils/helperTwo";
import { useParams } from "react-router-dom";
import { isEmail } from "@/utils/helper";

const TABS = ["Post", "Media", "Replies", "Likes"] as const;
type Tab = (typeof TABS)[number];

const Profile = () => {
  const { email } = useParams();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const decodedEmail = useMemo(
    () => (email ? decodeURIComponent(email) : ""),
    [email],
  );

  const viewingOtherUser = Boolean(decodedEmail);
  const myProfileQuery = useFetchProfile(userObject, !viewingOtherUser);

  const otherProfileQuery = useGetData({
    url: `profile/${encodeURIComponent(decodedEmail)}`,
    queryKey: ["GetProfileByEmail", decodedEmail],
    enabled: viewingOtherUser,
  });

  const profileData = viewingOtherUser
    ? otherProfileQuery.data
    : myProfileQuery.data;

  const isLoading = viewingOtherUser
    ? otherProfileQuery.isLoading
    : myProfileQuery.isLoading;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isActiveTab, setIsActiveTab] = useState<Tab>("Post");
  const [showTipModal, setShowTipModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // With this — use the viewed profile's email, not always the logged-in user's:
  const contentEmail = viewingOtherUser
    ? profileData?.data?.email // the mentioned user's email
    : userObject?.email; // own profile

  const {
    data: creatorContentPages,
    isLoading: creatorContentIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetData({
    url: `contents?creator=${contentEmail}&sort=createdDate,desc`,
    queryKey: ["GetUserContent", contentEmail ?? ""],
    enabled: !!contentEmail, // don't fetch until we have the email
    pageSize: 20,
  });

  // Flatten all pages into one array — passed to every tab
  const creatorContent =
    creatorContentPages?.pages?.flatMap(
      (page: any) => page.data?.content ?? [],
    ) ?? [];

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const handleActionClick = (actionType: string) => {
    if (actionType === "tip") setShowTipModal((v) => !v);
  };

  const bio = profileData?.data?.bio ?? "";
  const shouldTruncate = bio.length > MAX_LENGTH;
  const visibleBio = isExpanded ? bio : bio.slice(0, MAX_LENGTH);

  // Shared props every tab needs
  const tabProps = {
    creatorContent,
    creatorContentIsLoading,
    fetchNextPage: handleFetchNext,
    hasNextPage: hasNextPage ?? false,
    isFetchingNextPage,
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
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
                      {profileData?.data?.displayName ||
                        profileData?.data?.fullName}
                    </Typography>
                  </div>
                  <Typography
                    variant="p2"
                    className="text-grey_800 pt-1 text-sm"
                  >
                    {isEmail(profileData?.data?.username)
                      ? ""
                      : profileData?.data?.username}
                  </Typography>
                  {bio && (
                    <Typography
                      variant="p2"
                      className="break-words whitespace-normal py-3 text-xs leading-5 text-grey_700 sm:py-4 sm:text-sm sm:leading-6"
                    >
                      {visibleBio}

                      {!isExpanded && shouldTruncate && "..."}

                      {shouldTruncate && (
                        <button
                          type="button"
                          onClick={() =>
                            setIsExpanded((previousValue) => !previousValue)
                          }
                          className="ml-1 inline cursor-pointer border-0 bg-transparent p-0 text-xs font-medium text-blue_500 sm:text-sm"
                        >
                          Read {isExpanded ? "less" : "more"}
                        </button>
                      )}
                    </Typography>
                  )}
                </section>
              </section>
            </ProfileHeader>

            {/* Tabs */}
            <div className="mt-2 flex w-full items-center overflow-x-auto border-b border-grey_40 bg-grey_20">
              {TABS.map((name) => {
                const isActive = isActiveTab === name;

                return (
                  <button
                    key={name}
                    type="button"
                    onClick={() => setIsActiveTab(name)}
                    className={`min-w-0 flex-1 whitespace-nowrap border-b-2 px-3 py-3 text-center transition-colors sm:px-6 ${
                      isActive ? "border-grey_800" : "border-transparent"
                    }`}
                  >
                    <Typography
                      variant="subtitle3"
                      className={`text-xs sm:text-sm ${
                        isActive ? "text-grey_800" : "text-grey_500"
                      }`}
                    >
                      {name}
                    </Typography>
                  </button>
                );
              })}
            </div>

            {isActiveTab === "Post" && <Post {...tabProps} />}
            {isActiveTab === "Replies" && <Replies {...tabProps} />}
            {isActiveTab === "Media" && <Media {...tabProps} />}
          </div>

          {showModal && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-40"
              onClick={() => setShowModal(false)}
            >
              <div onClick={(e) => e.stopPropagation()}>
                <GiftSubscription toggleModal={() => setShowModal(false)} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export { Profile };
