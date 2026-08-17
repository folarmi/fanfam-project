/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../lib/hook";
import type { RootState } from "../../lib/store";
// import SearchInput from "../../components/SearchInput";
import CommentBox from "../../components/CommentBox";
import Modal from "../../components/modals/Modal";
import InterestModal from "../../components/modals/InterestModal";
import { useInfiniteGetData } from "@/hooks/apiCalls";
import type { StoryPost } from "@/lib/types";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { useSearchParams } from "react-router-dom";
import { CreatorLiveCard } from "@/components/cards/CreatorLiveCard";

import { FeedPost } from "@/components/molecules/FeedPost";
import { useFetchProfile } from "@/hooks/apiHooks";
import { KycStatusBanner } from "@/kyc/KycStatusBanner";
import { BecomeCreatorPrompt } from "./become-a-creator/BecomeACreatorPrompt";
import CreatorDiscoveryRail from "@/components/cards/CreatorDiscoveryRail";

const Home = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();

  const isCreator = userObject?.role === "CREATOR";

  // Fetch profile to get kycVerified status for the banner.
  // This query likely already runs in a parent layout — if so,
  // it'll hit the cache and cost nothing here.
  const myProfileQuery = useFetchProfile(userObject, Boolean(userObject));
  const profile = myProfileQuery.data?.data;
  const isVerified = profile?.kycVerified === true;
  // const [activeSearchTerm, setActiveSearchTerm] = useState("");
  // value shown in input (local state)
  const [localSearchTerm, setLocalSearchTerm] = useState(
    searchParams.get("search") ?? "",
  );

  // debounced value for querying
  const [debouncedSearchTerm, setDebouncedSearchTerm] =
    useState(localSearchTerm);

  // Sync local state with URL param on mount (or if URL changes externally)
  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? "";
    if (urlSearch !== localSearchTerm) {
      setLocalSearchTerm(urlSearch);
    }
  }, [searchParams]);

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(localSearchTerm);
      // Update URL only when debounce settles
      setSearchParams(localSearchTerm ? { search: localSearchTerm } : {}, {
        replace: true,
      });
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [localSearchTerm, setSearchParams]);

  // value used for querying
  const activeSearchTerm = debouncedSearchTerm;

  const {
    data: getTimelineContent,
    isLoading: getTimelineContentIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetData({
    url: `contents?sort=createdDate,desc${activeSearchTerm ? `&search=${activeSearchTerm}` : "&liveStream=false"}`,
    queryKey: ["GetContents", activeSearchTerm],
    pageSize: 20,
  });

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  // Flatten the pages for rendering
  const allPosts =
    getTimelineContent?.pages?.flatMap((page: any) => page.data?.content) || [];

  // const [isEditingStory, setIsEditingStory] = useState(false);
  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showMoreModal, setShowMoreModal] = useState<string | boolean | null>(
    null,
  );
  const [showInterestModal, setShowInterestModal] = useState(false);

  const toggleInterestModal = () => {
    setShowInterestModal(!showInterestModal);
  };
  // const handleSearchChange = (value: string) => {
  //   setLocalSearchTerm(value);
  // };

  // const handleSearch = (value: string) => {
  //   // immediate trigger on Enter/Click
  //   setLocalSearchTerm(value);
  //   setDebouncedSearchTerm(value);
  //   setSearchParams(value ? { search: value } : {}, { replace: false });
  // };
  return (
    <>
      <div className="">
        <>
          {/* <SearchInput
            searchTerm={localSearchTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            placeholder="Search..."
          /> */}

          {/* KYC banner — shown to unverified non-creators only.
              Creators are already verified; viewers need to complete KYC. */}
          {!isCreator && !isVerified && (
            <div className="mb-4">
              <KycStatusBanner
                email={profile?.email}
                kycVerified={isVerified}
              />
            </div>
          )}

          {!isCreator && isVerified && (
            <div className="mb-4">
              <BecomeCreatorPrompt email={profile?.email} />
            </div>
          )}

          {/* ==================================================
        MOBILE + TABLET

        Live creators first, followed by suggestions.

        This sits BEFORE the comment box.
    =================================================== */}
          <div className="xl:hidden">
            <CreatorDiscoveryRail />
          </div>

          {/* ==================================================
        DESKTOP

        Keep existing live creator component because
        suggestions already exist in the desktop right rail.
    =================================================== */}

          {/* Should this be limited to non-creators?? */}
          {/* {!isCreator && <CreatorLiveCard />} */}
          <div className="hidden xl:block">
            <CreatorLiveCard />
          </div>

          {isCreator && <CommentBox ifPoll ifRecord ifGoLive ifSchedule />}

          {/* <div className="my-2">
            {userObject.role === UserRole.creator && (
              <StoryUploader onFileUpload={handleFileUpload} />
            )}
          </div> */}

          <InfiniteScroll
            onLoader={handleFetchNext}
            isLoading={isFetchingNextPage}
            hasMore={hasNextPage ?? false}
          >
            {allPosts?.map((data: StoryPost) => (
              <FeedPost
                key={data?.publicId}
                data={data}
                showMoreModal={showMoreModal}
                setShowMoreModal={setShowMoreModal}
                isLoading={getTimelineContentIsLoading}
              />
            ))}
          </InfiniteScroll>
        </>

        {/* {userObject.role !== UserRole.creator && ( */}
        {!isCreator && (
          <Modal show={showInterestModal} toggleModal={toggleInterestModal}>
            <div className="p-4">
              <InterestModal toggleModal={toggleInterestModal} />
            </div>
          </Modal>
        )}

        {/* <Modal
          ifClose={false}
          show={isEditingStory}
          toggleModal={toggleIsEditingStoryModal}
        >
          <div className="p-4">
            <StoryModal
              toggleModal={toggleIsEditingStoryModal}
              uploadedFile={uploadedFile}
            />
          </div>
        </Modal> */}
      </div>
    </>
  );
};

export { Home };
