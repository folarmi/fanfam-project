import { useState } from "react";
import defaultLiveAvatar from "../../assets/defaultLiveAvatar.svg";
import defaultAvatar from "../../assets/defaultAvatar.svg";
import timelineImage from "../../assets/timelineImage.svg";
import timelineTwo from "../../assets/timelineTwo.svg";
import { useAppSelector } from "../../lib/hook";
import type { RootState } from "../../lib/store";
import SearchInput from "../../components/SearchInput";
import Poll from "../../components/molecules/Poll";
import CommentBox from "../../components/CommentBox";
import FileUploader from "../../components/molecules/FileUploader";
import Timeline from "../../components/cards/Timeline";
import TimeLineHomeModal from "../../components/modals/TimeLineHomeModal";
import { UserRole } from "../../data";
import Modal from "../../components/modals/Modal";
import InterestModal from "../../components/modals/InterestModal";
import StoryModal from "../../components/modals/StoryModal";

// import TimeLineHomeModal from "../components/modals/TimeLineHomeModal";

const Home = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const [showMoreModal, setShowMoreModal] = useState(false);
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [showMoreModalTwo, setShowMoreModalTwo] = useState(false);
  const [ifUserIsCreatingPoll, setIfUserIsCreatingPoll] = useState(false);
  const [showInterestModal, setShowInterestModal] = useState(false);
  const [pollOptions, setPollOptions] = useState([
    {
      id: "1",
      name: "Option One",
    },
    {
      id: "2",
      name: "Option Two",
    },
  ]);
  const [activePoll, setActivePoll] = useState(pollOptions[0].name);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const toggleInterestModal = () => {
    setShowInterestModal(!showInterestModal);
  };

  const toggleIsEditingStoryModal = () => {
    setIsEditingStory(!isEditingStory);
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    toggleIsEditingStoryModal();
  };

  return (
    <div className="">
      <>
        <SearchInput />
        {ifUserIsCreatingPoll ? (
          <Poll
            pollOptions={pollOptions}
            setPollOptions={setPollOptions}
            activePoll={activePoll}
            setActivePoll={setActivePoll}
          />
        ) : (
          <CommentBox setIfUserIsCreatingPoll={setIfUserIsCreatingPoll} />
        )}

        <div className="my-2">
          <FileUploader
            maxSizeMB={1}
            acceptFormats={["png", "jpeg", "jpg", "gif"]}
            onFileUpload={handleFileUpload}
          />
        </div>

        <div className="relative">
          <Timeline
            profileName="Priscilia yummy"
            avatar={defaultLiveAvatar}
            handle="@yummychill54 ."
            time="3 h ago"
            paragraphOne="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
            paragraphTwo="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
            timeLineImage={timelineImage}
            ifParagraph={true}
            showModal={showMoreModal}
            setShowModal={setShowMoreModal}
            TimeLineModal={<TimeLineHomeModal />}
          />
        </div>

        <div className="relative">
          <Timeline
            profileName="Priscilia yummy"
            avatar={defaultAvatar}
            handle="@yummychill54 ."
            time="3 h ago"
            paragraphOne="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
            paragraphTwo="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
        mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
        etra justo pretium sollic itudin digni ssim non solli citudin sit
        pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
        dictum a."
            timeLineImage={timelineTwo}
            ifParagraph={true}
            showModal={setShowMoreModalTwo}
            setShowModal={showMoreModalTwo}
          />
        </div>
        <Timeline
          profileName="Priscilia yummy"
          avatar={defaultLiveAvatar}
          handle="@yummychill54 ."
          time="3 h ago"
          timeLineImage={timelineImage}
          ifParagraph={false}
        />
      </>

      {userObject.role !== UserRole.creator && (
        <Modal show={showInterestModal} toggleModal={toggleInterestModal}>
          <div className="p-4">
            <InterestModal toggleModal={toggleInterestModal} />
          </div>
        </Modal>
      )}

      <Modal
        ifClose={false}
        show={isEditingStory}
        toggleModal={toggleIsEditingStoryModal}
      >
        <div className="p-4">
          <StoryModal
            toggleModal={toggleIsEditingStoryModal}
            uploadedFile={uploadedFile}
          />
        </div>
      </Modal>
    </div>
  );
};

export { Home };
