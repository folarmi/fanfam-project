import React from "react";
import Typography from "../forms/Typography";
import Tag from "../molecules/Tag";
import CustomSelect from "../forms/CustomSelect";
import CustomInput from "../forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../forms/CustomButton";

const PromotionalCampaign = ({ toggleModal }: any) => {
  const { control } = useForm();

  return (
    <div className="bg-white rounded-2xl p-6">
      <Typography variant="h5" className="cursor-pointer text-grey_800 pb-6">
        Promotional Campaign
      </Typography>

      <div className="flex items-center pb-4 border-b border-grey_10 whitespace-nowrap">
        <Tag text="All" isActive={true} />
        <Tag text="New subscribers only" />
        <Tag text="Expired subscribers only" />
      </div>

      <div className="flex items-center mt-4">
        <Tag text="Free trial" isActive={true} />
        <Tag text="First month discount" />
      </div>

      <div className="flex items-center mt-4">
        <CustomSelect
          placeholder="Name of list"
          className="mr-6"
          ifLabel
          label="Name of list"
        />
        <CustomSelect
          placeholder="Offer expiration"
          ifLabel
          label="Offer expiration"
        />
      </div>

      <div className="mt-4">
        <CustomSelect
          placeholder="Offer expiration"
          ifLabel
          label="Free trial duration"
        />
      </div>

      <div className="mt-6">
        <CustomInput
          label="Message (Optional)"
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone Number is required",
          }}
        />
      </div>

      <div className="flex items-center mt-8 mb-6 justify-center md:justify-end w-full md:w-1/2 md:ml-auto">
        <CustomButton
          onClick={() => toggleModal("Start promotion campaign")}
          variant="secondary"
          className="text-xs mr-4 w-fit"
        >
          Cancel
        </CustomButton>
        <CustomButton variant="primary" className="text-xs px-3 w-fit">
          Save name
        </CustomButton>
      </div>
    </div>
  );
};

export default PromotionalCampaign;
