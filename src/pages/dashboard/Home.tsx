import { useState } from "react";
import defaultLiveAvatar from "../../assets/defaultLiveAvatar.svg";
import { useAppSelector } from "../../lib/hook";
import type { RootState } from "../../lib/store";
import SearchInput from "../../components/SearchInput";
import Poll from "../../components/molecules/Poll";
import CommentBox from "../../components/CommentBox";
import TimeLineHomeModal from "../../components/modals/TimeLineHomeModal";
import { UserRole } from "../../data";
import Modal from "../../components/modals/Modal";
import InterestModal from "../../components/modals/InterestModal";
import StoryModal from "../../components/modals/StoryModal";
import { StoryUploader } from "@/components/molecules/StoryUploader";
import { useGetData } from "@/hooks/apiCalls";
import { Loader } from "@/components/molecules/Loader";
import type { StoryPost } from "@/lib/types";
import { formatTimeAgo } from "@/utils/helperTwo";
import { useFetchProfile } from "@/hooks/apiHooks";
import ViewPost from "../../components/cards/ViewPost";

const Home = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const [isEditingStory, setIsEditingStory] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState<string | boolean | null>(
    null
  );
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
  const { data: profileData, isLoading } = useFetchProfile(userObject);

  const { data: getCreatorContent, isLoading: getCreatorContentIsLoading } =
    useGetData({
      url: `contents?creator=${userObject?.email}&page=0&size=20&sort=asc`,
      queryKey: ["GetContents"],
    });
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

  const toggleTimelineHomeModal = () => {
    setShowMoreModal(!showMoreModal);
  };

  return (
    <>
      {isLoading || getCreatorContentIsLoading ? (
        <Loader />
      ) : (
        <div className="">
          <>
            <SearchInput />
            {ifUserIsCreatingPoll ? (
              <Poll
                pollOptions={pollOptions}
                setPollOptions={setPollOptions}
                activePoll={activePoll}
                setActivePoll={setActivePoll}
                setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
              />
            ) : (
              <CommentBox setIfUserIsCreatingPoll={setIfUserIsCreatingPoll} />
            )}

            <div className="my-2">
              <StoryUploader onFileUpload={handleFileUpload} />
            </div>

            {getCreatorContent?.data?.content?.map((data: StoryPost) => {
              return (
                <div className="relative" key={data?.publicId}>
                  <ViewPost
                    publicId={data?.publicId}
                    profileName={profileData?.data?.displayName}
                    avatar={profileData?.data?.profilePic || defaultLiveAvatar}
                    handle={`@${profileData?.data?.username}`}
                    time={formatTimeAgo(data?.createdDate)}
                    paragraphOne={data?.message}
                    timeLineImage={data?.mediaFiles}
                    ifParagraph={true}
                    showModal={showMoreModal === data?.publicId} // Only true for this specific item
                    setShowModal={(show: boolean) =>
                      setShowMoreModal(show ? data?.publicId : null)
                    }
                    TimeLineModal={
                      <TimeLineHomeModal
                        toggleTimelineHomeModal={toggleTimelineHomeModal}
                        publicId={data?.publicId}
                      />
                    }
                    reactions={data?.reactions}
                    // ifIcon={data?.reactions.length > 0 ? true : false}
                  />
                </div>
              );
            })}
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
      )}
    </>
  );
};

export { Home };
