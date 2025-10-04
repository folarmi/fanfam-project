import Typography from "../forms/Typography";
import warning from "@/assets/icons/warning.svg";
import rightBlueArrow from "@/assets/icons/rightBlueArrow.svg";

const BankingInformation = () => {
  return (
    <div className="flex items-center border-b border-grey_10  relative">
      <div className="bg-blue_200 w-6 h-14 rounded-tl-md"></div>
      <img src={warning} alt="warning" className="w-4 h-4 absolute left-4" />
      <Typography variant="p2" className="text-gray-900 py-[10px] pl-3">
        Please complete filling out your{" "}
        <span className="text-blue_500">Banking Information</span>
      </Typography>
      <img
        src={rightBlueArrow}
        alt="rightBlueArrow"
        className="w-[14px] h-[14px]"
      />
    </div>
  );
};

export default BankingInformation;
