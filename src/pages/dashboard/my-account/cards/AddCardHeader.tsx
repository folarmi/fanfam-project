/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "@/components/forms/Typography";
import atmCardOutline from "@/assets/icons/atmCardOutline.svg";
import { AccountMobileBackButton } from "@components/molecules/AccountMobileBackButton";

const AddCardHeader = ({ setAddNewCard }: any) => {
  return (
    <div
      className="flex items-center justify-between w-full bg-white py-2.5 px-4 border
 border-grey_20 shadow-custom-combined"
    >
      <div className="flex items-center">
        <AccountMobileBackButton />
        <Typography variant="subtitle1">Your Saved Cards</Typography>
      </div>
      <div
        onClick={() => setAddNewCard(true)}
        className="cursor-pointer flex items-center bg-blue_500 rounded-3xl py-2 px-[10px] border border-grey_10 drop-shadow-7xl"
      >
        <img src={atmCardOutline} alt="atmCardOutline" className="w-5 h-4" />
        <Typography variant="subtitle3" className="text-blue_100 pl-1">
          Add Card
        </Typography>
      </div>
    </div>
  );
};

export default AddCardHeader;
