// // /* eslint-disable @typescript-eslint/no-explicit-any */
// // import { useState } from "react";
// // import Typography from "./forms/Typography";

// // import filter from "../assets/icons/filter.svg";
// // import mediaToggle from "../assets/icons/mediaToggle.svg";
// // import switchList from "../assets/icons/switchList.svg";
// // import Timeline from "./cards/ViewPost";
// // import defaultAvatar from "../assets/defaultAvatar.svg";
// // import timelineImage from "../assets/timelineImage.svg";
// // import timelineTwo from "../assets/timelineTwo.svg";
// // import { images, sortOptions } from "../data";
// // import RadioButton from "./RadioButtonLabel";
// // import AudioMedia from "./AudioMedia";
// // import AudioFilesWhenList from "./AudioFilesWhenList";
// // import defaultLiveAvatar from "../assets/defaultLiveAvatar.svg";
// // import VideoMedia from "./VideoMedia";
// // import PotraitOrLandScapeModal from "./PotraitOrLandScapeModal";

// // const Media = () => {
// //   const [mediaTabs] = useState([
// //     {
// //       id: 1,
// //       name: "All",
// //       number: "",
// //     },
// //     {
// //       id: 2,
// //       name: "Photos",
// //       number: "25",
// //     },
// //     {
// //       id: 3,
// //       name: "Videos",
// //       number: "36",
// //     },
// //     {
// //       id: 4,
// //       name: "Audio",
// //       number: "8",
// //     },
// //   ]);
// //   const [isMediaTabActive, setIsMediaTabActive] = useState("All");
// //   const [ifList, setIfList] = useState(false);
// //   const [sortModal, setSortModal] = useState(false);
// //   const [selectedValue, setSelectedValue] = useState("option1");
// //   const [potraitOrLandScape, setPotraitOrLandScape] = useState(false);
// //   const [currentImage, setCurrentImage] = useState("");

// //   const toggleList = () => {
// //     setIfList(!ifList);
// //   };

// //   const toggleSortModal = () => {
// //     setSortModal(!sortModal);
// //   };

// //   const handleChange = (e: any) => {
// //     setSelectedValue(e.target.value);
// //   };

// //   const toggleProtraitModal = (img: any) => {
// //     setPotraitOrLandScape(!potraitOrLandScape);
// //     setCurrentImage(img);
// //   };

// //   return (
// //     <div>
// //       <div className={`py-4 flex items-center px-4 justify-between`}>
// //         <div className="flex items-center">
// //           {mediaTabs.map(({ id, name, number }) => {
// //             return (
// //               <div
// //                 onClick={() => setIsMediaTabActive(name)}
// //                 className={`flex items-center cursor-pointer px-[14px] py-[7px] rounded-3xl hover:bg-blue_200 ${
// //                   isMediaTabActive === name ? "bg-blue_200" : "bg-white"
// //                 }`}
// //                 key={id}
// //               >
// //                 <Typography
// //                   variant="p2"
// //                   className={`pr-1 ${
// //                     isMediaTabActive === name
// //                       ? "text-blue_500"
// //                       : "text-grey_400"
// //                   }`}
// //                 >
// //                   {name}
// //                 </Typography>
// //                 {number && (
// //                   <Typography
// //                     className={`${
// //                       isMediaTabActive === name
// //                         ? "text-blue_500"
// //                         : "text-grey_400"
// //                     }`}
// //                     variant="subtitle2"
// //                   >
// //                     {number}
// //                   </Typography>
// //                 )}
// //               </div>
// //             );
// //           })}
// //         </div>

// //         <section className="flex items-center">
// //           <div
// //             onClick={toggleSortModal}
// //             className="flex items-center border border-grey_10 drop-shadow-7xl
// //         py-2 px-3 bg-secondary-btn
// //          rounded-3xl cursor-pointer mr-6 relative"
// //           >
// //             <Typography variant="subtitle3" className="pr-1">
// //               Sort
// //             </Typography>
// //             <img src={filter} alt="filter" loading="lazy" />
// //           </div>

// //           {sortModal && (
// //             <div className="flex flex-col left-[80%] top-[22%] absolute bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
// //               {sortOptions?.map(({ id, name }) => {
// //                 return (
// //                   <div
// //                     className="hover:bg-blue_200 hover:rounded-lg cursor-pointer"
// //                     key={id}
// //                   >
// //                     <RadioButton
// //                       label={name}
// //                       name="options"
// //                       value={name}
// //                       checked={selectedValue === name}
// //                       onChange={handleChange}
// //                     />
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           )}

// //           {ifList ? (
// //             <img
// //               onClick={toggleList}
// //               src={switchList}
// //               alt="switchList"
// //               className="cursor-pointer"
// //             />
// //           ) : (
// //             <img
// //               onClick={toggleList}
// //               src={mediaToggle}
// //               alt="mediaToggle"
// //               className="cursor-pointer"
// //             />
// //           )}
// //         </section>
// //       </div>

