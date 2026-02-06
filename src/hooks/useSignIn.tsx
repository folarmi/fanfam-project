/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCustomMutation } from "./apiCalls";
import { updateUserObject } from "@/lib/features/auth/authSlice";
import { showErrorToast } from "@/utils/toastUtils";

interface UseSignInProps {
  setNotVerifiedError: (value: boolean) => void;
  setErrorMessage?: (value: string | null) => void;
  endpoint: string;
}

export const useSignIn = ({
  setNotVerifiedError,
  endpoint,
}: UseSignInProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInMutation = useCustomMutation({
    endpoint,
    successMessage: (data: any) => data?.message,
    onSuccessCallback: (data) => {
      console.log("✅ SignIn/Verify Success Data:", data);
      setNotVerifiedError(false);
      
      // Robust extraction: Handle if data is nested in data.data (common in axios+backend wrappings) or flat
      const responseData = data?.data || data;
      
      const accessToken = responseData?.accessToken || responseData?.token || data?.accessToken || data?.token;
      const refreshToken = responseData?.refreshToken || data?.refreshToken;

      const userObject = {
        email: responseData?.email,
        role: responseData?.role,
        usid: responseData?.usid || responseData?.userId,
      };

      if (accessToken) {
        localStorage.setItem("token", accessToken);
      } else {
        console.error("❌ No access token found in response", data);
      }
      
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken);
      }
      
      if (userObject.usid) {
        localStorage.setItem("userObject", JSON.stringify(userObject));
        dispatch(updateUserObject(userObject));
      }

      // Dispatch custom event
      window.dispatchEvent(new Event("auth-complete"));

      navigate("/dashboard");
    },
    // onError: (error: any) => {
    //   console.log(error?.response?.data?.data?.message);
    //   //   console.log(error?.response?.data?.data?.message);
    //   setNotVerifiedError(
    //     error?.response?.data?.data?.message ===
    //       "Account has not been verified",
    //   );
    // },
    onError: (error: any) => {
      const msg =
        error?.response?.data?.data?.message ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong. Please try again.";

      if (msg === "Account has not been verified") {
        setNotVerifiedError(true);
        return;
      }

      setNotVerifiedError(false);
      showErrorToast(msg);
    },
  });

  return signInMutation;
};
