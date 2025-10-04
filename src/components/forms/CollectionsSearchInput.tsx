import searchIcon from "@/assets/icons/searchIcon.svg";

type searchInputProps = {
  placeholder?: string;
  className?: string;
};
const CollectionsSearchInput = ({
  placeholder,
  className,
}: searchInputProps) => {
  return (
    <div className={`flex items-center mr-4  ${className}`}>
      <div className="relative w-full ">
        <input
          type="text"
          placeholder={placeholder}
          className="w-full px-4 py-[5px] pl-8 bg-white text-sm font-normal border border_grey_20 rounded-3xl shadow-search-input"
        />
        <img
          src={searchIcon}
          alt="searchIcon"
          className="w-4 h-4 left-3 top-2 absolute"
        />
      </div>
    </div>
  );
};

export default CollectionsSearchInput;
