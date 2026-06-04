import { landingPageMenu, scrollToSection } from "@/data";
import { ArrowRight } from "lucide-react";
import HeaderButton from "../atoms/HeaderButton";
import logo from "@/assets/fanNationWhite.svg";

const Header = () => {
  return (
    <nav className="text-white bg-primaryTwo flex flex-col gap-y-4 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-[60px] md:py-[30px]">
      <div
        className="cursor-pointer flex items-center"
        onClick={() => scrollToSection("home")}
      >
        <img
          src={logo}
          alt="Fan Nation"
          className="h-10 md:h-12 w-auto object-contain"
        />
      </div>
      <ul className="flex flex-wrap items-center justify-center gap-4 text-white_100 font-medium text-base md:gap-x-8">
        {landingPageMenu?.map(({ id, name, target }) => {
          return (
            <li
              key={id}
              onClick={() => scrollToSection(target)}
              className="cursor-pointer hover:text-white transition-colors"
            >
              {name}
            </li>
          );
        })}
      </ul>

      <HeaderButton
        className="w-full sm:w-auto"
        label="Join the waitlist"
        icon={<ArrowRight className="w-4 h-4" />}
        onClick={() => scrollToSection("footer")}
      />
    </nav>
  );
};

export { Header };
