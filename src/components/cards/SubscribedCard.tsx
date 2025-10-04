/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "../forms/Typography";
import verifyTwo from "../../assets/icons/verifyTwo.svg";
import SubscriptionButton from "../molecules/SubscriptionButton";
import SubscribedModal from "../modals/SubscribedModal";
import CircleChat from "../../assets/icons/circleChat";
import CirclePay from "../../assets/icons/circlePay";

type props = {
  img: any;
  userName: string;
  tag: string;
  expiryStatus: string;
  expiryColor?: string;
  freeSub?: boolean;
  buttonText: string;
};

const SubscribedCard = ({
  img,
  userName,
  tag,
  expiryStatus,
  expiryColor = "#2A2A2D",
  freeSub,
  buttonText,
}: props) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="border border-grey_10 rounded-lg p-4 mr-4 w-[295px]">
      <img src={img} alt="avatar" className="w-[60px] h-[60px]" />

      <div className="flex items-center mt-2">
        <Typography variant="titleTwo" className="text-grey_900 pr-1">
          {userName}
        </Typography>
        <img alt="verifyTwo" src={verifyTwo} className="w-4 h-4" />
      </div>

      <Typography variant="p2" className="text-grey_600 pt-1">
        {tag}
      </Typography>

      <div className="my-4">
        <div className="flex items-center gap-x-4">
          <CircleChat className="cursor-pointer" />
          <CirclePay className="cursor-pointer" />
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <Typography
          variant="subtitle3"
          className="text-grey_600 cursor-pointer"
        >
          Subscription status
        </Typography>
        <Typography
          style={{
            color: expiryColor,
          }}
          variant="subtitle3"
          className="text-grey_800 cursor-pointer"
        >
          {expiryStatus}
        </Typography>
      </div>

      {freeSub && (
        <div className="flex items-center justify-between border border-grey_10 rounded-3xl px-4 py-[10px]">
          <Typography variant="subtitle3" className="text-blue_500">
            SUBSCRIBED
          </Typography>
          <Typography variant="subtitle3" className="text-blue_500">
            {buttonText}
          </Typography>
        </div>
      )}

      {!freeSub && (
        <SubscriptionButton
          textOne="RENEW"
          textTwo={buttonText}
          className="mb-2 cursor-pointer"
          onClick={toggleModal}
        />
      )}

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
          onClick={toggleModal}
        >
          <div className="" onClick={(e) => e.stopPropagation()}>
            {/* <SubscribedModal toggleModal={toggleModal} /> */}
            <SubscribedModal />
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscribedCard;
