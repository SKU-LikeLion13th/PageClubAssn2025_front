import React from "react";

const getRankingSuffix = (rank) => {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
};

export default function ScoreList({ scores = [] }) {
  return (
    <div className="flex flex-col font-Moneygraphy w-10/12 bg-[#ffffff] border-[1px] border-[#d2b48c] text-[#996515] rounded-[10px] mt-12 z-10">
      {scores.map((item, index) => (
        <div
          key={item.id || index}
          className={`flex px-3 py-4 ${
            index !== scores.length - 1
              ? "border-b-[1px] border-[#d2b48c]"
              : ""
          }`}
        >
          <div className="flex justify-start text-[14px] w-[50px]">
            {`${item.ranking}${getRankingSuffix(item.ranking)}`}
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