/* eslint-disable @typescript-eslint/no-explicit-any */
import timelineImage from "../../../assets/timelineImage.svg";
import CommentBox from "../../../components/CommentBox";
import ScheduleButton from "../../../components/molecules/ScheduleButton";

const SchedulePost = ({
  setShowSchedulePost,
}: {
  setShowSchedulePost: any;
}) => {
  return (
    <div className="flex flex-col">
      <div className="order-2 md:order-1">
        <CommentBox />
      </div>
      <div className="order-3 md:order-2">
        <img src={timelineImage} alt="timeline" />
      </div>
      <div className="order-1 md:order-3">
        <ScheduleButton
          isPost={true}
          setShowSchedulePost={setShowSchedulePost}
        />
      </div>
    </div>
  );
};

export { SchedulePost };
