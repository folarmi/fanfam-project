/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import Typography from "../forms/Typography";
import block from "../../assets/icons/block.svg";

import blueAdd from "../../assets/blueAdd.svg";
import CustomSelect from "../forms/CustomSelect";
import CustomButton from "../forms/CustomButton";
import AnsweredPoll from "./AnsweredPoll";

type pollProps = {
  pollOptions: { id: string; name: string }[];
  setPollOptions: any;
  activePoll: string;
  setActivePoll: any;
};

const Poll = ({
  pollOptions,
  setPollOptions,
  activePoll,
  setActivePoll,
}: pollProps) => {
  const [isPollAnswered, setIsPollAnswered] = useState(false);

  const handleDragEnd = (result: {
    destination: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) return;
    console.log("zxcvbn");
    const items = Array.from(pollOptions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setPollOptions(items);
  };
  const changeIfPollIsAnswered = () => {
    setIsPollAnswered(true);
  };

  return (
    <>
      {!isPollAnswered && (
        <div
          className="w-full bg-grey_20 justify-between rounded-sm
     border-grey_20 drop-shadow-3xl shadow-header-md mb-2 px-[14px] pt-4 pb-[22px]"
        >
          <Typography variant="p2" className="text-grey_200 pb-[18px]">
            Ask a question
          </Typography>

          {/* <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="pollOptions">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3"
            >
              {pollOptions.map(({ id, name }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center justify-between px-[14px] bg-white mb-3 rounded-[4px] cursor-pointer ${
                        activePoll === name
                          ? "border border-blue_500"
                          : "border border_grey_100"
                      }`}
                    >
                      <section>
                        <Typography variant="p3" className="text-blue_500 py-1">
                          Choice {index + 1}
                        </Typography>
                        <Typography variant="p2" className="text-grey_800 pb-1">
                          {name}
                        </Typography>
                      </section>

                      <div {...provided.dragHandleProps}>
                        <img src={block} alt="block" />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext> */}

          {pollOptions.map(({ id, name }) => {
            return (
              <div
                key={id}
                className={`flex items-center justify-between px-[14px] bg-white mb-3 rounded-[4px] cursor-pointer ${
                  activePoll === name
                    ? "border border-blue_500"
                    : "border border_grey_100"
                }`}
              >
                <section>
                  <Typography variant="p3" className="text-blue_500 py-1">
                    Choice 1
                  </Typography>
                  <Typography variant="p2" className="text-grey_800 pb-1">
                    {name}
                  </Typography>
                </section>

                <img src={block} alt="block" />
              </div>
            );
          })}

          <div
            className="flex items-center border border-blue_500 drop-shadow-7xl 
          py-2 px-3 bg-secondary-btn w-1/2 md:w-1/4 mt-2
           rounded-3xl cursor-pointer"
          >
            <Typography variant="subtitle3" className="text-blue_500">
              Add another option
            </Typography>
            <img src={blueAdd} alt="blueAdd" />
          </div>

          <div className="border border-grey_100 px-[14px] rounded-[4px] mt-2 pb-3">
            <Typography variant="p3" className="text-grey_200 py-2">
              Poll length
            </Typography>

            <div className="flex items-center gap-x-6">
              <CustomSelect placeholder="Days" />
              <CustomSelect placeholder="Hours" />
              <CustomSelect placeholder="Minutes" />
            </div>
          </div>

          <div className="flex items-center justify-end mt-6">
            <Typography variant="subtitle3" className="text-blue_500 pr-7">
              Cancel poll
            </Typography>
            <div className="w-[62px]">
              <CustomButton
                variant="primary"
                className="w-full"
                onClick={changeIfPollIsAnswered}
              >
                Post
              </CustomButton>
            </div>
          </div>
        </div>
      )}

      {isPollAnswered && <AnsweredPoll isPollAnswered={isPollAnswered} />}
    </>
  );
};

export default Poll;
