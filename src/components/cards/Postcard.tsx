// /* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState } from "react";
// import type { MediaFile, ReactionItem } from "@/lib/types";
// import IconAndNumber from "../IconAndNumber";
// import MediaGrid from "../molecules/MediaGrid";
// import Chat from "@/assets/icons/chat";
// import { useAppSelector } from "@/lib/hook";
// import type { RootState } from "@/lib/store";
// import PostHeader from "../molecules/PostHeader";
// import { Bookmark, Repeat } from "lucide-react";
// import { useCustomMutation } from "@/hooks/apiCalls";
// import AnsweredPoll from "../molecules/AnsweredPoll";

// export interface PostCardProps {
//   publicId?: string;
//   paragraphOne?: string;
//   paragraphTwo?: string;
//   timeLineImage?: string | MediaFile[];
//   reactionsData?: ReactionItem[];
//   avatar: string;
//   profileName: string;
//   handle: string;
//   time: string;
//   bgColor?: string;
//   ifParagraph?: boolean;
//   ifIcon?: boolean;
//   className?: string;
//   commentslength?: number;
//   pollChoices?: any[];
//   headerActions?: React.ReactNode;
//   onCommentClick?: (e: React.MouseEvent) => void;
//   onCardClick?: (e: React.MouseEvent) => void;
// }

// const PostCard: React.FC<PostCardProps> = ({
//   avatar,
//   profileName,
//   handle,
//   time,
//   bgColor = "#FAFAFA",
//   paragraphOne,
//   paragraphTwo,
//   timeLineImage,
//   publicId,
//   reactionsData,
//   ifParagraph = true,
//   ifIcon = true,
//   headerActions,
//   className,
//   commentslength,
//   pollChoices,
//   onCommentClick,
//   onCardClick,
// }) => {
//   const { userObject } = useAppSelector((state: RootState) => state.auth);

//   const hasImages = Array.isArray(timeLineImage) && timeLineImage.length > 0;

//   const userReaction = reactionsData?.find((reaction) =>
//     reaction.createdBy.includes(userObject?.email),
//   )?.type;

//   const bookmarkPostMutation = useCustomMutation({
//     endpoint: `contents/saves`,
//     onSuccessCallback: () => {},
//   });

//   const [isBookmarked, setIsBookmarked] = useState(false);
//   const [isReposted, setIsReposted] = useState(false);

//   const handleBookmark = (
//     publicId: string | undefined,
//     e: React.MouseEvent,
//   ) => {
//     e.stopPropagation();
//     if (!publicId) return;
//     setIsBookmarked(!isBookmarked);

//     bookmarkPostMutation.mutate({
//       contentPublicId: publicId,
//       saveType: "BOOKMARK",
//     });
//   };

//   const handleRepost = (publicId: string | undefined, e: React.MouseEvent) => {
//     e.stopPropagation();
//     if (!publicId) return;
//     setIsReposted(!isReposted);

//     bookmarkPostMutation.mutate({
//       contentPublicId: publicId,
//       saveType: "REPOST",
//     });
//   };

//   return (
//     <article
//       style={{ backgroundColor: bgColor }}
//       className={`pt-4 mb-2 drop-shadow-4xl cursor-pointer ${className || ""}`}
//       aria-label={`Post by ${profileName}`}
//       onClick={onCardClick}
//     >
//       <PostHeader
//         avatar={avatar}
//         profileName={profileName}
//         handle={handle}
//         time={time}
//         ifParagraph={ifParagraph}
//         paragraphOne={paragraphOne}
//         paragraphTwo={paragraphTwo}
//         headerActions={headerActions}
//       />

//       {/* Media Section */}
//       {hasImages && (
//         <MediaGrid timeLineImage={timeLineImage} onMediaClick={undefined} />
//       )}

//       {/* Poll Section */}
//       {pollChoices && pollChoices?.length > 0 && (
//         <AnsweredPoll pollChoices={pollChoices} postId={publicId} />
//       )}

//       {/* Action Icons (Reactions) */}
//       {ifIcon && reactionsData && (
//         <footer className="flex items-center py-4 ml-16">
//           <Chat number={commentslength} onClick={(e) => onCommentClick?.(e)} />

