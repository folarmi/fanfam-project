import { audioImages } from "../data";

const AudioMedia = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3">
      {audioImages.map((src, index) => (
        <div
          key={index}
          className="bg-grey_500 h-[209px] flex items-center justify-center mr-[2px] mb-[2px]"
        >
          <img src={src} alt={`Gallery ${index}`} className="" loading="lazy" />
        </div>
      ))}
    </div>
  );
};

export default AudioMedia;
