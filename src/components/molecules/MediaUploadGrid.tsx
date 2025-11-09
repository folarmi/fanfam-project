import { PostUploader } from "./PostUploader";
import Record from "@/assets/icons/record";
import Poll from "@/assets/icons/poll";
import Smile from "@/assets/icons/smile";

type MediaUploadGridProp = {
  isActive: boolean;
  ifPoll?: boolean;
  ifRecord?: boolean;
  handleFileUpload: (files: File[]) => void;
  handleRemoveFile: (index: number) => void;
  setIfUserIsCreatingPoll?: (isCreating: boolean) => void;
};

const MediaUploadGrid = ({
  handleFileUpload,
  handleRemoveFile,
  setIfUserIsCreatingPoll,
  isActive,
  ifPoll,
  ifRecord,
}: MediaUploadGridProp) => {
  return (
    <div className="flex items-center gap-x-3">
      <PostUploader
        handleFileUpload={handleFileUpload}
        handleRemoveFile={handleRemoveFile}
      />

      <Smile isActive={isActive} className="cursor-pointer" />
      {ifPoll && (
        <Poll
          onClick={() => setIfUserIsCreatingPoll?.(true)}
          isActive={isActive}
          className="cursor-pointer"
        />
      )}
      {ifRecord && <Record isActive={isActive} className="cursor-pointer" />}
    </div>
  );
};

export default MediaUploadGrid;
