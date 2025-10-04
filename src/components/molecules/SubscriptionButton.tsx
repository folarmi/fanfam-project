import React from "react";
import Typography from "../forms/Typography";

interface SubscriptionButtonProps {
  textOne: string;
  textTwo: string;
  className?: string;
  onClick?: any;
}

const SubscriptionButton = ({
  textOne,
  textTwo,
  className,
  onClick,
}: SubscriptionButtonProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between px-3 py-2 border border-blue_500 bg-primary bg-gradient-to-r from-gradient-start to-gradient-end shadow-primary-btn rounded-3xl ${className}`}
    >
      <Typography variant="subtitle3" className="text-white">
        {textOne}
      </Typography>
      <Typography variant="subtitle3" className="text-white">
        {textTwo}
      </Typography>
    </div>
  );
};

export default SubscriptionButton;
