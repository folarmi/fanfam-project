import { Suspense, useEffect, useState } from "react";
import Typography from "../components/forms/Typography";
import AuthLayout from "../layouts/AuthLayout";
import CustomInput from "../components/forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../components/forms/CustomButton";
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
import type { LocationErrorCode } from "@/lib/types";
import { LocationPermissionCard } from "@/components/cards/LocationPermissionCard";
import { Calendar } from "lucide-react";

type LocStatus = "idle" | "requesting" | "granted" | "denied" | "error";

const VerifyEmail = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
};

const VerifyEmailForm = () => {
  const [searchParams] = useSearchParams();
  const [, setNotVerifiedError] = useState(false);

  const [ip, setIp] = useState("");
  const [location, setLocation] = useState("");
  const [locStatus, setLocStatus] = useState<LocStatus>("idle");
  const [locError, setLocError] = useState<string | null>(null);
  const [locCode, setLocCode] = useState<LocationErrorCode | undefined>(
    undefined,
  );

  const browser = getBrowserInfo();
  const platform = getPlatformFromUAParser();

  useEffect(() => {
    const fetchIP = async () => {
      const deviceIP = await fetchDeviceIP();
      setIp(deviceIP);
    };
    fetchIP();
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

  const requestLocation = async () => {
    setLocError(null);
    setLocCode(undefined);
    setLocStatus("requesting");

    const res = await getReadableLocation();

    if (res.success && res.location) {
      setLocation(res.location);
      setLocStatus("granted");
      return true;
    }

    setLocStatus(res.code === "PERMISSION_DENIED" ? "denied" : "error");
    setLocError(res.error || "Location is required to verify your email.");
    setLocCode(res.code);
    return false;
  };

  const submitForm = async () => {
    // Location is OPTIONAL now.
    // If we don't have it yet, we try to request it once.
    // If user denies or it fails, we proceed anyway.
    
    if (locStatus === "idle") {
        await requestLocation();
    }

    const finalLocation = location || "Unknown";
    
    // Proceed regardless of location status
    const formData = {
      deviceOS: getDeviceOS(),
      deviceIP: ip,
      location: finalLocation,
      platform,
      browser,
      firebaseClientToken: await getFCMToken(),
    };

    verifyUserMutation.mutate(formData);
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(submitForm)} className="mt-5">
        <Typography variant="h5" className="pb-2">
          Verify Email
        </Typography>

        <LocationPermissionCard
          status={locStatus}
          location={location}
          error={locError}
          code={locCode}
          onRetry={requestLocation}
        />

        <CustomInput name="email" control={control} readOnly />
               <CustomInput
                  label="Date Of Birth"
                  name="dateOfBirth"
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
                    }
                  }}
                  rightIcon={<Calendar className="w-5 h-5 pointer-events-none" />}
                />

        <CustomButton
          type="submit"
          loading={verifyUserMutation.isPending || locStatus === "requesting"}
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
