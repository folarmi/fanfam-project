import { landingPageMenu } from "@/data";
import { ArrowRight } from "lucide-react";
import HeaderButton from "../atoms/HeaderButton";

const Header = () => {
  return (
    <nav className="text-white bg-primaryTwo flex flex-col gap-y-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-[60px] md:py-[30px]">
      <p className="font-medium text-base">FANFAM</p>
      <ul className="flex flex-wrap items-center justify-center gap-4 text-white_100 font-medium text-base md:gap-x-8">
        {landingPageMenu?.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>

      <HeaderButton
        className="w-full sm:w-auto"
        label="Join the waitlist"
        icon={<ArrowRight className="w-4 h-4" />}
      />
    </nav>
  );
};

export { Header };
