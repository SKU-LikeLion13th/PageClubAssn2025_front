import React from "react";
import { images } from "../../utils/images";

export default function PageBackground() {
  return (
    <div className="flex justify-center">
      <div className="fixed z-0 grid grid-cols-2 grid-rows-2 px-0 mx-0 w-[100%]">
        <div className="ml-[-3rem]">
          <img src={images.p} alt="p" className="w-full h-full rotate-[5deg]" />
        </div>
        <div className="mr-[-3rem]">
          <img
            src={images.a}
            alt="a"
            className="w-full h-full mt-[6rem] rotate-[-5deg]"
          />
        </div>
        <div className="ml-[-5rem]">
          <img
            src={images.g}
            alt="g"
            className="w-full h-full mt-[2rem] rotate-[-5deg]"
          />
        </div>
        <div className="mr-[-3rem]">
          <img
            src={images.e}
            alt="e"
            className="w-full h-full mt-[8rem] rotate-[5deg]"
          />
        </div>
      </div>
    </div>
  );
}
