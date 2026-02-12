import { useEffect, useRef, type ReactNode } from "react";
import { Loader } from "./molecules/Loader";

interface InfiniteScrollProps {
  children: ReactNode;
  onLoader: () => void;
  isLoading: boolean;
  hasMore: boolean;
  endMessage?: ReactNode;
  loader?: ReactNode;
  className?: string;
}

export const InfiniteScroll = ({
  children,
  onLoader,
  isLoading,
  hasMore,
  endMessage,
  loader,
  className = "",
}: InfiniteScrollProps) => {
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoader();
        }
      },
      { threshold: 1.0 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [hasMore, isLoading, onLoader]);

  return (
    <div className={className}>
      {children}
      
      {isLoading && (
        <div className="flex justify-center p-4">
          {loader || <Loader />}
        </div>
      )}
      
      {!isLoading && hasMore && (
        <div ref={observerTarget} className="h-4 w-full" />
      )}
      
      {!hasMore && endMessage && (
        <div className="p-4 text-center text-gray-500">
          {endMessage}
        </div>
      )}
    </div>
  );
};
