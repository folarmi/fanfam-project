// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import Typography from "./forms/Typography";

// import filter from "../assets/icons/filter.svg";
// import mediaToggle from "../assets/icons/mediaToggle.svg";
// import switchList from "../assets/icons/switchList.svg";
// import Timeline from "./cards/ViewPost";
// import defaultAvatar from "../assets/defaultAvatar.svg";
// import timelineImage from "../assets/timelineImage.svg";
// import timelineTwo from "../assets/timelineTwo.svg";
// import { images, sortOptions } from "../data";
// import RadioButton from "./RadioButtonLabel";
// import AudioMedia from "./AudioMedia";
// import AudioFilesWhenList from "./AudioFilesWhenList";
// import defaultLiveAvatar from "../assets/defaultLiveAvatar.svg";
// import VideoMedia from "./VideoMedia";
// import PotraitOrLandScapeModal from "./PotraitOrLandScapeModal";

// const Media = () => {
//   const [mediaTabs] = useState([
//     {
//       id: 1,
//       name: "All",
//       number: "",
//     },
//     {
//       id: 2,
//       name: "Photos",
//       number: "25",
//     },
//     {
//       id: 3,
//       name: "Videos",
//       number: "36",
//     },
//     {
//       id: 4,
//       name: "Audio",
//       number: "8",
//     },
//   ]);
//   const [isMediaTabActive, setIsMediaTabActive] = useState("All");
//   const [ifList, setIfList] = useState(false);
//   const [sortModal, setSortModal] = useState(false);
//   const [selectedValue, setSelectedValue] = useState("option1");
//   const [potraitOrLandScape, setPotraitOrLandScape] = useState(false);
//   const [currentImage, setCurrentImage] = useState("");

//   const toggleList = () => {
//     setIfList(!ifList);
//   };

//   const toggleSortModal = () => {
//     setSortModal(!sortModal);
//   };

//   const handleChange = (e: any) => {
//     setSelectedValue(e.target.value);
//   };

//   const toggleProtraitModal = (img: any) => {
//     setPotraitOrLandScape(!potraitOrLandScape);
//     setCurrentImage(img);
//   };

//   return (
//     <div>
//       <div className={`py-4 flex items-center px-4 justify-between`}>
//         <div className="flex items-center">
//           {mediaTabs.map(({ id, name, number }) => {
//             return (
//               <div
//                 onClick={() => setIsMediaTabActive(name)}
//                 className={`flex items-center cursor-pointer px-[14px] py-[7px] rounded-3xl hover:bg-blue_200 ${
//                   isMediaTabActive === name ? "bg-blue_200" : "bg-white"
//                 }`}
//                 key={id}
//               >
//                 <Typography
//                   variant="p2"
//                   className={`pr-1 ${
//                     isMediaTabActive === name
//                       ? "text-blue_500"
//                       : "text-grey_400"
//                   }`}
//                 >
//                   {name}
//                 </Typography>
//                 {number && (
//                   <Typography
//                     className={`${
//                       isMediaTabActive === name
//                         ? "text-blue_500"
//                         : "text-grey_400"
//                     }`}
//                     variant="subtitle2"
//                   >
//                     {number}
//                   </Typography>
//                 )}
//               </div>
//             );
//           })}
//         </div>

//         <section className="flex items-center">
//           <div
//             onClick={toggleSortModal}
//             className="flex items-center border border-grey_10 drop-shadow-7xl
//         py-2 px-3 bg-secondary-btn
//          rounded-3xl cursor-pointer mr-6 relative"
//           >
//             <Typography variant="subtitle3" className="pr-1">
//               Sort
//             </Typography>
//             <img src={filter} alt="filter" loading="lazy" />
//           </div>

