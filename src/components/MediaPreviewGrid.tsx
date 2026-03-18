type PreviewFile = {
  file: File;
  url: string;
  name: string;
};

type MediaPreviewGridProps = {
  files: File[];
  onRemove: (index: number) => void;
};

/**
 * Renders a Twitter/LinkedIn-style media preview grid above the post toolbar.
 * - 1 file  → full width
 * - 2 files → side by side
 * - 3 files → one large left, two stacked right
 * - 4 files → 2×2 grid
 * - 5+      → 2-col wrap
 * Non-visual files (audio, docs) render as compact chips.
 */
const MediaPreviewGrid = ({ files, onRemove }: MediaPreviewGridProps) => {
  if (files.length === 0) return null;

  const previews: PreviewFile[] = files.map((file) => ({
    file,
    url: URL.createObjectURL(file),
    name: file.name,
  }));

  const visualFiles = previews.filter(
    (p) => p.file.type.startsWith("image/") || p.file.type.startsWith("video/"),
  );
  const otherFiles = previews.filter(
    (p) =>
      !p.file.type.startsWith("image/") && !p.file.type.startsWith("video/"),
  );

  const getGridClass = (count: number) => {
    if (count === 1) return "grid grid-cols-1";
    if (count === 2) return "grid grid-cols-2";
    if (count >= 3) return "grid grid-cols-2";
    return "grid grid-cols-2";
  };

  const getCellClass = (index: number, total: number) => {
    // 3 files: first item spans full height on left
    if (total === 3 && index === 0) return "row-span-2";
    return "";
  };

  const getImageClass = (total: number) => {
    if (total === 1) return "w-full max-h-80 object-cover rounded-xl";
    return "w-full h-44 object-cover rounded-xl";
  };

  return (
    <div className="mt-3 mx-0 space-y-2">
      {/* Visual media grid */}
      {visualFiles.length > 0 && (
        <div
          className={`${getGridClass(visualFiles.length)} gap-1.5 rounded-xl overflow-hidden`}
          style={{ maxHeight: visualFiles.length === 1 ? "none" : "360px" }}
        >
          {visualFiles.map((preview, index) => {
            const originalIndex = files.indexOf(preview.file);
            return (
              <div
                key={index}
                className={`relative group overflow-hidden rounded-xl ${getCellClass(
                  index,
                  visualFiles.length,
                )}`}
              >
                {preview.file.type.startsWith("image/") ? (
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className={getImageClass(visualFiles.length)}
                    style={
                      visualFiles.length > 1
                        ? { width: "100%", height: "100%", objectFit: "cover" }
                        : {}
                    }
                  />
                ) : (
                  <video
                    src={preview.url}
                    className="w-full h-full object-cover"
                    controls
                  />
                )}

                {/* Hover overlay + remove button */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-xl" />
                <button
                  type="button"
                  onClick={() => onRemove(originalIndex)}
                  className="
                    absolute top-2 right-2
                    w-7 h-7 rounded-full
                    bg-gray-900/70 hover:bg-gray-900/90
                    text-white
                    flex items-center justify-center
                    opacity-0 group-hover:opacity-100
                    transition-opacity
                    backdrop-blur-sm
                    text-base leading-none
                  "
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Non-visual file chips */}
      {otherFiles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {otherFiles.map((preview, index) => {
            const originalIndex = files.indexOf(preview.file);
            const isAudio = preview.file.type.startsWith("audio/");
            const ext = preview.name.split(".").pop()?.toUpperCase() ?? "FILE";

            return (
              <div
                key={index}
                className="
                  flex items-center gap-2
                  bg-gray-100 hover:bg-gray-150
                  border border-gray-200
                  rounded-lg px-3 py-2
                  text-sm text-gray-700
                  max-w-xs
                "
              >
                {isAudio ? (
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-base">🎤</span>
                    <audio
                      controls
                      src={preview.url}
                      className="h-7 max-w-[180px]"
                    />
                  </div>
                ) : (
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span
                      className="
                      bg-blue-100 text-blue-700 text-xs font-semibold
                      px-1.5 py-0.5 rounded
                    "
                    >
                      {ext}
                    </span>
                    <span className="truncate text-xs text-gray-600">
                      {preview.name}
                    </span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => onRemove(originalIndex)}
                  className="
                    ml-1 flex-shrink-0
                    w-5 h-5 rounded-full
                    flex items-center justify-center
                    text-gray-400 hover:text-red-500 hover:bg-red-50
                    transition-colors text-sm
                  "
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MediaPreviewGrid;
