import React from "react";
import { images } from "../../../utils/images";

export default function Score({ scores = [] }) {
  console.log("받아온 scores:", scores);

  if (scores.length === 0) {
    return <div>데이터를 불러오는 중...</div>;
  }

  return (
    <div className="relative flex flex-col items-center w-full z-0 text-[#996515]">
      <div className="flex justify-center w-fit text-[25.5px] border-[0.5px] border-[#996515] bg-[#ffffff] rounded-[62px] mt-11 px-11 py-1">
        1분기 활동 점수 TOP3
      </div>
      <div className="relative z-10 flex justify-center w-full pt-10">
        {scores
          .sort((a, b) => a.ranking - b.ranking) // 랭킹 순 정렬
          .slice(0, 3) // 상위 3개만 표시
          .map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-end ${
                item.ranking === 1
                  ? "order-2 mx-3"
                  : item.ranking === 2
                  ? "order-1"
                  : "order-3"
              }`}
            >
              {item.ranking === 1 && (
                <img
                  className="w-[40px] mb-2"
                  src={images.win}
                  alt="1등 트로피"
                />
              )}
              <img
                className={`${
                  item.ranking === 1
                    ? "w-[80%]"
                    : item.ranking === 2
                    ? "w-[60%]"
                    : "w-[40%]"
                }`}
                src={item.logo}
                alt={item.name}
              />
              <div className="flex my-1 mx-auto font-Moneygraphy text-[8px] text-[#3f3f3f]">
                {item.clubName}
              </div>
              <div
                className={`flex justify-center items-center w-[5.7rem] ${
                  item.ranking === 1
                    ? "h-[8rem]"
                    : item.ranking === 2
                    ? "h-[6rem]"
                    : "h-[4rem]"
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