//           {sortModal && (
//             <div className="flex flex-col left-[80%] top-[22%] absolute bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
//               {sortOptions?.map(({ id, name }) => {
//                 return (
//                   <div
//                     className="hover:bg-blue_200 hover:rounded-lg cursor-pointer"
//                     key={id}
//                   >
//                     <RadioButton
//                       label={name}
//                       name="options"
//                       value={name}
//                       checked={selectedValue === name}
//                       onChange={handleChange}
//                     />
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {ifList ? (
//             <img
//               onClick={toggleList}
//               src={switchList}
//               alt="switchList"
//               className="cursor-pointer"
//             />
//           ) : (
//             <img
//               onClick={toggleList}
//               src={mediaToggle}
//               alt="mediaToggle"
//               className="cursor-pointer"
//             />
//           )}
//         </section>
//       </div>

//       {!ifList && isMediaTabActive !== "Audio" && (
//         <div className="flex items-center flex-wrap gap-[1px] cursor-pointer">
//           {images.map((src, index) => (
//             <div
//               className="w-[210px] h-[210px] overflow-hidden"
//               key={index}
//               onClick={() => toggleProtraitModal(src)}
//             >
//               <img
//                 src={src}
//                 alt={`Gallery ${index}`}
//                 className="w-full h-full object-cover"
//                 loading="lazy"
//               />
//             </div>
//           ))}
//         </div>
//       )}

//       {ifList && isMediaTabActive === "All" && (
//         <>
//           <div className="relative">
//             <Timeline
//               profileName="Priscilia yummy"
//               // fix the two lines below
//               showModal={sortModal}
//               toggleModal={toggleSortModal}
//               avatar={defaultAvatar}
//               handle="@yummychill54 ."
//               time="3 h ago"
//               paragraphOne="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               paragraphTwo="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               timeLineImage={timelineImage}
//               ifParagraph={true}
//               ifIcon={false}
//               bgColor="#fafafa"
//               //   setShowMoreModal={setShowMoreModalTwo}
//               //   showMoreModal={showMoreModalTwo}
//             />
//           </div>

//           <div className="relative">
//             <Timeline
//               profileName="Priscilia yummy"
//               // fix the two lines below
//               showModal={sortModal}
//               toggleModal={toggleSortModal}
//               avatar={defaultAvatar}
//               handle="@yummychill54 ."
//               time="3 h ago"
//               paragraphOne="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               paragraphTwo="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               timeLineImage={timelineTwo}
//               ifParagraph={true}
//               bgColor="#fafafa"
//               //   setShowMoreModal={setShowMoreModalTwo}
//               //   showMoreModal={showMoreModalTwo}
//             />
//           </div>
//         </>
//       )}

//       {!ifList && isMediaTabActive === "Audio" && <AudioMedia />}

//       {ifList && isMediaTabActive === "Audio" && (
//         <>
//           <div className="relative">
//             <AudioFilesWhenList
//               profileName="Priscilia yummy"
//               avatar={defaultLiveAvatar}
//               handle="@yummychill54 ."
//               time="3 h ago"
//               paragraphOne="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               paragraphTwo="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               // showMoreModal={showMoreModal}
//               // setShowMoreModal={setShowMoreModal}
//             />
//           </div>

//           <div className="relative">
//             <AudioFilesWhenList
//               profileName="Priscilia yummy"
//               avatar={defaultLiveAvatar}
//               handle="@yummychill54 ."
//               time="3 h ago"
//               paragraphOne="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               paragraphTwo="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
//         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
//         etra justo pretium sollic itudin digni ssim non solli citudin sit
//         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
//         dictum a."
//               // showMoreModal={showMoreModal}
//               // setShowMoreModal={setShowMoreModal}
//             />
//           </div>
//         </>
//       )}

//       {isMediaTabActive === "Videos" && <VideoMedia />}

//       {potraitOrLandScape && (
//         <PotraitOrLandScapeModal
//           potraitOrLandScapeModal={potraitOrLandScape}
//           toggleProtraitModal={toggleProtraitModal}
//           img={currentImage}
//         />
//       )}
//     </div>
//   );
// };

// export default Media;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Typography from "./forms/Typography";
import filter from "../assets/icons/filter.svg";
import mediaToggle from "../assets/icons/mediaToggle.svg";
import switchList from "../assets/icons/switchList.svg";
import Timeline from "./cards/ViewPost";
import defaultAvatar from "../assets/defaultAvatar.svg";
import { sortOptions } from "../data";
import RadioButton from "./RadioButtonLabel";
import AudioMedia from "./AudioMedia";
import AudioFilesWhenList from "./AudioFilesWhenList";
import defaultLiveAvatar from "../assets/defaultLiveAvatar.svg";
import VideoMedia from "./VideoMedia";
import PotraitOrLandScapeModal from "./PotraitOrLandScapeModal";
import { Loader } from "./molecules/Loader";
import type { ProfilePostProps, StoryPost } from "@/lib/types";
import { formatTimeAgo } from "@/utils/helperTwo";
import { transformReactions } from "@/lib/reaction";

const Media = ({
  creatorContent,
  creatorContentIsLoading,
}: ProfilePostProps) => {
  const [mediaTabs, setMediaTabs] = useState([
    { id: 1, name: "All", number: "" },
    { id: 2, name: "Photos", number: "25" },
    { id: 3, name: "Videos", number: "36" },
    { id: 4, name: "Audio", number: "8" },
  ]);
  const [isMediaTabActive, setIsMediaTabActive] = useState("All");
  const [ifList, setIfList] = useState(false);
  const [sortModal, setSortModal] = useState(false);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [potraitOrLandScape, setPotraitOrLandScape] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const toggleList = () => setIfList(!ifList);
  const toggleSortModal = () => setSortModal(!sortModal);
  const handleChange = (e: any) => setSelectedValue(e.target.value);
  const toggleProtraitModal = (img: any) => {
    setPotraitOrLandScape(!potraitOrLandScape);
    setCurrentImage(img);
  };

  const contentItems: StoryPost[] = creatorContent || [];

  // Filter posts that have media files
  const mediaItems = contentItems?.filter((item) => item.mediaFiles.length > 0);

  // Count media by type
  const photosCount = mediaItems?.reduce(
    (count, item) =>
      count + item.mediaFiles.filter((m) => m.mediaType === "PHOTO").length,
    0
  );
  const videosCount = mediaItems?.reduce(
    (count, item) =>
      count + item.mediaFiles.filter((m) => m.mediaType === "VIDEO").length,
    0
  );
  const audioCount = mediaItems?.reduce(
    (count, item) =>
      count + item.mediaFiles.filter((m) => m.mediaType === "AUDIO").length,
    0
  );

  // Update tab counts
  useState(() => {
    setMediaTabs([
      { id: 1, name: "All", number: "" },
      { id: 2, name: "Photos", number: photosCount.toString() },
      { id: 3, name: "Videos", number: videosCount.toString() },
      { id: 4, name: "Audio", number: audioCount.toString() },
    ]);
  });

  // Filter by media type
  const filteredMedia = mediaItems?.filter((item) => {
    if (isMediaTabActive === "All") return true;
    if (isMediaTabActive === "Photos") {
      return item.mediaFiles.some((m) => m?.mediaType === "PHOTO");
    }
    if (isMediaTabActive === "Videos") {
      return item?.mediaFiles?.some((m) => m?.mediaType === "VIDEO");
    }
    if (isMediaTabActive === "Audio") {
      return item?.mediaFiles?.some((m) => m?.mediaType === "AUDIO");
    }
    return false;
  });

  // Extract all media URLs for grid view
  const allMediaUrls = filteredMedia?.flatMap((item) => {
    if (isMediaTabActive === "All") {
      return item.mediaFiles
        ?.filter((m) => m?.mediaType !== "AUDIO")
        ?.map((m) => m?.mediaLink);
    }
    if (isMediaTabActive === "Photos") {
      return item?.mediaFiles
        ?.filter((m) => m?.mediaType === "PHOTO")
        ?.map((m) => m?.mediaLink);
    }
    if (isMediaTabActive === "Videos") {
      return item?.mediaFiles
        ?.filter((m) => m?.mediaType === "VIDEO")
        ?.map((m) => m?.mediaLink);
    }
    return [];
  });

  // Get audio items
  const audioItems = filteredMedia?.filter((item) =>
    item?.mediaFiles?.some((m) => m?.mediaType === "AUDIO")
  );

  if (creatorContentIsLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="py-4 flex items-center px-4 justify-between">
        <div className="flex items-center">
          {mediaTabs?.map(({ id, name, number }) => (
            <div
              onClick={() => setIsMediaTabActive(name)}
              className={`flex items-center cursor-pointer px-[14px] py-[7px] rounded-3xl hover:bg-blue_200 ${
                isMediaTabActive === name ? "bg-blue_200" : "bg-white"
              }`}
              key={id}
            >
              <Typography
                variant="p2"
                className={`pr-1 ${
                  isMediaTabActive === name ? "text-blue_500" : "text-grey_400"
                }`}
              >
                {name}
              </Typography>
              {number && (
                <Typography
                  className={`${
                    isMediaTabActive === name
                      ? "text-blue_500"
                      : "text-grey_400"
                  }`}
                  variant="subtitle2"
                >
                  {number}
                </Typography>
              )}
            </div>
          ))}
        </div>

        <section className="flex items-center">
          <div
            onClick={toggleSortModal}
            className="flex items-center border border-grey_10 drop-shadow-7xl
        py-2 px-3 bg-secondary-btn rounded-3xl cursor-pointer mr-6 relative"
          >
            <Typography variant="subtitle3" className="pr-1">
              Sort
            </Typography>
            <img src={filter} alt="filter" loading="lazy" />
          </div>

          {sortModal && (
            <div className="flex flex-col left-[80%] top-[22%] absolute bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
              {sortOptions?.map(({ id, name }) => (
                <div
                  className="hover:bg-blue_200 hover:rounded-lg cursor-pointer"
                  key={id}
                >
                  <RadioButton
                    label={name}
                    name="options"
                    value={name}
                    checked={selectedValue === name}
                    onChange={handleChange}
                  />
                </div>
              ))}
            </div>
          )}

          {ifList ? (
            <img
              onClick={toggleList}
              src={switchList}
              alt="switchList"
              className="cursor-pointer"
            />
          ) : (
            <img
              onClick={toggleList}
              src={mediaToggle}
              alt="mediaToggle"
              className="cursor-pointer"
            />
          )}
        </section>
      </div>

      {/* Grid View - Only for Photos and Videos */}
      {!ifList && isMediaTabActive !== "Audio" && (
        <div className="flex items-center flex-wrap gap-[1px] cursor-pointer">
          {allMediaUrls.length > 0 ? (
            allMediaUrls.map((src, index) => (
              <div
                className="w-[210px] h-[210px] overflow-hidden"
                key={index}
                onClick={() => toggleProtraitModal(src)}
              >
                <img
                  src={src}
                  alt={`Gallery ${index}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            ))
          ) : (
            <div className="w-full text-center py-8 text-grey_500">
              <Typography variant="p2">
                No {isMediaTabActive.toLowerCase()} found
              </Typography>
            </div>
          )}
        </div>
      )}

      {/* List View - Show full posts */}
      {ifList && isMediaTabActive !== "Audio" && (
        <>
          {filteredMedia.length > 0 ? (
            filteredMedia.map((item) => {
              // Get the first media file based on current tab
              const firstMedia =
                isMediaTabActive === "All"
                  ? item?.mediaFiles.find((m) => m.mediaType !== "AUDIO")
                  : isMediaTabActive === "Photos"
                  ? item?.mediaFiles.find((m) => m.mediaType === "PHOTO")
                  : item?.mediaFiles.find((m) => m.mediaType === "VIDEO");

              if (!firstMedia) return null;

              return (
                <div className="relative" key={item.publicId}>
                  <Timeline
                    profileName={item.creator.split("@")[0]}
                    showModal={sortModal}
                    toggleModal={toggleSortModal}
                    avatar={defaultAvatar}
                    handle={`@${item.creator.split("@")[0]}`}
                    time={formatTimeAgo(item.createdDate)}
                    paragraphOne={item.message}
                    paragraphTwo=""
                    timeLineImage={firstMedia.mediaLink}
                    ifParagraph={true}
                    ifIcon={false}
                    bgColor="#fafafa"
                    reactionsData={transformReactions(item?.reactions)}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-center py-8 text-grey_500">
              <Typography variant="p2">
                No {isMediaTabActive.toLowerCase()} posts yet
              </Typography>
            </div>
          )}
        </>
      )}

      {/* Audio Grid View */}
      {!ifList && isMediaTabActive === "Audio" && (
        <>
          {audioItems?.length > 0 ? (
            <AudioMedia />
          ) : (
            <div className="w-full text-center py-8 text-grey_500">
              <Typography variant="p2">No audio found</Typography>
            </div>
          )}
        </>
      )}

      {/* Audio List View */}
      {ifList && isMediaTabActive === "Audio" && (
        <>
          {audioItems?.length > 0 ? (
            audioItems?.map((item) => (
              <div className="relative" key={item.publicId}>
                <AudioFilesWhenList
                  profileName={item.creator.split("@")[0]}
                  avatar={defaultLiveAvatar}
                  handle={`@${item.creator.split("@")[0]}`}
                  time={formatTimeAgo(item.createdDate)}
                  paragraphOne={item.message}
                  paragraphTwo=""
                />
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-grey_500">
              <Typography variant="p2">No audio posts yet</Typography>
            </div>
          )}
        </>
      )}

      {/* Video Component (if you have a special video component) */}
      {isMediaTabActive === "Videos" &&
        !ifList &&
        allMediaUrls.length === 0 && <VideoMedia />}

      {potraitOrLandScape && (
        <PotraitOrLandScapeModal
          potraitOrLandScapeModal={potraitOrLandScape}
          toggleProtraitModal={toggleProtraitModal}
          img={currentImage}
        />
      )}
    </div>
  );
};

export default Media;
