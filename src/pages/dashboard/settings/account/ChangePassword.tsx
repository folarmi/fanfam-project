/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from "@components/forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "@components/forms/CustomButton";
import AccountBackButton from "@components/forms/AccountBackButton";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import { toast } from "react-toastify";
import type { RootState } from "@/lib/store";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const { control, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const submitForm = (data: any) => {
    console.log(data);
    const formData = {
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
      email: userObject.email,
    };

    changePasswordMutation.mutate(formData);
  };

  const changePasswordMutation = useCustomMutation({
    endpoint: "auth/update-password",
    successMessage: (data: any) => data?.data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: (data) => {
      toast(data?.message);
      navigate("/dashboard/settings/account");
    },
  });

  return (
    <div>
      <AccountBackButton />

      <form className="mt-[22px] mx-4" onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="Current password"
          name="currentPassword"
          control={control}
          type="password"
          className="mb-4"
        />

        <CustomInput
          label="New password"
          name="newPassword"
          type="password"
          control={control}
          className="mb-4"
        />

        <CustomInput
          label="Confirm new password"
          name="confirmPassword"
          type="password"
          control={control}
          //   className="mb-4"
        />

        <div className="drop-shadow-5x shadow-post-button w-[104px] text-sm">
          <CustomButton
            primaryButtonSize="xs"
            className="px-4"
            disabled={changePasswordMutation.isPending}
          >
            Save password
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export { ChangePassword };
