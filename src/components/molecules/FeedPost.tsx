/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useState, useEffect } from "react";
import Modal from "@/components/modals/Modal";
import { CommentOnPost } from "@/components/modals/CommentOnPost";
import TimeLineHomeModal from "@/components/modals/TimeLineHomeModal";
import { transformReactions } from "@/lib/reaction";
import { formatTimeAgo } from "@/utils/helperTwo";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type { StoryPost } from "@/lib/types";
import { useNavigate } from "react-router-dom";
import { Loader } from "@/components/molecules/Loader";
import Postcard from "../cards/Postcard";

interface FeedPostProps {
  data: StoryPost;
  showMoreModal: string | boolean | null;
  setShowMoreModal: (id: string | null) => void;
  isLoading?: boolean;
  withCommentModal?: boolean;
  isAlreadyBookmarked?: boolean;
  isAlreadyReposted?: boolean;
}

export const FeedPost = ({
  data,
  showMoreModal,
  setShowMoreModal,
  isLoading = false,
  withCommentModal = true,
  isAlreadyBookmarked,
  isAlreadyReposted,
}: FeedPostProps) => {
  const navigate = useNavigate();
  const postRef = useRef<HTMLDivElement>(null);
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const [hasViewed, setHasViewed] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);

  const recordViewMutation = useCustomMutation({
    endpoint: `contents/${data?.publicId}/view`,
    onSuccessCallback: () => {},
  });

  useEffect(() => {
    if (!postRef.current || hasViewed || !data?.publicId) return;
    if (data?.viewers?.includes(userObject?.email)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          recordViewMutation.mutate({});
          setHasViewed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(postRef.current);
    return () => observer.disconnect();
  }, [hasViewed, data?.publicId, data?.viewers]);

  if (isLoading) return <Loader />;

  return (
    <div className="relative" ref={postRef}>
      <Postcard
        publicId={data?.publicId}
        profileName={data?.creator?.name || "Unknown User"}
        avatar={data?.creator?.profilePic}
        handle={data?.creator?.username}
        time={formatTimeAgo(data?.createdDate)}
        paragraphOne={data?.message}
        timeLineImage={data?.mediaFiles}
        pollChoices={data?.pollChoices}
        ifParagraph
        showModal={showMoreModal === data?.publicId}
        toggleModal={() =>
          setShowMoreModal(
            showMoreModal === data?.publicId ? null : (data?.publicId ?? null),
          )
        }
        onCommentClick={() => setShowCommentModal(true)}
        onCardClick={() => {
          if (!data?.publicId) return;
          setShowCommentModal(false);
          navigate(`/dashboard/${data?.publicId}`);
        }}
        commentslength={data?.comments?.length}
        TimeLineModal={
          <TimeLineHomeModal
            toggleTimelineHomeModal={() => setShowMoreModal(null)}
            publicId={data?.publicId}
            createdBy={data?.createdBy}
          />
        }
        reactionsData={transformReactions(data?.reactions)}
        bookmarkers={data?.bookmarkers}
        reposters={data?.reposters}
        isAlreadyBookmarked={isAlreadyBookmarked}
        isAlreadyReposted={isAlreadyReposted}
      />

      {withCommentModal && (
        <Modal
          show={showCommentModal}
          toggleModal={() => setShowCommentModal(false)}
        >
          <CommentOnPost
            publicId={data?.publicId}
            toggleModal={() => setShowCommentModal(false)}
            data={{
              id: data?.publicId,
              message: data?.message,
              avatar: data?.creator?.profilePic,
              handle: data?.creator?.username,
              profileName: data?.creator?.name || "Unknown User",
              time: formatTimeAgo(data?.createdDate),
              timeLineImage: data?.mediaFiles,
              createdBy: data?.createdBy,
            }}
          />
        </Modal>
      )}
    </div>
  );
};
