/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import settings from "@/assets/icons/setting.svg";
import sampleImageTwo from "@/assets/sampleImageTwo.svg";
import Typography from "../forms/Typography";
import { storyStatSample } from "@/data";
import CheckMarkCircle from "../forms/CheckMarkCircle";

const StoryStatistics = ({ toggleStatModal }: any) => {
  const [tabs] = useState([
    {
      id: 1,
      name: "Details",
    },
    {
      id: 2,
      name: "Viewers",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("Details");

  return (
    <div
      className="z-20 bg-white border border-grey_10 w-[294px] h-[355px] rounded-lg cursor-pointer"
      onClick={toggleStatModal}
    >
      <div className="flex items-center justify-between px-[13px] pt-[13px]">
        <Typography variant="labelOne" className="text-grey_900 uppercase">
          Story Statistics
        </Typography>

        <img src={settings} className="w-4 h-4" alt="settings" />
      </div>

      <div className="flex justify-center items-center mt-4 pb-4 border-b border-grey_10">
        <img src={sampleImageTwo} alt="sampleImageTwo" className="w-24 h-24" />
      </div>

      <div
        className={`
        flex items-center py-3 `}
      >
        {tabs?.map(({ id, name }) => {
          return (
            <div
              className={`pb-2 w-1/2 cursor-pointer flex items-center justify-center ${
                isActiveTab === name
                  ? "border-b border-blue_500 text-blue_500"
                  : "border-b  border-grey_10 text-grey_500"
              }`}
              key={id}
              onClick={() => setIsActiveTab(name)}
            >
              <Typography className="uppercase" variant="labelOne">
                {name}
              </Typography>
            </div>
          );
        })}
      </div>

      {isActiveTab === "Details" && (
        <div className="mt-2 mx-4">
          {storyStatSample.map(({ id, name, num, bgColor }) => {
            return (
              <div key={id} className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <CheckMarkCircle bgColor={bgColor} />
                  <Typography variant="p2" className="text-grey_400 pl-2">
                    {name}
                  </Typography>
                </div>

                <Typography variant="p2" className="text-grey_400">
                  {num}
                </Typography>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default StoryStatistics;
