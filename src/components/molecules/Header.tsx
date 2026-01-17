import { landingPageMenu } from "@/data";
import { ArrowRight } from "lucide-react";
import HeaderButton from "../atoms/HeaderButton";

const Header = () => {
  return (
    <nav className="text-white py-[30px] px-[60px] bg-primaryTwo flex justify-between items-center">
      <p className="font-medium text-base">FANFAM</p>
      <ul className="flex items-center justify-center gap-x-8 text-white_100 font-medium text-base">
        {landingPageMenu?.map(({ id, name }) => {
          return <li key={id}>{name}</li>;
        })}
      </ul>

      <HeaderButton
        label="Join the waitlist"
        icon={<ArrowRight className="w-4 h-4" />}
      />
    </nav>
  );
};

export { Header };
