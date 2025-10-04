import AccountBackButton from "@components/forms/AccountBackButton";
import CustomButton from "@components/forms/CustomButton";
import CustomInput from "@components/forms/CustomInput";
import Typography from "@components/forms/Typography";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const DeleteAccount = () => {
  const { control } = useForm();
  const [, setIsButtonDisabled] = useState(true);

  return (
    <div>
      <AccountBackButton />

      <section className="mt-4 ml-4">
        <Typography variant="p2" className="text-grey_800 leading-5">
          Deleting your account will permanently erase all data associated with
          your account including email address, phone number, password and
          documents uploaded.
        </Typography>
        <Typography variant="p2" className="text-grey_800 pt-4">
          To continue, enter your account password.
        </Typography>

        <form className="w-1/3 mt-4">
          <CustomInput
            label="Password"
            name="password"
            control={control}
            onFocus={() => setIsButtonDisabled(false)}
            borderRadius="lg"
            rules={{
              required: "Phone Number is required",
            }}
          />

          <Link to="/dashboard/settings/account/confirm-delete">
            <div className="w-1/2">
              <CustomButton
                // disabled={isButtonDisabled}
                primaryButtonSize="xs"
                disabled={true}
                className="px-4"
              >
                Continue
              </CustomButton>
            </div>
          </Link>
        </form>
      </section>
    </div>
  );
};

export { DeleteAccount };
