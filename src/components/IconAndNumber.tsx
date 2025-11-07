/* eslint-disable @typescript-eslint/no-explicit-any */

import { useCustomMutation } from "@/hooks/apiCalls";
import { useQueryClient } from "@tanstack/react-query";

type IconAndNumberProp = {
  Icon: any;
  number?: number;
  numberColor?: string;
  className?: string;
  reactionType: string;
  publicid: string | undefined;
};

const IconAndNumber = ({
  Icon,
  number = 0,
  numberColor = "#8D8E96",
  className,
  reactionType,
  publicid,
}: IconAndNumberProp) => {
  const queryClient = useQueryClient();

  const reactToPostMutation = useCustomMutation({
    endpoint: `contents/reactions`,
    // successMessage: () => "Post deleted successfully",
    onSuccessCallback: () => {
      queryClient.invalidateQueries({
        queryKey: ["GetContents"],
        exact: false,
      });
    },
  });

  const handleReaction = () => {
    reactToPostMutation.mutate({
      pubId: publicid,
      reactionType: reactionType,
    });
  };

  return (
    <div
      className={`flex items-center mr-4 cursor-pointer ${className}`}
      onClick={handleReaction}
    >
      <Icon width="24" height="24" />
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
