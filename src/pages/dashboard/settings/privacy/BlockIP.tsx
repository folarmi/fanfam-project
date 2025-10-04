import AccountBackButton from "@components/forms/AccountBackButton";
import CustomButton from "@components/forms/CustomButton";
import CustomInput from "@components/forms/CustomInput";
import { useForm } from "react-hook-form";

const BlockIP = () => {
  const { control } = useForm();

  return (
    <div>
      <AccountBackButton />

      <div className="mt-4 ml-4">
        <CustomInput
          label="Enter IP address"
          name="email"
          type="email"
          control={control}
          placeholder="Enter IP address"
          rules={{ required: "Email is required" }}
        />

        <div className="mt-8 w-1/6">
          <CustomButton>Save</CustomButton>
        </div>
      </div>
    </div>
  );
};

export { BlockIP };
