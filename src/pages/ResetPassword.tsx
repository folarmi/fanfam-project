/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense } from "react";
import CustomInput from "../components/forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../components/forms/CustomButton";
import AuthLayout from "../layouts/AuthLayout";
import Typography from "../components/forms/Typography";
import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { toast } from "react-toastify";
import { handleCopy, handleCut, handlePaste } from "../utils/helper";
import { useNavigate, useSearchParams } from "react-router-dom";

const ResetPassword = () => {
  //   const navigate = useNavigate();

  // Wrap useSearchParams with Suspense
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
};

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Extracted to be inside Suspense
  const { control, handleSubmit, getValues } = useForm();

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await api.post(
        `auth/reset-password?mafanf=${searchParams.get(
          "mafanf"
        )}&fanfam=${searchParams.get("fanfam")}`,
        data
      );
      return response;
    },
    onSuccess: (data) => {
      if (data?.data?.statusCode === 991) {
        localStorage.setItem("token", data?.data?.data?.accessToken);
        localStorage.setItem("refreshToken", data?.data?.data?.refreshToken);
        navigate("/dashboard");
      } else if (data?.data?.statusCode === -991) {
        toast.error(data?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.data?.message);
      console.log(error);
    },
  });

  const submitForm = (data: any) => {
    const formValues = {
      password: data.password,
    };

    resetPasswordMutation.mutate(formValues);
  };

  return (
    <AuthLayout>
      <Typography variant="h5">Create new password</Typography>
      <Typography variant="p1" className="pt-4 pb-8 text-grey_500">
        Create your new password and make sure it is different from your old
        password.
      </Typography>
      <form className="" onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="New Password"
          name="password"
          control={control}
          type="password"
          rules={{
            required: "New Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <CustomInput
          label="Retype Password"
          name="retypePassword"
          control={control}
          onPaste={handlePaste}
          onCopy={handleCopy}
          onCut={handleCut}
          type="password"
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <CustomButton
          loading={resetPasswordMutation.isPending}
          variant="primary"
          className="shadow-custom mb-6 px-6 w-full"
        >
          Reset Password
        </CustomButton>
      </form>
    </AuthLayout>
  );
};

export { ResetPassword };
