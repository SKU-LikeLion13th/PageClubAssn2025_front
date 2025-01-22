import React, { useState } from "react";

export default function MyPage() {
  const [selectedClub, setSelectedClub] = useState("성결대학교 멋쟁이사자처럼");

  const handleClubChange = (event) => {
    setSelectedClub(event.target.value);
  };

  return (
    <div className="w-full h-[calc(100vh-35px)] flex justify-center items-center">
      <div className="font-Moneygraphy text-[#996515] w-[85%] text-center">
        {/* 마이페이지 타이틀 */}
        <div className="mb-10">
          <div className="font-Ownglyph_PDH text-[55px]">MY PAGE</div>
        </div>

        {/* 동아리 선택 */}
        <div className="flex items-center mb-4 bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg">
          {/* Logo */}
          <div className="w-[50px] h-[50px] ml-1">
            <img
              src="assets/images/likelion.png"
              alt="Club Logo"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Text */}
          <div className="flex-1 pr-1">
            <select
              className="w-full text-[#996515] text-[16px] bg-transparent border-none focus:outline-none text-center ml-1.5"
              value={selectedClub}
              onChange={handleClubChange}
            >
              <option value="성결대학교 멋쟁이사자처럼">
                성결대학교 멋쟁이사자처럼
              </option>
              <option value="페가수스">페가수스</option>
            </select>
            <p className="mt-1 text-[#996515] text-[15px]">구혜원</p>
          </div>
        </div>

        {/* Menu Buttons */}
        <div className="mt-8 mb-4">
          <p className="font-Ownglyph_PDH text-[32.21px]">물품대여</p>
          <button className="w-[75%] bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg mb-3">
            나의 예약 현황
          </button>
          <button className="w-[75%] bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg mb-3">
            나의 대여 현황
          </button>
        </div>

        {/* Membership Card */}
        <div className="mb-4">
          <p className="font-Ownglyph_PDH text-[32.21px]">동아리원증</p>
          <button className="w-[75%] bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg">
            구혜원님의 동아리원증
          </button>
        </div>

        {/* 로그아웃 */}
        <div>
          <button className="w-[97px] h-[37.96px] bg-[#D2B48C] text-[16px] text-[#583D2C] rounded-xl mt-8">
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
}
