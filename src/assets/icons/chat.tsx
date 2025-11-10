/* eslint-disable @typescript-eslint/no-explicit-any */
type Prop = {
  className?: string;
  number?: number;
  numberColor?: string;
  onClick: (e: any) => void;
};

const Chat = ({
  className,
  number,
  numberColor = "#8D8E96",
  onClick,
}: Prop) => (
  <div className="flex items-center mr-4 cursor-pointer" onClick={onClick}>
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M12 2.5C6.48 2.5 2 6.48 2 11C2 13.24 2.99 15.31 4.65 16.86C4.24 18.19 3.35 19.71 3.34 19.73C3.26 19.88 3.26 20.06 3.33 20.21C3.41 20.37 3.56 20.48 3.73 20.5C5.24 20.65 6.76 19.89 7.73 19.25C9.01 19.74 10.48 20 12 20C17.52 20 22 16.02 22 11C22 6.48 17.52 2.5 12 2.5ZM12 18.5C10.6 18.5 9.21 18.25 8 17.77C7.84 17.71 7.66 17.74 7.52 17.84C6.92 18.27 6.03 18.72 5.18 18.94C5.42 18.42 5.68 17.81 5.84 17.22C5.9 17.02 5.83 16.81 5.67 16.68C4.11 15.33 3.25 13.3 3.25 11C3.25 6.98 7.09 3.75 12 3.75C16.91 3.75 20.75 6.98 20.75 11C20.75 15.02 16.91 18.5 12 18.5Z"
        fill="#8D8E96"
      />
    </svg>

    {number !== undefined && (
      <p
        style={{
          color: numberColor,
        }}
        className={`text-sm font-normal leading-5 pl-1`}
      >
        {number}
      </p>
    )}
  </div>
);

export default Chat;
