import React, { useEffect, useState } from "react";
import RibbonBackground from "../../components/RibbonBackground";
import { images } from "../../utils/images";
import MemberContainer from "./MemberContainer";
import axios from "axios";
import { API_URL } from "../../config";

export default function Reservation() {
  const [rentItem, setRentItem] = useState([]); // rentItem 초기값을 빈 배열로 설정

  useEffect(() => {
    const token = localStorage.getItem("Token");

    axios
      .get(`${API_URL}/item-rent/book-list`, {
        headers: {
          "Accept": "*/*",
          "Authorization": `${token}`,
        },
      })
      .then((response) => {
        setRentItem(response.data);
      })
      .catch((error) => console.log("Error fetching user data:", error));
  }, []);

  const [currentReservationIndex, setCurrentReservationIndex] = useState(0);

  const handleNext = () => {
    setCurrentReservationIndex((prev) =>
      prev < rentItem.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentReservationIndex((prev) =>
      prev > 0 ? prev - 1 : rentItem.length - 1
    );
  };

  return (
    <div className="relative w-full min-h-screen">
      <RibbonBackground />
      <div>
        <div className="flex flex-col items-center text-[#996515] h-screen">
          <div className="text-[50px] mt-7">MY PAGE</div>

          <MemberContainer />

          {/* 예약 현황 컨테이너 */}
          <div className="flex flex-col items-center w-full">
            <div className="text-[35px] mt-7">예약 현황</div>
            <div className="relative flex justify-center items-center w-[85%] h-[22rem] px-10 font-Moneygraphy text-[17px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[13px] mt-7">
              {rentItem && rentItem.length > 0 ? (
                <div className="flex flex-col items-center">
                  {/* 예약된 물품 정보 */}
                  <div className="flex flex-col items-center py-5 text-center">
                    <img
                      src={rentItem[currentReservationIndex].image}
                      alt={rentItem[currentReservationIndex].itemName}
                      className="w-[90px] h-[90px] object-cover mb-4"
                    />
                    <div className="mb-2">
                      {rentItem[currentReservationIndex].itemName}
                    </div>
                    <div>
                      <span className="font-bold text-[#FF7009]">
                        {new Date(rentItem[currentReservationIndex].needReceiveTime).toLocaleDateString()}
                      </span>
                      {""}까지 <br /> 동아리연합회실로 방문해주세요.
                    </div>
                  </div>

                  {/* 예약 취소 버튼 */}
                  <div className="flex justify-center w-fit px-5 py-1 rounded-[20px] mb-3 text-[13px] text-[#583D2C] bg-[#D2B48C]">
                    예약 취소
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
                      {currentReservationIndex + 1}/{rentItem.length}
                    </span>
                    <button
                      onClick={handleNext}
                      className="hover:text-[#FF7009]"
                    >
                      <img src={images.right} alt="right" />
                    </button>
                  </div>
                </div>
              ) : (
                <div>예약 중인 물품이 없습니다.</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
