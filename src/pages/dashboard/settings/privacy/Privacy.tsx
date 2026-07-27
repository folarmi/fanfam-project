// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import AccountBackButton from "@components/forms/AccountBackButton";
// import CustomSwitchButton from "@components/forms/CustomSwitchButton";
// import Typography from "@components/forms/Typography";
// import {
//   buildFormDefaults,
//   buildPrivacyAndSafetyItems,
//   privacyAndSafety,
// } from "@/data";
// // import { useGetData } from "@/hooks/apiCalls";
// import rightArrow from "@/assets/icons/rightAshArrow.svg";

// import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import type { RootState } from "@/lib/store";
// import { useAppSelector } from "@/lib/hook";
// import { useFetchPrivacyAndSafetySettings } from "@/hooks/apiHooks";
// import { Loader } from "@/components/molecules/Loader";
// import { useEffect } from "react";
// import { useSettingsMutation } from "@/hooks/useSettingsMutation";
// import BlueBorderedButton from "@/components/forms/BlueBorderedButton";

// const Privacy = () => {
//   const { userObject } = useAppSelector((state: RootState) => state.auth);

//   const { control, reset, handleSubmit } = useForm({
//     defaultValues: {},
//   });
//   const { data, isLoading } = useFetchPrivacyAndSafetySettings(userObject);

//   useEffect(() => {
//     if (data?.data) {
//       const defaults = buildFormDefaults(data.data);
//       reset(defaults);
//     }
//   }, [data?.data, reset]);

//   const updateNotificationsMutation = useSettingsMutation({
//     settingsPath: "privacy-safety",
//     queryKeyPrefix: "privacySafetySettings",
//     method: "post",
//   });

//   const onSubmit = (data: any) => {
//     updateNotificationsMutation.mutate({
//       params: data,
//       body: {
//         email: userObject.email,
//         usid: userObject.usid,
//         role: userObject.role,
//       },
//     });
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           {/* <AccountBackButton
//             showBack={false}
//             showMobileBack
//             moduleName="Privacy and Safety"
//           /> */}

//           <form onSubmit={handleSubmit(onSubmit)} className="mt-2 ml-4">
//             {buildPrivacyAndSafetyItems?.(data?.data)?.map(
//               ({ groupName, items }) => {
//                 return (
//                   <div key={groupName}>
//                     <Typography
//                       variant="subtitle2"
//                       className="text-grey_800 pt-2"
//                     >
//                       {groupName}
//                     </Typography>

//                     {items?.map(({ id, name, key }) => {
//                       return (
//                         <div
//                           key={id}
//                           className="flex items-center justify-between my-2 border-b border-grey_10"
//                         >
//                           <Typography variant="p2" className="text-grey_500">
//                             {name}
//                           </Typography>

//                           <CustomSwitchButton
//                             name={key}
//                             control={control}
//                             label=""
//                           />
//                         </div>
//                       );
//                     })}
//                   </div>
//                 );
//               },
//             )}

//             <Typography variant="subtitle2" className="text-grey_800 pt-2">
//               Safety
//             </Typography>

//             {privacyAndSafety?.map(({ id, name, path }) => {
//               return (
//                 <Link
//                   key={id}
//                   to={path}
//                   className="flex items-center justify-between my-2 border-b border-grey_10 cursor-pointer"
//                 >
//                   <Typography variant="p2" className="text-grey_500">
//                     {name}
//                   </Typography>

//                   <img src={rightArrow} alt="rightArrow" />
//                 </Link>
//               );
//             })}

//             <Typography variant="subtitle2" className="text-grey_800 pt-2">
//               Enable DRM video protection
//             </Typography>
//             <div className="flex items-center justify-between my-2 border-b border-grey_10 mb-4">
//               <Typography variant="p2" className="text-grey_500">
//                 DRM protection helps to protect video content from being copied
//                 or downloaded. After you enable it, DRM protection will be
//                 applied to uploads after that date.
//               </Typography>

//               <CustomSwitchButton name="" control={control} label="" />
//             </div>

//             <div className="w-full flex justify-end mt-4">
//               <BlueBorderedButton
//                 className="w-fit cursor-pointer"
//                 text={
//                   updateNotificationsMutation.isPending
//                     ? "Saving..."
//                     : "Save changes"
//                 }
//                 type="submit"
//               />
//             </div>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export { Privacy };

/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomSwitchButton from "@components/forms/CustomSwitchButton";
import Typography from "@components/forms/Typography";
import {
  buildFormDefaults,
  buildPrivacyAndSafetyItems,
  privacyAndSafety,
} from "@/data";
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
    settingsPath: "privacy-safety",
    queryKeyPrefix: "privacySafetySettings",
    method: "post",
  });

  const onSubmit = (formData: any) => {
    updateNotificationsMutation.mutate({
      params: formData,
      body: {
        email: userObject?.email,
        usid: userObject?.usid,
        role: userObject?.role,
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[800px] px-4 pb-8 pt-2 sm:px-6 md:px-0"
      >
        {buildPrivacyAndSafetyItems?.(data?.data)?.map(
          ({ groupName, items }) => (
            <section key={groupName} className="mb-6">
              <Typography
                variant="subtitle2"
                className="pb-2 pt-2 text-grey_800"
              >
                {groupName}
              </Typography>

              <div className="overflow-hidden rounded-lg border border-grey_10 bg-white">
                {items?.map(({ id, name, key }, index) => (
                  <div
                    key={id}
                    className={`flex min-h-14 items-center justify-between gap-4 px-4 py-3 ${
                      index !== items.length - 1
                        ? "border-b border-grey_10"
                        : ""
                    }`}
                  >
                    <Typography
                      variant="p2"
                      className="min-w-0 flex-1 break-words pr-2 text-sm leading-5 text-grey_500 sm:text-base"
                    >
                      {name}
                    </Typography>

                    <div className="shrink-0">
                      <CustomSwitchButton
                        name={key}
                        control={control}
                        label=""
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ),
        )}

        <section className="mb-6">
          <Typography variant="subtitle2" className="pb-2 pt-2 text-grey_800">
            Safety
          </Typography>

          <div className="overflow-hidden rounded-lg border border-grey_10 bg-white">
            {privacyAndSafety?.map(({ id, name, path }, index) => (
              <Link
                key={id}
                to={path}
                className={`flex min-h-14 items-center justify-between gap-4 px-4 py-3 transition-colors hover:bg-grey_20 ${
                  index !== privacyAndSafety.length - 1
                    ? "border-b border-grey_10"
                    : ""
                }`}
              >
                <Typography
                  variant="p2"
                  className="min-w-0 flex-1 break-words text-sm text-grey_500 sm:text-base"
                >
                  {name}
                </Typography>

                <img
                  src={rightArrow}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 shrink-0"
                />
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-6">
          <Typography variant="subtitle2" className="pb-2 pt-2 text-grey_800">
            Enable DRM video protection
          </Typography>

          <div className="rounded-lg border border-grey_10 bg-white px-4 py-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <Typography
                variant="p2"
                className="min-w-0 flex-1 break-words text-sm leading-6 text-grey_500"
              >
                DRM protection helps protect video content from being copied or
                downloaded. After you enable it, DRM protection will apply to
                uploads made after that date.
              </Typography>

              <div className="shrink-0 self-end sm:self-start">
                <CustomSwitchButton
                  name="drmProtection"
                  control={control}
                  label=""
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex w-full justify-stretch pt-2 sm:justify-end">
          <BlueBorderedButton
            className="w-full cursor-pointer sm:w-fit"
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
  );
};

export { Privacy };
