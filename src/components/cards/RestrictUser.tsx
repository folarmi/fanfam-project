import React from "react";
import Typography from "../forms/Typography";
import CustomButton from "../forms/CustomButton";

const RestrictUser = ({ toggleModal }: any) => {
  return (
    <div className="bg-create-folder shadow-custom-double rounded-2xl px-6 border-2 border-white">
      <Typography className="pt-6" variant="titleOne">
        Restrict user
      </Typography>

      <Typography className="pt-6 pb-8" variant="p2">
        This user will not be able to send you messages.
      </Typography>

      <div className="ml-[128px] flex items-center pb-6">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs mr-6 w-[84px]"
        >
          Cancel
        </CustomButton>
        <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
          Restrict
        </CustomButton>
      </div>
    </div>
  );
};

export default RestrictUser;
