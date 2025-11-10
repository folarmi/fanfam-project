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

type CommentBoxProp = {
  ifPoll?: boolean;
  ifRecord?: boolean;
  setIfUserIsCreatingPoll?: (isCreating: boolean) => void;
  endpoint?: string;
};

const CommentBox = ({
  ifRecord,
  ifPoll,
  endpoint = "contents",
  setIfUserIsCreatingPoll,
}: CommentBoxProp) => {
  const [isActive, setIsActive] = useState(false);
  const queryClient = useQueryClient();
  const { handleSubmit, control, reset } = useForm();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);

  const {
    uploadFiles,
    isUploading,
    reset: resetFiles,
  } = useUploadFiles({
    usid: userObject?.usid,
    onSuccess: (mediaItems) => {
      console.log("Upload successful:", mediaItems);
    },
    onError: (error) => {
      console.error("Upload failed:", error);
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
  };

  // Remove file from queue
  const handleRemoveFile = (index: number) => {
    setQueuedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const submitForm = async (data: any) => {
    if (queuedFiles.length > 0) {
      try {
        // Upload all files sequentially
        const mediaLinks = await uploadFiles(queuedFiles);

        // Now create the post with all media links
        const formValues = {
          ...data,
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
    endpoint,
    onSuccessCallback: () => {
      reset();
      resetFiles();
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
    },
    successMessage: () => {
      return "Posted added successfully";
    },
    onError: () => {},
  });

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="mb-2 p-4 border border-grey_10 bg-grey_20 drop-shadow-4xl"
    >
      <CustomTextArea
        placeholder="Write a Post.."
        name="message"
        control={control}
        rules={{ required: "Post is required" }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        rows={5}
        className="w-full outline-none pt-3 bg-grey_20"
      />

      <div className="flex items-center justify-between py-[5px]">
        <MediaUploadGrid
          handleFileUpload={handleFileUpload}
          handleRemoveFile={handleRemoveFile}
          isActive={isActive}
          ifPoll={ifPoll}
          ifRecord={ifRecord}
          setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
        />

        <div className="w-fit">
          <CustomButton
            variant={isActive ? "primary" : "disabled"}
            className=" bg-grey_90 px-6"
            disabled={createContentMutation.isPending || isUploading}
            loading={createContentMutation.isPending || isUploading}
          >
            Post
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
