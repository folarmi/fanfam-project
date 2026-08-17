// // components/kyc/BecomeCreatorPrompt.tsx
// import { Sparkles } from "lucide-react";
// import { useCustomMutation } from "@/hooks/apiCalls";
// import { useQueryClient } from "@tanstack/react-query";

// type BecomeCreatorPromptProps = {
//   email: string | undefined;
// };

// export const BecomeCreatorPrompt = ({ email }: BecomeCreatorPromptProps) => {
//   const queryClient = useQueryClient();

//   const becomeCreatorMutation = useCustomMutation({
//     endpoint: `profile/verify`,
//     successMessage: () => "You're now a creator!",
//     onSuccessCallback: () => {
//       queryClient.invalidateQueries({
//         queryKey: ["viewProfile"],
//         exact: false,
//       });
//       queryClient.invalidateQueries({
//         queryKey: ["kycUserSessions"],
//         exact: false,
//       });
//     },
//   });

//   const handleBecomeCreator = () => {
//     if (!email) return;
//     becomeCreatorMutation.mutate({});
//   };

//   return (
//     <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
//       <div className="flex items-start gap-3">
//         <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
//           <Sparkles className="h-5 w-5" />
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-gray-900">
//             You're verified — become a creator
//           </p>
//           <p className="mt-0.5 text-xs text-gray-500">
//             Unlock monetization and start earning from your content.
//           </p>
//         </div>
//       </div>
//       <button
//         type="button"
//         onClick={handleBecomeCreator}
//         disabled={becomeCreatorMutation.isPending}
//         className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
//       >
//         {becomeCreatorMutation.isPending ? "Activating..." : "Become a Creator"}
//       </button>
//     </div>
//   );
// };

// components/kyc/BecomeCreatorPrompt.tsx

import { Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { useCustomMutation } from "@/hooks/apiCalls";
import { useAppDispatch, useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import { updateUserObject } from "@/lib/features/auth/authSlice"; // adjust path if different

type BecomeCreatorPromptProps = {
  email: string | undefined;
};

export const BecomeCreatorPrompt = ({ email }: BecomeCreatorPromptProps) => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const becomeCreatorMutation = useCustomMutation({
    endpoint: "profile/verify",

    successMessage: () => "You're now a creator!",

    onSuccessCallback: () => {
      // Update the locally stored auth user immediately
      if (userObject) {
        const updatedUserObject = {
          ...userObject,
          role: "CREATOR",
        };

        dispatch(updateUserObject(updatedUserObject));
      }

      // Refresh profile-related queries from the backend
      queryClient.invalidateQueries({
        queryKey: ["viewProfile"],
        exact: false,
      });

      queryClient.invalidateQueries({
        queryKey: ["kycUserSessions"],
        exact: false,
      });
    },
  });

  const handleBecomeCreator = () => {
    if (!email || becomeCreatorMutation.isPending) return;

    becomeCreatorMutation.mutate({});
  };

  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>

        <div>
          <p className="text-sm font-semibold text-gray-900">
            You're verified — become a creator
          </p>

          <p className="mt-0.5 text-xs text-gray-500">
            Unlock monetization and start earning from your content.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleBecomeCreator}
        disabled={becomeCreatorMutation.isPending}
        className="shrink-0 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {becomeCreatorMutation.isPending ? "Activating..." : "Become a Creator"}
      </button>
    </div>
  );
};
