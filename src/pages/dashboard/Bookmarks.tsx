/* eslint-disable @typescript-eslint/no-explicit-any */
import { InfiniteScroll } from "@/components/InfiniteScroll";
import EmptyState from "@/components/molecules/EmptyState";
import { FeedPost } from "@/components/molecules/FeedPost";
import { Loader } from "@/components/molecules/Loader";
import { useInfiniteGetData } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type { StoryPost } from "@/lib/types";
import { useCallback, useState } from "react";

const Bookmarks = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [showMoreModal, setShowMoreModal] = useState<string | boolean | null>(
    null,
  );

  // const { data: getAllBookMarks, isLoading: getAllBookMarksIsLoading } =
  //   useGetData({
  //     url: `contents/saves?saveType=BOOKMARK&createdBy=${userObject?.email}&page=0&size=20&sort=desc`,
  //     queryKey: ["GetUserBookmarks"],
  //   });

  const {
    data: getAllBookMarksInfinite,
    isLoading: getAllBookMarksIsLoadingInfinite,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteGetData({
    url: `contents/saves?saveType=BOOKMARK&userEmail=${userObject?.email}&page=0&size=20&sort=desc`,
    queryKey: ["GetUserBookmarks", userObject?.email ?? ""],
    pageSize: 20,
  });

  const handleFetchNext = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  const allBookMarks =
    getAllBookMarksInfinite?.pages?.flatMap(
      (page: any) => page?.data?.content ?? [],
    ) ?? [];

  return (
    <div>
      {/* {getAllBookMarksIsLoadingInfinite ? ( */}
      {true ? (
        <Loader />
      ) : allBookMarks?.length === 0 ? (
        <EmptyState text="No bookmarks yet" />
      ) : (
        <InfiniteScroll
          onLoader={handleFetchNext}
          isLoading={isFetchingNextPage}
          hasMore={hasNextPage ?? false}
        >
          {allBookMarks?.map((data: StoryPost) => (
            <FeedPost
              key={data?.publicId}
              data={data?.content}
              showMoreModal={showMoreModal}
              setShowMoreModal={setShowMoreModal}
              isAlreadyBookmarked
            />
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

export { Bookmarks };
