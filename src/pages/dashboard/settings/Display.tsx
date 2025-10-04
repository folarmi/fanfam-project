/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import AccountBackButton from "@components/forms/AccountBackButton";
import CollectionRadioButton from "@components/forms/CollectionRadioButton";
import Typography from "@components/forms/Typography";
import { displaySettings } from "@/data";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";

import { useEffect } from "react";
import type { RootState } from "@/lib/store";

const useFetchDisplaySettings = () =>
  useCustomMutation({
    endpoint: "/profile/settings/display/view",
    successMessage: (data: any) =>
      data?.data?.message || "Display settings fetched successfully!",
    errorMessage: (error: any) =>
      error?.response?.data?.message || "Failed to fetch display settings.",
    onSuccessCallback: () => {},
  });

const Display = () => {
  const fetchDisplaySettings = useFetchDisplaySettings();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const handleFetchSettings = () => {
      fetchDisplaySettings.mutate({
        email: userObject.email,
        role: userObject.role,
        usid: userObject.usid,
      });
    };

    handleFetchSettings();
    return () => {};
  }, []);

  const displaySettingsData = fetchDisplaySettings.data?.data;
  console.log(displaySettingsData);
  return (
    <div>
      <AccountBackButton showBack={false} showMobileBack moduleName="Display" />

      <section className="pl-4 mt-5">
        {displaySettings?.map(({ items, groupName }) => {
          return (
            <div key={groupName} className="mb-3">
              <Typography variant="subtitle2" className="text-grey_800">
                {groupName}
              </Typography>

              {items?.map(({ id, name }) => {
                return (
                  <div
                    key={id}
                    className="flex items-center justify-between py-2 border-b border-grey_10"
                  >
                    <Typography variant="p2" className="text-grey_500">
                      {name}
                    </Typography>
                    <CollectionRadioButton />
                  </div>
                );
              })}
            </div>
          );
        })}
      </section>
    </div>
  );
};

export { Display };
