import type { SubscriptionBundleProps } from "@/lib/types";

const SubscriptionBundle: React.FC<SubscriptionBundleProps> = ({
  currentSubscription,
  bundles = [],
  onSubscribe,
}) => {
  return (
    <div className="bg-white drop-shadow-4xl mb-2 py-2">
      {currentSubscription && (
        <section className="border-b border-grey_10 pb-4 px-4">
          <h3 className="font-semibold">Current subscription</h3>
          <p className="pb-2 pt-3 text-grey_500 text-sm">
            Ends: {currentSubscription.endDate}
          </p>
          <button
            className="w-full bg-blue_500 text-white py-2 px-4 rounded-lg"
            onClick={() => onSubscribe?.(currentSubscription)}
          >
            RENEW - {currentSubscription?.amount}
          </button>
        </section>
      )}

      <section className="pt-4 px-4">
        <h3 className="font-semibold pb-4">Subscription bundles</h3>
        {bundles.map((bundle, index) => (
          <button
            key={index}
            className="w-full bg-grey_100 hover:bg-grey_200 py-3 px-4 rounded-lg mb-4 flex justify-between items-center"
            onClick={() => onSubscribe?.(bundle)}
          >
            <span className="font-medium">{bundle?.durationInMonths}</span>
            <span className="text-blue_500 font-semibold">
              {bundle?.amount}
            </span>
          </button>
        ))}
      </section>
    </div>
  );
};

export { SubscriptionBundle };
