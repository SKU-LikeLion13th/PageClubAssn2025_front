import React from "react";
// import { images } from "../../../utils/images";

export default function ScoreList({clubScore = []}) {

  return (
    <div className="flex flex-col font-Moneygraphy w-[85%] bg-[#ffffff] border-[1px] border-[#d2b48c] text-[#996515] rounded-[10px] mt-10 z-10">
      {clubScore.map((item, index) => (
        <div
          key={item.id}
          className={`flex px-3 py-4 ${
            index !== item.ranking.length - 1
              ? "border-b-[1px] border-[#d2b48c]"
              : ""
          }`}
        >
          <div className="flex justify-start text-[14px] w-[50px]">
            {`${item.ranking}${item.grade}`}
          </div>
          <div className="flex justify-center text-[15px] flex-grow">
            {item.clubName}
          </div>
          <div className="flex justify-end text-[10px]">
            <div className="flex px-2 items-center border-[1px] border-[#d2b48c] rounded-[20px]">
              {item.score}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
