import { useEffect, useState } from "react";
import Typography from "./forms/Typography";

import defaultAvatar from "../assets/defaultAvatar.svg";
import timelineImage from "../assets/timelineImage.svg";
import timelineTwo from "../assets/timelineTwo.svg";
import plus from "../assets/icons/plus.svg";
import switchList from "../assets/icons/switchList.svg";
import addFolder from "../assets/icons/addFolder.svg";
import Modal from "./modals/Modal";
import CreateFolder from "./cards/CreateFolder";
import PersonPostModal from "./modals/PersonPostModal";
import Timeline from "./cards/Timeline";

const Post = () => {
  const [isProfileTabActive, setIsProfileTabActive] = useState("All");
  const [profileTabs] = useState([
    {
      id: 1,
      name: "All",
      number: "",
    },
    {
      id: 2,
      name: "Archive",
      number: "23",
    },
    {
      id: 3,
      name: "Best of 2023",
      number: "56",
    },
    {
      id: 4,
      name: "Best of 2024",
      number: "37",
    },
  ]);
  const [toggleCreateFolderModal, setToggleCreateFolderModal] = useState(false);
  const [showMoreModal, setShowMoreModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const toggleModal = () => {
    setToggleCreateFolderModal(!toggleCreateFolderModal);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  });

  const tabsToDisplay = isMobile ? profileTabs.slice(0, 2) : profileTabs;

  return (
    <div>
      <div className={`my-4 flex items-center px-4 mr-[14px] justify-between `}>
        {tabsToDisplay.map(({ id, name, number }) => {
          return (
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
          );
        })}

        <img src={addFolder} alt="plus" className="md:hidden" />

        <div
          onClick={toggleModal}
          className="hidden md:flex items-center border border-grey_10 drop-shadow-7xl
          py-2 px-3 bg-secondary-btn
           rounded-3xl cursor-pointer"
        >
          <Typography variant="subtitle3">Create Folder</Typography>
          <img src={plus} alt="plus" />
        </div>

        <img src={switchList} alt="demo" />
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
          timeLineImage={timelineImage}
          ifParagraph={true}
          ifIcon={false}
          bgColor="#fafafa"
          showModal={showMoreModal}
          setShowModal={setShowMoreModal}
          TimeLineModal={<PersonPostModal />}
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
          bgColor="#fafafa"
          //   setShowMoreModal={setShowMoreModalTwo}
          //   showMoreModal={showMoreModalTwo}
        />
      </div>

      <Modal show={toggleCreateFolderModal} toggleModal={toggleModal}>
        <div className="p-4">
          <CreateFolder toggleModal={toggleModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Post;
