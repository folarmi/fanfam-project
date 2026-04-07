import React from "react";
import Typography from "../forms/Typography";
import DefaultAvatar from "./DefaultAvatar";
import type { MentionUser } from "@/utils/helperTwo";
import MentionLinkText from "../atoms/MentionLinkText";

export interface PostHeaderProps {
  avatar?: string | null;
  profileName: string;
  handle: string;
  time: string;

  ifParagraph?: boolean;
  paragraphOne?: string;
  paragraphTwo?: string;

  mentionsMap?: Record<string, MentionUser>;
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
  mentionsMap,
  headerActions,
}) => {
  return (
    <div className="flex items-start px-4 relative">
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

      <div className="flex justify-between w-full items-start ml-2 min-w-0">
        <section className="flex-1 min-w-0 overflow-hidden">
          <div className="flex items-center flex-wrap gap-x-1.5">
            <Typography
              variant="titleTwo"
              className="font-semibold truncate min-w-0"
            >
              {profileName}
            </Typography>

            <Typography
              variant="p2"
              className="hidden md:inline text-grey_500 truncate min-w-0"
            >
              {`@${handle}`}
            </Typography>

            <Typography
              variant="p2"
              className="text-grey_500 ml-auto md:ml-0 shrink-0"
            >
              {time}
            </Typography>
          </div>

          <Typography variant="p2" className="md:hidden text-grey_500 truncate">
            @{handle}
          </Typography>

          {ifParagraph && (paragraphOne || paragraphTwo) && (
            <div className="mt-2 space-y-2">
              {paragraphOne && (
                <p className="font-normal text-sm text-grey_30 leading-5 break-words">
                  <MentionLinkText
                    message={paragraphOne}
                    mentionsMap={mentionsMap}
                  />
                </p>
              )}

              {paragraphTwo && (
                <p className="font-normal text-sm text-grey_700 leading-5 break-words">
                  <MentionLinkText
                    message={paragraphTwo}
                    mentionsMap={mentionsMap}
                  />
                </p>
              )}
            </div>
          )}
        </section>

        {headerActions}
      </div>
    </div>
  );
};

export default PostHeader;
