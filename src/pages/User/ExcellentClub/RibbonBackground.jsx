import React from "react";
import { images } from "../../../utils/images";

export default function RibbonBackground() {
  return (
    <>
      {/* 리본 배경 */}
      <div className="flex absolute items-center justify-center h-full ">
        <img src={images.ribbon} className="transform rotate-[-40deg]" />
      </div>
    </>
  );
}
