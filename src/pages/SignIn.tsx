/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchDeviceIP,
  getBrowserInfo,
  getDeviceOS,
  getPlatformFromUAParser,
  getReadableLocation,
} from "../utils/helper";
import { useEffect, useState } from "react";
import { useCustomMutation } from "../hooks/apiCalls";
import { updateUserObject } from "../lib/features/auth/authSlice";
import AuthLayout from "../layouts/AuthLayout";
import CustomInput from "../components/forms/CustomInput";
import Checkbox from "../components/Checkbox";
import Typography from "../components/forms/Typography";
import CustomButton from "../components/forms/CustomButton";
import TextBetweenLines from "../components/molecules/TextBetweenLines";
import SocialMedia from "../components/SocialMedia";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { control, handleSubmit } = useForm();
  const platform = getPlatformFromUAParser();
  const browser = getBrowserInfo();
  const [ip, setIp] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIP = async () => {
      const deviceIP = await fetchDeviceIP();
      setIp(deviceIP);
    };

    fetchIP();
  }, []);

  useEffect(() => {
    getReadableLocation()
      .then((result) => {
        if (result.success && result.location) {
          setLocation(result.location);
        } else {
          setError(result.error || "Failed to get location");
        }
      })
      .catch((err) => setError(err.message || "An unexpected error occurred"));
  }, []);

  const signInMutation = useCustomMutation({
    endpoint: `auth/login`,
    successMessage: (data: any) => data?.message,
    onSuccessCallback: (data) => {
      const userObject = {
        email: data?.data?.email,
        role: data?.data?.role,
        usid: data?.data?.usid,
      };

      localStorage.setItem("token", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);
      dispatch(updateUserObject(userObject));
      navigate("/dashboard");
    },
  });

  const submitForm = (data: any) => {
    const formValues = {
      email: data.email,
      password: data.password,
      deviceMeta: {
        deviceOS: getDeviceOS(),
        deviceIP: ip,
        location: location,
        platform: platform,
        browser: browser,
      },
    };

    signInMutation.mutate(formValues);
  };
  return (
    <AuthLayout>
      <form className="" onSubmit={handleSubmit(submitForm)}>
        <CustomInput
          label="Email"
          name="email"
          control={control}
          rules={{ required: "Email is required" }}
        />

        <CustomInput
          label="Password"
          name="password"
          control={control}
          type="password"
          rules={{ required: "Password is required" }}
          className="-mb-2"
        />

        <div className="w-full flex justify-between items-center mb-10">
          <Checkbox
            text="Remember me"
            control={control}
            name="termsAndCondition"
          />
          <Link to="forgot-password">
            <Typography
              variant="subtitle2"
              className="text-blue_500 whitespace-nowrap"
            >
              Forgot password?
            </Typography>
          </Link>
        </div>

        <CustomButton
          loading={signInMutation.isPending}
          variant="primary"
          className="shadow-custom mb-6 px-6 w-full"
        >
          Sign in
        </CustomButton>

        <TextBetweenLines text="or" />

        <SocialMedia />

        <Link to="/sign-up">
          <Typography variant="p3" className="pb-10 text-center text-grey_500">
            Don't have an account?{" "}
            <span className="text-primary">Create one</span>
          </Typography>
        </Link>
      </form>
    </AuthLayout>
  );
};

export { SignIn };
