import { useState } from "react";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import verifyBlue from "../../assets/icons/verifyBlue.svg";
import CustomSelect from "../forms/CustomSelect";
import CustomInput from "../forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../forms/CustomButton";
import Typography from "../forms/Typography";
import { giftSubOptions } from "../../data";

const GiftSubscription = ({ toggleModal }: { toggleModal: () => void }) => {
  const { control } = useForm();
  const [cardDetails] = useState<boolean>(true);

  return (
    <div className="flex flex-col bg-modal-gradient shadow-triple rounded-2xl border-2 border-white p-6 w-[518px]">
      <Typography variant="titleOne" className="text-grey_800">
        Gift Subscription
      </Typography>
      <Typography variant="p3" className="text-grey_600">
        Send this creators subscription as a gift to a friend
      </Typography>

      <div className="my-6 flex items-center">
        <img src={defaultAvatar} alt="default avatar" />
        <div className="ml-3">
          <div className="flex items-center">
            <Typography variant="titleTwo" className="text-grey_800 pr-1">
              Priscilia yummy
            </Typography>
            <img src={verifyBlue} alt="verify blue" />
          </div>
          <Typography variant="p3" className="text-grey_600">
            @yummychill54
          </Typography>
        </div>
      </div>

      <div className="mb-8">
        {cardDetails ? (
          <div className="flex flex-col">
            {giftSubOptions.map((item) => (
              <div key={item.id} className="flex items-center justify-between">
                <Typography variant="subtitle2" className="text-grey_600">
                  {item.name}
                </Typography>
                <Typography variant="subtitle2" className="text-grey_600">
                  {item.ans}
                </Typography>
              </div>
            ))}
          </div>
        ) : (
          <>
            <CustomSelect ifLabel label="Select Subscription" />
            <CustomInput
              control={control}
              name="name"
              label="Username or Email address to send Gift*"
              className="mt-6"
            />
            <CustomInput
              control={control}
              name="name"
              label="Name of Receiver"
              className=""
            />

            <div className="ml-[128px] flex items-center pb-6">
              <CustomButton
                onClick={toggleModal}
                variant="secondary"
                className="text-xs mr-6 w-[84px]"
              >
                Cancel
              </CustomButton>
              <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
                Send Gift
              </CustomButton>
            </div>
          </>
        )}
      </div>

      <div className="mb-6">
        <Typography variant="subtitle2" className="text-grey_600 pb-2">
          Payment Method
        </Typography>
        <Typography variant="p3" className="text-grey_600 pb-2">
          Select a payment method to bill from
        </Typography>
      </div>
    </div>
  );
};

export default GiftSubscription;
