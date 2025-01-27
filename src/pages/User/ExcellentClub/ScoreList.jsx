import React from "react";
import { images } from "../../../utils/images";

export default function ScoreList() {
  const scores = [
    {
      id: 1,
      name: "성결대 멋쟁이사자처럼",
      image: images.likelion,
      score: 300,
    },
    { id: 2, name: "페가수스", image: images.pegasuss, score: 200 },
    { id: 3, name: "애드마인", image: images.admin, score: 100 },
  ];

  const sortedScores = scores
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, grade: index + 1 }));

  const getGrade = (grade) => {
    switch (grade) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  return (
    <div className="flex flex-col font-Moneygraphy w-[85%] bg-[#ffffff] border-[1px] border-[#d2b48c] text-[#996515] rounded-[10px] mt-10 z-10">
      {sortedScores.map((item, index) => (
        <div
          key={item.id}
          className={`flex px-3 py-4 ${
            index !== sortedScores.length - 1
              ? "border-b-[1px] border-[#d2b48c]"
              : ""
          }`}
        >
          <div className="flex justify-start text-[14px] w-[50px]">
            {`${item.grade}${getGrade(item.grade)}`}
          </div>
          <div className="flex justify-center text-[15px] flex-grow">
            {item.name}
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
