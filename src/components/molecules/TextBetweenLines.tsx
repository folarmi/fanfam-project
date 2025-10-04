import React from "react";

interface TextBetweenLinesProps {
  text: string;
}

const TextBetweenLines: React.FC<TextBetweenLinesProps> = ({ text }) => {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-xs text-gray-500">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
};

export default TextBetweenLines;
