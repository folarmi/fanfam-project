/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from "../components/forms/CustomInput";
import { useForm } from "react-hook-form";
import Typography from "../components/forms/Typography";
import CustomButton from "../components/forms/CustomButton";

import AuthLayout from "../layouts/AuthLayout";

import { useAppDispatch } from "../lib/hook";
import {
  updateEmailType,
  updateUserEmail,
} from "../lib/features/auth/authSlice";
import { useCustomMutation } from "../hooks/apiCalls";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, getValues } = useForm();
  const dispatch = useAppDispatch();

  const forgotPasswordMutation = useCustomMutation({
    endpoint: "auth/forgot-password",
    successMessage: (data: any) => data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: () => {
      dispatch(updateUserEmail(getValues("email")));
      dispatch(updateEmailType("Reset"));
      navigate("/email-sent");
    },
  });

  const submitForm: any = (data: any) => {
    const formValues = {
      email: data?.email,
    };
    forgotPasswordMutation.mutate(formValues);
  };
  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(submitForm)}>
        <Typography variant="h5" className="pb-4">
          Forgot password
        </Typography>

        <Typography variant="p1" className="pb-8 text-grey_500">
          Enter the email you use to create your Fan Fam account and we will
          send you a password reset link.
        </Typography>
        <CustomInput
          label="Email"
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
        />

        <CustomButton
          loading={forgotPasswordMutation.isPending}
          variant="primary"
          className="shadow-custom mb-6 px-6 w-full"
        >
          Send Link
        </CustomButton>

        <Typography variant="p3" className="pb-10 text-center text-grey_500">
          Already have an account?{" "}
          <Link to="/">
            <span className="text-primary">Sign in</span>
          </Link>
        </Typography>
      </form>
    </AuthLayout>
  );
};

export { ForgotPassword };
