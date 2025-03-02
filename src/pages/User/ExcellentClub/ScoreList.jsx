import React, { useState } from "react";
import { images } from '../../../utils/images';

const getRankingSuffix = (rank) => {
  if (rank === 1) return "st";
  if (rank === 2) return "nd";
  if (rank === 3) return "rd";
  return "th";
};

const groupScoresByRanking = (scores) => {
  const grouped = {};
  
  // 점수를 기준으로 동아리 그룹화
  scores.forEach((item) => {
    if (!grouped[item.ranking]) {
      grouped[item.ranking] = [];
    }
    grouped[item.ranking].push(item);
  });

  return grouped;
};

export default function ScoreList({ scores = [] }) {
  const [expandedRankings, setExpandedRankings] = useState({});

  const groupedScores = groupScoresByRanking(scores);

  const toggleGroupVisibility = (rank) => {
    setExpandedRankings((prevState) => ({
      ...prevState,
      [rank]: !prevState[rank],
    }));
  };

  // Get all ranking keys and sort them numerically
  const sortedRanks = Object.keys(groupedScores).sort((a, b) => parseInt(a) - parseInt(b));
  
  return (
    <div className="flex flex-col font-Moneygraphy w-10/12 bg-[#ffffff] border-[1px] border-[#d2b48c] text-[#996515] rounded-[10px] mt-12 z-10">
      {sortedRanks.map((rank, index) => {
        const group = groupedScores[rank];
        const isLastRank = index === sortedRanks.length - 1;
        const isExpanded = expandedRankings[rank];

        return (
          <div key={rank}>
            <div
              className={`flex pl-4 pr-1.5 py-4 items-center ${group.length > 1 ? "cursor-pointer" : ""} 
                ${!isLastRank && !isExpanded ? "border-b-[1px] border-[#d2b48c]" : ""}`}
              onClick={() => group.length > 1 && toggleGroupVisibility(rank)}
            >
              <div className="flex justify-start text-[14px] w-fit">
                {`${rank}${getRankingSuffix(parseInt(rank))}`}
              </div>
              <div className="flex justify-center text-[15px] flex-grow">
                {group[0].clubName}
              </div>
              <div className={`flex justify-end h-fit text-[10px] ${!isExpanded && group.length <= 1 ? 'mr-3' : ''}`}>
                <div className="flex px-2 items-center border-[1px] border-[#d2b48c] rounded-[20px]">
                  {group[0].score}
                </div>
              </div>

              {group.length > 1 && (
                <img
                  src={images.clubToggle}
                  alt="Toggle"
                  className="ml-1.5"
                  style={{ width: "7px" }}
                />
              )}
            </div>

            {isExpanded && group.slice(1).map((item, itemIndex) => {
              const isLastExpandedItem = itemIndex === group.slice(1).length - 1;
              const shouldShowBorderBottom = !(isLastExpandedItem && rank === "3");

              return (
                <div 
                  key={item.id || itemIndex} 
                  className={`flex pl-4 pr-2.5 py-4 items-center ${itemIndex === 0 ? "border-t-[1px]" : ""} 
                    ${shouldShowBorderBottom ? "border-b-[1px]" : ""} border-[#d2b48c]`}
                >
                  <div className="flex justify-start text-[14px]">
                    {`${item.ranking}${getRankingSuffix(item.ranking)}`}
                  </div>
                  <div className="flex justify-center text-[15px] flex-grow">
                    {item.clubName}
                  </div>
                  <div className="flex justify-end h-fit text-[10px] mr-2">
                    <div className="flex px-2 items-center border-[1px] border-[#d2b48c] rounded-[20px]">
                      {item.score}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}