import React from "react";
import CustomButton from "../forms/CustomButton";
import Typography from "../forms/Typography";
import { useForm } from "react-hook-form";
import CustomSelect from "../forms/CustomSelect";
import CustomInput from "../forms/CustomInput";

const AddBundle = ({ toggleModal }: any) => {
  const { control } = useForm();

  return (
    <div className="bg-white rounded-2xl p-6 w-full md:w-1/2">
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

      <CustomSelect placeholder="3 months" ifLabel label="Select duration" />

      <div className="flex items-center mt-8 mb-6 justify-end w-1/2 ml-auto">
        <CustomButton
          onClick={() => toggleModal("Add bundle")}
          variant="secondary"
          className="text-xs mr-4 w-fit"
        >
          Cancel
        </CustomButton>
        <CustomButton variant="primary" className="text-xs px-3 w-fit">
          Create link
        </CustomButton>
      </div>
    </div>
  );
};

export default AddBundle;
