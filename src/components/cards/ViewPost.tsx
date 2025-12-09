// /* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useRef } from "react";
import PostCard, { type PostCardProps } from "./Postcard";
import { MoreHorizontal } from "lucide-react";

interface ViewPostProps extends Omit<PostCardProps, "headerActions"> {
  showModal?: boolean;
  toggleModal?: () => void;
  // showCommentModal?: string | null;
  // toggleShowCommentModal?: (postId?: string) => void;
  TimeLineModal?: React.ReactNode;
}

const ViewPost: React.FC<ViewPostProps> = ({
  showModal,
  // showCommentModal,
  toggleModal,
  TimeLineModal,
  // toggleShowCommentModal,
  publicId,
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
        toggleModal?.();
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showModal, toggleModal]);

  return (
    <PostCard
      {...postProps}
      ifIcon
      // reactionsData={reactionsData}
      // toggleShowCommentModal={toggleShowCommentModal}
      publicId={publicId}
      headerActions={
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleModal?.();
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

          {/* <Modal
            show={showCommentModal === publicId}
            toggleModal={() => toggleShowCommentModal?.(publicId)}
          >
            <CommentOnPost
              publicId={publicId}
              toggleModal={() => toggleShowCommentModal?.(publicId)}
            />
          </Modal> */}
        </>
      }
    />
  );
};

export default React.memo(ViewPost);
