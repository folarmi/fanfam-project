/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomButton from "./forms/CustomButton";
import Smile from "../assets/icons/smile";
import Poll from "../assets/icons/poll";
import Record from "../assets/icons/record";
import { useForm } from "react-hook-form";
import { CustomTextArea } from "./forms/CustomTextArea";
import { useCustomMutation, useFileUpload } from "@/hooks/apiCalls";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { PostUploader } from "./molecules/PostUploader";
import type { MediaItem } from "@/lib/types";

type CommentBoxProps = {
  ifPoll?: boolean;
  ifRecord?: boolean;
  setIfUserIsCreatingPoll?: any;
};

const CommentBox = ({
  ifPoll = true,
  ifRecord = true,
  setIfUserIsCreatingPoll,
}: CommentBoxProps) => {
  const [isActive, setIsActive] = useState(false);
  const { handleSubmit, control } = useForm();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);

  const {
    mutate: uploadPostWithPictures,
    isPending: postWithPictureIsPending,
  } = useFileUpload({
    url: "files/upload-multiple",
    onSuccess: (data) => {
      return data?.message || "File uploaded successfully!";
    },
    errorToast: (error: any) =>
      error.response?.data?.message || "Upload failed",
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

  // Sequential file upload function
  // const uploadFilesSequentially = async (files: File[]): Promise<MediaItem> => {
  //   const mediaLinks: MediaItem = [];

  //   for (const file of files) {
  //     try {
  //       // Upload one file at a time
  //       const result = await new Promise<any>((resolve, reject) => {
  //         uploadPostWithPictures(
  //           {
  //             file: file,
  //             extraData: {
  //               usid: userObject?.usid,
  //             },
  //           },
  //           {
  //             onSuccess: (data) => resolve(data),
  //             onError: (error) => reject(error),
  //           }
  //         );
  //       });

  //       // Collect the media URL
  //       if (result?.body) {
  //         mediaLinks.push({
  //           mediaType: file.type.startsWith("image/") ? "PHOTO" : "DOCUMENT",
  //           mediaLink: result.body?.url,
  //         });
  //       }
  //     } catch (error) {
  //       console.error(`Failed to upload ${file.name}:`, error);
  //       throw error;
  //     }
  //   }

  //   return mediaLinks;
  // };

  const uploadFiles = async (files: File[]): Promise<MediaItem> => {
    const mediaLinks: MediaItem = [];

    try {
      // Upload all files in a single request
      const result = await new Promise<any>((resolve, reject) => {
        uploadPostWithPictures(
          {
            files: files, // Changed from 'file' to 'files' array
            extraData: {
              usid: userObject?.usid,
            },
          },
          {
            onSuccess: (data) => resolve(data),
            onError: (error) => reject(error),
          }
        );
      });

      // Process the response body array
      if (result?.body && Array.isArray(result.body)) {
        result.body.forEach((item: any, index: number) => {
          mediaLinks.push({
            mediaType: files[index].type.startsWith("image/")
              ? "PHOTO"
              : files[index].type.startsWith("video/")
              ? "VIDEO"
              : "DOCUMENT",
            mediaLink: item.url,
          });
        });
      }
    } catch (error) {
      console.error("Failed to upload files:", error);
      throw error;
    }

    return mediaLinks;
  };

  // Determine media type based on files
  const getMediaType = (files: File[]): "PHOTO" | "VIDEO" | "DOCUMENT" => {
    if (files.length === 0) return "PHOTO";

    const firstFile = files[0];
    const fileType = firstFile.type;

    if (fileType.startsWith("image/")) return "PHOTO";
    if (fileType.startsWith("video/")) return "VIDEO";
    return "DOCUMENT";
  };

  // Modified submit handler
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
        console.log(formValues);
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
        mediaLinks: [],
        mentions: [],
      });
    }
  };

  const createContentMutation = useCustomMutation({
    endpoint: `contents`,
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
        <div className="flex items-center gap-x-3">
          <PostUploader
            handleFileUpload={handleFileUpload}
            handleRemoveFile={handleRemoveFile}
          />

          <Smile isActive={isActive} className="cursor-pointer" />
          {ifPoll && (
            <Poll
              onClick={() => setIfUserIsCreatingPoll(true)}
              isActive={isActive}
              className="cursor-pointer"
            />
          )}
          {ifRecord && (
            <Record isActive={isActive} className="cursor-pointer" />
          )}
        </div>

        <div className="w-[62px]">
          <CustomButton
            variant={isActive ? "primary" : "disabled"}
            className="w-full bg-grey_90"
            disabled={
              createContentMutation.isPending || postWithPictureIsPending
            }
            loading={
              createContentMutation.isPending || postWithPictureIsPending
            }
          >
            Post
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
