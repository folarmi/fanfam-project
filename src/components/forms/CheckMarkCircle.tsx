type prop = {
  bgColor: string;
};

const CheckMarkCircle = ({ bgColor }: prop) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className={`flex items-center justify-center w-4 h-4 rounded-full`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-3 w-3 text-white"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
};

export default CheckMarkCircle;
// bg-[${bgColor}]
