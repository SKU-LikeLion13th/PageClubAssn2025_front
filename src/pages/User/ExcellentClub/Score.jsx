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
    <div className="relative z-0">
      <div className="flex justify-center text-[25.5px] border-[0.5px] border-[#996515] bg-[#fdfdfd] rounded-[62px] mt-20 px-8 py-1">
        1분기 활동 점수 TOP3
      </div>
        {/* Score List */}
        <div className="flex relative justify-center pt-10 z-10">
          {sortedTop3.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col items-center justify-end ${
                item.grade === 1 ? "order-2 mx-2.5" : item.grade === 2 ? "order-1" : "order-3"
              }`}
            >
              {item.grade === 1 && (
                <img
                  className="w-[40px] mb-2"
                  src="assets/images/win.png"
                  alt="1등 트로피"
                />
              )}
              <img
                className={`${
                  item.grade === 1
                    ? "w-[80%]"
                    : item.grade === 2
                    ? "w-[60%]"
                    : "w-[40%]"
                }`}
                src={`assets/images/${item.image}`}
                alt={item.name}
              />
              <div className="flex my-1 mx-auto font-Moneygraphy text-[8px] text-[#3f3f3f]">{item.name}</div>
              <div
                className={`flex justify-center items-center w-[5rem] ${
                  item.grade === 1 ? "h-[100px]" : item.grade === 2 ? "h-[80px]" : "h-[60px]"
                } bg-[#F6E9D9] rounded-t-[10px]`}
              >
                {item.grade}
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
