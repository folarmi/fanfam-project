import { useState } from "react";
import cup from "@/assets/icons/cup.svg";
import Typography from "@/components/forms/Typography";
import inactiveFire from "@/assets/icons/inactiveFire.svg";
import inactiveStreak from "@/assets/icons/inactiveStreak.svg";
import infoCircle from "@/assets/icons/infoCircle.svg";
import Modal from "@/components/modals/Modal";
import StreakModal from "@/components/modals/StreakModal";

const OverviewActivityStreak = () => {
  const [streakModal, setStreakModal] = useState(false);

  const toggleStreakModal = () => {
    setStreakModal(!streakModal);
  };

  return (
    <div>
      <div className="flex items-center justify-between  border-t border-grey_10 border-b mb-2">
        <div className="flex items-center relative">
          <div className="bg-blue_200 w-6 h-14 "></div>
          <img src={cup} className="w-4 h-4 absolute left-4" alt="cup" />

          <div className="flex ml-2">
            <Typography variant="p2" className="text-grey_900 pl-2">
              Let’s Start
            </Typography>
            <Typography variant="p2" className="text-blue_500 pl-[2px] pr-2">
              Take Action
            </Typography>
            <img
              src={infoCircle}
              alt="infoCircle"
              className="cursor-pointer"
              onClick={toggleStreakModal}
            />
          </div>
        </div>

        <Typography variant="subtitle2" className="text-grey_900">
          $560.00
        </Typography>
      </div>

      <section className="flex items-center">
        <div className="flex items-center w-1/2">
          <img src={inactiveFire} alt="inactiveFire" className="w-6 h-6" />

          <div className="ml-2">
            <p className="font-bold text-base text-grey_400">0</p>
            <Typography variant="p3" className="pt-1">
              Current Streak
            </Typography>
          </div>
        </div>

        <div className="flex items-center w-1/2 border-l border-grey_10 pl-4">
          <img src={inactiveStreak} alt="inactiveFire" className="w-6 h-6" />

          <div className="ml-2">
            <p className="font-bold text-base text-grey_400">0</p>
            <Typography variant="p3" className="pt-1">
              Longest Streak
            </Typography>
          </div>
        </div>
      </section>

      <Modal show={streakModal} toggleModal={toggleStreakModal}>
        <div>
          <StreakModal toggleModal={toggleStreakModal} />
        </div>
      </Modal>
    </div>
  );
};

export default OverviewActivityStreak;
