// // import { useEffect } from "react";
// // import { useForm } from "react-hook-form";
// // import {
// //   CheckCircle2,
// //   FileCheck2,
// //   Loader2,
// //   ScanFace,
// //   ShieldCheck,
// // } from "lucide-react";

// // import CustomInput from "@/components/forms/CustomInput";
// // import { useDidit } from "@/hooks/useDidit";
// // import { useAppSelector } from "@/lib/hook";
// // import type { RootState } from "@/lib/store";
// // import { useFetchProfile } from "@/hooks/apiHooks";

// // type KycFormValues = {
// //   email: string;
// //   firstname: string;
// //   lastname: string;
// // };

// // const KycVerification = () => {
// //   const { userObject } = useAppSelector((state: RootState) => state.auth);
// //   const myProfileQuery = useFetchProfile(userObject, true);

// //   console.log(myProfileQuery);
// //   const { startDiditKyc, isStartingDiditKyc } = useDidit();

// //   const { control, getValues, reset } = useForm<KycFormValues>({
// //     defaultValues: {
// //       email: "",
// //       firstname: "",
// //       lastname: "",
// //     },
// //   });

// //   useEffect(() => {
// //     if (!userObject) return;

// //     reset({
// //       email: userObject.email ?? "",
// //       firstname: userObject.firstname ?? "",
// //       lastname: userObject.lastname ?? "",
// //     });
// //   }, [userObject, reset]);

// //   const handleStartVerification = () => {
// //     const { email, firstname, lastname } = getValues();

// //     if (!email || !firstname || !lastname) return;

// //     startDiditKyc({
// //       email,
// //       firstname,
// //       lastname,
// //       cbUrl: `${window.location.origin}${window.location.pathname}`,
// //     });
// //   };

// //   const isUserInformationComplete =
// //     Boolean(userObject?.email) &&
// //     Boolean(userObject?.firstname) &&
// //     Boolean(userObject?.lastname);

// //   return (
// //     <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
// //       <div className="border-b border-gray-100 bg-blue-50 px-6 py-6 sm:px-8">
// //         <div className="flex items-start gap-4">
// //           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-600 text-white">
// //             <ShieldCheck className="h-6 w-6" />
// //           </div>

// //           <div>
// //             <h2 className="text-xl font-semibold text-gray-900">
// //               Identity Verification
// //             </h2>

// //             <p className="mt-1 text-sm leading-6 text-gray-600">
// //               Confirm your details and complete a secure identity check to
// //               unlock all account features.
// //             </p>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="space-y-7 px-6 py-7 sm:px-8">
// //         <div>
// //           <h3 className="text-sm font-semibold text-gray-900">
// //             Personal information
// //           </h3>

// //           <p className="mt-1 text-sm text-gray-500">
// //             These details were retrieved from your profile and cannot be edited
// //             here.
// //           </p>
// //         </div>

// //         <div className="grid gap-4 sm:grid-cols-2">
// //           <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
// //             <CustomInput
// //               label="First name"
// //               name="firstname"
// //               control={control}
// //               readOnly
// //               rules={{ required: "First name is required" }}
// //             />
// //           </div>

// //           <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
// //             <CustomInput
// //               label="Last name"
// //               name="lastname"
// //               control={control}
// //               readOnly
// //               rules={{ required: "Last name is required" }}
// //             />
// //           </div>

// //           <div className="sm:col-span-2 [&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
// //             <CustomInput
// //               label="Email address"
// //               name="email"
// //               control={control}
// //               readOnly
// //               rules={{ required: "Email is required" }}
// //             />
// //           </div>
// //         </div>

// //         {!isUserInformationComplete && (
// //           <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
// //             Your first name, last name, and email must be added to your profile
// //             before you can begin verification.
// //           </div>
// //         )}

// //         <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
// //           <h3 className="text-sm font-semibold text-gray-900">
// //             What you will need
// //           </h3>

// //           <div className="mt-4 space-y-4">
// //             <div className="flex items-start gap-3">
// //               <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
// //               <div>
// //                 <p className="text-sm font-medium text-gray-800">
// //                   A valid government-issued ID
// //                 </p>
// //                 <p className="mt-0.5 text-xs text-gray-500">
// //                   Passport, national ID card, or driving licence.
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex items-start gap-3">
// //               <ScanFace className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
// //               <div>
// //                 <p className="text-sm font-medium text-gray-800">
// //                   A facial verification check
// //                 </p>
// //                 <p className="mt-0.5 text-xs text-gray-500">
// //                   Make sure your face is visible and you are in a well-lit area.
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="flex items-start gap-3">
// //               <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
// //               <div>
// //                 <p className="text-sm font-medium text-gray-800">
// //                   A camera-enabled device
// //                 </p>
// //                 <p className="mt-0.5 text-xs text-gray-500">
// //                   You will be asked to allow camera access.
// //                 </p>
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         <button
// //           type="button"
// //           onClick={handleStartVerification}
// //           disabled={isStartingDiditKyc || !isUserInformationComplete}
// //           className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
// //         >
// //           {isStartingDiditKyc && <Loader2 className="h-4 w-4 animate-spin" />}

