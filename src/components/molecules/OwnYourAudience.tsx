import { ownYourAudience } from "@/data";
import HeaderText from "../atoms/HeaderText";
import { LandingPageCard } from "../cards/LandingPageCard";
import landingIconOne from "@/assets/icons/landingIconOne.svg";

const OwnYourAudience = () => {
  return (
    <div className="py-[98px] flex flex-col items-center">
      <HeaderText color="muted" text="Own Your Audience." />
      <HeaderText color="muted" text="Build Your Community." />

      <div className="bg-black py-3 mt-4 px-20">
        <p className="text-white_300 text-base font-normal">
          You create the content. You build the community. But someone else
          holds all the cards.
        </p>
      </div>

      <div className="mt-[75px] flex items-center gap-x-6 mx-[72px]">
        {ownYourAudience?.map(({ bgColor, body, icon, id, title, color }) => {
          return (
            <div className="" key={id}>
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

      <div className="mt-6">
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
