import type { SubscriptionBundleProps } from "@/lib/types";
import Typography from "../forms/Typography";
import SubscriptionButton from "./SubscriptionButton";

const SubscriptionBundle: React.FC<SubscriptionBundleProps> = ({
  currentSubscription,
  data = [],
}) => {
  return (
    <div className="bg-white drop-shadow-4xl mb-2 py-2">
      {currentSubscription && (
        <section className="border-b border-grey_10 pb-4 px-4">
          <Typography variant="subtitle2">Current subscription</Typography>
          <Typography variant="p3" className="pb-2 pt-3 text-grey_500">
            Ends: 10 June 2024
          </Typography>

          <SubscriptionButton textOne="RENEW" textTwo="$15 per month" />
        </section>
      )}

      <section className="pt-4 px-4">
        <Typography variant="subtitle2" className="pb-4">
          Subscription bundles
        </Typography>
        {data?.map((bundle) => (
          <SubscriptionButton
            textOne={`${bundle?.durationInMonths} months`}
            textTwo={bundle?.amount}
            className="mb-4"
            key={bundle?.publicId}
          />
        ))}
      </section>
    </div>
  );
};

export { SubscriptionBundle };
