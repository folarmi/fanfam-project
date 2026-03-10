/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "../forms/Typography";
import graphIcon from "../../assets/icons/graphIcon.svg";
import listIcon from "../../assets/icons/listIcon.svg";
import sampleGraph from "../../assets/sampleGraph.svg";

const AnsweredPoll = ({ pollChoices }: { pollChoices?: any[] }) => {
  const [isGraph, setIsGraph] = useState(false);

  if (!pollChoices || pollChoices.length === 0) return null;

  return (
    <section className="ml-[68px] mr-4 mb-4">
      <div className="flex items-center justify-end mb-4">
        <div className="flex items-center">
          <img
            src={listIcon}
            alt="listIcon"
            className="mr-2 cursor-pointer"
            onClick={() => setIsGraph(false)}
          />
          <img
            src={graphIcon}
            alt="graphIcon"
            className="cursor-pointer"
            onClick={() => setIsGraph(true)}
          />
        </div>
      </div>

      {!isGraph && (
        <>
          {pollChoices.map((choice: any, index: number) => {
            return (
              <div
                key={index}
                className="flex items-center justify-between mb-[12px]"
              >
                <section className="flex items-center ">
                  <div className="h-2 w-2 bg-blue_500 rounded-full"></div>
                  <Typography variant="p2" className="text-grey_800 pl-2">
                    {choice?.option || choice?.name || "Option " + (index + 1)}
                  </Typography>
                </section>

                <Typography variant="p2" className="text-grey_800">
                  {choice?.percent || "0%"}
                </Typography>
              </div>
            );
          })}

          <div className="flex items-center mt-4">
            <Typography variant="p2" className="text-grey_500">
              10 votes
            </Typography>
            <div className="w-1 h-1 bg-grey_200 mx-1 rounded-full"></div>
            <Typography variant="p2" className="text-grey_500">
              4h 26minutes left
            </Typography>
          </div>
        </>
      )}

      {isGraph && (
        <img
          src={sampleGraph}
          alt="sampleGraph"
          className="my-4 w-full object-cover rounded-xl"
        />
      )}
    </section>
  );
};

export default AnsweredPoll;
