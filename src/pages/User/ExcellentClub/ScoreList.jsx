import React, { useState, useEffect } from "react";

const getRankingSuffix = (rank) => {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
};

export default function ScoreList({ scores = [] }) {
  const [currentIndexes, setCurrentIndexes] = useState({});

  useEffect(() => {
    const intervalIds = {};
    
    // 각 랭킹에 대해 동작을 설정
    [...new Set(scores.map((item) => item.ranking))].forEach((ranking) => {
      const sameRankTeams = scores.filter((team) => team.ranking === ranking);

      if (sameRankTeams.length > 1 && !intervalIds[ranking]) {
        intervalIds[ranking] = setInterval(() => {
          setCurrentIndexes((prevIndexes) => {
            const currentIndex = prevIndexes[ranking] || 0;
            return {
              ...prevIndexes,
              [ranking]: (currentIndex + 1) % sameRankTeams.length,
            };
          });
        }, 2500); // 2.5초 간격
      }
    });

    return () => {
      Object.values(intervalIds).forEach(clearInterval);
    };
  }, [scores]);

  return (
    <div className="flex flex-col font-Moneygraphy w-10/12 bg-[#ffffff] border-[1px] border-[#d2b48c] text-[#996515] rounded-[10px] mt-12 z-10">
      {scores
        .map((item, index) => {
          const sameRankTeams = scores.filter((team) => team.ranking === item.ranking);
          const currentIndex = currentIndexes[item.ranking] || 0;
          const displayItem = sameRankTeams[currentIndex];

          return {
            ...item,
            displayItem, // 각 동아리 항목에 displayItem을 추가
          };
        })
        .filter((item, index, self) => 
          // 각 랭킹별로 첫 번째 동아리만 표시
          index === self.findIndex((t) => t.ranking === item.ranking)
        )
        .map((item, index) => (
          <div
            key={item.id || index}
            className={`flex px-3 py-4 ${
              index !== scores.length - 1
                ? "border-b-[1px] border-[#d2b48c]"
                : ""
            }`}
          >
            <div className="flex justify-start text-[14px] w-[50px]">
              {`${item.displayItem.ranking}${getRankingSuffix(item.displayItem.ranking)}`}
            </div>
            <div className="flex justify-center text-[15px] flex-grow">
              {item.displayItem.clubName}
            </div>
            <div className="flex justify-end text-[10px]">
              <div className="flex px-2 items-center border-[1px] border-[#d2b48c] rounded-[20px]">
                {item.displayItem.score}
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
