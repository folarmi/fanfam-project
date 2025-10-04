import { SubscriptionHeader } from "../settings/SubscriptionHeader";
import Typography from "@components/forms/Typography";
import CustomButton from "@components/forms/CustomButton";
import {
  referralHistorySampleData,
  referralHistoryTableHeader,
  referralInfo,
} from "@/data";
import StatTableHeader from "@components/forms/StatTableHeader";

const Referrals = () => {
  return (
    <div>
      <SubscriptionHeader text="Refferals" />

      <div className="flex items-center justify-between bg-grey_10 py-3 px-4 text-sm">
        <Typography variant="p2" className="text-gray-800">
          Referral Link
        </Typography>

        <div className="flex items-center ">
          <Typography variant="subtitle2" className="text-gray-800 pr-6">
            https://fanfam.com?ref=394224973
          </Typography>
          <CustomButton primaryButtonSize="xs" className="px-3">
            Copy Link
          </CustomButton>
        </div>
      </div>

      <div className="bg-grey_10 p-4 my-4">
        <Typography variant="p2" className="text-gray-800">
          The minimum payout is ($20), your earnings will roll over to the next
          monthly payout if you do not meet the minimum payout requirements.
        </Typography>
      </div>

      <div className="bg-grey_10 p-4">
        <div className="flex items-center justify-between">
          <Typography variant="subtitle2" className="text-gray-800">
            Referral Wallet
          </Typography>

          <CustomButton primaryButtonSize="xs" className="px-3">
            Request Withdrawal
          </CustomButton>
        </div>

        <Typography variant="h6" className="text-gray-800 pt-4">
          $0.00
        </Typography>
      </div>

      {referralInfo.map(({ id, name, num }) => (
        <div
          key={id}
          className="flex items-center justify-between py-2 px-4 border-b border-gray-200"
        >
          <Typography variant="p3" className="text-gray_500">
            {name}
          </Typography>
          <Typography variant="subtitle3" className="text-gray_500">
            {num}
          </Typography>
        </div>
      ))}

      <div className="ml-[28px]">
        <Typography variant="subtitle2" className="text-gray-800 py-6">
          Referrals History
        </Typography>

        <StatTableHeader data={referralHistoryTableHeader} />
        {referralHistorySampleData.map(({ id, name, date, reward, status }) => (
          <div
            key={id}
            className="flex items-center justify-between py-4 px-2 border-b border-gray-200"
          >
            <Typography variant="p3" className="text-grey_500">
              {name}
            </Typography>
            <Typography variant="p3" className="text-grey_500">
              {date}
            </Typography>
            <Typography variant="p3" className="text-grey_500">
              {reward}
            </Typography>
            <Typography
              variant="p3"
              className={`${
                status === "Pending" ? "text-grey_500" : "text-blue_500"
              }`}
            >
              {status}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Referrals };
