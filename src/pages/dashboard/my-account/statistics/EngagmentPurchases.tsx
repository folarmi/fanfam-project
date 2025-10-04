import StatTableHeader from "@components/forms/StatTableHeader";
import TimelineAndOverview from "@components/forms/TimelineAndOverview";
import Typography from "@components/forms/Typography";
import { sampleEngagementTableData } from "@/data";
import imagePlaceholder from "@/assets/imagePlaceholder.svg";

const EngagmentPurchases = () => {
  return (
    <div>
      <div className="">
        <TimelineAndOverview
          month="July"
          timeframe="July 18, 2024 - Aug 12, 2024 (local time UTC+01:00)"
          amount="2 Post, $0.00"
        />
      </div>

      <div className="mt-12 px-4">
        <StatTableHeader />

        <div className="">
          {sampleEngagementTableData?.map(
            ({ date, views, tips, price, purchases, image, text, imageNo }) => {
              return (
                <section key={date}>
                  <div className="flex items-center justify-between border-b border-grey_10 py-2">
                    <Typography variant="subtitle3" className="text-grey_700">
                      {date}
                    </Typography>
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

                  <div className="flex items-center my-2">
                    <img src={image} className="w-10 h-10" alt="sample" />
                    <div className="ml-2">
                      <Typography variant="p3" className="text-grey_700 ">
                        {text}
                      </Typography>
                      <div className="flex items-center">
                        <img
                          alt="imagePlaceholder"
                          className="w-[14px] h-[14px]"
                          src={imagePlaceholder}
                        />
                        <Typography variant="p3" className="text-grey_500">
                          {imageNo}
                        </Typography>
                      </div>
                    </div>

                    <Typography
                      variant="subtitle3"
                      className="text-blue_500 ml-auto"
                    >
                      FULL STATS
                    </Typography>
                  </div>
                </section>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
};

export default EngagmentPurchases;
