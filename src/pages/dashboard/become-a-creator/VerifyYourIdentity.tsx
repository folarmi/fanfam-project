import { CreatorHeaderText } from "@/components/atoms/CreatorHeaderText";
import CustomButton from "@/components/forms/CustomButton";
import Typography from "@/components/forms/Typography";
import { verifyData } from "@/data";
import { Link } from "react-router-dom";

const VerifyYourIdentity = () => {
  return (
    <div className="mt-4">
      <div className="mx-4">
        <CreatorHeaderText
          title="Verify your identity"
          description=" Ready to start monetizing your contents become a creator now!"
        />
      </div>

      <div className="mt-2 bg-grey_10 p-4 border-b border-grey_10 mb-2">
        <p className="text-sm font-normal text-grey_800">
          We accept the following methods of Identity verification
        </p>
        <p className="text-sm font-normal text-grey_800 pt-1">
          Passports, Drivers License and National ID Cards
        </p>
      </div>

      {verifyData.map(({ id, image, subtitle, title, buttonText }) => {
        return (
          <Link
            to=""
            className="flex p-4 border border-grey_10 rounded-lg mt-4 mx-4"
            key={id}
          >
            <img src={image} />

            <div className="ml-4">
              <Typography variant="subtitle2" className="">
                {title}
              </Typography>
              <Typography variant="p3" className="">
                {subtitle}
              </Typography>
            </div>

            <div className="flex-shrink-0 ml-auto">
              <CustomButton className="px-6">{buttonText}</CustomButton>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export { VerifyYourIdentity };
