import Typography from "./Typography";
import plus from "../../assets/icons/plus.svg";

const AddToScheduleButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center border border-grey_10 drop-shadow-7xl
          py-2 px-3 bg-secondary-btn
           rounded-3xl cursor-pointer mx-4 mt-4"
    >
      <Typography variant="subtitle3">Add to Schedule</Typography>
      <img src={plus} alt="plus" />
    </div>
  );
};

export default AddToScheduleButton;
