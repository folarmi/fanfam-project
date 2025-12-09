import type { ProfileActionsProps } from "@/lib/types";
import Typography from "../forms/Typography";
import ModalContent from "../modals/ModalContent";
import moreIcon from "@/assets/icons/moreIcon.svg";
import copy from "@/assets/copy.svg";
import { useState } from "react";
import { commentOptions } from "@/data";
import locationIcon from "@/assets/icons/location.svg";
import Modal from "../modals/Modal";
import AddUserToListModal from "../modals/AddUserToListModal";

const ProfileActions: React.FC<ProfileActionsProps> = ({
  actions = [],
  showLocation = true,
  location,
  onActionClick,
}) => {
  const [commentModal, setCommentModal] = useState(false);
  const [addUserToList, setAddUserToList] = useState(false);

  const toggleCommentModal = () => {
    setCommentModal(!commentModal);
  };

  const toggleAddUserToList = () => {
    setAddUserToList(!addUserToList);
  };

  const getModalValue = (name: string) => {
    if (name === "Add User to list") {
      setCommentModal(false);
      setAddUserToList(!addUserToList);
    }
  };

  return (
    <div className="w-full mt-6 flex items-center ">
      <div className="flex items-center gap-x-4 w-full">
        {showLocation && location && (
          <div className="hidden md:flex items-center ml-28">
            <img src={locationIcon} alt="location" />
            <span className="text-grey_400 pl-1 text-sm">{location}</span>
          </div>
        )}

        {actions?.map((action, index) => (
          <div
            key={index}
            className="cursor-pointer ml-auto"
            onClick={() => onActionClick?.(action.type)}
          >
            {action.component}
          </div>
        ))}

        <div className="relative ">
          <img
            src={moreIcon}
            alt="horizontalMore"
            className="cursor-pointer"
            onClick={toggleCommentModal}
            loading="lazy"
          />
          {commentModal && (
            <div className="mt-5 flex flex-col absolute right-[95%] top-[100%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
              <div className="flex items-center justify-between py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6">
                <Typography variant="p2" className="text-grey_700">
                  Copy link to profile
                </Typography>
                <img src={copy} alt="copy" />
              </div>
              <ModalContent content={commentOptions} onClick={getModalValue} />
            </div>
          )}
        </div>
      </div>

      <Modal show={addUserToList} toggleModal={toggleAddUserToList}>
        <AddUserToListModal toggleModal={toggleAddUserToList} />
      </Modal>
    </div>
  );
};

export { ProfileActions };
