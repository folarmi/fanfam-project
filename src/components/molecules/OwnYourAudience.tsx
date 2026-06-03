import { ownYourAudience } from "@/data";
import HeaderText from "../atoms/HeaderText";
import { LandingPageCard } from "../cards/LandingPageCard";
import landingIconOne from "@/assets/icons/landingIconOne.svg";

const OwnYourAudience = () => {
  return (
    <div className="py-24 px-6 flex flex-col items-center sm:px-8 md:px-10 lg:px-16">
      <HeaderText color="muted" text="Own Your Audience." />
      <HeaderText color="muted" text="Build Your Community." />

      <div className="bg-black py-3 mt-4 px-6 text-center sm:px-10 md:px-20">
        <p className="text-white_300 text-base font-normal">
          You create the content. You build the community. But someone else
          holds all the cards.
        </p>
      </div>

      <div className="mt-14 w-full grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {ownYourAudience?.map(({ bgColor, body, icon, id, title, color }) => {
          return (
            <div className="w-full" key={id}>
              <LandingPageCard
                bgColor={bgColor}
                body={body}
                icon={icon}
                title={title}
                id={id}
                color={color}
              />
            </div>
          );
        })}
      </div>

      <div className="mt-6 w-full px-0 sm:px-4 lg:px-0">
        <LandingPageCard
          bgColor="#0567B5"
          body="Discord, Patreon, newsletters, social media — you're juggling a dozen platforms just to stay connected."
          icon={landingIconOne}
          title="Fragmented Tools"
          id={4}
          color="#FFFFFF"
        />
      </div>
    </div>
  );
};

export { OwnYourAudience };
