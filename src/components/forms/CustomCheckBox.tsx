/* eslint-disable @typescript-eslint/no-explicit-any */

type CheckBoxProps = {
  iflabel?: boolean;
  checked: boolean;
  onChange: any;
  labelText?: string;
  labelStyles?: string;
};

const CustomCheckBox = ({
  iflabel,
  checked,
  onChange,
  labelText,
  labelStyles,
}: CheckBoxProps) => {
  return (
    <div className="flex items-center">
      <input
        checked={checked}
        id="checked-checkbox"
        type="checkbox"
        value=""
        onChange={onChange}
        className="hidden"
      />
      <label
        htmlFor="checked-checkbox"
        className={`relative cursor-pointer w-4 h-4 rounded-sm flex items-center justify-center ${
          checked ? "bg-blue_500" : "bg-white border-[0.67px] border-grey_400"
        }`}
      >
        <svg
          className={`w-2 h-[6.5px] text-white ${checked ? "block" : "hidden"}`}
          width="10"
          height="9"
          viewBox="0 0 10 9"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5L4 7.5L9 1"
            stroke="white"
            strokeWidth="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </label>
      {iflabel && (
        <label htmlFor="checked-checkbox" className={`ms-2 ${labelStyles}`}>
          {labelText}
        </label>
      )}
    </div>
  );
};

export default CustomCheckBox;
