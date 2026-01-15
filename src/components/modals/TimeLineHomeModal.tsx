import Typography from "../forms/Typography";

import copy from "../../assets/copy.svg";
import ModalContent from "./ModalContent";
import { useState } from "react";
import Modal from "./Modal";
import { ConfirmActionModal } from "./ConfirmActionModal";
import { EditPost } from "./EditPost";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";

type Prop = {
  publicId: string;
  createdBy: string;
  toggleTimelineHomeModal: () => void;
};

const TimeLineHomeModal = ({ publicId, createdBy }: Prop) => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const isOwner = userObject?.email === createdBy;
  const queryClient = useQueryClient();
  // console.log(createdBy);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const deletePostMutation = useCustomMutation({
    endpoint: `contents/${publicId}`,
    method: "delete",
    successMessage: () => "Post deleted successfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
    },
  });

  const toggleDeletePostModal = () => {
    setShowDeleteModal(!showDeleteModal);
    // toggleTimelineHomeModal();
  };

  const toggleEditPostModal = () => {
    setShowEditModal(!showEditModal);
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
        toggleEditPostModal();
        break;
      case "Delete post":
        toggleDeletePostModal();
        break;
      default:
        console.warn("Unknown action:", item);
    }
  };

  const menuItems = [
    // { id: 1, name: "Add Bookmark" },
    // { id: 2, name: "Repost" },
    ...(isOwner
      ? [
          { id: 3, name: "Edit post" },
          { id: 4, name: "Delete post" },
        ]
      : []),
  ];

  return (
    <>
      <div className="flex items-center justify-between py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6">
        <Typography variant="p2" className="text-grey_700">
          Copy link to post
        </Typography>
        <img src={copy} alt="copy" />
      </div>
      <ModalContent
        content={menuItems}
        onClick={(item: string) => {
          handleModal(item);
        }}
      />

      <Modal show={showDeleteModal} toggleModal={toggleDeletePostModal}>
        <div className="p-4">
          <ConfirmActionModal
            toggleModal={toggleDeletePostModal}
            message=" Are you sure you want to delete this post?"
            title="Delete post"
            deleteFn={deletePostMutation.mutate}
            isDeleting={deletePostMutation.isPending}
          />
        </div>
      </Modal>

      <Modal show={showEditModal} toggleModal={toggleEditPostModal}>
        <EditPost publicId={publicId} toggleModal={toggleEditPostModal} />
      </Modal>
    </>
  );
};

export default TimeLineHomeModal;
