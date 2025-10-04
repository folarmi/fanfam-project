/* eslint-disable @typescript-eslint/no-explicit-any */

import blueVerifiedTick from "../../assets/blueVerifiedTick.svg";
import ashMore from "../../assets/icons/ashMore.svg";

import Typography from "../forms/Typography";
import IconAndNumber from "../IconAndNumber";
// import Modal from "../Modal";
import Like from "../../assets/icons/like";
import Comment from "../../assets/icons/comment";
import Pay from "../../assets/icons/pay";

type TimelineProps = {
  avatar: string;
  profileName: string;
  handle: string;
  time: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  timeLineImage: string;
  ifParagraph?: boolean;
  showModal?: any;
  setShowModal?: any;
  ifIcon?: boolean;
  bgColor?: string;
  TimeLineModal?: any;
};

const Timeline = ({
  avatar,
  profileName,
  handle,
  time,
  paragraphOne,
  paragraphTwo,
  timeLineImage,
  ifParagraph,
  setShowModal,
  showModal,
  ifIcon = true,
  bgColor = "#FAFAFA",
  TimeLineModal,
}: TimelineProps) => {
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className="pt-4 mb-2 drop-shadow-4xl"
    >
      <section className="flex items-start px-4">
        <img src={avatar} alt="default avatar" />

        <div className="flex justify-between w-full items-start">
          <section className="ml-2">
            <section className="flex items-center">
              <Typography variant="titleTwo" className="pr-1">
                {profileName}
              </Typography>
              <img src={blueVerifiedTick} alt="default avatar" />
              <Typography
                variant="p2"
                className="hidden md:block px-[6px] text-grey_500"
              >
                {handle}
              </Typography>
              <Typography
                variant="p2"
                className="ml-auto md:ml-0 pr-6 md:pr-0 text-grey_500"
              >
                {time}
              </Typography>
            </section>

            <Typography variant="p2" className="md:hidden text-grey_500">
              {handle}
            </Typography>

            {ifParagraph && (
              <>
                {" "}
                <p className="pt-[2px] font-normal text-sm text-grey_30 leading-5 pb-4">
                  {paragraphOne}
                </p>
                <p className="font-normal text-sm text-grey_700 leading-5">
                  {paragraphTwo}
                </p>
              </>
            )}
          </section>
          <img
            src={ashMore}
            alt="default avatar"
            onClick={toggleModal}
            className="cursor-pointer"
          />
          {showModal && (
            <div className="flex flex-col absolute left-[20%] md:left-[62%] bottom-[65%] md:bottom-[73%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
              {TimeLineModal}
            </div>
          )}
        </div>
      </section>

      <div className="w-full my-4">
        <img
          src={timeLineImage}
          alt="timelineImage"
          className="w-full h-full"
        />
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

export default Timeline;
