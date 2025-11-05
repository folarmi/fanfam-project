/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useCustomMutation } from "./apiCalls";
import type { UserObject } from "@/lib/types";

interface UseFetchSettingsOptions<TData = any> {
  endpoint: string;
  queryKeyPrefix: string;
  userObject: UserObject;
  onSuccessCallback?: (data: TData) => void;
  enabled?: boolean;
  queryOptions?: Omit<
    UseQueryOptions<TData>,
    "queryKey" | "queryFn" | "enabled"
  >;
}

/**
 * Generic hook for fetching user settings via POST mutation wrapped in useQuery
 * @param options Configuration options for the fetch
 * @returns React Query result
 */
export const useFetchSettings = <TData = any,>({
  endpoint,
  queryKeyPrefix,
  userObject,
  onSuccessCallback = () => {},
  enabled = true,
  queryOptions = {},
}: UseFetchSettingsOptions<TData>) => {
  const mutation = useCustomMutation({
    endpoint,
    onSuccessCallback,
  });

  return useQuery<TData>({
    queryKey: [queryKeyPrefix, userObject.email, userObject.usid],
    queryFn: () =>
      mutation.mutateAsync({
        email: userObject.email,
        role: userObject.role,
        usid: userObject.usid,
      }),
    enabled: enabled && !!userObject.email,
    ...queryOptions,
  });
};

// {
//     "publicId": "1BWYN315093928",
//     "createdBy": "excel@mailinator.com",
//     "lastModifiedBy": "excel@mailinator.com",
//     "createdDate": "2025-11-05T09:39:28.54203",
//     "lastModifiedDate": "2025-11-05T09:39:28.54203",
//     "creator": "excel@mailinator.com",
//     "message": "Testting testinf 123",
//     "mediaLinks": [
//         "http://res.cloudinary.com/dezb6qbwe/image/upload/v1762335567/114fbf61-0ce9-447a-a829-5ae2598a05acfafam-20251006HU8P8ehVcXD4LZRoGU87WRKmKCZHWONk6mEL6GXJ.jpg"
//     ],
//     "comments": [],
//     "reactions": [],
//     "mediaType": "PHOTO"
// }
