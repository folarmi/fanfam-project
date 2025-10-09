import AccountBackButton from "@components/forms/AccountBackButton";
import CustomSwitchButton from "@components/forms/CustomSwitchButton";
import Typography from "@components/forms/Typography";
import { useForm } from "react-hook-form";

const ChatSettings = () => {
  const { control } = useForm();
  return (
    <div>
      <AccountBackButton showBack={false} showMobileBack moduleName="Chat" />

      <div className="flex items-center pb-2 border-b pt-4 border-grey_10 pl-4">
        <Typography variant="p2" className="text-grey_800 pr-6">
          Don’t accept messages without a tip from free followers whom you don’t
          follow back
        </Typography>
        <CustomSwitchButton name="" control={control} label="" />
      </div>

      <div className="flex items-center justify-between mt-4 ml-4">
        <div>
          <Typography variant="subtitle2" className="text-grey_800 pb-[2px]">
            Welcome message
          </Typography>
          <Typography variant="p2" className="text-grey_500">
            Send a welcome message to new fans
          </Typography>
        </div>

        <CustomSwitchButton name="" control={control} label="" />
      </div>
    </div>
  );
};

export { ChatSettings };
