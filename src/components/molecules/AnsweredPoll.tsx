import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
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
  postId: string | undefined;
  /** Optional — pass if your API returns a poll expiry date string */
  pollExpiresAt?: string;
};

/** Formats ms remaining into "4h 26min left" — returns undefined if expired/no date */
function formatTimeLeft(expiresAt?: string): string | undefined {
  if (!expiresAt) return undefined;
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return "Poll ended";
  const hours = Math.floor(ms / 3_600_000);
  const mins = Math.floor((ms % 3_600_000) / 60_000);
  if (hours >= 24) {
    const days = Math.floor(hours / 24);
    return `${days}d left`;
  }
  return hours > 0 ? `${hours}h ${mins}min left` : `${mins}min left`;
}

const AnsweredPoll = ({
  pollChoices,
  postId,
  pollExpiresAt,
}: AnsweredPollProps) => {
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const currentUserEmail = userObject?.email ?? userObject?.usid ?? "";
  // const currentUserEmail = "excessjunior@gmail.com";

  const userVotedChoice = pollChoices.find((choice) =>
    choice.votes?.includes(currentUserEmail),
  );
  const userVote = userVotedChoice?.publicId;
  const hasVoted = !!userVote;

  const totalVotes = pollChoices.reduce(
    (sum, c) => sum + (c.votes?.length ?? 0),
    0,
  );

  const timeLeft = formatTimeLeft(pollExpiresAt);

  const { control, handleSubmit, watch } = useForm<FormValues>({
    defaultValues: { selectedPollChoice: "" },
  });

  const hasSelected = !!watch("selectedPollChoice");

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

  const onSubmit = (data: FormValues) => {
    voteMutation.mutate({ pollChoiceId: data.selectedPollChoice });
  };

  const stopBubbling = (e: React.MouseEvent | React.FormEvent) =>
    e.stopPropagation();

  // ── Results view ─────────────────────────────────────────────────────────────
  if (hasVoted) {
    return (
      <section className="ml-[68px] mr-4 mb-4" onClick={stopBubbling}>
        <PollResults
          pollChoices={pollChoices}
          userVote={userVote}
          totalVotes={totalVotes}
          timeLeft={timeLeft}
        />
      </section>
    );
  }

  // ── Voting view ───────────────────────────────────────────────────────────────
  return (
    <section className="ml-[68px] mr-4 mb-4" onClick={stopBubbling}>
      {timeLeft && <p className="text-xs text-grey_60 mb-2">{timeLeft}</p>}
      <form
        onSubmit={(e) => {
          e.stopPropagation();
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
