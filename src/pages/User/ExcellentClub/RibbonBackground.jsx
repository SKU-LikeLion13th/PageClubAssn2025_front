import React from "react";

export default function RibbonBackground() {
  return (
    <>
      {/* 리본 배경 */}
      <div
        className="absolute z-0 w-[35rem] h-[38rem] top-[16%] left-[20%] bg-center bg-contain bg-no-repeat rotate-[-52deg] opacity-30"
        style={{ backgroundImage: 'url(/assets/images/ribbon.png)' }}
      ></div>
    </>
  );
}
