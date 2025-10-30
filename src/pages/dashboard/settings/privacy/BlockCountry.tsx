import { getAllCountryOptionsWithNames } from "@/data";
import AccountBackButton from "@components/forms/AccountBackButton";
import CustomButton from "@components/forms/CustomButton";
import CustomSelect from "@components/forms/CustomSelect";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const BlockCountry = () => {
  const { control } = useForm();
  const countryOptions = useMemo(() => getAllCountryOptionsWithNames(), []);

  console.log(countryOptions);
  return (
    <div>
      <AccountBackButton />

      <div className="mt-4 ml-4">
        <CustomSelect
          name=""
          control={control}
          ifLabel
          label="Block access to your profile and posts from selected countries"
          options={countryOptions}
        />

        <div className="mt-8 w-1/6">
          <CustomButton className="w-full">Save</CustomButton>
        </div>
      </div>
    </div>
  );
};

export { BlockCountry };
