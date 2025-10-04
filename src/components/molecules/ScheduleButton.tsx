import React from "react";
import DayAndTimeInput from "../forms/DayAndTimeInput";
import CustomButton from "../forms/CustomButton";
import calendar from "../../assets/icons/blueCalendar.svg";
import Typography from "../forms/Typography";

type ScheduleButtonProps = {
  setShowSchedulePost?: (value: boolean) => void;
  setShowMessagePost?: (value: boolean) => void;
  isPost: boolean;
};

const ScheduleButton: React.FC<ScheduleButtonProps> = ({
  setShowSchedulePost,
  setShowMessagePost,
  isPost,
}) => {
  // Dynamic onClick handler
  const handleClick = () => {
    if (isPost) {
      setShowSchedulePost?.(false);
    } else {
      setShowMessagePost?.(false);
    }
  };

  return (
    <>
      <div className="flex justify-between items-center md:border md:border-grey-50 rounded-lg md:p-4 my-3 mx-4">
        <div className="flex items-center md:hidden">
          <img src={calendar} alt="calendar" />
          <Typography variant="p2" className="whitespace-nowrap pl-2">
            Scheduled for
          </Typography>
        </div>
        <DayAndTimeInput />

        <div className="hidden md:block">
          {" "}
          <CustomButton
            primaryButtonSize="xs"
            className="rounded-lg px-3"
            onClick={handleClick}
          >
            {isPost ? "Schedule Post" : "Schedule Message"}{" "}
          </CustomButton>
        </div>
      </div>
    </>
  );
};

export default ScheduleButton;
