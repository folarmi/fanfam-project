import verify from "@/public/icons/verify.svg";
import horizontalMore from "@/public/icons/horizontalMore.svg";
import Typography from "../forms/Typography";

type SuggestionProps = {
  isLive?: boolean;
  img: string;
};
const Suggestion = ({ isLive, img }: SuggestionProps) => {
  return (
    <div className="relative rounded-lg mb-3 overflow-hidden">
      <img src={img} alt="randomPicture" className="w-full h-auto" />

      <div className="absolute top-3 right-3 z-10">
        <img src={horizontalMore} alt="horizontalMore" />
      </div>

      <div className="bg-custom-gradient absolute bottom-0 w-full p-4 z-20">
        <div className="flex items-center">
          <Typography variant="titleTwo" className="text-white pr-1">
            Priscilia yummy
          </Typography>
          <img src={verify} alt="verify" />
        </div>

        <div className="flex items-center">
          <Typography variant="p2" className="text-white pt-[2px]">
            @yummychill54
          </Typography>
          {isLive && (
            <div className="flex items-center ml-2">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
              <Typography className="text-red-500" variant="p3">
                Live
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Suggestion;
