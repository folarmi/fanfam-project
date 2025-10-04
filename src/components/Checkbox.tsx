/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "./forms/Typography";
import { useController, type UseControllerProps } from "react-hook-form";

type CheckboxProps = {
  name: string;
  control: any;
  text: string;
  className?: string;
  rules?: UseControllerProps["rules"];
};

const Checkbox = ({ text, className, rules, name, control }: CheckboxProps) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name,
    control,
    rules,
  });

  return (
    <>
      {" "}
      <div className={`flex w-full ${className}`}>
        <input
          id={name}
          type="checkbox"
          onChange={field.onChange}
          checked={!!field.value}
          className="w-4 h-4 mr-2 bg-[#F8F7F7] rounded shadow-custom-double focus:ring-2"
        />
        <Typography
          variant="p3"
          className="text-[13px] leading-[18px] text-grey_500 w-fit"
        >
          {text}
        </Typography>
      </div>
      {error && (
        <span className="text-red-500 text-xs mt-1">{error.message}</span>
      )}
    </>
  );
};

export default Checkbox;
