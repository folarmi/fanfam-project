import React from "react";
import Typography from "../forms/Typography";

type props = {
  content: {
    id: number;
    name: string;
  }[];
  onClick?: any;
};

const ModalContent = ({ content, onClick }: props) => {
  return (
    <div>
      {content.map(({ id, name }) => {
        return (
          <div key={id} onClick={() => onClick(name)}>
            <Typography
              variant="p2"
              className="text-grey_700 py-2 hover:bg-blue_200 hover:rounded-lg cursor-pointer px-6"
            >
              {name}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default ModalContent;
