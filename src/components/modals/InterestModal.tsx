/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "../forms/Typography";
import searchIcon from "../../assets/icons/searchIcon.svg";
import CustomButton from "../forms/CustomButton";
import { interestData } from "../../data";

const InterestModal = ({ toggleInterestModal }: any) => {
  return (
    <div className="bg-white p-6 rounded-2xl">
      <Typography variant="h5" className="text-grey_800 text-center">
        Select Your Interest’s
      </Typography>
      <Typography
        variant="p2"
        className="text-grey_500 pt-[2px] pb-4 text-center border-b border-grey_10"
      >
        Help us know what spikes your interest.
      </Typography>

      <div
        className="w-full flex 
    items-center py-2 px-4 justify-between rounded-3xl border bg-grey_20
     border-grey_20 my-4"
      >
        <div className="flex items-center">
          <img src={searchIcon} alt="search icon" className="pr-1" />
          <input
            className="bg-grey_20 outline-none text-grey_200 font-normal text-sm"
            placeholder="Search interest’s"
          />
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-3">
        {interestData?.map(({ id, image }) => {
          return (
            <div key={id} className="mr-4 mb-4">
              <img src={image} alt="image" className="" />
            </div>
          );
        })}
      </section>

      <div className="flex items-center justify-center w-full">
        <CustomButton
          variant="secondary"
          className="mr-4"
          onClick={toggleInterestModal}
        >
          Cancel
        </CustomButton>
        <CustomButton className="w-1/5">Save</CustomButton>
      </div>
    </div>
  );
};

export default InterestModal;
