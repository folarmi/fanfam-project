type Props = {
  id: number;
  title: string;
  body: string;
  icon: string;
  bgColor: string;
  color: string;
};

const LandingPageCard = ({ bgColor, body, icon, title, color }: Props) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color,
      }}
      className="rounded-[40px] px-10 py-[50px] flex flex-col"
    >
      <img src={icon} className="w-20 h-20" />
      <p className="pt-10 pb-5 font-clash font-medium text-[34px]">{title}</p>
      <p className="text-lg font-normal">{body}</p>
    </div>
  );
};

export { LandingPageCard };
