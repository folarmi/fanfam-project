import { useCustomMutation } from "@/hooks/apiCalls";
import CustomButton from "../forms/CustomButton";
import Typography from "../forms/Typography";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type Prop = {
  toggleModal: () => void;
  publicId: string;
};

const ConfirmPostDeletion = ({ publicId, toggleModal }: Prop) => {
  const queryClient = useQueryClient();
  const { handleSubmit } = useForm();

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

  const submitForm = () => {
    deletePostMutation.mutate({});
    toggleModal();
  };

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="flex flex-col bg-blue_200 cursor-pointer p-6 rounded-2xl shadow-overlay"
    >
      <Typography variant="titleOne">Delete post</Typography>
      <Typography variant="p2" className="py-6">
        Are you sure you want to delete this post?
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
          disabled={deletePostMutation.isPending}
          loading={deletePostMutation.isPending}
          variant="primary"
          className="text-xs px-3 w-[84px]"
        >
          Yes Delete
        </CustomButton>
      </div>
    </form>
  );
};

export { ConfirmPostDeletion };
