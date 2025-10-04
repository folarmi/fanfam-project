import React from "react";
import Typography from "./forms/Typography";

const RadioButton = ({ label, name, value, checked, onChange }: any) => {
  return (
    <label className="flex items-center justify-between px-4">
      <Typography variant="p2" className="text-grey_700 py-2">
        {label}
      </Typography>
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4"
      />
    </label>
  );
};

export default RadioButton;
