/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  fetchDeviceIP,
  getBrowserInfo,
  getDeviceOS,
  getPlatformFromUAParser,
  getReadableLocation,
} from "../utils/helper";
import { useEffect, useState } from "react";
import { useCustomMutation } from "../hooks/apiCalls";
import AuthLayout from "../layouts/AuthLayout";
import CustomInput from "../components/forms/CustomInput";
import Checkbox from "../components/Checkbox";
import Typography from "../components/forms/Typography";
import CustomButton from "../components/forms/CustomButton";
import TextBetweenLines from "../components/molecules/TextBetweenLines";
// import SocialMedia from "../components/SocialMedia";
import { useSignIn } from "@/hooks/useSignIn";
import { GoogleSignIn } from "@/oauth/Google";
import { getFCMToken } from "@/oauth/firebaseConfig";
import { toast } from "react-toastify";

const SignIn = () => {
  const { control, handleSubmit, getValues } = useForm();
  const platform = getPlatformFromUAParser();
  const browser = getBrowserInfo();
  const [ip, setIp] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [, setError] = useState<string | null>(null);
  const [notVerifiedError, setNotVerifiedError] = useState(false);
  const signInMutation = useSignIn({
    setNotVerifiedError,
    endpoint: "auth/login",
  });

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

  const submitForm = async (data: any) => {
    let fcmToken = null;

    try {
      // Check current permission

      // If permission is blocked, inform user
      if (Notification.permission === "denied") {
        console.warn(
          "⚠️ Notification permission is blocked. User needs to enable it in browser settings."
        );
        // You can show a toast or message to the user here
        toast.warning(
          "Please enable notifications in your browser settings to receive updates"
        );
      } else if (Notification.permission === "default") {
        // Request permission if not yet asked
        const permission = await Notification.requestPermission();
        console.log("Permission request result:", permission);

        if (permission === "granted") {
          fcmToken = await getFCMToken();
        }
      } else if (Notification.permission === "granted") {
        // Permission already granted
        fcmToken = await getFCMToken();
      }
    } catch (error) {
      console.error("Error getting FCM token:", error);
      // Don't block login if FCM token fails
    }

    const formValues = {
      email: data.email,
      password: data.password,
      deviceMeta: {
        deviceOS: getDeviceOS(),
        deviceIP: ip,
        location: location,
        platform: platform,
        browser: browser,
        firebaseClientToken: fcmToken,
      },
    };

    signInMutation?.mutate(formValues);
  };

  const resendVerificationLinkMutation = useCustomMutation({
    endpoint: `auth/resend-verification-link?email=${getValues("email")}`,
    successMessage: (data: any) => data?.message,
    // successMessage: (data: any) => console.log(data?.message),
    // errorMessage: (error: any) => error,
    onSuccessCallback: () => {},
  });

  const resendVerificationEmail = () => {
    resendVerificationLinkMutation.mutate({});
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
        {notVerifiedError && (
          <button
            onClick={resendVerificationEmail}
            className="bg-transparent border-none p-0 cursor-pointer hover:underline focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 rounded w-full flex justify-end"
            type="button"
          >
            <Typography variant="p2" className="text-red-600 mb-3">
              Resend verification email.
            </Typography>
          </button>
        )}

        <div className="w-full flex justify-between items-center mb-10">
          <Checkbox
            text="Remember me"
            control={control}
            name="termsAndCondition"
          />
          <Link to="/forgot-password">
            <Typography
              variant="subtitle2"
              className="text-blue_500 whitespace-nowrap"
            >
              Forgot password?
            </Typography>
          </Link>
        </div>

        <CustomButton
          loading={signInMutation?.isPending}
          variant="primary"
          className="shadow-custom mb-6 px-6 w-full"
        >
          Sign in
        </CustomButton>
      </form>

      <TextBetweenLines text="or" />

      <div className="flex items-center justify-center mb-10">
        <GoogleSignIn
          ip={ip}
          location={location}
          browser={browser}
          platform={platform}
        />
      </div>

      <Link to="/sign-up">
        <Typography variant="p3" className="pb-10 text-center text-grey_500">
          Don't have an account?{" "}
          <span className="text-primary">Create one</span>
        </Typography>
      </Link>
    </AuthLayout>
  );
};

export { SignIn };
