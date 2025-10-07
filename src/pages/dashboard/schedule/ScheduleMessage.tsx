import verifyBlue from "../../../assets/icons/verifyBlue.svg";
import CommentBox from "../../../components/CommentBox";
import Typography from "../../../components/forms/Typography";
import { notificationSampleData } from "../../../data";
import CollectionRadioButton from "../../../components/forms/CollectionRadioButton";
import ScheduleButton from "../../../components/molecules/ScheduleButton";

const ScheduleMessage = ({
  setShowMessagePost,
}: {
  setShowMessagePost: (show: boolean) => void;
}) => {
  return (
    <div className="flex flex-col">
      <div className="order-2 md:order-1">
        <CommentBox />
      </div>

      <section className="order-3 md:order-2">
        <div className="flex justify-between items-center px-2">
          <Typography variant="subtitle2" className="text-grey_500">
            Select Mass Message Participants
          </Typography>
          <Typography variant="subtitle2" className="text-grey_500">
            0 Selected
          </Typography>
        </div>

        {notificationSampleData.map(({ id, name, photo, tag }) => {
          return (
            <div
              key={id}
              className="flex items-center justify-between p-4 border-b border-grey_10"
            >
              <div className="flex items-center">
                <img src={photo} alt="demo" className="w-10 h-10" />

                <div className="ml-3">
                  <div className="flex items-center mb-1">
                    <Typography variant="titleTwo" className="text-grey_900">
                      {name}
                    </Typography>

                    <img src={verifyBlue} alt="demo" className=" h-4 w-4" />
                  </div>
                  <Typography variant="p2" className="text-grey_400">
                    {tag}
                  </Typography>
                </div>
              </div>

              <CollectionRadioButton name="" />
            </div>
          );
        })}
      </section>

      <div className="order-1 md:order-3">
        <ScheduleButton
          isPost={false}
          setShowMessagePost={setShowMessagePost}
        />
      </div>
    </div>
  );
};

export { ScheduleMessage };
