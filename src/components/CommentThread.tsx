/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { useCustomMutation } from "@/hooks/apiCalls";
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
  createdBy: string; // email of the author
  userInfo: ApiUserInfo;
  message: string;
  replies: ApiComment[];
  reactions: any[];
  mediaFiles?: any[];
};

export function extractComments(raw: any): ApiComment[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw.comments)) return raw.comments;
  if (raw.data) {
    if (Array.isArray(raw.data)) return raw.data;
    if (Array.isArray(raw.data.comments)) return raw.data.comments;
  }
  console.warn("[CommentThread] Unrecognised commentsData shape:", raw);
  return [];
}

// ─── Delete button ────────────────────────────────────────────────────────────

const TrashIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14H6L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4h6v2" />
  </svg>
);

type DeleteButtonProps = {
  commentId: string;
  onDeleted: () => void;
};

const DeleteButton = ({ commentId, onDeleted }: DeleteButtonProps) => {
  const [confirming, setConfirming] = useState(false);

  const deleteMutation = useCustomMutation({
    endpoint: `contents/comments/${commentId}/remove`,
    method: "delete",
    onSuccessCallback: () => {
      onDeleted();
    },
    successMessage: () => "Deleted successfully",
    onError: () => {
      setConfirming(false);
    },
  });

  if (confirming) {
    return (
      <span className="flex items-center gap-2 text-xs">
        <span className="text-grey_60">Delete?</span>
        <button
          type="button"
          onClick={() => deleteMutation.mutate({})}
          disabled={deleteMutation.isPending}
          className="text-red-500 font-medium hover:underline disabled:opacity-50"
        >
          {deleteMutation.isPending ? "Deleting…" : "Yes"}
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-grey_60 hover:underline"
        >
          No
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="flex items-center gap-1 text-xs text-grey_60 hover:text-red-500 transition-colors"
      aria-label="Delete"
    >
      <TrashIcon />
      Delete
    </button>
  );
};

// ─── Single comment or reply ──────────────────────────────────────────────────

const MAX_DEPTH = 3;

type CommentItemProps = {
  comment: ApiComment | StoryPost;
  postId: string;
  postOwnerEmail: string;
  currentUserEmail: string;
  level?: number;
  onReplyAdded?: () => void;
  onDeleted?: () => void;
};

const CommentItem = ({
  comment,
  postId,
  postOwnerEmail,
  currentUserEmail,
  level = 0,
  onReplyAdded,
  onDeleted,
}: CommentItemProps) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const author = (comment as ApiComment).userInfo;
  const avatar = author?.profilePic ?? "";
  const profileName = author?.name ?? "";
  const handle = author?.username ? `@${author.username}` : "";

  // createdBy is the comment author's email
  const commentAuthorEmail =
    (comment as ApiComment).createdBy ??
    (comment as ApiComment).userInfo?.email ??
    "";

  const canDelete =
    currentUserEmail &&
    (currentUserEmail === commentAuthorEmail ||
      currentUserEmail === postOwnerEmail);

  const replies: (ApiComment | StoryPost)[] =
    (comment as ApiComment).replies ?? (comment as any).comments ?? [];
  const replyCount = replies.length;

  return (
    <div className={level > 0 ? "ml-6 border-l-2 border-grey_10 pl-4" : ""}>
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

      {/* Action row — Reply · View replies · Delete */}
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

        {/* Only render delete for authorised users */}
        {canDelete && (
          <DeleteButton
            commentId={comment.publicId}
            onDeleted={() => onDeleted?.()}
          />
        )}
      </div>

      {(showReplies || showReplyBox) && (
        <div className="mt-1 space-y-1">
          {showReplies &&
            replies.map((reply: any) => (
              <CommentItem
                key={reply.publicId}
                comment={reply}
                postId={postId}
                postOwnerEmail={postOwnerEmail}
                currentUserEmail={currentUserEmail}
                level={level + 1}
                onReplyAdded={onReplyAdded}
                // On reply deleted, refresh the whole thread
                onDeleted={onDeleted}
              />
            ))}

          {showReplyBox && (
            <div
              className={`mt-2 ${level > 0 ? "ml-6 pl-4" : "ml-6 border-l-2 border-grey_10 pl-4"}`}
            >
              <CommentBox
                ifRecord
                endpoint="contents/comments"
                commentId={comment.publicId}
                placeholder="Write a reply…"
                onSuccess={() => {
                  setShowReplyBox(false);
                  setShowReplies(true);
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

// ─── Full thread ──────────────────────────────────────────────────────────────

type CommentThreadProps = {
  postId: string;
  /** Email of the post owner — used for delete permission check */
  postOwnerEmail: string;
  comments: ApiComment[];
  onCommentAdded?: () => void;
  showPollOption?: boolean;
};

const CommentThread = ({
  postId,
  postOwnerEmail,
  comments,
  onCommentAdded,
  showPollOption = false,
}: CommentThreadProps) => {
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const currentUserEmail = userObject?.email ?? userObject?.usid ?? "";

  const handleDeleted = () => {
    queryClient.invalidateQueries({ queryKey: ["GetContents"], exact: false });
    queryClient.invalidateQueries({
      queryKey: ["comments", postId],
      exact: false,
    });
    queryClient.invalidateQueries({
      queryKey: ["GetContentsById", postId],
      exact: false,
    });
    onCommentAdded?.(); // triggers refetch in parent (CommentOnPost / SinglePostDetails)
  };

  return (
    <div className="mt-4">
      <div className="bg-grey_20 p-4">
        <CommentBox
          ifPoll={showPollOption}
          ifRecord
          endpoint={`contents/${postId}/comments`}
          placeholder="Write a comment…"
          onSuccess={onCommentAdded}
        />
      </div>

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
                postOwnerEmail={postOwnerEmail}
                currentUserEmail={currentUserEmail}
                onReplyAdded={onCommentAdded}
                onDeleted={handleDeleted}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export { CommentThread, CommentItem };
