import type { FC } from "react";
import Typography from "../forms/Typography";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MonetizeContentProps {
  title: string;
  description: string;
  showBackButton?: boolean;
}

const CreatorHeaderText: FC<MonetizeContentProps> = ({
  title,
  description,
  showBackButton = true,
}: MonetizeContentProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex ">
      {showBackButton && (
        <ArrowLeft
          className="cursor-pointer text-grey_900 hover:text-grey_700 transition-colors mr-1"
          onClick={() => navigate(-1)}
        />
      )}

      <section>
        <p
          className={`font-semibold text-lg text-grey_900 ${
            showBackButton ? "px-0" : "px-4"
          }`}
        >
          {title}
        </p>
        <Typography
          variant="p1"
          className={`${showBackButton ? "px-0" : "px-4"} mb-4`}
        >
          {description}
        </Typography>
      </section>
    </div>
  );
};

export { CreatorHeaderText };
