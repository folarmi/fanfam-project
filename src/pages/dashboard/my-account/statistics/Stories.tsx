import StatTableHeader from "@components/forms/StatTableHeader";
import Tabs from "@components/forms/Tabs";
import TimelineAndOverview from "@components/forms/TimelineAndOverview";
import Typography from "@components/forms/Typography";
import Modal from "@components/modals/Modal";
import StoryStatistics from "@components/modals/StoryStatistics";
import {
  sampleEngagementTableData,
  sampleStreakData,
  statHeaderTwo,
} from "@/data";
import { statTimeLine } from "@/utils/helper";
import { useState } from "react";

const Stories = () => {
  const [tabs] = useState([
    {
      id: 1,
      name: "Tips",
    },
    {
      id: 3,
      name: "Views",
    },
    {
      id: 4,
      name: "Likes",
    },
    {
      id: 5,
      name: "Comments",
    },
  ]);
  const [isActiveTab, setIsActiveTab] = useState("Comments");
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false);
  const [isActiveModal, setIsActiveModal] = useState<number>(1);
  const [showStatModal, setShowStatModal] = useState(false);

  const toggleModal = (id: number) => {
    setIsMoreModalOpen(!isMoreModalOpen);
    setIsActiveModal(id);
  };

  const toggleStatModal = () => {
    setShowStatModal(!showStatModal);
  };

  return (
    <div>
      <section className="px-4">
        <Tabs
          tabsArray={tabs}
          setIsActiveTab={setIsActiveTab}
          isActiveTab={isActiveTab}
        />
      </section>

      <TimelineAndOverview
        month="July"
        timeframe="July 18, 2024 - Aug 12, 2024 (local time UTC+01:00)"
        amount={statTimeLine(isActiveTab || "")}
      />

      <div className="mt-12 px-4">
        <StatTableHeader data={statHeaderTwo} />

        <div className="">
          {sampleEngagementTableData?.map(
            ({
              id,
              date,
              views,
              tips,
              price,
              purchases,
              image,
              // text,
              // imageNo,
            }) => {
              return (
                <section key={date}>
                  <div className="flex items-center justify-between border-b border-grey_10 py-2 relative">
                    <Typography variant="subtitle3" className="text-grey_700">
                      {date}
                    </Typography>

                    <Typography
                      onClick={() => toggleModal(id)}
                      variant="subtitle3"
                      className="text-blue_500 cursor-pointer"
                    >
                      More
                    </Typography>

                    {isMoreModalOpen && isActiveModal === id && (
                      <>
                        <div className="bg-white border border-grey_10 rounded-lg py-5  w-[294px] left-[50%] top-[80%] z-10 absolute">
                          {sampleStreakData?.map(({ id, image, name }) => {
                            return (
                              <div
                                key={id}
                                className="flex items-center px-4 mb-4"
                              >
                                <img
                                  src={image}
                                  alt="image"
                                  className="w-4 h-4"
                                />
                                <Typography
                                  variant="p2"
                                  className="text-grey_400 pl-2"
                                >
                                  {name}
                                </Typography>
                              </div>
                            );
                          })}

                          <Typography
                            onClick={toggleStatModal}
                            variant="p2"
                            className="text-grey_400 px-4 border-t border-grey_10 pt-3 cursor-pointer"
                          >
                            View detailed statistics
                          </Typography>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="flex items-center justify-between my-2">
                    <img src={image} className="w-10 h-10" alt="sample" />

                    <Typography variant="p3" className="text-grey_500">
                      {views}
                    </Typography>
                    <Typography variant="p3" className="text-grey_500">
                      {tips}
                    </Typography>
                    <Typography variant="p3" className="text-grey_500">
                      {price}
                    </Typography>
                    <Typography variant="p3" className="text-grey_500">
                      {purchases}
                    </Typography>
                  </div>
                </section>
              );
            }
          )}
        </div>
      </div>

      <Modal show={showStatModal} toggleModal={toggleStatModal}>
        <div className="p-4">
          <StoryStatistics toggleStatModal={toggleStatModal} />
        </div>
      </Modal>
    </div>
  );
};

export default Stories;
