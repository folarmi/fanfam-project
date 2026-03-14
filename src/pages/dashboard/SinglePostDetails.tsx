import Postcard from "@/components/cards/Postcard";
import { CommentThread } from "@/components/CommentThread";
import { Loader } from "@/components/molecules/Loader";
import { useGetData } from "@/hooks/apiCalls";
import { useFetchProfile } from "@/hooks/apiHooks";
import { useAppSelector } from "@/lib/hook";
import { transformReactions } from "@/lib/reaction";
import type { RootState } from "@/lib/store";
import { extractComments, formatTimeAgo } from "@/utils/helperTwo";
import { useQueryClient } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

const SinglePostDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data: profileData, isLoading } = useFetchProfile(userObject);

  const { data, isLoading: getContentByIdIsLoading } = useGetData({
    url: `contents/${params?.id}`,
    queryKey: ["GetContentsById", JSON.stringify(params?.id)],
  });

  const pageIsLoading = getContentByIdIsLoading || isLoading;

  // data.data.comments is where the API puts comments on a single post
  const comments = extractComments(
    data?.data?.comments ?? data?.comments ?? data,
  );

  const postOwnerEmail = data?.createdBy ?? data?.creator?.email ?? "";

  const handleCommentAdded = () => {
    queryClient.invalidateQueries({
      queryKey: ["GetContentsById", params?.id],
      exact: false,
    });
  };

  return (
    <div>
      <div
        className="flex items-center mb-4 px-4 pt-4 cursor-pointer text-grey_400 hover:text-black transition-colors w-fit"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={20} className="mr-2" />
        <span className="font-medium text-sm">Back</span>
      </div>

      {pageIsLoading ? (
        <Loader />
      ) : (
        <div>
          {/* Original post */}
          <Postcard
            publicId={data?.publicId}
            profileName={profileData?.data?.displayName}
            avatar={profileData?.data?.profilePic}
            handle={`@${profileData?.data?.username}`}
            time={formatTimeAgo(data?.createdDate)}
            paragraphOne={data?.data?.message}
            timeLineImage={data?.data?.mediaFiles}
            ifParagraph
            reactionsData={transformReactions(data?.reactions)}
            bookmarkers={data?.bookmarkers}
            reposters={data?.reposters}
          />

          {/* Comment thread — compose box + all comments + inline reply boxes */}
          <CommentThread
            postId={params?.id ?? ""}
            postOwnerEmail={postOwnerEmail}
            comments={comments}
            onCommentAdded={handleCommentAdded}
            showPollOption
          />
        </div>
      )}
    </div>
  );
};

export { SinglePostDetails };
