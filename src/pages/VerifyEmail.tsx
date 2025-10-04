/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useEffect, useState } from "react"; // Import Suspense
import Typography from "../components/forms/Typography";
import AuthLayout from "../layouts/AuthLayout";
import CustomInput from "../components/forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../components/forms/CustomButton";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useMutation } from "@tanstack/react-query";
// import api from "../lib/axios";
// import { toast } from "react-toastify";
import {
  fetchDeviceIP,
  getBrowserInfo,
  getDeviceOS,
  getPlatformFromUAParser,
  getReadableLocation,
} from "../utils/helper";
import { useCustomMutation } from "../hooks/apiCalls";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
  //   const navigate = useNavigate();

  // Wrap useSearchParams with Suspense
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
};

const VerifyEmailForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ip, setIp] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [, setError] = useState<string | null>(null);
  const browser = getBrowserInfo();
  const platform = getPlatformFromUAParser();

  useEffect(() => {
    const fetchIP = async () => {
      const deviceIP = await fetchDeviceIP();
      setIp(deviceIP);
    };

    fetchIP();
  }, []);

  useEffect(() => {
    getReadableLocation()
      .then((location) => setLocation(location))
      .catch((err) => setError(err.message));
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: searchParams.get("fanfam") || "",
      token: searchParams.get("mafanf") || "",
    },
  });

  const verifyUserMutation = useCustomMutation({
    endpoint: `auth/verify-token?mafanf=${searchParams.get(
      "mafanf"
    )}&fanfam=${searchParams.get("fanfam")}`,
    successMessage: (data: any) => data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: (data) => {
      localStorage.setItem("token", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);
      navigate("/dashboard");
    },
  });

  const submitForm = () => {
    const formData = {
      deviceOS: getDeviceOS(),
      deviceIP: ip,
      location: location,
      platform: platform,
      browser: browser,
    };
    verifyUserMutation.mutate(formData);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(submitForm)} className="mt-5">
        <Typography variant="h5" className="pb-4">
          Verify Email
        </Typography>

        <CustomInput name="email" control={control} readOnly={true} />
        <CustomButton
          loading={verifyUserMutation.isPending}
          variant="primary"
          className="shadow-custom mb-6 px-6 w-full"
        >
          Verify Email
        </CustomButton>
      </form>
    </AuthLayout>
  );
};

export { VerifyEmail };
