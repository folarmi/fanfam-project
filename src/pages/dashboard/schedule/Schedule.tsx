import { useState } from "react";
import calendar from "../../../assets/icons/calendar.svg";
import backArrow from "../../../assets/icons/backArrow.svg";
import plus from "../../../assets/icons/plus.svg";
// import { useAppSelector } from "../../../lib/hook";
// import type { RootState } from "../../../lib/store";
import Typography from "../../../components/forms/Typography";
import AddToScheduleButton from "../../../components/forms/AddToScheduleButtton";
import Tabs from "../../../components/forms/Tabs";
import {
  scheduledPostsAndMessages,
  scheduleMessages,
  schedulePosts,
} from "../../../data";
import More from "../../../components/svgs/More";
import ModalContent from "../../../components/modals/ModalContent";
import { SubscriptionHeader } from "../my-account/settings/SubscriptionHeader";
import CustomButton from "../../../components/forms/CustomButton";
import { SchedulePost } from "./SchedulePost";
import { ScheduleMessage } from "./ScheduleMessage";
import { testEvents } from "../../../data/events";
import MyCalendar from "../../../components/molecules/Calendar";
import AddToSchedule from "../../../components/modals/AddToSchedule";

const Schedule = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Messages",
    },
    {
      id: 2,
      name: "Post",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [isEmpty] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showMessagePost, setShowMessagePost] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showSchedulePost, setShowSchedulePost] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);
  // const { showScheduleOnMobile } = useAppSelector(
  //   (state: RootState) => state.settingMobile
  // );

  const toggleModal = () => {
    setShowModal(!showModal);
    setShowMessageModal(false);
    setShowPostModal(false);
  };

  const getModalValue = (value: string, id: number) => {
    if (value === "Message") {
      setCurrentModal(id);
      toggleMessageModal();
    } else if (value === "Post") {
      setCurrentModal(id);
      togglePostModal();
    }
  };

  const toggleMessageModal = () => {
    setShowMessageModal(!showMessageModal);
  };

  const togglePostModal = () => {
    setShowPostModal(!showPostModal);
  };

  return (
    <div className="flex justify-center">
      <div className="hidden md:block md:w-[40%]">
        <div
          className="w-full bg-grey_20 h-14 px-4 border
     border-grey_20 shadow-custom-combined mb-2 "
        ></div>

        {isEmpty && (
          <div className="flex justify-center items-center mt-28">
            <div className="flex flex-col items-center">
              <img src={calendar} alt="calendar" />
              <Typography
                variant="subtitle2"
                className="text-grey_800 pt-6 pb-2"
              >
                You have no scheduled events
              </Typography>
              <Typography
                variant="p3"
                className="text-grey_500 w-48 text-center"
              >
                Click the Add button at the top to create an event
              </Typography>
            </div>
          </div>
        )}

        <AddToScheduleButton onClick={toggleModal} />

        {!isEmpty && (
          <div className="block m-4">
            <Tabs
              tabsArray={tabs}
              isActiveTab={isActiveTab}
              setIsActiveTab={setIsActiveTab}
            />

            {isActiveTab === "All" && (
              <div className="flex flex-col">
                {scheduledPostsAndMessages.map(({ date, id, text, type }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between border-b border-grey_10 py-[14px]"
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <Typography
                          variant="p2"
                          className={`${
                            type === "Post"
                              ? "text-blue_500"
                              : "text-orange_100"
                          }`}
                        >
                          {type}
                        </Typography>

                        <div className="w-1 h-1 rounded-full bg-grey_100 mx-2"></div>
                        <Typography variant="p2" className="">
                          {date}
                        </Typography>
                      </div>
                      <Typography variant="p2" className="text-grey_500 pt-1">
                        {text}
                      </Typography>
                    </div>

                    <div
                      className="cursor-pointer relative"
                      onClick={() => getModalValue(type, id)}
                    >
                      <More />

                      {showMessageModal &&
                        currentModal === id &&
                        type === "Message" && (
                          <div className="flex flex-col absolute bg-modal-gradient shadow-triple w-max right-5 rounded-2xl border-2 border-white z-50">
                            <ModalContent content={scheduleMessages} />
                          </div>
                        )}

                      {showPostModal &&
                        currentModal === id &&
                        type === "Post" && (
                          <div className="flex flex-col absolute bg-modal-gradient shadow-triple w-[264px] right-5  rounded-2xl border-2 border-white z-50">
                            <ModalContent content={schedulePosts} />
                          </div>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className={`w-full md:w-[60%]`}>
        <SubscriptionHeader
          text={
            showModal
              ? ""
              : (showSchedulePost || showMessagePost) && (
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <img
                        src={backArrow}
                        alt="back"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => {
                          setShowSchedulePost(false);
                          setShowMessagePost(false);
                        }}
                      />
                    </div>

                    <Typography variant="subtitle1" className="pl-1 md:pl-4">
                      {showSchedulePost
                        ? "Schedule Post"
                        : showMessagePost
                        ? "Schedule Mass Message"
                        : ""}
                    </Typography>

                    <div className="md:hidden">
                      {" "}
                      <CustomButton
                        primaryButtonSize="xs"
                        className="rounded-3xl px-3"
                        // onClick={(e) => handlePostOrMessageClickOnMobile(e)}
                        onClick={() => {
                          setShowSchedulePost(false);
                          setShowMessagePost(false);
                        }}
                      >
                        {showSchedulePost
                          ? "Schedule Post"
                          : "Schedule Message"}{" "}
                      </CustomButton>
                    </div>
                  </div>
                )
          }
          mobileText={
            <>
              {!(showSchedulePost || showMessagePost) && (
                <div className="flex items-center justify-between w-full">
                  <Typography variant="subtitle1">Schedule</Typography>
                  <img
                    src={plus}
                    className="mr-4 w-6 h-6 cursor-pointer"
                    alt="plus"
                    onClick={toggleModal}
                  />
                </div>
              )}
            </>
          }
        />
        {showSchedulePost ? (
          <SchedulePost setShowSchedulePost={setShowSchedulePost} />
        ) : showMessagePost ? (
          <ScheduleMessage setShowMessagePost={setShowMessagePost} />
        ) : (
          <div className="m-4">
            <Tabs
              tabsArray={tabs}
              isActiveTab={isActiveTab}
              setIsActiveTab={setIsActiveTab}
            />
            <MyCalendar myEventsList={testEvents} />
          </div>
        )}
      </div>

      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={toggleModal}
        >
          <div className="" onClick={(e) => e.stopPropagation()}>
            <AddToSchedule
              toggleModal={toggleModal}
              setShowSchedulePost={setShowSchedulePost}
              setShowModal={setShowModal}
              setShowMessagePost={setShowMessagePost}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { Schedule };
