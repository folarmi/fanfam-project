import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type DayAndTimeInputProps = {
  className?: string;
};

const DayAndTimeInput = ({ className }: DayAndTimeInputProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  return (
    <div className={`flex justify-between items-center ${className}`}>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)} // Update the selected date
        dateFormat="MMM d, yyyy" // Format to display
        className="bg-grey_10  text-grey_800 font-normal text-sm border-none focus:outline-none focus:ring-0 placeholder-grey_500 md:px-2 py-1 cursor-pointer"
        customInput={
          <input
            aria-label="Date"
            readOnly
            value={selectedDate?.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
            className="bg-transparent text-grey_800 font-normal text-sm border-none focus:outline-none focus:ring-0 placeholder-grey_500 md:px-2 py-1 cursor-pointer"
          />
        }
      />

      <div className="bg-grey_10 rounded-md p-2 w-1/2">
        <input
          aria-label="time"
          type="time"
          defaultValue={new Date().toISOString().split("T")[1]}
          className="
          bg-transparent 
          text-grey_800 
          font-normal 
          text-sm 
          border-none 
          focus:outline-none 
          focus:ring-0 
          placeholder-grey_500 
          px-2 
          py-1 cursor-pointer"
        />
      </div>
    </div>
  );
};

export default DayAndTimeInput;
