type Prop = {
  publicId: string | undefined;
  toggleModal: () => void;
};

const CommentOnPost = ({ publicId }: Prop) => {
  return (
    <div>
      <p>CommentOnPost</p>
    </div>
  );
};

export { CommentOnPost };
