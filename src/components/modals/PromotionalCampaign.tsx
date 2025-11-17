/* eslint-disable @typescript-eslint/no-explicit-any */

import Typography from "../forms/Typography";
import Tag from "../molecules/Tag";
import CustomSelect from "../forms/CustomSelect";
import CustomInput from "../forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../forms/CustomButton";
import { numberOfDays, promotionType, qualifiers } from "@/data";
import { useState } from "react";
import { useCustomMutation } from "@/hooks/apiCalls";
import {
  mapPromotionTypeNameToType,
  mapQualifierNameToType,
} from "@/utils/helperTwo";
import moment from "moment";

export type FormValues = {
  name: string;
  limitSize: number;
  endDate: string;
  duration: number;
  message: string;
  qualifier: string;
  type: string;
};

const PromotionalCampaign = ({ toggleModal }: any) => {
  const [activeQualifier, setActiveQualifier] = useState(
    "Both new and expired"
  );
  const [activePromotionType, setActivePromotionType] = useState("Free trial");
  const { control, handleSubmit } = useForm<FormValues>();

  const addPromotionalCampaignMutation = useCustomMutation({
    endpoint: `subscriptions/promotion`,
    successMessage: () => "Promotional Campaign added successfully",
    onSuccessCallback: () => {
      toggleModal("Start promotion campaign");
    },
  });

  const submitForm = (data: FormValues) => {
    const formValues = {
      ...data,
      qualifier: mapQualifierNameToType(activeQualifier),
      type: mapPromotionTypeNameToType(activePromotionType),
      endDate: moment(data?.endDate, "YYYY-MM-DD").toISOString(),
    };
    addPromotionalCampaignMutation.mutate(formValues);
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="bg-white rounded-2xl p-6"
    >
      <Typography variant="h5" className="cursor-pointer text-grey_800 pb-6">
        Promotional Campaign
      </Typography>

      <div className="flex items-center pb-4 border-b border-grey_10 whitespace-nowrap">
        {qualifiers?.map(({ id, name }) => {
          return (
            <Tag
              key={id}
              onClick={() => setActiveQualifier(name)}
              text={name}
              isActive={name === activeQualifier}
            />
          );
        })}
      </div>

      <div className="flex items-center mt-4">
        {promotionType?.map(({ id, name }) => {
          return (
            <Tag
              key={id}
              onClick={() => setActivePromotionType(name)}
              text={name}
              isActive={name === activePromotionType}
            />
          );
        })}
      </div>

      <div className="flex items-center mt-4">
        <CustomInput
          label="Name of list"
          name="name"
          control={control}
          rules={{
            required: "Name of list is required",
          }}
        />
        <CustomInput
          label="Offer expiration"
          name="endDate"
          control={control}
          type="date"
          rules={{
            required: "Offer expiration is required",
          }}
        />
      </div>

      <div className="mt-4">
        <CustomSelect
          name="duration"
          control={control}
          placeholder="Offer expiration"
          ifLabel
          label="Free trial duration"
          options={numberOfDays}
        />
      </div>

      <div className="mt-6">
        <CustomInput
          label="Message (Optional)"
          name="message"
          control={control}
        />
      </div>

      <div className="flex items-center mt-8 mb-6 justify-center md:justify-end w-full md:w-1/2 md:ml-auto">
        <CustomButton
          onClick={() => toggleModal("Start promotion campaign")}
          variant="secondary"
          className="text-xs mr-4 w-fit"
          type="button"
        >
          Cancel
        </CustomButton>
        <CustomButton
          disabled={addPromotionalCampaignMutation?.isPending}
          loading={addPromotionalCampaignMutation?.isPending}
          variant="primary"
          type="submit"
          className="text-xs px-3 w-fit"
        >
          Save Campaign
        </CustomButton>
      </div>
    </form>
  );
};

export default PromotionalCampaign;
