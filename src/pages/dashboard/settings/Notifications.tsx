/* eslint-disable @typescript-eslint/no-explicit-any */
import AccountBackButton from "@/components/forms/AccountBackButton";
import BlueBorderedButton from "@/components/forms/BlueBorderedButton";
import CustomSwitchButton from "@/components/forms/CustomSwitchButton";
import Typography from "@/components/forms/Typography";
import { Loader } from "@/components/molecules/Loader";
import { buildNotificationSettings } from "@/data";
import { useFetchNotificationSettings } from "@/hooks/apiHooks";
import { useSettingsMutation } from "@/hooks/useSettingsMutation";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const NotificationsSettings = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { data, isLoading } = useFetchNotificationSettings(userObject);
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      mentioned: "",
      inAppNotification: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      const defaults = {
        email: data.data.email ?? true,
        mentioned: data.data.mentioned ?? false,
        inAppNotification: data.data.inAppNotification ?? true,
      };
      reset(defaults);
    }
  }, [data?.data, reset]);

  const updateNotificationSettingsMutation = useSettingsMutation({
    settingsPath: "notification",
    queryKeyPrefix: "notificationSettings",
  });

  const onSubmit = (formData: any) => {
    console.log(formData);

    const modifiedFormData = {
      email: formData?.email,
      mentioned: formData?.mentioned,
      inAppNotification: formData?.inAppNotification,
    };

    updateNotificationSettingsMutation.mutate({
      params: modifiedFormData,
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
            moduleName="Notifications"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="mt-4 ml-4">
            {buildNotificationSettings(data?.data)?.map(
              ({ id, key, name, desc }) => {
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between mb-6 border-b border-grey_10 pb-4"
                  >
                    <div>
                      <Typography
                        variant="subtitle2"
                        className="text-grey_800 pb-[2px]"
                      >
                        {name}
                      </Typography>
                      <Typography variant="p2" className="text-grey_500">
                        {desc}
                      </Typography>
                    </div>

                    <CustomSwitchButton name={key} control={control} />
                  </div>
                );
              }
            )}

            <div className="w-full flex justify-end mt-4">
              <BlueBorderedButton
                className="w-fit cursor-pointer"
                text={
                  updateNotificationSettingsMutation.isPending
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

export { NotificationsSettings };
