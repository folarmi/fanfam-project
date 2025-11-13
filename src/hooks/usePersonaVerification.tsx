/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";

interface UsePersonaVerificationConfig {
  templateId?: string;
  environmentId?: string;
  onComplete?: (data: {
    inquiryId: string;
    status: string;
    fields: Record<string, any>;
  }) => void;
  onCancel?: (data: { inquiryId: string; sessionToken: string }) => void;
  onError?: (error: unknown) => void;
}

interface UsePersonaVerificationResult {
  open: () => Promise<void>;
  isReady: boolean;
  isLoading: boolean;
}

/**
 * Custom hook for Persona identity verification (lazy load on button click)
 */
export const usePersonaVerification = ({
  templateId,
  environmentId = "env_9nyHyE7aH2r8u12YZtPqm8CbEw7i",
  onComplete,
  onCancel,
  onError,
}: UsePersonaVerificationConfig): UsePersonaVerificationResult => {
  const clientRef = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const loadPersonaScript = (): Promise<void> =>
    new Promise((resolve, reject) => {
      const persona = (window as any).Persona;
      if (persona) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = "https://cdn.withpersona.com/dist/persona-v5.1.2.js";
      script.integrity =
        "sha384-nuMfOsYXMwp5L13VJicJkSs8tObai/UtHEOg3f7tQuFWU5j6LAewJbjbF5ZkfoDo";
      script.crossOrigin = "anonymous";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Failed to load Persona SDK"));
      document.body.appendChild(script);
    });

  const initializePersona = async () => {
    try {
      await loadPersonaScript();

      const persona = (window as any).Persona;
      if (!persona) throw new Error("Persona SDK not available");

      clientRef.current = new persona.Client({
        templateId,
        environmentId,
        onReady: () => {
          setIsReady(true);
          setIsLoading(false);
        },
        onComplete: ({ inquiryId, status, fields }: any) => {
          //   console.log(
          //     `✅ Completed inquiry ${inquiryId} with status ${status}`
          //   );
          onComplete?.({ inquiryId, status, fields });
        },
        onCancel: ({ inquiryId, sessionToken }: any) => {
          //   console.log("⚠️ Verification cancelled");
          onCancel?.({ inquiryId, sessionToken });
        },
        onError: (error: any) => {
          //   console.error("❌ Verification error:", error);
          setIsLoading(false);
          onError?.(error);
        },
      });
    } catch (error) {
      console.error("Failed to initialize Persona:", error);
      setIsLoading(false);
      onError?.(error);
    }
  };

  const open = async () => {
    setIsLoading(true);

    if (!clientRef.current) {
      await initializePersona();
    }

    const personaClient = clientRef.current;
    if (personaClient) {
      personaClient.open();
    } else {
      console.warn("Persona client not ready yet");
      setIsLoading(false);
    }
  };

  return { open, isReady, isLoading };
};
