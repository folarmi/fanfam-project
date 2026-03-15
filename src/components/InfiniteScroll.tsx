// /* eslint-disable react-hooks/exhaustive-deps */
// import { useEffect, useRef, type ReactNode } from "react";
// import { Loader } from "./molecules/Loader";

// interface InfiniteScrollProps {
//   children: ReactNode;
//   onLoader: () => void;
//   isLoading: boolean;
//   hasMore: boolean;
//   endMessage?: ReactNode;
//   loader?: ReactNode;
//   className?: string;
// }

// export const InfiniteScroll = ({
//   children,
//   onLoader,
//   isLoading,
//   hasMore,
//   endMessage,
//   loader,
//   className = "",
// }: InfiniteScrollProps) => {
//   const observerTarget = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && hasMore && !isLoading) {
//           onLoader();
//         }
//       },
//       { threshold: 1.0 },
//     );

//     if (observerTarget.current) {
//       observer.observe(observerTarget.current);
//     }

//     return () => {
//       if (observerTarget.current) {
//         observer.unobserve(observerTarget.current);
//       }
//     };
//   }, [hasMore, isLoading, onLoader]);

//   return (
//     <div className={className}>
//       {children}

//       {isLoading && (
//         <div className="flex justify-center p-4">{loader || <Loader />}</div>
//       )}

//       {!isLoading && hasMore && (
//         <div ref={observerTarget} className="h-4 w-full" />
//       )}

//       {!hasMore && endMessage && (
//         <div className="p-4 text-center text-gray-500">{endMessage}</div>
//       )}
//     </div>
//   );
// };

import { useEffect, useRef, type ReactNode } from "react";

interface InfiniteScrollProps {
  children: ReactNode;
  onLoader: () => void;
  isLoading: boolean;
  hasMore: boolean;
  endMessage?: ReactNode;
  loader?: ReactNode;
  className?: string;
  scrollContainerRef?: React.RefObject<HTMLElement>;
}

export const InfiniteScroll = ({
  children,
  onLoader,
  isLoading,
  hasMore,
  endMessage,
  loader,
  className = "",
  scrollContainerRef,
}: InfiniteScrollProps) => {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const onLoaderRef = useRef(onLoader);
  const isLoadingRef = useRef(isLoading);
  const hasMoreRef = useRef(hasMore);

  useEffect(() => {
    onLoaderRef.current = onLoader;
  }, [onLoader]);
  useEffect(() => {
    isLoadingRef.current = isLoading;
  }, [isLoading]);
  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (
          entry.isIntersecting &&
          hasMoreRef.current &&
          !isLoadingRef.current
        ) {
          onLoaderRef.current();
        }
      },
      {
        root: scrollContainerRef?.current ?? null,
        threshold: 0.1,
        rootMargin: "0px 0px 300px 0px",
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [scrollContainerRef]);

  return (
    <div className={className}>
      {children}

      {isLoading && (
        <div className="space-y-2 mt-2">{loader ?? <PostSkeleton />}</div>
      )}

      {/* Always mounted so observer never loses its target */}
      <div ref={sentinelRef} className="h-4 w-full" />

      {!hasMore && (
        <div className="py-8 flex flex-col items-center gap-2 text-grey_60">
          {endMessage ?? (
            <>
              <div className="w-8 h-px bg-grey_20" />
              <p className="text-xs">You're all caught up</p>
              <div className="w-8 h-px bg-grey_20" />
            </>
          )}
        </div>
      )}
    </div>
  );
};

const PostSkeleton = () => (
  <>
    {[1, 2].map((i) => (
      <div key={i} className="pt-4 mb-2 bg-[#FAFAFA] animate-pulse">
        <div className="flex items-center gap-3 px-4 pb-3">
          <div className="w-10 h-10 rounded-full bg-grey_20" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-32 rounded bg-grey_20" />
            <div className="h-2 w-20 rounded bg-grey_20" />
          </div>
        </div>
        <div className="px-4 space-y-2 pb-3">
          <div className="h-2 w-full rounded bg-grey_20" />
          <div className="h-2 w-5/6 rounded bg-grey_20" />
          <div className="h-2 w-4/6 rounded bg-grey_20" />
        </div>
        {i % 2 === 0 && (
          <div className="mx-4 h-48 rounded-lg bg-grey_20 mb-3" />
        )}
        <div className="flex items-center gap-4 px-4 py-3 ml-16">
          <div className="h-5 w-10 rounded bg-grey_20" />
          <div className="h-5 w-10 rounded bg-grey_20" />
          <div className="h-5 w-10 rounded bg-grey_20" />
        </div>
      </div>
    ))}
  </>
);
