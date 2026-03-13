/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import type { MediaFile, ReactionItem } from "@/lib/types";
import IconAndNumber from "../IconAndNumber";
import MediaGrid from "../molecules/MediaGrid";
import Chat from "@/assets/icons/chat";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import PostHeader from "../molecules/PostHeader";
import { Bookmark, Repeat } from "lucide-react";
import { useCustomMutation } from "@/hooks/apiCalls";
import AnsweredPoll from "../molecules/AnsweredPoll";

// interface PostCardProps {
//   // Core data as object
//   post: {
//     publicId: string;
//     content: string;
//     media: MediaFile[];
//     createdAt: string;
//     reactions: ReactionItem[];
//   };

//   // Author data as separate object (might come from different API)
//   author: {
//     avatar: string;
//     displayName: string;
//     username: string;
//   };

//   // UI/behavior props separate (not part of data model)
//   ifParagraph?: boolean;
//   ifIcon?: boolean;
//   className?: string;

//   onCommentClick?: () => void;
//   onCardClick?: () => void;
//   headerActions?: React.ReactNode;
// }

export interface PostCardProps {
  publicId?: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  timeLineImage?: string | MediaFile[];
  reactionsData?: ReactionItem[];
  avatar: string;
  profileName: string;
  handle: string;
  time: string;
  bgColor?: string;
  ifParagraph?: boolean;
  ifIcon?: boolean;
  className?: string;
  commentslength?: number;
  pollChoices?: any[];
  headerActions?: React.ReactNode;
  onCommentClick?: (e: React.MouseEvent) => void;
  onCardClick?: (e: React.MouseEvent) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  avatar,
  profileName,
  handle,
  time,
  bgColor = "#FAFAFA",
  paragraphOne,
  paragraphTwo,
  timeLineImage,
  publicId,
  reactionsData,
  ifParagraph = true,
  ifIcon = true,
  headerActions,
  className,
  commentslength,
  pollChoices,
  onCommentClick,
  onCardClick,
}) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const hasImages = Array.isArray(timeLineImage) && timeLineImage.length > 0;

  const userReaction = reactionsData?.find((reaction) =>
    reaction.createdBy.includes(userObject?.email),
  )?.type;

  const bookmarkPostMutation = useCustomMutation({
    endpoint: `contents/saves`,
    onSuccessCallback: () => {},
  });

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  const handleBookmark = (
    publicId: string | undefined,
    e: React.MouseEvent,
  ) => {
    e.stopPropagation();
    if (!publicId) return;
    setIsBookmarked(!isBookmarked);

    bookmarkPostMutation.mutate({
      contentPublicId: publicId,
      saveType: "BOOKMARK",
    });
  };

  const handleRepost = (publicId: string | undefined, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!publicId) return;
    setIsReposted(!isReposted);

    bookmarkPostMutation.mutate({
      contentPublicId: publicId,
      saveType: "REPOST",
    });
  };

  return (
    <article
      style={{ backgroundColor: bgColor }}
      className={`pt-4 mb-2 drop-shadow-4xl cursor-pointer ${className || ""}`}
      aria-label={`Post by ${profileName}`}
      onClick={onCardClick}
    >
      <PostHeader
        avatar={avatar}
        profileName={profileName}
        handle={handle}
        time={time}
        ifParagraph={ifParagraph}
        paragraphOne={paragraphOne}
        paragraphTwo={paragraphTwo}
        headerActions={headerActions}
      />

      {/* Media Section */}
      {hasImages && (
        <MediaGrid timeLineImage={timeLineImage} onMediaClick={undefined} />
      )}

      {/* Poll Section */}
      {pollChoices && pollChoices?.length > 0 && (
        <AnsweredPoll pollChoices={pollChoices} />
      )}

      {/* Action Icons (Reactions) */}
      {ifIcon && reactionsData && (
        <footer className="flex items-center py-4 ml-16">
          <Chat number={commentslength} onClick={(e) => onCommentClick?.(e)} />

          {reactionsData?.map(({ type, icon: Icon, number }) => (
            <IconAndNumber
              key={type}
              publicid={publicId}
              reactionType={type}
              Icon={Icon}
              number={number}
              isActive={userReaction === type}
            />
          ))}

          <Repeat
            className={`cursor-pointer transition-colors mr-4 ${
              isReposted
                ? "text-[#2599F6] fill-[#2599F6]"
                : "text-[#8D8E96] hover:text-gray-700"
            }`}
            size={24}
            onClick={(e) => handleRepost(publicId, e)}
          />

          <Bookmark
            className={`cursor-pointer transition-colors ${
              isBookmarked
                ? "text-[#2599F6] fill-[#2599F6]"
                : "text-[#8D8E96] hover:text-gray-700"
            }`}
            size={24}
            onClick={(e) => handleBookmark(publicId, e)}
          />
        </footer>
      )}
    </article>
  );
};

export default PostCard;