// //       {!ifList && isMediaTabActive !== "Audio" && (
// //         <div className="flex items-center flex-wrap gap-[1px] cursor-pointer">
// //           {images.map((src, index) => (
// //             <div
// //               className="w-[210px] h-[210px] overflow-hidden"
// //               key={index}
// //               onClick={() => toggleProtraitModal(src)}
// //             >
// //               <img
// //                 src={src}
// //                 alt={`Gallery ${index}`}
// //                 className="w-full h-full object-cover"
// //                 loading="lazy"
// //               />
// //             </div>
// //           ))}
// //         </div>
// //       )}

// //       {ifList && isMediaTabActive === "All" && (
// //         <>
// //           <div className="relative">
// //             <Timeline
// //               profileName="Priscilia yummy"
// //               // fix the two lines below
// //               showModal={sortModal}
// //               toggleModal={toggleSortModal}
// //               avatar={defaultAvatar}
// //               handle="@yummychill54 ."
// //               time="3 h ago"
// //               paragraphOne="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               paragraphTwo="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               timeLineImage={timelineImage}
// //               ifParagraph={true}
// //               ifIcon={false}
// //               bgColor="#fafafa"
// //               //   setShowMoreModal={setShowMoreModalTwo}
// //               //   showMoreModal={showMoreModalTwo}
// //             />
// //           </div>

// //           <div className="relative">
// //             <Timeline
// //               profileName="Priscilia yummy"
// //               // fix the two lines below
// //               showModal={sortModal}
// //               toggleModal={toggleSortModal}
// //               avatar={defaultAvatar}
// //               handle="@yummychill54 ."
// //               time="3 h ago"
// //               paragraphOne="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               paragraphTwo="Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               timeLineImage={timelineTwo}
// //               ifParagraph={true}
// //               bgColor="#fafafa"
// //               //   setShowMoreModal={setShowMoreModalTwo}
// //               //   showMoreModal={showMoreModalTwo}
// //             />
// //           </div>
// //         </>
// //       )}

// //       {!ifList && isMediaTabActive === "Audio" && <AudioMedia />}

// //       {ifList && isMediaTabActive === "Audio" && (
// //         <>
// //           <div className="relative">
// //             <AudioFilesWhenList
// //               profileName="Priscilia yummy"
// //               avatar={defaultLiveAvatar}
// //               handle="@yummychill54 ."
// //               time="3 h ago"
// //               paragraphOne="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               paragraphTwo="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               // showMoreModal={showMoreModal}
// //               // setShowMoreModal={setShowMoreModal}
// //             />
// //           </div>

// //           <div className="relative">
// //             <AudioFilesWhenList
// //               profileName="Priscilia yummy"
// //               avatar={defaultLiveAvatar}
// //               handle="@yummychill54 ."
// //               time="3 h ago"
// //               paragraphOne="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               paragraphTwo="   Lorem ipsum dolor sit amet consectetur. Amet dolor arcu praesent
// //         mi. Nulla sed cursus quis mas sa nato que at adip iscing. Phar
// //         etra justo pretium sollic itudin digni ssim non solli citudin sit
// //         pellentesque ipsum. Molestie dui tempus nec maecenas eget justo
// //         dictum a."
// //               // showMoreModal={showMoreModal}
// //               // setShowMoreModal={setShowMoreModal}
// //             />
// //           </div>
// //         </>
// //       )}

// //       {isMediaTabActive === "Videos" && <VideoMedia />}

// //       {potraitOrLandScape && (
// //         <PotraitOrLandScapeModal
// //           potraitOrLandScapeModal={potraitOrLandScape}
// //           toggleProtraitModal={toggleProtraitModal}
// //           img={currentImage}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default Media;

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useEffect, useState } from "react";
// import Typography from "./forms/Typography";
// import filter from "../assets/icons/filter.svg";
// // import mediaToggle from "../assets/icons/mediaToggle.svg";
// // import switchList from "../assets/icons/switchList.svg";
// // import defaultAvatar from "../assets/defaultAvatar.svg";
// import { sortOptions } from "../data";
// import RadioButton from "./RadioButtonLabel";
// // import AudioMedia from "./AudioMedia";
// // import AudioFilesWhenList from "./AudioFilesWhenList";
// // import defaultLiveAvatar from "../assets/defaultLiveAvatar.svg";
// // import VideoMedia from "./VideoMedia";
// // import PotraitOrLandScapeModal from "./PotraitOrLandScapeModal";
// import { Loader } from "./molecules/Loader";
// import type { ProfilePostProps, StoryPost } from "@/lib/types";
// import { formatTimeAgo } from "@/utils/helperTwo";
// import { transformReactions } from "@/lib/reaction";
// // import MediaGrid from "./molecules/MediaGrid";

// const Media = ({
//   creatorContent,
//   creatorContentIsLoading,
// }: ProfilePostProps) => {
//   const [mediaTabs, setMediaTabs] = useState([
//     { id: 1, name: "All", number: "" },
//     { id: 2, name: "Photos", number: "25" },
//     { id: 3, name: "Videos", number: "36" },
//     { id: 4, name: "Audio", number: "8" },
//   ]);
//   const [isMediaTabActive, setIsMediaTabActive] = useState("All");
//   const [ifList, setIfList] = useState(false);
//   const [sortModal, setSortModal] = useState(false);
//   const [selectedValue, setSelectedValue] = useState("option1");
//   const [potraitOrLandScape, setPotraitOrLandScape] = useState(false);
//   const [currentImage, setCurrentImage] = useState("");

