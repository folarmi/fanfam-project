// import type { MediaFile } from "@/lib/types";
// import { getFileIcon, getFileName } from "@/utils/helperTwo";

import { getFileIcon, getFileName } from "@/utils/helperTwo";
import { Lightbox } from "./LightBox";
import { AudioPlayer } from "./AudioPlayer";
import { useState } from "react";
import type { MediaGridProps } from "@/lib/types";

// interface MediaGridProps {
//   timeLineImage: MediaFile[];
//   onMediaClick?: () => void;
// }

// const MediaGrid: React.FC<MediaGridProps> = ({
//   timeLineImage,
//   onMediaClick,
// }) => {
//   return (
//     <div className="w-full my-4">
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
//         {timeLineImage?.slice(0, 6).map((media, index) => {
//           const isImage = media?.mediaType === "PHOTO";
//           const isVideo = media?.mediaType === "VIDEO";
//           const isDocument = media?.mediaType === "DOCUMENT";
//           const isAudio = media?.mediaType === "AUDIO";
//           const hasMore = timeLineImage.length > 6 && index === 5;

//           return (
//             <div
//               key={`${media?.mediaLink}-${index}`}
//               className={`relative overflow-hidden ${
//                 timeLineImage?.length === 1
//                   ? "col-span-2 md:col-span-3 aspect-video"
//                   : "aspect-square"
//               } ${onMediaClick ? "cursor-pointer" : ""}`}
//               onClick={onMediaClick}
//             >
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
//                   alt={`Post image ${index + 1} of ${timeLineImage?.length}`}
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

//               {isAudio && (
//                 <div className="w-full h-full bg-gray-100 rounded flex flex-col items-center justify-center p-2">
//                   <audio
//                     controls
//                     src={media?.mediaLink}
//                     className="w-full"
//                     preload="metadata"
//                     onClick={(e) => e.stopPropagation()}
//                   />
//                   <span className="text-xs text-gray-700 mt-1 line-clamp-1">
//                     {getFileName(media?.mediaLink)}
//                   </span>
//                 </div>
//               )}

//               {isDocument && (
//                 <a
//                   href={media?.mediaLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 rounded"
//                   onClick={(e) => !onMediaClick && e.stopPropagation()}
//                 >
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
//   );
// };

// export default MediaGrid;

// const MediaGrid = ({ timeLineImage = [], onMediaClick }: MediaGridProps) => {
//   const [lightbox, setLightbox] = useState<number | null>(null);

//   if (!timeLineImage.length) return null;

//   const shown = timeLineImage.slice(0, 6);
//   const extra = timeLineImage.length - 6;

//   const openLightbox = (index: number) => {
//     setLightbox(index);
//     onMediaClick?.();
//   };

//   const gridClass =
//     timeLineImage.length === 1
//       ? "grid-cols-1"
//       : timeLineImage.length === 2
//         ? "grid-cols-2"
//         : timeLineImage.length === 3
//           ? "grid-cols-3"
//           : "grid-cols-2 md:grid-cols-3";

//   return (
//     <>
//       <style>{`
//         @keyframes wave {
//           from { transform: scaleY(0.5); }
//           to { transform: scaleY(1.3); }
//         }
//         @keyframes spin {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//       `}</style>

//       <div className={`grid gap-1 w-full my-4 ${gridClass}`}>
//         {shown.map((media, index) => {
//           const isImage = media.mediaType === "PHOTO";
//           const isVideo = media.mediaType === "VIDEO";
//           const isAudio = media.mediaType === "AUDIO";
//           const isDocument = media.mediaType === "DOCUMENT";
//           const isLastWithMore = extra > 0 && index === 5;

//           const spanClass =
//             timeLineImage.length === 1
//               ? "col-span-1 aspect-video"
//               : "aspect-square";

//           return (
//             <div
//               key={`${media.mediaLink}-${index}`}
//               className={`group relative overflow-hidden rounded-xl ${spanClass} ${
//                 !isDocument ? "cursor-pointer" : ""
//               }`}
//               onClick={() => !isDocument && openLightbox(index)}
//             >
//               {/* +N overlay */}
//               {isLastWithMore && (
//                 <div
//                   className="absolute inset-0 z-20 flex items-center justify-center rounded-xl"
//                   style={{
//                     background: "rgba(0,0,0,0.65)",
//                     backdropFilter: "blur(4px)",
//                   }}
//                 >
//                   <div className="text-center">
//                     <span className="text-3xl font-black text-white">
//                       +{extra}
//                     </span>
//                     <p className="text-xs text-white/60 mt-0.5">more</p>
//                   </div>
//                 </div>
//               )}

