import { useState } from "react";
import plus from "../../../assets/icons/plus.svg";
import verifyBlue from "../../../assets/icons/verifyBlue.svg";
import horizontalMore from "../../../assets/icons/ashHorizontalMore.svg";
import searchIcon from "../../../assets/icons/searchIconTwo.svg";
import writeMessage from "../../../assets/icons/writeMessage.svg";
import rightAshArrow from "../../../assets/icons/rightAshArrow.svg";
import Typography from "../../../components/forms/Typography";
import { notificationSampleData, sampleChatGroups } from "../../../data";
import AddParticipant from "../../../components/molecules/AddParticipant";
import Modal from "../../../components/modals/Modal";
import CreateChatGroup from "../../../components/modals/CreateChatGroup";
import { GroupChatInterface } from "./GroupChatInterface";
import { ChatInterface } from "./ChatInterface";

const Messages = () => {
  const [messagesTab] = useState([
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Pinned",
    },
    {
      id: 3,
      name: "Subscription",
    },
    {
      id: 4,
      name: "Unread",
    },
    {
      id: 5,
      name: "Chat groups",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("All");
  const [createNewGroup, setCreateNewGroup] = useState(false);
  const [selectedChatGroup, setSelectedChatGroup] = useState("");
  const [isEmpty, setIsEmpty] = useState(true);
  const [areParticipantSelected, setAreParticipantSelected] = useState(false);
  const [selectedMessageOnMobile, setSelectedMessageOnMobile] = useState(true);

  const toggleCreateNewChatGroup = () => {
    setCreateNewGroup(!createNewGroup);
  };

  const getSelectedGroup = (groupName: string) => {
    setSelectedChatGroup(groupName);
    setIsEmpty(!isEmpty);
  };

  const toggleMessageAndChatInterface = () => {
    if (window.innerWidth <= 425) {
      setSelectedMessageOnMobile(!selectedMessageOnMobile);
    }
  };

  return (
    <section className="flex">
      {selectedChatGroup === "" && (
        <div
          className={`bg-grey_20 drop-shadow-4xl w-full md:w-[42%] mt-4 ${
            selectedMessageOnMobile ? "hidden md:block" : ""
          }`}
        >
          <div
            className="flex items-center justify-between w-full bg-grey_20 py-3 px-4 rounded-sm
      border border-grey_20 drop-shadow-3xl shadow-header-md mb-2"
          >
            <div
              onClick={toggleCreateNewChatGroup}
              className="flex items-center border border-grey_10 drop-shadow-7xl
        py-2 px-3 bg-secondary-btn
        rounded-3xl cursor-pointer"
            >
              <Typography variant="subtitle3" className="text-grey_800">
                Create chat group
              </Typography>
              <img src={plus} alt="plus" className="w-5 h-4" />
            </div>

            <section className="flex items-center">
              <img src={searchIcon} alt="searchIcon" className="w-6 h-6 mr-4" />
              <img src={writeMessage} alt="writeMessage" className="w-6 h-6" />
            </section>
          </div>

          <div className="flex items-center justify-between overflow-x-scroll p-4">
            {messagesTab.map(({ id, name }) => (
              <div
                key={id}
                onClick={() => setIsActiveTab(name)}
                className={`cursor-pointer py-2 px-4 rounded-3xl mr-[14px] drop-shadow-3xl whitespace-nowrap ${
                  isActiveTab === name
                    ? "bg-blue_200 text-blue_500"
                    : "bg-white text-grey_400"
                }`}
              >
                <Typography variant="p2">{name}</Typography>
              </div>
            ))}
            <img src={plus} alt="plus" className="w-6 h-6" />
          </div>

          {isActiveTab !== "Chat groups" && (
            <>
              {notificationSampleData.map(
                ({ id, name, message, photo, tag, time }) => (
                  <div
                    key={id}
                    className="flex items-center p-4 border-b border-grey_10"
                    onClick={toggleMessageAndChatInterface}
                  >
                    <img src={photo} alt="photo" className="w-10 h-10" />
                    <div className="ml-3">
                      <div className="flex items-center mb-1 whitespace-nowrap">
                        <Typography
                          variant="titleTwo"
                          className="text-grey_900"
                        >
                          {name}
                        </Typography>
                        <img
                          src={verifyBlue}
                          alt="verify"
                          className="ml-[1px] h-4 w-4"
                        />
                        <Typography variant="p2" className="text-grey_400 pl-2">
                          {tag}
                        </Typography>
                        <div className="w-[2px] h-[2px] bg-grey_300 mx-[6px]"></div>
                      </div>
                      <Typography
                        variant="titleTwo"
                        className="pt-[2px] text-grey_700 font-normal"
                      >
                        {message}
                      </Typography>
                    </div>
                    <div className="ml-auto">
                      <img src={horizontalMore} alt="more" />
                      <Typography variant="p2" className="text-grey_400">
                        {time}
                      </Typography>
                    </div>
                  </div>
                )
              )}
            </>
          )}

          {isActiveTab === "Chat groups" && (
            <>
              {sampleChatGroups?.map(({ id, groupName, noOfUsers }) => (
                <div
                  key={id}
                  onClick={() => getSelectedGroup(groupName)}
                  className="flex items-center justify-between cursor-pointer p-4 border-b border-grey_10 hover:bg-blue_200"
                >
                  <div>
                    <Typography
                      variant="titleTwo"
                      className="pb-[2px] text-grey_900"
                    >
                      {groupName}
                    </Typography>
                    <Typography variant="p2" className="text-grey_400">
                      {noOfUsers}
                    </Typography>
                  </div>
                  <img src={rightAshArrow} alt="arrow" className="w-6 h-6" />
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {selectedChatGroup !== "" && (
        <div className="w-full md:w-[42%]">
          <AddParticipant
            setSelectedChatGroup={setSelectedChatGroup}
            setAreParticipantSelected={setAreParticipantSelected}
            areParticipantSelected={areParticipantSelected}
          />
        </div>
      )}

      {/* <section className="w-[58%]">
        {isActiveTab !== "Chat groups" && <ChatInterface />}
        {isActiveTab === "Chat groups" && (
          <GroupChatInterface
            selectedChatGroup={selectedChatGroup}
            isEmpty={isEmpty}
            areParticipantSelected={areParticipantSelected}
          />
        )}
      </section> */}

      <section
        className={`${
          selectedMessageOnMobile ? "" : "hidden md:block"
        } w-full md:w-[58%]`}
      >
        {isActiveTab !== "Chat groups" && (
          <ChatInterface
            toggleMessageAndChatInterface={toggleMessageAndChatInterface}
          />
        )}
        {isActiveTab === "Chat groups" && (
          <GroupChatInterface
            selectedChatGroup={selectedChatGroup}
            isEmpty={isEmpty}
            areParticipantSelected={areParticipantSelected}
          />
        )}
        {/* {isActiveTab === "Chat groups" && <GroupChatInterface />} */}
      </section>

      {
        <Modal show={createNewGroup} toggleModal={toggleCreateNewChatGroup}>
          <CreateChatGroup toggleModal={toggleCreateNewChatGroup} />
        </Modal>
      }
    </section>
  );
};

export { Messages };
