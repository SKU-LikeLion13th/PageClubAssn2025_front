import React from "react";

export default function ClubScoreManagement() {
  const data = [
    { rank: 1, club: "성결대학교 멋쟁이사자처럼", score: 300 },
    { rank: 2, club: "페가수스", score: 200 },
    { rank: 3, club: "애드마인", score: 100 },
  ];

  return (
    <div className="font-Y_spotlight mt-6 min-h-screen mx-6">
      {/* 타이틀 */}
      <div>
        <p className="text-[30px] text-center">활동 점수 관리</p>

        <div className="flex justify-end mb-3">
          <button className="h-[16px] w-[42px] text-[7.08px] bg-[#D1D1D3] rounded-[4.72px]">
            수정
          </button>
        </div>

        <p className="border border-[#D1D1D3] mb-6"></p>
      </div>

      {/* 동아리 리스트 */}
      <div className="mx-10">
        {data.map((item) => (
          <div
            key={item.rank}
            className="font-PretendardVariable text-[14px] flex mb-4 pb-5">
            <div className="mr-5">
              <p>{item.rank}등</p>
            </div>

            <div className="flex-1">
              <div className="flex items-center mb-2">
                <p>동아리명 </p>
                <p className="ml-2 text-[12px] flex-1 text-center border-b border-[#3F3F3F]/[.5]">
                  {item.club}
                </p>
              </div>

              <div className="flex items-center">
                <p>점수</p>
                <p className="ml-2 text-[12px] flex-1 text-center border-b-[0.35px] border-[#3F3F3F]/[.5]">
                  {item.score}점
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
