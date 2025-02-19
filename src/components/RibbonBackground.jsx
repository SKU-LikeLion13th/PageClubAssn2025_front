import React from "react";
import { images } from '../utils/images';

export default function RibbonBackground() {
  return (
    <>
      {/* 리본 배경 */}
      <div className="absolute flex items-center justify-center w-full h-full z-0">
          <img src={images.ribbon} className="w-full" alt="ribbon" />
      </div>
    </>
  );
}