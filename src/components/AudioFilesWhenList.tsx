/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import blueVerifiedTick from "../assets/blueVerifiedTick.svg";
import ashMore from "../assets/icons/ashMore.svg";

// import Modal from "../Modal";
import copy from "../assets/copy.svg";

import audioFileSample from "../assets/audioFileSample.svg";
import audioFileNotPlaying from "../assets/audioFileNotPlaying.svg";
import Typography from "./forms/Typography";
import IconAndNumber from "./IconAndNumber";
import Pay from "../assets/icons/pay";
import Like from "../assets/icons/like";

type AudioFilesWhenListProps = {
  avatar: string;
  profileName: string;
  handle: string;
  time: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  showMoreModal?: any;
  setShowMoreModal?: any;
  ifIcon?: boolean;
};

const AudioFilesWhenList = ({
  avatar,
  profileName,
  handle,
  time,
  paragraphOne,
  paragraphTwo,
  showMoreModal,
  ifIcon = true,
}: AudioFilesWhenListProps) => {
  const [isPlaying] = useState(false);
  return (
    <div className="pt-4 mb-2 drop-shadow-4xl bg-grey_20">
      <section className="flex items-start px-4">
        <img src={avatar} alt="default avatar" />

        <div className="flex justify-between w-full items-start">
          <section className="ml-2">
            <section className="flex items-center">
              <Typography variant="titleTwo" className="pr-1">
                {profileName}
              </Typography>
              <img src={blueVerifiedTick} alt="default avatar" />
              <Typography variant="p2" className="px-[6px] text-grey_500">
                {handle}
              </Typography>
              <Typography variant="p2" className="text-grey_500">
                {time}
              </Typography>
            </section>

            <>
              {" "}
              <p className="pt-[2px] font-normal text-sm text-grey_30 leading-5 pb-4">
                {paragraphOne}
              </p>
              <p className="font-normal text-sm text-grey_700 leading-5">
                {paragraphTwo}
              </p>
            </>
          </section>
          <img
            src={ashMore}
            alt="default avatar"
            // onClick={toggleModal}
            className="cursor-pointer"
          />
          {showMoreModal && (
            <div className="flex flex-col absolute left-[62%] bottom-[78%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
              <div className="flex items-center justify-between py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6">
                <Typography variant="p2" className="text-grey_700">
                  Copy link to post
                </Typography>
                <img src={copy} alt="copy" />
              </div>
              <Typography
                variant="p2"
                className="text-grey_700 py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6"
              >
                Add Bookmark
              </Typography>
              <Typography
                variant="p2"
                className="text-grey_700 py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6"
              >
                Repost
              </Typography>
            </div>
          )}
        </div>
      </section>

      <div className="my-4">
        {isPlaying ? (
          <img src={audioFileSample} alt="default avatar" className="w-full" />
        ) : (
          <img
            src={audioFileNotPlaying}
            alt="default avatar"
            className="w-full"
          />
        )}
      </div>

      {ifIcon && (
        <div className="pb-4 pl-4 flex items-center">
          <IconAndNumber Icon={Like} number={52} />
          <IconAndNumber Icon={Comment} number={24} />
          <IconAndNumber Icon={Pay} />
        </div>
      )}
    </div>
  );
};

export default AudioFilesWhenList;
