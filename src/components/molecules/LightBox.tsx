import type { MediaItem } from "@/lib/types";
import { useCallback, useEffect, useState } from "react";
import { AudioPlayer } from "./AudioPlayer";

const Lightbox = ({
  items,
  startIndex,
  onClose,
}: {
  items: MediaItem[];
  startIndex: number;
  onClose: () => void;
}) => {
  const [idx, setIdx] = useState(startIndex);
  const current = items[idx];
  const isImage = current?.mediaType === "PHOTO";
  const isVideo = current?.mediaType === "VIDEO";
  const isAudio = current?.mediaType === "AUDIO";

  const prev = useCallback(
    () => setIdx((i) => (i - 1 + items.length) % items.length),
    [items.length],
  );
  const next = useCallback(
    () => setIdx((i) => (i + 1) % items.length),
    [items.length],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      {/* Close */}
      <button
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20"
        onClick={onClose}
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Counter */}
      {items.length > 1 && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1.5 text-xs font-semibold text-white/80 backdrop-blur">
          {idx + 1} / {items.length}
        </div>
      )}

      {/* Prev */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            prev();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 hover:scale-110"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div
        className="flex max-h-[90vh] max-w-[90vw] items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {isImage && (
          <img
            src={current.mediaLink}
            alt="Media"
            className="max-h-[85vh] max-w-[85vw] rounded-2xl object-contain shadow-2xl"
            style={{ boxShadow: "0 40px 100px rgba(0,0,0,0.8)" }}
          />
        )}
        {isVideo && (
          <video
            src={current.mediaLink}
            controls
            autoPlay
            className="max-h-[85vh] max-w-[85vw] rounded-2xl shadow-2xl"
          />
        )}
        {isAudio && <AudioPlayer src={current.mediaLink} />}
      </div>

      {/* Next */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            next();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 hover:scale-110"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Thumbnail strip */}
      {items.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2 rounded-2xl bg-black/50 p-2 backdrop-blur">
          {items.map((m, i) => (
            <button
              key={i}
              onClick={(e) => {
                e.stopPropagation();
                setIdx(i);
              }}
              className={`h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                i === idx
                  ? "ring-2 ring-violet-400 scale-110"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              {m.mediaType === "PHOTO" ? (
                <img src={m.mediaLink} className="h-full w-full object-cover" />
              ) : m.mediaType === "VIDEO" ? (
                <div className="flex h-full w-full items-center justify-center bg-gray-800">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              ) : m.mediaType === "AUDIO" ? (
                <div
                  className="flex h-full w-full items-center justify-center"
                  style={{
                    background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                    <path d="M9 18V5l12-2v13" />
                    <circle cx="6" cy="18" r="3" />
                    <circle cx="18" cy="16" r="3" />
                  </svg>
                </div>
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gray-700">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { Lightbox };
