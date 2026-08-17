/* eslint-disable @typescript-eslint/no-explicit-any */

import { useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useWebSocket } from "@/context/WebSocketContext";
import { useGetData } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import type { UserProfile } from "@/lib/types";
import { showInlineToast } from "@/utils/toastUtils";
import { Loader } from "@/components/molecules/Loader";

import verify from "@/assets/icons/verify.svg";

const getInitials = (name?: string) => {
  if (!name) return "?";

  const words = name.trim().split(/\s+/);

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }

  return `${words[0].charAt(0)}${words[1].charAt(0)}`.toUpperCase();
};

const truncateName = (name?: string) => {
  if (!name) return "Creator";

  if (name.length <= 12) {
    return name;
  }

  return `${name.slice(0, 10)}...`;
};

const CreatorDiscoveryRail = () => {
  const navigate = useNavigate();

  const { liveCreators, isConnected } = useWebSocket();

  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { data: getAllCreators, isLoading: getAllCreatorsIsLoading } =
    useGetData({
      url: "profile/creators",
      queryKey: ["GetCreators"],
    });

  /*
   * Convert WebSocket Map into something easier to work with.
   */
  const liveCreatorList = useMemo(() => {
    return Array.from(liveCreators.entries())
      .filter(([creatorId]) => creatorId !== userObject?.usid)
      .map(([creatorId, liveData]) => {
        const data = liveData as any;

        const sessionId = data?.sessionId || data?.session;

        const displayName =
          data?.firstname && data?.lastname
            ? `${data.firstname} ${data.lastname}`.trim()
            : data?.creatorName ||
              data?.fullName ||
              data?.username ||
              creatorId;

        const profileImageUrl =
          data?.profileImage ||
          data?.profileImageUrl ||
          data?.profilePic ||
          data?.avatarUrl ||
          "";

        return {
          creatorId,
          sessionId,
          displayName,
          profileImageUrl,
          viewerCount: data?.viewerCount,
        };
      });
  }, [liveCreators, userObject?.usid]);

  /*
   * IDs of creators currently LIVE.
   *
   * We use this to make sure the same person does not appear
   * again inside suggestions.
   */
  const liveCreatorIds = useMemo(() => {
    return new Set(liveCreatorList.map((creator) => String(creator.creatorId)));
  }, [liveCreatorList]);

  /*
   * Suggestions:
   * - remove current user
   * - remove creators already displayed as LIVE
   */
  const suggestedCreators = useMemo(() => {
    const creators: UserProfile[] = getAllCreators?.data || [];

    return creators.filter((creator) => {
      const creatorId = String(creator?.usid);

      const isCurrentUser = creatorId === String(userObject?.usid);

      const isAlreadyLive = liveCreatorIds.has(creatorId);

      return !isCurrentUser && !isAlreadyLive;
    });
  }, [getAllCreators, liveCreatorIds, userObject?.usid]);

  const handleWatchLive = (creatorId: string, sessionId?: string) => {
    if (!sessionId) {
      showInlineToast({
        type: "error",
        title: "Unable to join stream - missing session ID",
      });

      return;
    }

    if (!isConnected) {
      showInlineToast({
        type: "error",
        title: "Not connected to server. Please wait...",
      });

      return;
    }

    const encodedCreatorId = encodeURIComponent(creatorId);

    navigate(`/dashboard/livestreaming/${encodedCreatorId}/${sessionId}`);
  };

  const handleCreatorClick = (creator: UserProfile) => {
    navigate(`/dashboard/profile/${creator.usid}/subscribe`, {
      state: {
        email: creator.email,
      },
    });
  };

  const hasLiveCreators = liveCreatorList.length > 0;

  const hasSuggestedCreators = suggestedCreators.length > 0;

  if (getAllCreatorsIsLoading && !hasLiveCreators) {
    return (
      <div className="flex h-28 items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!hasLiveCreators && !hasSuggestedCreators) {
    return null;
  }

  return (
    <section className="w-full border-b border-grey_10 bg-white">
      <div
        className="
          flex
          w-full
          items-start
          gap-5
          overflow-x-auto
          px-4
          py-4
          [scrollbar-width:none]
          [&::-webkit-scrollbar]:hidden
        "
      >
        {/* =====================================
            LIVE CREATORS ALWAYS COME FIRST
        ====================================== */}
        {liveCreatorList.map((creator) => {
          const initial = getInitials(creator.displayName);

          return (
            <div
              key={`live-${creator.creatorId}`}
              className="w-[76px] flex-none"
            >
              <button
                type="button"
                onClick={() =>
                  handleWatchLive(creator.creatorId, creator.sessionId)
                }
                disabled={!isConnected}
                className="
                  group
                  flex
                  w-full
                  flex-col
                  items-center
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                "
                aria-label={`Watch ${creator.displayName} live`}
              >
                {/* Avatar */}
                <div className="relative h-[68px] w-[68px]">
                  {/* Animated outer ring */}
                  <div className="absolute inset-0 rounded-full border-[2.5px] border-red-500" />

                  <div className="absolute inset-[3px] overflow-hidden rounded-full bg-gray-100">
                    {creator.profileImageUrl ? (
                      <img
                        src={creator.profileImageUrl}
                        alt={creator.displayName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100 text-lg font-semibold text-gray-700">
                        {initial}
                      </div>
                    )}
                  </div>

                  {/* LIVE badge */}
                  <span
                    className="
                      absolute
                      -bottom-1.5
                      left-1/2
                      -translate-x-1/2
                      rounded
                      bg-red-600
                      px-2
                      py-[2px]
                      text-[9px]
                      font-bold
                      uppercase
                      leading-none
                      text-white
                      shadow-sm
                    "
                  >
                    Live
                  </span>
                </div>

                {/* Name */}
                <span
                  className="
                    mt-3
                    block
                    w-full
                    truncate
                    text-center
                    text-xs
                    font-medium
                    text-gray-700
                  "
                  title={creator.displayName}
                >
                  {truncateName(creator.displayName)}
                </span>
              </button>
            </div>
          );
        })}

        {/* =====================================
            SUGGESTED CREATORS COME AFTER LIVE
        ====================================== */}
        {suggestedCreators.map((creator: UserProfile) => {
          const displayName =
            creator?.fullName || creator?.username || "Creator";

          const profileImageUrl = creator?.profilePic || creator?.coverImageUrl;

          const initial = getInitials(displayName);

          return (
            <div
              key={`suggestion-${creator.usid}`}
              className="w-[76px] flex-none"
            >
              <button
                type="button"
                onClick={() => handleCreatorClick(creator)}
                className="
                    group
                    flex
                    w-full
                    flex-col
                    items-center
                  "
                aria-label={`View ${displayName}`}
              >
                {/* Avatar */}
                <div className="relative h-[68px] w-[68px]">
                  <div className="h-full w-full overflow-hidden rounded-full bg-blue-50">
                    {profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt={displayName}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        onError={(event) => {
                          event.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xl font-semibold text-gray-700">
                        {initial}
                      </div>
                    )}
                  </div>

                  {/* Verified icon */}
                  <div className="absolute bottom-0 right-0 flex h-[18px] w-[18px] items-center justify-center rounded-full bg-white shadow-sm">
                    <img
                      src={verify}
                      alt="Verified"
                      className="h-[15px] w-[15px]"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>

                {/* Name */}
                <span
                  className="
                      mt-2
                      block
                      w-full
                      truncate
                      text-center
                      text-xs
                      font-medium
                      text-gray-700
                    "
                  title={displayName}
                >
                  {truncateName(displayName)}
                </span>
              </button>
            </div>
          );
        })}

        {/* Loading more suggestions */}
        {getAllCreatorsIsLoading && hasLiveCreators && (
          <div className="flex h-[68px] w-[76px] flex-none items-center justify-center">
            <Loader />
          </div>
        )}
      </div>
    </section>
  );
};

export default CreatorDiscoveryRail;
