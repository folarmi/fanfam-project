/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCustomMutation } from "@/hooks/apiCalls";
import type { IconAndNumberProp } from "@/lib/types";
import { useQueryClient } from "@tanstack/react-query";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";

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

  // const handleReaction = () => {
  //   // Optimistic update
  //   queryClient.setQueryData(["GetContents"], (oldData: any) => {
  //     if (!oldData?.data?.content) return oldData;

  //     return {
  //       ...oldData,
  //       data: {
  //         ...oldData?.data,
  //         content: oldData?.data?.content?.map((post: any) => {
  //           if (post?.publicId !== publicid) return post;

  //           const reactions = post?.reactions || [];

  //           if (isActive) {
  //             // Remove the reaction if clicking on active one
  //             return {
  //               ...post,
  //               reactions: reactions?.filter(
  //                 (r: any) =>
  //                   !(
  //                     r?.createdBy === userObject?.email &&
  //                     r?.type === reactionType
  //                   )
  //               ),
  //             };
  //           } else {
  //             // Remove any existing reaction from this user, then add new one
  //             const withoutUserReactions = reactions.filter(
  //               (r: any) => r.createdBy !== userObject?.email
  //             );

  //             return {
  //               ...post,
  //               reactions: [
  //                 ...withoutUserReactions,
  //                 {
  //                   publicId: `temp-${Date.now()}`,
  //                   createdBy: userObject?.email,
  //                   lastModifiedBy: userObject?.email,
  //                   createdDate: new Date().toISOString(),
  //                   lastModifiedDate: new Date().toISOString(),
  //                   type: reactionType,
  //                 },
  //               ],
  //             };
  //           }
  //         }),
  //       },
  //     };
  //   });

  //   // Perform the actual mutation
  //   reactToPostMutation.mutate({
  //     pubId: publicid,
  //     reactionType: reactionType,
  //   });
  // };

  // IconAndNumber.tsx

  const handleReaction = () => {
    // Get all cached queries that start with ["GetContents"]
    const allContentQueries = queryClient.getQueriesData<any>({
      queryKey: ["GetContents"],
    });

    // Apply optimistic update to ALL of them (covers every search term variant)
    allContentQueries.forEach(([queryKey]) => {
      queryClient.setQueryData(queryKey, (oldData: any) => {
        if (!oldData?.pages) return oldData; // ← also fix: it's infinite query, so it has `pages`

        return {
          ...oldData,
          pages: oldData.pages.map((page: any) => ({
            ...page,
            data: {
              ...page.data,
              content: page.data?.content?.map((post: any) => {
                if (post?.publicId !== publicid) return post;

                const reactions = post?.reactions || [];

                if (isActive) {
                  return {
                    ...post,
                    reactions: reactions.filter(
                      (r: any) =>
                        !(
                          r?.createdBy === userObject?.email &&
                          r?.type === reactionType
                        ),
                    ),
                  };
                } else {
                  const withoutUserReactions = reactions.filter(
                    (r: any) => r.createdBy !== userObject?.email,
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
          })),
        };
      });
    });

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
