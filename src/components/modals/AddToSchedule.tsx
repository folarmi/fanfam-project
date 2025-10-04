import React from "react";
import Typography from "../forms/Typography";
import BlueBorderedButton from "../forms/BlueBorderedButton";
import CustomButton from "../forms/CustomButton";
import DayAndTimeInput from "../forms/DayAndTimeInput";

const AddToSchedule = ({
  toggleModal,
  setShowSchedulePost,
  setShowModal,
  setShowMessagePost,
}: {
  toggleModal: () => void;
  setShowSchedulePost: (show: boolean) => void;
  setShowModal: (show: boolean) => void;
  setShowMessagePost: (show: boolean) => void;
}) => {
  return (
    <div className="p-4 bg-white rounded-lg w-[358px] z-50">
      <Typography variant="titleOne">Add to Schedule</Typography>
      <Typography variant="p2" className="text-grey_800 pt-4">
        Choose a date and time for your scheduled post or message.
      </Typography>

      <DayAndTimeInput className="my-8" />

      <BlueBorderedButton
        text="Make a post"
        className="text-center cursor-pointer"
        onClick={() => {
          setShowSchedulePost(true);
          setShowModal(false);
        }}
      />
      <BlueBorderedButton
        text="Send mass message"
        className="text-center mt-4 mb-10 cursor-pointer"
        onClick={() => {
          setShowMessagePost(true);
          setShowModal(false);
        }}
      />

      <div className="flex justify-end ml-auto">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs w-[84px]"
        >
          Cancel
        </CustomButton>
      </div>
    </div>
  );
};

export default AddToSchedule;
