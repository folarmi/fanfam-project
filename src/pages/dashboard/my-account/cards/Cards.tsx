import { useState } from "react";
import visa from "@/assets/icons/visa.svg";
import masterCard from "@/assets/icons/masterCard.svg";
import americanExpress from "@/assets/icons/americanExpress.svg";
import paypal from "@/assets/icons/paypal.svg";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";
import AddCardHeader from "./AddCardHeader";
import Typography from "@/components/forms/Typography";
import { CardSample } from "./CardSample";
import { AddNewCardForm } from "./AddNewCardForm";

const Cards = () => {
  const { showAccountOnMobile } = useAppSelector(
    (state: RootState) => state.settingMobile
  );
  const [isCardAdded, setIsCardAdded] = useState(true);
  const [addNewCard, setAddNewCard] = useState(false);

  return (
    <div className={`${showAccountOnMobile ? "w-full" : "hidden md:block"}`}>
      <AddCardHeader addNewCard={addNewCard} setAddNewCard={setAddNewCard} />

      <div className="bg-grey_10 p-4 mt-4 mx-[14px]">
        <Typography variant="p2" className="text-grey_800  pb-4">
          We are fully compliant with Payment Card Industry Data Security
          Standards. The charges on your credit card statement will appear as
          FanFam
        </Typography>

        <div className="flex items-center gap-x-2">
          <img src={visa} alt="visa" className="w-12 h-4" />
          <img src={masterCard} alt="masterCard" className="w-10 h-6" />
          <img
            src={americanExpress}
            alt="americanExpress"
            className="w-8 h-8"
          />
          <img src={paypal} alt="visa" className="w-[92px] h-6" />
        </div>
      </div>

      {!isCardAdded && !addNewCard && (
        <p
          onClick={() => setIsCardAdded(true)}
          className="text-grey_800 font-normal text-sm text-center pt-[70px] cursor-pointer"
        >
          No Card added, click add card to add your cards
        </p>
      )}

      {isCardAdded && !addNewCard && (
        <div
          onClick={() => setIsCardAdded(false)}
          className="mt-6 cursor-pointer mx-[14px]"
        >
          <CardSample
            cardImage={visa}
            status=" Status: Active / Default Card"
          />

          <CardSample
            setAsDefault
            cardImage={masterCard}
            status="Status: Inactive"
          />
        </div>
      )}

      {addNewCard && <AddNewCardForm />}
    </div>
  );
};

export default Cards;
