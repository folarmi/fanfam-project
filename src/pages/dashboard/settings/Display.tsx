// /* eslint-disable @typescript-eslint/no-explicit-any */
// // import AccountBackButton from "@components/forms/AccountBackButton";
// import CollectionRadioButton from "@components/forms/CollectionRadioButton";
// import Typography from "@components/forms/Typography";
// import { extractDefaults, transformDisplaySettings } from "@/data";
// import { useAppSelector } from "@/lib/hook";
// import type { RootState } from "@/lib/store";
// import type { DisplayObject } from "@/lib/types";
// import { Loader } from "@/components/molecules/Loader";
// import { useForm } from "react-hook-form";
// import BlueBorderedButton from "@/components/forms/BlueBorderedButton";
// import { useFetchDisplaySettings } from "@/hooks/apiHooks";
// import { useEffect } from "react";
// import { useSettingsMutation } from "@/hooks/useSettingsMutation";

// const Display = () => {
//   const { userObject } = useAppSelector((state: RootState) => state.auth);

//   const { data, isLoading, error } = useFetchDisplaySettings(userObject);

//   const { control, handleSubmit, reset } = useForm({
//     defaultValues: {
//       Theme: "",
//       Language: "",
//     },
//   });

//   useEffect(() => {
//     if (data?.data) {
//       const defaults = extractDefaults(data.data as DisplayObject);
//       reset(defaults);
//     }
//   }, [data?.data, reset]);

//   const updateDisplaySettingsMutation = useSettingsMutation({
//     settingsPath: "display",
//     queryKeyPrefix: "displaySettings",
//   });

//   const onSubmit = (formData: any) => {
//     const theme = formData.Theme?.toUpperCase();
//     const language = formData.Language?.toUpperCase();

//     const modifiedFormData = {
//       theme,
//       language,
//     };

//     updateDisplaySettingsMutation.mutate({
//       params: modifiedFormData,
//       body: {
//         email: userObject.email,
//         usid: userObject.usid,
//         role: userObject.role,
//       },
//     });
//   };

//   if (error) {
//     return (
//       <div className="p-4 bg-red-50 border border-red-200 rounded">
//         <Typography variant="subtitle2" className="text-red-700 mb-1">
//           Failed to load settings
//         </Typography>
//         <Typography variant="p3" className="text-red-600 mb-3">
//           {error?.message || "An unexpected error occurred"}
//         </Typography>
//         <button
//           // onClick={() => refetch()}
//           className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
//         >
//           Retry
//         </button>
//       </div>
//     );
//   }

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           {/* <AccountBackButton
//             showBack={false}
//             showMobileBack
//             moduleName="Display"
//           /> */}

//           <form onSubmit={handleSubmit(onSubmit)} className="pl-4 mt-5">
//             {transformDisplaySettings(
//               (data?.data as unknown as DisplayObject) || {
//                 lightTheme: false,
//                 darkTheme: false,
//                 systemTheme: false,
//                 englishLanguage: false,
//                 frenchLanguage: false,
//                 spanishLanguage: false,
//               },
//             )?.map(({ items, groupName }) => (
//               <div key={groupName} className="mb-3">
//                 <Typography variant="subtitle2" className="text-grey_800">
//                   {groupName}
//                 </Typography>

//                 {items?.map(({ id, name }) => (
//                   <div
//                     key={id}
//                     className="flex items-center justify-between py-2 border-b border-grey_10"
//                   >
//                     <CollectionRadioButton
//                       control={control}
//                       name={groupName}
//                       label={name}
//                       value={name}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ))}

//             <div className="w-full flex justify-end mt-4">
//               <BlueBorderedButton
//                 className="w-fit cursor-pointer"
//                 text={
//                   updateDisplaySettingsMutation.isPending
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

// export { Display };

/* eslint-disable @typescript-eslint/no-explicit-any */
import CollectionRadioButton from "@components/forms/CollectionRadioButton";
import Typography from "@components/forms/Typography";
import { extractDefaults, transformDisplaySettings } from "@/data";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type { DisplayObject } from "@/lib/types";
import { Loader } from "@/components/molecules/Loader";
import { useForm } from "react-hook-form";
import BlueBorderedButton from "@/components/forms/BlueBorderedButton";
import { useFetchDisplaySettings } from "@/hooks/apiHooks";
import { useEffect } from "react";
import { useSettingsMutation } from "@/hooks/useSettingsMutation";

const Display = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { data, isLoading, error } = useFetchDisplaySettings(userObject);

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      Theme: "",
      Language: "",
    },
  });

  useEffect(() => {
    if (data?.data) {
      const defaults = extractDefaults(data.data as DisplayObject);

      reset(defaults);
    }
  }, [data?.data, reset]);

  const updateDisplaySettingsMutation = useSettingsMutation({
    settingsPath: "display",
    queryKeyPrefix: "displaySettings",
  });

  const onSubmit = (formData: any) => {
    const modifiedFormData = {
      theme: formData.Theme?.toUpperCase(),
      language: formData.Language?.toUpperCase(),
    };

    updateDisplaySettingsMutation.mutate({
      params: modifiedFormData,
      body: {
        email: userObject?.email,
        usid: userObject?.usid,
        role: userObject?.role,
      },
    });
  };

  if (error) {
    return (
      <div className="mx-4 mt-4 rounded-lg border border-red-200 bg-red-50 p-4 sm:mx-6 md:mx-0">
        <Typography variant="subtitle2" className="mb-1 text-red-700">
          Failed to load settings
        </Typography>

        <Typography variant="p3" className="mb-3 break-words text-red-600">
          {error?.message || "An unexpected error occurred"}
        </Typography>

        <button
          type="button"
          className="w-full rounded bg-red-600 px-4 py-2 text-white transition-colors hover:bg-red-700 sm:w-fit"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Loader />
      </div>
    );
  }

  const displaySettings = transformDisplaySettings(
    (data?.data as unknown as DisplayObject) || {
      lightTheme: false,
      darkTheme: false,
      systemTheme: false,
      englishLanguage: false,
      frenchLanguage: false,
      spanishLanguage: false,
    },
  );

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mx-auto w-full max-w-[800px] px-4 pb-8 pt-4 sm:px-6 md:px-0"
      >
        {displaySettings?.map(({ items, groupName }) => (
          <section key={groupName} className="mb-6">
            <Typography variant="subtitle2" className="mb-2 text-grey_800">
              {groupName}
            </Typography>

            <div className="overflow-hidden rounded-lg border border-grey_10 bg-white">
              {items?.map(({ id, name }, index) => (
                <div
                  key={id}
                  className={`flex min-h-14 items-center px-4 py-3 ${
                    index !== items.length - 1 ? "border-b border-grey_10" : ""
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <CollectionRadioButton
                      control={control}
                      name={groupName}
                      label={name}
                      value={name}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        <div className="flex w-full justify-stretch pt-2 sm:justify-end">
          <BlueBorderedButton
            className="w-full cursor-pointer sm:w-fit"
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
  );
};

export { Display };
