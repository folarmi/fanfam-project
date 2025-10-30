import { CreatorHeaderText } from "@/components/atoms/CreatorHeaderText";
import CustomButton from "@/components/forms/CustomButton";
import CustomInput from "@/components/forms/CustomInput";
import CustomSelect from "@/components/forms/CustomSelect";
import { banks, getAllCountryOptionsWithNames } from "@/data";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const BankingInformation = () => {
  const { control } = useForm();
  const countryOptions = useMemo(() => getAllCountryOptionsWithNames(), []);

  return (
    <div className="mt-4">
      <div className="mx-4">
        <CreatorHeaderText
          title="Complete Banking Information"
          description="Complete your banking information"
        />
      </div>

      <section className="border-t border-b border-grey_10">
        <form className="mx-4 mt-4 flex flex-col ">
          <CustomSelect
            name="country"
            options={countryOptions}
            control={control}
            label="Country"
            ifLabel
          />
          <CustomSelect
            name="bankName"
            options={banks}
            control={control}
            label="Bank Name"
            ifLabel
          />

          <CustomInput
            label="Account Number"
            name="accountNumber"
            control={control}
            placeholder="2000211109"
          />
          <CustomInput
            label="Account name"
            name="accountName"
            control={control}
            placeholder="Cynthia Ofore"
          />

          <CustomButton
            variant="primary"
            className="shadow-custom mb-4 mt-3 mx-4 w-[96%]"
          >
            Save
          </CustomButton>
        </form>
      </section>
    </div>
  );
};

export { BankingInformation };
