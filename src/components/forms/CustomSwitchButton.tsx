// import React from "react";

// type CustomSwitchButtonProp = {
//   isChecked?: boolean;
//   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
// };

// const CustomSwitchButton = ({
//   isChecked,
//   onChange,
// }: CustomSwitchButtonProp) => {
//   return (
//     <div>
//       <label className="inline-flex items-center cursor-pointer">
//         <input
//           type="checkbox"
//           value=""
//           className="sr-only peer"
//           checked={isChecked}
//           onChange={onChange}
//         />
//         <div
//           className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer
//         peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
//         after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
//          after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue_500"
//         ></div>
//       </label>
//     </div>
//   );
// };

// export default CustomSwitchButton;

/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useController, type UseControllerProps } from "react-hook-form";
import Typography from "./Typography";

interface CustomSwitchButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: any;
  label?: string;
  rules?: UseControllerProps["rules"];
  className?: string;
}

const CustomSwitchButton: React.FC<CustomSwitchButtonProps> = ({
  name,
  control,
  label,
  rules,
  className,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <label className={`inline-flex items-center cursor-pointer ${className}`}>
      {label && (
        <Typography variant="p2" className="text-grey_700 pl-[10px] py-[9px]">
          {label}
        </Typography>
      )}

      <input
        ref={ref}
        type="checkbox"
        className="sr-only peer"
        checked={!!value}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        {...rest}
      />

      <div
        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer
        peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white
        after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full
        after:h-5 after:w-5 after:transition-all peer-checked:bg-blue_500"
      ></div>

      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </label>
  );
};

export default CustomSwitchButton;
