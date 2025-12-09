import Picture from "@/assets/icons/picture";
import CustomFileUploader from "../forms/CustomFileUploader";

type PostUploaderProps = {
  handleFileUpload: (files: File[]) => void;
  handleRemoveFile: (index: number) => void;
};

const PostUploader = ({
  handleFileUpload,
  handleRemoveFile,
}: PostUploaderProps) => {
  return (
    <CustomFileUploader
      maxSizeMB={20}
      acceptFormats={[
        // Images
        "jpg",
        "jpeg",
        "png",
        "gif",
        "webp",
        "svg",
        // Videos
        "mp4",
        "mov",
        "avi",
        "mkv",
        "webm",
        // Documents
        "pdf",
        "doc",
        "docx",
        "txt",
      ]}
      multiple={true}
      onFileUpload={handleFileUpload}
      render={({
        previews,
        error,
        removeFile,
        triggerFileInput,
        isDragging,
        dropHandlers,
      }) => (
        <div
          {...dropHandlers}
          className={` rounded-lg transition-colors ${
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
        >
          {previews.length > 0 && (
            <div className="flex gap-2 flex-wrap">
              {previews.map((preview, index) => (
                <div key={index} className="relative">
                  {/* Different preview based on file type */}
                  {preview.file.type.startsWith("image/") && (
                    <img
                      src={preview.url}
                      alt={preview.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  {preview.file.type.startsWith("video/") && (
                    <video
                      src={preview.url}
                      className="w-20 h-20 object-cover rounded"
                    />
                  )}
                  {preview.file.type.startsWith("application/") && (
                    <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                      <span className="text-xs text-gray-600">
                        {preview.name.split(".").pop()?.toUpperCase()}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      removeFile(index);
                      handleRemoveFile(index);
                    }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}

          <Picture
            onClick={triggerFileInput}
            isActive={true}
            className="cursor-pointer mb-2"
          />

          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
      )}
    />
  );
};

export { PostUploader };
