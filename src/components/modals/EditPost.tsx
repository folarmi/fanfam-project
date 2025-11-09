/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useGetData } from "@/hooks/apiCalls";
// import PostCard from "../cards/Postcard";
// import { useFetchProfile } from "@/hooks/apiHooks";
// import { useAppSelector } from "@/lib/hook";
// import type { RootState } from "@/lib/store";
// import { formatTimeAgo } from "@/utils/helperTwo";
// import CustomButton from "../forms/CustomButton";
// import { MiniLoader } from "../molecules/MiniLoader";

// type Prop = {
//   toggleModal: () => void;
//   publicId: string;
//   onEdit: () => void;
//   onCancel: () => void;
// };

// const EditPost = (props: Prop) => {
// const { userObject } = useAppSelector((state: RootState) => state.auth);

// const { data, isLoading: getContentByIdIsLoading } = useGetData({
//   url: `contents/${props.publicId}`,
//   queryKey: ["GetContentsById"],
// });

// const { data: profileData, isLoading } = useFetchProfile(userObject);

//   const { onEdit } = props;
//   return (
//     <div>
//       {getContentByIdIsLoading || isLoading ? (
//         <MiniLoader />
//       ) : (
//         <PostCard
//           {...props}
//           avatar={profileData?.data?.profilePic}
//           ifParagraph
//           paragraphOne={data?.data?.message}
//           profileName={profileData?.data?.displayName}
//           handle={`@${profileData?.data?.username}`}
//           time={formatTimeAgo(data?.createdDate)}
//           isEditMode={true}
//           onContentClick={onEdit}
//           ifIcon={false}
//           timeLineImage={data?.data?.mediaFiles}
//           className="rounded-2xl max-w-[806px] bg-overlay bg-grey_20"
//           headerActions={
// <div className="flex justify-end mb-6">
//   <CustomButton
//     onClick={props.toggleModal}
//     variant="secondary"
//     className="text-xs mr-6"
//   >
//     Cancel
//   </CustomButton>
//   <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
//     Save
//   </CustomButton>
// </div>
//           }
//         />
//       )}
//     </div>
//   );
// };

// export { EditPost };

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
import MediaGrid from "../molecules/MediaGrid";
import MediaUploadGrid from "../molecules/MediaUploadGrid";
import { useQueryClient } from "@tanstack/react-query";

export interface EditPostProps {
  publicId: string;
  toggleModal: () => void;
  className?: string;
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

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      content: data?.data,
    },
  });

  const [queuedFiles, setQueuedFiles] = useState<File[]>([]);
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };
  const handleFileUpload = (files: File[]) => {
    setQueuedFiles((prev) => [...prev, ...files]);
  };

  const handleRemoveFile = (index: number) => {
    setQueuedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const editContentMutation = useCustomMutation({
    endpoint: `contents/${publicId}`,
    method: "put",
    onSuccessCallback: () => {
      toggleModal();
      queryClient.invalidateQueries({
        queryKey: ["GetContentsById"],
        exact: false,
      });
    },
    successMessage: () => {
      return "Posted edited successfully";
    },
    onError: () => {},
  });

  const onSubmitForm = async (formData: any) => {
    const formValues = {
      message: formData?.message || data?.data?.message,
      mentions: [],
      mediaFiles: data?.data?.mediaFiles,
    };
    editContentMutation.mutate(formValues);
  };
  // no files
  // new files
  // previous files

  useEffect(() => {
    if (data?.data) {
      const defaults = data?.data;
      reset(defaults);
    }
  }, [data?.data, reset]);

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
            <MediaGrid timeLineImage={data?.data?.mediaFiles} />

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
                disabled={editContentMutation?.isPending}
                loading={editContentMutation?.isPending}
                variant="primary"
                className="text-xs px-3 w-fit"
              >
                {editContentMutation?.isPending ? "Saving..." : "Save"}
              </CustomButton>
            </div>
          </form>
        </article>
      )}
    </>
  );
};
