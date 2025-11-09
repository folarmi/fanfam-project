// components/molecules/EditMediaGrid.tsx
import { Trash2 } from "lucide-react";
import type { MediaType } from "@/lib/types";
import { getFileIcon, getFileName } from "@/utils/helperTwo";

interface EditMediaItem {
  mediaType: MediaType;
  mediaLink: string;
  isNew?: boolean;
  file?: File;
  previewUrl?: string;
}

interface EditMediaGridProps {
  mediaFiles: EditMediaItem[];
  onRemove: (index: number) => void;
  disabled?: boolean;
}

const EditMediaGrid: React.FC<EditMediaGridProps> = ({
  mediaFiles,
  onRemove,
  disabled = false,
}) => {
  const getDisplayUrl = (media: EditMediaItem): string => {
    return media.isNew ? media?.previewUrl || "" : media?.mediaLink;
  };

  if (mediaFiles.length === 0) return null;

  return (
    <div className="mb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {mediaFiles?.map((media, index) => {
          const displayUrl = getDisplayUrl(media);
          const isImage = media.mediaType === "PHOTO";
          const isVideo = media.mediaType === "VIDEO";
          const isAudio = media.mediaType === "AUDIO";
          const isDocument = media.mediaType === "DOCUMENT";

          return (
            <div
              key={index}
              className={`relative group overflow-hidden rounded-lg ${
                mediaFiles.length === 1
                  ? "col-span-2 md:col-span-3 aspect-video"
                  : "aspect-square"
              }`}
            >
              {/* New file indicator */}
              {media?.isNew && (
                <div className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full z-10 shadow-md">
                  New
                </div>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10 shadow-md"
                aria-label="Remove media"
                disabled={disabled}
              >
                <Trash2 size={16} />
              </button>

              {/* Media content */}
              {isImage && (
                <img
                  src={displayUrl}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              )}

              {isVideo && (
                <video
                  src={displayUrl}
                  className="w-full h-full object-cover"
                  controls
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>
              )}

              {isAudio && (
                <div className="w-full h-full bg-gradient-to-br from-purple-50 to-purple-100 flex items-center justify-center p-4">
                  <div className="w-full">
                    <div className="text-center mb-3">
                      <svg
                        className="w-12 h-12 mx-auto text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
                        />
                      </svg>
                      <span className="text-xs text-purple-700 font-medium mt-2 block">
                        Audio File
                      </span>
                    </div>
                    <audio
                      src={displayUrl}
                      controls
                      className="w-full"
                      preload="metadata"
                    />
                  </div>
                </div>
              )}

              {isDocument && (
                <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-4">
                  {getFileIcon(displayUrl)}
                  <span className="text-sm font-medium text-gray-700 text-center px-2 mt-2 line-clamp-2">
                    {getFileName(displayUrl)}
                  </span>
                  {!media?.isNew && (
                    <a
                      href={displayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-700 mt-2 flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
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
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status message */}
      {mediaFiles.some((f) => f.isNew) && (
        <p className="text-sm text-blue-600 mt-3">
          {mediaFiles.filter((f) => f.isNew).length} new file(s) will be
          uploaded when you save
        </p>
      )}
    </div>
  );
};

export default EditMediaGrid;

// Backend response
//   "body": [
//         {
//             "resource_type": "raw",
//             "url": "https://res.cloudinary.com/dezb6qbwe/raw/upload/v1762696452/8B20D8DA-9D64-4267-AC6F-97DA5724039A"
//         },
//         {
//             "resource_type": "raw",
//             "url": "https://res.cloudinary.com/dezb6qbwe/raw/upload/v1762696452/587959AB-6FA8-4117-A68D-31DF91B8B468"
//         }
//     ],

// Formvalues
// {
//     "message": "Testing for Edit purposes two",
//     "mentions": [],
//     "mediaFiles": [
//         {
//             "mediaType": "PHOTO",
//             "mediaLink": "https://res.cloudinary.com/dezb6qbwe/image/upload/v1762686993/C7EE96C6-DD4B-410E-B335-09676C88D4D5.jpg"
//         },
//         {
//             "mediaType": "PHOTO",
//             "mediaLink": "https://res.cloudinary.com/dezb6qbwe/raw/upload/v1762696452/8B20D8DA-9D64-4267-AC6F-97DA5724039A"
//         },
//         {
//             "mediaType": "PHOTO",
//             "mediaLink": "https://res.cloudinary.com/dezb6qbwe/raw/upload/v1762696452/587959AB-6FA8-4117-A68D-31DF91B8B468"
//         }
//     ]
// }
