import React from "react";
import CustomFileUploader from "../forms/CustomFileUploader";

interface StoryUploaderProps {
  onFileUpload: (file: File) => void;
}

const StoryUploader: React.FC<StoryUploaderProps> = ({ onFileUpload }) => {
  return (
    <CustomFileUploader
      maxSizeMB={1}
      acceptFormats={["png", "jpeg", "jpg", "gif"]}
      onFileUpload={onFileUpload}
      render={({
        previews,
        error,
        removeFile,
        triggerFileInput,
        dropHandlers,
        isDragging,
      }) => (
        <div {...dropHandlers}>
          {/* Upload box */}
          <label
            htmlFor="dropzone-file"
            onClick={triggerFileInput}
            className={`cursor-pointer block ${
              isDragging ? "bg-blue-50 border border-blue-400 rounded-lg" : ""
            }`}
          >
            <div className="flex flex-col">
              <div className="bg-grey_70/30 w-[140px] rounded-lg h-36 p-4 flex flex-col items-center justify-center hover:bg-grey_70/40 transition">
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeWidth="2" d="M12 8v8M8 12h8" />
                </svg>
                <span className="mt-auto text-sm text-gray-700">
                  Add to Story
                </span>
              </div>
            </div>
          </label>

          {/* Error message */}
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}

          {/* Previews */}
          {previews.length > 0 && (
            <div className="mt-2 flex gap-2 flex-wrap">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
};

export { StoryUploader };
