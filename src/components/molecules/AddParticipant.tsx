/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "../forms/Typography";
import backArrow from "../../assets/icons/backArrow.svg";
import CustomButton from "../forms/CustomButton";
import verfied from "../../assets/icons/verifyBlue.svg";
import close from "../../assets/icons/close.svg";
import CustomCheckBox from "../forms/CustomCheckBox";
import SearchInput from "../SearchInput";
import { notificationSampleData } from "../../data";

const AddParticipant = ({
  setSelectedChatGroup,
  setAreParticipantSelected,
  areParticipantSelected,
}: any) => {
  const [showList, setShowList] = useState(false);
  const [checked, setchecked] = useState(false);

  const toggleShowList = () => {
    setShowList(!showList);
  };
  return (
    <section>
      <div
        className="w-full bg-white border
    border-grey_20 shadow-custom-combined py-3"
      >
        <div className="flex items-center justify-between mx-2">
          <div
            onClick={() => setSelectedChatGroup("")}
            className="flex items-center border border-grey_10 drop-shadow-7xl w-[69px]
          py-2 px-3 bg-secondary-btn
           rounded-3xl cursor-pointer"
          >
            <img src={backArrow} alt="plus" className="w-5 h-4" />
            <Typography variant="subtitle3" className="text-grey_800">
              Back
            </Typography>
          </div>

          <CustomButton
            variant="primary"
            className="shadow-custom px-4"
            primaryButtonSize="xs"
            onClick={() => setAreParticipantSelected(true)}
          >
            Add Participants
          </CustomButton>
        </div>
      </div>

      {showList ? (
        <div className="bg-grey_20">
          <SearchInput ifBlur={false} />

          <div className="flex items-center justify-between mx-4">
            <Typography variant="subtitle2" className="text-grey_500">
              Select Chat Group Participants
            </Typography>
            <div className="bg-grey_10 rounded-2xl px-2 py-1 flex items-center justify-center">
              <Typography variant="subtitle2" className="text-grey_500 pr-2">
                {" "}
                3 Selected
              </Typography>
              <img src={close} alt="close" />
            </div>
          </div>
          {notificationSampleData?.map(({ photo, name, tag }) => {
            return (
              <div
                key={name}
                className="flex items-center mx-4 justify-between border-b border-grey_200 py-4"
              >
                <div className="flex items-center">
                  <img
                    src={photo}
                    alt="sampleImage"
                    className="w-10 h-10 mr-2"
                  />

                  <section>
                    <div className="flex items-center">
                      <Typography variant="titleOne" className="text-grey_900">
                        {name}
                      </Typography>
                      <img src={verfied} className="w-4 h-4" alt="verified" />
                    </div>
                    <Typography variant="p2" className="text-grey_400">
                      {tag}
                    </Typography>
                  </section>
                </div>
                {!areParticipantSelected && (
                  <CustomCheckBox
                    checked={checked}
                    onChange={() => setchecked(!checked)}
                  />
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center h-full"
          onClick={toggleShowList}
        >
          <Typography variant="subtitle3" className="text-grey_400 pt-[317px]">
            You do not have any participants yet
          </Typography>
          <CustomButton primaryButtonSize="xs" className="mt-6 px-3">
            Add participant
          </CustomButton>
        </div>
      )}
    </section>
  );
};

export default AddParticipant;
