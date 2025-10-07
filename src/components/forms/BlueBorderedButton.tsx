import Typography from "./Typography";

type BlueBorderedButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
};

const BlueBorderedButton = ({
  text,
  className,
  onClick,
  type,
}: BlueBorderedButtonProps) => {
  return (
    <button
      className={`border border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white ${className}`}
      onClick={onClick}
      type={type}
    >
      <Typography variant="subtitle3" className="text-blue_500">
        {text}
      </Typography>
    </button>
  );
};

export default BlueBorderedButton;
