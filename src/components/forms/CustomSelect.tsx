// import ReactSelect from "react-select";

// type CustomSelectProps = {
//   placeholder?: string;
//   className?: string;
//   ifLabel?: boolean;
//   label?: string;
//   options?: { value: string; label: string }[];
// };

// const sampleOptions = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ];

// const CustomSelect = ({
//   placeholder,
//   className,
//   ifLabel,
//   label,
//   options = sampleOptions,
// }: CustomSelectProps) => {
//   return (
//     <div className={`w-full ${className}`}>
//       {ifLabel && (
//         <label htmlFor="" className="pb-2 font-medium text-sm text-grey_800">
//           {label}
//         </label>
//       )}
//       <ReactSelect
//         options={options}
//         className=" rounded-2xl outline-none text-sm w-full "
//         components={{
//           IndicatorSeparator: () => null,
//         }}
//         styles={{
//           placeholder: (baseStyles) => ({
//             ...baseStyles,
//             color: "#BDBFC9",
//             fontWeight: 400,
//             fontSize: 12,
//           }),
//           input: (baseStyles) => ({
//             ...baseStyles,
//             // border: 2,
//             // borderColor: "red",
//             // borderStyle: "solid",
//             borderRadius: 24,
//           }),
//           container: (baseStyles) => ({
//             ...baseStyles,
//             borderRadius: 24,
//             backgroundColor: "yellow",
//             // borderColor: "red",
//             // borderStyle: "solid",
//             // borderRadius: 24,
//           }),
//         }}
//         placeholder={placeholder}
//       />
//     </div>
//   );
// };

// export default CustomSelect;

/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactSelect from "react-select";
import { useController, type UseControllerProps } from "react-hook-form";

type OptionType = { value: string | number; label: string | number };

interface CustomSelectProps {
  name: string;
  control: any;
  rules?: UseControllerProps["rules"];
  placeholder?: string;
  className?: string;
  ifLabel?: boolean;
  label?: string;
  options?: OptionType[];
  isDisabled?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
}

const sampleOptions = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CustomSelect = ({
  name,
  control,
  rules,
  placeholder,
  className,
  ifLabel,
  label,
  options = sampleOptions,
  isDisabled = false,
  isClearable = false,
  isSearchable = true,
  onFocus,
  onBlur,
}: CustomSelectProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <div className={`w-full mb-6 ${className}`}>
      {ifLabel && (
        <label
          htmlFor={name}
          className="pb-2 font-medium text-sm text-grey_800 block"
        >
          {label}
        </label>
      )}
      <ReactSelect
        {...field}
        inputId={name}
        options={options}
        isDisabled={isDisabled}
        isClearable={isClearable}
        isSearchable={isSearchable}
        className="rounded-2xl outline-none text-sm w-full"
        components={{
          IndicatorSeparator: () => null,
        }}
        styles={{
          placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "#BDBFC9",
            fontWeight: 400,
            fontSize: 12,
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderRadius: 24,
            borderColor: error
              ? "#ef4444"
              : state.isFocused
              ? "var(--primary-color, #3b82f6)"
              : "#d1d5db",
            boxShadow: state.isFocused
              ? "0 0 0 1px var(--primary-color, #3b82f6)"
              : "none",
            "&:hover": {
              borderColor: error
                ? "#ef4444"
                : state.isFocused
                ? "var(--primary-color, #3b82f6)"
                : "#d1d5db",
            },
            minHeight: 48,
          }),
          input: (baseStyles) => ({
            ...baseStyles,
            fontSize: 14,
          }),
          singleValue: (baseStyles) => ({
            ...baseStyles,
            fontSize: 14,
          }),
          menu: (baseStyles) => ({
            ...baseStyles,
            borderRadius: 12,
            overflow: "hidden",
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,
            fontSize: 14,
            backgroundColor: state.isSelected
              ? "var(--primary-color, #3b82f6)"
              : state.isFocused
              ? "#f3f4f6"
              : "white",
            color: state.isSelected ? "white" : "#374151",
            "&:active": {
              backgroundColor: "var(--primary-color, #3b82f6)",
            },
          }),
        }}
        placeholder={placeholder}
        onChange={(selectedOption) => {
          field.onChange(selectedOption?.value || null);
        }}
        onFocus={() => {
          if (onFocus) onFocus();
        }}
        onBlur={() => {
          field.onBlur();
          if (onBlur) onBlur();
        }}
        value={options.find((option) => option.value === field.value) || null}
      />
      {error && (
        <span className="text-red-500 text-xs mt-1 block">{error.message}</span>
      )}
    </div>
  );
};

export default CustomSelect;
