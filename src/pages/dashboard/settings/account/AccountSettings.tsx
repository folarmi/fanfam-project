/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */

import Typography from "@components/forms/Typography";
import { accountSettingsModules } from "@/data";
import { useEffect } from "react";
import rightAshArrow from "@/assets/icons/rightAshArrow.svg";
import MobileBackButton from "@components/molecules/MobileBackButton";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { Link } from "react-router-dom";

const useFetchAccountSettings = () =>
  useCustomMutation({
    endpoint: "/profile/settings/account/view",
    successMessage: (data: any) =>
      data?.data?.message || "Account settings fetched successfully!",
    errorMessage: (error: any) =>
      error?.response?.data?.message || "Failed to fetch account settings.",
    onSuccessCallback: () => {},
  });

const AccountSettings = () => {
  const fetchDisplaySettings = useFetchAccountSettings();
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

  return (
    <div>
      <div
        className="w-full bg-white h-12 px-4 border
     border-grey_20 shadow-custom-combined mb-2"
      >
        <MobileBackButton moduleName="Account" />
      </div>

      {accountSettingsModules?.map(({ groupName, items }) => {
        return (
          <div key={groupName} className={`cursor-pointer px-4 pt-2`}>
            <div>
              <Typography variant="subtitle2" className="text-grey_800">
                {groupName}
              </Typography>
            </div>

            {items?.map(({ id, name, path }) => {
              return (
                <Link
                  key={id}
                  className={`flex items-center justify-between cursor-pointer py-3 border-b border-grey_10 hover:bg-blue_200`}
                  to={path}
                >
                  <div>
                    <Typography variant="p2" className="text-grey_500">
                      {name}
                    </Typography>
                  </div>

                  <img
                    src={rightAshArrow}
                    alt="rightAshArrow"
                    className="w-6 h-6"
                  />
                </Link>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export { AccountSettings };
