import Typography from "./Typography";

type BlueBorderedButtonProps = {
  text: string;
  className?: string;
  onClick?: () => void;
};

const BlueBorderedButton = ({
  text,
  className,
  onClick,
}: BlueBorderedButtonProps) => {
  return (
    <div
      className={`border border-blue_500 rounded-3xl py-2 px-3 drop-shadow-6xl bg-subscribe-gradient shadow-inner-white ${className}`}
      onClick={onClick}
    >
      <Typography variant="subtitle3" className="text-blue_500">
        {text}
      </Typography>
    </div>
  );
};

export default BlueBorderedButton;
