// hooks/useKycSession.ts
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/axios";

type KycSession = {
  id: number;
  email: string;
  sessionId: string;
  sessionNumber: string;
  sessionToken: string | null;
  status:
    | "APPROVED"
    | "DECLINED"
    | "IN_REVIEW"
    | "Not Started"
    | "In Progress"
    | string;
};

type UseKycSessionOptions = {
  email: string | undefined;
  enabled?: boolean;
};

export const useKycSession = ({
  email,
  enabled = true,
}: UseKycSessionOptions) => {
  return useQuery({
    queryKey: ["kycUserSessions", email],
    queryFn: async (): Promise<KycSession | null> => {
      const response = await api.get(
        `kyc/user-sessions?email=${encodeURIComponent(email!)}`,
      );
      const sessions: KycSession[] = response.data?.body ?? [];
      // body is an array — first item is the most recent session
      return sessions[0] ?? null;
    },
    enabled: enabled && Boolean(email),
    // Don't refetch on window focus — status only changes via webhook,
    // not on every tab switch
    refetchOnWindowFocus: false,
    staleTime: 30_000,
  });
};
