import React from "react";
import Typography from "../forms/Typography";

type prop = {
  text: string;
  width?: string;
};

const EmptyState = ({ text, width = "204" }: prop) => {
  return (
    <div className="flex items-center justify-center">
      <Typography
        style={{
          width: `${width}px`,
        }}
        variant="p2"
        className={`text-grey_600 text-center py-20`}
      >
        {text}
      </Typography>
    </div>
  );
};

export default EmptyState;
