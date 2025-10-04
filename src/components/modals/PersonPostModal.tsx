import React from "react";
import Typography from "../forms/Typography";
import ModalContent from "./ModalContent";

const PersonPostModal = () => {
  return (
    <ModalContent
      content={[
        { id: 1, name: "Add post to folder" },
        { id: 2, name: "Delete post" },
        { id: 2, name: "Reshare post" },
      ]}
    />
  );
};

export default PersonPostModal;
