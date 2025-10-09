/* eslint-disable @typescript-eslint/no-explicit-any */
import AccountBackButton from "@components/forms/AccountBackButton";
import CustomSwitchButton from "@components/forms/CustomSwitchButton";
import Typography from "@components/forms/Typography";
import {
  buildFormDefaults,
  buildPrivacyAndSafetyItems,
  privacyAndSafety,
} from "@/data";
// import { useGetData } from "@/hooks/apiCalls";
import rightArrow from "@/assets/icons/rightAshArrow.svg";

import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import type { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/hook";
import { useFetchPrivacyAndSafetySettings } from "@/hooks/apiHooks";
import { Loader } from "@/components/molecules/Loader";
import { useEffect } from "react";
import { useSettingsMutation } from "@/hooks/useSettingsMutation";
import BlueBorderedButton from "@/components/forms/BlueBorderedButton";

const Privacy = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {},
  });
  const { data, isLoading } = useFetchPrivacyAndSafetySettings(userObject);

  useEffect(() => {
    if (data?.data) {
      const defaults = buildFormDefaults(data.data);
      reset(defaults);
    }
  }, [data?.data, reset]);

  const updateNotificationsMutation = useSettingsMutation({
    settingsPath: "notification",
    queryKeyPrefix: "notificationSettings",
  });

  const onSubmit = (formData: any) => {
    const theme = formData.Theme?.toUpperCase();
    const language = formData.Language?.toUpperCase();

    // const modifiedFormData = {
    //   theme,
    //   language,
    // };

    updateNotificationsMutation.mutate({
      body: {
        email: userObject.email,
        usid: userObject.usid,
        role: userObject.role,
      },
    });
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <AccountBackButton
            showBack={false}
            showMobileBack
            moduleName="Privacy and Safety"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-2 ml-4">
            {buildPrivacyAndSafetyItems?.(data?.data)?.map(
              ({ groupName, items }) => {
                return (
                  <div key={groupName}>
                    <Typography
                      variant="subtitle2"
                      className="text-grey_800 pt-2"
                    >
                      {groupName}
                    </Typography>

                    {items?.map(({ id, name, key }) => {
                      return (
                        <div
                          key={id}
                          className="flex items-center justify-between my-2 border-b border-grey_10"
                        >
                          <Typography variant="p2" className="text-grey_500">
                            {name}
                          </Typography>

                          <CustomSwitchButton
                            name={key}
                            control={control}
                            label=""
                          />
                        </div>
                      );
                    })}
                  </div>
                );
              }
            )}

            <Typography variant="subtitle2" className="text-grey_800 pt-2">
              Safety
            </Typography>

            {privacyAndSafety?.map(({ id, name, path }) => {
              return (
                <Link
                  key={id}
                  to={path}
                  className="flex items-center justify-between my-2 border-b border-grey_10 cursor-pointer"
                >
                  <Typography variant="p2" className="text-grey_500">
                    {name}
                  </Typography>

                  <img src={rightArrow} alt="rightArrow" />
                </Link>
              );
            })}

            <Typography variant="subtitle2" className="text-grey_800 pt-2">
              Enable DRM video protection
            </Typography>
            <div className="flex items-center justify-between my-2 border-b border-grey_10 mb-4">
              <Typography variant="p2" className="text-grey_500">
                DRM protection helps to protect video content from being copied
                or downloaded. After you enable it, DRM protection will be
                applied to uploads after that date.
              </Typography>

              <CustomSwitchButton name="" control={control} label="" />
            </div>

            <div className="w-full flex justify-end mt-4">
              <BlueBorderedButton
                className="w-fit cursor-pointer"
                text={
                  updateNotificationsMutation.isPending
                    ? "Saving..."
                    : "Save changes"
                }
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export { Privacy };
