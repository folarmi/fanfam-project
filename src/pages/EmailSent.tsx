/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../components/forms/Typography";

import AuthLayout from "../layouts/AuthLayout";
import { useAppSelector } from "../lib/hook";

import { useCustomMutation } from "../hooks/apiCalls";
import { Link } from "react-router-dom";
import type { RootState } from "../lib/store";

const EmailSent = () => {
  const { userEmail, emailType } = useAppSelector(
    (state: RootState) => state.auth
  );

  console.log(userEmail);

  const resendVerificationLinkMutation = useCustomMutation({
    endpoint: `auth/resend-verification-link?email=${userEmail}`,
    successMessage: (data: any) => data?.message,
    errorMessage: (error: any) => error,
    onSuccessCallback: () => {},
  });

  return (
    <AuthLayout>
      <form className="">
        <Typography variant="h5" className="pb-4">
          Email sent!
        </Typography>
        <Typography variant="p1" className="pb-8 w-[385px] text-grey_500">
          We have sent an email at {userEmail} Check your inbox and follow the
          instruction to {emailType === "Signup" ? "verify" : "reset"} your{" "}
          {emailType === "Signup" ? "email" : "password"}.
        </Typography>

        <Typography
          onClick={() => resendVerificationLinkMutation.mutate({})}
          variant="p2"
          className="pt-10 pb-4 text-grey_500 cursor-pointer"
        >
          Did not receive an email?
          <span className="text-primary"> Resend email</span>
        </Typography>

        <Link to="/forgot-password">
          <Typography variant="p2" className="text-grey_500 cursor-pointer">
            Wrong email address?
            <span className="text-primary">Change email address</span>
          </Typography>
        </Link>
      </form>
    </AuthLayout>
  );
};

export { EmailSent };
