import React from "react";

export default function RibbonBackground() {
  return (
    <>
      {/* 리본 배경 */}
      <div
        className="flex absolute z-[0] top-[10%] left-[50%] w-[70vw] h-[70vh] bg-center bg-contain bg-no-repeat transform -translate-x-1/2 rotate-[-40deg]"
        style={{ backgroundImage: 'url(/assets/images/ribbon.png)' }}
      ></div>
    </>
  );
}