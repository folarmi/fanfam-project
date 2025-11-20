import CustomButton from "../forms/CustomButton";
import Typography from "../forms/Typography";
import { useForm } from "react-hook-form";
import CustomSelect from "../forms/CustomSelect";
import CustomInput from "../forms/CustomInput";
import { sampleMonths } from "@/data";
import { useCustomMutation } from "@/hooks/apiCalls";
import { parseFormattedNumber } from "@/utils/helperTwo";
import { useQueryClient } from "@tanstack/react-query";
import type { SubscriptionBundle } from "@/lib/types";

export interface FormValues {
  amount: string;
  durationInMonths: number;
}

interface BundleProps {
  toggleModal: (modalName?: string) => void;
  mode: "add" | "edit";
  // bundleData?: { id: string; amount: number; durationInMonths: number };
  bundleData?: SubscriptionBundle;
}

const BundleForm = ({ toggleModal, mode, bundleData }: BundleProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<FormValues>();

  const addSubscriptionBundleMutation = useCustomMutation({
    method: mode === "edit" ? "put" : "post",
    endpoint:
      mode === "edit"
        ? `subscriptions/bundle/${bundleData?.publicId}`
        : `subscriptions/bundle`,
    successMessage: () =>
      mode === "edit"
        ? "Subscription Bundle updated successfully"
        : "Subscription Bundle added successfully",
    onSuccessCallback: () => {
      toggleModal("Add bundle");
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });
    },
  });

  const submitForm = (data: FormValues) => {
    const formvalues = {
      ...data,
      amount: parseFormattedNumber(data?.amount),
    };
    addSubscriptionBundleMutation.mutate(formvalues);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white rounded-2xl p-6 w-full md:w-1/2"
    >
      <Typography variant="h5" className="cursor-pointer text-grey_800 pb-6">
        Add Bundle
      </Typography>

      <CustomInput
        label="Amount"
        name="amount"
        control={control}
        rules={{
          required: "Amount is required",
        }}
      />

      <CustomSelect
        name="durationInMonths"
        control={control}
        placeholder="3 months"
        ifLabel
        options={sampleMonths}
        label="Select duration(in months)"
      />

      <div className="flex items-center mt-8 mb-6 justify-end w-1/2 ml-auto">
        <CustomButton
          onClick={() => toggleModal("Add bundle")}
          variant="secondary"
          className="text-xs mr-4 w-fit"
        >
          Cancel
        </CustomButton>
        <CustomButton
          disabled={addSubscriptionBundleMutation?.isPending}
          loading={addSubscriptionBundleMutation?.isPending}
          variant="primary"
          className="text-xs px-3 w-fit"
        >
          Create Bundle
        </CustomButton>
      </div>
    </form>
  );
};

export default BundleForm;
