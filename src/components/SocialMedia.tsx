import gmail from "../assets/gmail.svg";
import facebook from "../assets/facebook.svg";

const SocialMedia = () => {
  return (
    <div className="flex items-center justify-center mb-10">
      <img src={facebook} alt="gmail logo" className="w-[72px] h-[72px] mr-8" />
      <img src={gmail} alt="facebook logo" className="w-[72px] h-[72px]" />
    </div>
  );
};

export default SocialMedia;
