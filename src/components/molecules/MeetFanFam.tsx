import { builtForCreators, meetFanFamData } from "@/data";
import HeaderText from "../atoms/HeaderText";
import meetFanFam from "@/assets/meetFanFam.png";
import markSign from "@/assets/icons/markSign.svg";

const MeetFanFam = () => {
  return (
    <div className="pt-[70px] pb-[115px] flex flex-col justify-center items-center">
      <HeaderText text="Meet FanFam" color="muted" />
      <p className="text-base max-w-[683px] py-4 text-center">
        FanFam is the all-in-one platform where creators truly own their
        audience. Build deeper fan relationships, create engaged communities,
        and grow sustainably — all without depending on algorithms or
        third-party platforms.
      </p>

      <div className="flex flex-wrap justify-center gap-x-4 mb-[75px]">
        {meetFanFamData?.map(({ id, name }) => {
          return (
            <div
              className="border border-white_500 py-2 px-[10px] rounded-md"
              key={id}
            >
              <p className="text-white_400 font-medium text-sm">{name}</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-x-10">
        <div className="max-w-[540px]">
          <img
            src={meetFanFam}
            alt="Meet FanFam"
            // className="w-[600px] h-auto"
          />
        </div>

        <section>
          <p className="font-bold text-[32px] font-clash">
            Built For{" "}
            <span className="underline text-primaryTwo">Creators</span>{" "}
          </p>
          <p className="font-bold text-[32px] font-clash">
            Who Think Long-Term
          </p>
          <p className="text-base font-normal">
            Everything you need to build a sustainable creator business,
          </p>

          <div className="mt-8">
            {builtForCreators?.map(({ body, id, title }) => {
              return (
                <div className="mb-5" key={id}>
                  <div className="flex">
                    <img src={markSign} className="w-6 h-6" />

                    <section className="ml-3">
                      <p className="font-clash font-semibold">{title}</p>
                      <p className="text-base font-normal pt-1 max-w-[413px]">
                        {body}
                      </p>
                    </section>
                  </div>
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
