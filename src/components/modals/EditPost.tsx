import PostCard from "../cards/Postcard";

type Prop = {
  toggleModal: () => void;
  publicId: string;
  onEdit: () => void;
  onCancel: () => void;
};

const EditPost = (props: Prop) => {
  const { onEdit, onCancel } = props;
  return (
    <PostCard
      avatar="dd"
      profileName="ff"
      handle="@ff"
      time="ff"
      {...props}
      isEditMode={true}
      onContentClick={onEdit}
      ifIcon={false} // Hide reactions in edit mode
      headerActions={
        <div className="flex gap-2 ml-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={onCancel}
            className="px-3 py-1 text-sm bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      }
    />
  );
};

export { EditPost };
