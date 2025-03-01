import React, { useState, useEffect, useRef } from "react";
import { images } from "../../../utils/images";

export default function Score({ scores = [] }) {
  
  // 같은 등수를 가진 팀들을 관리할 상태
  const [currentIndexes, setCurrentIndexes] = useState({});
  const intervalIds = useRef({}); // useRef로 intervalIds를 관리합니다.

  useEffect(() => {
    // clean up the intervals on component unmount
    return () => {
      Object.values(intervalIds.current).forEach(clearInterval);
    };
  }, []);

  useEffect(() => {
    scores.forEach((item) => {
      const sameRankTeams = scores.filter((team) => team.ranking === item.ranking);
      
      if (sameRankTeams.length > 1 && !intervalIds.current[item.ranking]) {
        intervalIds.current[item.ranking] = setInterval(() => {
          setCurrentIndexes((prevIndexes) => {
            const currentIndex = prevIndexes[item.ranking] || 0;
            return {
              ...prevIndexes,
              [item.ranking]: (currentIndex + 1) % sameRankTeams.length,
            };
          });
        }, 2500);
      }
    });

    // 클린업 - 등수가 하나라도 바뀌면, 기존 setInterval을 지운 후 새로 시작합니다.
    scores.forEach((item) => {
      const sameRankTeams = scores.filter((team) => team.ranking === item.ranking);
      if (sameRankTeams.length <= 1 && intervalIds.current[item.ranking]) {
        clearInterval(intervalIds.current[item.ranking]);
        intervalIds.current[item.ranking] = null;
      }
    });

  }, [scores]); // scores가 바뀔 때마다 실행됩니다.

  if (scores.length === 0) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="relative flex flex-col items-center w-9/12 z-10 text-[#996515]">
      <div className="flex items-end justify-center w-full pt-10 gap-x-2">
        {[...new Set(scores.map((item) => item.ranking))].map((ranking) => {
          const sameRankTeams = scores.filter((team) => team.ranking === ranking);
          const currentIndex = currentIndexes[ranking] || 0;
          const item = sameRankTeams[currentIndex];

          return (
            <div
              key={item.id || item.ranking}
              className={`flex flex-col items-center justify-center w-full`}
              style={{
                order: item.ranking === 1 ? 2 : item.ranking === 2 ? 1 : 3,
              }}
            >
              {item.ranking === 1 && (
                <img className="w-[2rem] mb-2" src={images.win} alt="1등 트로피" />
              )}
              <img
                className={`${
                  item.ranking === 1
                    ? "w-[70%]"
                    : item.ranking === 2
                    ? "w-[50%]"
                    : "w-[40%]"
                }`}
                src={item.logo}
                alt={item.name}
              />
              <div className="flex my-1 mx-auto font-Moneygraphy text-[8px] text-[#3f3f3f]">
                {item.clubName}
              </div>
              <div
                className={`flex justify-center items-center w-[95%] ${
                  item.ranking === 1
                    ? "h-[7.5rem]"
                    : item.ranking === 2
                    ? "h-[5.5rem]"
                    : "h-[4rem]" 
                } bg-[#EFDABD] rounded-t-[10px]`}
              >
                {item.ranking}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
