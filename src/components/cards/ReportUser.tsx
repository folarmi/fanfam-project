import React from "react";
import Typography from "../forms/Typography";
import CustomButton from "../forms/CustomButton";
import CollectionRadioButton from "../forms/CollectionRadioButton";

const ReportUser = ({ toggleModal }: any) => {
  return (
    <div className="bg-create-folder shadow-custom-double rounded-2xl px-6 border-2 border-white">
      <Typography className="py-6" variant="titleOne">
        Report user
      </Typography>

      <CollectionRadioButton label="Violates FanFam Terms of Service" />
      <CollectionRadioButton label="Contains copyrighted material" />
      <CollectionRadioButton label="Child Sexual Abuse Material" />
      <CollectionRadioButton label="Report Spam" />
      <CollectionRadioButton label="Report Abuse" />

      <div className="ml-[128px] flex items-center mb-6 mt-8">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs mr-6 w-[84px]"
        >
          Cancel
        </CustomButton>
        <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
          Report
        </CustomButton>
      </div>
    </div>
  );
};

export default ReportUser;