//               {isImage && (
//                 <>
//                   <img
//                     src={media.mediaLink}
//                     alt={`Media ${index + 1}`}
//                     className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
//                     loading="lazy"
//                   />
//                   <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/15 rounded-xl" />
//                   {/* Zoom hint */}
//                   <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
//                     <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
//                       <svg
//                         width="18"
//                         height="18"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="white"
//                         strokeWidth="2"
//                       >
//                         <circle cx="11" cy="11" r="8" />
//                         <line x1="21" y1="21" x2="16.65" y2="16.65" />
//                         <line x1="11" y1="8" x2="11" y2="14" />
//                         <line x1="8" y1="11" x2="14" y2="11" />
//                       </svg>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {isVideo && (
//                 <>
//                   <video
//                     src={media.mediaLink}
//                     className="h-full w-full object-cover"
//                     preload="metadata"
//                     muted
//                   />
//                   <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 transition-transform group-hover:scale-110">
//                       <svg
//                         width="20"
//                         height="20"
//                         viewBox="0 0 24 24"
//                         fill="white"
//                       >
//                         <path d="M8 5v14l11-7z" />
//                       </svg>
//                     </div>
//                   </div>
//                 </>
//               )}

//               {isAudio && (
//                 <div
//                   className="h-full w-full"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <AudioPlayer src={media.mediaLink} compact />
//                 </div>
//               )}

//               {isDocument && (
//                 <a
//                   href={media.mediaLink}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all hover:from-gray-100 hover:to-gray-200 hover:shadow-md"
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   {getFileIcon(media.mediaLink)}
//                   <span className="text-center text-xs font-semibold text-gray-700 line-clamp-2 leading-tight">
//                     {getFileName(media.mediaLink)}
//                   </span>
//                   <span className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-[10px] font-medium text-gray-600">
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

//       {lightbox !== null && (
//         <Lightbox
//           items={timeLineImage}
//           startIndex={lightbox}
//           onClose={() => setLightbox(null)}
//         />
//       )}
//     </>
//   );
// };

// export default MediaGrid;

const MediaGrid = ({ timeLineImage = [], onMediaClick }: MediaGridProps) => {
  const [lightbox, setLightbox] = useState<number | null>(null);
  console.log(timeLineImage);
  if (!timeLineImage.length) return null;

  const shown = timeLineImage.slice(0, 6);
  const extra = timeLineImage.length - 6;

  const openLightbox = (index: number) => {
    setLightbox(index);
    onMediaClick?.();
  };

  const gridClass =
    timeLineImage.length === 1
      ? "grid-cols-1"
      : timeLineImage.length === 2
        ? "grid-cols-2"
        : timeLineImage.length === 3
          ? "grid-cols-3"
          : "grid-cols-2 md:grid-cols-3";

  return (
    <>
      <style>{`
        @keyframes wave {
          from { transform: scaleY(0.5); }
          to { transform: scaleY(1.3); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className={`grid gap-1 w-full my-4 ${gridClass}`}>
        {shown.map((media, index) => {
          const isImage = media.mediaType === "PHOTO";
          const isVideo = media.mediaType === "VIDEO";
          const isAudio = media.mediaType === "AUDIO";
          const isDocument = media.mediaType === "DOCUMENT";
          const isLastWithMore = extra > 0 && index === 5;

          const spanClass =
            timeLineImage.length === 1
              ? "col-span-1 aspect-video"
              : "aspect-square";

          return (
            <div
              key={`${media.mediaLink}-${index}`}
              className={`group relative overflow-hidden rounded-xl ${spanClass} ${
                isImage || isVideo ? "cursor-pointer" : ""
              }`}
              onClick={(e) => {
                if (isImage || isVideo) {
                  e.stopPropagation();
                  openLightbox(index);
                }
              }}
            >
              {/* +N overlay */}
              {isLastWithMore && (
                <div
                  className="absolute inset-0 z-20 flex items-center justify-center rounded-xl"
                  style={{
                    background: "rgba(0,0,0,0.65)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <div className="text-center">
                    <span className="text-3xl font-black text-white">
                      +{extra}
                    </span>
                    <p className="text-xs text-white/60 mt-0.5">more</p>
                  </div>
                </div>
              )}

              {isImage && (
                <>
                  <img
                    src={media.mediaLink}
                    alt={`Media ${index + 1}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/15 rounded-xl" />
                  {/* Zoom hint */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 backdrop-blur-sm">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                      >
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        <line x1="11" y1="8" x2="11" y2="14" />
                        <line x1="8" y1="11" x2="14" y2="11" />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              {isVideo && (
                <>
                  <video
                    src={media.mediaLink}
                    className="h-full w-full object-cover"
                    preload="metadata"
                    muted
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/25 transition-colors group-hover:bg-black/40">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm ring-2 ring-white/30 transition-transform group-hover:scale-110">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="white"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}

              {isAudio && (
                <div
                  className="h-full w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <AudioPlayer src={media.mediaLink} compact />
                </div>
              )}

              {isDocument && (
                <a
                  href={media.mediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-xl border border-gray-100 bg-gradient-to-br from-gray-50 to-gray-100 p-4 transition-all hover:from-gray-100 hover:to-gray-200 hover:shadow-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  {getFileIcon(media.mediaLink)}
                  <span className="text-center text-xs font-semibold text-gray-700 line-clamp-2 leading-tight">
                    {getFileName(media.mediaLink)}
                  </span>
                  <span className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-[10px] font-medium text-gray-600">
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

      {lightbox !== null && (
        <Lightbox
          items={timeLineImage}
          startIndex={lightbox}
          onClose={() => setLightbox(null)}
        />
      )}
    </>
  );
};

export default MediaGrid;
