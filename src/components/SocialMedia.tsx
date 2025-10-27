import gmail from "../assets/gmail.svg";
import facebook from "../assets/facebook.svg";
import signInWithGoogle from "@/oauth/Google";

const SocialMedia = () => {
  return (
    <div className="flex items-center justify-center mb-10">
      <img src={facebook} alt="gmail logo" className="w-[72px] h-[72px] mr-8" />
      <button onClick={signInWithGoogle}>
        <img src={gmail} alt="facebook logo" className="w-[72px] h-[72px]" />
      </button>
    </div>
  );
};

export default SocialMedia;
