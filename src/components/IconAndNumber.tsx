/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from "@/hooks/apiCalls";
import type { ReactionType } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";

type IconAndNumberProp = {
  Icon: any;
  number?: number;
  numberColor?: string;
  className?: string;
  reactionType: ReactionType;
  publicid: string | undefined;
  isActive: boolean;
};

const IconAndNumber = ({
  Icon,
  number = 0,
  numberColor = "#8D8E96",
  className,
  reactionType,
  publicid,
  isActive,
}: IconAndNumberProp) => {
  const queryClient = useQueryClient();
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const reactToPostMutation = useCustomMutation({
    endpoint: `contents/reactions`,
    onSuccessCallback: () => {
      // queryClient.invalidateQueries({
      //   queryKey: ["GetContents"],
      //   exact: false,
      // });
    },
  });

  const handleReaction = () => {
    // Optimistic update
    queryClient.setQueryData(["GetContents"], (oldData: any) => {
      if (!oldData?.data?.content) return oldData;

      return {
        ...oldData,
        data: {
          ...oldData?.data,
          content: oldData?.data?.content?.map((post: any) => {
            if (post?.publicId !== publicid) return post;

            const reactions = post?.reactions || [];

            if (isActive) {
              // Remove the reaction if clicking on active one
              return {
                ...post,
                reactions: reactions?.filter(
                  (r: any) =>
                    !(
                      r?.createdBy === userObject?.email &&
                      r?.type === reactionType
                    )
                ),
              };
            } else {
              // Remove any existing reaction from this user, then add new one
              const withoutUserReactions = reactions.filter(
                (r: any) => r.createdBy !== userObject?.email
              );

              return {
                ...post,
                reactions: [
                  ...withoutUserReactions,
                  {
                    publicId: `temp-${Date.now()}`,
                    createdBy: userObject?.email,
                    lastModifiedBy: userObject?.email,
                    createdDate: new Date().toISOString(),
                    lastModifiedDate: new Date().toISOString(),
                    type: reactionType,
                  },
                ],
              };
            }
          }),
        },
      };
    });

    // Perform the actual mutation
    reactToPostMutation.mutate({
      pubId: publicid,
      reactionType: reactionType,
    });
  };

  return (
    <div
      className={`flex items-center mr-4 cursor-pointer ${className}`}
      onClick={(e) => {
        e.stopPropagation();
        handleReaction();
      }}
    >
      <Icon isLiked={isActive} width="24" height="24" />
      {number !== undefined && (
        <p
          style={{
            color: numberColor,
          }}
          className={`text-sm font-normal leading-5 pl-1`}
        >
          {number}
        </p>
      )}
    </div>
  );
};

export default IconAndNumber;
