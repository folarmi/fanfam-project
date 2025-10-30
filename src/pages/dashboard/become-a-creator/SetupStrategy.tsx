import { CreatorHeaderText } from "@/components/atoms/CreatorHeaderText";
import { SubscriptionSettings } from "../my-account/settings/SubscriptionSettings";

const SetupStrategy = () => {
  return (
    <div>
      <div className="m-4">
        <CreatorHeaderText
          title="Setup your strategy"
          description="Complete your strategy "
        />
      </div>
      <SubscriptionSettings showHeader={false} />
    </div>
  );
};

export { SetupStrategy };
