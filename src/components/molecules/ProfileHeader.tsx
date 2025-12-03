import type { IconAndNumberProp, ProfileHeaderProps } from "@/lib/types";
import IconAndNumber from "../IconAndNumber";
import Pictures from "@/assets/icons/pictures";
import Videos from "@/assets/icons/videos";
import Like from "@/assets/icons/like";
import ProfileLike from "@/assets/icons/profileLike";
import { DefaultCoverImage } from "../atoms/DefaultCoverImage";

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  coverImage,
  children,
  displayName,
}) => {
  const stats: IconAndNumberProp[] = [
    {
      Icon: Pictures,
      number: 24,
      numberColor: "#ffffff",
      className: "cursor-pointer",
      reactionType: "LIKE",
      publicid: "fff",
      isActive: false,
    },
    {
      Icon: Videos,
      number: 24,
      numberColor: "#fffff",
      className: "cursor-pointer",
      reactionType: "LIKE",
      publicid: "fffk",
      isActive: false,
    },
    {
      Icon: Like,
      number: 24,
      numberColor: "#ffffff",
      className: "cursor-pointer",
      reactionType: "LIKE",
      publicid: "fffl",
      isActive: false,
    },
    {
      Icon: ProfileLike,
      number: 24,
      numberColor: "#fffff",
      className: "cursor-pointer",
      reactionType: "LIKE",
      publicid: "ffgf",
      isActive: false,
    },
  ];
  return (
    <div className="w-full relative">
      {coverImage ? (
        <img
          src={coverImage}
          alt="cover"
          className="w-full h-40 sm:h-56 md:h-64 lg:h-72 object-cover rounded-md"
        />
      ) : (
        <DefaultCoverImage displayName={displayName} theme="modern" />
      )}
      <div className="flex items-center absolute top-3 pl-4">
        {stats.map((stat) => (
          <div className="" key={stat.publicid}>
            <IconAndNumber
              Icon={stat.Icon}
              number={stat.number}
              numberColor={stat.numberColor}
              className={stat.className}
              reactionType={stat.reactionType}
              publicid={stat.publicid}
              isActive={stat.isActive}
            />
          </div>
        ))}
      </div>
      {children}
    </div>
  );
};

export { ProfileHeader };
