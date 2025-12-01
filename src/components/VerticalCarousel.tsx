// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { useState } from "react";
// import "tailwindcss/tailwind.css";
// import suggestionOne from "../assets/suggestionOne.svg";
// import suggestionFour from "../assets/suggestionFour.svg";
// import modelOne from "../assets/modelOne.svg";
// import suggestionFive from "../assets/suggestionFive.svg";
// import suggestTwo from "../assets/suggestTwo.svg";
// import horizontalMore from "../assets/icons/horizontalMore.svg";
// import Typography from "./forms/Typography";
// import verify from "../assets/icons/verify.svg";
// import { useGetData } from "@/hooks/apiCalls";
// import { Loader } from "./molecules/Loader";
// import type { CreatorUserProfile } from "@/lib/types";
// // import { useAppSelector } from "../lib/hook";
// // import CreatorThirdColumn from "./molecules/CreatorThirdColumn";
// // import { UserRole } from "../data";
// // import type { RootState } from "../lib/store";

// const items = [
//   {
//     img: suggestionOne,
//     isLive: true,
//   },
//   {
//     img: modelOne,
//     isLive: true,
//   },
//   {
//     img: suggestTwo,
//     isLive: false,
//   },
//   {
//     img: suggestionFive,
//     isLive: true,
//   },
//   {
//     img: suggestionFour,
//     isLive: false,
//   },
//   {
//     img: modelOne,
//     isLive: true,
//   },
//   {
//     img: suggestTwo,
//     isLive: true,
//   },
//   {
//     img: suggestionOne,
//     isLive: false,
//   },
//   {
//     img: suggestionFour,
//     isLive: true,
//   },
//   {
//     img: suggestionFive,
//     isLive: false,
//   },
//   {
//     img: suggestionOne,
//     isLive: true,
//   },
//   {
//     img: modelOne,
//     isLive: true,
//   },
//   {
//     img: suggestTwo,
//     isLive: false,
//   },
//   {
//     img: suggestionFive,
//     isLive: true,
//   },
//   {
//     img: suggestionFour,
//     isLive: false,
//   },
// ];

// const VerticalCarousel = () => {
//   // const { userObject } = useAppSelector((state: RootState) => state.auth);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const { data: getAllCreators, isLoading: getAllCreatorsIsLoading } =
//     useGetData({
//       url: `profile/creators`,
//       queryKey: ["GetCreators"],
//     });

//   const goToPrevious = () => {
//     const isFirstItem = currentIndex === 0;
//     const newIndex = isFirstItem ? items.length - 5 : currentIndex - 5;
//     setCurrentIndex(newIndex < 0 ? 0 : newIndex);
//   };

//   const goToNext = () => {
//     const isLastItem = currentIndex >= items.length - 5;
//     const newIndex = isLastItem ? 0 : currentIndex + 5;
//     setCurrentIndex(newIndex >= items.length ? items.length - 5 : newIndex);
//   };

//   const goToItem = (index: any) => {
//     setCurrentIndex(index);
//   };
//   return (
//     <>
//       {/* This was showing things like schedule, notification and account balnce for a creator */}
//       {/* {userObject.role === UserRole.creator ? (
//         <CreatorThirdColumn />
//       ) : ( */}
//       <>
//         {getAllCreatorsIsLoading ? (
//           <Loader />
//         ) : (
//           <div className="flex">
//             <div className="relative rounded-lg mb-3 overflow-hidden w-4/5 flex flex-col space-y-4">
//               {getAllCreators?.data
//                 .slice(currentIndex, currentIndex + 5)
//                 .map((item: CreatorUserProfile) => (
//                   <div
//                     key={item.usid}
//                     className="relative rounded-lg mb-3 overflow-hidden"
//                   >
//                     <img
//                       src={item?.profilePic || item?.coverImageUrl}
//                       alt={`item-${item?.usid}`}
//                       className="w-full h-auto"
//                     />

//                     <div className="absolute top-0 right-3 z-10">
//                       <img src={horizontalMore} alt="horizontalMore" />
//                     </div>

//                     <div className="bg-custom-gradient absolute w-full px-4 py-[11px] bottom-0 z-20">
//                       <div className="flex items-center">
//                         <Typography
//                           variant="titleTwo"
//                           className="text-white pr-1"
//                         >
//                           {item.fullName}
//                         </Typography>
//                         <img src={verify} alt="verify" />
//                       </div>

//                       <div className="flex items-center">
//                         <Typography
//                           variant="p2"
//                           className="text-white pt-[2px]"
//                         >
//                           {item?.username}
//                         </Typography>
//                         {/* {item.isLive && ( */}
//                         <div className="flex items-center ml-2">
//                           <div className="h-2 w-2 rounded-full bg-green-500 mr-1"></div>
//                           <Typography className="text-red-500" variant="p3">
//                             Live
//                           </Typography>
//                         </div>
//                         {/* )} */}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>

