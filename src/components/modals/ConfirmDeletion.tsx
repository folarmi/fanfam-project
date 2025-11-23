/* eslint-disable @typescript-eslint/no-explicit-any */

import { useForm } from "react-hook-form";
import CustomButton from "../forms/CustomButton";
import Typography from "../forms/Typography";

type ConfirmDeletionProps = {
  toggleModal: () => void;
  deleteFn: (payload?: any) => void;
  isDeleting?: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
};

const ConfirmDeletion = ({
  toggleModal,
  deleteFn,
  isDeleting,
  title = "Delete",
  message = "Are you sure you want to delete this item?",
  buttonText = "Yes, Delete",
}: ConfirmDeletionProps) => {
  const { handleSubmit } = useForm();

  const submitForm = () => {
    deleteFn();
    toggleModal();
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col bg-blue_200 p-6 rounded-2xl shadow-overlay"
    >
      <Typography variant="titleOne">{title}</Typography>

      <Typography variant="p2" className="py-6">
        {message}
      </Typography>

      <div className="flex items-center pb-6 ml-auto">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs mr-6 "
        >
          Cancel
        </CustomButton>

        <CustomButton
          disabled={isDeleting}
          loading={isDeleting}
          variant="primary"
          className="text-xs px-3 w-fit"
        >
          {buttonText}
        </CustomButton>
      </div>
    </form>
  );
};

export { ConfirmDeletion };
