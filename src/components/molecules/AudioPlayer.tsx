import { getFileName } from "@/utils/helperTwo";
import { useCallback, useEffect, useRef, useState } from "react";

const AudioPlayer = ({
  src,
  compact = false,
}: {
  src: string;
  compact?: boolean;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(1);
  const animRef = useRef<number>(0);

  const fmt = (s: number) => {
    if (!s || isNaN(s)) return "0:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const tick = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
    animRef.current = requestAnimationFrame(tick);
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      cancelAnimationFrame(animRef.current!);
    } else {
      audio.play();
      animRef.current = requestAnimationFrame(tick);
    }
    setPlaying(!playing);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnd = () => {
      setPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    };
    const onLoaded = () => setDuration(audio.duration);
    audio.addEventListener("ended", onEnd);
    audio.addEventListener("loadedmetadata", onLoaded);
    return () => {
      audio.removeEventListener("ended", onEnd);
      audio.removeEventListener("loadedmetadata", onLoaded);
      cancelAnimationFrame(animRef.current!);
    };
  }, []);

  // Compact = inside the grid tile; full = inside the lightbox
  if (compact) {
    return (
      <div
        className="relative flex h-full w-full flex-col items-center justify-center gap-3 overflow-hidden rounded-xl p-4"
        style={{
          background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ambient blobs */}
        <div
          className="pointer-events-none absolute -left-6 -top-6 h-24 w-24 rounded-full opacity-30 blur-2xl"
          style={{ background: "#7c3aed" }}
        />
        <div
          className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full opacity-25 blur-2xl"
          style={{ background: "#2563eb" }}
        />

        {/* Waveform bars (decorative) */}
        <div className="flex items-center gap-[3px] opacity-60">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="w-[3px] rounded-full"
              style={{
                height: `${8 + Math.sin(i * 0.8) * 10 + Math.random() * 8}px`,
                background: playing
                  ? `hsl(${220 + i * 3}, 90%, 65%)`
                  : "#6b7280",
                animation: playing
                  ? `wave ${0.6 + (i % 4) * 0.15}s ease-in-out infinite alternate`
                  : "none",
                animationDelay: `${i * 0.05}s`,
              }}
            />
          ))}
        </div>

        {/* Play button */}
        <button
          onClick={togglePlay}
          className="flex h-11 w-11 items-center justify-center rounded-full shadow-lg transition-transform active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 0 20px rgba(99,102,241,0.5)",
          }}
        >
          {playing ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* Progress bar */}
        <div
          className="h-1 w-full cursor-pointer rounded-full bg-white/10"
          onClick={seek}
        >
          <div
            className="h-full rounded-full transition-all"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6366f1, #a78bfa)",
            }}
          />
        </div>

        <div className="flex w-full justify-between text-[10px] text-white/50">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>

        <audio ref={audioRef} src={src} preload="metadata" />
      </div>
    );
  }

  // ── Full player (lightbox) ──────────────────────────────────────────────────
  return (
    <div
      className="flex w-full max-w-md flex-col gap-5 rounded-3xl p-8"
      style={{
        background: "linear-gradient(145deg, #13111c, #1e1b2e)",
        boxShadow:
          "0 30px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Vinyl record */}
      <div
        className="mx-auto flex h-40 w-40 items-center justify-center rounded-full shadow-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #1a1a2e 75%, #0d0d0d 100%)",
          boxShadow: playing
            ? "0 0 40px rgba(139,92,246,0.4)"
            : "0 10px 30px rgba(0,0,0,0.5)",
          animation: playing ? "spin 4s linear infinite" : "none",
        }}
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black shadow-inner">
          <div className="h-3 w-3 rounded-full bg-white/20" />
        </div>
      </div>

      {/* File name */}
      <div className="text-center">
        <p className="text-sm font-semibold text-white/90 line-clamp-1">
          {getFileName(src)}
        </p>
        <p className="text-xs text-white/40 mt-0.5">Audio Track</p>
      </div>

      {/* Progress */}
      <div className="space-y-1.5">
        <div
          className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/10"
          onClick={seek}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: "linear-gradient(90deg, #6366f1, #a78bfa)",
              boxShadow: "0 0 8px rgba(139,92,246,0.6)",
            }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full bg-white shadow-md"
            style={{ left: `calc(${progress}% - 7px)` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-white/40">
          <span>{fmt(currentTime)}</span>
          <span>{fmt(duration)}</span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center gap-6">
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (audioRef.current)
              audioRef.current.currentTime = Math.max(
                0,
                audioRef.current.currentTime - 10,
              );
          }}
          className="text-white/50 hover:text-white transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="1 4 1 10 7 10" />
            <path d="M3.51 15a9 9 0 1 0 .49-3.51" />
            <text
              x="8"
              y="15"
              fontSize="7"
              fill="currentColor"
              stroke="none"
              fontWeight="bold"
            >
              10
            </text>
          </svg>
        </button>

        <button
          onClick={togglePlay}
          className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95"
          style={{
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            boxShadow: "0 0 30px rgba(99,102,241,0.45)",
          }}
        >
          {playing ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (audioRef.current)
              audioRef.current.currentTime = Math.min(
                audioRef.current.duration,
                audioRef.current.currentTime + 10,
              );
          }}
          className="text-white/50 hover:text-white transition-colors"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="23 4 23 10 17 10" />
            <path d="M20.49 15a9 9 0 1 1-.49-3.51" />
            <text
              x="8"
              y="15"
              fontSize="7"
              fill="currentColor"
              stroke="none"
              fontWeight="bold"
            >
              10
            </text>
          </svg>
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3">
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="white"
          className="opacity-40 flex-shrink-0"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
        </svg>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            e.stopPropagation();
            const v = parseFloat(e.target.value);
            setVolume(v);
            if (audioRef.current) audioRef.current.volume = v;
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-full accent-violet-500 cursor-pointer"
          style={{ accentColor: "#8b5cf6" }}
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="white"
          className="opacity-40 flex-shrink-0"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path
            d="M15.54 8.46a5 5 0 0 1 0 7.07"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M19.07 4.93a10 10 0 0 1 0 14.14"
            stroke="white"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <audio ref={audioRef} src={src} preload="metadata" />
    </div>
  );
};

export { AudioPlayer };
