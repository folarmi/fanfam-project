// import defaultAvatar from "../assets/defaultAvatar.svg";
// import type { ProfilePostProps, StoryPost } from "@/lib/types";
// import { Loader } from "./molecules/Loader";
// import { transformReactions } from "@/lib/reaction";
// import { formatTimeAgo } from "@/utils/helperTwo";
// import Typography from "./forms/Typography";
// import Postcard from "./cards/Postcard";

// const Replies = ({
//   creatorContent,
//   creatorContentIsLoading,
// }: ProfilePostProps) => {
//   const contentItems: StoryPost[] = creatorContent || [];
//   const postsWithReplies = contentItems?.filter(
//     (item) => item.meta.commentCount > 0,
//   );

//   if (creatorContentIsLoading) {
//     return <Loader />;
//   }
//   return (
//     <div>
//       {postsWithReplies.length > 0 ? (
//         postsWithReplies.map((item) => (
//           <div className="relative" key={item.publicId}>
//             <Postcard
//               showModal={false}
//               toggleModal={() => {}}
//               profileName={item.creator?.name.split("@")[0]}
//               avatar={defaultAvatar}
//               handle={`@${item.creator?.username.split("@")[0]}`}
//               time={formatTimeAgo(item.createdDate)}
//               paragraphOne={item.message}
//               paragraphTwo=""
//               timeLineImage={item.mediaFiles || ""}
//               ifParagraph={true}
//               ifIcon={false}
//               bgColor="#fafafa"
//               reactionsData={transformReactions(item?.reactions)}
//             />
//           </div>
//         ))
//       ) : (
//         <div className="text-center py-8 text-grey_500">
//           <Typography variant="p2">No replies yet</Typography>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Replies;

import defaultAvatar from "../assets/defaultAvatar.svg";
import Typography from "./forms/Typography";
import { Loader } from "./molecules/Loader";
import { InfiniteScroll } from "./InfiniteScroll";
import type { ProfilePostProps, StoryPost } from "@/lib/types";
import { formatTimeAgo } from "@/utils/helperTwo";
import { transformReactions } from "@/lib/reaction";
import Postcard from "./cards/Postcard";

const Replies = ({
  creatorContent,
  creatorContentIsLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ProfilePostProps) => {
  if (creatorContentIsLoading) return <Loader />;

  // Only show posts that have at least one comment
  const postsWithReplies = creatorContent.filter(
    (item: StoryPost) => item.meta?.commentCount > 0,
  );

  return (
    <InfiniteScroll
      onLoader={fetchNextPage}
      isLoading={isFetchingNextPage}
      hasMore={hasNextPage}
    >
      {postsWithReplies.length > 0 ? (
        postsWithReplies.map((item: StoryPost) => (
          <Postcard
            key={item.publicId}
            profileName={item.creator?.name || "Unknown User"}
            avatar={item.creator?.profilePic || defaultAvatar}
            handle={`@${item.creator?.username || ""}`}
            time={formatTimeAgo(item.createdDate)}
            paragraphOne={item.message}
            timeLineImage={item.mediaFiles || ""}
            ifParagraph
            ifIcon={false}
            bgColor="#fafafa"
            reactionsData={transformReactions(item.reactions)}
          />
        ))
      ) : (
        <div className="text-center py-8 text-grey_500">
          <Typography variant="p2">No replies yet</Typography>
        </div>
      )}
    </InfiniteScroll>
  );
};

export default Replies;
