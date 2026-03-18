/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import CustomButton from "./forms/CustomButton";
import { useForm } from "react-hook-form";
import { CustomTextArea } from "./forms/CustomTextArea";
import { useCustomMutation } from "@/hooks/apiCalls";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import MediaUploadGrid from "./molecules/MediaUploadGrid";
import { combineDateAndTimeToISO, getMediaType } from "@/utils/helperTwo";
import { useUploadFiles } from "@/hooks/useUploadFiles";
import { useQueryClient } from "@tanstack/react-query";
import video from "@/assets/icons/video.svg";
import Typography from "./forms/Typography";
import { useNavigate } from "react-router-dom";
import VoiceRecorderModal from "./modals/VoiceRecorderModal";
import { DateTimePicker } from "./forms/DateTimePicker";
import { showInlineToast } from "@/utils/toastUtils";

type CommentBoxProp = {
  ifPoll?: boolean;
  ifRecord?: boolean;
  endpoint?: string;
  ifGoLive?: boolean;
  ifSchedule?: boolean;
  placeholder?: string;
  commentId?: string;
  setIfUserIsCreatingPoll?: (isCreating: boolean) => void;
  onSuccess?: () => void;
};

const CommentBox = ({
  ifRecord,
  ifPoll,
  ifSchedule,
  endpoint = "contents",
  setIfUserIsCreatingPoll,
  commentId,
  onSuccess,
  placeholder = "Write a post…",
  ifGoLive = false,
}: CommentBoxProp) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    reset,
    clearErrors,
    trigger,
    formState: { isSubmitted },
  } = useForm();

  const queuedFilesRef = useRef<File[]>([]);
  const [isActive, setIsActive] = useState(false);
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);

  const [isRecorderOpen, setIsRecorderOpen] = useState(false);
  const [isPostToBeScheduled, setIsPostToBeScheduled] = useState(false);

  const {
    uploadFiles,
    isUploading,
    reset: resetFiles,
  } = useUploadFiles({
    usid: userObject?.usid,
    onSuccess: () => resetFiles(),
    onError: (error) =>
      showInlineToast({ type: "error", title: error?.message }),
  });

  const handleFocus = () => setIsActive(true);
  const handleBlur = () => setIsActive(false);

  const updateQueuedFiles = (files: File[]) => {
    setQueuedFiles(files);
    queuedFilesRef.current = files;
  };

  const handleFileUpload = (files: File[]) => {
    const updated = [...queuedFilesRef.current, ...files];
    updateQueuedFiles(updated);
  };

  const handleRemoveFile = (index: number) => {
    const updated = queuedFilesRef.current.filter((_, i) => i !== index);
    updateQueuedFiles(updated);
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    const audioFile = new File([audioBlob], `voice-note-${Date.now()}.webm`, {
      type: audioBlob.type,
    });
    setQueuedFiles((prev) => [...prev, audioFile]);
    showInlineToast({
      type: "success",
      title: "Voice note added successfully",
    });
  };

  const mutationEndpoint = commentId
    ? `${endpoint}/${commentId}/replies`
    : endpoint;

  const submitForm = async (data: any) => {
    if (!data.message?.trim() && queuedFiles.length === 0) {
      showInlineToast({
        type: "error",
        title: commentId
          ? "Reply message or media is required"
          : "Post message or media is required",
      });
      return;
    }

    if (queuedFiles.length > 0) {
      try {
        const mediaLinks = await uploadFiles(queuedFiles);
        createContentMutation.mutate({
          ...data,
          message: data.message || "",
          mediaFiles: mediaLinks,
          mentions: [],
          mediaType: getMediaType(queuedFiles),
        });
        setQueuedFiles([]);
      } catch (error) {
        console.error("Upload failed:", error);
      }
    } else {
      const { eventDate, eventTime, ...rest } = data;

      const payload = {
        ...rest,
        mediaFiles: [],
        mentions: [],
        scheduledFor:
          isPostToBeScheduled && eventDate && eventTime
            ? combineDateAndTimeToISO(eventDate, eventTime)
            : null,
      };
      createContentMutation.mutate(payload);
      // console.log(payload);
    }
  };

  const createContentMutation = useCustomMutation({
    endpoint: mutationEndpoint,
    onSuccessCallback: () => {
      reset();
      resetFiles();
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
      onSuccess?.();
    },
    successMessage: () =>
      commentId ? "Reply added successfully" : "Post added successfully",
    onError: () => {},
  });

  useEffect(() => {
    if (!isSubmitted) return;
    if (queuedFiles.length > 0) clearErrors("message");
    else trigger("message");
  }, [queuedFiles.length, clearErrors, trigger]);

  const isPostable = isActive || queuedFiles.length > 0;

  return (
    <form onSubmit={handleSubmit(submitForm)} className="mt-4">
      <CustomTextArea
        placeholder={placeholder}
        name="message"
        control={control}
        rules={{
          validate: (value: string) => {
            if (!value?.trim() && queuedFilesRef.current.length === 0) {
              return commentId
                ? "Reply message or media is required"
                : "Post message or media is required";
            }
            return true;
          },
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={commentId ? 3 : 5}
      />

      {/* Queued file chips */}
      {queuedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {queuedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 bg-gray-100 rounded-full px-3 py-1 text-xs text-gray-700"
            >
              {file.type.startsWith("audio/") ? "🎤" : "📎"} {file.name}
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-gray-400 hover:text-red-500 ml-1 leading-none"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Toolbar row */}
      <div className="flex items-center justify-between mt-3 p-4">
        <MediaUploadGrid
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
          isActive={isActive}
          ifPoll={ifPoll}
          ifRecord={ifRecord}
          ifSchedule={ifSchedule}
          setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
          setIsPostToBeScheduled={setIsPostToBeScheduled}
          onRecordClick={() => setIsRecorderOpen(true)}
        />

        {!isPostToBeScheduled && (
          <div className="flex items-center gap-3">
            <CustomButton
              variant={isPostable ? "primary" : "disabled"}
              className="bg-grey_90 px-6 rounded-full"
              disabled={createContentMutation.isPending || isUploading}
              loading={createContentMutation.isPending || isUploading}
            >
              {commentId ? "Reply" : "Post"}
            </CustomButton>

            {ifGoLive && (
              <div
                className="border border-blue_1000 py-2 px-4 flex items-center rounded-3xl cursor-pointer"
                onClick={() => navigate("livestreaming")}
              >
                <img src={video} alt="video" className="mr-1 w-4 h-4" />
                <Typography variant="subtitle3" className="text-blue_20">
                  Go Live
                </Typography>
              </div>
            )}
          </div>
        )}
      </div>

      {isPostToBeScheduled && (
        <div className="mx-4 mb-4 flex items-center justify-between border border-grey_50 rounded-md p-4">
          <DateTimePicker
            control={control}
            dateName="eventDate"
            timeName="eventTime"
            label=""
          />
          <CustomButton
            // variant={isPostable ? "primary" : "disabled"}
            className="bg-grey_90 px-6 rounded-full"
            disabled={createContentMutation.isPending || isUploading}
            loading={createContentMutation.isPending || isUploading}
          >
            Schedule Post
          </CustomButton>
        </div>
      )}

      <VoiceRecorderModal
        isOpen={isRecorderOpen}
        onClose={() => setIsRecorderOpen(false)}
        onRecordingComplete={handleRecordingComplete}
      />
    </form>
  );
};

export default CommentBox;
