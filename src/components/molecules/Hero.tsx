import { ArrowDown } from "lucide-react";
import HeaderButton from "../atoms/HeaderButton";
import heroImage from "@/assets/heroImage.svg";
import HeaderText from "../atoms/HeaderText";

const Hero = () => {
  return (
    <>
      <div className="bg-primaryTwo text-white flex flex-col justify-center items-center px-6 py-16 sm:px-8 sm:py-[86px]">
        <HeaderText text="Own Your Audience." />
        <HeaderText text="Build Your Community." />

        <p className="py-6 text-[18px] max-w-[683px] text-center">
          FanFam empowers creators to break free from algorithms and build
          lasting, meaningful connections with their fans — on their own terms.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-x-5">
          <HeaderButton
            className="w-full sm:w-auto"
            label="Join the waitlist"
          />
          <HeaderButton
            className="w-full sm:w-auto"
            label="Learn More"
            icon={<ArrowDown className="w-6 h-6 text-primaryTwo" />}
          />
        </div>
      </div>
      <div className="w-full">
        <img src={heroImage} className="w-full h-auto object-cover" />
      </div>
    </>
  );
};

export { Hero };
