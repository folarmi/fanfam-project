import StatTableHeader from "@/components/forms/StatTableHeader";
import TimelineAndOverview from "@/components/forms/TimelineAndOverview";
import Typography from "@/components/forms/Typography";
import { reachPromotionHeader } from "@/data";
import gift from "@/assets/icons/gift.svg";
import link from "@/assets/icons/link.svg";

type props = {
  isActiveTab: string;
};

const ReachPromotions = ({ isActiveTab }: props) => {
  return (
    <div>
      <TimelineAndOverview
        month="July"
        timeframe="July 18, 2024 - Aug 12, 2024 (local time UTC+01:00)"
        amount={`${
          isActiveTab === "Promotions"
            ? "0 Claims 1 offer"
            : "0 Claims 1 Trials"
        }`}
      />

      <div className="mt-12 px-4">
        <StatTableHeader data={reachPromotionHeader} />

        <div className="flex justify-between py-4 border-b border-grey_10">
          <section className="flex items-center justify-between ">
            <img
              src={isActiveTab === "Promotions" ? gift : link}
              alt="gift"
              className="w-4 h-4"
            />
            <Typography variant="subtitle3" className="text-grey_500 pl-2">
              {isActiveTab === "Promotions"
                ? " Limited offer free trial for 1 day"
                : "happy link (trial for 1 day)"}
            </Typography>
          </section>

          <Typography variant="labelOne" className="text-grey_500">
            Expired
          </Typography>
        </div>

        <div className="flex items-center justify-between  py-4">
          <Typography variant="p3" className="text-grey_500">
            25 June, 2024
          </Typography>
          <Typography variant="p3" className="text-grey_500">
            25 June, 2024
          </Typography>
          <Typography variant="p3" className="text-grey_500">
            1
          </Typography>
          <Typography variant="p3" className="text-grey_500">
            0
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default ReachPromotions;
