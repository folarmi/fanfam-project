import { useState } from "react";
import Typography from "./forms/Typography";

// import timelineImage from "../assets/timelineImage.svg";
// import timelineTwo from "../assets/timelineTwo.svg";
// import plus from "../assets/icons/plus.svg";
// import switchList from "../assets/icons/switchList.svg";
// import addFolder from "../assets/icons/addFolder.svg";
import defaultAvatar from "../assets/defaultAvatar.svg";
import Modal from "./modals/Modal";
import CreateFolder from "./cards/CreateFolder";
import PersonPostModal from "./modals/PersonPostModal";
import ViewPost from "./cards/ViewPost";
import { Loader } from "./molecules/Loader";
import type { ProfilePostProps, StoryPost } from "@/lib/types";
import { formatTimeAgo } from "@/utils/helperTwo";
import { transformReactions } from "@/lib/reaction";

const Post = ({
  creatorContent,
  creatorContentIsLoading,
}: ProfilePostProps) => {
  // const [isProfileTabActive, setIsProfileTabActive] = useState("All");
  // const [profileTabs] = useState([
  //   {
  //     id: 1,
  //     name: "All",
  //     number: "",
  //   },
  //   {
  //     id: 2,
  //     name: "Archive",
  //     number: "23",
  //   },
  //   {
  //     id: 3,
  //     name: "Best of 2023",
  //     number: "56",
  //   },
  //   {
  //     id: 4,
  //     name: "Best of 2024",
  //     number: "37",
  //   },
  // ]);
  // const [isMobile, setIsMobile] = useState(false);
  const [toggleCreateFolderModal, setToggleCreateFolderModal] = useState(false);
  const [showMoreModal] = useState(false);

  const toggleModal = () => {
    setToggleCreateFolderModal(!toggleCreateFolderModal);
  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => window.removeEventListener("resize", handleResize);
  // });

  // const tabsToDisplay = isMobile ? profileTabs.slice(0, 2) : profileTabs;
  const contentItems: StoryPost[] = creatorContent || [];

  const getCreatorName = (creator: any) => {
    if (!creator) return "Unknown User";
    if (typeof creator === "string") return creator.split("@")[0];
    if (typeof creator === "object") {
      return (
        creator.username ||
        creator.displayName ||
        creator.email?.split("@")[0] ||
        "Unknown User"
      );
    }
    return "Unknown User";
  };

  return (
    <>
      {creatorContentIsLoading ? (
        <Loader />
      ) : (
        <div>
          {/* <div className="my-4 flex items-center px-4 mr-[14px] justify-between">
            {tabsToDisplay.map(({ id, name, number }) => (
              <div
                onClick={() => setIsProfileTabActive(name)}
                className={`flex items-center cursor-pointer px-[14px] py-[7px] rounded-3xl hover:bg-blue_200 ${
                  isProfileTabActive === name ? "bg-blue_200" : "bg-white"
                }`}
                key={id}
              >
                <Typography variant="p2" className="pr-1 text-grey_500">
                  {name}
                </Typography>
                {number && (
                  <Typography
                    className={`${
                      isProfileTabActive === name
                        ? "text-grey_400"
                        : "text-grey_900"
                    }`}
                    variant="subtitle2"
                  >
                    {number}
                  </Typography>
                )}
              </div>
            ))}

            <img src={addFolder} alt="plus" className="md:hidden" />

            <div
              onClick={toggleModal}
              className="hidden md:flex items-center border border-grey_10 drop-shadow-7xl
          py-2 px-3 bg-secondary-btn rounded-3xl cursor-pointer"
            >
              <Typography variant="subtitle3">Create Folder</Typography>
              <img src={plus} alt="plus" />
            </div>

            <img src={switchList} alt="demo" />
          </div> */}

          {contentItems?.length > 0 ? (
            contentItems?.map((item) => (
              <div className="relative" key={item?.publicId}>
                <ViewPost
                  profileName={getCreatorName(item?.creator)}
                  avatar={defaultAvatar}
                  handle={`@${getCreatorName(item?.creator)}`}
                  time={formatTimeAgo(item?.createdDate)}
                  paragraphOne={item?.message}
                  paragraphTwo=""
                  timeLineImage={item?.mediaFiles || ""}
                  ifParagraph={true}
                  ifIcon={false}
                  bgColor="#fafafa"
                  showModal={showMoreModal}
                  toggleModal={toggleModal}
                  TimeLineModal={<PersonPostModal />}
                  reactionsData={transformReactions(item?.reactions)}
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-grey_500">
              <Typography variant="p2">No posts yet</Typography>
            </div>
          )}

          <Modal show={toggleCreateFolderModal} toggleModal={toggleModal}>
            <div className="p-4">
              <CreateFolder toggleModal={toggleModal} />
            </div>
          </Modal>
        </div>
      )}
    </>
  );
};

export default Post;