//           {reactionsData?.map(({ type, icon: Icon, number }) => (
//             <IconAndNumber
//               key={type}
//               publicid={publicId}
//               reactionType={type}
//               Icon={Icon}
//               number={number}
//               isActive={userReaction === type}
//             />
//           ))}

//           <Repeat
//             className={`cursor-pointer transition-colors mr-4 ${
//               isReposted
//                 ? "text-[#2599F6] fill-[#2599F6]"
//                 : "text-[#8D8E96] hover:text-gray-700"
//             }`}
//             size={24}
//             onClick={(e) => handleRepost(publicId, e)}
//           />

//           <Bookmark
//             className={`cursor-pointer transition-colors ${
//               isBookmarked
//                 ? "text-[#2599F6] fill-[#2599F6]"
//                 : "text-[#8D8E96] hover:text-gray-700"
//             }`}
//             size={24}
//             onClick={(e) => handleBookmark(publicId, e)}
//           />
//         </footer>
//       )}
//     </article>
//   );
// };

// export default PostCard;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import type { MediaFile, ReactionItem } from "@/lib/types";
import MediaGrid from "../molecules/MediaGrid";
import Chat from "@/assets/icons/chat";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import PostHeader from "../molecules/PostHeader";
import { Bookmark, MoreHorizontal, Repeat, ThumbsUp } from "lucide-react";
import { useCustomMutation } from "@/hooks/apiCalls";
import AnsweredPoll from "../molecules/AnsweredPoll";
import { useQueryClient } from "@tanstack/react-query";

