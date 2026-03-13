import {
  useController,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";
import Typography from "./Typography";

export type PollChoice = {
  choice?: string;
  publicId?: string;
  createdBy?: string;
  lastModifiedBy?: string;
  createdDate?: string;
  lastModifiedDate?: string;
};

interface PollChoicesProps<T extends FieldValues> {
  pollChoices: PollChoice[];
  name: Path<T>;
  control: Control<T>;
  className?: string;
}

const PollChoices = <T extends FieldValues>({
  pollChoices,
  name,
  control,
  className = "",
}: PollChoicesProps<T>) => {
  const {
    field: { value, onChange },
    fieldState: { error },
  } = useController({
    name,
    control,
    rules: {
      required: "Please select an option",
    },
  });

  return (
    <div className={className}>
      {pollChoices?.map((item, index) => {
        const optionValue = item?.publicId ?? `option-${index}`;
        const isSelected = value === optionValue;

        return (
          <label
            key={optionValue}
            className="mb-3 flex cursor-pointer items-center justify-between"
          >
            <input
              type="radio"
              name={name}
              value={optionValue}
              checked={isSelected}
              onChange={() => onChange(optionValue)}
              className="sr-only"
            />

            <section className="flex items-center">
              <div
                className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                  isSelected ? "border-blue_500" : "border-grey_300"
                }`}
              >
                <div
                  className={`h-2 w-2 rounded-full transition-all ${
                    isSelected ? "bg-blue_500" : "bg-transparent"
                  }`}
                />
              </div>

              <Typography variant="p2" className="pl-2 text-grey_800">
                {item?.choice || `Option ${index + 1}`}
              </Typography>
            </section>
          </label>
        );
      })}

      {error && (
        <Typography variant="p2" className="text-red-500 mt-1">
          {error.message}
        </Typography>
      )}
    </div>
  );
};

export { PollChoices };
