import React from "react";
import CollectionRadioButton from "../forms/CollectionRadioButton";

const CollectionSortingOptionsModal = () => {
  return (
    <div className="flex flex-col top-[22%] absolute bg-modal-gradient shadow-triple w-[65%] md:w-1/4 p-6 right-[15%] md:right-0 rounded-2xl border-2 border-white z-50">
      <CollectionRadioButton label="Recent" checked={true} />
      <CollectionRadioButton label="Subscription" />
      <CollectionRadioButton label="Started" />

      <div className="border-b border-grey_50 my-2"></div>
      <CollectionRadioButton label="Ascending" checked={true} />
      <CollectionRadioButton label="Decending" />
    </div>
  );
};

export default CollectionSortingOptionsModal;
