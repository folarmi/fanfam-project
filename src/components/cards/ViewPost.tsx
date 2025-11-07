// /* eslint-disable @typescript-eslint/no-explicit-any */

// import ashMore from "../../assets/icons/ashMore.svg";
import Like from "../../assets/icons/like";
import React, { useEffect, useRef } from "react";
import Dislike from "@/assets/icons/dislike";
import Lol from "@/assets/icons/lol";
import Love from "@/assets/icons/love";
import PostCard, { type PostCardProps } from "./Postcard";
import { MoreHorizontal } from "lucide-react";
import type { ReactionItem } from "@/lib/types";

interface ViewPostProps extends Omit<PostCardProps, "headerActions"> {
  showModal: boolean;
  toggleModal: () => void;
  TimeLineModal?: React.ReactNode;
}

const ViewPost: React.FC<ViewPostProps> = ({
  showModal,
  toggleModal,
  TimeLineModal,
  ...postProps
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleModal();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, toggleModal]);

  // // Memoized image check
  // const hasImages = props.timeLineImage.length > 0;

  const reactionsData: ReactionItem[] = [
    { type: "LIKE", icon: Like, number: 0 },
    { type: "DISLIKE", icon: Dislike, number: 0 },
    { type: "LOL", icon: Lol },
    { type: "LOVE", icon: Love },
  ];

  return (
    <PostCard
      {...postProps}
      ifIcon
      reactionsData={reactionsData}
      headerActions={
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleModal();
            }}
            className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="More options"
            aria-expanded={showModal}
            aria-haspopup="true"
          >
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>

          {showModal && TimeLineModal && (
            <div
              ref={modalRef}
              className="absolute right-0 top-8 bg-white  w-[262px] rounded-2xl border border-gray-200 z-50 bg-modal-gradient shadow-triple"
              role="menu"
              aria-label="Post options"
              onClick={(e) => e.stopPropagation()}
            >
              {TimeLineModal}
            </div>
          )}
        </>
      }
    />
  );
};

export default React.memo(ViewPost);
