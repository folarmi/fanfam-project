import React from "react";
import paradise from "../assets/paradise.svg";

import displayImageOne from "../assets/displayImageOne.svg";
import displayImageTwo from "../assets/displayImageTwo.svg";
import displayImageThree from "../assets/displayImageThree.svg";

const photos = [
  {
    id: 1,
    src: displayImageThree,
    alt: "Photo 1",
    custom: "row-span-1 mt",
  },
  {
    id: 2,
    src: displayImageOne,
    alt: "Photo 2",
    custom: "row-span-1 mt-36",
  },
  {
    id: 3,
    src: displayImageTwo,
    alt: "Photo 3",
    custom: "row-span-2 mt-52",
  },
  {
    id: 4,
    src: displayImageOne,
    alt: "Photo 4",
    custom: "h-32 overflow-hidden row-span-1 -mt-20",
  },
  {
    id: 5,
    src: displayImageThree,
    alt: "Photo 5",
    span: "row-span-1",
    custom: "h-12 overflow-hidden row-span-1",
  },
];

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="bg-cover bg-center custom-background h-screen w-screen max-w[1440px] overflow-x-hidden">
      {/* <p className="pl-8 pt-8 uppercase">Fan fam</p> */}
      <div className="bg-white/40 flex justify-center m-4 lg:m-12 rounded-3xl drop-shadow-3xl h-[670px]">
        <div className=" hidden lg:flex flex-col w-4/6 h-full">
          <div className="flex items-center mt-20 ml-[87px]">
            <img src={paradise} alt="paradise logo" loading="lazy" />
          </div>
          <div className="mt-auto justify-start">
            <div className="grid grid-cols-3 gap-4 lg:w-[604px]">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`rounded-lg overflow-hidden   ${
                    photo.span || ""
                  } ${photo.custom}`}
                >
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            {/* <PhotoFrame /> */}
          </div>
        </div>

        <div className="px-5 lg:px-0 w-full lg:w-2/6 lg:pr-[76px] pt-10 lg:pt-14">
          <div className="lg:hidden w-full mb-14 flex justify-center items-center">
            <img
              src={paradise}
              alt="paradise logo"
              className="w-[262px] "
              loading="lazy"
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;

{
  /* <div className="relative h-[69px] w-[292px]">
  <Image
    src={displayImage}
    alt={`suggestionOne`}
    className="w-full h-full object-cover"
  />

  <section className="">
    <div
      onClick={toggleVerticalOptions}
      className="absolute top-2 right-3 cursor-pointer"
    >
      <Image
        src={whiteVerticalIcon}
        alt={`whiteVerticalIcon`}
        className="w-6 h-6"
      />
    </div>
    {showVerticalOptions && (
      <div className="flex flex-col absolute bg-red-200 w-[360px] top-10 right-0 translate-x-[50%] rounded-2xl border-2 border-white z-50">
        <ModalContent content={collectionsOptions} />
      </div>
    )}
  </section>
</div> */
}
