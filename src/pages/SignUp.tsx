/* eslint-disable @typescript-eslint/no-explicit-any */

import CustomInput from "../components/forms/CustomInput";
import { useForm } from "react-hook-form";
import { Calendar, CheckCircle2, X } from "lucide-react";
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
import { useDebouncedCallback } from "use-debounce";

const Signup = () => {
  const navigate = useNavigate();
  const { control, handleSubmit, watch, clearErrors, setError, getValues } =
    useForm();
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

  const setUsernameMutation = useCustomMutation({
    endpoint: `auth/set-username`,
    successMessage: () => {
      clearErrors("username");
      return "Username set successfully";
    },
    onError: () => {
      setError("username", {
        message: "Username is already taken",
        type: "manual",
      });
    },
  });

  const handleUserNameBlur = useDebouncedCallback(() => {
    const username = getValues("username");
    const email = getValues("email");
    console.log(username, email);
    // Only validate if there is a username, if username isn't empty and has changed and is not empty
    if (username && username.trim() !== "") {
      setUsernameMutation.mutate({ email, username });
    }
    // else if (username === data?.data?.username) {
    //   clearErrors("username");
    // }
  }, 500);

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
      <form onSubmit={handleSubmit(submitForm)}>
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
            pattern: {
              value: passwordRegex,
              message: "Please ensure all password requirements are met",
            },
          }}
        />

        <CustomInput
          label="Username"
          name="username"
          control={control}
          onBlur={() => handleUserNameBlur()}
          isVerified={setUsernameMutation.isSuccess}
        />

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

              if (birthDate > today) {
                return "Date of birth cannot be in the future";
              }

              let age = today.getFullYear() - birthDate.getFullYear();
              const m = today.getMonth() - birthDate.getMonth();
              if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
              return age >= 18 || "You must be at least 18 years old";
            },
          }}
          rightIcon={<Calendar className="w-5 h-5 pointer-events-none" />}
        />

        <div className="flex flex-col gap-1.5 -mt-3 mb-6 ml-2 text-xs">
          {[
            {
              label: "At least 8 characters long",
              met: (passwordValue || "").length >= 8,
            },
            {
              label: "Contains an uppercase letter",
              met: /[A-Z]/.test(passwordValue || ""),
            },
            {
              label: "Contains a lowercase letter",
              met: /[a-z]/.test(passwordValue || ""),
            },
            { label: "Contains a number", met: /\d/.test(passwordValue || "") },
            {
              label: "Contains a special character",
              met: /[^A-Za-z0-9]/.test(passwordValue || ""),
            },
          ].map((req, idx) => (
            <div key={idx} className="flex items-center gap-2">
              {req.met ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
              ) : (
                <X className="w-3.5 h-3.5 text-gray-400" />
              )}
              <span className={req.met ? "text-green-600" : "text-gray-500"}>
                {req.label}
              </span>
            </div>
          ))}
        </div>

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
      </form>

      <TextBetweenLines text="or" />

      {/* <SocialMedia /> */}
      <div className="flex items-center justify-center mb-10">
        <GoogleSignIn
          ip={ip}
          location={location}
          browser={browser}
          platform={platform}
        />
      </div>

      <Typography variant="p3" className="pb-10 text-center text-grey_500">
        Already have an account?{" "}
        <Link to="/">
          <span className="text-primary">Sign in</span>
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export { Signup };
