// // Second
// import Comment from "@/components/atoms/Comment";
// import ViewPost from "@/components/cards/ViewPost";
// import CommentBox from "@/components/CommentBox";
// import { Loader } from "@/components/molecules/Loader";
// import { useGetData } from "@/hooks/apiCalls";
// import { useFetchProfile } from "@/hooks/apiHooks";
// import { useAppSelector } from "@/lib/hook";
// import { transformReactions } from "@/lib/reaction";
// import type { RootState } from "@/lib/store";
// import type { StoryPost } from "@/lib/types";
// import { formatTimeAgo } from "@/utils/helperTwo";
// import { useParams, useNavigate } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";

// const SinglePostDetails = () => {
//   const params = useParams();
//   const navigate = useNavigate();
//   const { userObject } = useAppSelector((state: RootState) => state.auth);
//   const { data: profileData, isLoading } = useFetchProfile(userObject);
//   const { data, isLoading: getContentByIdIsLoading } = useGetData({
//     url: `contents/${params?.id}`,
//     queryKey: ["GetContentsById"],
//   });

//   const pageIsLoading = getContentByIdIsLoading || isLoading;

//   return (
//     <div className="">
//       <>
//         <div
//           className="flex items-center mb-4 px-4 pt-4 cursor-pointer text-grey_400 hover:text-black transition-colors w-fit"
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft size={20} className="mr-2" />
//           <span className="font-medium text-sm">Back</span>
//         </div>

//         {pageIsLoading ? (
//           <Loader />
//         ) : (
//           <div className="">
//             {/* Original Post */}
//             <ViewPost
//               publicId={data?.publicId}
//               profileName={profileData?.data?.displayName}
//               avatar={profileData?.data?.profilePic}
//               handle={`@${profileData?.data?.username}`}
//               time={formatTimeAgo(data?.createdDate)}
//               paragraphOne={data?.data?.message}
//               timeLineImage={data?.data?.mediaFiles}
//               ifParagraph={true}
//               reactionsData={transformReactions(data?.reactions)}
//             />

//             {/* Comment Box for Top-Level Comments */}
//             <div className="mt-2 bg-grey_20 p-4">
//               <CommentBox
//                 ifPoll
//                 ifRecord
//                 endpoint={`contents/${params?.id}/comments`}
//                 placeholder="Write a comment..."
//               />
//             </div>

//             {/* Comments Section */}
//             <div className="mt-4">
//               {data?.data?.comments?.length > 0 ? (
//                 <>
//                   <h3 className="text-lg font-semibold px-4 mb-4">
//                     Comments ({data.data.comments.length})
//                   </h3>
//                   {data.data.comments.map((comment: StoryPost) => (
//                     <Comment
//                       key={comment.publicId}
//                       comment={comment}
//                       profileData={profileData}
//                       postId={params?.id || ""}
//                     />
//                   ))}
//                 </>
//               ) : (
//                 <div className="text-center py-8 text-grey_60">
//                   No comments yet. Be the first to comment!
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </>
//     </div>
//   );
// };

// export { SinglePostDetails };

import ViewPost from "@/components/cards/ViewPost";
import { CommentThread, extractComments } from "@/components/CommentThread";
import { Loader } from "@/components/molecules/Loader";
import { useGetData } from "@/hooks/apiCalls";
import { useFetchProfile } from "@/hooks/apiHooks";
import { useAppSelector } from "@/lib/hook";
import { transformReactions } from "@/lib/reaction";
import type { RootState } from "@/lib/store";
import { formatTimeAgo } from "@/utils/helperTwo";
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
          <ViewPost
            publicId={data?.publicId}
            profileName={profileData?.data?.displayName}
            avatar={profileData?.data?.profilePic}
            handle={`@${profileData?.data?.username}`}
            time={formatTimeAgo(data?.createdDate)}
            paragraphOne={data?.data?.message}
            timeLineImage={data?.data?.mediaFiles}
            ifParagraph
            reactionsData={transformReactions(data?.reactions)}
          />

          {/* Comment thread — compose box + all comments + inline reply boxes */}
          <CommentThread
            postId={params?.id ?? ""}
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
