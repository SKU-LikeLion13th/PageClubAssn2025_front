import React from "react";
import { images } from "../../../utils/images";

export default function Score({ scores = [] }) {
  if (scores.length === 0) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="relative flex flex-col items-center w-10/12 z-0 text-[#996515]">
      <div className="flex justify-center w-fit text-[25.5px] border-[0.5px] border-[#996515] bg-[#ffffff] rounded-[62px] mt-11 px-11 py-1">
        1분기 활동 점수 TOP3
      </div>
      <div className="flex items-end justify-center w-10/12 pt-10 gap-x-2">
        {scores.map((item) => (
          <div
            key={item.id || item.ranking}
            className={`flex flex-col items-center justify-center w-[6rem]`}
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
              className={`flex justify-center items-center w-[6rem] ${
                item.ranking === 1
                  ? "h-[8.5rem]"
                  : item.ranking === 2
                  ? "h-[6rem]"
                  : "h-[5rem]"  // 높이 조정
              } bg-[#F6E9D9] rounded-t-[10px]`}
            >
              {item.ranking}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
