import React, { useState } from 'react';
import { images } from "../../../utils/images";
import { IoCaretDownOutline } from "react-icons/io5";

export default function NoReservation() {
  const testUser = {
    name: "최유정",
    clubs: [
      { name: "성결대학교 멋쟁이사자처럼", logo: images.likelion },
      { name: "페가수스", logo: images.pegasuss },
    ],
  };

  const [selectedClub, setSelectedClub] = useState(testUser.clubs[0]); // 기본값 설정
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리

  const handleClubSelect = (club) => {
    setSelectedClub(club); // 동아리 선택
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  return (
    <div className="flex flex-col items-center justify-center text-[#996515]">
      <div className="text-[50px] mt-7">MY PAGE</div>

      {/* 드롭다운 컨테이너 */}
      <div className="relative flex flex-col items-center mt-5">
        <div
          className="flex items-center bg-[#ffffff] w-[320px] px-4 py-1 border-[#D2B48C] rounded-[10px] cursor-pointer relative z-10"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div className="w-[80px]">
            <img src={selectedClub.logo} alt="clublogo" className="w-[60px] object-cover rounded-full" />
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center">
              {selectedClub.name}
              <IoCaretDownOutline className="ml-2" />
            </div>
            <div>{testUser.name}</div>
          </div>
        </div>

        {isDropdownOpen && (
          <div className="flex flex-col bg-[#ffffff] w-[320px] border-[#D2B48C] border rounded-[10px] shadow-lg absolute mt-0 z-50">
            {testUser.clubs.map((club) => (
              <div
                key={club.name}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] first:rounded-t-[10px] last:rounded-b-[10px]"
                onClick={() => handleClubSelect(club)}
              >
                <img
                  src={club.logo}
                  alt={`${club.name} logo`}
                  className="w-[40px] h-[40px] object-cover rounded-full mr-3"
                />
                <span>{club.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 예약현황 컨테이너 */}
      <div className='flex flex-col items-center'>
        <div className='flex text-[35px] mt-7'>예약 현황</div>
        <div className='flex items-center w-fit h-[15rem] px-10 font-Moneygraphy text-[17px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[13px] mt-7'>예약 중인 물품이 없습니다.</div>
      </div>
    </div>
  );
}
