/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import editIcon from "../../../assets/icons/editIcon.svg";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../lib/hook";
import type { RootState } from "../../../lib/store";
import { useForm } from "react-hook-form";
import { useCustomMutation } from "../../../hooks/apiCalls";
import CustomFileUploader from "../../../components/forms/CustomFileUploader";
import Typography from "../../../components/forms/Typography";
import CustomInput from "../../../components/forms/CustomInput";
import { useDebouncedCallback } from "use-debounce";
import CustomTextBox from "../../../components/forms/CustomTextBox";
import { Camera, MoreVertical } from "lucide-react";
import { useFetchProfile } from "@/hooks/apiHooks";
import { Loader } from "@/components/molecules/Loader";

const EditProfile = () => {
  const queryClient = useQueryClient();

  const [, setUploadedFile] = useState<File | null>(null);
  const [bannerImage] = useState(
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=800&h=400&fit=crop"
  );
  const [profileImage] = useState(
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop"
  );
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading } = useFetchProfile(userObject);

  const { control, getValues, reset, setError, clearErrors } = useForm({
    defaultValues: data?.data,
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
    successMessage: () => {
      clearErrors("username");
      return "Username set successfully";
    },
    onError: () => {
      setError("username", {
        message: "Username is already taken",
        type: "manual",
      });
    },
  });

  const uploadPictureMutation = useCustomMutation({
    endpoint: `profile/upload-picture`,
    contentType: "multipart/form-data",
    successMessage: (data: any) => data?.message,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });
    },
  });

  const updateCreatorProfileMutation = useCustomMutation({
    endpoint: `profile/update-user`,
    method: "put",
    successMessage: () => "User Profile updated successfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });
    },
  });

  const submitForm = () => {
    const formValues = {
      ...getValues(),
    };
    updateCreatorProfileMutation.mutate(formValues);
  };

  const handleUserNameBlur = useDebouncedCallback(() => {
    const username = getValues("username");
    const email = getValues("email");

    // Only validate if there is a username, if username isn't empty and has changed and is not empty
    if (
      username &&
      username.trim() !== "" &&
      username !== data?.data?.username
    ) {
      setUsernameMutation.mutate({ email, username });
    } else if (username === data?.data?.username) {
      clearErrors("username");
    }
  }, 500);

  useEffect(() => {
    if (data?.data) {
      const defaults = data.data;
      reset(defaults);
    }
  }, [data?.data, reset]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mb-2">
          <div className="max-w-4xl mx-auto bg-white">
            {/* Banner Section */}
            <div className="relative">
              <div className="relative w-full h-[174px] overflow-hidden bg-gray-200">
                <img
                  src={bannerImage}
                  alt="Banner"
                  className="w-full h-full object-cover"
                />

                {/* Banner Edit Overlay with CustomFileUploader */}
                <CustomFileUploader
                  maxSizeMB={5}
                  acceptFormats={["png", "jpeg", "jpg", "gif", "svg"]}
                  onFileUpload={handleFileUpload}
                  defaultFile={bannerImage}
                  showPreview={false}
                  renderTrigger={(onClick) => (
                    <div
                      onClick={onClick}
                      className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
                        <Camera className="w-6 h-6 text-gray-700" />
                      </div>
                    </div>
                  )}
                />
              </div>

              {/* Profile Picture - Overlapping Banner */}
              <div className="absolute -bottom-16 left-6">
                <div className="relative w-32 h-32">
                  {/* Profile Image Display */}
                  <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
                    <img
                      src={data?.data?.profilePic}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Profile Picture Edit Overlay with CustomFileUploader */}
                  <CustomFileUploader
                    maxSizeMB={1}
                    acceptFormats={["png", "jpeg", "jpg", "gif", "svg"]}
                    onFileUpload={handleFileUpload}
                    defaultFile={profileImage}
                    showPreview={false}
                    renderTrigger={(onClick) => (
                      <div
                        onClick={onClick}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer rounded-full"
                      >
                        <div className="bg-white/90 rounded-full p-2 backdrop-blur-sm">
                          <Camera className="w-5 h-5 text-gray-700" />
                        </div>
                      </div>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-end px-6 py-8 bg-gray-50 border-b">
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center cursor-pointer z-10"
                  disabled={updateCreatorProfileMutation.isPending}
                >
                  <div
                    onClick={() => submitForm()}
                    className="border border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white cursor-pointer"
                  >
                    {updateCreatorProfileMutation.isPending ||
                    uploadPictureMutation.isPending ? (
                      <div className="flex items-center">
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
                </button>

                <button className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                  <MoreVertical className="w-6 h-6 text-gray-600" />
                </button>
              </div>
            </div>
          </div>

          <form className="bg-grey_20 drop-shadow-4xl pt-8 px-4 pb-[61px] mt-3">
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
              onBlur={() => handleUserNameBlur()}
              placeholder="This is your unique username"
              readOnly={data?.data?.username ? true : false}
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
      )}
    </>
  );
};

export { EditProfile };
