/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomButton from "./forms/CustomButton";
import { useForm } from "react-hook-form";
import { CustomTextArea } from "./forms/CustomTextArea";
import { useCustomMutation } from "@/hooks/apiCalls";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import MediaUploadGrid from "./molecules/MediaUploadGrid";
import { getMediaType } from "@/utils/helperTwo";
import { useUploadFiles } from "@/hooks/useUploadFiles";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import video from "@/assets/icons/video.svg";
import Typography from "./forms/Typography";
import { useNavigate } from "react-router-dom";
import VoiceRecorderModal from "./modals/VoiceRecorderModal";

type CommentBoxProp = {
  ifPoll?: boolean;
  ifRecord?: boolean;
  setIfUserIsCreatingPoll?: (isCreating: boolean) => void;
  endpoint?: string;
  placeholder?: string;
  commentId?: string;
  onSuccess?: () => void;
  ifGoLive?: boolean;
};

const CommentBox = ({
  ifRecord,
  ifPoll,
  endpoint = "contents",
  setIfUserIsCreatingPoll,
  commentId,
  onSuccess,
  placeholder = "Write a Post..",
  ifGoLive = false,
}: CommentBoxProp) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { handleSubmit, control, reset, trigger } = useForm();

  const [isActive, setIsActive] = useState(false);
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);
  const [showLiveStreaming, setShowLiveStreaming] = useState(true);
  const [isRecorderOpen, setIsRecorderOpen] = useState(false);

  const toggleReportUserModal = () => {
    setShowLiveStreaming(!showLiveStreaming);
  };

  const {
    uploadFiles,
    isUploading,
    reset: resetFiles,
  } = useUploadFiles({
    usid: userObject?.usid,
    onSuccess: () => {
      resetFiles();
    },
    onError: (error) => {
      toast.error(error?.message);
      // Show toast notification
    },
  });

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  // Just store files, don't upload yet
  const handleFileUpload = (files: File[]) => {
    setQueuedFiles((prev) => [...prev, ...files]);
    // Re-trigger validation to clear any errors
    trigger("message");
  };

  // Remove file from queue
  const handleRemoveFile = (index: number) => {
    setQueuedFiles((prev) => prev.filter((_, i) => i !== index));
    // Re-trigger validation after removing file
    setTimeout(() => trigger("message"), 0);
  };

  const handleRecordingComplete = (audioBlob: Blob) => {
    // Convert blob to File
    const audioFile = new File([audioBlob], `voice-note-${Date.now()}.webm`, {
      type: audioBlob.type,
    });

    setQueuedFiles((prev) => [...prev, audioFile]);
    // Re-trigger validation to clear any errors
    trigger("message");
    toast.success("Voice note added successfully");
  };

  const submitForm = async (data: any) => {
    if (!data.message?.trim() && queuedFiles.length === 0) {
      toast.error(
        commentId
          ? "Reply message or media is required"
          : "Post message or media is required"
      );
      return;
    }

    if (queuedFiles.length > 0) {
      try {
        // Upload all files sequentially
        const mediaLinks = await uploadFiles(queuedFiles);

        // Now create the post with all media links
        const formValues = {
          ...data,
          message: data.message || "",
          mediaFiles: mediaLinks, // Array of all uploaded URLs
          mentions: [],
          mediaType: getMediaType(queuedFiles),
        };
        createContentMutation.mutate(formValues);

        // Clear queue after successful post
        setQueuedFiles([]);
      } catch (error) {
        console.error("Upload failed:", error);
        // Handle error (toast notification, etc.)
      }
    } else {
      // No files, just post text
      createContentMutation.mutate({
        ...data,
        mediaFiles: [],
        mentions: [],
      });
    }
  };

  const createContentMutation = useCustomMutation({
    endpoint: commentId ? `${endpoint}/${commentId}/replies` : endpoint,
    onSuccessCallback: () => {
      reset();
      resetFiles();
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
      onSuccess?.();
    },
    successMessage: () => {
      return commentId ? "Reply added successfully" : "Post added successfully";
    },
    onError: () => {},
  });

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="mb-2 p-4 border border-grey_10 bg-grey_20 drop-shadow-4xl"
    >
      <CustomTextArea
        placeholder={placeholder}
        name="message"
        control={control}
        rules={{
          validate: (value: string) => {
            // Message is required only if there are no files
            if (!value?.trim() && queuedFiles.length === 0) {
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
        className="w-full outline-none pt-3 bg-grey_20"
      />

      {/* Show queued files preview */}
      {queuedFiles.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3 mb-2">
          {queuedFiles.map((file, index) => (
            <div
              key={index}
              className="relative bg-gray-100 rounded px-3 py-2 flex items-center gap-2"
            >
              <Typography variant="p3" className="text-gray-700 text-sm">
                {file.type.startsWith("audio/") ? "🎤" : "📎"} {file.name}
              </Typography>
              <button
                type="button"
                onClick={() => handleRemoveFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between py-[5px]">
        <MediaUploadGrid
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
          isActive={isActive}
          ifPoll={ifPoll}
          ifRecord={ifRecord}
          setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
          onRecordClick={() => setIsRecorderOpen(true)}
        />

        <div className="flex items-center">
          <div className="w-fit">
            <CustomButton
              // variant={isActive ? "primary" : "disabled"}
              variant={
                isActive || queuedFiles.length > 0 ? "primary" : "disabled"
              }
              className=" bg-grey_90 px-6"
              disabled={createContentMutation.isPending || isUploading}
              loading={createContentMutation.isPending || isUploading}
            >
              Post
            </CustomButton>
          </div>
          {ifGoLive && (
            <div
              onClick={toggleReportUserModal}
              className="border border-blue_1000 py-2 px-4 flex items-center rounded-3xl ml-3 cursor-pointer"
            >
              <img src={video} alt="video" className="mr-1" />
              <Typography
                variant="subtitle3"
                className="text-blue_20"
                onClick={() => navigate("livestreaming")}
              >
                Go Live
              </Typography>
            </div>
          )}
        </div>
      </div>

      <VoiceRecorderModal
        isOpen={isRecorderOpen}
        onClose={() => setIsRecorderOpen(false)}
        onRecordingComplete={handleRecordingComplete}
      />
    </form>
  );
};

export default CommentBox;
