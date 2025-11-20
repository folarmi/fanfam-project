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
import { useEffect } from "react";

export interface FormValues {
  amount: string;
  durationInMonths: number;
}

interface BundleProps {
  toggleModal: (modalName?: string) => void;
  mode: "add" | "edit";
  bundleData?: SubscriptionBundle;
}

const BundleForm = ({ toggleModal, mode, bundleData }: BundleProps) => {
  const queryClient = useQueryClient();
  const { control, handleSubmit, reset } = useForm<FormValues>();

  const handleSubscriptionBundleMutation = useCustomMutation({
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
      durationInMonths: data?.durationInMonths,
      amount: parseFormattedNumber(data?.amount),
    };
    console.log(formvalues);

    handleSubscriptionBundleMutation.mutate(formvalues);
  };

  useEffect(() => {
    if (bundleData?.publicId !== "") {
      const defaults = bundleData;
      reset(defaults);
    }
  }, [bundleData, reset]);

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
          disabled={handleSubscriptionBundleMutation?.isPending}
          loading={handleSubscriptionBundleMutation?.isPending}
          variant="primary"
          className="text-xs px-3 w-fit"
        >
          {mode === "add" ? "Create Bundle" : "Edit Bundle"}
        </CustomButton>
      </div>
    </form>
  );
};

export default BundleForm;
