/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useSignIn.ts (or hooks/useAuthMutation.ts)
// adjust path

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useCustomMutation } from "./apiCalls";
import { updateUserObject } from "@/lib/features/auth/authSlice";

interface UseSignInProps {
  setNotVerifiedError: (value: boolean) => void;
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
      const userObject = {
        email: data?.data?.email,
        role: data?.data?.role,
        usid: data?.data?.usid,
      };

      localStorage.setItem("token", data?.data?.accessToken);
      localStorage.setItem("refreshToken", data?.data?.refreshToken);
      localStorage.setItem("userObject", JSON.stringify(userObject));
      dispatch(updateUserObject(userObject));

      // Dispatch custom event
      window.dispatchEvent(new Event("auth-complete"));

      navigate("/dashboard");
    },
    onError: (error: any) => {
      //   console.log(error?.response?.data?.data?.message);
      setNotVerifiedError(
        error?.response?.data?.data?.message ===
          "Account has not been verified",
      );
    },
  });

  return signInMutation;
};
