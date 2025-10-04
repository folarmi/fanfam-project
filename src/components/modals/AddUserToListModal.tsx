/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "../forms/Typography";
import closeIcon from "../../assets/icons/closeIcon.svg";
import CustomButton from "../forms/CustomButton";
import CustomCheckBox from "../forms/CustomCheckBox";
import { userListCollectionsOptions } from "../../data";

const AddUserToListModal = ({ toggleModal }: any) => {
  const [, setIsSelected] = useState(true);
  const [showCheckBox, setShowCheckBox] = useState(false);
  const [selectedItem, setSelectedItem] = useState("");

  const toggleShowCheckBox = (name: string) => {
    setShowCheckBox(true);
    setSelectedItem(name);
  };

  return (
    <div className="w-[360px] bg-create-folder shadow-custom-double rounded-2xl px-6 border-2 border-white">
      <div className="flex items-center justify-between mb-4 mt-2">
        <Typography variant="titleOne">Add user to list</Typography>
        <img
          onClick={toggleModal}
          src={closeIcon}
          alt="closeIcon"
          className="cursor-pointer"
        />
      </div>

      <div className="">
        {userListCollectionsOptions?.map(({ id, name }) => {
          return (
            <div
              onClick={() => toggleShowCheckBox(name)}
              key={id}
              className="flex items-center justify-between hover:bg-blue_200 hover:rounded-lg cursor-pointer"
            >
              <Typography variant="p2" className="text-grey_700 py-2 ">
                {name}
              </Typography>
              {selectedItem === name && showCheckBox && (
                <CustomCheckBox
                  checked={true}
                  onChange={() => setIsSelected(true)}
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="ml-[128px] flex items-center justify-end mt-8 mb-4">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs mr-6 w-[84px]"
        >
          Cancel
        </CustomButton>
        {showCheckBox && (
          <CustomButton
            onClick={toggleModal}
            variant="primary"
            className="text-xs px-3 w-[84px]"
          >
            Add to list
          </CustomButton>
        )}
      </div>
    </div>
  );
};

export default AddUserToListModal;
