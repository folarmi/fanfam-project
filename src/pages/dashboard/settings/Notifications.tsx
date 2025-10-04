"use client";

import AccountBackButton from "@/components/forms/AccountBackButton";
import CustomSwitchButton from "@/components/forms/CustomSwitchButton";
import Typography from "@/components/forms/Typography";
import { notificationsSettings } from "@/data";
// import { useGetData } from "@/hooks/apiCalls";

const NotificationsSettings = () => {
  // const { data: displaySettingsData, isLoading } = useGetData({
  //   url: `/profile/settings/view/display`,
  //   queryKey: ["ViewDisplaySettings"],
  // });

  return (
    <div>
      <AccountBackButton
        showBack={false}
        showMobileBack
        moduleName="Notifications"
      />

      <section className="mt-4 ml-4">
        {notificationsSettings?.map(({ id, name, desc }) => {
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

              <CustomSwitchButton />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export { NotificationsSettings };
