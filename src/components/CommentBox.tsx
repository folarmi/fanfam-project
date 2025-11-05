/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomButton from "./forms/CustomButton";
import Picture from "../assets/icons/picture";
import Smile from "../assets/icons/smile";
import Poll from "../assets/icons/poll";
import Record from "../assets/icons/record";
import { useForm } from "react-hook-form";
import { CustomTextArea } from "./forms/CustomTextArea";
import { useCustomMutation, useFileUpload } from "@/hooks/apiCalls";
import CustomFileUploader from "./forms/CustomFileUploader";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";

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
  // const [uploadedMediaLinks, setUploadedMediaLinks] = useState<string[]>([]);

  const {
    mutate: uploadPostWithPictures,
    isPending: postWithPictureIsPending,
  } = useFileUpload({
    // onSuccess: (data) => {
    //   const formValues = {
    //     ...getValues(),
    //     // message: "",
    //     mediaLinks: [data?.body],
    //     mentions: [],
    //     mediaType: "PHOTO",
    //   };
    //   // createContentMutation.mutate(formValues);
    //   return data?.message || "File uploaded successfully!";
    // },
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
  const uploadFilesSequentially = async (files: File[]): Promise<string[]> => {
    const mediaLinks: string[] = [];

    for (const file of files) {
      try {
        // Upload one file at a time
        const result = await new Promise<any>((resolve, reject) => {
          uploadPostWithPictures(
            {
              file: file,
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

        // Collect the media URL
        if (result?.body) {
          mediaLinks.push(result.body);
        }
      } catch (error) {
        console.error(`Failed to upload ${file.name}:`, error);
        throw error;
      }
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
        const mediaLinks = await uploadFilesSequentially(queuedFiles);

        // Now create the post with all media links
        const formValues = {
          ...data,
          mediaLinks: mediaLinks, // Array of all uploaded URLs
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
          <CustomFileUploader
            maxSizeMB={50}
            acceptFormats={[
              // Images
              "jpg",
              "jpeg",
              "png",
              "gif",
              "webp",
              // Videos
              "mp4",
              "mov",
              "avi",
              "mkv",
              "webm",
              // Documents
              "pdf",
              "doc",
              "docx",
              "txt",
            ]}
            multiple={true}
            onFileUpload={handleFileUpload}
            render={({
              previews,
              error,
              removeFile,
              triggerFileInput,
              isDragging,
              dropHandlers,
            }) => (
              <div
                {...dropHandlers}
                className={` rounded-lg transition-colors ${
                  isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
                }`}
              >
                {previews.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative">
                        {/* Different preview based on file type */}
                        {preview.file.type.startsWith("image/") && (
                          <img
                            src={preview.url}
                            alt={preview.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        {preview.file.type.startsWith("video/") && (
                          <video
                            src={preview.url}
                            className="w-20 h-20 object-cover rounded"
                          />
                        )}
                        {preview.file.type.startsWith("application/") && (
                          <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-600">
                              {preview.name.split(".").pop()?.toUpperCase()}
                            </span>
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            removeFile(index);
                            handleRemoveFile(index);
                          }}
                          className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <Picture
                  onClick={triggerFileInput}
                  isActive={true}
                  className="cursor-pointer mb-2"
                />

                {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
              </div>
            )}
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
