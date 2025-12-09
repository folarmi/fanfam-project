import Timeline from "./cards/ViewPost";
import defaultAvatar from "../assets/defaultAvatar.svg";
import type { ProfilePostProps, StoryPost } from "@/lib/types";
import { Loader } from "./molecules/Loader";
import { transformReactions } from "@/lib/reaction";
import { formatTimeAgo } from "@/utils/helperTwo";
import Typography from "./forms/Typography";

const Replies = ({
  creatorContent,
  creatorContentIsLoading,
}: ProfilePostProps) => {
  const contentItems: StoryPost[] = creatorContent || [];
  const postsWithReplies = contentItems?.filter(
    (item) => item.meta.commentCount > 0
  );

  if (creatorContentIsLoading) {
    return <Loader />;
  }
  return (
    <div>
      {postsWithReplies.length > 0 ? (
        postsWithReplies.map((item) => (
          <div className="relative" key={item.publicId}>
            <Timeline
              showModal={false}
              toggleModal={() => {}}
              profileName={item.creator.split("@")[0]}
              avatar={defaultAvatar}
              handle={`@${item.creator.split("@")[0]}`}
              time={formatTimeAgo(item.createdDate)}
              paragraphOne={item.message}
              paragraphTwo=""
              timeLineImage={item.mediaFiles || ""}
              ifParagraph={true}
              ifIcon={false}
              bgColor="#fafafa"
              reactionsData={transformReactions(item?.reactions)}
            />
          </div>
        ))
      ) : (
        <div className="text-center py-8 text-grey_500">
          <Typography variant="p2">No replies yet</Typography>
        </div>
      )}
    </div>
  );
};

export default Replies;
