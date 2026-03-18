import Typography from "../forms/Typography";
// import block from "../../assets/icons/block.svg";
import { Plus, X } from "lucide-react";

import CustomButton from "../forms/CustomButton";
import { useForm, useFieldArray } from "react-hook-form";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import CustomSelect from "../forms/CustomSelect";
import { pollDaysOptions, pollHoursOptions, pollMinutesOptions } from "@/data";
import { showInlineToast } from "@/utils/toastUtils";

type pollProps = {
  setIfUserIsCreatingPoll: (val: boolean) => void;
};

type PollFormValues = {
  question: string;
  options: { name: string }[];
  pollDuration: {
    days: number;
    hours: number;
    minutes: number;
  };
};

const Poll = ({ setIfUserIsCreatingPoll }: pollProps) => {
  const queryClient = useQueryClient();

  const { control, register, handleSubmit, watch, setError } =
    useForm<PollFormValues>({
      defaultValues: {
        question: "",
        options: [{ name: "" }, { name: "" }],
        pollDuration: { days: 1, hours: 0, minutes: 0 },
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
      setIfUserIsCreatingPoll(false);
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
    const { days, hours, minutes } = data.pollDuration;
    if (!days && !hours && !minutes) {
      setError("pollDuration.days", { message: "Set at least one duration" });
      return;
    }
    if (!data.question.trim()) {
      showInlineToast({
        type: "error",
        title: "Please enter a question",
      });
      return;
    }

    const validOptions = data.options.filter((opt) => opt.name.trim() !== "");
    if (validOptions.length < 2) {
      showInlineToast({
        type: "error",
        title: "Please provide at least 2 options",
      });
      return;
    }

    const formData = {
      message: data?.question,
      pollChoices: validOptions?.map((opt) => ({ choice: opt.name })),
      pollDuration: {
        days,
        hours,
        minutes,
      },
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
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 border-b border-grey_100 pb-5 space-y-3">
          <div className="flex justify-between items-center">
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

          <div>
            <p className="text-grey_500 text-xs font-semibold uppercase tracking-wide mb-2">
              Poll length
            </p>
            <div className="grid grid-cols-3 gap-2">
              <CustomSelect
                name="pollDuration.days"
                control={control}
                placeholder="Days"
                options={pollDaysOptions}
                isSearchable={false}
              />
              <CustomSelect
                name="pollDuration.hours"
                control={control}
                placeholder="Hours"
                options={pollHoursOptions}
                isSearchable={false}
              />
              <CustomSelect
                name="pollDuration.minutes"
                control={control}
                placeholder="Minutes"
                options={pollMinutesOptions}
                isSearchable={false}
              />
            </div>
          </div>
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
