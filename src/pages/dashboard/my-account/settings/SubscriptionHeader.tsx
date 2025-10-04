import React from "react";
import { AccountMobileBackButton } from "../../../../components/molecules/AccountMobileBackButton";
import Typography from "../../../../components/forms/Typography";

type SubscriptionHeaderProps = {
  text?: string | React.ReactNode;
  mobileText?: string | React.ReactNode;
};

const SubscriptionHeader = ({ text, mobileText }: SubscriptionHeaderProps) => {
  return (
    //
    <div
      className={`w-full bg-white py-[18px] md:pl-7 border
 border-grey_20 shadow-custom-combined h-14 flex items-center`}
    >
      <AccountMobileBackButton mobileText={mobileText} />
      <Typography variant="subtitle1" className="text-black">
        {text}
      </Typography>
    </div>
  );
};

export { SubscriptionHeader };
