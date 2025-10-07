/* eslint-disable @typescript-eslint/no-explicit-any */
import { useController, type UseControllerProps } from "react-hook-form";
import Typography from "./Typography";

interface CollectionRadioButtonProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control?: any;
  value?: string;
  label?: string;
  rules?: UseControllerProps["rules"];
  className?: string;
}

const CollectionRadioButton: React.FC<CollectionRadioButtonProps> = ({
  name,
  control,
  value,
  label,
  rules,
  className,
  ...rest
}) => {
  const {
    field: { onChange, onBlur, value: fieldValue, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <label
      className={`flex items-center justify-between w-full cursor-pointer ${className}`}
    >
      <Typography variant="p2" className="text-grey_700 pl-[10px] py-[9px]">
        {label}
      </Typography>

      <input
        ref={ref}
        type="radio"
        name={name}
        value={value}
        checked={fieldValue === value}
        onChange={() => onChange(value)}
        onBlur={onBlur}
        className="form-radio h-4 w-4 accent-primary focus:ring-0 focus:outline-none"
        {...rest}
      />

      {error && <span className="text-red-500 text-xs">{error.message}</span>}
    </label>
  );
};

export default CollectionRadioButton;
