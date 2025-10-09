/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useProfileMutation.ts
// import { useCustomMutation } from "./useCustomMutation";
import { useQueryClient } from "@tanstack/react-query";
import { useCustomMutation } from "./apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
// import { useUser } from "./useUser"; // Assuming you have this

interface ProfileMutationOptions {
  endpoint?: string;
  settingsPath: string; // e.g., 'display', 'notification/email', 'privacy'
  queryKeyPrefix: string; // e.g., 'displaySettings'
  method?: "put" | "post" | "patch" | "delete";
  onSuccess?: () => void;
  customSuccessMessage?: (data: any) => string;
}

export const useSettingsMutation = ({
  settingsPath,
  queryKeyPrefix,
  method = "put",
  onSuccess,
  customSuccessMessage,
  endpoint,
}: ProfileMutationOptions) => {
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  return useCustomMutation({
    endpoint: endpoint || `profile/settings/${settingsPath}/update`,
    method,
    useQueryParams: true,
    successMessage: customSuccessMessage || ((data: any) => data?.message),
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKeyPrefix, userObject.email, userObject.usid],
        exact: false,
      });
      onSuccess?.();
    },
  });
};