// //           {isStartingDiditKyc
// //             ? "Preparing verification..."
// //             : "Start identity verification"}
// //         </button>

// //         <p className="text-center text-xs text-gray-400">
// //           Your verification is securely processed by Didit.
// //         </p>
// //       </div>
// //     </div>
// //   );
// // };

// // export default KycVerification;

// import { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import {
//   CheckCircle2,
//   FileCheck2,
//   Loader2,
//   ScanFace,
//   ShieldCheck,
// } from "lucide-react";

// import CustomInput from "@/components/forms/CustomInput";
// import { useFetchProfile } from "@/hooks/apiHooks";
// import { useDidit } from "@/hooks/useDidit";
// import { useAppSelector } from "@/lib/hook";
// import type { RootState } from "@/lib/store";

// type KycFormValues = {
//   email: string;
//   firstname: string;
//   lastname: string;
// };

// const KycVerification = () => {
//   const { userObject } = useAppSelector((state: RootState) => state.auth);

//   const myProfileQuery = useFetchProfile(userObject, Boolean(userObject));
//   const profile = myProfileQuery.data?.data;

//   const fullName = profile?.fullName?.trim() ?? "";
//   const nameParts = fullName.split(/\s+/).filter(Boolean);

//   const firstname = nameParts[0] ?? "";
//   const lastname = nameParts.slice(1).join(" ");

//   const { startDiditKyc, isStartingDiditKyc } = useDidit();

//   const { control, getValues, reset } = useForm<KycFormValues>({
//     defaultValues: {
//       email: "",
//       firstname: "",
//       lastname: "",
//     },
//   });

//   useEffect(() => {
//     if (!profile) return;

//     reset({
//       email: profile.email ?? "",
//       firstname,
//       lastname,
//     });
//   }, [profile, firstname, lastname, reset]);

//   const handleStartVerification = () => {
//     const values = getValues();

//     if (!values.email || !values.firstname || !values.lastname) return;

//     startDiditKyc({
//       email: values.email,
//       firstname: values.firstname,
//       lastname: values.lastname,
//       cbUrl: `${window.location.origin}${window.location.pathname}`,
//     });
//   };

//   const isProfileComplete =
//     Boolean(profile?.email) && Boolean(firstname) && Boolean(lastname);

//   if (myProfileQuery.isLoading) {
//     return (
//       <div className="flex min-h-64 items-center justify-center">
//         <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
//       <div className="border-b border-gray-100 bg-blue-50 px-6 py-6 sm:px-8">
//         <div className="flex items-start gap-4">
//           <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
//             <ShieldCheck className="h-6 w-6" />
//           </div>

//           <div>
//             <h2 className="text-xl font-semibold text-gray-900">
//               Identity Verification
//             </h2>

//             <p className="mt-1 text-sm leading-6 text-gray-600">
//               Confirm your details and complete a secure identity check to
//               unlock all account features.
//             </p>
//           </div>
//         </div>
//       </div>

//       <div className="space-y-7 px-6 py-7 sm:px-8">
//         <div>
//           <h3 className="text-sm font-semibold text-gray-900">
//             Personal information
//           </h3>

//           <p className="mt-1 text-sm text-gray-500">
//             These details were retrieved from your profile and cannot be edited
//             here.
//           </p>
//         </div>

//         <div className="grid gap-4 sm:grid-cols-2">
//           <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
//             <CustomInput
//               label="First name"
//               name="firstname"
//               control={control}
//               readOnly
//             />
//           </div>

//           <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
//             <CustomInput
//               label="Last name"
//               name="lastname"
//               control={control}
//               readOnly
//             />
//           </div>

//           <div className="sm:col-span-2 [&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
//             <CustomInput
//               label="Email address"
//               name="email"
//               control={control}
//               readOnly
//             />
//           </div>
//         </div>

//         {!isProfileComplete && (
//           <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-700">
//             Your first name, last name, and email must be added to your profile
//             before you can begin verification.
//           </div>
//         )}

//         <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
//           <h3 className="text-sm font-semibold text-gray-900">
//             What you will need
//           </h3>

//           <div className="mt-4 space-y-4">
//             <div className="flex items-start gap-3">
//               <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   A valid government-issued ID
//                 </p>
//                 <p className="mt-0.5 text-xs text-gray-500">
//                   Passport, national ID card, or driving licence.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <ScanFace className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   A facial verification check
//                 </p>
//                 <p className="mt-0.5 text-xs text-gray-500">
//                   Make sure your face is visible in a well-lit area.
//                 </p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

//               <div>
//                 <p className="text-sm font-medium text-gray-800">
//                   A camera-enabled device
//                 </p>
//                 <p className="mt-0.5 text-xs text-gray-500">
//                   You will be asked to allow camera access.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={handleStartVerification}
//           disabled={isStartingDiditKyc || !isProfileComplete}
//           className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
//         >
//           {isStartingDiditKyc && <Loader2 className="h-4 w-4 animate-spin" />}

//           {isStartingDiditKyc
//             ? "Preparing verification..."
//             : "Start identity verification"}
//         </button>

