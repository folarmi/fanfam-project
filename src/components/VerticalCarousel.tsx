/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable @typescript-eslint/no-explicit-any */
import "tailwindcss/tailwind.css";
import horizontalMore from "../assets/icons/horizontalMore.svg";
import verify from "../assets/icons/verify.svg";
import Typography from "./forms/Typography";
import { useGetData } from "@/hooks/apiCalls";
import { type UserProfile } from "@/lib/types";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader } from "./molecules/Loader";

const ITEMS_PER_PAGE = 5;

const CreatorList = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: getAllCreators, isLoading: getAllCreatorsIsLoading } =
    useGetData({
      url: `profile/creators`,
      queryKey: ["GetCreators"],
    });

  // Filter out the currently logged in user
  const creators = useMemo(() => {
    const allCreators = getAllCreators?.data || [];
    const currentUserId = userObject?.usid;
    return allCreators?.filter(
      (creator: any) => creator.usid !== currentUserId
    );
  }, [getAllCreators]);

  const totalPages = useMemo(
    () => Math.ceil(creators.length / ITEMS_PER_PAGE),
    [creators.length]
  );

  const currentPage = useMemo(
    () => Math.floor(currentIndex / ITEMS_PER_PAGE),
    [currentIndex]
  );

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - ITEMS_PER_PAGE;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, creators.length - ITEMS_PER_PAGE);
      const newIndex = prev + ITEMS_PER_PAGE;
      return newIndex > maxIndex ? maxIndex : newIndex;
    });
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex * ITEMS_PER_PAGE);
  };

  const visibleCreators = useMemo(
    () => creators.slice(currentIndex, currentIndex + ITEMS_PER_PAGE),
    [creators, currentIndex]
  );

  const isFirstPage = currentIndex === 0;
  const hasMore = creators.length > currentIndex + ITEMS_PER_PAGE;

  return (
    <div className="flex gap-4">
      {/* Creator Cards */}
      <div className="flex-1 flex flex-col space-y-4 cursor-pointer">
        {getAllCreatorsIsLoading ? (
          <div className="text-center py-8 text-gray-500">
            <Loader />
          </div>
        ) : visibleCreators?.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No creators available at the moment
          </div>
        ) : (
          visibleCreators?.map((item: UserProfile) => {
            const hasImage = item?.profilePic || item?.coverImageUrl;

            return (
              <Link
                to={`profile/${item?.usid}/subscribe`}
                state={{ email: item?.email }}
                key={item.usid}
                className="relative rounded-lg overflow-hidden group"
              >
                {hasImage ? (
                  <img
                    src={item.profilePic || item.coverImageUrl}
                    alt={item?.fullName || "Creator"}
                    className="w-full h-24 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-24 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                    <div className="text-white text-5xl font-bold">
                      {item?.fullName?.charAt(0)?.toUpperCase() ||
                        item?.username?.charAt(0)?.toUpperCase() ||
                        "?"}
                    </div>
                  </div>
                )}

                {/* More Options Button */}
                <button
                  className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label="More options"
                >
                  <img src={horizontalMore} alt="" />
                </button>

                {/* Creator Info Overlay */}
                <div className="bg-custom-gradient absolute w-full px-4 py-3 bottom-0 z-20">
                  <div className="flex items-center gap-1">
                    <Typography variant="titleTwo" className="text-white">
                      {item.fullName}
                    </Typography>
                    <img src={verify} alt="Verified" className="w-4 h-4" />
                  </div>

                  <div className="flex items-center gap-2 mt-1">
                    <Typography variant="p2" className="text-white/90">
                      @{item?.username}
                    </Typography>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>

      {/* Navigation Controls - Only show if there are multiple pages */}
      {totalPages > 1 && !getAllCreatorsIsLoading && (
        <div className="flex flex-col items-center justify-center gap-3 px-2">
          {/* Previous Button */}
          <button
            onClick={goToPrevious}
            disabled={isFirstPage}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 4L12 8L4 8L8 4Z" fill="currentColor" />
            </svg>
          </button>

          {/* Page Indicators */}
          <div className="flex flex-col gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentPage === index
                    ? "bg-blue-500 scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                aria-label={`Go to page ${index + 1}`}
                aria-current={currentPage === index ? "true" : "false"}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={goToNext}
            disabled={!hasMore}
            className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 12L4 8L12 8L8 12Z" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

export default CreatorList;
