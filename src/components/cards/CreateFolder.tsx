/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../forms/Typography";
import closeIcon from "../../assets/icons/closeIcon.svg";
import CustomInput from "../forms/CustomInput";
import { useForm } from "react-hook-form";
import CustomButton from "../forms/CustomButton";

const CreateFolder = ({ toggleModal }: any) => {
  const { control } = useForm();
  return (
    <div className="bg-create-folder shadow-custom-double rounded-2xl px-6 border-2 border-white">
      <div className="flex items-center justify-between py-6">
        <Typography variant="titleOne">Create folder</Typography>
        <img
          src={closeIcon}
          alt="plus"
          className="cursor-pointer"
          onClick={toggleModal}
        />
      </div>

      <CustomInput name="Folder" control={control} label="Folder Name" />

      <div className="ml-[128px] flex items-center pb-6">
        <CustomButton
          onClick={toggleModal}
          variant="secondary"
          className="text-xs mr-6 w-[84px]"
        >
          Cancel
        </CustomButton>
        <CustomButton variant="primary" className="text-xs px-3 w-[84px]">
          Save Folder
        </CustomButton>
      </div>
    </div>
  );
};

export default CreateFolder;
