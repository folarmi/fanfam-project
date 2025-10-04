import blueBackArrow from "@/assets/icons/blueBackArrow.svg";

import Typography from "@components/forms/Typography";
import MobileBackButton from "../molecules/MobileBackButton";
import { Link } from "react-router-dom";

type AccountBackButton = {
  showBack?: boolean;
  showMobileBack?: boolean;
  moduleName?: string;
};

const AccountBackButton = ({
  showBack = true,
  showMobileBack,
  moduleName = "Account",
}: AccountBackButton) => {
  return (
    //
    <div
      className={`w-full bg-white py-3 px-4 border
 border-grey_20 shadow-custom-combined  ${!showBack && "h-14"}`}
    >
      {showBack && (
        <div
          className={`border w-[72px] border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white
        `}
        >
          <Link
            to="/dashboard/settings/account"
            className="cursor-pointer flex items-center"
          >
            <img src={blueBackArrow} alt="blueBackArrow" />

            <Typography variant="subtitle3" className="text-blue_500">
              Back
            </Typography>
          </Link>
        </div>
      )}

      {showMobileBack && <MobileBackButton moduleName={moduleName} />}
    </div>
  );
};

export default AccountBackButton;
