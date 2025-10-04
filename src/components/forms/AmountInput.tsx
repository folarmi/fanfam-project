import React from "react";
import "tailwindcss/tailwind.css";
import Typography from "./Typography";

const AmountInput = ({ className }: any) => {
  return (
    <div className={`flex flex-col ${className}`}>
      <Typography
        variant="subtitle2"
        className="text-grey_800 font-medium mb-1"
      >
        Amount <span className="text-grey_400">(minimum $5)</span>
      </Typography>
      <div className="flex items-center border border-grey_50 rounded-full overflow-hidden">
        <span className="bg-white text-black px-3 py-2 border-r border-r-grey_50">
          NGN
        </span>
        <input
          type="number"
          className="flex-1 px-3 py-2 text-black outline-none"
          placeholder="0"
          min="5"
        />
      </div>
    </div>
  );
};

export default AmountInput;
