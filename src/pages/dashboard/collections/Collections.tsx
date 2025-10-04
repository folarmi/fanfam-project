import { dummyCollectionData } from "@/data";
import plus from "@/assets/icons/plus.svg";
import { useState } from "react";
import CollectionsSearchInput from "@components/forms/CollectionsSearchInput";
import CollectionCard from "@components/cards/CollectionCard";
import suggestionOne from "@/assets/suggestionOne.svg";
import defaultLiveAvatar from "@/assets/defaultLiveAvatar.svg";
import defaultAvatar from "@/assets/defaultAvatar.svg";
import Typography from "@components/forms/Typography";
import moreIcon from "@/assets/icons/moreIcon.svg";
import CollectionSortingOptionsModal from "@components/modals/CollectionSortingOptionsModal";
import Modal from "@components/modals/Modal";
import CreateNewList from "@components/modals/CreateNewList";
import leftArrow from "@/assets/icons/arrowLeft.svg";

const Collections = () => {
  const [collectionsTab] = useState([
    {
      id: 1,
      name: "User List",
    },
    {
      id: 2,
      name: "Bookmarks",
    },
  ]);
  const [followingTabs] = useState([
    { id: 1, name: "Users" },
    { id: 2, name: "Following" },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("User List");
  const [followingActiveTab, setFollowingActiveTab] = useState("User");
  const [isOptionsShown, setIsOptionsShown] = useState(true);
  const [blockUserModal, setBlockUserModal] = useState(false);
  const [restrictUserModal, setRestrictUserModal] = useState(false);
  const [reportUserModal, setReportUserModal] = useState(false);
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [addUserToList, setAddUserToList] = useState(false);
  const [createNewList, setCreateNewList] = useState(false);
  const [showOnMobile, setShowOnMobile] = useState(false);

  const toggleMoreOptions = () => {
    setShowMoreOptions(!showMoreOptions);
  };

  const toggleCreateNewList = () => {
    setCreateNewList(!createNewList);
  };

  const toggleMobileView = () => {
    setShowOnMobile(!showOnMobile);
  };

  return (
    <div className="flex">
      <section
        className={`mt-6 border-r border-r-grey_10 ${
          showOnMobile ? "hidden" : ""
        }`}
      >
        <div className="flex items-center px-4 mb-6">
          <CollectionsSearchInput placeholder="Search user list" />

          <div
            className="flex items-center border border-grey_10 drop-shadow-7xl
          py-2 px-3 bg-secondary-btn rounded-3xl cursor-pointer"
            onClick={toggleCreateNewList}
          >
            <Typography variant="subtitle3">Create New List</Typography>
            <img src={plus} alt="plus" />
          </div>
        </div>

        <div className="flex items-center w-full justify-between border-b border-grey_10 cursor-pointer">
          {collectionsTab?.map(({ id, name }) => {
            return (
              <div
                key={id}
                onClick={() => setIsActiveTab(name)}
                className={`w-1/2 cursor-pointer pb-1 ${
                  isActiveTab === name ? "border-b-2 border-b-grey_800" : ""
                }`}
              >
                <Typography
                  className={`text-center ${
                    isActiveTab === name ? "text-grey_800" : "text-grey_500"
                  }`}
                  variant="subtitle3"
                >
                  {name}
                </Typography>
              </div>
            );
          })}
        </div>

        {dummyCollectionData?.map(
          ({ id, folderName, noOfPosts, noOfUsers }) => {
            return (
              <div
                key={id}
                onClick={toggleMobileView}
                className="flex items-center justify-between py-[14px] px-4 border-b border-grey_10"
              >
                <section>
                  <Typography variant="titleTwo" className="text-grey_900 pb-1">
                    {folderName}
                  </Typography>
                  <Typography variant="p2" className="text-grey_400">
                    {noOfUsers}
                  </Typography>
                </section>

                <Typography variant="p2" className="text-grey_400">
                  {noOfPosts}
                </Typography>
              </div>
            );
          }
        )}
      </section>

      <section
        className={`${
          showOnMobile ? "w-full" : "hidden md:block md:w-[632px]"
        }`}
      >
        <div className="flex items-center">
          <img
            src={leftArrow}
            alt="leftArrow"
            className="md:hidden ml-4"
            // onClick={toggleView}
          />
          <Typography
            variant="titleOne"
            className="my-[30px] text-grey_900 pl-1 md:pl-4"
          >
            Following
          </Typography>
        </div>
        <div className="flex items-center  w-full justify-between border-b border-grey_10">
          {followingTabs?.map(({ id, name }) => {
            return (
              <div
                key={id}
                onClick={() => setFollowingActiveTab(name)}
                className={`w-1/2 cursor-pointer pb-1 ${
                  followingActiveTab === name
                    ? "border-b-2 border-b-grey_800"
                    : ""
                }`}
              >
                <Typography
                  className={`text-center ${
                    followingActiveTab === name
                      ? "text-grey_800"
                      : "text-grey_500"
                  }`}
                  variant="subtitle3"
                >
                  {name}
                </Typography>
              </div>
            );
          })}
        </div>

        <div className="w-full flex justify-center items-center">
          <CollectionsSearchInput
            className="m-4 w-full"
            placeholder="Search user"
          />
          <img
            onClick={toggleMoreOptions}
            src={moreIcon}
            alt="demo"
            className="w-6 h-6 cursor-pointer"
          />

          {showMoreOptions && (
            <div>
              <CollectionSortingOptionsModal />
            </div>
          )}
        </div>

        <div className="flex flex-wrap justify-center md:justify-start w-full">
          <CollectionCard
            profileName="Priscilia yummy"
            tag="@yummychill54"
            displayImage={suggestionOne}
            avatar={defaultLiveAvatar}
            ifSubscribe
            blockUserModal={blockUserModal}
            setBlockUserModal={setBlockUserModal}
            restrictUserModal={restrictUserModal}
            setRestrictUserModal={setRestrictUserModal}
            reportUserModal={reportUserModal}
            setReportUserModal={setReportUserModal}
            addUserToList={addUserToList}
            setAddUserToList={setAddUserToList}
          />

          <CollectionCard
            profileName="Priscilia yummy"
            tag="@yummychill54"
            displayImage={suggestionOne}
            avatar={defaultAvatar}
            ifRenew
          />

          <CollectionCard
            profileName="Priscilia yummy"
            tag="@yummychill54"
            displayImage={suggestionOne}
            avatar={defaultLiveAvatar}
            ifSubscribedForFree
          />
          <CollectionCard
            profileName="Priscilia yummy"
            tag="@yummychill54"
            displayImage={suggestionOne}
            avatar={defaultAvatar}
            ifSubscribedWithOption
          />
          <CollectionCard
            profileName="Priscilia yummy"
            tag="@yummychill54"
            displayImage={suggestionOne}
            avatar={defaultAvatar}
            ifSubscribedWithOption
            setIsOptionsShown={setIsOptionsShown}
            isOptionsShown={isOptionsShown}
          />
        </div>
      </section>

      {
        <Modal show={createNewList} toggleModal={toggleCreateNewList}>
          <CreateNewList toggleModal={toggleCreateNewList} />
        </Modal>
      }
    </div>
  );
};

export { Collections };
