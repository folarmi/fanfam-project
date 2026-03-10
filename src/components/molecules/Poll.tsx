/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import Typography from "../forms/Typography";
import block from "../../assets/icons/block.svg";
import { Plus, X } from "lucide-react";

import CustomSelect from "../forms/CustomSelect";
import CustomButton from "../forms/CustomButton";
import AnsweredPoll from "./AnsweredPoll";
import { useForm } from "react-hook-form";

type pollProps = {
  pollOptions: { id: string; name: string }[];
  setPollOptions: any;
  activePoll: string;
  setActivePoll: any;
  setIfUserIsCreatingPoll: (val: boolean) => void;
};

const Poll = ({
  pollOptions,
  setPollOptions,
  // activePoll,
  // setActivePoll,
  setIfUserIsCreatingPoll,
}: pollProps) => {
  const { control } = useForm();
  const [isPollAnswered, setIsPollAnswered] = useState(false);
  const [question, setQuestion] = useState("");

  const changeIfPollIsAnswered = () => {
    setIsPollAnswered(true);
  };

  const addOption = () => {
    if (pollOptions.length < 5) {
      setPollOptions([...pollOptions, { id: Date.now().toString(), name: "" }]);
    }
  };

  const removeOption = (indexToRemove: number) => {
    if (pollOptions.length > 2) {
      setPollOptions(pollOptions.filter((_, index) => index !== indexToRemove));
    }
  };

  const updateOption = (indexToUpdate: number, newName: string) => {
    const updatedOptions = [...pollOptions];
    updatedOptions[indexToUpdate].name = newName;
    setPollOptions(updatedOptions);
  };

  return (
    <>
      {!isPollAnswered && (
        <div className="w-full bg-white rounded-2xl  shadow-sm mb-6 p-5">
          <input
            type="text"
            placeholder="Ask a question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-transparent text-grey_800 outline-none text-[18px] md:text-[20px] placeholder:text-grey_300 mb-6 font-semibold"
          />

          <div className="space-y-3">
            {pollOptions.map(({ id, name }, index) => {
              return (
                <div
                  key={id}
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
                      value={name}
                      onChange={(e) => updateOption(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      maxLength={25}
                      className="w-full bg-transparent outline-none text-grey_800 text-[15px] font-medium placeholder:text-grey_300"
                    />
                  </section>

                  <div className="flex items-center gap-2">
                    {pollOptions.length > 2 && (
                      <button
                        onClick={() => removeOption(index)}
                        className="p-1.5 text-grey_400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors focus:outline-none"
                      >
                        <X size={16} strokeWidth={2.5} />
                      </button>
                    )}
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
            {pollOptions.length < 5 ? (
              <button
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

          <div className="mt-5">
            <Typography variant="p3" className="text-grey_500 mb-3 font-medium">
              Poll length
            </Typography>

            <div className="flex items-center gap-x-4">
              <div className="flex-1">
                <CustomSelect
                  name="days"
                  control={control}
                  placeholder="Days"
                />
              </div>
              <div className="flex-1">
                <CustomSelect
                  name="hours"
                  control={control}
                  placeholder="Hours"
                />
              </div>
              <div className="flex-1">
                <CustomSelect
                  name="minutes"
                  control={control}
                  placeholder="Minutes"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end mt-6 gap-4">
            <button
              className="text-grey_500 hover:text-grey_800 font-medium px-4 py-2 rounded-full hover:bg-grey_50 transition-colors focus:outline-none"
              onClick={() => setIfUserIsCreatingPoll(false)}
            >
              Cancel poll
            </button>
            <div className="w-[120px]">
              <CustomButton
                variant="primary"
                className="w-full rounded-full py-2.5 shadow-md shadow-blue_500/20"
                onClick={changeIfPollIsAnswered}
                disabled={
                  !question.trim() ||
                  pollOptions.some((opt) => !opt.name.trim())
                }
              >
                Post
              </CustomButton>
            </div>
          </div>
        </div>
      )}

      {isPollAnswered && <AnsweredPoll isPollAnswered={isPollAnswered} />}
    </>
  );
};

export default Poll;
