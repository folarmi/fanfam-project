import CustomButton from "../forms/CustomButton";
import Typography from "../forms/Typography";

type Prop = {
  toggleModal: () => void;
  selectedItem: string;
};

const ConfirmPostDeletion = ({ selectedItem, toggleModal }: Prop) => {
  return (
    <div className="flex flex-col bg-blue_200 hover:rounded-lg cursor-pointer p-6 max-w-[368px]">
      <Typography variant="titleOne">Delete post</Typography>
      <Typography variant="p2" className="py-6">
        Are you sure you want to delete this post?
      </Typography>

      <div className="flex items-center pb-6">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs mr-6 w-[84px]"
        >
          Cancel
        </CustomButton>
        <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
          Save name
        </CustomButton>
      </div>
    </div>
  );
};

export { ConfirmPostDeletion };
