import Comment from "@/components/atoms/Comment";
import ViewPost from "@/components/cards/ViewPost";
import CommentBox from "@/components/CommentBox";
import { Loader } from "@/components/molecules/Loader";
import { useGetData } from "@/hooks/apiCalls";
import { useFetchProfile } from "@/hooks/apiHooks";
import { useAppSelector } from "@/lib/hook";
import { transformReactions } from "@/lib/reaction";
import type { RootState } from "@/lib/store";
import type { StoryPost } from "@/lib/types";
import { formatTimeAgo } from "@/utils/helperTwo";
import { useParams } from "react-router-dom";

const SinglePostDetails = () => {
  const params = useParams();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data: profileData, isLoading } = useFetchProfile(userObject);
  const { data, isLoading: getContentByIdIsLoading } = useGetData({
    url: `contents/${params?.id}`,
    queryKey: ["GetContentsById"],
  });

  const pageIsLoading = getContentByIdIsLoading || isLoading;

  return (
    <div className="">
      <>
        {pageIsLoading ? (
          <Loader />
        ) : (
          <div className="">
            {/* Original Post */}
            <ViewPost
              publicId={data?.publicId}
              profileName={profileData?.data?.displayName}
              avatar={profileData?.data?.profilePic}
              handle={`@${profileData?.data?.username}`}
              time={formatTimeAgo(data?.createdDate)}
              paragraphOne={data?.message}
              timeLineImage={data?.mediaFiles}
              ifParagraph={true}
              reactionsData={transformReactions(data?.reactions)}
            />

            {/* Comment Box for Top-Level Comments */}
            <div className="mt-2 bg-grey_20 p-4">
              <CommentBox
                ifPoll
                ifRecord
                endpoint={`contents/${params?.id}/comments`}
                placeholder="Write a comment..."
              />
            </div>

            {/* Comments Section */}
            <div className="mt-4">
              {data?.data?.comments?.length > 0 ? (
                <>
                  <h3 className="text-lg font-semibold px-4 mb-4">
                    Comments ({data.data.comments.length})
                  </h3>
                  {data.data.comments.map((comment: StoryPost) => (
                    <Comment
                      key={comment.publicId}
                      comment={comment}
                      profileData={profileData}
                      postId={params?.id || ""}
                    />
                  ))}
                </>
              ) : (
                <div className="text-center py-8 text-grey_60">
                  No comments yet. Be the first to comment!
                </div>
              )}
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export { SinglePostDetails };
