import React from "react";

type IconAndNumberProp = {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  number?: number;
  numberColor?: string;
  className?: string;
};

const IconAndNumber = ({
  Icon,
  number,
  numberColor = "#8D8E96",
  className,
}: IconAndNumberProp) => {
  return (
    <div className={`flex items-center mr-4 ${className}`}>
      <Icon width="24" height="24" />
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
};

export default IconAndNumber;
