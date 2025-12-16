import { useEffect, useRef, useState } from "react";
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
import { useCustomMutation, useGetData } from "@/hooks/apiCalls";
import { Loader } from "@/components/molecules/Loader";
import type { StoryPost } from "@/lib/types";
import { formatTimeAgo } from "@/utils/helperTwo";
import ViewPost from "../../components/cards/ViewPost";
import { transformReactions } from "@/lib/reaction";
import { CommentOnPost } from "@/components/modals/CommentOnPost";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data: getCreatorContent, isLoading: getCreatorContentIsLoading } =
    useGetData({
      url: `${
        userObject?.role === UserRole.creator
          ? `contents?creator=${userObject?.email}&page=0&size=20&sort=createdDate,desc`
          : "contents?page=0&size=20&sort=createdDate,desc"
      }`,
      queryKey: ["GetContents"],
    });

  const useRecordContentView = (contentId: string) => {
    return useCustomMutation({
      endpoint: `contents/${contentId}/view`,
      onSuccessCallback: () => {},
    });
  };

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
  const [showCommentModal, setShowCommentModal] = useState<
    string | null | undefined
  >(null);
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

  const toggleTimelineHomeModal = () => {
    setShowMoreModal(!showMoreModal);
  };

  const toggleShowCommentModal = (postId: string | null) => {
    if (postId === null || postId === undefined) {
      setShowCommentModal(null);
      return;
    }
    setShowCommentModal(showCommentModal === postId ? null : postId);
  };

  const PostItem = ({ data }: { data: StoryPost }) => {
    const postRef = useRef<HTMLDivElement>(null);
    const [hasViewed, setHasViewed] = useState(false);

    const { data: profileData, isLoading } = useGetData({
      url: `profile/${data?.createdBy}`,
      queryKey: ["GetCreatorProfile", data?.createdBy],
      enabled: !!data?.createdBy,
    });

    // Record view mutation with the specific contentId
    const recordViewMutation = useRecordContentView(data?.publicId || "");

    useEffect(() => {
      if (!postRef.current || hasViewed || !data?.publicId) return;

      // check if the user has already viewed it
      const alreadyViewed = data?.viewers?.includes(userObject?.email);
      if (alreadyViewed) return; // don’t record again

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            recordViewMutation.mutate({});
            setHasViewed(true);
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(postRef.current);
      return () => observer.disconnect();
    }, [hasViewed, data?.publicId, data?.viewers, recordViewMutation]);

    if (isLoading || getCreatorContentIsLoading) return <Loader />;

    return (
      <div className="relative" ref={postRef}>
        <ViewPost
          publicId={data?.publicId}
          profileName={profileData?.data?.displayName || "Unknown User"}
          avatar={profileData?.data?.profilePic}
          handle={`@${profileData?.data?.username}`}
          time={formatTimeAgo(data?.createdDate)}
          paragraphOne={data?.message}
          timeLineImage={data?.mediaFiles}
          ifParagraph={true}
          showModal={showMoreModal === data?.publicId}
          toggleModal={() =>
            setShowMoreModal(
              showMoreModal === data?.publicId ? null : data?.publicId
            )
          }
          onCommentClick={() => toggleShowCommentModal(data?.publicId)}
          onCardClick={() => {
            toggleShowCommentModal(null);
            navigate(`/dashboard/${data?.publicId}`);
          }}
          TimeLineModal={
            <TimeLineHomeModal
              toggleTimelineHomeModal={toggleTimelineHomeModal}
              publicId={data?.publicId}
              createdBy={data?.createdBy}
            />
          }
          reactionsData={transformReactions(data?.reactions)}
        />

        <Modal
          show={showCommentModal === data?.publicId}
          toggleModal={() => toggleShowCommentModal(null)}
        >
          <CommentOnPost
            publicId={data?.publicId}
            toggleModal={() => toggleShowCommentModal(null)}
          />
        </Modal>
      </div>
    );
  };

  return (
    <>
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
            userObject.role === UserRole.creator && (
              <CommentBox
                ifPoll
                ifRecord
                setIfUserIsCreatingPoll={setIfUserIsCreatingPoll}
              />
            )
          )}

          <div className="my-2">
            {userObject.role === UserRole.creator && (
              <StoryUploader onFileUpload={handleFileUpload} />
            )}
          </div>

          {getCreatorContent?.data?.content?.map((data: StoryPost) => (
            <PostItem key={data?.publicId} data={data} />
          ))}
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
    </>
  );
};

export { Home };
