import Typography from "../forms/Typography";

import copy from "../../assets/copy.svg";
import ModalContent from "./ModalContent";
import { useState } from "react";
import Modal from "./Modal";
import { ConfirmPostDeletion } from "./ConfirmPostDeletion";

type Prop = {
  toggleTimelineHomeModal: (show: boolean) => void;
};

const TimeLineHomeModal = ({ toggleTimelineHomeModal }: Prop) => {
  const [selectedItem, setSelectedItem] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const toggleDeletePostModal = () => {
    setShowDeleteModal(!showDeleteModal);
    // toggleTimelineHomeModal(false);
  };

  const test = () => {};

  const handleModal = (item: string) => {
    switch (item) {
      case "Add Bookmark":
        test();
        break;
      case "Repost":
        test();
        break;
      case "Edit post":
        test();
        break;
      case "Delete post":
        toggleDeletePostModal();
        break;
      default:
        console.warn("Unknown action:", item);
    }
  };
  return (
    <>
      <div className="flex items-center justify-between py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6">
        <Typography variant="p2" className="text-grey_700">
          Copy link to post
        </Typography>
        <img src={copy} alt="copy" />
      </div>
      <ModalContent
        content={[
          { id: 1, name: "Add Bookmark" },
          { id: 2, name: "Repost" },
          { id: 3, name: "Edit post" },
          { id: 4, name: "Delete post" },
        ]}
        onClick={(item: string) => {
          handleModal(item);
          setSelectedItem(item);
        }}
      />

      <Modal show={showDeleteModal} toggleModal={toggleDeletePostModal}>
        <div className="p-4">
          <ConfirmPostDeletion
            toggleModal={toggleDeletePostModal}
            selectedItem={selectedItem}
          />
        </div>
      </Modal>
    </>
  );
};

export default TimeLineHomeModal;
