import AccountBackButton from "@/components/forms/AccountBackButton";
import CustomButton from "@/components/forms/CustomButton";
import CustomCheckBox from "@/components/forms/CustomCheckBox";
import Typography from "@/components/forms/Typography";
import { sampleLoginSessions } from "@/data";
import { useState } from "react";

const LoginSessions = () => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div>
      <AccountBackButton />

      <section className="mx-4">
        <div className="flex items-center mt-4">
          <CustomCheckBox
            checked={isSelected}
            onChange={() => setIsSelected(!isSelected)}
          />
          <div className="ml-4 drop-shadow-5x shadow-post-button w-[104px] text-sm">
            <CustomButton primaryButtonSize="xs" className="px-4">
              Close Session
            </CustomButton>
          </div>
        </div>

        <div className="mt-6">
          {sampleLoginSessions?.map(
            ({ id, deviceName, ipAddress, status, lastSeen }) => {
              return (
                <div
                  key={id}
                  className="flex items-center justify-between py-4 border-b border-grey_10"
                >
                  <section className="flex items-center">
                    <CustomCheckBox
                      checked={isSelected}
                      onChange={() => setIsSelected(!isSelected)}
                    />

                    <div className="ml-2">
                      <Typography
                        variant="subtitle2"
                        className="text-grey_800 pb-[2px]"
                      >
                        {deviceName}
                      </Typography>
                      <Typography variant="p2" className="text-grey_500">
                        {ipAddress}
                      </Typography>
                    </div>
                  </section>

                  {status === false && (
                    <Typography variant="p2" className="text-grey_800">
                      {lastSeen}
                    </Typography>
                  )}

                  {status && (
                    <div className="border border-green_600 py-[10px] px-[14px] rounded-full bg-green_50">
                      <Typography className="text-green_600" variant="labelOne">
                        Active now
                      </Typography>
                    </div>
                  )}
                </div>
              );
            }
          )}
        </div>
      </section>
    </div>
  );
};

export { LoginSessions };
