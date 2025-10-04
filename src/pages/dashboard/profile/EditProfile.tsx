/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import editIcon from "../../../assets/icons/editIcon.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../lib/hook";
import type { RootState } from "../../../lib/store";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../../../hooks/apiCalls";
import { toast } from "react-toastify";
import CustomFileUploader from "../../../components/forms/CustomFileUploader";
import Typography from "../../../components/forms/Typography";
import CustomInput from "../../../components/forms/CustomInput";
import moreIcon from "../../../assets/icons/moreIcon.svg";
import CustomTextBox from "../../../components/forms/CustomTextBox";
// import Image from "next/image";
// import CustomInput from "@/app/components/forms/CustomInput";
// import { useForm } from "react-hook-form";
// import CustomTextBox from "@/app/components/forms/CustomTextBox";
// import Typography from "@/app/components/forms/Typography";
// import { useAppSelector } from "@/app/lib/hook";
// import { RootState } from "@/app/lib/store";
// import { useCustomMutation } from "@/app/hooks/apiCalls";
// import { toast } from "react-toastify";
// import { useQueryClient } from "@tanstack/react-query";
// import CustomFileUploader from "@/app/components/forms/CustomFileUploader";

const EditProfile = () => {
  const queryClient = useQueryClient();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { profileDetails } = useAppSelector(
    (state: RootState) => state.profile
  );

  const { control, getValues } = useForm({
    defaultValues: profileDetails,
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const formData = new FormData();
    formData.append("documentType", file.type);
    formData.append("files", file);
    formData.append("email", userObject?.email);
    formData.append("usid", userObject?.usid);
    formData.append("role", userObject?.role);

    uploadPictureMutation.mutate(formData);
  };

  const setUsernameMutation = useCustomMutation({
    endpoint: `auth/set-username`,
    successMessage: (data: any) => data?.message,
    errorMessage: (error: any) => {
      toast.error(error.data.message);
    },
    onSuccessCallback: (data) => {
      const formValues = {
        ...getValues(),
      };
      updateCreatorProfileMutation.mutate(formValues);
    },
  });

  const uploadPictureMutation = useCustomMutation({
    endpoint: `profile/upload-picture`,
    contentType: "multipart/form-data",
    successMessage: (data: any) => data?.message,
    errorMessage: (error: any) => {
      toast.error(error.data.error);
      console.log(error);
    },
    onSuccessCallback: (data) => {
      console.log(data);
      const formValues = {
        ...getValues(),
      };
      updateCreatorProfileMutation.mutate(formValues);
    },
  });

  const updateCreatorProfileMutation = useCustomMutation({
    endpoint: `profile/update-user`,
    method: "put",
    successMessage: (data: any) => data?.message,
    errorMessage: (error: any) => {
      toast.error(error);
    },
    onSuccessCallback: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["/profile/view"],
        exact: false,
      });
    },
  });

  const submitForm = () => {
    const userNameFormValues = {
      email: getValues().email,
      username: getValues().username,
    };
    setUsernameMutation.mutate(userNameFormValues);
  };

  return (
    <div className="mb-2">
      <div className=" relative">
        <div className="relative w-full h-[174px]">
          {" "}
          {/* Parent container with fixed height */}
          <img
            src={profileDetails?.profilePic}
            alt="demo"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img src={editIcon} alt="demo" className="w-6 h-6" />
        </div>
      </div>

      <div className="relative flex items-center justify-between px-4 bg-grey_20 drop-shadow-4xl cursor-pointer">
        <CustomFileUploader
          maxSizeMB={1}
          acceptFormats={["png", "jpeg", "jpg", "gif", "svg"]}
          onFileUpload={handleFileUpload}
          // defaultFile={selectedState?.image}
        />
        {/* <div className="absolute inset-0 flex items-center justify-start mx-14">
          <Image src={editIcon} alt="demo" className="w-6 h-6" />
        </div> */}
        <button
          className="flex items-center cursor-pointer z-10"
          disabled={setUsernameMutation.isPending}
        >
          <div
            onClick={() => submitForm()}
            className="border border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white cursor-pointer"
          >
            {/* <Typography
              variant="subtitle3"
              className="text-blue_500 cursor-pointer"
            >
              Save profile
            </Typography> */}
            {setUsernameMutation.isPending ||
            uploadPictureMutation.isPending ? (
              <div className="flex items-center">
                {/* Loader */}
                <span className="loader mr-2"></span>
                <Typography
                  variant="subtitle3"
                  className="text-blue_500 cursor-not-allowed"
                >
                  Saving...
                </Typography>
              </div>
            ) : (
              <Typography
                variant="subtitle3"
                className="text-blue_500 cursor-pointer"
              >
                Save profile
              </Typography>
            )}
          </div>

          <img
            src={moreIcon}
            alt="horizontalMore"
            className="cursor-pointer"
            loading="lazy"
          />
        </button>
      </div>

      <form className="bg-grey_20 drop-shadow-4xl pt-8 px-4 pb-[61px]">
        <CustomInput
          label="Full Name"
          name="fullName"
          control={control}
          // rules={{ required: "Password is required" }}
        />

        <CustomInput
          label="Display name"
          name="displayName"
          control={control}
          // rules={{ required: "Password is required" }}
        />

        <CustomInput
          label="User name"
          name="username"
          control={control}
          readOnly
          // rules={{ required: "Password is required" }}
        />

        <CustomInput
          label="Gender"
          name="gender"
          control={control}
          // rules={{ required: "Password is required" }}
        />

        <CustomInput
          label="Email"
          name="email"
          control={control}
          readOnly
          // rules={{ required: "Password is required" }}
        />

        <CustomInput
          label="Location"
          name="location"
          control={control}
          placeholder="Location"
          // rules={{ required: "Password is required" }}
        />

        <CustomInput
          label="Interest"
          name="interest"
          control={control}
          placeholder="What are your interests?"
          // rules={{ required: "Password is required" }}
        />

        <CustomTextBox
          label="Bio"
          name="bio"
          control={control}
          placeholder="What are your interests?"
        />

        <CustomInput
          label="Website"
          name="website"
          control={control}
          placeholder="https://"
          // rules={{ required: "Password is required" }}
        />

        <CustomInput
          label="Residence"
          name="residence"
          control={control}
          // placeholder="https://"
          // rules={{ required: "Password is required" }}
        />
      </form>
    </div>
  );
};

export { EditProfile };
