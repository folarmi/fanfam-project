import type { MediaFile, ReactionItem } from "@/lib/types";
import IconAndNumber from "../IconAndNumber";
import MediaGrid from "../molecules/MediaGrid";
import Chat from "@/assets/icons/chat";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import PostHeader from "../molecules/PostHeader";

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
  onCommentClick,
  onCardClick,
}) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const hasImages = Array.isArray(timeLineImage) && timeLineImage.length > 0;

  const userReaction = reactionsData?.find((reaction) =>
    reaction.createdBy.includes(userObject?.email)
  )?.type;

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
        </footer>
      )}
    </article>
  );
};

export default PostCard;
