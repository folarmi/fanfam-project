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
import { useSearchParams } from "react-router-dom";
import { getFCMToken } from "@/oauth/firebaseConfig";
import { useSignIn } from "@/hooks/useSignIn";

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
  const [, setNotVerifiedError] = useState(false);

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
      .then((result) => {
        if (result.success && result.location) {
          setLocation(result.location);
        } else {
          setError(result.error || "Failed to get location");
        }
      })
      .catch((err) => setError(err.message || "An unexpected error occurred"));
  }, []);

  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: searchParams.get("fanfam") || "",
      token: searchParams.get("mafanf") || "",
    },
  });

  const verifyUserMutation = useSignIn({
    setNotVerifiedError,
    endpoint: `auth/verify-token?mafanf=${searchParams.get(
      "mafanf",
    )}&fanfam=${searchParams.get("fanfam")}`,
  });

  const submitForm = async () => {
    const formData = {
      deviceOS: getDeviceOS(),
      deviceIP: ip,
      location: location,
      platform: platform,
      browser: browser,
      firebaseClientToken: await getFCMToken(),
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