const REACTIONS = [
  { type: "LIKE", emoji: "👍", label: "Like" },
  { type: "DISLIKE", emoji: "👎", label: "Dislike" },
  { type: "LOVE", emoji: "❤️", label: "Love" },
  { type: "LOL", emoji: "😂", label: "LOL" },
];

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
  // ViewPost props folded in
  showModal?: boolean;
  toggleModal?: () => void;
  TimeLineModal?: React.ReactNode;
  onCommentClick?: (e?: React.MouseEvent) => void;
  onCardClick?: (e?: React.MouseEvent) => void;
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
  className,
  commentslength,
  pollChoices,
  onCommentClick,
  onCardClick,
  showModal,
  toggleModal,
  TimeLineModal,
}) => {
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const hasImages = Array.isArray(timeLineImage) && timeLineImage.length > 0;

  const userReaction = reactionsData?.find((reaction) =>
    reaction.createdBy?.includes(userObject?.email),
  )?.type;

  const reactionCounts = Object.fromEntries(
    REACTIONS.map(({ type }) => [
      type,
      reactionsData?.find((r) => r.type === type)?.number ?? 0,
    ]),
  );

  const totalReactions = Object.values(reactionCounts).reduce(
    (a, b) => a + b,
    0,
  );

  // ── Bookmark / Repost ──────────────────────────────────────────
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isReposted, setIsReposted] = useState(false);

  const saveMutation = useCustomMutation({
    endpoint: `contents/saves`,
    onSuccessCallback: () => {},
  });

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!publicId) return;
    setIsBookmarked((prev) => !prev);
    saveMutation.mutate({ contentPublicId: publicId, saveType: "BOOKMARK" });
  };

  const handleRepost = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!publicId) return;
    setIsReposted((prev) => !prev);
    saveMutation.mutate({ contentPublicId: publicId, saveType: "REPOST" });
  };

  // ── Reaction optimistic update ─────────────────────────────────
  const reactMutation = useCustomMutation({
    endpoint: `contents/reactions`,
    onSuccessCallback: () => {},
  });

  const handleReaction = (reactionType: string) => {
    const isActive = userReaction === reactionType;

    // Update every ["GetContents", *] cache entry (covers all search terms)
    const allContentQueries = queryClient.getQueriesData<any>({
      queryKey: ["GetContents"],
    });

    allContentQueries.forEach(([queryKey]) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData?.pages) return oldData;

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              content: page.data?.content?.map((post: any) => {
                if (post?.publicId !== publicId) return post;

                const reactions = post?.reactions || [];

                if (isActive) {
                  // Toggle off
                  return {
                    ...post,
                    reactions: reactions.filter(
                      (r: any) =>
                        !(
                          r?.createdBy === userObject?.email &&
                          r?.type === reactionType
                        ),
                    ),
                  };
                } else {
                  // Swap to new reaction
                  return {
                    ...post,
                    reactions: [
                      ...reactions.filter(
                        (r: any) => r.createdBy !== userObject?.email,
                      ),
                      {
                        publicId: `temp-${Date.now()}`,
                        createdBy: userObject?.email,
                        lastModifiedBy: userObject?.email,
                        createdDate: new Date().toISOString(),
                        lastModifiedDate: new Date().toISOString(),
                        type: reactionType,
                      },
                    ],
                  };
                }
              }),
            },
          })),
        };
      });
    });

    reactMutation.mutate({ pubId: publicId, reactionType });
  };

  // ── "..." modal outside-click close ───────────────────────────
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showModal) return;
    const handler = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        toggleModal?.();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showModal, toggleModal]);

  // ── Reaction picker hover state ────────────────────────────────
  const [pickerOpen, setPickerOpen] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openPicker = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setPickerOpen(true);
  };
  const closePicker = () => {
    hideTimer.current = setTimeout(() => setPickerOpen(false), 200);
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
        headerActions={
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleModal?.();
              }}
              className="cursor-pointer p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="More options"
            >
              <MoreHorizontal className="w-5 h-5 text-gray-600" />
            </button>

            {showModal && TimeLineModal && (
              <div
                ref={modalRef}
                className="absolute right-0 top-8 bg-white w-[262px] rounded-2xl border border-gray-200 z-50 bg-modal-gradient shadow-triple"
                role="menu"
                onClick={(e) => e.stopPropagation()}
              >
                {TimeLineModal}
              </div>
            )}
          </>
        }
      />

      {hasImages && (
        <MediaGrid timeLineImage={timeLineImage} onMediaClick={undefined} />
      )}

      {pollChoices && pollChoices.length > 0 && (
        <AnsweredPoll pollChoices={pollChoices} postId={publicId} />
      )}

      {ifIcon && reactionsData && (
        <footer
          className="flex items-center py-4 ml-16"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Comment */}
          <Chat number={commentslength} onClick={(e) => onCommentClick?.(e)} />

          {/* Reaction picker */}
          <div
            className="relative flex items-center mr-4"
            onMouseEnter={openPicker}
            onMouseLeave={closePicker}
          >
            {/* Popover */}
            {pickerOpen && (
              <div
                className="absolute bottom-8 left-0 flex items-center gap-1
                           bg-white border border-gray-200 rounded-full px-3 py-2
                           shadow-lg z-50"
                onMouseEnter={openPicker}
                onMouseLeave={closePicker}
              >
                {REACTIONS.map(({ type, emoji, label }) => (
                  <button
                    key={type}
                    title={label}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReaction(type);
                      setPickerOpen(false);
                    }}
                    className={`flex flex-col items-center px-2 py-1 rounded-full
                                transition-transform hover:scale-125 hover:bg-gray-100
                                ${userReaction === type ? "scale-110" : ""}`}
                  >
                    <span className="text-xl leading-none">{emoji}</span>
                    {reactionCounts[type] > 0 && (
                      <span className="text-[10px] text-gray-500 mt-0.5">
                        {reactionCounts[type]}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Trigger */}
            <div className="flex items-center gap-1 cursor-pointer">
              <ThumbsUp
                size={24}
                className={`transition-colors ${
                  userReaction
                    ? "text-[#2599F6] fill-[#2599F6]"
                    : "text-[#8D8E96] hover:text-gray-700"
                }`}
              />
              {totalReactions > 0 && (
                <span className="text-sm text-gray-500">{totalReactions}</span>
              )}
            </div>
          </div>

          {/* Repost */}
          <Repeat
            className={`cursor-pointer transition-colors mr-4 ${
              isReposted
                ? "text-[#2599F6] fill-[#2599F6]"
                : "text-[#8D8E96] hover:text-gray-700"
            }`}
            size={24}
            onClick={handleRepost}
          />

          {/* Bookmark */}
          <Bookmark
            className={`cursor-pointer transition-colors ${
              isBookmarked
                ? "text-[#2599F6] fill-[#2599F6]"
                : "text-[#8D8E96] hover:text-gray-700"
            }`}
            size={24}
            onClick={handleBookmark}
          />
        </footer>
      )}
    </article>
  );
};

export default React.memo(PostCard);
