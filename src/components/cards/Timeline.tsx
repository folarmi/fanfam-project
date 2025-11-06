// /* eslint-disable @typescript-eslint/no-explicit-any */

// import blueVerifiedTick from "../../assets/blueVerifiedTick.svg";
import ashMore from "../../assets/icons/ashMore.svg";

import Typography from "../forms/Typography";
import IconAndNumber from "../IconAndNumber";
// import Modal from "../Modal";
import Like from "../../assets/icons/like";
import Comment from "../../assets/icons/comment";
import Pay from "../../assets/icons/pay";

// type TimelineProps = {
//   avatar: string;
//   profileName: string;
//   handle: string;
//   time: string;
//   paragraphOne?: string;
//   paragraphTwo?: string;
//   timeLineImage: string[];
//   ifParagraph?: boolean;
//   showModal?: any;
//   setShowModal?: any;
//   ifIcon?: boolean;
//   bgColor?: string;
//   TimeLineModal?: any;
// };

// const Timeline = ({
//   avatar,
//   profileName,
//   handle,
//   time,
//   paragraphOne,
//   paragraphTwo,
//   timeLineImage = [],
//   ifParagraph,
//   setShowModal,
//   showModal,
//   ifIcon = true,
//   bgColor = "#FAFAFA",
//   TimeLineModal,
// }: TimelineProps) => {
//   const toggleModal = () => {
//     setShowModal(!showModal);
//   };

//   return (
//     <div
//       style={{
//         backgroundColor: bgColor,
//       }}
//       className="pt-4 mb-2 drop-shadow-4xl"
//     >
//       <section className="flex items-start px-4">
//         <img src={avatar} alt="default avatar" />

//         <div className="flex justify-between w-full items-start">
//           <section className="ml-2">
//             <section className="flex items-center">
//               <Typography variant="titleTwo" className="pr-1">
//                 {profileName}
//               </Typography>
//               {/* <img src={blueVerifiedTick} alt="default avatar" /> */}
//               <Typography
//                 variant="p2"
//                 className="hidden md:block px-[6px] text-grey_500"
//               >
//                 {handle}
//               </Typography>
//               <Typography
//                 variant="p2"
//                 className="ml-auto md:ml-0 pr-6 md:pr-0 text-grey_500"
//               >
//                 {time}
//               </Typography>
//             </section>

//             <Typography variant="p2" className="md:hidden text-grey_500">
//               {handle}
//             </Typography>

//             {ifParagraph && (
//               <>
//                 {" "}
//                 <p className="pt-[2px] font-normal text-sm text-grey_30 leading-5 pb-4">
//                   {paragraphOne}
//                 </p>
//                 <p className="font-normal text-sm text-grey_700 leading-5">
//                   {paragraphTwo}
//                 </p>
//               </>
//             )}
//           </section>
//           <img
//             src={ashMore}
//             alt="default avatar"
//             onClick={toggleModal}
//             className="cursor-pointer"
//           />
//           {showModal && (
//             <div className="flex flex-col absolute left-[20%] md:left-[62%] bottom-[65%] md:bottom-[73%] bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50">
//               {TimeLineModal}
//             </div>
//           )}
//         </div>
//       </section>

//       <div className="w-full my-4">
//         {/* {timeLineImage.length > 0 && } */}
//         {timeLineImage.length > 0 &&
//           timeLineImage?.map((img) => {
//             return (
//               <img
//                 key={img}
//                 src={img}
//                 alt="timelineImage"
//                 className="w-full h-full"
//               />
//             );
//           })}
//       </div>

//       {ifIcon && (
//         <div className="pb-4 pl-4 flex items-center">
//           <IconAndNumber Icon={Like} number={52} />
//           <IconAndNumber Icon={Comment} number={24} />
//           <IconAndNumber Icon={Pay} />
//         </div>
//       )}
//     </div>
//   );
// };

// export default Timeline;

import React, { useCallback, useRef, useEffect } from "react";
import type { MediaFile } from "@/lib/types";
import { getFileIcon, getFileName } from "@/utils/helperTwo";

interface TimelineProps {
  avatar: string;
  profileName: string;
  handle: string;
  time: string;
  paragraphOne?: string;
  paragraphTwo?: string;
  timeLineImage?: MediaFile[];
  ifParagraph?: boolean;
  setShowModal: (show: boolean) => void;
  showModal: boolean;
  ifIcon?: boolean;
  bgColor?: string;
  TimeLineModal?: React.ReactNode;
}

