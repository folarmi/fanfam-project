/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import photoOne from "@/public/paradise.svg";
import imageOne from "@/public/imageOne.svg";
import imageTwo from "@/public/imageTwo.svg";
import imageThree from "@/public/imageThree.svg";
import imageFour from "@/public/imageFour.svg";
import headerOne from "@/public/headerOne.svg";
import headerTwo from "@/public/headerTwo.svg";
import headerThree from "@/public/headerThree.svg";
import headerFour from "@/public/headerFour.svg";
import headerFive from "@/public/headerFive.svg";

const ImageSlider = () => {
  const firstSet = [
    headerOne,
    headerTwo,
    headerThree,
    headerFour,
    headerFive,
    ,
  ];

  const secondSet = [
    imageOne,
    imageTwo,
    headerThree,
    headerFour,
    headerFive,
    ,
  ];

  const [currentSet, setCurrentSet] = useState(firstSet);
  const [isFirstSet, setIsFirstSet] = useState(true);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSet(isFirstSet ? secondSet : firstSet);
      setIsFirstSet(!isFirstSet);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [isFirstSet]);

  return (
    <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3">
      {currentSet.map((image, index) => (
        <div key={index} className="relative w-full h-64">
          <Image
            src={image}
            alt={`Slide ${index}`}
            // layout="fill"
            objectFit="cover"
            className="rounded-xl transition-opacity duration-1000"
          />
        </div>
      ))}
      {/* <Image src={imageFour} alt="imageFour" /> */}
    </div>
  );
};

export default ImageSlider;
