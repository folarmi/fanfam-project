import { dummyCollectionData } from "@/data";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import Typography from "@components/forms/Typography";
import Modal from "@components/modals/Modal";
import CreateNewList from "@components/modals/CreateNewList";
import leftArrow from "@/assets/icons/arrowLeft.svg";
import { Bookmarks } from "../Bookmarks";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { useGetData } from "@/hooks/apiCalls";
import { Loader } from "@/components/molecules/Loader";
import EmptyState from "@/components/molecules/EmptyState";
import type { SubscriberProfile } from "@/lib/types";
import SubscribedCard from "@/components/cards/SubscribedCard";
import Sidebar from "@/components/molecules/Sidebar";
import { convertToHumanReadableDate } from "@/utils/helper";

const Collections = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const isCreator = userObject?.role === "CREATOR";

  const [collectionsTab] = useState([
    {
      id: 1,
      name: "User List",
    },
    {
      id: 2,
      name: "Bookmarks",
    },
  ]);

  const [followingTabs] = useState([
    {
      id: 1,
      name: "Subscribers",
    },
    {
      id: 2,
      name: "Following",
    },
  ]);

  const [isActiveTab, setIsActiveTab] = useState("User List");
  const [createNewList, setCreateNewList] = useState(false);

  // Controls the Collections list/detail mobile navigation
  const [showCollectionDetails, setShowCollectionDetails] = useState(false);

  // Controls the main app sidebar on mobile
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [followingActiveTab, setFollowingActiveTab] = useState(
    isCreator ? "Subscribers" : "Following",
  );

  const visibleTabs = isCreator
    ? followingTabs
    : followingTabs.filter((tab) => tab.name === "Following");

  const toggleCreateNewList = () => {
    setCreateNewList((previousValue) => !previousValue);
  };

  const openMobileSidebar = () => {
    setIsMobileSidebarOpen(true);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  const handleCollectionTabChange = (tabName: string) => {
    setIsActiveTab(tabName);

    // Bookmarks should open immediately on mobile
    if (tabName === "Bookmarks") {
      setShowCollectionDetails(true);
    } else {
      setShowCollectionDetails(false);
    }
  };

  const handleOpenUserList = () => {
    setIsActiveTab("User List");
    setShowCollectionDetails(true);
  };

  const handleBackToCollections = () => {
    setShowCollectionDetails(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMobileSidebarOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

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
  });

  const isLoading =
    getCreatorSubscriptionsIsLoading || getViewerSubscriptionsIsLoading;

  return (
    <div className="min-h-screen w-full bg-white">
      {/* Mobile app sidebar */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          isMobileSidebarOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMobileSidebarOpen}
      >
        <button
          type="button"
          onClick={closeMobileSidebar}
          aria-label="Close navigation menu"
          className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
            isMobileSidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        <aside
          className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-xl transition-transform duration-300 ease-in-out ${
            isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar isMobile onClose={closeMobileSidebar} />
        </aside>
      </div>

      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex h-16 items-center border-b border-grey_10 bg-white px-4 md:hidden">
        <button
          type="button"
          onClick={openMobileSidebar}
          aria-label="Open navigation menu"
          aria-expanded={isMobileSidebarOpen}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-grey_700 hover:bg-grey_50"
        >
          <Menu size={24} />
        </button>

        <Typography variant="titleTwo" className="ml-3 truncate text-grey_900">
          Collections
        </Typography>
      </header>

      <div className="flex min-h-[calc(100vh-64px)] w-full md:min-h-screen">
        {/* Collections navigation panel */}
        <aside
          className={`w-full shrink-0 border-r border-grey_10 bg-white md:block md:w-[280px] lg:w-[320px] ${
            showCollectionDetails ? "hidden" : "block"
          }`}
        >
          <div className="sticky top-16 md:top-0">
            <div className="flex w-full items-center justify-between border-b border-grey_10 pt-6">
              {collectionsTab.map(({ id, name }) => {
                const isSelected = isActiveTab === name;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => handleCollectionTabChange(name)}
                    className={`w-1/2 cursor-pointer pb-3 ${
                      isSelected
                        ? "border-b-2 border-grey_800"
                        : "border-b-2 border-transparent"
                    }`}
                  >
                    <Typography
                      variant="subtitle3"
                      className={`text-center ${
                        isSelected ? "text-grey_800" : "text-grey_500"
                      }`}
                    >
                      {name}
                    </Typography>
                  </button>
                );
              })}
            </div>

            {isActiveTab === "User List" && (
              <div>
                {dummyCollectionData?.map(({ id, folderName }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={handleOpenUserList}
                    className="flex w-full items-center justify-between border-b border-grey_10 px-4 py-[14px] text-left transition-colors hover:bg-grey_50"
                  >
                    <Typography
                      variant="titleTwo"
                      className="pb-1 text-grey_900"
                    >
                      {folderName}
                    </Typography>
                  </button>
                ))}
              </div>
            )}
          </div>
        </aside>

        {/* Collections content */}
        <main
          className={`min-w-0 flex-1 bg-white ${
            showCollectionDetails ? "block" : "hidden md:block"
          }`}
        >
          {/* Mobile back button */}
          <div className="sticky top-16 z-30 flex h-12 items-center border-b border-grey_10 bg-white px-4 md:hidden">
            <button
              type="button"
              onClick={handleBackToCollections}
              className="flex items-center gap-2 text-grey_700"
            >
              <img src={leftArrow} alt="" className="h-5 w-5" />

              <Typography variant="subtitle3">Back</Typography>
            </button>
          </div>

          {isActiveTab === "User List" && (
            <section className="w-full px-4 pb-8 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-[1000px]">
                {/* Subscribers/Following tabs */}
                <div className="flex w-full items-center justify-between border-b border-grey_10 pt-6">
                  {visibleTabs.map(({ id, name }) => {
                    const isSelected = followingActiveTab === name;

                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setFollowingActiveTab(name)}
                        className={`cursor-pointer pb-3 ${
                          visibleTabs.length === 1 ? "w-full" : "w-1/2"
                        } ${
                          isSelected
                            ? "border-b-2 border-grey_800"
                            : "border-b-2 border-transparent"
                        }`}
                      >
                        <Typography
                          variant="subtitle3"
                          className={`text-center ${
                            isSelected ? "text-grey_800" : "text-grey_500"
                          }`}
                        >
                          {name}
                        </Typography>
                      </button>
                    );
                  })}
                </div>

                {isLoading ? (
                  <div className="flex min-h-[300px] items-center justify-center">
                    <Loader />
                  </div>
                ) : (
                  <>
                    {/* Subscribers */}
                    {followingActiveTab === "Subscribers" && isCreator && (
                      <>
                        {getCreatorSubscriptionsIsLoading ? (
                          <Loader />
                        ) : !getCreatorSubscriptions?.data?.content?.length ? (
                          <EmptyState text="No subscribers yet" />
                        ) : (
                          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {getCreatorSubscriptions.data.content.map(
                              (item: SubscriberProfile) => (
                                <SubscribedCard
                                  key={item?.publicId}
                                  img={item?.subscriber?.profileImageUrl}
                                  userName={item?.subscriber?.username || "N/A"}
                                  tag={item?.subscriber?.displayName || "N/A"}
                                  expiryStatus={`Expires ${convertToHumanReadableDate(
                                    item?.endDate,
                                  )}`}
                                  buttonText={
                                    item?.fee
                                      ? `$${item.fee} per month`
                                      : "FOR FREE"
                                  }
                                  freeSub
                                  profileName={
                                    item?.subscriber?.fullName || "Unknown User"
                                  }
                                />
                              ),
                            )}
                          </div>
                        )}
                      </>
                    )}

                    {/* Following */}
                    {followingActiveTab === "Following" && (
                      <>
                        {getViewerSubscriptionsIsLoading ? (
                          <Loader />
                        ) : !getViewerSubscriptions?.data?.content?.length ? (
                          <EmptyState text="Not following anyone yet" />
                        ) : (
                          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                            {getViewerSubscriptions.data.content.map(
                              (item: SubscriberProfile) => (
                                <SubscribedCard
                                  key={item?.publicId}
                                  img={item?.creator?.profileImageUrl}
                                  userName={item?.creator?.username || "N/A"}
                                  tag={item?.creator?.displayName || "N/A"}
                                  expiryStatus={`Expires ${convertToHumanReadableDate(
                                    item?.endDate,
                                  )}`}
                                  buttonText={
                                    item?.fee
                                      ? `$${item.fee} per month`
                                      : "FOR FREE"
                                  }
                                  freeSub
                                  profileName={
                                    item?.creator?.fullName || "Unknown User"
                                  }
                                />
                              ),
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </div>
            </section>
          )}

          {isActiveTab === "Bookmarks" && (
            <section className="w-full px-4 pb-8 sm:px-6 lg:px-8">
              <div className="mx-auto w-full max-w-[1000px]">
                <Bookmarks />
              </div>
            </section>
          )}
        </main>
      </div>

      <Modal show={createNewList} toggleModal={toggleCreateNewList}>
        <CreateNewList toggleModal={toggleCreateNewList} />
      </Modal>
    </div>
  );
};

export { Collections };
