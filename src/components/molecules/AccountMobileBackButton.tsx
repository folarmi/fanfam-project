/* eslint-disable @typescript-eslint/no-explicit-any */

import React from "react";
import leftArrow from "../../assets/icons/arrowLeft.svg";
import { useDispatch } from "react-redux";
import { updateAccountShowOnMobile } from "../../lib/features/mobileView/settingMobileViewSlice";

type Prop = {
  mobileText?: string | React.ReactNode;
  dispatchFunction?: any;
};

const AccountMobileBackButton = ({
  mobileText,
  dispatchFunction = updateAccountShowOnMobile,
}: Prop) => {
  const dispatch = useDispatch();

  const toggleView = () => {
    dispatch(dispatchFunction(false));
  };

  return (
    <div className="ml-2 flex items-center h-full md:hidden cursor-pointer ">
      <img src={leftArrow} alt="leftArrow" className="" onClick={toggleView} />
      {/* <div className="w-full"> */}
      {mobileText}
      {/* </div> */}
    </div>
  );
};

export { AccountMobileBackButton };