const Timeline = ({
  avatar,
  profileName,
  handle,
  time,
  paragraphOne,
  paragraphTwo,
  timeLineImage = [],
  ifParagraph = false,
  setShowModal,
  showModal,
  ifIcon = true,
  bgColor = "#FAFAFA",
  TimeLineModal,
}: TimelineProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Memoized toggle function
  const toggleModal = useCallback(() => {
    setShowModal(!showModal);
  }, [showModal, setShowModal]);

  // Close modal when clicking outside
  useEffect(() => {
    if (!showModal) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showModal, setShowModal]);

  // Memoized image check
  const hasImages = timeLineImage.length > 0;

  return (
    <article
      style={{ backgroundColor: bgColor }}
      className="pt-4 mb-2 drop-shadow-4xl"
      aria-label={`Post by ${profileName}`}
    >
      {/* Header Section */}
      <header className="flex items-start px-4 relative">
        <img
          src={avatar}
          alt={`${profileName}'s avatar`}
          className="w-10 h-10 rounded-full flex-shrink-0"
          loading="lazy"
        />

        <div className="flex justify-between w-full items-start ml-2">
          <section className="flex-1 min-w-0">
            {/* Profile Info */}
            <div className="flex items-center flex-wrap gap-x-1.5">
              <Typography variant="titleTwo" className="font-semibold truncate">
                {profileName}
              </Typography>

              <Typography
                variant="p2"
                className="hidden md:inline text-grey_500 truncate"
              >
                {handle}
              </Typography>

              <Typography
                variant="p2"
                className="text-grey_500 ml-auto md:ml-0"
              >
                {time}
              </Typography>
            </div>

            {/* Mobile handle */}
            <Typography
              variant="p2"
              className="md:hidden text-grey_500 truncate"
            >
              {handle}
            </Typography>

            {/* Content Paragraphs */}
            {ifParagraph && (paragraphOne || paragraphTwo) && (
              <div className="mt-2 space-y-2">
                {paragraphOne && (
                  <p className="font-normal text-sm text-grey_30 leading-5">
                    {paragraphOne}
                  </p>
                )}
                {paragraphTwo && (
                  <p className="font-normal text-sm text-grey_700 leading-5">
                    {paragraphTwo}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* More Options Button */}
          <button
            onClick={toggleModal}
            className="cursor-pointer ml-2 p-1 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
            aria-label="More options"
            aria-expanded={showModal}
            aria-haspopup="true"
          >
            <img src={ashMore} alt="" className="w-5 h-5" />
          </button>

          {/* Modal */}
          {showModal && TimeLineModal && (
            <div
              ref={modalRef}
              className="absolute right-0 top-8 bg-modal-gradient shadow-triple w-[262px] rounded-2xl border-2 border-white z-50"
              role="menu"
              aria-label="Post options"
            >
              {TimeLineModal}
            </div>
          )}
        </div>
      </header>

      {/* Media Section */}

      {hasImages && (
        <div className="w-full my-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {timeLineImage?.slice(0, 6).map((media, index) => {
              const isImage = media.mediaType === "PHOTO";
              const isVideo = media.mediaType === "VIDEO";
              const isDocument = media.mediaType === "DOCUMENT";
              const hasMore = timeLineImage.length > 6 && index === 5;

              return (
                <div
                  key={`${media?.mediaLink}-${index}`}
                  className={`relative overflow-hidden ${
                    timeLineImage?.length === 1
                      ? "col-span-2 md:col-span-3 aspect-video"
                      : "aspect-square"
                  }`}
                >
                  {/* Overlay for "+X more" on last item */}
                  {hasMore && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 cursor-pointer rounded">
                      <span className="text-white text-2xl font-semibold">
                        +{timeLineImage.length - 6} more
                      </span>
                    </div>
                  )}

                  {isImage && (
                    <img
                      src={media?.mediaLink}
                      alt={`Post image ${index + 1} of ${
                        timeLineImage?.length
                      }`}
                      className="w-full h-full object-cover rounded"
                      loading="lazy"
                    />
                  )}

                  {isVideo && (
                    <video
                      src={media?.mediaLink}
                      controls
                      className="w-full h-full object-cover rounded"
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}

                  {isDocument && (
                    <a
                      href={media?.mediaLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 rounded"
                    >
                      {/* Icon based on file extension */}
                      {getFileIcon(media?.mediaLink)}
                      <span className="text-sm font-medium text-gray-700 text-center px-2 mt-2 line-clamp-2">
                        {getFileName(media?.mediaLink)}
                      </span>
                      <span className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Download
                      </span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Action Icons */}
      {ifIcon && (
        <footer className="pb-4 pl-4 flex items-center gap-4">
          <IconAndNumber Icon={Like} number={52} />
          <IconAndNumber Icon={Comment} number={24} />
          <IconAndNumber Icon={Pay} />
        </footer>
      )}
    </article>
  );
};

export default React.memo(Timeline);

// {
//     "phoneNumber": "+2348175988567",
//     "usid": "fafam-20251006HU8P8ehVcXD4LZRoGU87WRKmKCZHWONk6mEL6GXJ",
//     "role": "CREATOR",
//     "email": "excel@mailinator.com",
//     "residence": "sdkfndskf",
//     "fullName": "Brennan Carey",
//     "gender": "Male",
//     "location": "Laudantium quos nem",
//     "profilePic": "http://res.cloudinary.com/dezb6qbwe/image/upload/c_fill,h_250,w_200/v1762332518/image_id_fafam-20251006HU8P8ehVcXD4LZRoGU87WRKmKCZHWONk6mEL6GXJ",
//     "interest": "Blanditiis consectet",
//     "bio": "sjdknfbkjdsfsjkdnf",
//     "username": "testUserName",
//     "websiteUrl": null,
//     "displayName": "Cynthia Kirby",
//     "coverImageUrl": "http://res.cloudinary.com/dezb6qbwe/image/upload/v1762332508/24d0a56e-3bbb-4c2e-8abc-dbd6ffd6da23fafam-20251006HU8P8ehVcXD4LZRoGU87WRKmKCZHWONk6mEL6GXJ.svg"
// }
