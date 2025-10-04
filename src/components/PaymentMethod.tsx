import "tailwindcss/tailwind.css";
import masterCardLogo from "../assets/icons/masterCard.svg"; // Update with the correct path to the MasterCard logo

const PaymentMethod = () => {
  return (
    <div className="flex flex-col  my-6">
      <label className="text-grey_800 font-medium mb-1">Payment method</label>
      <div className="flex items-center border border-gray-300 rounded-full overflow-hidden bg-white">
        <img src={masterCardLogo} alt="MasterCard Logo" className="h-8 w-12" />
        <span className="flex-1 px-3 py-2 text-black">3345 **** **** 5778</span>
        <div className="px-3 py-2">
          <svg
            className="h-5 w-5 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
