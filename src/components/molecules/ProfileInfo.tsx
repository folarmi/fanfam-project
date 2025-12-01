import type { ProfileInfoProps } from "@/lib/types";

const ProfileInfo: React.FC<ProfileInfoProps> = ({
  profileData,
  isExpanded,
  onToggleExpanded,
  showReadMore = false,
}) => {
  return (
    <section className="px-4 bg-grey_20 drop-shadow-4xl mb-2">
      <div className="relative flex items-center">
        <div className="absolute -top-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
            <img
              src={profileData?.profilePic}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      <section className="mt-10">
        <div className="md:hidden flex items-center">
          <img src="/location-icon.svg" alt="location" />
          <span className="text-grey_400 pl-1 text-sm">
            {profileData?.location || "N/A"}
          </span>
        </div>

        <div className="flex items-center">
          <h2 className="text-grey_800 font-bold pr-1">
            {profileData?.fullName || ""}
          </h2>
        </div>

        <p className="text-grey_800 pt-[2px] text-sm">
          {profileData?.username || ""}
        </p>

        <p className="text-grey_700 py-4 text-sm">
          {profileData?.bio || "N/A"}
          {isExpanded && <span> .... Additional bio content here...</span>}
          {showReadMore && (
            <span
              onClick={onToggleExpanded}
              className="font-medium text-sm text-blue_500 cursor-pointer ml-1"
            >
              read {isExpanded ? "less" : "more"}
            </span>
          )}
        </p>
      </section>
    </section>
  );
};

export { ProfileInfo };