//             {/* Buttons */}
//             <div className="flex flex-col items-center justify-center space-y-2 w-1/5">
//               <button onClick={goToPrevious} className="text-gray-600">
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M8 0L4 4h8L8 0zm0 16l4-4H4l4 4z"
//                     fill="currentColor"
//                   />
//                 </svg>
//               </button>
//               {Array.from({ length: Math.ceil(items.length / 4) }).map(
//                 (_, index) => (
//                   <button
//                     key={index}
//                     onClick={() => goToItem(index * 4)}
//                     className={`w-2 h-2 rounded-full ${
//                       currentIndex >= index * 4 && currentIndex < index * 4 + 4
//                         ? "bg-blue-500"
//                         : "bg-gray-300"
//                     }`}
//                   ></button>
//                 )
//               )}
//               <button onClick={goToNext} className="text-gray-600">
//                 <svg
//                   width="16"
//                   height="16"
//                   viewBox="0 0 16 16"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     d="M8 0l4 4H4L8 0zm0 16l-4-4h8l-4 4z"
//                     fill="currentColor"
//                   />
//                 </svg>
//               </button>{" "}
//             </div>
//           </div>
//         )}
//       </>
//       {/* )} */}
//     </>
//   );
// };

// export default VerticalCarousel;

// import { useState, useMemo } from "react";
// import "tailwindcss/tailwind.css";
// import horizontalMore from "../assets/icons/horizontalMore.svg";
// import verify from "../assets/icons/verify.svg";
// import Typography from "./forms/Typography";
// import { useGetData } from "@/hooks/apiCalls";
// import { Loader } from "./molecules/Loader";
// import type { CreatorUserProfile } from "@/lib/types";

// const ITEMS_PER_PAGE = 5;

// const VerticalCarousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const { data: getAllCreators, isLoading: getAllCreatorsIsLoading } =
//     useGetData({
//       url: `profile/creators`,
//       queryKey: ["GetCreators"],
//     });

