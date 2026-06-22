/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "../components/forms/CustomInput";
import { useForm } from "react-hook-form";
import { Calendar } from "lucide-react";
import Typography from "../components/forms/Typography";
import CustomButton from "../components/forms/CustomButton";
import TextBetweenLines from "../components/molecules/TextBetweenLines";
import AuthLayout from "../layouts/AuthLayout";
import Checkbox from "../components/Checkbox";
// import SocialMedia from "../components/SocialMedia";
import { toast } from "react-toastify";
import { useAppDispatch } from "../lib/hook";
import {
  updateEmailType,
  updateUserEmail,
} from "../lib/features/auth/authSlice";
import {
  getBrowserInfo,
  getPlatformFromUAParser,
  phoneRegex,
  passwordRegex,
} from "../utils/helper";
import { useCustomMutation } from "../hooks/apiCalls";
import { Link, useNavigate } from "react-router-dom";
import { UserRole } from "@/data";
import { GoogleSignIn } from "@/oauth/Google";
import { useState } from "react";
import PasswordStrengthChecklist from "@/components/atoms/PasswordStrengthChecklist";

const Signup = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch } = useForm();
  const passwordValue = watch("password", "");
  const platform = getPlatformFromUAParser();
  const browser = getBrowserInfo();
  const [ip] = useState<string>("");
  const [location] = useState<string>("");

  const dispatch = useAppDispatch();

  const signUpMutation = useCustomMutation({
    endpoint: "auth/register",
    successMessage: (data: any) => data?.data?.message,
    // errorMessage: (error: any) => error,
    onSuccessCallback: (data) => {
      toast("Kindly check your email for a verification link");
      dispatch(updateUserEmail(data?.data?.email));
      dispatch(updateEmailType("Signup"));
      navigate("/email-sent");
    },
  });

  const submitForm: any = (data: any) => {
    delete data.conditions;
    const formValues = {
      ...data,
      role: UserRole.viewer,
    };

    // console.log(formValues);
    signUpMutation.mutate(formValues);
  };

  return (
    <AuthLayout>
      <div className="flex flex-col h-full overflow-y-auto scrollbar-hide ">
        <form
          onSubmit={handleSubmit(submitForm)}
          className="flex flex-col gap-0"
        >
          {/* Row: First + Last name */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CustomInput
              label="First Name"
              name="firstName"
              control={control}
              rules={{ required: "First Name is required" }}
            />
            <CustomInput
              label="Last Name"
              name="lastName"
              control={control}
              rules={{ required: "Last Name is required" }}
            />
          </div>

          {/* Email */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CustomInput
              label="Email"
              name="email"
              type="email"
              control={control}
              rules={{ required: "Email is required" }}
            />

            <CustomInput label="Username" name="username" control={control} />
          </div>

          {/* Row: Phone + DOB */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <CustomInput
              label="Phone Number"
              name="phoneNumber"
              control={control}
              rules={{
                pattern: {
                  value: phoneRegex,
                  message: "Please enter a valid phone number",
                },
              }}
            />
            <CustomInput
              label="Date Of Birth"
              name="dob"
              type="date"
              control={control}
              max={new Date().toISOString().split("T")[0]}
              rules={{
                required: "Date of birth is required",
                validate: (value) => {
                  const birthDate = new Date(value);
                  const today = new Date();
                  if (birthDate > today)
                    return "Date of birth cannot be in the future";
                  let age = today.getFullYear() - birthDate.getFullYear();
                  const m = today.getMonth() - birthDate.getMonth();
                  if (
                    m < 0 ||
                    (m === 0 && today.getDate() < birthDate.getDate())
                  )
                    age--;
                  return age >= 18 || "You must be at least 18 years old";
                },
              }}
              rightIcon={<Calendar className="w-5 h-5 pointer-events-none" />}
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <CustomInput
              label="Password"
              name="password"
              control={control}
              type="password"
              rules={{
                required: "Password is required",
                pattern: {
                  value: passwordRegex,
                  message: "Please ensure all password requirements are met",
                },
              }}
            />
          </div>

          {/* Password strength — inset card */}

          <PasswordStrengthChecklist value={passwordValue} className="mb-6" />

          {/* Divider */}
          <div
            className="w-full h-px mb-5"
            style={{ backgroundColor: "#E7E8F1" }}
          />

          {/* Terms checkbox */}
          <Checkbox
            className="mb-5"
            text="By checking this box, I certify that I am at least 18 years old, have the capacity to enter into legally binding contracts, and have read and agree to the Terms of Service"
            control={control}
            name="conditions"
            rules={{ required: "Please agree to the terms and conditions" }}
          />

          {/* Submit */}
          <CustomButton
            loading={signUpMutation.isPending}
            variant="primary"
            className="shadow-custom mb-5 w-full"
          >
            Create Account
          </CustomButton>
        </form>

        <TextBetweenLines text=" or continue with" />

        {/* Google */}
        <div className="flex items-center justify-center mb-6">
          <GoogleSignIn
            ip={ip}
            location={location}
            browser={browser}
            platform={platform}
          />
        </div>

        <Typography variant="p3" className="pb-10 text-center text-grey_500">
          Already have an account?{" "}
          <Link to="/login">
            <span className="text-primary">Sign in</span>
          </Link>
        </Typography>
      </div>
    </AuthLayout>
  );
};

export { Signup };
