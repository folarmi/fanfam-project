/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Typography from "../forms/Typography";
import close from "@/assets/close.svg";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { useCustomMutation, useGetData } from "@/hooks/apiCalls";
import { MiniLoader } from "../molecules/MiniLoader";
import { useFetchProfile } from "@/hooks/apiHooks";
import { CustomTextArea } from "../forms/CustomTextArea";
import CustomButton from "../forms/CustomButton";
import MediaUploadGrid from "../molecules/MediaUploadGrid";
import { useQueryClient } from "@tanstack/react-query";
import type { MediaItem, MediaType } from "@/lib/types";
import { useUploadFiles } from "@/hooks/useUploadFiles";
import EditMediaGrid from "../molecules/EditMediaGrid";

export interface EditPostProps {
  publicId: string;
  toggleModal: () => void;
  className?: string;
}

// Extended media type to track new vs existing files
interface EditMediaItem extends MediaItem {
  isNew?: boolean;
  file?: File;
  previewUrl?: string;
}

export const EditPost: React.FC<EditPostProps> = ({
  publicId,
  toggleModal,
  className,
}) => {
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data: profileData, isLoading } = useFetchProfile(userObject);
  const { data, isLoading: getContentByIdIsLoading } = useGetData({
    url: `contents/${publicId}`,
    queryKey: ["GetContentsById"],
  });
  const { uploadFiles, isUploading } = useUploadFiles({
    usid: userObject?.usid,
  });
  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      message: data?.data,
    },
  });

  const [isActive, setIsActive] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<EditMediaItem[]>([]);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  // Handle new file selection (creates preview)
  const handleFileUpload = (files: File[]) => {
    const newMediaItems: EditMediaItem[] = files?.map((file) => {
      // Determine media type
      let mediaType: MediaType = "DOCUMENT";
      if (file.type.startsWith("image/")) {
        mediaType = "PHOTO";
      } else if (file.type.startsWith("video/")) {
        mediaType = "VIDEO";
      } else if (file.type.startsWith("audio/")) {
        mediaType = "AUDIO";
      }

      return {
        mediaType,
        mediaLink: "",
        previewUrl: URL.createObjectURL(file),
        isNew: true,
        file,
      };
    });

    setMediaFiles((prev) => [...prev, ...newMediaItems]);
  };

  // Remove media (works for both new and existing)
  const handleRemoveFile = (index: number) => {
    const fileToRemove = mediaFiles[index];

    // Cleanup preview URL if it's a new file
    if (fileToRemove?.isNew && fileToRemove?.previewUrl) {
      URL.revokeObjectURL(fileToRemove.previewUrl);
    }

    setMediaFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const editContentMutation = useCustomMutation({
    endpoint: `contents/${publicId}`,
    method: "put",
    onSuccessCallback: () => {
      // Cleanup all preview URLs
      mediaFiles?.forEach((file) => {
        if (file.isNew && file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });

      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetContentsById"],
        exact: false,
      });
    },
    successMessage: () => "Post edited successfully",
    onError: () => {},
  });

  const onSubmitForm = async (formData: any) => {
    try {
      // Separate existing media from new files
      const existingMedia = mediaFiles?.filter((file) => !file.isNew);
      const newFiles = mediaFiles?.filter((file) => file.isNew);

      let uploadedMedia: MediaItem[] = [];

      // Upload new files if any
      if (newFiles?.length > 0) {
        const filesToUpload = newFiles
          ?.map((item) => item.file)
          ?.filter((file): file is File => file !== undefined);

        if (filesToUpload?.length > 0) {
          uploadedMedia = await uploadFiles(filesToUpload);
        }
      }

      // Combine existing media with newly uploaded media
      const allMediaFiles: MediaItem[] = [
        ...existingMedia.map((media) => ({
          mediaType: media.mediaType,
          mediaLink: media.mediaLink,
        })),
        ...uploadedMedia,
      ];

      const formValues = {
        message: formData?.message || data?.data?.message,
        mentions: [],
        mediaFiles: allMediaFiles,
      };
      // console.log(formValues);
      editContentMutation.mutate(formValues);
    } catch (error) {
      console.error("Failed to update post:", error);
      // Error already handled by useUploadFiles hook
    }
  };

  // Initialize form and media when data loads
  useEffect(() => {
    if (data?.data) {
      reset({ message: data?.data?.message });

      // Convert existing media to EditMediaItem format
      if (data?.data?.mediaFiles && Array.isArray(data.data.mediaFiles)) {
        const existingMedia: EditMediaItem[] = data?.data?.mediaFiles.map(
          (media: MediaItem) => ({
            ...media,
            isNew: false,
          })
        );
        setMediaFiles(existingMedia);
      }
    }
  }, [data?.data, reset]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      mediaFiles.forEach((file) => {
        if (file.isNew && file.previewUrl) {
          URL.revokeObjectURL(file.previewUrl);
        }
      });
    };
  }, [mediaFiles]);

  // Updated to use postWithPictureIsPending
  const isSaving = editContentMutation?.isPending || isUploading;

  return (
    <>
      {getContentByIdIsLoading || isLoading ? (
        <MiniLoader />
      ) : (
        <article
          className={`pt-4 mb-2 drop-shadow-4xl rounded-2xl w-[806px] bg-grey_20 shadow-overlay ${
            className || ""
          }`}
          aria-label={`Editing post by ${profileData?.data?.displayName}`}
        >
          {/* Header Section */}
          <header className="flex items-start px-4 relative mb-4">
            <img
              src={profileData?.data?.profilePic}
              alt={`${profileData?.data?.displayName}'s avatar`}
              className="w-10 h-10 rounded-full flex-shrink-0"
              loading="lazy"
            />

            <div className="flex justify-between w-full items-start ml-2">
              <section className="flex-1 min-w-0">
                {/* Profile Info */}
                <div className="flex items-center flex-wrap gap-x-1.5">
                  <div className="flex flex-col">
                    <Typography
                      variant="titleTwo"
                      className="font-semibold truncate"
                    >
                      {profileData?.data?.displayName}
                    </Typography>

                    <Typography
                      variant="p2"
                      className="hidden md:inline text-grey_500 truncate"
                    >
                      {`@${profileData?.data?.username}`}
                    </Typography>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={toggleModal}
                    className="cursor-pointer ml-auto p-1 hover:bg-gray-100 rounded-full transition-colors"
                    disabled={editContentMutation?.isPending}
                    aria-label="Cancel editing"
                  >
                    <img src={close} alt="Close" className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile handle */}
                <Typography
                  variant="p2"
                  className="md:hidden text-grey_500 truncate"
                >
                  {profileData?.data?.username}
                </Typography>
              </section>
            </div>
          </header>

          {/* Edit Form */}
          <form onSubmit={handleSubmit(onSubmitForm)} className="px-4">
            <div className="mb-4">
              <CustomTextArea
                name="message"
                control={control}
                rules={{ required: "Post is required" }}
                rows={5}
                className="w-full outline-none pt-3 bg-grey_20"
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Media Grid with Remove Buttons */}
            <EditMediaGrid
              mediaFiles={mediaFiles}
              onRemove={handleRemoveFile}
              disabled={isSaving}
            />

            {/* Add Media Button */}
            <MediaUploadGrid
              handleFileUpload={handleFileUpload}
              handleRemoveFile={handleRemoveFile}
              isActive={isActive}
              ifRecord
            />
            {/* Action Buttons */}
            <div className="flex justify-end mb-6">
              <CustomButton
                onClick={toggleModal}
                variant="secondary"
                className="text-xs mr-6"
              >
                Cancel
              </CustomButton>
              <CustomButton
                disabled={isSaving}
                loading={isSaving}
                variant="primary"
                className="text-xs px-3 w-fit"
              >
                {isSaving ? "Saving..." : "Save"}
              </CustomButton>
            </div>
          </form>
        </article>
      )}
    </>
  );
};
