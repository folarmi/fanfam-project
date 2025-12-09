import type { MediaFile } from "@/lib/types";
import { getFileIcon, getFileName } from "@/utils/helperTwo";

interface MediaGridProps {
  timeLineImage: MediaFile[];
  onMediaClick?: () => void;
}

const MediaGrid: React.FC<MediaGridProps> = ({
  timeLineImage,
  onMediaClick,
}) => {
  return (
    <div className="w-full my-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
        {timeLineImage?.slice(0, 6).map((media, index) => {
          const isImage = media?.mediaType === "PHOTO";
          const isVideo = media?.mediaType === "VIDEO";
          const isDocument = media?.mediaType === "DOCUMENT";
          const isAudio = media?.mediaType === "AUDIO";
          const hasMore = timeLineImage.length > 6 && index === 5;

          return (
            <div
              key={`${media?.mediaLink}-${index}`}
              className={`relative overflow-hidden ${
                timeLineImage?.length === 1
                  ? "col-span-2 md:col-span-3 aspect-video"
                  : "aspect-square"
              } ${onMediaClick ? "cursor-pointer" : ""}`}
              onClick={onMediaClick}
            >
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
                  alt={`Post image ${index + 1} of ${timeLineImage?.length}`}
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

              {isAudio && (
                <div className="w-full h-full bg-gray-100 rounded flex flex-col items-center justify-center p-2">
                  <audio
                    controls
                    src={media?.mediaLink}
                    className="w-full"
                    preload="metadata"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span className="text-xs text-gray-700 mt-1 line-clamp-1">
                    {getFileName(media?.mediaLink)}
                  </span>
                </div>
              )}

              {isDocument && (
                <a
                  href={media?.mediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200 rounded"
                  onClick={(e) => !onMediaClick && e.stopPropagation()}
                >
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
  );
};

export default MediaGrid;
