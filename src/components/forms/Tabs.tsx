/* eslint-disable @typescript-eslint/no-explicit-any */
import Typography from "./Typography";

type TabsProps = {
  tabsArray: { id: number; name: string }[];
  //   onClick: any;
  setIsActiveTab: any;
  isActiveTab: any;
};

const Tabs = ({ tabsArray, isActiveTab, setIsActiveTab }: TabsProps) => {
  return (
    <div className="flex flex-wrap  items-center my-3 md:my-4">
      {tabsArray?.map(({ id, name }) => {
        return (
          <div
            key={id}
            onClick={() => setIsActiveTab(name)}
            className={`mr-2 py-2 px-4 cursor-pointer rounded-2xl mt-2 md:mt-0 ${
              isActiveTab === name
                ? "bg-blue_200 border border-blue_100"
                : "bg-white border border-grey_10"
            }`}
          >
            <Typography
              variant="p3"
              className="text-grey_800 whitespace-nowrap"
            >
              {name}
            </Typography>
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