//   const toggleList = () => setIfList(!ifList);
//   const toggleSortModal = () => setSortModal(!sortModal);
//   const handleChange = (e: any) => setSelectedValue(e.target.value);
//   const toggleProtraitModal = (img: any) => {
//     setPotraitOrLandScape(!potraitOrLandScape);
//     setCurrentImage(img);
//   };

//   const contentItems: StoryPost[] = creatorContent || [];

//   // Filter posts that have media files
//   const mediaItems = contentItems?.filter(
//     (item) => item?.mediaFiles?.length > 0,
//   );

//   // Count media by type
//   const photosCount = mediaItems?.reduce(
//     (count, item) =>
//       count + item.mediaFiles.filter((m) => m.mediaType === "PHOTO").length,
//     0,
//   );
//   const videosCount = mediaItems?.reduce(
//     (count, item) =>
//       count + item.mediaFiles.filter((m) => m.mediaType === "VIDEO").length,
//     0,
//   );
//   const audioCount = mediaItems?.reduce(
//     (count, item) =>
//       count + item.mediaFiles.filter((m) => m.mediaType === "AUDIO").length,
//     0,
//   );

//   // Update tab counts
//   useEffect(() => {
//     setMediaTabs([
//       { id: 1, name: "All", number: "" },
//       { id: 2, name: "Photos", number: photosCount.toString() },
//       { id: 3, name: "Videos", number: videosCount.toString() },
//       { id: 4, name: "Audio", number: audioCount.toString() },
//     ]);
//   }, [photosCount, videosCount, audioCount]);

//   // Filter by media type
//   const filteredMedia = mediaItems.filter((item: any) => {
//     if (isMediaTabActive === "All") return true;
//     if (isMediaTabActive === "Photos") {
//       return item.mediaFiles.some((m: any) => m?.mediaType === "PHOTO");
//     }
//     if (isMediaTabActive === "Videos") {
//       return item.mediaFiles.some((m: any) => m?.mediaType === "VIDEO");
//     }
//     if (isMediaTabActive === "Audio") {
//       return item.mediaFiles.some((m: any) => m?.mediaType === "AUDIO");
//     }
//     return false;
//   });

//   // Get audio items
//   const audioItems = filteredMedia?.filter((item) =>
//     item?.mediaFiles?.some((m) => m?.mediaType === "AUDIO"),
//   );

//   if (creatorContentIsLoading) {
//     return <Loader />;
//   }

//   return (
//     // <div>
//     //   <div className="py-4 flex items-center px-4 justify-between">
//     //     <div className="flex items-center">
//     //       {mediaTabs?.map(({ id, name, number }) => (
//     //         <div
//     //           onClick={() => setIsMediaTabActive(name)}
//     //           className={`flex items-center cursor-pointer px-[14px] py-[7px] rounded-3xl hover:bg-blue_200 ${
//     //             isMediaTabActive === name ? "bg-blue_200" : "bg-white"
//     //           }`}
//     //           key={id}
//     //         >
//     // <Typography
//     //   variant="p2"
//     //   className={`pr-1 ${
//     //     isMediaTabActive === name ? "text-blue_500" : "text-grey_400"
//     //   }`}
//     // >
//     //   {name}
//     // </Typography>
//     //           {number && (
//     // <Typography
//     //   className={`${
//     //     isMediaTabActive === name
//     //       ? "text-blue_500"
//     //       : "text-grey_400"
//     //   }`}
//     //   variant="subtitle2"
//     // >
//     //   {number}
//     // </Typography>
//     //           )}
//     //         </div>
//     //       ))}
//     //     </div>

//     //     <section className="flex items-center">
//     //       <div
//     //         onClick={toggleSortModal}
//     //         className="flex items-center border border-grey_10 drop-shadow-7xl
//     //     py-2 px-3 bg-secondary-btn rounded-3xl cursor-pointer mr-6 relative"
//     //       >
//     // <Typography variant="subtitle3" className="pr-1">
//     //   Sort
//     // </Typography>
//     //         <img src={filter} alt="filter" loading="lazy" />
//     //       </div>

//     //       {sortModal && (
//     //         <div className="flex flex-col left-[80%] top-[22%] absolute bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
//     //           {sortOptions?.map(({ id, name }) => (
//     //             <div
//     //               className="hover:bg-blue_200 hover:rounded-lg cursor-pointer"
//     //               key={id}
//     //             >
//     //               <RadioButton
//     //                 label={name}
//     //                 name="options"
//     //                 value={name}
//     //                 checked={selectedValue === name}
//     //                 onChange={handleChange}
//     //               />
//     //             </div>
//     //           ))}
//     //         </div>
//     //       )}

//     //       {ifList ? (
//     //         <img
//     //           onClick={toggleList}
//     //           src={switchList}
//     //           alt="switchList"
//     //           className="cursor-pointer"
//     //         />
//     //       ) : (
//     //         <img
//     //           onClick={toggleList}
//     //           src={mediaToggle}
//     //           alt="mediaToggle"
//     //           className="cursor-pointer"
//     //         />
//     //       )}
//     //     </section>
//     //   </div>

