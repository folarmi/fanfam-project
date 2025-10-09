import AccountBackButton from "@components/forms/AccountBackButton";
import CustomSwitchButton from "@components/forms/CustomSwitchButton";
import Typography from "@components/forms/Typography";
import { useForm } from "react-hook-form";

const StorySettings = () => {
  const { control } = useForm();
  return (
    <div>
      <AccountBackButton showBack={false} showMobileBack moduleName="Story" />

      <div className="flex items-center justify-between mt-4 ml-4">
        <div>
          <Typography variant="subtitle2" className="text-grey_800 pb-[2px]">
            Story replies from subscribers
          </Typography>
          <Typography variant="p2" className="text-grey_500">
            Allow subscribers to send messages to your stories. Does not affect
            messages with tips
          </Typography>
        </div>

        <CustomSwitchButton name="email" control={control} label="" />
      </div>
    </div>
  );
};

export { StorySettings };
