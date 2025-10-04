import Checkbox from "@/components/Checkbox";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelect from "@/components/forms/CustomSelect";
import Typography from "@/components/forms/Typography";
import { useForm } from "react-hook-form";

const AddNewCardForm = () => {
  const { control } = useForm();

  return (
    <div className="mx-4 mt-6">
      <Typography variant="p2" className="text-grey_500">
        Billing Details
      </Typography>

      <form>
        <div className="flex items-center mt-4">
          <CustomSelect
            ifLabel
            label="Country"
            placeholder="Select Country"
            className="mr-4"
          />
          <CustomSelect
            ifLabel
            label="State/Province"
            placeholder="Select State/Province"
          />
        </div>

        <div className="mt-4">
          <CustomInput
            name="House Address"
            control={control}
            label="House Address"
          />
        </div>

        <div className="flex items-center mt-4">
          <CustomInput
            name="City"
            control={control}
            label="City"
            className="mr-4"
          />
          <CustomInput
            name="Postal Code"
            control={control}
            label="Postal Code"
          />
        </div>

        <Typography variant="p2" className="text-grey_500 pb-4">
          Card Details
        </Typography>

        <div className="flex items-center mt-4">
          <CustomInput
            name="City"
            control={control}
            label="Name on Card"
            className="mr-4"
          />
          <CustomInput
            name="Postal Code"
            control={control}
            label="Email Address"
          />
        </div>

        <div className="mt-4">
          <CustomInput
            name="House Address"
            control={control}
            label="Card Number"
          />
        </div>

        <div className="flex items-center mt-4">
          <CustomInput
            name="City"
            control={control}
            label="Expiry"
            className="mr-4"
          />
          <CustomInput name="Postal Code" control={control} label="CVV" />
        </div>

        <Checkbox
          className="mb-10 lg:mb-0"
          text="I agree i am 18 years and above, and i have attained the age of majority in my country. "
          control={control}
          name="conditions"
        />

        <div className="flex ml-auto justify-end my-8 w-1/4">
          <CustomButton primaryButtonSize="xs" className="px-4">
            Proceed
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export { AddNewCardForm };
