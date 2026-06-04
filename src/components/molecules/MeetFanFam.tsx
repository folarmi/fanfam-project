import { builtForCreators, meetFanFamData } from "@/data";
import HeaderText from "../atoms/HeaderText";
import meetFanFam from "@/assets/meetFanFam.png";
import markSign from "@/assets/icons/markSign.svg";

const MeetFanFam = () => {
  return (
    <div className="pt-16 pb-28 px-6 flex flex-col justify-center items-center sm:px-8 md:px-10 lg:px-16">
      <HeaderText text="Meet Fan Nation" color="muted" />
      <p className="text-base max-w-[683px] py-4 text-center">
        Fan Nation is the all-in-one platform where creators truly own their
        audience. Build deeper fan relationships, create engaged communities,
        and grow sustainably — all without depending on algorithms or
        third-party platforms.
      </p>

      <div className="flex flex-wrap justify-center gap-4 mb-20">
        {meetFanFamData?.map(({ id, name }) => {
          return (
            <div
              className="border border-white_500 py-2 px-3 rounded-md"
              key={id}
            >
              <p className="text-white_400 font-medium text-sm">{name}</p>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between w-full">
        <div className="w-full lg:w-[48%]">
          <img
            src={meetFanFam}
            alt="Meet FanFam"
            className="w-full h-auto object-cover"
          />
        </div>

        <section className="w-full lg:w-[48%]">
          <p className="font-bold text-3xl font-clash sm:text-[32px]">
            Built For{" "}
            <span className="underline text-primaryTwo">Creators</span>
          </p>
          <p className="font-bold text-3xl font-clash sm:text-[32px]">
            Who Think Long-Term
          </p>
          <p className="text-base font-normal mt-4">
            Everything you need to build a sustainable creator business,
          </p>

          <div className="mt-8 space-y-5">
            {builtForCreators?.map(({ body, id, title }) => {
              return (
                <div className="flex gap-3" key={id}>
                  <img src={markSign} className="w-6 h-6 flex-shrink-0" />

                  <section>
                    <p className="font-clash font-semibold">{title}</p>
                    <p className="text-base font-normal pt-1 max-w-full">
                      {body}
                    </p>
                  </section>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};

export { MeetFanFam };