//         <p className="text-center text-xs text-gray-400">
//           Your verification is securely processed by Didit.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default KycVerification;

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import {
  CheckCircle2,
  FileCheck2,
  Loader2,
  ScanFace,
  ShieldCheck,
} from "lucide-react";

import CustomInput from "@/components/forms/CustomInput";
import { useFetchProfile } from "@/hooks/apiHooks";
import { useDidit } from "@/hooks/useDidit";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { showErrorToast } from "@/utils/toastUtils";

type KycFormValues = {
  email: string;
  firstname: string;
  lastname: string;
};

const EDIT_PROFILE_ROUTE = "/dashboard/profile/edit-profile";

const KycVerification = () => {
  const navigate = useNavigate();

  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const myProfileQuery = useFetchProfile(userObject, Boolean(userObject));

  const profile = myProfileQuery.data?.data;

  const fullName = profile?.fullName?.trim() ?? "";
  const nameParts = fullName.split(/\s+/).filter(Boolean);

  const firstname = nameParts[0] ?? "";
  const lastname = nameParts.slice(1).join(" ");

  const isProfileComplete =
    Boolean(profile?.email?.trim()) &&
    nameParts.length >= 2 &&
    Boolean(profile?.username?.trim()) &&
    Boolean(profile?.gender) &&
    Boolean(profile?.location?.trim());

  console.log(isProfileComplete);
  const { startDiditKyc, isStartingDiditKyc } = useDidit();

  const { control, getValues, reset } = useForm<KycFormValues>({
    defaultValues: {
      email: "",
      firstname: "",
      lastname: "",
    },
  });

  useEffect(() => {
    if (!myProfileQuery.isSuccess || isProfileComplete) return;

    showErrorToast(
      "Please complete your profile before starting identity verification.",
    );

    navigate(EDIT_PROFILE_ROUTE, {
      replace: true,
    });
  }, [myProfileQuery.isSuccess, isProfileComplete, navigate]);

  useEffect(() => {
    if (!profile || !isProfileComplete) return;

    reset({
      email: profile.email ?? "",
      firstname,
      lastname,
    });
  }, [profile, firstname, lastname, isProfileComplete, reset]);

  const handleStartVerification = () => {
    if (!isProfileComplete) {
      navigate(EDIT_PROFILE_ROUTE, {
        state: {
          message:
            "Please complete your profile before starting identity verification.",
        },
      });

      return;
    }

    const values = getValues();

    if (!values.email || !values.firstname || !values.lastname) {
      return;
    }

    startDiditKyc({
      email: values.email,
      firstname: values.firstname,
      lastname: values.lastname,
      cbUrl: `${window.location.origin}${window.location.pathname}`,
    });
  };

  if (myProfileQuery.isLoading) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  if (myProfileQuery.isError) {
    return (
      <div className="mx-auto max-w-lg rounded-lg border border-red-200 bg-red-50 p-5 text-center">
        <p className="text-sm text-red-700">
          We could not retrieve your profile. Please refresh the page and try
          again.
        </p>
      </div>
    );
  }

  // Display a loader while the redirect to Edit Profile is happening.
  if (!isProfileComplete) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <Loader2 className="h-7 w-7 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-100 bg-blue-50 px-6 py-6 sm:px-8">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <ShieldCheck className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Identity Verification
            </h2>

            <p className="mt-1 text-sm leading-6 text-gray-600">
              Confirm your details and complete a secure identity check to
              unlock all account features.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-7 px-6 py-7 sm:px-8">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            Personal information
          </h3>

          <p className="mt-1 text-sm text-gray-500">
            These details were retrieved from your profile and cannot be edited
            here.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
            <CustomInput
              label="First name"
              name="firstname"
              control={control}
              readOnly
            />
          </div>

          <div className="[&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
            <CustomInput
              label="Last name"
              name="lastname"
              control={control}
              readOnly
            />
          </div>

          <div className="sm:col-span-2 [&_input]:cursor-not-allowed [&_input]:bg-gray-100 [&_input]:text-gray-500">
            <CustomInput
              label="Email address"
              name="email"
              control={control}
              readOnly
            />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
          <h3 className="text-sm font-semibold text-gray-900">
            What you will need
          </h3>

          <div className="mt-4 space-y-4">
            <div className="flex items-start gap-3">
              <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium text-gray-800">
                  A valid government-issued ID
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  Passport, national ID card, or driving licence.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <ScanFace className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium text-gray-800">
                  A facial verification check
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  Make sure your face is visible in a well-lit area.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

              <div>
                <p className="text-sm font-medium text-gray-800">
                  A camera-enabled device
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  You will be asked to allow camera access.
                </p>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleStartVerification}
          disabled={isStartingDiditKyc}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isStartingDiditKyc && <Loader2 className="h-4 w-4 animate-spin" />}

          {isStartingDiditKyc
            ? "Preparing verification..."
            : "Start identity verification"}
        </button>

        <p className="text-center text-xs text-gray-400">
          Your verification is securely processed by Didit.
        </p>
      </div>
    </div>
  );
};

export default KycVerification;
