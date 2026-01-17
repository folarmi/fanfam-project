import { ArrowDown } from "lucide-react";
import HeaderButton from "../atoms/HeaderButton";
import heroImage from "@/assets/heroImage.svg";
import HeaderText from "../atoms/HeaderText";

const Hero = () => {
  return (
    <>
      <div className="bg-primaryTwo text-white flex flex-col justify-center items-center pt-[85px] pb-[38px]">
        <HeaderText text="Own Your Audience." />
        <HeaderText text="Build Your Community." />

        <p className="py-6 text-[18px] max-w-[683px] text-center">
          FanFam empowers creators to break free from algorithms and build
          lasting, meaningful connections with their fans — on their own terms.
        </p>

        <div className="flex items-center gap-x-5">
          <HeaderButton label="Join the waitlist" />
          <HeaderButton
            label="Learn More"
            icon={<ArrowDown className="w-6 h-6 text-primaryTwo" />}
          />
        </div>
      </div>
      <div className="w-full bg-red-900">
        <img src={heroImage} className="w-full" />
      </div>
    </>
  );
};

export { Hero };
