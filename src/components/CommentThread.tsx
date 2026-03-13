/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CommentBox from "@/components/CommentBox";
import { transformReactions } from "@/lib/reaction";
import { formatTimeAgo } from "@/utils/helperTwo";
import type { StoryPost } from "@/lib/types";
import ViewPost from "@/components/cards/ViewPost";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ApiUserInfo = {
  email: string;
  name: string;
  profilePic: string | null;
  username: string;
};

export type ApiComment = {
  publicId: string;
  createdDate: string;
  userInfo: ApiUserInfo;
  message: string;
  /** API embeds replies directly on each comment */
  replies: ApiComment[];
  reactions: any[];
  mediaFiles?: any[];
};

/**
 * Safely pull the comments array out of whatever shape the hook returns.
 * Handles: raw array, { comments: [] }, { data: [] }, { data: { comments: [] } }
 */
export function extractComments(raw: any): ApiComment[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw.comments)) return raw.comments;
  if (raw.data) {
    if (Array.isArray(raw.data)) return raw.data;
    if (Array.isArray(raw.data.comments)) return raw.data.comments;
  }
  console.warn(
    "[CommentThread] Unrecognised commentsData shape — check the console:",
    raw,
  );
  return [];
}

// ─── Single comment or reply ──────────────────────────────────────────────────

type CommentItemProps = {
  comment: ApiComment | StoryPost;
  postId: string;
  level?: number;
  onReplyAdded?: () => void;
};

const MAX_DEPTH = 3;

const CommentItem = ({
  comment,
  postId,
  level = 0,
  onReplyAdded,
}: CommentItemProps) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  // Support both ApiComment shape (userInfo.*) and legacy StoryPost shape
  const author = (comment as ApiComment).userInfo;
  const avatar = author?.profilePic ?? "";
  const profileName = author?.name ?? "";
  const handle = author?.username ? `@${author.username}` : "";

  const replies: (ApiComment | StoryPost)[] =
    (comment as ApiComment).replies ?? (comment as any).comments ?? [];
  const replyCount = replies.length;

  return (
    <div className={level > 0 ? "ml-6 border-l-2 border-grey_10 pl-4" : ""}>
      {/* Comment / reply card */}
      <ViewPost
        publicId={comment.publicId}
        profileName={profileName}
        avatar={avatar}
        handle={handle}
        time={formatTimeAgo(comment.createdDate)}
        paragraphOne={comment.message}
        timeLineImage={(comment as any).mediaFiles}
        ifParagraph={!!comment.message}
        reactionsData={transformReactions(comment.reactions)}
      />

      {/* Action row */}
      <div className="flex items-center gap-4 px-4 pb-2">
        {level < MAX_DEPTH && (
          <button
            type="button"
            onClick={() => setShowReplyBox((v) => !v)}
            className="text-xs text-blue_20 font-medium hover:underline transition-colors"
          >
            {showReplyBox ? "Cancel" : "Reply"}
          </button>
        )}

        {replyCount > 0 && (
          <button
            type="button"
            onClick={() => setShowReplies((v) => !v)}
            className="text-xs text-grey_60 hover:underline transition-colors"
          >
            {showReplies
              ? `Hide ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`
              : `View ${replyCount} ${replyCount === 1 ? "reply" : "replies"}`}
          </button>
        )}
      </div>

      {/* Indented replies + compose box — rendered only when open */}
      {(showReplies || showReplyBox) && (
        <div className="mt-1 space-y-1">
          {showReplies &&
            replies.map((reply: any) => (
              <CommentItem
                key={reply.publicId}
                comment={reply}
                postId={postId}
                level={level + 1}
                onReplyAdded={onReplyAdded}
              />
            ))}

          {showReplyBox && (
            <div
              className={`mt-2 ${level > 0 ? "ml-6 pl-4" : "ml-6 border-l-2 border-grey_10 pl-4"}`}
            >
              <CommentBox
                ifRecord
                // POST /contents/comments/{commentId}/replies
                endpoint="contents/comments"
                commentId={comment.publicId}
                placeholder="Write a reply…"
                onSuccess={() => {
                  setShowReplyBox(false);
                  setShowReplies(true); // show replies so user sees new one
                  onReplyAdded?.();
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ─── Full thread (comment box + list of comments) ─────────────────────────────

type CommentThreadProps = {
  postId: string;
  comments: ApiComment[];
  onCommentAdded?: () => void;
  /** Pass true on the home feed modal where poll + go-live are wanted */
  showPollOption?: boolean;
};

const CommentThread = ({
  postId,
  comments,
  onCommentAdded,
  showPollOption = false,
}: CommentThreadProps) => (
  <div className="mt-4">
    {/* Top-level compose box */}
    <div className="bg-grey_20 p-4">
      <CommentBox
        ifPoll={showPollOption}
        ifRecord
        endpoint={`contents/${postId}/comments`}
        placeholder="Write a comment…"
        onSuccess={onCommentAdded}
      />
    </div>

    {/* Comment list */}
    <div className="mt-4 divide-y divide-grey_10">
      {comments.length === 0 ? (
        <p className="text-center text-sm text-grey_60 py-8">
          No comments yet. Be the first to comment!
        </p>
      ) : (
        comments.map((comment) => (
          <div key={comment.publicId} className="py-2">
            <CommentItem
              comment={comment}
              postId={postId}
              onReplyAdded={onCommentAdded}
            />
          </div>
        ))
      )}
    </div>
  </div>
);

export { CommentThread, CommentItem };
