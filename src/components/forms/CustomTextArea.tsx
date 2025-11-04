/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Controller,
  type Control,
  type RegisterOptions,
} from "react-hook-form";

interface TextAreaFieldProps {
  name: string;
  control: Control<any>;
  rules?: RegisterOptions;
  placeholder?: string;
  rows?: number;
  cols?: number;
  readOnly?: boolean;
  onFocus?: () => void;
  onBlur?: () => void;
  className?: string;
  borderRadius?: string;
}

const CustomTextArea = ({
  name,
  control,
  rules,
  placeholder = " ",
  rows = 5,
  cols = 5,
  readOnly = false,
  onFocus,
  className = "",
}: TextAreaFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className={`flex flex-col gap-2 mb-6 w-full ${className}`}>
          <textarea
            readOnly={readOnly}
            id={name}
            name={field.name}
            ref={field.ref}
            onChange={field.onChange}
            rows={rows}
            cols={cols}
            className="w-full outline-none pt-3 bg-grey_20"
            placeholder={placeholder}
            value={field.value || ""}
            onFocus={() => {
              if (onFocus) onFocus();
            }}
            style={{
              backgroundColor: readOnly ? "hsl(0,0%, 90%)" : "",
              cursor: readOnly ? "not-allowed" : "initial",
            }}
          />

          {error && (
            <span className="text-red-500 text-xs">{error.message}</span>
          )}
        </div>
      )}
    />
  );
};

export { CustomTextArea };
