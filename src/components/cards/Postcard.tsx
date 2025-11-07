import type { MediaFile, ReactionItem } from "@/lib/types";
import Typography from "../forms/Typography";
import IconAndNumber from "../IconAndNumber";
import MediaGrid from "../molecules/MediaGrid";

export interface PostCardProps {
  avatar: string;
  profileName: string;
  handle: string;
  time: string;
  bgColor?: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  timeLineImage?: MediaFile[] | string;
  publicId?: string;
  reactionsData?: ReactionItem[];
  ifParagraph?: boolean;
  ifIcon?: boolean;
  headerActions?: React.ReactNode; // For edit/view mode differences
  onContentClick?: () => void; // For edit mode
  isEditMode?: boolean;
  className?: string;
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
  onContentClick,
  isEditMode = false,
  className,
}) => {
  const hasImages = Array.isArray(timeLineImage) && timeLineImage.length > 0;

  return (
    <article
      style={{ backgroundColor: bgColor }}
      className={`pt-4 mb-2 drop-shadow-4xl ${className || ""}`}
      aria-label={`Post by ${profileName}`}
    >
      {/* Header Section */}
      <header className="flex items-start px-4 relative">
        <img
          src={avatar}
          alt={`${profileName}'s avatar`}
          className="w-10 h-10 rounded-full flex-shrink-0"
          loading="lazy"
        />

        <div
          className={`flex ${
            isEditMode ? "flex-col" : "flex-row"
          } justify-between w-full items-start ml-2`}
        >
          <section
            className={`flex-1 min-w-0 ${isEditMode ? "cursor-pointer" : ""}`}
            onClick={onContentClick}
          >
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

          {/* Header Actions (More button, Edit button, etc.) */}
        </div>
        {headerActions}
      </header>

      {/* Media Section */}
      {hasImages && (
        <MediaGrid
          timeLineImage={timeLineImage}
          onMediaClick={isEditMode ? onContentClick : undefined}
        />
      )}

      {/* Action Icons */}
      {ifIcon && reactionsData && (
        <footer className="flex items-center py-4 ml-16">
          {reactionsData.map(({ type, icon: Icon, number }) => (
            <IconAndNumber
              key={type}
              publicid={publicId}
              reactionType={type}
              Icon={Icon}
              number={number}
            />
          ))}
        </footer>
      )}
    </article>
  );
};

export default PostCard;
