import { PostUploader } from "./PostUploader";
import Record from "@/assets/icons/record";
import PollIcon from "@/assets/icons/poll";
import Schedule from "../svgs/Schedule";
// import Smile from "@/assets/icons/smile";

type MediaUploadGridProp = {
  isActive: boolean;
  ifPoll?: boolean;
  ifRecord?: boolean;
  ifSchedule?: boolean;
  handleFileUpload: (files: File[]) => void;
  handleRemoveFile: (index: number) => void;
  setIfUserIsCreatingPoll?: (isCreating: boolean) => void;
  setIsPostToBeScheduled?: (isCreating: boolean) => void;
  onRecordClick?: () => void;
};

const MediaUploadGrid = ({
  isActive,
  ifRecord,
  ifPoll,
  ifSchedule,
  handleFileUpload,
  handleRemoveFile,
  onRecordClick,
  setIfUserIsCreatingPoll,
  setIsPostToBeScheduled,
}: MediaUploadGridProp) => {
  return (
    <div className="flex items-center gap-x-3">
      <PostUploader
        handleFileUpload={handleFileUpload}
        handleRemoveFile={handleRemoveFile}
      />

      {/* <Smile isActive={isActive} className="cursor-pointer" /> */}
      {ifPoll && (
        <PollIcon
          onClick={() => setIfUserIsCreatingPoll?.(true)}
          isActive={isActive}
          className="cursor-pointer"
        />
      )}
      {ifRecord && (
        <Record
          onClick={onRecordClick}
          isActive={isActive}
          className="cursor-pointer"
        />
      )}
      {ifSchedule && (
        <Schedule
          isActive={isActive}
          className="cursor-pointer"
          onClick={() => setIsPostToBeScheduled?.(true)}
        />
      )}
    </div>
  );
};

export default MediaUploadGrid;
