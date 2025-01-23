import React, { useState } from "react";
import RibbonBackground from "../../components/RibbonBackground";
import { IoCaretDownOutline } from "react-icons/io5";
import { images } from "../../utils/images";

export default function Rental() {
  // {/* YesRental */}
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
        rentalDate: "2024년 12월 31일",
      },
      {
        itemName: "탁구공",
        image: images.testball,
        rentalDate: "2025년 1월 18일",
      },
    ],
  };

  // {/* NoRental */}
  // const testUser = {
  //   name: "최유정",
  //   clubs: [
  //     { name: "성결대학교 멋쟁이사자처럼", logo: images.likelion },
  //     { name: "페가수스", logo: images.pegasuss },
  //   ],
  // }

  const [selectedClub, setSelectedClub] = useState(testUser.clubs[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentReservationIndex, setCurrentReservationIndex] = useState(0);

  const handleClubSelect = (club) => {
    setSelectedClub(club);
    setIsDropdownOpen(false);
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

  const parseKoreanDate = (koreanDate) => {
    const regex = /(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/;
    const matches = koreanDate.match(regex);
    if (matches) {
      const [_, year, month, day] = matches;
      return new Date(year, month - 1, day);
    }
    return null;
  };

  const getReturnDate = (rentalDate) => {
    const rentalDateObj = parseKoreanDate(rentalDate);
    if (!rentalDateObj) return "날짜 형식 오류";

    const returnDateObj = new Date(rentalDateObj);
    returnDateObj.setDate(returnDateObj.getDate() + 7);

    const year = returnDateObj.getFullYear();
    const month = returnDateObj.getMonth() + 1;
    const day = returnDateObj.getDate();

    return `${year}년 ${month}월 ${day}일`;
  };

  const isOverdue = (returnDateString) => {
    const returnDate = parseKoreanDate(returnDateString);
    if (!returnDate) return false;

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    returnDate.setHours(0, 0, 0, 0);

    return currentDate > returnDate;
  };

  const DateInfo = ({ rentalDate }) => {
    const returnDate = getReturnDate(rentalDate);

    if (isOverdue(returnDate)) {
      return (
        <div className="text-center">
          <span className="text-[#FF7009] font-bold">연체</span>되었습니다.
          <br />
          빠른 시일 내에 동아리연합회실로
          <br />
          반납해주세요.
        </div>
      );
    }

    return (
      <div>
        대여일 : {rentalDate} <br />
        반납일 : {returnDate}
      </div>
    );
  };

  return (
    <div className="relative w-full min-h-screen">
      <RibbonBackground />
      <div>
        <div className="flex flex-col items-center text-[#996515] h-screen">
          <div className="text-[50px] mt-7">MY PAGE</div>

          {/* 드롭다운 컨테이너 */}
          <div className="relative flex flex-col items-center justify-center w-full mt-5 text-[14px] font-Moneygraphy">
            <div
              className="flex items-center bg-[#ffffff] w-[80%] px-4 py-2 border-[#D2B48C] rounded-[10px] cursor-pointer relative z-10"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <div>
                <img
                  src={selectedClub.logo}
                  alt="clublogo"
                  className="w-[60px] my-1 object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col items-center justify-center text-[14px] w-full">
                <div className="flex items-center">
                  {selectedClub.name}
                  <IoCaretDownOutline className="ml-2" />
                </div>
                <div>{testUser.name}</div>
              </div>
            </div>

            {isDropdownOpen && (
              <div className="flex flex-col bg-[#ffffff] w-[80%] border-[#D2B48C] border rounded-[10px] shadow-lg absolute mt-0 z-50">
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

          {/* 대여 현황 컨테이너 */}
          <div className="flex flex-col items-center w-full">
            <div className="text-[35px] mt-7">대여 현황</div>
            <div className="relative font-Moneygraphy flex justify-center items-center w-[85%] h-[22rem] px-10 text-[16px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[13px] mt-7">
              {testUser?.reservation?.length > 0 ? (
                <div className="flex flex-col items-center">
                  {/* 대여한 물품 정보 */}
                  <div className="flex flex-col items-center py-5 text-center">
                    <img
                      src={testUser.reservation[currentReservationIndex].image}
                      alt={
                        testUser.reservation[currentReservationIndex].itemName
                      }
                      className="w-[90px] h-[90px] object-cover mb-4"
                    />
                    <div className="w-full mb-5">
                      {testUser.reservation[currentReservationIndex].itemName}
                    </div>
                    <DateInfo
                      rentalDate={
                        testUser.reservation[currentReservationIndex].rentalDate
                      }
                    />
                  </div>

                  {/* 슬라이드 버튼 */}
                  <div className="flex items-center mt-5 mb-3 text-[#996515] text-[16px] space-x-4">
                    <button
                      onClick={handlePrev}
                      className="hover:text-[#FF7009]"
                    >
                      <img src={images.left} alt="left" />
                    </button>
                    <span className="text-[11px]">
                      {currentReservationIndex + 1}/
                      {testUser.reservation.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="hover:text-[#FF7009]"
                    >
                      <img src={images.right} alt="left" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>대여 중인 물품이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
