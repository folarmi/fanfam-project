/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import CustomButton from "./forms/CustomButton";
import Picture from "../assets/icons/picture";
import Smile from "../assets/icons/smile";
import Poll from "../assets/icons/poll";
import Record from "../assets/icons/record";

type CommentBoxProps = {
  ifPoll?: boolean;
  ifRecord?: boolean;
  setIfUserIsCreatingPoll?: any;
};

const CommentBox = ({
  ifPoll = true,
  ifRecord = true,
  setIfUserIsCreatingPoll,
}: CommentBoxProps) => {
  // const [text, setText] = useState("");
  // const [buttonType, setButtonType] = useState("disabled");
  const [isActive, setIsActive] = useState(false);

  const handleFocus = () => {
    setIsActive(true);
  };

  const handleBlur = () => {
    setIsActive(false);
  };

  return (
    <div className="mb-2 p-4 border border-grey_10 bg-grey_20 drop-shadow-4xl">
      <textarea
        placeholder="Write a Post.."
        cols={5}
        rows={5}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="w-full outline-none pt-3 bg-grey_20"
      ></textarea>
      <div className="flex items-center justify-between py-[5px]">
        <div className="flex items-center gap-x-3">
          <Picture isActive={isActive} className="cursor-pointer" />
          <Smile isActive={isActive} className="cursor-pointer" />
          {ifPoll && (
            <Poll
              onClick={() => setIfUserIsCreatingPoll(true)}
              isActive={isActive}
              className="cursor-pointer"
            />
          )}
          {ifRecord && (
            <Record isActive={isActive} className="cursor-pointer" />
          )}
        </div>

        <div className="w-[62px]">
          <CustomButton
            variant={isActive ? "primary" : "disabled"}
            className="w-full bg-grey_90"
          >
            Post
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default CommentBox;
