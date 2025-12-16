import React from "react";
import Typography from "../forms/Typography";
import DefaultAvatar from "./DefaultAvatar";

export interface PostHeaderProps {
  avatar?: string | null;
  profileName: string;
  handle: string;
  time: string;

  ifParagraph?: boolean;
  paragraphOne?: string;
  paragraphTwo?: string;

  headerActions?: React.ReactNode;
}

const PostHeader: React.FC<PostHeaderProps> = ({
  avatar,
  profileName,
  handle,
  time,
  ifParagraph = false,
  paragraphOne,
  paragraphTwo,
  headerActions,
}) => {
  return (
    <header className="flex items-start px-4 relative">
      {/* Avatar */}
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

      {/* Main Content */}
      <div className="flex justify-between w-full items-start ml-2">
        <section className="flex-1 min-w-0">
          {/* Name + Handle + Time */}
          <div className="flex items-center flex-wrap gap-x-1.5">
            <Typography variant="titleTwo" className="font-semibold truncate">
              {profileName}
            </Typography>

            <Typography
              variant="p2"
              className="hidden md:inline text-grey_500 truncate"
            >
              {`@${handle}`}
            </Typography>

            <Typography variant="p2" className="text-grey_500 ml-auto md:ml-0">
              {time}
            </Typography>
          </div>

          {/* Mobile Handle */}
          <Typography variant="p2" className="md:hidden text-grey_500 truncate">
            {handle}
          </Typography>

          {/* Optional Paragraph Section */}
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

        {/* Header Actions */}
        {headerActions}
      </div>
    </header>
  );
};

export default PostHeader;
