import React from 'react';
import { images } from "../../utils/images";

export default function PageBackground() {
  return (
    <div className="fixed z-0 grid grid-cols-2 grid-rows-2 gap-16 px-0 mx-0">
      <div className="flex">
        <img src={images.p} alt="p" className="w-fit h-fit mt-5 -ml-5 opacity-30 rotate-[23deg]" />
      </div>
      <div className="flex">
        <img src={images.a} alt="a" className="w-fit h-fit mt-[6rem] ml-7 opacity-30 rotate-[-29deg]" />
      </div>
      <div className="flex">
        <img src={images.g} alt="g" className="w-fit h-fit mt-[5rem] -ml-6 opacity-30 rotate-[-28deg]" />
      </div>
      <div className="flex">
        <img src={images.e} alt="e" className="w-fit h-fit mt-[8rem] ml-[3rem] opacity-30 rotate-[13deg]" />
      </div>
    </div>
  );
}