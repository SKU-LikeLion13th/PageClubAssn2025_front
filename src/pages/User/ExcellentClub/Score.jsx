import React from "react";

export default function Score() {
  const top3 = [
    { id: 1, name: "성결대학교 멋쟁이사자처럼", image: "likelion.png", score: 300 },
    { id: 2, name: "페가수스", image: "pegasuss.png", score: 200 },
    { id: 3, name: "애드마인", image: "admin.png", score: 100 },
  ];

  const sortedTop3 = top3
    .sort((a, b) => b.score - a.score)
    .map((item, index) => ({ ...item, grade: index + 1 }));

  return (
    <div className="relative">
      <div className="flex justify-center text-[25.5px] border-[0.5px] border-[#996515] bg-[#fdfdfd] rounded-[62px] mt-10 px-8 py-1 translate-y-[70%]">
        1분기 활동 점수 TOP3
      </div>

      <div className="flex flex-col mt-12 absolute z-[20] left-[50%] transform -translate-x-[50%] translate-y-[15%] ">
        {/* Score List */}
        <div className="flex justify-center h-max-fit">
          {sortedTop3.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-end ${
                item.grade === 1 ? "order-2 mx-8" : item.grade === 2 ? "order-1" : "order-3"
              }`}
            >
              <img className="w-[60px] h-[60px]" src={`assets/images/${item.image}`} alt={item.name} />
              <div className="flex my-1 mx-auto font-Moneygraphy text-[8px] text-[#3f3f3f]">{item.name}</div>
              <div
                className={`flex justify-center items-center w-[90px] ${
                  item.grade === 1 ? "h-[100px]" : item.grade === 2 ? "h-[80px]" : "h-[60px]"
                } bg-[#D2B48C] bg-opacity-20 rounded-t-[10px]`}
              >
                {item.grade}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
