import Typography from "../forms/Typography";

type TagProps = {
  text: string;
  isActive?: boolean;
  onClick?: () => void;
};

const Tag = ({ text, isActive, onClick }: TagProps) => {
  return (
    <div className="mr-3 cursor-pointer" onClick={onClick}>
      <Typography
        variant="p2"
        className={`rounded-3xl py-[7px] md:py-2 px-[14px] md:px-4 border border-grey_100  ${
          isActive ? "text-blue_500 bg-blue_200" : "text-grey_400 "
        }`}
      >
        {text}
      </Typography>
    </div>
  );
};

export default Tag;
