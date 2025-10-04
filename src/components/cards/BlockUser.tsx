import React from "react";
import Typography from "../forms/Typography";
import CustomButton from "../forms/CustomButton";

const BlockUser = ({ toggleModal }: any) => {
  return (
    <div className="bg-create-folder shadow-custom-double rounded-2xl px-6 border-2 border-white">
      <Typography className="pt-6" variant="titleOne">
        Block User
      </Typography>

      <Typography className="pt-6 pb-8" variant="p2">
        Block this user from accessing your profile
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
          Block
        </CustomButton>
      </div>
    </div>
  );
};

export default BlockUser;
