import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebaseConfig.tsx";

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  // Request email scope (email is included by default, but this ensures it)
  provider.addScope("https://www.googleapis.com/auth/userinfo.email");
  provider.addScope("https://www.googleapis.com/auth/userinfo.profile");

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Get the ID token to send to your backend
    const idToken = await user.getIdToken();

    console.log("User:", user);
    console.log("Email:", user.email);
    console.log("ID Token:", idToken);

    // TODO: Send this idToken to your backend
    return { user, idToken };
  } catch (error) {
    console.error("Error code:", error.code);
    console.error("Error message:", error.message);
  }
};

export default signInWithGoogle;