//     //   {/* Grid View - Only for Photos and Videos */}
//     //   {!ifList && isMediaTabActive !== "Audio" && (
//     //     <div className="flex items-center flex-wrap gap-[1px] cursor-pointer">
//     //       {creatorContent && creatorContent.length > 0 ? (
//     //         <>
//     //           {creatorContent?.map((item: StoryPost, index: number) => {
//     //             return (
//     //               <div
//     //                 className="w-[210px] h-[210px] overflow-hidden"
//     //                 key={item.publicId}
//     //                 onClick={() =>
//     //                   toggleProtraitModal(item?.mediaFiles[index]?.mediaLink)
//     //                 }
//     //               >
//     //                 <MediaGrid
//     //                   key={item.publicId}
//     //                   timeLineImage={item.mediaFiles}
//     //                 />
//     //               </div>
//     //             );
//     //           })}
//     //         </>
//     //       ) : (
//     //         <div className="w-full text-center py-8 text-grey_500">
//     //           <Typography variant="p2">
//     //             No {isMediaTabActive.toLowerCase()} found
//     //           </Typography>
//     //         </div>
//     //       )}
//     //     </div>
//     //   )}

//     //   {/* List View - Show full posts */}
//     //   {ifList && isMediaTabActive !== "Audio" && (
//     //     <>
//     //       {filteredMedia.length > 0 ? (
//     //         filteredMedia.map((item) => {
//     //           // Get the first media file based on current tab
//     //           const firstMedia =
//     //             isMediaTabActive === "All"
//     //               ? item?.mediaFiles.find((m) => m.mediaType !== "AUDIO")
//     //               : isMediaTabActive === "Photos"
//     //               ? item?.mediaFiles.find((m) => m.mediaType === "PHOTO")
//     //               : item?.mediaFiles.find((m) => m.mediaType === "VIDEO");

//     //           if (!firstMedia) return null;

//     //           return (
//     // <div className="relative" key={item.publicId}>
//     //   <Timeline
//     //     profileName={item.creator.split("@")[0]}
//     //     showModal={sortModal}
//     //     toggleModal={toggleSortModal}
//     //     avatar={defaultAvatar}
//     //     handle={`@${item.creator.split("@")[0]}`}
//     //     time={formatTimeAgo(item.createdDate)}
//     //     paragraphOne={item.message}
//     //     paragraphTwo=""
//     //     timeLineImage={firstMedia.mediaLink}
//     //     ifParagraph={true}
//     //     ifIcon={false}
//     //     bgColor="#fafafa"
//     //     reactionsData={transformReactions(item?.reactions)}
//     //   />
//     // </div>
//     //           );
//     //         })
//     //       ) : (
//     //         <div className="text-center py-8 text-grey_500">
//     // <Typography variant="p2">
//     //   No {isMediaTabActive.toLowerCase()} posts yet
//     // </Typography>
//     //         </div>
//     //       )}
//     //     </>
//     //   )}

//     //   {/* Audio Grid View */}
//     //   {!ifList && isMediaTabActive === "Audio" && (
//     //     <>
//     //       {audioItems?.length > 0 ? (
//     //         <AudioMedia />
//     //       ) : (
//     //         <div className="w-full text-center py-8 text-grey_500">
//     //           <Typography variant="p2">No audio found</Typography>
//     //         </div>
//     //       )}
//     //     </>
//     //   )}

//     //   {/* Audio List View */}
//     //   {ifList && isMediaTabActive === "Audio" && (
//     //     <>
//     //       {audioItems?.length > 0 ? (
//     //         audioItems?.map((item) => (
//     //           <div className="relative" key={item.publicId}>
//     //             <AudioFilesWhenList
//     //               profileName={item.creator.split("@")[0]}
//     //               avatar={defaultLiveAvatar}
//     //               handle={`@${item.creator.split("@")[0]}`}
//     //               time={formatTimeAgo(item.createdDate)}
//     //               paragraphOne={item.message}
//     //               paragraphTwo=""
//     //             />
//     //           </div>
//     //         ))
//     //       ) : (
//     //         <div className="text-center py-8 text-grey_500">
//     //           <Typography variant="p2">No audio posts yet</Typography>
//     //         </div>
//     //       )}
//     //     </>
//     //   )}

//     //   {isMediaTabActive === "Videos" && !ifList && <VideoMedia />}

//     //   {potraitOrLandScape && (
//     //     <PotraitOrLandScapeModal
//     //       potraitOrLandScapeModal={potraitOrLandScape}
//     //       toggleProtraitModal={toggleProtraitModal}
//     //       img={currentImage}
//     //     />
//     //   )}
//     // </div>

