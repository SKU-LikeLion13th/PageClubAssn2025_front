import React, { useState } from 'react';
import { images } from "../../../utils/images";
import { IoCaretDownOutline } from "react-icons/io5";

export default function YesReservation() {
  const testUser = {
    name: "최유정",
    clubs: [
      { name: "성결대학교 멋쟁이사자처럼", logo: images.likelion },
      { name: "페가수스", logo: images.pegasuss },
    ],
    reservation: [
      {
        itemName: "탁구채",
        image: images.testtg,
        reservationDate: "2024년 12월 23일",
      },
      {
        itemName: "탁구공",
        image: images.testball,
        reservationDate: "2024년 12월 26일",
      },
    ],
  };

  const [selectedClub, setSelectedClub] = useState(testUser.clubs[0]); // 기본값 설정
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태 관리
  const [currentReservationIndex, setCurrentReservationIndex] = useState(0); // 현재 슬라이드 상태

  const handleClubSelect = (club) => {
    setSelectedClub(club); // 동아리 선택
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  const handleNext = () => {
    setCurrentReservationIndex((prev) =>
      prev < testUser.reservation.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentReservationIndex((prev) =>
      prev > 0 ? prev - 1 : testUser.reservation.length - 1
    );
  };

  return (
    <div className="flex flex-col items-center justify-center text-[#996515]">
      <div className="text-[50px] mt-7">MY PAGE</div>

      {/* 드롭다운 컨테이너 */}
      <div className="flex flex-col items-center mt-5">
        <div
          className="flex items-center bg-[#ffffff] w-[320px] px-4 py-1 border-[#D2B48C] rounded-[10px] cursor-pointer"
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
          <div className="flex flex-col bg-[#ffffff] w-[320px] border-[#D2B48C] border rounded-[10px] shadow-lg mt-2">
            {testUser.clubs.map((club) => (
              <div
                key={club.name}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#f8f8f8]"
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
      <div className="flex flex-col items-center">
        <div className="text-[35px] mt-7">예약 현황</div>
        <div className="relative flex items-center w-fit h-fit px-10 font-Moneygraphy text-[17px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[13px] mt-7">
          {testUser.reservation.length > 0 ? (
            <div className='flex flex-col items-center'>
              {/* 예약된 물품 정보 */}
              <div className="flex flex-col items-center py-5 text-center">
                <img
                  src={testUser.reservation[currentReservationIndex].image}
                  alt={testUser.reservation[currentReservationIndex].itemName}
                  className="w-[90px] h-[90px] object-cover mb-4"
                />
                <div className='mb-2'>{testUser.reservation[currentReservationIndex].itemName}</div>
                <div>
                  <span className="font-bold text-[#FF7009]">
                    {testUser.reservation[currentReservationIndex].reservationDate}
                  </span>
                  {""}까지 <br/> 동아리연합회실로 방문해주세요.
                </div>
              </div>

              {/* 예약 취소 버튼 */}
              <div className='flex justify-center w-fit px-5 py-1 rounded-[20px] mb-3 text-[13px] text-[#583D2C] bg-[#D2B48C]'>예약 취소</div>

              {/* 슬라이드 버튼 */}
              <div className="flex items-center mt-5 mb-3 text-[#996515] text-[16px] space-x-4">
                <button onClick={handlePrev} className="hover:text-[#FF7009]">
                  <img src={images.left} alt="left" />
                </button>
                <span className='text-[11px]'>{currentReservationIndex + 1}/{testUser.reservation.length}</span>
                <button onClick={handleNext} className="hover:text-[#FF7009]">
                  <img src={images.right} alt="left" />
                </button>
              </div>
            </div>
          ) : (
            <div>예약 중인 물품이 없습니다.</div>
          )}
        </div>
      </div>
    </div>
  );
}
