import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useState } from "react";
import { getDeviceOS } from "@/utils/helper";
import { useSignIn } from "@/hooks/useSignIn";
import gmail from "@/assets/googleIcon.svg";

interface GoogleSignInProps {
  ip: string;
  location: string;
  platform: string;
  browser: string;
}

export const GoogleSignIn = ({
  ip,
  location,
  platform,
  browser,
}: GoogleSignInProps) => {
  const [, setNotVerifiedError] = useState(false);
  const signInMutation = useSignIn({
    setNotVerifiedError,
    endpoint: "auth/login/oauth2",
  });

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    provider.addScope("https://www.googleapis.com/auth/userinfo.email");
    provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const idToken = await user.getIdToken();

      // Call the mutation with Google token
      signInMutation.mutate({
        token: idToken,
        // email: user.email,
        deviceMetaDto: {
          deviceOS: getDeviceOS(),
          deviceIP: ip,
          location: location,
          platform: platform,
          browser: browser,
        },
      });
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error message:", error.message);
      } else if (
        typeof error === "object" &&
        error !== null &&
        "code" in error
      ) {
        const err = error as { code?: string; message?: string };
        console.error("Error code:", err.code);
        console.error("Error message:", err.message);
      } else {
        console.error("Unknown error:", error);
      }
    }
  };

  return (
    <button
      className="drop-shadow-custom-combined bg-white py-4 flex items-center justify-center w-full border border-primary rounded-full cursor-pointer"
      onClick={signInWithGoogle}
    >
      <img src={gmail} alt="facebook logo" className="" />
      <p className="font-medium text-base pl-2">Continue with Google</p>
    </button>
  );
};
