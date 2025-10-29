import type { FC } from "react";
import Typography from "../forms/Typography";

interface MonetizeContentProps {
  title: string;
  description: string;
}

const CreatorHeaderText: FC<MonetizeContentProps> = ({
  title,
  description,
}: MonetizeContentProps) => (
  <div>
    <p className="font-semibold text-lg text-grey_900 px-4">{title}</p>
    <Typography variant="p1" className="px-4 mb-4">
      {description}
    </Typography>
  </div>
);

export { CreatorHeaderText };
