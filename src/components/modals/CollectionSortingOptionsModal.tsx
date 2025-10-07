import CollectionRadioButton from "../forms/CollectionRadioButton";

const CollectionSortingOptionsModal = () => {
  return (
    <div className="flex flex-col top-[22%] absolute bg-modal-gradient shadow-triple w-[65%] md:w-1/4 p-6 right-[15%] md:right-0 rounded-2xl border-2 border-white z-50">
      <CollectionRadioButton name="" label="Recent" checked={true} />
      <CollectionRadioButton name="" label="Subscription" />
      <CollectionRadioButton name="" label="Started" />

      <div className="border-b border-grey_50 my-2"></div>
      <CollectionRadioButton name="" label="Ascending" checked={true} />
      <CollectionRadioButton name="" label="Decending" />
    </div>
  );
};

export default CollectionSortingOptionsModal;
