import Typography from "./Typography";
import { statHeader } from "@/data";

type prop = {
  data?: {
    id: number;
    name: string;
  }[];
};

const StatTableHeader = ({ data = statHeader }: prop) => {
  return (
    <div className="flex items-center justify-between border-b border-grey_10">
      {data?.map(({ id, name }) => {
        return (
          <Typography
            key={id}
            variant="labelOne"
            className="text-grey_500 py-2"
          >
            {name}
          </Typography>
        );
      })}
    </div>
  );
};

export default StatTableHeader;
