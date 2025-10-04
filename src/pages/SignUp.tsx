/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "../components/forms/CustomInput";
import { useForm } from "react-hook-form";
import Typography from "../components/forms/Typography";
import CustomButton from "../components/forms/CustomButton";
import TextBetweenLines from "../components/molecules/TextBetweenLines";
import AuthLayout from "../layouts/AuthLayout";
import Checkbox from "../components/Checkbox";
import SocialMedia from "../components/SocialMedia";
import { toast } from "react-toastify";
import { useAppDispatch } from "../lib/hook";
import {
  updateEmailType,
  updateUserEmail,
} from "../lib/features/auth/authSlice";
import { phoneRegex } from "../utils/helper";
import { useCustomMutation } from "../hooks/apiCalls";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm();
  const dispatch = useAppDispatch();

  const signUpMutation = useCustomMutation({
    endpoint: "auth/register",
    successMessage: (data: any) => data?.data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: (data) => {
      toast("Kindly check your email for a verification link");
      dispatch(updateUserEmail(data?.data?.email));
      dispatch(updateEmailType("Signup"));
      navigate("/email-sent");
    },
  });

  const submitForm: any = (data: any) => {
    const formValues = {
      email: data?.email,
      password: data?.password,
      phoneNumber: data?.phoneNumber,
      role: "CREATOR",
    };
    signUpMutation.mutate(formValues);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="Phone Number"
          name="phoneNumber"
          control={control}
          rules={{
            required: "Phone Number is required",
            pattern: {
              value: phoneRegex,
              message: "Please enter a valid phone number",
            },
          }}
        />

        <CustomInput
          label="Email"
          name="email"
          type="email"
          control={control}
          rules={{ required: "Email is required" }}
        />

        <CustomInput
          label="Password"
          name="password"
          control={control}
          type="password"
          rules={{
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          }}
        />

        <Checkbox
          className="mb-10 lg:mb-0"
          text="By checking this box, I certify that I am at least 18-years old, have the capacity to enter into legally binding contracts, and have read and agree to the Terms of Service"
          control={control}
          name="conditions"
          rules={{ required: "Please agree to the terms and conditions" }}
        />

        <CustomButton
          loading={signUpMutation.isPending}
          variant="primary"
          className="shadow-custom mt-10 mb-6 px-6 w-full"
        >
          Signup
        </CustomButton>

        <TextBetweenLines text="or" />

        <SocialMedia />

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

export { Signup };
