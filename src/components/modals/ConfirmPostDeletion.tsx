type Prop = {
  toggleModal: () => void;
  selectedItem: string;
};

const ConfirmPostDeletion = ({ selectedItem, toggleModal }: Prop) => {
  return (
    <div className="cursor-pointer">
      <p>ConfirmPostDeletion</p>
    </div>
  );
};

export { ConfirmPostDeletion };