//     <div className="max-w-4xl mx-auto bg-white min-h-screen">
//       <div className="py-4 flex items-center px-4 justify-between border-b">
//         <div className="flex items-center gap-2">
//           {mediaTabs?.map(({ id, name, number }) => (
//             <div
//               onClick={() => setIsMediaTabActive(name)}
//               className={`flex items-center cursor-pointer px-4 py-2 rounded-full transition-colors ${
//                 isMediaTabActive === name
//                   ? "bg-blue_200 "
//                   : "bg-grey_20  hover:bg-gray-100"
//               }`}
//               key={id}
//             >
//               <Typography
//                 variant="p2"
//                 className={`pr-1 ${
//                   isMediaTabActive === name ? "text-blue_500" : "text-grey_400"
//                 }`}
//               >
//                 {name}
//               </Typography>
//               {number && (
//                 <Typography
//                   className={`${
//                     isMediaTabActive === name
//                       ? "text-blue_500"
//                       : "text-grey_400"
//                   }`}
//                   variant="subtitle2"
//                 >
//                   {number}
//                 </Typography>
//               )}
//             </div>
//           ))}
//         </div>

//         <section className="flex items-center gap-3 relative">
//           <div
//             onClick={toggleSortModal}
//             className="flex items-center border border-gray-300 py-2 px-4 bg-white rounded-full cursor-pointer hover:bg-gray-50 transition-colors"
//           >
//             <Typography variant="subtitle3" className="pr-1">
//               Sort
//             </Typography>
//             <img src={filter} alt="filter" loading="lazy" />
//           </div>

//           {sortModal && (
//             <div className="flex flex-col absolute top-12 right-0 bg-white shadow-lg rounded-lg border border-gray-200 z-50 min-w-[200px]">
//               {sortOptions?.map(({ id, name }) => (
//                 <div
//                   className="hover:bg-blue_200 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
//                   key={id}
//                 >
//                   <RadioButton
//                     label={name}
//                     name="options"
//                     value={name}
//                     checked={selectedValue === name}
//                     onChange={handleChange}
//                   />
//                 </div>
//               ))}
//             </div>
//           )}

//           <button
//             onClick={toggleList}
//             className="p-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
//             title={ifList ? "Grid view" : "List view"}
//           >
//             {ifList ? (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
//                 />
//               </svg>
//             ) : (
//               <svg
//                 className="w-5 h-5"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 6h16M4 12h16M4 18h16"
//                 />
//               </svg>
//             )}
//           </button>
//         </section>
//       </div>

//       {!ifList && isMediaTabActive !== "Audio" && (
//         <div className="p-4">
//           {filteredMedia?.length > 0 ? (
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1">
//               {filteredMedia?.map((item: any) => {
//                 // FIXED: Get the first media of the correct type
//                 const displayMedia =
//                   isMediaTabActive === "All"
//                     ? item.mediaFiles.find((m: any) => m.mediaType !== "AUDIO")
//                     : isMediaTabActive === "Photos"
//                       ? item.mediaFiles.find(
//                           (m: any) => m.mediaType === "PHOTO",
//                         )
//                       : item.mediaFiles.find(
//                           (m: any) => m.mediaType === "VIDEO",
//                         );

//                 if (!displayMedia) return null;

//                 return (
//                   <div
//                     className="w-full aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
//                     key={item.publicId}
//                     onClick={() => toggleProtraitModal(displayMedia.mediaLink)}
//                   >
//                     {displayMedia.mediaType === "PHOTO" && (
//                       <img
//                         src={displayMedia.mediaLink}
//                         alt="Media"
//                         className="w-full h-full object-cover"
//                         loading="lazy"
//                       />
//                     )}
//                     {displayMedia.mediaType === "VIDEO" && (
//                       <div className="relative w-full h-full bg-black">
//                         <video
//                           src={displayMedia.mediaLink}
//                           className="w-full h-full object-cover"
//                           preload="metadata"
//                         />
//                         <div className="absolute inset-0 flex items-center justify-center bg-black/30">
//                           <svg
//                             className="w-12 h-12 text-white"
//                             fill="currentColor"
//                             viewBox="0 0 24 24"
//                           >
//                             <path d="M8 5v14l11-7z" />
//                           </svg>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 );
//               })}
//             </div>
//           ) : (
//             <div className="w-full text-center py-16 text-gray-500">
//               <svg
//                 className="w-16 h-16 mx-auto mb-4 text-gray-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                 />
//               </svg>
//               <p className="text-lg font-medium">
//                 No {isMediaTabActive.toLowerCase()} found
//               </p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* List View - Show full posts */}
//       {ifList && isMediaTabActive !== "Audio" && (
//         <div className="p-4 space-y-4">
//           {filteredMedia.length > 0 ? (
//             filteredMedia.map((item: any) => {
//               const firstMedia =
//                 isMediaTabActive === "All"
//                   ? item.mediaFiles.find((m: any) => m.mediaType !== "AUDIO")
//                   : isMediaTabActive === "Photos"
//                     ? item.mediaFiles.find((m: any) => m.mediaType === "PHOTO")
//                     : item.mediaFiles.find((m: any) => m.mediaType === "VIDEO");

//               if (!firstMedia) return null;

