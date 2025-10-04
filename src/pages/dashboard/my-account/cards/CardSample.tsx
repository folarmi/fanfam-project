/* eslint-disable @typescript-eslint/no-explicit-any */
import editCard from "@/assets/icons/editCard.svg";
import deleteCard from "@/assets/icons/deleteCard.svg";
import Typography from "@/components/forms/Typography";

type CardSampleProp = {
  cardImage: any;
  status: string;
  setAsDefault?: boolean;
};

const CardSample = ({ cardImage, status, setAsDefault }: CardSampleProp) => {
  return (
    <div className="border border-grey_10 rounded-md mb-4">
      <div className="flex items-center justify-between p-4">
        <img src={cardImage} alt="cardImage" className="w-12 h-4" />

        <div className="flex items-center">
          <div className="flex items-center py-2 px-4 rounded-2xl border border-grey_10 mr-4">
            <img src={editCard} alt="editCard" />{" "}
            <Typography variant="p3" className="text-grey_800 pl-1">
              Edit Card Details
            </Typography>
          </div>

          <div className="flex items-center py-2 px-4 rounded-2xl border border-grey_10">
            <img src={deleteCard} alt="editCard" />{" "}
            <Typography variant="p3" className="text-red_400 pl-1">
              Delete Card
            </Typography>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 flex items-center border-b border-grey_10">
        <Typography variant="titleTwo" className="text-grey_800 pr-2">
          4567 **** **** 1267
        </Typography>
        <Typography variant="p3" className="text-grey_600">
          Expires on 12/24
        </Typography>
      </div>

      <div className="flex items-center justify-between py-3 px-4">
        <Typography variant="p3" className="text-grey_600 ">
          {status}
        </Typography>

        {setAsDefault && (
          <Typography variant="subtitle3" className="text-blue_500">
            Set as Default Card
          </Typography>
        )}
      </div>
    </div>
  );
};

export { CardSample };
