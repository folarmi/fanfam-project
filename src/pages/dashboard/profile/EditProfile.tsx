/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "../../../lib/hook";
import type { RootState } from "../../../lib/store";
import { useForm } from "react-hook-form";
import { useCustomMutation, useFileUpload } from "../../../hooks/apiCalls";
import CustomFileUploader from "../../../components/forms/CustomFileUploader";
import Typography from "../../../components/forms/Typography";
import CustomInput from "../../../components/forms/CustomInput";
import { useDebouncedCallback } from "use-debounce";
import CustomTextBox from "../../../components/forms/CustomTextBox";
import { ArrowLeft, Camera, MoreVertical } from "lucide-react";
import { useFetchProfile } from "@/hooks/apiHooks";
import { Loader } from "@/components/molecules/Loader";
import CustomSelect from "@/components/forms/CustomSelect";
import { genderOptions } from "@/data";
import { showErrorToast } from "@/utils/toastUtils";
import { isEmail } from "@/utils/helper";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [verifiedUsername, setVerifiedUsername] = useState("");

  // const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const { userObject } = useAppSelector((state: RootState) => state.auth);
  const { data, isLoading } = useFetchProfile(userObject);
  const {
    control,
    getValues,
    reset,
    setError,
    clearErrors,
    trigger,
    formState: { isDirty },
  } = useForm({
    defaultValues: data?.data,
  });

  const { mutate: uploadProfilePicture, isPending: profilePictureIsPending } =
    useFileUpload({
      url: "/files/display-picture",
      onSuccess: (data) => {
        const formValues = {
          ...getValues(),
          profileImageUrl: data?.body,
          coverImageUrl: getValues("coverImageUrl"),
        };
        delete formValues?.creatorProfile;
        delete formValues?.profilePic;

        updateCreatorProfileMutation.mutate(formValues);

        return data?.message || "File uploaded successfully!";
      },
      errorToast: (error: any) =>
        error.response?.data?.message || "Upload failed",
    });

  const { mutate: uploadCoverPicture, isPending: coverPictureIsPending } =
    useFileUpload({
      onSuccess: (data) => {
        const formValues = {
          ...getValues(),
          coverImageUrl: data?.body?.url,
          profileImageUrl: getValues("profilePic"),
        };
        delete formValues?.creatorProfile;
        delete formValues?.profilePic;
        updateCreatorProfileMutation.mutate(formValues);
        return data?.message || "File uploaded successfully!";
      },
      errorToast: (error: any) =>
        error.response?.data?.message || "Upload failed",
    });

  const handleProfilePictureUpload = (file: File) => {
    uploadProfilePicture({
      file,
      extraData: {
        usid: userObject?.usid,
      },
    });
  };

  const handleCoverPictureUpload = (file: File) => {
    uploadCoverPicture({
      file,
      extraData: {
        usid: userObject?.usid,
      },
    });
  };

  const handleUploadClickWrapper = (onClick: () => void) => {
    const isProfileComplete =
      data?.data?.fullName &&
      data?.data?.username &&
      data?.data?.gender &&
      data?.data?.location;

    if (!isProfileComplete) {
      showErrorToast(
        "Please complete and save your profile information first.",
      );
      return;
    }

    if (isDirty) {
      showErrorToast(
        "Please save your profile changes before uploading images.",
      );
      return;
    }

    onClick();
  };

  const handleBackToProfile = () => {
    navigate("/dashboard/profile");
  };

  // const setUsernameMutation = useCustomMutation({
  //   endpoint: `auth/set-username`,
  //   successMessage: () => {
  //     clearErrors("username");
  //     return "Username set successfully";
  //   },
  // });

  const setUsernameMutation = useCustomMutation({
    endpoint: `auth/set-username`,

    successMessage: () => "Username set successfully",

    onSuccessCallback: () => {
      clearErrors("username");
      setVerifiedUsername(getValues("username"));
    },

    onError: (error: any) => {
      setVerifiedUsername("");

      const status = error?.response?.status;
      const message = error?.response?.data?.message;

      if (status === 401) {
        setError("username", {
          type: "manual",
          message: "Your session has expired. Please log in again.",
        });
        return;
      }

      setError("username", {
        type: "manual",
        message:
          message || "We could not verify this username. Please try again.",
      });
    },
  });

  const updateCreatorProfileMutation = useCustomMutation({
    endpoint: `profile/update-user`,
    method: "put",
    successMessage: () => "User Profile updated successfully",
    onSuccessCallback: (data) => {
      console.log("on update profile", data);
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });
      reset();
    },
  });

  const submitForm = async () => {
    const isValid = await trigger(); // triggers validation for all fields

    if (!isValid) {
      return;
    }
    const formValues = {
      ...getValues(),
      profileImageUrl: data?.data?.profilePic,
    };
    delete formValues?.creatorProfile;

    updateCreatorProfileMutation.mutate(formValues);
  };

  const handleUserNameBlur = useDebouncedCallback(() => {
    const username = getValues("username");
    const email = getValues("email");

    setVerifiedUsername("");

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

  const username = data?.data?.username;
  const usernameIsEmail = isEmail(username);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mb-2">
          <div className="max-w-4xl mx-auto">
            <div className="sticky top-0 z-50 bg-white">
              <div className="relative">
                <div className="relative w-full h-[174px] overflow-hidden bg-gray-200">
                  <img
                    src={data?.data?.coverImageUrl}
                    alt="Banner"
                    className="w-full h-full object-cover"
                  />

                  {/* Banner Edit Overlay with CustomFileUploader */}
                  <CustomFileUploader
                    maxSizeMB={5}
                    acceptFormats={["png", "jpeg", "jpg", "gif", "svg"]}
                    onFileUpload={handleCoverPictureUpload}
                    showPreview={false}
                    renderTrigger={(onClick) => (
                      <div
                        onClick={() => handleUploadClickWrapper(onClick)}
                        className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                      >
                        <div className="bg-white/90 rounded-full p-3 backdrop-blur-sm">
                          <Camera className="w-6 h-6 text-gray-700" />
                        </div>
                      </div>
                    )}
                  />
                </div>

                <div className="absolute -bottom-16 left-6">
                  <div className="relative w-32 h-32">
                    <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
                      <img
                        src={data?.data?.profileImageUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <CustomFileUploader
                      maxSizeMB={1}
                      acceptFormats={["png", "jpeg", "jpg", "gif", "svg"]}
                      onFileUpload={handleProfilePictureUpload}
                      showPreview={false}
                      renderTrigger={(onClick) => (
                        <div
                          onClick={() => handleUploadClickWrapper(onClick)}
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

              <div className="flex items-center justify-end px-6 py-8 bg-gray-50 border-b">
                <button
                  type="button"
                  onClick={handleBackToProfile}
                  className="group flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-3 py-1.5 pr-4 shadow-sm transition-all duration-200 hover:border-blue_500/40 hover:shadow-md active:scale-[0.97]"
                  aria-label="Back to profile"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue_50 transition-all duration-200 group-hover:bg-blue_500 group-hover:-translate-x-0.5">
                    <ArrowLeft className="h-3.5 w-3.5 text-blue_500 transition-colors duration-200 group-hover:text-white" />
                  </span>

                  <Typography
                    variant="subtitle3"
                    className="text-gray-700 group-hover:text-blue_500 transition-colors"
                  >
                    Back to profile
                  </Typography>
                </button>

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
                      profilePictureIsPending ||
                      coverPictureIsPending ||
                      setUsernameMutation.isPending ? (
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
                required
                rules={{
                  required: "Full name is required",
                  validate: (value: string) =>
                    value.trim().split(/\s+/).length >= 2 ||
                    "Please enter your first and last name",
                }}
              />

              <CustomInput
                label="Display name"
                name="displayName"
                control={control}
              />

              {/* <CustomInput
                label="User name"
                name="username"
                control={control}
                onBlur={() => handleUserNameBlur()}
                placeholder="This is your unique username"
                readOnly={Boolean(username) && !usernameIsEmail}
                isVerified={setUsernameMutation.isSuccess}
                rules={{ required: "Username is required" }}
              /> */}

              <CustomInput
                label="User name"
                name="username"
                control={control}
                onBlur={() => handleUserNameBlur()}
                placeholder="This is your unique username"
                readOnly={Boolean(username) && !usernameIsEmail}
                isVerified={
                  Boolean(verifiedUsername) &&
                  verifiedUsername === getValues("username") &&
                  !setUsernameMutation.isPending
                }
                rules={{ required: "Username is required" }}
              />

              <CustomSelect
                name="gender"
                options={genderOptions}
                control={control}
                label="Gender"
                ifLabel
                rules={{ required: "Gender is required" }}
              />

              <CustomInput
                label="Email"
                name="email"
                control={control}
                readOnly
              />

              <CustomInput
                label="Location"
                name="location"
                control={control}
                placeholder="Location"
                rules={{ required: "Location is required" }}
              />

              <CustomInput
                label="Interest"
                name="interest"
                control={control}
                placeholder="What are your interests?"
              />

              <CustomTextBox
                label="Bio"
                name="bio"
                control={control}
                placeholder="What are your interests?"
                rules={{
                  maxLength: {
                    value: 255,
                    message: "Bio must not exceed 255 characters",
                  },
                }}
              />
              {/* 
              <CustomInput
                label="Website"
                name="website"
                control={control}
                placeholder="https://"
              /> */}

              <CustomInput
                label="Residence"
                name="residence"
                control={control}
              />
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export { EditProfile };