//               return (
//                 <div className="relative" key={item.publicId}>
//                   <Timeline
//                     profileName={item.creator.split("@")[0]}
//                     showModal={sortModal}
//                     toggleModal={toggleSortModal}
//                     avatar={item?.profilePic}
//                     handle={`@${item.creator.split("@")[0]}`}
//                     time={formatTimeAgo(item.createdDate)}
//                     paragraphOne={item.message}
//                     paragraphTwo=""
//                     timeLineImage={item?.mediaLink}
//                     ifParagraph={true}
//                     ifIcon={false}
//                     bgColor="#fafafa"
//                     reactionsData={transformReactions(item?.reactions)}
//                   />
//                   {firstMedia.mediaType === "PHOTO" && (
//                     <img
//                       src={firstMedia.mediaLink}
//                       alt="Post"
//                       className="w-full rounded-lg"
//                     />
//                   )}
//                   {firstMedia.mediaType === "VIDEO" && (
//                     <video
//                       src={firstMedia.mediaLink}
//                       controls
//                       className="w-full rounded-lg"
//                     />
//                   )}
//                 </div>
//               );
//             })
//           ) : (
//             <div className="text-center py-16 text-gray_500">
//               <Typography variant="p2">
//                 No {isMediaTabActive.toLowerCase()} posts yet
//               </Typography>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Audio Grid View */}
//       {!ifList && isMediaTabActive === "Audio" && (
//         <div className="p-4">
//           {audioItems?.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {audioItems?.map((item: any) => (
//                 <div
//                   key={item.publicId}
//                   className="bg-gray-50 rounded-lg p-4 border"
//                 >
//                   <div className="flex items-center mb-3">
//                     <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
//                     <div>
//                       <p className="font-semibold">
//                         {item.creator.split("@")[0]}
//                       </p>
//                       <p className="text-sm text-gray-500">
//                         @{item.creator.split("@")[0]}
//                       </p>
//                     </div>
//                   </div>
//                   {item.mediaFiles
//                     .filter((m: any) => m.mediaType === "AUDIO")
//                     .map((audio: any, idx: number) => (
//                       <audio
//                         key={idx}
//                         controls
//                         className="w-full"
//                         src={audio.mediaLink}
//                       />
//                     ))}
//                   <p className="mt-2 text-gray-700">{item.message}</p>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="w-full text-center py-16 text-gray-500">
//               <svg
//                 className="w-16 h-16 mx-auto mb-4 text-gray-300"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
//                 />
//               </svg>
//               <p className="text-lg font-medium">No audio found</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Audio List View */}
//       {ifList && isMediaTabActive === "Audio" && (
//         <div className="p-4 space-y-4">
//           {audioItems?.length > 0 ? (
//             audioItems?.map((item: any) => (
//               <div
//                 className="bg-white border rounded-lg p-4 shadow-sm"
//                 key={item.publicId}
//               >
//                 <div className="flex items-center mb-3">
//                   <div className="w-10 h-10 rounded-full bg-gray-300 mr-3"></div>
//                   <div>
//                     <p className="font-semibold">
//                       {item.creator.split("@")[0]}
//                     </p>
//                     <p className="text-sm text-gray-500">
//                       @{item.creator.split("@")[0]}
//                     </p>
//                   </div>
//                 </div>
//                 <p className="mb-3 text-gray-800">{item.message}</p>
//                 {item.mediaFiles
//                   .filter((m: any) => m.mediaType === "AUDIO")
//                   .map((audio: any, idx: number) => (
//                     <audio
//                       key={idx}
//                       controls
//                       className="w-full mb-2"
//                       src={audio.mediaLink}
//                     />
//                   ))}
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-16 text-gray-500">
//               <p className="text-lg">No audio posts yet</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Image Modal */}
//       {potraitOrLandScape && (
//         <div
//           className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
//           onClick={() => setPotraitOrLandScape(false)}
//         >
//           <img
//             src={currentImage}
//             alt="Full size"
//             className="max-w-full max-h-full object-contain"
//           />
//           <button
//             onClick={() => setPotraitOrLandScape(false)}
//             className="absolute top-4 right-4 text-white hover:text-gray-300"
//           >
//             <svg
//               className="w-8 h-8"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M6 18L18 6M6 6l12 12"
//               />
//             </svg>
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Media;

// // <div className="flex items-center flex-wrap gap-[1px] cursor-pointer">
// //   {allMediaUrls?.length > 0 ? (
// //     allMediaUrls?.map((src, index) => (
// //       <div
// //         className="w-[210px] h-[210px] overflow-hidden"
// //         key={index}
// //         onClick={() => toggleProtraitModal(src)}
// //       >
// //         <img
// //           src={src}
// //           alt={`Gallery ${index}`}
// //           className="w-full h-full object-cover"
// //           loading="lazy"
// //         />
// //       </div>
// //     ))
// //   ) : (
// //     <div className="w-full text-center py-8 text-grey_500">
// //       <Typography variant="p2">
// //         No {isMediaTabActive.toLowerCase()} found
// //       </Typography>
// //     </div>
// //   )}
// // </div>

// {
//   /* Video Component (if you have a special video component) */
// }
// {
//   /* {isMediaTabActive === "Videos" &&
//         !ifList &&
//         allMediaUrls.length === 0 && <VideoMedia />} */
// }

import { useState, useMemo } from "react";
import Typography from "./forms/Typography";
// import filter from "../assets/icons/filter.svg";
// import { sortOptions } from "../data";
// import RadioButton from "./RadioButtonLabel";
import { Loader } from "./molecules/Loader";
import { InfiniteScroll } from "./InfiniteScroll";
import type { ProfilePostProps, StoryPost } from "@/lib/types";
import { formatTimeAgo } from "@/utils/helperTwo";
import { transformReactions } from "@/lib/reaction";
import Postcard from "./cards/Postcard";

