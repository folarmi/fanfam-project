/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomButton from "./forms/CustomButton";
import Picture from "../assets/icons/picture";
import Smile from "../assets/icons/smile";
import Poll from "../assets/icons/poll";
import Record from "../assets/icons/record";
import { useForm } from "react-hook-form";
import { CustomTextArea } from "./forms/CustomTextArea";
import { useCustomMutation } from "@/hooks/apiCalls";
import CustomFileUploader from "./forms/CustomFileUploader";

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

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  // const handleFileUpload = () => {};

  const createContentMutation = useCustomMutation({
    endpoint: `contents`,
    successMessage: () => {
      return "Posted added successfully";
    },
    onError: () => {},
  });

  const submitForm = (data: any) => {
    const formData = {
      message: data?.message,
      images: [],
      mentions: [],
    };

    createContentMutation.mutate(formData);
  };

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
            maxSizeMB={5}
            acceptFormats={["jpg", "jpeg", "png", "gif"]}
            multiple={true}
            onFileUpload={(files) => console.log("Uploaded:", files)}
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
                <Picture
                  onClick={triggerFileInput}
                  isActive={true}
                  className="cursor-pointer mb-2"
                />

                {previews.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {previews.map((preview, index) => (
                      <div key={index} className="relative">
                        <img
                          src={preview.url}
                          alt={preview.name}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <button
                          onClick={() => removeFile(index)}
                          className="absolute top-0 right-0 bg-black text-white rounded-full px-1"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

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
            disabled={createContentMutation.isPending}
            loading={createContentMutation.isPending}
          >
            Post
          </CustomButton>
        </div>
      </div>
    </form>
  );
};

export default CommentBox;
