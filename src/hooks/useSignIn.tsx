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
      setNotVerifiedError(false);
      
      // Robust extraction: Handle if data is nested in data.data (common in axios+backend wrappings) or flat
      const responseData = data?.data;
    
      const accessToken = responseData?.accessToken;
      const refreshToken = responseData?.refreshToken ;

      const userObject = {
        email: responseData?.email,
        role: responseData?.role,
        usid: responseData?.usid || responseData?.userId || responseData?.fanfam,
      };
console.log('useSignIn hook',responseData)
      if (accessToken) {
        console.log("✅ [useSignIn] Storing accessToken:", accessToken.substring(0, 20) + "...");
        
        try {
            const parts = accessToken.split('.');
            if (parts.length === 3) {
                const payload = JSON.parse(atob(parts[1]));
                console.log("📜 [useSignIn] Decoded Token Payload:", payload);
            }
        } catch (e) {
            console.error("❌ [useSignIn] Failed to decode token:", e);
        }

        localStorage.setItem("token", accessToken);
      } else {
        console.error("❌ [useSignIn] No access token found in response", data);
      }
      
      if (refreshToken) {
        console.log("✅ [useSignIn] Storing refreshToken:", refreshToken.substring(0, 20) + "...");
        localStorage.setItem("refreshToken", refreshToken);
      }
      console.log('useSignIn hook',userObject)
      if (userObject?.usid) {
        localStorage.setItem("userObject", JSON.stringify(userObject));
        dispatch(updateUserObject(userObject));
      }
      
      // Immediate verification check
      console.log("🔍 [useSignIn] Immediate check - localStorage token:", localStorage.getItem("token")?.substring(0, 20) + "...");

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
