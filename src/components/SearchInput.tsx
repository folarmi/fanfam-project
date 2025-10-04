import { useState } from "react";
import searchIcon from "../assets/icons/searchIcon.svg";
import moreIcon from "../assets/icons/moreIcon.svg";
import Typography from "./forms/Typography";

type SearchInputProps = {
  ifBlur?: boolean;
};

const SearchInput = ({ ifBlur = true }: SearchInputProps) => {
  const [tabs] = useState([
    { id: 1, name: "All" },
    {
      id: 2,
      name: "Blur",
    },
  ]);

  const [isActiveTab, setIsActiveTab] = useState("All");
  //   const toggleActiveTab = () => {

  //   }
  return (
    <div
      className="w-full bg-grey_20 flex 
    items-center py-5 px-4 justify-between rounded-sm
     border-grey_20 drop-shadow-3xl shadow-header-md mb-2"
    >
      <div className="flex items-center">
        <img src={searchIcon} alt="search icon" className="pr-1" />
        <input
          className="bg-grey_20 outline-none text-grey_200"
          placeholder="Search.."
        />
      </div>

      {ifBlur && (
        <div className="flex items-center">
          {tabs.map(({ id, name }) => {
            return (
              <div
                key={id}
                onClick={() => setIsActiveTab(name)}
                className={`cursor-pointer py-2 px-4 rounded-3xl mr-[14px] drop-shadow-3xl ${
                  isActiveTab === name
                    ? "bg-blue_200 text-black"
                    : "bg-white text-grey_400"
                }`}
              >
                <Typography variant="p1">{name}</Typography>
              </div>
            );
          })}
          <img src={moreIcon} alt="search icon" className="pr-1" />
        </div>
      )}
    </div>
  );
};

export default SearchInput;

// <div className="flex items-center justify-center">
//   <div className="relative">
//     <input
//       type="text"
//       placeholder="Search user list"
//       className="px-4 py-2 pl-10 text-gray-600 bg-white border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//       style={{
//         boxShadow:
//           "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
//       }}
//     />
//     <svg
//       className="absolute w-5 h-5 text-gray-400 left-3 top-2.5"
//       fill="currentColor"
//       xmlns="http://www.w3.org/2000/svg"
//       viewBox="0 0 24 24"
//     >
//       <path
//         fillRule="evenodd"
//         d="M10 2a8 8 0 105.293 14.293l4.707 4.707a1 1 0 001.414-1.414l-4.707-4.707A8 8 0 0010 2zM4 10a6 6 0 1110.071 4.071l-.07-.071A6 6 0 014 10z"
//         clipRule="evenodd"
//       />
//     </svg>
//   </div>
// </div>;
