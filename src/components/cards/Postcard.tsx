import type { MediaFile, ReactionItem } from "@/lib/types";
import Typography from "../forms/Typography";
import IconAndNumber from "../IconAndNumber";
import MediaGrid from "../molecules/MediaGrid";
import Chat from "@/assets/icons/chat";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import DefaultAvatar from "../molecules/DefaultAvatar";

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
      <header className="flex items-start px-4 relative">
        {!avatar ? (
          <DefaultAvatar fullName={profileName} />
        ) : (
          <img
            src={avatar}
            alt={`${profileName}'s avatar`}
            className="w-10 h-10 rounded-full flex-shrink-0"
            loading="lazy"
          />
        )}

        <div className="flex justify-between w-full items-start ml-2">
          <section className="flex-1 min-w-0">
            {/* Profile Info */}
            <div className="flex items-center flex-wrap gap-x-1.5">
              <Typography variant="titleTwo" className="font-semibold truncate">
                {profileName}
              </Typography>

              <Typography
                variant="p2"
                className="hidden md:inline text-grey_500 truncate"
              >
                {handle}
              </Typography>

              <Typography
                variant="p2"
                className="text-grey_500 ml-auto md:ml-0"
              >
                {time}
              </Typography>
            </div>

            {/* Mobile handle */}
            <Typography
              variant="p2"
              className="md:hidden text-grey_500 truncate"
            >
              {handle}
            </Typography>

            {/* Content Paragraphs */}
            {ifParagraph && (paragraphOne || paragraphTwo) && (
              <div className="mt-2 space-y-2">
                {paragraphOne && (
                  <p className="font-normal text-sm text-grey_30 leading-5">
                    {paragraphOne}
                  </p>
                )}
                {paragraphTwo && (
                  <p className="font-normal text-sm text-grey_700 leading-5">
                    {paragraphTwo}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Header Actions (More button) */}
          {headerActions}
        </div>
      </header>

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
