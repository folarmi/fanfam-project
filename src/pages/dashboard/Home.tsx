/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";
import { useAppSelector } from "../../lib/hook";
import type { RootState } from "../../lib/store";
import SearchInput from "../../components/SearchInput";
import Poll from "../../components/molecules/Poll";
import CommentBox from "../../components/CommentBox";
import Modal from "../../components/modals/Modal";
import InterestModal from "../../components/modals/InterestModal";
import { useGetData, useInfiniteGetData } from "@/hooks/apiCalls";
import type { StoryPost } from "@/lib/types";
import { InfiniteScroll } from "@/components/InfiniteScroll";
import { useSearchParams } from "react-router-dom";
import { CreatorLiveCard } from "@/components/cards/CreatorLiveCard";

import { FeedPost } from "@/components/molecules/FeedPost";

const Home = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [searchParams, setSearchParams] = useSearchParams();

  const isCreator = userObject?.role === "CREATOR";

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
    url: `contents?sort=createdDate,desc${activeSearchTerm ? `&search=${activeSearchTerm}&liveStream=false` : ""}`,
    queryKey: ["GetContents", activeSearchTerm],
    pageSize: 20,
  });

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const { data: getPollData, isLoading: getPollDataIsLoading } = useGetData({
    url: `contents?page=0&size=80`,
    queryKey: ["GetPollData"],
  });

  console.log(getPollData);
  // console.log(getPollData?.data?.content);
  // Flatten the pages for rendering
  const allPosts =
    getTimelineContent?.pages?.flatMap((page: any) => page.data?.content) || [];

  // const [isEditingStory, setIsEditingStory] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState<string | boolean | null>(
    null,
  );
  const [ifUserIsCreatingPoll, setIfUserIsCreatingPoll] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);

  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const toggleInterestModal = () => {
    setShowInterestModal(!showInterestModal);
  };

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
  };

  const handleSearch = (value: string) => {
    // immediate trigger on Enter/Click
    setLocalSearchTerm(value);
    setDebouncedSearchTerm(value);
    setSearchParams(value ? { search: value } : {}, { replace: false });
  };

  return (
    <>
      <div className="">
        <>
          <SearchInput
            searchTerm={localSearchTerm}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            placeholder="Search..."
          />
          {!isCreator && <CreatorLiveCard />}
          {ifUserIsCreatingPoll && isCreator ? (
            <Poll setIfUserIsCreatingPoll={setIfUserIsCreatingPoll} />
          ) : (
            isCreator && (
              <CommentBox
                ifPoll
                ifRecord
                setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
                ifGoLive
              />
            )
          )}

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
            {allPosts.map((data: StoryPost) => (
              <FeedPost
                key={data?.publicId}
                data={data}
                showMoreModal={showMoreModal}
                setShowMoreModal={setShowMoreModal}
                isLoading={getTimelineContentIsLoading || getPollDataIsLoading}
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
