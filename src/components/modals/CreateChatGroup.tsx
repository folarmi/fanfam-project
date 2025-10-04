/* eslint-disable @typescript-eslint/no-explicit-any */

import closeIcon from "../../assets/icons/closeIcon.svg";
import Typography from "../forms/Typography";
import CustomInput from "../forms/CustomInput";
import CustomButton from "../forms/CustomButton";
import { useForm } from "react-hook-form";

const CreateChatGroup = ({ toggleModal }: any) => {
  const { control } = useForm();
  return (
    <div className="bg-modal-gradient shadow-triple rounded-2xl border-2 border-white z-50 w-[360px] px-4">
      <div className="flex items-center justify-between my-4">
        <Typography variant="titleOne" className="">
          Create new chat group
        </Typography>
        <img
          src={closeIcon}
          alt="closeicon"
          className="cursor-pointer"
          onClick={toggleModal}
        />
      </div>

      <form className="mt-6">
        <CustomInput
          name="Name of list"
          control={control}
          label="Chat group name"
        />

        <div className="ml-[128px] flex items-center pb-6">
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
      </form>
    </div>
  );
};

export default CreateChatGroup;