type MediaTab = "All" | "Photos" | "Videos" | "Audio";

const Media = ({
  creatorContent,
  creatorContentIsLoading,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ProfilePostProps) => {
  const [activeTab, setActiveTab] = useState<MediaTab>("All");
  const [ifList, setIfList] = useState(false);
  // const [sortModal, setSortModal] = useState(false);
  // const [selectedValue, setSelectedValue] = useState("option1");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // ── Counts derived from actual data ─────────────────────────────
  const counts = useMemo(() => {
    const photos = creatorContent.reduce(
      (n, item) =>
        n + item.mediaFiles.filter((m) => m.mediaType === "PHOTO").length,
      0,
    );
    const videos = creatorContent.reduce(
      (n, item) =>
        n + item.mediaFiles.filter((m) => m.mediaType === "VIDEO").length,
      0,
    );
    const audio = creatorContent.reduce(
      (n, item) =>
        n + item.mediaFiles.filter((m) => m.mediaType === "AUDIO").length,
      0,
    );
    return { photos, videos, audio };
  }, [creatorContent]);

  const tabs: { name: MediaTab; count?: number }[] = [
    { name: "All" },
    { name: "Photos", count: counts.photos },
    { name: "Videos", count: counts.videos },
    { name: "Audio", count: counts.audio },
  ];

  // // ── Filter posts that have relevant media for current tab ────────
  // const filteredPosts = useMemo(() => {
  //   return creatorContent.filter((item) => {
  //     if (!item.mediaFiles?.length) return false;
  //     if (activeTab === "All")
  //       return item.mediaFiles.some((m) => m.mediaType !== "AUDIO");
  //     if (activeTab === "Photos")
  //       return item.mediaFiles.some((m) => m.mediaType === "PHOTO");
  //     if (activeTab === "Videos")
  //       return item.mediaFiles.some((m) => m.mediaType === "VIDEO");
  //     if (activeTab === "Audio")
  //       return item.mediaFiles.some((m) => m.mediaType === "AUDIO");
  //     return false;
  //   });
  // }, [creatorContent, activeTab]);

  // Replace the filteredPosts useMemo with two separate derived values:

  // 1. Still used for list view and audio — one entry per POST
  const filteredPosts = useMemo(() => {
    return creatorContent.filter((item) => {
      if (!item.mediaFiles?.length) return false;
      if (activeTab === "All")
        return item.mediaFiles.some((m) => m.mediaType !== "AUDIO");
      if (activeTab === "Photos")
        return item.mediaFiles.some((m) => m.mediaType === "PHOTO");
      if (activeTab === "Videos")
        return item.mediaFiles.some((m) => m.mediaType === "VIDEO");
      if (activeTab === "Audio")
        return item.mediaFiles.some((m) => m.mediaType === "AUDIO");
      return false;
    });
  }, [creatorContent, activeTab]);

  // 2. NEW — one entry per MEDIA FILE, used for the grid
  const flatMediaFiles = useMemo(() => {
    return creatorContent.flatMap((item) =>
      item.mediaFiles
        .filter((m) => {
          if (activeTab === "All") return m.mediaType !== "AUDIO";
          if (activeTab === "Photos") return m.mediaType === "PHOTO";
          if (activeTab === "Videos") return m.mediaType === "VIDEO";
          return false; // Audio tab handled separately
        })
        .map((m) => ({
          ...m,
          // carry the post context for the lightbox / list view
          postId: item.publicId,
          creator: item.creator,
          message: item.message,
          createdDate: item.createdDate,
        })),
    );
  }, [creatorContent, activeTab]);

  if (creatorContentIsLoading) return <Loader />;

  return (
    <div className="bg-white min-h-screen">
      {/* Tab bar */}
      <div className="py-4 flex items-center px-4 justify-between border-b sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2">
          {tabs.map(({ name, count }) => (
            <button
              key={name}
              onClick={() => setActiveTab(name)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm transition-colors ${
                activeTab === name
                  ? "bg-blue_200 text-blue_500"
                  : "bg-grey_20 text-grey_400 hover:bg-gray-100"
              }`}
            >
              {name}
              {count !== undefined && count > 0 && (
                <span className="text-xs font-medium">{count}</span>
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 relative">
          {/* <button
            onClick={() => setSortModal((v) => !v)}
            className="flex items-center gap-1 border border-gray-300 py-2 px-4 bg-white rounded-full text-sm hover:bg-gray-50"
          >
            Sort <img src={filter} alt="filter" className="w-4 h-4" />
          </button>

          {sortModal && (
            <div className="absolute top-12 right-10 bg-white shadow-lg rounded-lg border border-gray-200 z-50 min-w-[200px]">
              {sortOptions?.map(({ id, name }: any) => (
                <div
                  key={id}
                  className="hover:bg-blue_200 first:rounded-t-lg last:rounded-b-lg cursor-pointer"
                >
                  <RadioButton
                    label={name}
                    name="options"
                    value={name}
                    checked={selectedValue === name}
                    onChange={(e: any) => setSelectedValue(e.target.value)}
                  />
                </div>
              ))}
            </div>
          )} */}

          <button
            onClick={() => setIfList((v) => !v)}
            className="p-2 border border-gray-300 rounded-full hover:bg-gray-50"
            title={ifList ? "Grid view" : "List view"}
          >
            {ifList ? (
              // Grid icon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            ) : (
              // List icon
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <InfiniteScroll
        onLoader={fetchNextPage}
        isLoading={isFetchingNextPage}
        hasMore={hasNextPage}
      >
        {/* ── Audio tab ──────────────────────────────────────────── */}
        {activeTab === "Audio" && (
          <div className="p-4 space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((item) => (
                <div
                  key={item.publicId}
                  className="bg-white border rounded-lg p-4 shadow-sm"
                >
                  <div className="flex items-center mb-3 gap-3">
                    <img
                      src={item.creator?.profilePic || "/default-avatar.svg"}
                      className="w-10 h-10 rounded-full object-cover"
                      alt={item.creator?.name}
                    />
                    <div>
                      <p className="font-semibold text-sm">
                        {item.creator?.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        @{item.creator?.username}
                      </p>
                    </div>
                    <span className="ml-auto text-xs text-gray-400">
                      {formatTimeAgo(item.createdDate)}
                    </span>
                  </div>
                  {item.message && (
                    <p className="mb-3 text-sm text-gray-800">{item.message}</p>
                  )}
                  {item.mediaFiles
                    .filter((m) => m.mediaType === "AUDIO")
                    .map((audio, idx) => (
                      <audio
                        key={idx}
                        controls
                        className="w-full mb-2"
                        src={audio.mediaLink}
                      />
                    ))}
                </div>
              ))
            ) : (
              <EmptyState label="audio" />
            )}
          </div>
        )}

        {/* ── Grid view (Photos / Videos / All) ─────────────────── */}
        {/* {activeTab !== "Audio" && !ifList && (
          <div className="p-4">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {filteredPosts.map((item) => {
                  const media =
                    activeTab === "Photos"
                      ? item.mediaFiles.find((m) => m.mediaType === "PHOTO")
                      : activeTab === "Videos"
                        ? item.mediaFiles.find((m) => m.mediaType === "VIDEO")
                        : item.mediaFiles.find((m) => m.mediaType !== "AUDIO");

                  if (!media) return null;

                  return (
                    <div
                      key={item.publicId}
                      className="w-full aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity relative bg-black"
                      onClick={() => setLightboxImage(media.mediaLink)}
                    >
                      {media.mediaType === "PHOTO" && (
                        <img
                          src={media.mediaLink}
                          alt="media"
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      )}
                      {media.mediaType === "VIDEO" && (
                        <>
                          <video
                            src={media.mediaLink}
                            className="w-full h-full object-cover"
                            preload="metadata"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                            <svg
                              className="w-10 h-10 text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState label={activeTab.toLowerCase()} />
            )}
          </div>
        )} */}

        {/* ── Grid view ─────────────────────────────────────────────── */}
        {activeTab !== "Audio" && !ifList && (
          <div className="p-4">
            {flatMediaFiles.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1">
                {flatMediaFiles.map((media, idx) => (
                  <div
                    key={`${media.postId}-${media.publicId ?? idx}`}
                    className="w-full aspect-square overflow-hidden rounded-lg cursor-pointer hover:opacity-90 transition-opacity relative bg-black"
                    onClick={() => setLightboxImage(media.mediaLink)}
                  >
                    {media.mediaType === "PHOTO" && (
                      <img
                        src={media.mediaLink}
                        alt="media"
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    )}
                    {media.mediaType === "VIDEO" && (
                      <>
                        <video
                          src={media.mediaLink}
                          className="w-full h-full object-cover"
                          preload="metadata"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState label={activeTab.toLowerCase()} />
            )}
          </div>
        )}

        {/* ── List view (Photos / Videos / All) ─────────────────── */}
        {activeTab !== "Audio" && ifList && (
          <div>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((item: StoryPost) => (
                <Postcard
                  key={item.publicId}
                  profileName={item.creator?.name || "Unknown User"}
                  avatar={item.creator?.profilePic || "/default-avatar.svg"}
                  handle={`@${item.creator?.username || ""}`}
                  time={formatTimeAgo(item.createdDate)}
                  paragraphOne={item.message}
                  timeLineImage={item.mediaFiles}
                  ifParagraph
                  ifIcon={false}
                  bgColor="#fafafa"
                  reactionsData={transformReactions(item.reactions)}
                />
              ))
            ) : (
              <div className="text-center py-16 text-grey_500">
                <Typography variant="p2">
                  No {activeTab.toLowerCase()} posts yet
                </Typography>
              </div>
            )}
          </div>
        )}
      </InfiniteScroll>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white hover:text-gray-300"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

const EmptyState = ({ label }: { label: string }) => (
  <div className="w-full text-center py-16 text-gray-500">
    <svg
      className="w-16 h-16 mx-auto mb-4 text-gray-300"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
    <p className="text-lg font-medium">No {label} found</p>
  </div>
);

export default Media;
