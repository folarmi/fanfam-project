import AccountBackButton from "@components/forms/AccountBackButton";
import CustomSwitchButton from "@components/forms/CustomSwitchButton";
import Typography from "@components/forms/Typography";
import { useForm } from "react-hook-form";

const CollectionSettings = () => {
  const { control } = useForm();
  return (
    <div>
      <AccountBackButton
        showBack={false}
        showMobileBack
        moduleName="Collections"
      />

      <div className="flex items-center justify-between mt-4 ml-4">
        <Typography variant="p2" className="text-grey_800">
          Auto follow back my fans
        </Typography>
        <CustomSwitchButton name="" control={control} label="" />
      </div>

      <div className="flex items-center justify-between mt-4 ml-4">
        <Typography variant="p2" className="text-grey_800">
          Unfollow when the subscription has ended
        </Typography>
        <CustomSwitchButton name="" control={control} label="" />
      </div>

      <div className="flex items-center justify-between mt-4 ml-4">
        <div>
          <Typography variant="subtitle2" className="text-grey_800 pb-[2px]">
            1 Free month for referrer
          </Typography>
          <Typography variant="p2" className="text-grey_500">
            When a subscribed fan shares your profile, they will receive
            additional 1 month subscription
          </Typography>
        </div>

        <CustomSwitchButton name="" control={control} label="" />
      </div>
    </div>
  );
};

export { CollectionSettings };
