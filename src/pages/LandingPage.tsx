import { Header } from "@/components/molecules/Header";
import { HeaderFooter } from "@/components/molecules/HeaderFooter";
import { Hero } from "@/components/molecules/Hero";
import { MeetFanFam } from "@/components/molecules/MeetFanFam";
import { OwnYourAudience } from "@/components/molecules/OwnYourAudience";

const LandingPage = () => {
  return (
    <div>
      <Header />

      <section id="home">
        <Hero />
      </section>

      <section id="audience">
        <OwnYourAudience />
      </section>

      <section id="meet-fanfam">
        <MeetFanFam />
      </section>

      <section id="footer">
        <HeaderFooter />
      </section>
    </div>
  );
};

export { LandingPage };
