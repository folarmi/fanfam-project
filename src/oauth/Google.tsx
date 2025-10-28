import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useState } from "react";
import { getDeviceOS } from "@/utils/helper";
import { useSignIn } from "@/hooks/useSignIn";
import gmail from "@/assets/gmail.svg";

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
    <button onClick={signInWithGoogle}>
      <img src={gmail} alt="facebook logo" className="w-[72px] h-[72px]" />
    </button>
  );
};

// const signInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();

//   // Request email scope (email is included by default, but this ensures it)
//   provider.addScope("https://www.googleapis.com/auth/userinfo.email");
//   provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

//   try {
//     // const result = await signInWithPopup(auth, provider);
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;

//     // Get the ID token to send to your backend
//     const idToken = await user.getIdToken();

//     console.log("User:", user);
//     console.log("Email:", user.email);
//     console.log("ID Token:", idToken);

//     // TODO: Send this idToken to your backend
//     return { user, idToken };
//   } catch (error) {
//     // Narrow the unknown error before accessing properties
//     if (error instanceof Error) {
//       // Standard Error has a message property
//       console.error("Error message:", error.message);
//     } else if (
//       typeof error === "object" &&
//       error !== null &&
//       "code" in error
//     ) {
//       // Some libraries (e.g. Firebase) attach a 'code' property to errors
//       const err = error as { code?: string; message?: string };
//       console.error("Error code:", err.code);
//       console.error("Error message:", err.message);
//     } else {
//       // Fallback for any other unexpected error shape
//       console.error("Unknown error:", error);
//     }
//   }
// };

// Second
// export const signInWithGoogle = async () => {
//   const provider = new GoogleAuthProvider();

//   try {
//     const result = await signInWithPopup(auth, provider);
//     const user = result.user;
//     const idToken = await user.getIdToken();

//     console.log("✅ User:", user.displayName);
//     console.log("📧 Email:", user.email);
//     console.log("🪪 ID Token:", idToken);

//     return { user, idToken };
//   } catch (error: any) {
//     console.error("❌ Google sign-in failed:", error.code, error.message);
//   }
// };

// Third
// import {
//   // getAuth,
//   signInWithPopup,
//   GoogleAuthProvider,
//   // UserCredential,
//   signOut,
// } from "firebase/auth";
// import { auth } from "./firebaseConfig";

// /**
//  * Signs in a user with Google and returns the Firebase ID token.
//  * Returns `null` if the user cancels or if an error occurs.
//  */
// export async function signInWithGoogle(): Promise<string | null> {
//   // const auth = getAuth();
//   const provider = new GoogleAuthProvider();

//   try {
//     // 1️⃣ Ensure user is signed out before a new login
//     await signOut(auth);

//     // 2️⃣ Open Google sign-in popup
//     const result = await signInWithPopup(auth, provider);
//     console.log("Google Sign-In result:", result);

//     const user = result.user;
//     if (!user) {
//       console.warn("Google Sign-In cancelled or failed");
//       return null;
//     }

//     // 3️⃣ Retrieve Firebase ID token
//     const token = await user.getIdToken();
//     console.log("✅ Firebase Auth Token:", token);

//     return token;
//   } catch (error: any) {
//     // Handle Firebase Auth errors
//     if (error.code === "auth/account-exists-with-different-credential") {
//       console.error(
//         "❌ The account already exists with a different credential."
//       );
//       alert("The account already exists with a different credential.");
//     } else if (error.code === "auth/invalid-credential") {
//       console.error("❌ Invalid credentials:", error.message);
//       alert("Error occurred while accessing credentials. Try again.");
//     } else if (error.code === "auth/popup-closed-by-user") {
//       console.warn("Popup closed by user.");
//     } else {
//       console.error("Google Sign-In failed:", error);
//       alert(`Google Sign-In failed: ${error.message}`);
//     }

//     return null;
//   }
// }
