import close from "@/assets/close.svg";
import PostHeader from "@/components/molecules/PostHeader";
import MediaGrid from "@/components/molecules/MediaGrid";
import { CommentThread } from "@/components/CommentThread";
import type { MediaFile } from "@/lib/types";
import { useGetData } from "@/hooks/apiCalls";
import { extractComments } from "@/utils/helperTwo";

type Prop = {
  publicId: string | undefined;
  toggleModal: (postId?: string) => void;
  data: {
    id: string;
    message: string;
    avatar: string;
    profileName: string;
    handle: string;
    time: string;
    timeLineImage?: string | MediaFile[];
    /** Email of the post creator — used for delete permission */
    createdBy?: string;
  };
};

const CommentOnPost = ({ publicId, toggleModal, data }: Prop) => {
  const { data: commentsData, refetch } = useGetData({
    url: `contents/${data.id}/comments`,
    queryKey: ["comments", data.id],
  });

  const comments = extractComments(commentsData);

  return (
    <div className="bg-white mx-auto w-1/2 rounded-xl p-6 shadow-xl max-h-[90vh] overflow-y-auto">
      <button
        onClick={() => toggleModal?.(publicId)}
        className="cursor-pointer ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors flex justify-end"
        aria-label="Close modal"
      >
        <img src={close} alt="Close" className="w-5 h-5" />
      </button>

      <PostHeader
        avatar={data.avatar}
        profileName={data.profileName}
        handle={data.handle}
        time={data.time}
        ifParagraph={!!data.message}
        paragraphOne={data.message}
      />

      {Array.isArray(data.timeLineImage) && data.timeLineImage.length > 0 && (
        <MediaGrid
          timeLineImage={data.timeLineImage as MediaFile[]}
          onMediaClick={undefined}
        />
      )}

      <hr className="my-4 border-grey_10" />

      <CommentThread
        postId={data.id}
        postOwnerEmail={data.createdBy ?? ""}
        comments={comments}
        onCommentAdded={refetch}
        showPollOption
      />
    </div>
  );
};

export { CommentOnPost };
