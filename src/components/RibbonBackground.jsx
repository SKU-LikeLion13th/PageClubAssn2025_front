import React from "react";
import { images } from "../utils/images";

export default function RibbonBackground() {
  return (
    <>
      {/* 리본 배경 */}
      <div className="absolute flex items-center justify-center w-full h-full">
        <img src={images.ribbon} className="mt-[10%] w-full" alt="ribbon" />
      </div>
    </>
  );
}