//   const creators = useMemo(() => getAllCreators?.data || [], [getAllCreators]);
//   const totalPages = useMemo(
//     () => Math.ceil(creators.length / ITEMS_PER_PAGE),
//     [creators.length]
//   );
//   const currentPage = useMemo(
//     () => Math.floor(currentIndex / ITEMS_PER_PAGE),
//     [currentIndex]
//   );

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => {
//       const newIndex = prev - ITEMS_PER_PAGE;
//       return newIndex < 0 ? 0 : newIndex;
//     });
//   };

//   const goToNext = () => {
//     setCurrentIndex((prev) => {
//       const maxIndex = Math.max(0, creators.length - ITEMS_PER_PAGE);
//       const newIndex = prev + ITEMS_PER_PAGE;
//       return newIndex > maxIndex ? maxIndex : newIndex;
//     });
//   };

//   const goToPage = (pageIndex: number) => {
//     setCurrentIndex(pageIndex * ITEMS_PER_PAGE);
//   };

//   const visibleCreators = useMemo(
//     () => creators.slice(currentIndex, currentIndex + ITEMS_PER_PAGE),
//     [creators, currentIndex]
//   );

//   const isFirstPage = currentIndex === 0;
//   const isLastPage = currentIndex >= creators.length - ITEMS_PER_PAGE;

//   if (getAllCreatorsIsLoading) {
//     return <Loader />;
//   }

//   if (!creators.length) {
//     return (
//       <div className="flex items-center justify-center p-8">
//         <Typography variant="p2" className="text-gray-500">
//           No creators available
//         </Typography>
//       </div>
//     );
//   }

//   return (
//     <div className="flex gap-4">
//       {/* Creator Cards */}
//       <div className="flex-1 flex flex-col space-y-4">
//         {visibleCreators.map((item: CreatorUserProfile) => (
//           <div
//             key={item.usid}
//             className="relative rounded-lg overflow-hidden group"
//           >
//             <img
//               src={item?.profilePic || item?.coverImageUrl}
//               alt={item?.fullName || "Creator"}
//               className="w-full h-auto object-cover"
//               loading="lazy"
//             />

//             {/* More Options Button */}
//             <button
//               className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
//               aria-label="More options"
//             >
//               <img src={horizontalMore} alt="" />
//             </button>

//             {/* Creator Info Overlay */}
//             <div className="bg-custom-gradient absolute w-full px-4 py-3 bottom-0 z-20">
//               <div className="flex items-center gap-1">
//                 <Typography variant="titleTwo" className="text-white">
//                   {item.fullName}
//                 </Typography>
//                 <img src={verify} alt="Verified" className="w-4 h-4" />
//               </div>

//               <div className="flex items-center gap-2 mt-1">
//                 <Typography variant="p2" className="text-white/90">
//                   @{item?.username}
//                 </Typography>
//                 {item.isLive !== false && (
//                   <div className="flex items-center gap-1">
//                     <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
//                     <Typography className="text-green-400" variant="p3">
//                       Live
//                     </Typography>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation Controls */}
//       <div className="flex flex-col items-center justify-center gap-3 px-2">
//         {/* Previous Button */}
//         <button
//           onClick={goToPrevious}
//           disabled={isFirstPage}
//           className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//           aria-label="Previous page"
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 16 16"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M8 4L12 8L4 8L8 4Z" fill="currentColor" />
//           </svg>
//         </button>

//         {/* Page Indicators */}
//         <div className="flex flex-col gap-2">
//           {Array.from({ length: totalPages }).map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToPage(index)}
//               className={`w-2 h-2 rounded-full transition-all ${
//                 currentPage === index
//                   ? "bg-blue-500 scale-125"
//                   : "bg-gray-300 hover:bg-gray-400"
//               }`}
//               aria-label={`Go to page ${index + 1}`}
//               aria-current={currentPage === index ? "true" : "false"}
//             />
//           ))}
//         </div>

//         {/* Next Button */}
//         <button
//           onClick={goToNext}
//           disabled={isLastPage}
//           className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
//           aria-label="Next page"
//         >
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 16 16"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path d="M8 12L4 8L12 8L8 12Z" fill="currentColor" />
//           </svg>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerticalCarousel;

import { useState, useMemo } from "react";
import "tailwindcss/tailwind.css";
import horizontalMore from "../assets/icons/horizontalMore.svg";
import verify from "../assets/icons/verify.svg";
import Typography from "./forms/Typography";
import { useGetData } from "@/hooks/apiCalls";
import { Loader } from "./molecules/Loader";
import { type CreatorUserProfile } from "@/lib/types";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 5;

const VerticalCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: getAllCreators, isLoading: getAllCreatorsIsLoading } =
    useGetData({
      url: `profile/creators`,
      queryKey: ["GetCreators"],
    });

  const creators = useMemo(() => getAllCreators?.data || [], [getAllCreators]);
  const totalPages = useMemo(
    () => Math.ceil(creators.length / ITEMS_PER_PAGE),
    [creators.length]
  );
  const currentPage = useMemo(
    () => Math.floor(currentIndex / ITEMS_PER_PAGE),
    [currentIndex]
  );

  const goToPrevious = () => {
    setCurrentIndex((prev) => {
      const newIndex = prev - ITEMS_PER_PAGE;
      return newIndex < 0 ? 0 : newIndex;
    });
  };

  const goToNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max(0, creators.length - ITEMS_PER_PAGE);
      const newIndex = prev + ITEMS_PER_PAGE;
      return newIndex > maxIndex ? maxIndex : newIndex;
    });
  };

  const goToPage = (pageIndex: number) => {
    setCurrentIndex(pageIndex * ITEMS_PER_PAGE);
  };

  const visibleCreators = useMemo(
    () => creators.slice(currentIndex, currentIndex + ITEMS_PER_PAGE),
    [creators, currentIndex]
  );

  const isFirstPage = currentIndex === 0;
  const isLastPage = currentIndex >= creators.length - ITEMS_PER_PAGE;

  if (getAllCreatorsIsLoading) {
    return <Loader />;
  }

  if (!creators.length) {
    return (
      <div className="flex items-center justify-center p-8">
        <Typography variant="p2" className="text-gray-500">
          No creators available
        </Typography>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      {/* Creator Cards */}
      <div className="flex-1 flex flex-col space-y-4 cursor-pointer">
        {visibleCreators.map((item: CreatorUserProfile) => {
          const hasImage = item?.profilePic || item?.coverImageUrl;

          return (
            <Link
              to={`profile/${item?.usid}/subscribe`}
              key={item.usid}
              className="relative rounded-lg overflow-hidden group"
            >
              {hasImage ? (
                <img
                  src={item.profilePic || item.coverImageUrl}
                  alt={item?.fullName || "Creator"}
                  className="w-full h-24 object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="w-full h-24 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                  <div className="text-white text-5xl font-bold">
                    {item?.fullName?.charAt(0)?.toUpperCase() ||
                      item?.username?.charAt(0)?.toUpperCase() ||
                      "?"}
                  </div>
                </div>
              )}

              {/* More Options Button */}
              <button
                className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="More options"
              >
                <img src={horizontalMore} alt="" />
              </button>

              {/* Creator Info Overlay */}
              <div className="bg-custom-gradient absolute w-full px-4 py-3 bottom-0 z-20">
                <div className="flex items-center gap-1">
                  <Typography variant="titleTwo" className="text-white">
                    {item.fullName}
                  </Typography>
                  <img src={verify} alt="Verified" className="w-4 h-4" />
                </div>

                <div className="flex items-center gap-2 mt-1">
                  <Typography variant="p2" className="text-white/90">
                    @{item?.username}
                  </Typography>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Navigation Controls */}
      <div className="flex flex-col items-center justify-center gap-3 px-2">
        {/* Previous Button */}
        <button
          onClick={goToPrevious}
          disabled={isFirstPage}
          className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Previous page"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 4L12 8L4 8L8 4Z" fill="currentColor" />
          </svg>
        </button>

        {/* Page Indicators */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentPage === index
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
              aria-current={currentPage === index ? "true" : "false"}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={goToNext}
          disabled={isLastPage}
          className="text-gray-600 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          aria-label="Next page"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 12L4 8L12 8L8 12Z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default VerticalCarousel;
