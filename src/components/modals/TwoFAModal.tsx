import React from "react";
import Typography from "../forms/Typography";
import CustomInput from "../forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../forms/CustomButton";

const TwoFAModal = ({ toggleModal }: any) => {
  const { control } = useForm();
  return (
    <div className="bg-white rounded-2xl p-6">
      <Typography variant="h5" className="text-grey_800 pb-2">
        Disable 2FA Authentication
      </Typography>
      <Typography variant="p2" className="text-grey_500 pb-4 w-[366px]">
        You are about you remove a layer of security from your account. Please
        enter your account password to proceed
      </Typography>

      <CustomInput
        label="Enter Password"
        name="password"
        control={control}
        type="password"
      />

      <div className="flex items-center justify-end ml-auto mb-6">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs mr-6"
        >
          Disable 2FA
        </CustomButton>
        <CustomButton variant="primary" className="text-xs px-3">
          Cancel
        </CustomButton>
      </div>
    </div>
  );
};

export default TwoFAModal;
