import close from "@/assets/close.svg";
import PostHeader from "../molecules/PostHeader";
import type { MediaFile } from "@/lib/types";
import MediaGrid from "../molecules/MediaGrid";
// import { useForm } from "react-hook-form";
import CommentBox from "../CommentBox";

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
  };
};

const CommentOnPost = ({ publicId, toggleModal, data }: Prop) => {
  return (
    <div className="bg-white mx-auto w-1/2 rounded-xl p-6 shadow-xl">
      <button
        onClick={() => toggleModal?.(publicId)}
        className="cursor-pointer ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors flex justify-end"
        aria-label="Cancel editing"
      >
        <img src={close} alt="Close" className="w-5 h-5" />
      </button>
      <PostHeader
        avatar={data?.avatar}
        profileName={data?.profileName}
        handle={data?.handle}
        time={data?.time}
        ifParagraph={data?.message ? true : false}
        paragraphOne={data?.message}
      />

      {Array.isArray(data?.timeLineImage) && data.timeLineImage.length > 0 && (
        <MediaGrid
          timeLineImage={data.timeLineImage as MediaFile[]}
          onMediaClick={undefined}
        />
      )}
      <CommentBox
        ifPoll
        ifRecord
        endpoint={`contents/${data?.id}/comments`}
        placeholder="Write a comment..."
        onSuccess={toggleModal}
      />
    </div>
  );
};

export { CommentOnPost };
