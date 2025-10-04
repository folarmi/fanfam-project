import React from "react";
import Typography from "./Typography";

const CollectionRadioButton = ({
  label,
  name,
  value,
  checked,
  onChange,
}: any) => {
  return (
    <label className="flex items-center">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="form-radio h-4 w-4"
      />
      <Typography variant="p2" className="text-grey_700 pl-[10px] py-[9px]">
        {label}
      </Typography>
    </label>
  );
};

export default CollectionRadioButton;
