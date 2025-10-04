import AccountBackButton from "@components/forms/AccountBackButton";
import CustomButton from "@components/forms/CustomButton";
import CustomSelect from "@components/forms/CustomSelect";

const BlockCountry = () => {
  return (
    <div>
      <AccountBackButton />

      <div className="mt-4 ml-4">
        <CustomSelect
          ifLabel
          label="Block access to your profile and posts from selected countries"
        />

        <div className="mt-8 w-1/6">
          <CustomButton disabled={true}>Save</CustomButton>
        </div>
      </div>
    </div>
  );
};

export { BlockCountry };
