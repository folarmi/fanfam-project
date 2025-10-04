import { useState } from "react";
import Typography from "../forms/Typography";
import verifyTwo from "@assets/icons/verifyTwo.svg";
import tickSquare from "@/assets/icons/tickSquare.svg";
import tinyArrow from "@/assets/icons/tinyArrow.svg";
import SubscriptionButton from "../molecules/SubscriptionButton";
import suggestionOne from "@/assets/suggestionOne.svg";
import defaultAvatar from "@/assets/defaultAvatar.svg";
import { subOptions } from "../../data";

const SubscribedModal = () => {
  const [isOptionsShown, setIsOptionsShown] = useState(false);
  const [showRenewalInfo, setShowRenewalInfo] = useState(false);

  const toggleState = () => {
    setIsOptionsShown(!isOptionsShown);
  };

  const toggleRenewalInfo = () => {
    setShowRenewalInfo(!showRenewalInfo);
  };

  return (
    <div className="bg-white rounded-lg cursor-pointer">
      {/* Header with Cover img */}
      <div className="relative">
        <img
          src={suggestionOne}
          alt="Cover"
          className="w-full h-20 object-cover rounded-t-lg"
        />
        <img
          src={defaultAvatar}
          alt="Profile"
          className="absolute top-12 left-4 rounded-full border-4 border-white w-16 h-16"
        />
      </div>

      <div className="p-4">
        {/* Profile Section */}
        <div className="flex items-center mt-6">
          <Typography variant="titleTwo" className="text-grey_900 pr-1">
            Saver Jesse
          </Typography>
          <img alt="verifyTwo" src={verifyTwo} className="w-4 h-4" />
        </div>

        <Typography variant="p2" className="text-grey_600 pt-1">
          @jesseblink
        </Typography>

        {/* Benefits Section */}
        <Typography variant="labelOne" className="text-grey_400 pt-4">
          BENEFITS
        </Typography>

        <div className="mb-4">
          {subOptions.map(({ id, name }) => {
            return (
              <div key={id} className="flex items-center">
                <img
                  alt="blueTick"
                  src={tickSquare}
                  className="w-[22px] h-[22px]"
                />
                <Typography className="text-grey_900" variant="p3">
                  {name}
                </Typography>
              </div>
            );
          })}
        </div>

        <SubscriptionButton
          textOne="RENEW"
          textTwo="$15 per month"
          className="mb-2"
        />

        <Typography variant="p3" className="text-grey_900">
          This subscription renews at $15.
          {!showRenewalInfo && (
            <span
              className="text-blue_500 cursor-pointer"
              onClick={toggleRenewalInfo}
            >
              Renewal info
            </span>
          )}
        </Typography>

        {showRenewalInfo && (
          <div className="mt-4">
            <Typography variant="subtitle3" className="text-grey_400 pb-1">
              Renewal Info
            </Typography>

            <div className="px-2 text-xs text-gray-500">
              <Typography variant="p3" className="text-grey_400 w-[262px] py-1">
                • Your subscription will renew at $15 until you choose to
                cancel.
              </Typography>
              <Typography variant="p3" className="text-grey_400 w-[262px] py-1">
                • If you cancel, you will still have access until it expires.
              </Typography>
              <Typography variant="p3" className="text-grey_400 w-[262px] py-1">
                • Subject to our{" "}
                <span className="text-blue_500">Terms of Service.</span>
              </Typography>
            </div>

            <Typography
              variant="subtitle3"
              className="text-blue_500 text-center pt-4 cursor-pointer"
              onClick={toggleRenewalInfo}
            >
              Hide Renewal Information
            </Typography>
          </div>
        )}

        <div className="flex items-center mt-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <div
            className="flex items-center mx-2 cursor-pointer"
            onClick={toggleState}
          >
            <Typography variant="subtitle3" className="text-xs text-grey_400">
              Show discounted options
            </Typography>
            <img src={tinyArrow} alt="tinyArrow" className="h-4 w-4" />
          </div>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {isOptionsShown && (
          <div className="mt-4">
            <SubscriptionButton
              textOne="1 months (20% off)"
              textTwo="$15"
              className="mb-4"
            />
            <SubscriptionButton
              textOne="6 months (40% off)"
              textTwo="$100"
              className="mb-4"
            />
            <SubscriptionButton
              textOne="12 months (45% off)"
              textTwo="$150"
              className="mb-4"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscribedModal;
