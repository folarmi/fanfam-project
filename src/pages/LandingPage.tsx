import { Header } from "@/components/molecules/Header";
import { HeaderFooter } from "@/components/molecules/HeaderFooter";
import { Hero } from "@/components/molecules/Hero";
import { MeetFanFam } from "@/components/molecules/MeetFanFam";
import { OwnYourAudience } from "@/components/molecules/OwnYourAudience";

const LandingPage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <OwnYourAudience />
      <MeetFanFam />
      <HeaderFooter />
    </div>
  );
};

export { LandingPage };
