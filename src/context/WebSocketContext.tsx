/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  LiveCreator,
  LiveNotification,
  WebSocketContextType,
} from "@/lib/types";
import { useAppSelector } from "@/lib/hook";
import { useGetData } from "@/hooks/apiCalls";
import { useStompClient } from "@/hooks/useStompClient";
import type { StompSubscription } from "@stomp/stompjs";
import { showInlineToast } from "@/utils/toastUtils";

interface WebSocketProviderProps {
  children: React.ReactNode;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
  undefined,
);

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within WebSocketProvider");
  }
  return context;
};

export const WebSocketProvider: React.FC<WebSocketProviderProps> = ({
  children,
}) => {
  const { userObject } = useAppSelector((state) => state.auth);

  // State for live creators
  const [liveCreators, setLiveCreators] = useState<Map<string, LiveCreator>>(
    new Map(),
  );

  // Refs for tracking subscriptions to avoid stale closures and duplicates
  const liveNotifySubscriptionRef = useRef<StompSubscription | undefined>(
    undefined,
  );

  // Track notified creators to avoid spamming toasts
  const notifiedCreatorsRef = useRef<Set<string>>(new Set());

  // Data fetching
  const { data: getLiveHosts, refetch: refetchLiveHosts } = useGetData({
    url: `live/hosts`,
    queryKey: ["GetLiveHosts"],
    enabled: !!userObject,
    refetchInterval: 30000,
  });

  // Handle new live notification
  const handleLiveNotification = useCallback((payload: LiveNotification) => {
    const creatorId = payload?.creatorId;
    if (!creatorId) return;

    // We cast payload to any because the type definition might be missing some fields
    // present in the raw message (like timestamp/session)
    const rawPayload = payload as any;
    const streamStartTime = rawPayload.timestamp || Date.now();

    setLiveCreators((prev) => {
      // Notify user if not already notified recently
      // We do this check FIRST to ensure we toast even if polling already added the creator to the map
      if (!notifiedCreatorsRef.current.has(creatorId)) {
        console.log(`🔔 Live notification for ${creatorId}`);

        showInlineToast({
          type: "info",
          title: `🔴 ${creatorId} is now LIVE!`,
        });
        notifiedCreatorsRef.current.add(creatorId);
      }

      // Check if already known in state after handling notification
      if (prev.has(creatorId)) {
        return prev;
      }

      const updated = new Map(prev);
      updated.set(creatorId, {
        creatorId,
        sessionId: rawPayload.session || rawPayload.sessionId || "",
        streamStartTime: Number(streamStartTime),
      });
      return updated;
    });
  }, []);

  // Callback when connected
  const handleConnect = useCallback(() => {
    // Refresh the extensive list from API
    refetchLiveHosts();
  }, [refetchLiveHosts]);

  // Initialize Custom Hook
  const { client, isConnected, subscribe, sendMessage } = useStompClient({
    onConnect: handleConnect,
  });

  // Subscribe to notifications when connected
  useEffect(() => {
    if (isConnected && subscribe) {
      // Clean up previous subscription if any (though useStompClient clears on disconnect,
      // this is for re-subscribing safely)
      if (liveNotifySubscriptionRef.current) {
        liveNotifySubscriptionRef.current.unsubscribe();
      }

      const topic = "/user/queue/live-notify";
      const sub = subscribe(topic, (message) => {
        try {
          const payload = JSON.parse(message.body);
          handleLiveNotification(payload);
        } catch (e) {
          console.error("❌ Error parsing live notification:", e);
        }
      });

      liveNotifySubscriptionRef.current = sub;

      return () => {
        if (liveNotifySubscriptionRef.current) {
          liveNotifySubscriptionRef.current.unsubscribe();
          liveNotifySubscriptionRef.current = undefined;
        }
      };
    }
  }, [isConnected, subscribe, handleLiveNotification]);

  // Sync with API data
  useEffect(() => {
    if (!getLiveHosts?.data) return;

    const liveHostsData = Array.isArray(getLiveHosts.data)
      ? getLiveHosts.data
      : getLiveHosts.data.content || [];

    console.log(`📊 Syncing ${liveHostsData.length} live hosts from API`);

    setLiveCreators((prev) => {
      const updated = new Map(prev);
      const activeCreatorIds = new Set<string>();

      liveHostsData.forEach((host: any) => {
        const creatorId = host?.creatorID;
        if (creatorId) {
          activeCreatorIds.add(creatorId);
          updated.set(creatorId, {
            creatorId,
            sessionId: host?.session,
            streamStartTime: host?.liveAt ? Number(host.liveAt) : undefined,
          });
        }
      });

      // Remove creators who are no longer in the API response (went offline)
      // Only if we trust the API is the source of truth for "currently live"
      for (const id of updated.keys()) {
        if (!activeCreatorIds.has(id)) {
          updated.delete(id);
          notifiedCreatorsRef.current.delete(id); // Reset notification memory
        }
      }

      return updated;
    });
  }, [getLiveHosts]);

  const removeCreatorFromLive = useCallback((creatorId: string) => {
    setLiveCreators((prev) => {
      if (!prev.has(creatorId)) return prev;
      const updated = new Map(prev);
      updated.delete(creatorId);
      return updated;
    });
    notifiedCreatorsRef.current.delete(creatorId);
  }, []);

  const isCreatorLive = useCallback(
    (creatorId: string) => {
      return liveCreators.has(creatorId);
    },
    [liveCreators],
  );

  const getLiveSession = useCallback(
    (creatorId: string) => {
      return liveCreators.get(creatorId);
    },
    [liveCreators],
  );

  const value: WebSocketContextType = {
    isConnected,
    client: client,
    liveCreators,
    sendMessage,
    isCreatorLive,
    getLiveSession,
    refetchLiveHosts,
    removeCreatorFromLive,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};
