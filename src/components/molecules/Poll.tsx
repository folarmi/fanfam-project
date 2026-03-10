/* eslint-disable @typescript-eslint/no-explicit-any */

import Typography from "../forms/Typography";
import block from "../../assets/icons/block.svg";
import { Plus, X } from "lucide-react";

import CustomButton from "../forms/CustomButton";
import { useForm, useFieldArray } from "react-hook-form";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

type pollProps = {
  setIfUserIsCreatingPoll: (val: boolean) => void;
};

type PollFormValues = {
  question: string;
  options: { name: string }[];
};

const Poll = ({ setIfUserIsCreatingPoll }: pollProps) => {
  const queryClient = useQueryClient();

  const { control, register, handleSubmit, watch } = useForm<PollFormValues>({
    defaultValues: {
      question: "",
      options: [{ name: "" }, { name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const watchQuestion = watch("question");
  const watchOptions = watch("options");

  const createContentMutation = useCustomMutation({
    endpoint: "contents",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
    },
    successMessage: () => "Poll posted successfully",
    onError: () => {},
  });

  const addOption = () => {
    if (fields.length < 5) {
      append({ name: "" });
    }
  };

  const removeOption = (indexToRemove: number) => {
    remove(indexToRemove);
  };

  const submitForm = (data: PollFormValues) => {
    if (!data.question.trim()) {
      toast.error("Please enter a question");
      return;
    }

    const validOptions = data.options.filter((opt) => opt.name.trim() !== "");
    if (validOptions.length < 2) {
      toast.error("Please provide at least 2 options");
      return;
    }

    const formData = {
      message: data?.question,
      choices: validOptions?.map((opt) => ({ choice: opt.name })),
    };
    // console.log(formData);
    createContentMutation.mutate(formData);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="w-full bg-white rounded-2xl  shadow-sm mb-6 p-5"
      >
        <input
          type="text"
          placeholder="Ask a question..."
          {...register("question")}
          className="w-full bg-transparent text-grey_800 outline-none text-[18px] md:text-[20px] placeholder:text-grey_300 mb-6 font-semibold"
        />

        <div className="space-y-3">
          {fields.map((field, index) => {
            return (
              <div
                key={field.id}
                className="flex items-center justify-between px-4 py-2 bg-white mb-3 rounded-xl border border-grey_200 focus-within:border-blue_500 focus-within:ring-1 focus-within:ring-blue_500 transition-all shadow-sm"
              >
                <section className="flex flex-col justify-center flex-1 pr-3">
                  <Typography
                    variant="p3"
                    className="text-blue_500 text-[11px] font-semibold uppercase tracking-wide mb-0.5"
                  >
                    Choice {index + 1}
                  </Typography>
                  <input
                    type="text"
                    {...register(`options.${index}.name` as const)}
                    placeholder={`Option ${index + 1}`}
                    maxLength={25}
                    className="w-full bg-transparent outline-none text-grey_800 text-[15px] font-medium placeholder:text-grey_300"
                  />
                </section>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="p-1.5 text-grey_400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
                  >
                    <X size={16} strokeWidth={2.5} />
                  </button>
                  <img
                    src={block}
                    alt="drag handle"
                    className="cursor-grab opacity-50 hover:opacity-100 transition-opacity p-1"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-between items-center mt-4 border-b border-grey_100 pb-5">
          {fields.length < 5 ? (
            <button
              type="button"
              onClick={addOption}
              className="flex items-center gap-2 py-2 px-4 bg-blue_50 hover:bg-blue-100 text-blue_500 rounded-full transition-colors font-medium text-sm focus:outline-none"
            >
              <Plus size={16} strokeWidth={2.5} />
              <span>Add option</span>
            </button>
          ) : (
            <span className="text-sm text-grey_400 italic">
              Maximum 5 options
            </span>
          )}
        </div>

        <div className="flex items-center justify-end mt-6 gap-4">
          <button
            type="button"
            className="text-grey_500 hover:text-grey_800 font-medium px-4 py-2 rounded-full hover:bg-grey_50 transition-colors focus:outline-none"
            onClick={() => setIfUserIsCreatingPoll(false)}
          >
            Cancel poll
          </button>
          <div className="w-[120px]">
            <CustomButton
              variant="primary"
              type="submit"
              className="w-full rounded-full py-2.5 shadow-md shadow-blue_500/20"
              disabled={
                !watchQuestion?.trim() ||
                watchOptions?.length < 2 ||
                watchOptions?.some((opt) => !opt.name.trim()) ||
                createContentMutation.isPending
              }
              loading={createContentMutation.isPending}
            >
              Post
            </CustomButton>
          </div>
        </div>
      </form>
    </>
  );
};

export default Poll;
