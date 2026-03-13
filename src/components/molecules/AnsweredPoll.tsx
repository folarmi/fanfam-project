import { useForm } from "react-hook-form";
import { PollChoices, type PollChoice } from "../forms/PollChoices";
// import graphIcon from "../../assets/icons/graphIcon.svg";
// import listIcon from "../../assets/icons/listIcon.svg";
// import sampleGraph from "../../assets/sampleGraph.svg";

type FormValues = {
  selectedPollChoice: string | number;
};

const AnsweredPoll = ({ pollChoices }: { pollChoices: PollChoice[] }) => {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      selectedPollChoice: "",
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>, data: FormValues) => {
    e.stopPropagation();
    console.log(data);
  };

  return (
    <section onSubmit={handleSubmit(onSubmit)} className="ml-[68px] mr-4 mb-4">
      <PollChoices<FormValues>
        pollChoices={pollChoices}
        name="selectedPollChoice"
        control={control}
      />
    </section>
  );
};

export default AnsweredPoll;
