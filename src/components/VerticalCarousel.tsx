/* eslint-disable @typescript-eslint/no-explicit-any */
import "tailwindcss/tailwind.css";
import horizontalMore from "../assets/icons/horizontalMore.svg";
import verify from "../assets/icons/verify.svg";
import { useGetData } from "@/hooks/apiCalls";
import { type UserProfile } from "@/lib/types";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Loader } from "./molecules/Loader";

const ITEMS_PER_PAGE = 5;

const LiveBadge = () => (
  <span className="inline-flex items-center gap-1 rounded-full bg-red-500/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm backdrop-blur-sm">
    <span className="relative flex h-1.5 w-1.5">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
    </span>
    Live
  </span>
);

const CreatorList = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: getAllCreators, isLoading: getAllCreatorsIsLoading } =
    useGetData({
      url: `profile/creators`,
      queryKey: ["GetCreators"],
    });

  const creators = useMemo(() => {
    const allCreators = getAllCreators?.data || [];
    const currentUserId = userObject?.usid;
    return allCreators.filter((creator: any) => creator.usid !== currentUserId);
  }, [getAllCreators, userObject?.usid]);

  const totalPages = useMemo(
    () => Math.ceil(creators.length / ITEMS_PER_PAGE),
    [creators.length],
  );

  const currentPage = useMemo(
    () => Math.floor(currentIndex / ITEMS_PER_PAGE),
    [currentIndex],
  );

  const visibleCreators = useMemo(
    () => creators.slice(currentIndex, currentIndex + ITEMS_PER_PAGE),
    [creators, currentIndex],
  );

  const isFirstPage = currentIndex === 0;
  const hasMore = creators.length > currentIndex + ITEMS_PER_PAGE;

  const goToPrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - ITEMS_PER_PAGE));
  };

  const goToNext = () => {
    const maxIndex = Math.max(0, creators.length - ITEMS_PER_PAGE);
    setCurrentIndex((prev) => Math.min(maxIndex, prev + ITEMS_PER_PAGE));
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex * ITEMS_PER_PAGE);
  };

  return (
    <div className="w-full px-3 py-4">
      {/* Section Header */}
      <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
        Suggestions
      </p>

      <div className="flex gap-3">
        {/* Creator Cards */}
        <div className="flex flex-1 flex-col gap-3">
          {getAllCreatorsIsLoading ? (
            <div className="flex h-48 items-center justify-center">
              <Loader />
            </div>
          ) : visibleCreators.length === 0 ? (
            <div className="flex h-48 items-center justify-center rounded-2xl bg-gray-50 text-sm text-gray-400">
              No creators available at the moment
            </div>
          ) : (
            visibleCreators.map((item: UserProfile & { isLive?: boolean }) => {
              const hasImage = item?.profilePic || item?.coverImageUrl;
              const initials =
                item?.fullName?.charAt(0)?.toUpperCase() ||
                item?.username?.charAt(0)?.toUpperCase() ||
                "?";

              return (
                <Link
                  to={`profile/${item?.usid}/subscribe`}
                  state={{ email: item?.email }}
                  key={item.usid}
                  className="group relative block h-[7.5rem] overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.01]"
                >
                  {/* Background Image or Gradient */}
                  {hasImage ? (
                    <img
                      src={item.profilePic || item.coverImageUrl}
                      alt={item?.fullName || "Creator"}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 via-fuchsia-500 to-pink-500">
                      <div className="flex h-full w-full items-center justify-center text-5xl font-black text-white/30 select-none">
                        {initials}
                      </div>
                    </div>
                  )}

                  {/* Dark Overlay for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Three-dot menu — visible on hover */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className="absolute right-3 top-3 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-black/30 opacity-0 backdrop-blur-sm transition-all duration-200 group-hover:opacity-100 hover:bg-black/50"
                    aria-label="More options"
                  >
                    {/* Three dots inline (fallback if SVG import fails) */}
                    <img
                      src={horizontalMore}
                      alt=""
                      className="h-4 w-4 brightness-0 invert"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = "none";
                        const dots = document.createElement("span");
                        dots.innerHTML = "···";
                        dots.className =
                          "text-white text-xs font-bold leading-none";
                        target.parentElement?.appendChild(dots);
                      }}
                    />
                  </button>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-3 pt-6">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-bold leading-tight text-white drop-shadow-sm">
                        {item.fullName}
                      </span>
                      <img
                        src={verify}
                        alt="Verified"
                        className="h-[14px] w-[14px] flex-shrink-0 brightness-0 invert drop-shadow-sm"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    </div>

                    <div className="mt-0.5 flex items-center gap-2">
                      <span className="text-xs font-medium text-white/80">
                        @{item?.username}
                      </span>

                      {/* Show live badge if the creator is live */}
                      {item?.isLive && <LiveBadge />}
                    </div>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && !getAllCreatorsIsLoading && (
          <div className="flex flex-col items-center justify-center gap-2.5 pl-1">
            {/* Up Arrow */}
            <button
              onClick={goToPrevious}
              disabled={isFirstPage}
              className="flex h-5 w-5 items-center justify-center text-gray-400 transition-all hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Previous page"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 2L10 7H2L6 2Z" fill="currentColor" />
              </svg>
            </button>

            {/* Page Dots */}
            <div className="flex flex-col gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                  aria-current={currentPage === index ? "true" : "false"}
                  className={`rounded-full transition-all duration-200 ${
                    currentPage === index
                      ? "h-2.5 w-2.5 bg-blue-500 shadow-[0_0_0_2px_rgba(59,130,246,0.3)]"
                      : "h-2 w-2 bg-gray-300 hover:bg-gray-400"
                  }`}
                />
              ))}
            </div>

            {/* Down Arrow */}
            <button
              onClick={goToNext}
              disabled={!hasMore}
              className="flex h-5 w-5 items-center justify-center text-gray-400 transition-all hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-25"
              aria-label="Next page"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M6 10L2 5H10L6 10Z" fill="currentColor" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorList;
