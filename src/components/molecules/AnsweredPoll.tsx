import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import {
  PollChoices,
  PollResults,
  type PollChoice,
} from "../forms/PollChoices";
import { useCustomMutation } from "@/hooks/apiCalls";

type FormValues = {
  selectedPollChoice: string;
};

type AnsweredPollProps = {
  pollChoices: PollChoice[];
  /** publicId of the post — used to build the vote endpoint */
  postId: string;
  /** publicId of the option the current user already voted for (from API) */
  userVote?: string;
};

const AnsweredPoll = ({ pollChoices, postId, userVote }: AnsweredPollProps) => {
  const queryClient = useQueryClient();

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { selectedPollChoice: "" },
  });

  const hasSelected = !!watch("selectedPollChoice");

  const totalVotes = pollChoices.reduce(
    (sum, c) => sum + (c.voteCount ?? 0),
    0,
  );

  const voteMutation = useCustomMutation({
    endpoint: `contents/${postId}/poll-vote/${watch("selectedPollChoice")}`,
    method: "patch",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
      queryClient.invalidateQueries({
        queryKey: ["GetContentsById", postId],
        exact: false,
      });
    },
    successMessage: () => "Vote submitted!",
    onError: () => {},
  });

  const onSubmit = () => {
    // console.log(data);
    voteMutation.mutate({});
  };

  // If the user has already voted, show the read-only results bar UI
  if (userVote) {
    return (
      <section className="ml-[68px] mr-4 mb-4">
        <PollResults
          pollChoices={pollChoices}
          userVote={userVote}
          totalVotes={totalVotes}
          className="mt-4 bg-red-900"
        />
      </section>
    );
  }

  // Otherwise show the interactive voting UI
  return (
    <section className="ml-[68px] mr-4 mb-4">
      <form
        onSubmit={(e) => {
          e.stopPropagation(); // prevent card click from firing
          handleSubmit(onSubmit)(e);
        }}
      >
        <PollChoices<FormValues>
          pollChoices={pollChoices}
          name="selectedPollChoice"
          control={control}
        />

        <button
          type="submit"
          disabled={!hasSelected || voteMutation.isPending}
          className="mt-2 rounded-full px-5 py-2 text-sm font-medium text-white transition-opacity"
          style={{
            background: "#2599F6",
            opacity: hasSelected && !voteMutation.isPending ? 1 : 0.4,
            cursor:
              hasSelected && !voteMutation.isPending
                ? "pointer"
                : "not-allowed",
          }}
        >
          {voteMutation.isPending ? "Voting…" : "Vote"}
        </button>
      </form>
    </section>
  );
};

export default AnsweredPoll;
