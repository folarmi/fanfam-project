/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "./Typography";

type SocialButtonType = {
  buttonText: string;
  image: any;
};

const SocialButton = ({ buttonText, image }: SocialButtonType) => {
  return (
    <div className="ml-4 flex items-center justify-center border border-blue_500 bg-primary bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn mt-6 rounded-3xl py-3">
      <img src={image} alt="image" className="w-6 h-6 mr-2" />
      <Typography variant="subtitle2" className="text-white">
        {buttonText}
      </Typography>
    </div>
  );
};

export default SocialButton;
