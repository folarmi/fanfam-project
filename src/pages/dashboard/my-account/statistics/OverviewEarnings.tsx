import CollectionRadioButton from "@components/forms/CollectionRadioButton";
import TimelineAndOverview from "@components/forms/TimelineAndOverview";
import Typography from "@components/forms/Typography";
import { earningsSampleData } from "@/data";

const OverviewEarnings = () => {
  return (
    <>
      <div className="flex items-center justify-between py-[18px] border-t border-grey_10 border-b px-4">
        <Typography variant="subtitle2" className="text-grey_900">
          All Time Earnings
        </Typography>
        <Typography variant="subtitle2" className="text-grey_900">
          $560.00
        </Typography>
      </div>

      <TimelineAndOverview
        month="July"
        timeframe=" July 18, 2024 - Aug 12, 2024 (local time UTC+01:00)"
        amount=" $0.00"
      />

      <section className="px-4">
        <section className="flex items-center justify-between mt-6 border-b border-grey_10 pb-2">
          <Typography variant="labelOne" className="text-grey_500">
            Earnings
          </Typography>
          <Typography variant="labelOne" className="text-grey_500">
            Gross
          </Typography>
          <Typography variant="labelOne" className="text-grey_500">
            Net
          </Typography>
        </section>

        {earningsSampleData?.map(({ id, amount, earningsType, net }) => {
          return (
            <div
              key={id}
              className="flex items-center py-2 justify-between border-b border-grey_10"
            >
              <div className="flex items-center min-w-[110px]">
                <CollectionRadioButton name="" />
                <Typography variant="p2" className="text-grey_600">
                  {earningsType}
                </Typography>
              </div>
              <Typography variant="p2" className="text-grey_600 ">
                {amount}
              </Typography>
              <Typography variant="p2" className="text-grey_600 ">
                {net}
              </Typography>
            </div>
          );
        })}
      </section>
    </>
  );
};

export default OverviewEarnings;
