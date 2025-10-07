/* eslint-disable @typescript-eslint/no-explicit-any */
import AccountBackButton from "@components/forms/AccountBackButton";
import CollectionRadioButton from "@components/forms/CollectionRadioButton";
import Typography from "@components/forms/Typography";
import { extractDefaults, transformDisplaySettings } from "@/data";
import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";

import type { RootState } from "@/lib/store";
import type { DisplayObject, UserObject } from "@/lib/types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader } from "@/components/molecules/Loader";
import { useForm } from "react-hook-form";
import BlueBorderedButton from "@/components/forms/BlueBorderedButton";

const Display = () => {
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const useFetchDisplaySettings = (userObject: UserObject) => {
    const mutation = useCustomMutation({
      endpoint: "/profile/settings/display/view",
      onSuccessCallback: () => {},
    });

    return useQuery({
      queryKey: ["displaySettings", userObject.email, userObject.usid],
      queryFn: () =>
        mutation.mutateAsync({
          email: userObject.email,
          role: userObject.role,
          usid: userObject.usid,
        }),
      enabled: !!userObject.email,
    });
  };

  const { data, isLoading } = useFetchDisplaySettings(userObject);

  const defaultValues = extractDefaults(
    (data?.data as unknown as DisplayObject) || {
      lightTheme: true,
      darkTheme: false,
      systemTheme: false,
      englishLanguage: true,
      frenchLanguage: false,
      spanishLanguage: false,
    }
  );
  const { control, handleSubmit } = useForm({ defaultValues });

  const updateDisplaySettingsMutation = useCustomMutation({
    endpoint: `profile/settings/display/update`,
    method: "put",
    useQueryParams: true,
    successMessage: (data: any) => data?.message,
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["displaySettings", userObject.email, userObject.usid],
        exact: false,
      });
    },
  });

  const onSubmit = (formData: any) => {
    const theme = formData.Theme?.toUpperCase();
    const language = formData.Language?.toUpperCase();

    const modifiedFormData = {
      theme,
      language,
    };

    updateDisplaySettingsMutation.mutate({
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
            moduleName="Display"
          />

          <form onSubmit={handleSubmit(onSubmit)} className="pl-4 mt-5">
            {transformDisplaySettings(
              (data?.data as unknown as DisplayObject) || {
                lightTheme: false,
                darkTheme: false,
                systemTheme: false,
                englishLanguage: false,
                frenchLanguage: false,
                spanishLanguage: false,
              }
            )?.map(({ items, groupName }) => (
              <div key={groupName} className="mb-3">
                <Typography variant="subtitle2" className="text-grey_800">
                  {groupName}
                </Typography>

                {items?.map(({ id, name }) => (
                  <div
                    key={id}
                    className="flex items-center justify-between py-2 border-b border-grey_10"
                  >
                    <CollectionRadioButton
                      control={control}
                      name={groupName}
                      label={name}
                      value={name}
                    />
                  </div>
                ))}
              </div>
            ))}

            <div className="w-full flex justify-end mt-4">
              <BlueBorderedButton
                className="w-fit cursor-pointer"
                text={
                  updateDisplaySettingsMutation.isPending
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

export { Display };
