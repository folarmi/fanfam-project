import Typography from "@components/forms/Typography";
import { accountSettingsModules } from "@/data";
import rightAshArrow from "@/assets/icons/rightAshArrow.svg";
import MobileBackButton from "@components/molecules/MobileBackButton";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import type { UserObject } from "@/lib/types";
import { Loader } from "@/components/molecules/Loader";

const AccountSettings = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const useFetchAccountSettings = (userObject: UserObject) => {
    const mutation = useCustomMutation({
      endpoint: "/profile/settings/account/view",
      onSuccessCallback: () => {},
    });

    return useQuery({
      queryKey: ["accountSettings", userObject.email, userObject.usid],
      queryFn: () =>
        mutation.mutateAsync({
          email: userObject.email,
          role: userObject.role,
          usid: userObject.usid,
        }),
      enabled: !!userObject.email, // Only run if user data exists
    });
  };
  const { isLoading } = useFetchAccountSettings(userObject);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
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
      )}
    </>
  );
};

export { AccountSettings };
