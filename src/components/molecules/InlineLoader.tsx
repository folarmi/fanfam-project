const InlineLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex items-center gap-2">
        <div className="h-3 w-3 animate-bounce rounded-full bg-[#2599F6] [animation-delay:-0.3s]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-[#0567B5] [animation-delay:-0.15s]" />
        <div className="h-3 w-3 animate-bounce rounded-full bg-[#2599F6]" />
      </div>
    </div>
  );
};

export { InlineLoader };
