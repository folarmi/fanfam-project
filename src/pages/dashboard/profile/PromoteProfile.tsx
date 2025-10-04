import { useState } from "react";
import backArrow from "../../../assets/icons/backArrow.svg";
import arrowDown from "../../../assets/icons/arrowDown.svg";
import { useForm } from "react-hook-form";
import Typography from "../../../components/forms/Typography";
import CustomInput from "../../../components/forms/CustomInput";
import CustomSelect from "../../../components/forms/CustomSelect";
import CustomCheckBox from "../../../components/forms/CustomCheckBox";
import { continents, countriesSample } from "../../../data";

const PromoteProfile = () => {
  const { control } = useForm();
  const [checked, setChecked] = useState(false);
  return (
    <div>
      <div className="flex items-center py-[18px] bg-white border-b border-grey_20">
        <img src={backArrow} alt="backArrow" className="mx-4 text-" />
        <p>Promote Profile</p>
      </div>

      <main className="mt-6 ml-3 md:ml-14">
        <Typography variant="h5" className="text-grey_900">
          Promote your Profile
        </Typography>
        <Typography variant="p1" className="text-grey_600 w-[404px] pt-1 pb-6">
          Gain more views and profile reach when you promote your creator
          account
        </Typography>

        <section className="border border-grey_20 py-2">
          <div className="">
            <Typography variant="subtitle2" className="text-grey_600 px-4">
              Promotion Type
            </Typography>
            <Typography
              variant="p3"
              className="text-grey_600 py-2 border-b border-grey_20 px-4"
            >
              Ad Goal
            </Typography>
          </div>

          <form className="px-4">
            <CustomInput
              name="adName"
              control={control}
              label="Ad Name"
              value="Get 500 followers"
            />

            <CustomSelect ifLabel label="Ad Type" />

            <div className="flex items-center justify-between mt-5">
              <CustomInput
                name="startDate"
                control={control}
                label="Start Date"
                type="date"
              />
              <CustomInput
                name="endDate"
                control={control}
                label="End Date"
                type="date"
              />
            </div>

            <CustomInput
              name="projectedViewers"
              control={control}
              label="Projected Viewers"
              value="0 Viewers"
            />
          </form>

          <div className="bg-grey_10 mt-2 flex p-4 mx-4">
            <div className="mr-8">
              <Typography variant="subtitle2" className="text-grey_800">
                Amount Billed Daily
              </Typography>
              <Typography variant="h6" className="text-grey_600 pt-4">
                $0.00
              </Typography>
            </div>

            <div className="">
              <Typography variant="subtitle2" className="text-grey_800">
                Total Amount Billed (7 Days)
              </Typography>
              <Typography variant="h6" className="text-grey_600 pt-4">
                $0.00
              </Typography>
            </div>
          </div>

          <section className="px-4 mt-4">
            <CustomCheckBox
              iflabel
              labelText="Promote During Specific Time"
              labelStyles="text-grey_600 font-medium text-sm"
              checked={checked}
              onChange={() => setChecked(!checked)}
            />

            <div className="flex mt-2 items-center">
              <CustomSelect ifLabel label="Time Zone" className="mr-2" />
              <CustomSelect ifLabel label="Start Time" />
            </div>
          </section>
        </section>

        <section className=" border border-grey_20 py-2 mt-5">
          <div className="">
            <Typography variant="subtitle2" className="text-grey_600 px-4">
              Viewer Continents
            </Typography>
            <Typography
              variant="p3"
              className="text-grey_600 py-2 border-b border-grey_20 px-4"
            >
              Do you want to promote your profile to specific Continents
            </Typography>
          </div>

          <div className="flex flex-wrap justify-between mt-4 ">
            {continents.map(({ id, name, image }) => (
              <div
                className="border border-grey_10 rounded-lg p-[10px] m-2"
                key={id}
              >
                <img src={image} alt={name} />
                <Typography
                  variant="p2"
                  className="text-grey_900 w-[43px] text-center"
                >
                  {name}
                </Typography>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-4">
            <Typography variant="subtitle2" className="text-grey_600">
              All
            </Typography>

            <img alt="arrowDown" src={arrowDown} className="w-5 h-5" />
          </div>

          <div className="mt-4">
            {countriesSample.map(({ id, name, image }) => (
              <div
                className="m-2 flex items-center justify-between border-b border-grey_20 pb-2"
                key={id}
              >
                <div className="flex items-center">
                  <img src={image} alt="name" />
                  <Typography variant="p2" className="text-grey_900 pl-2">
                    {name}
                  </Typography>
                </div>

                <CustomCheckBox
                  checked={checked}
                  onChange={() => setChecked(!checked)}
                />
              </div>
            ))}
          </div>

          <Typography variant="p3" className="text-grey_600 py-4 text-center">
            Your profile will only be displayed to people from the selected
            region.
          </Typography>
        </section>
      </main>
    </div>
  );
};

export { PromoteProfile };
