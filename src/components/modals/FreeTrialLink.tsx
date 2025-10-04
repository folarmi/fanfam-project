/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomButton from "../forms/CustomButton";
import Typography from "../forms/Typography";
import { useForm } from "react-hook-form";
import CustomSelect from "../forms/CustomSelect";
import CustomInput from "../forms/CustomInput";

const FreeTrialLink = ({ toggleModal }: any) => {
  const { control } = useForm();

  return (
    <div className="bg-white rounded-2xl p-6 w-full md:w-1/2">
      <Typography variant="h5" className="cursor-pointer text-grey_800 pb-6">
        Free trial link
      </Typography>

      <CustomInput
        label="Trial link name"
        name="phoneNumber"
        control={control}
        rules={{
          required: "Phone Number is required",
        }}
      />

      <div className="flex items-center mt-4">
        <CustomSelect
          placeholder="Name of list"
          className="mr-6"
          ifLabel
          label="Offer limit"
        />
        <CustomSelect
          placeholder="Offer expiration"
          ifLabel
          label="Offer expiration"
        />
      </div>

      <div className="mt-4">
        <CustomSelect
          placeholder="Offer expiration"
          ifLabel
          label="Free trial duration"
        />
      </div>

      <Typography variant="p2" className="text-grey_500 pt-4">
        Promotional subscription cost $0.00 for offer expiration days. Users
        will not be subscribed automatically, only if the user choses to
        subscribe by choice.
      </Typography>

      <div className="flex items-center mt-8 mb-6 justify-end w-1/2 ml-auto">
        <CustomButton
          onClick={() => toggleModal("Create new free trial link")}
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

export default FreeTrialLink;
