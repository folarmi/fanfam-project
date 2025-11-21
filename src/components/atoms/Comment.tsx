/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import ViewPost from "@/components/cards/ViewPost";
import CommentBox from "@/components/CommentBox";
import { transformReactions } from "@/lib/reaction";
import { formatTimeAgo } from "@/utils/helperTwo";
import type { StoryPost } from "@/lib/types";

type CommentProps = {
  comment: StoryPost;
  profileData: any;
  postId: string;
  level?: number; // Track nesting level
};

const Comment = ({ comment, profileData, postId, level = 0 }: CommentProps) => {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const hasReplies = comment.replies && comment.replies.length > 0;
  const maxNestingLevel = 3; // Limit nesting to prevent excessive indentation

  return (
    <div
      className={`${level > 0 ? "ml-8 border-l-2 border-grey_10 pl-4" : ""}`}
    >
      <ViewPost
        publicId={comment?.publicId}
        profileName={profileData?.data?.displayName}
        avatar={profileData?.data?.profilePic}
        handle={`@${profileData?.data?.username}`}
        time={formatTimeAgo(comment?.createdDate)}
        paragraphOne={comment?.message}
        timeLineImage={comment?.mediaFiles}
        ifParagraph={true}
        reactionsData={transformReactions(comment?.reactions)}
      />

      {/* Reply Button */}
      <div className="flex gap-4 px-4 pb-2">
        <button
          onClick={() => setShowReplyBox(!showReplyBox)}
          className="text-sm text-grey_60 hover:text-primary transition-colors"
        >
          {showReplyBox ? "Cancel" : "Reply"}
        </button>

        {hasReplies && (
          <button
            onClick={() => setShowReplies(!showReplies)}
            className="text-sm text-grey_60 hover:text-primary transition-colors"
          >
            {showReplies ? "Hide" : "Show"} {comment.replies.length}{" "}
            {comment.replies.length === 1 ? "reply" : "replies"}
          </button>
        )}
      </div>

      {/* Reply Box */}
      {showReplyBox && level < maxNestingLevel && (
        <div className="mt-2 ml-8">
          <CommentBox
            endpoint={`contents/comments`}
            commentId={comment.publicId}
            placeholder={`Reply to @${profileData?.data?.username}...`}
            onSuccess={() => setShowReplyBox(false)}
          />
        </div>
      )}

      {/* Nested Replies */}
      {showReplies && hasReplies && (
        <div className="mt-2">
          {comment.replies.map((reply: StoryPost) => (
            <Comment
              key={reply.publicId}
              comment={reply}
              profileData={profileData}
              postId={postId}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Comment;
