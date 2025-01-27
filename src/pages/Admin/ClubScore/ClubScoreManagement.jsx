import React from "react";

export default function ClubScoreManagement() {
  return (
    <>
      <div className="font-Y_spotlight mt-10 min-h-screen mx-6">
        {/* 타이틀 */}
        <div>
          <p className="text-[30px] text-center">활동 점수 관리</p>

          <div className="flex justify-end mb-3">
            <button className="h-[16px] w-[42px] text-[7.08px] bg-[#D1D1D3] rounded-[4.72px]">
              수정
            </button>
          </div>

          <p className="border border-[#D1D1D3]"></p>
        </div>
      </div>
    </>
  );
}
