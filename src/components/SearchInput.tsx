// import { useState } from "react";
import { type ChangeEvent, type KeyboardEvent, type MouseEvent } from "react";
import searchIcon from "../assets/icons/searchIcon.svg";
// import moreIcon from "../assets/icons/moreIcon.svg";
// import Typography from "./forms/Typography";

type SearchInputProps = {
  ifBlur?: boolean;
  onClick?: () => void;
  onSearchChange: (searchTerm: string) => void;
  placeholder?: string;
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
};

const SearchInput = ({
  onClick,
  onSearchChange,
  placeholder = "Search..",
  searchTerm,
  onSearch,
}: SearchInputProps) => {
  // const [tabs] = useState([
  //   { id: 1, name: "All" },
  //   {
  //     id: 2,
  //     name: "Blur",
  //   },
  // ]);

  // const [isActiveTab, setIsActiveTab] = useState("All");
  //   const toggleActiveTab = () => {
  //   }

  // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   onSearchChange(e.target.value);
  // };

  // const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     onSearch(searchTerm);
  //   }
  // };

  // const handleContainerClick = () => {
  //   if (onClick) {
  //     onClick();
  //   }
  // };

  // const handleInputClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  // };

  // const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     onSearch(searchTerm);
  //   }
  // };

  // const handleSearchClick = (e: React.MouseEvent) => {
  //   e.stopPropagation();
  //   onSearch(searchTerm);
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchTerm);
    }
  };

  const handleSearchClick = (e: MouseEvent<HTMLImageElement>) => {
    e.stopPropagation();
    onSearch(searchTerm);
  };

  return (
    <div
      className="w-full bg-grey_20 flex 
    items-center py-5 px-4 justify-between rounded-sm
     border-grey_20 drop-shadow-3xl shadow-header-md mb-2"
      onClick={onClick}
    >
      <div className="flex items-center">
        <img
          src={searchIcon}
          alt="search icon"
          className="pr-1"
          onClick={handleSearchClick}
        />
        <input
          className="bg-grey_20 outline-none text-black"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={(e) => e.stopPropagation()}
        />
      </div>

      {/* {ifBlur && (
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
      )} */}
    </div>
  );
};

export default SearchInput;
