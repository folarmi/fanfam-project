/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */

import ashMore from "../../assets/icons/ashMore.svg";
// import Like from "../../assets/icons/like";
import React, { useRef } from "react";
// import Dislike from "@/assets/icons/dislike";
// import Lol from "@/assets/icons/lol";
// import Love from "@/assets/icons/love";
import PostCard from "./Postcard";

const ViewPost = (props: any) => {
  const modalRef = useRef<HTMLDivElement>(null);
  // console.log(reactions);

  // // Memoized toggle function
  // const toggleModal = useCallback(() => {
  //   setShowModal(!showModal);
  // }, [showModal, setShowModal]);

  // // Close modal when clicking outside
  // useEffect(() => {
  //   if (!showModal) return;

  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       modalRef.current &&
  //       !modalRef.current.contains(event.target as Node)
  //     ) {
  //       setShowModal(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => document.removeEventListener("mousedown", handleClickOutside);
  // }, [showModal, setShowModal]);

  // // Memoized image check
  // const hasImages = props.timeLineImage.length > 0;

  // const reactionsData = [
  //   { type: "LIKE", icon: Like, number: 0 },
  //   { type: "DISLIKE", icon: Dislike, number: 0 },
  //   { type: "LOL", icon: Lol },
  //   { type: "LOVE", icon: Love },
  // ];

  return (
    // <article
    //   style={{ backgroundColor: bgColor }}
    //   className="pt-4 mb-2 drop-shadow-4xl"
    //   aria-label={`Post by ${profileName}`}
    // >
    //   {/* Header Section */}
    //   <header className="flex items-start px-4 relative">
    //     <img
    //       src={avatar}
    //       alt={`${profileName}'s avatar`}
    //       className="w-10 h-10 rounded-full flex-shrink-0"
    //       loading="lazy"
    //     />

    //     <div className="flex justify-between w-full items-start ml-2">
    //       <section className="flex-1 min-w-0">
    //         {/* Profile Info */}
    //         <div className="flex items-center flex-wrap gap-x-1.5">
    //           <Typography variant="titleTwo" className="font-semibold truncate">
    //             {profileName}
    //           </Typography>

    //           <Typography
    //             variant="p2"
    //             className="hidden md:inline text-grey_500 truncate"
    //           >
    //             {handle}
    //           </Typography>

    //           <Typography
    //             variant="p2"
    //             className="text-grey_500 ml-auto md:ml-0"
    //           >
    //             {time}
    //           </Typography>
    //         </div>

    //         {/* Mobile handle */}
    //         <Typography
    //           variant="p2"
    //           className="md:hidden text-grey_500 truncate"
    //         >
    //           {handle}
    //         </Typography>

    //         {/* Content Paragraphs */}
    //         {ifParagraph && (paragraphOne || paragraphTwo) && (
    //           <div className="mt-2 space-y-2">
    //             {paragraphOne && (
    //               <p className="font-normal text-sm text-grey_30 leading-5">
    //                 {paragraphOne}
    //               </p>
    //             )}
    //             {paragraphTwo && (
    //               <p className="font-normal text-sm text-grey_700 leading-5">
    //                 {paragraphTwo}
    //               </p>
    //             )}
    //           </div>
    //         )}
    //       </section>

    //       {/* More Options Button */}
    //       <button
    //         onClick={toggleModal}
    //         className="cursor-pointer ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
    //         aria-label="More options"
    //         aria-expanded={showModal}
    //         aria-haspopup="true"
    //       >
    //         <img src={ashMore} alt="" className="w-5 h-5" />
    //       </button>

    //       {/* Modal */}
    //       {showModal && TimeLineModal && (
    //         <div
    //           ref={modalRef}
    //           className="absolute right-0 top-8 bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50"
    //           role="menu"
    //           aria-label="Post options"
    //         >
    //           {TimeLineModal}
    //         </div>
    //       )}
    //     </div>
    //   </header>

    //   {/* Media Section */}

    //   {hasImages && (
    //     <div className="w-full my-4">
    //       <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
    //         {timeLineImage?.slice(0, 6).map((media, index) => {
    //           const isImage = media.mediaType === "PHOTO";
    //           const isVideo = media.mediaType === "VIDEO";
    //           const isDocument = media.mediaType === "DOCUMENT";
    //           const hasMore = timeLineImage.length > 6 && index === 5;

    //           return (
    //             <div
    //               key={`${media?.mediaLink}-${index}`}
    //               className={`relative overflow-hidden ${
    //                 timeLineImage?.length === 1
    //                   ? "col-span-2 md:col-span-3 aspect-video"
    //                   : "aspect-square"
    //               }`}
    //             >
    //               {/* Overlay for "+X more" on last item */}
    //               {hasMore && (
    //                 <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 cursor-pointer rounded">
    //                   <span className="text-white text-2xl font-semibold">
    //                     +{timeLineImage.length - 6} more
    //                   </span>
    //                 </div>
    //               )}

    //               {isImage && (
    //                 <img
    //                   src={media?.mediaLink}
    //                   alt={`Post image ${index + 1} of ${
    //                     timeLineImage?.length
    //                   }`}
    //                   className="w-full h-full object-cover rounded"
    //                   loading="lazy"
    //                 />
    //               )}

    //               {isVideo && (
    //                 <video
    //                   src={media?.mediaLink}
    //                   controls
    //                   className="w-full h-full object-cover rounded"
    //                   preload="metadata"
    //                 >
    //                   Your browser does not support the video tag.
    //                 </video>
    //               )}

    //               {isDocument && (
    //                 <a
    //                   href={media?.mediaLink}
    //                   target="_blank"
    //                   rel="noopener noreferrer"
    //                   className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 rounded"
    //                 >
    //                   {/* Icon based on file extension */}
    //                   {getFileIcon(media?.mediaLink)}
    //                   <span className="text-sm font-medium text-gray-700 text-center px-2 mt-2 line-clamp-2">
    //                     {getFileName(media?.mediaLink)}
    //                   </span>
    //                   <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
    //                     <svg
    //                       className="w-3 h-3"
    //                       fill="none"
    //                       stroke="currentColor"
    //                       viewBox="0 0 24 24"
    //                     >
    //                       <path
    //                         strokeLinecap="round"
    //                         strokeLinejoin="round"
    //                         strokeWidth={2}
    //                         d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
    //                       />
    //                     </svg>
    //                     Download
    //                   </span>
    //                 </a>
    //               )}
    //             </div>
    //           );
    //         })}
    //       </div>
    //     </div>
    //   )}

    //   {/* Action Icons */}
    //   {ifIcon && (
    //     <footer className="flex items-center py-4 ml-16">
    //       {reactionsData?.map(({ type, icon: Icon, number }) => (
    //         <IconAndNumber
    //           key={type}
    //           publicid={publicId}
    //           reactionType={type}
    //           Icon={Icon}
    //           number={number}
    //         />
    //       ))}
    //     </footer>
    //   )}
    // </article>

    <PostCard
      {...props}
      headerActions={
        <>
          <button
            onClick={props.toggleModal}
            className="cursor-pointer ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="More options"
            aria-expanded={props.showModal}
            aria-haspopup="true"
          >
            <img src={ashMore} alt="" className="w-5 h-5" />
          </button>

          {props.showModal && props.TimeLineModal && (
            <div
              ref={modalRef}
              className="absolute right-0 top-8 bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50"
              role="menu"
              aria-label="Post options"
            >
              {props.TimeLineModal}
            </div>
          )}
        </>
      }
    />
  );
};

export default React.memo(ViewPost);
