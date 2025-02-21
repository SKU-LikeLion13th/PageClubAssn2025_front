import React, { useEffect, useState } from "react";
import MemberContainer from "./MemberContainer";
import axios from "axios";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { images } from '../../../utils/images';
import { API_URL } from "../../../config";

export default function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [currentReservationIndex, setCurrentReservationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const decodeBase64Image = (base64String) => {
    try {
      if (!base64String.startsWith('data:image')) {
        base64String = `data:image/jpeg;base64,${base64String}`;
      }
      return base64String;
    } catch (error) {
      console.error("이미지 디코딩 중 오류:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("Token");
  
    axios
      .get(`${API_URL}/item-rent/book-list`, {
        headers: {
          "Authorization": `${token}`,
        },
      })
      .then((response) => {
        const processedItems = response.data.map(item => ({
          ...item,
          image: item.image ? decodeBase64Image(item.image) : null
        }));
  
        setReservations(processedItems);
      })
      .catch(
        //(error) => console.log("사용자 데이터 가져오기 오류:", error)
    )
      .finally(() => setIsLoading(false));
  }, []);

  const handleNext = () => {
    setCurrentReservationIndex((prev) =>
      prev < reservations.length - 1 ? prev + 1 : 0
    );
  };

  const handlePrev = () => {
    setCurrentReservationIndex((prev) =>
      prev > 0 ? prev - 1 : reservations.length - 1
    );
  };

  const handleCancelReservation = () => {
    const token = localStorage.getItem("Token");
    const itemRentId = reservations[currentReservationIndex].itemRentId;
  
    axios
      .delete(
        `${API_URL}/item-rent`, 
        {
          headers: {
            "Authorization": `${token}`,
            "Content-Type": "application/json",
          },
          data: { itemRentId },
        }
      )
      .then((response) => {
        //console.log("예약 취소 성공:", response.data);
        const updatedItems = reservations.filter((item, index) => index !== currentReservationIndex);
        setReservations(updatedItems);
      })
      .catch((error) => {
        console.error("예약 취소 실패:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="relative w-full">
        <div className="absolute flex items-center justify-center w-full h-full">
          <img src={images.ribbon} className="w-full " alt="ribbon" />
        </div>
        <div className="w-11/12 min-h-[calc(100vh-100px)] mx-auto relative z-20">
          <div className="flex flex-col items-center text-[#996515]">
            <div className="flex justify-center text-[50px] mt-7">MY PAGE</div>
            <MemberContainer />

            <div className="flex flex-col items-center w-full h-full">
              <div className="text-[35px] mt-7">예약 현황</div>
              <div className="relative flex justify-center items-center w-[85%] h-[22rem] px-10 font-Moneygraphy text-[17px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[13px] mt-7">
                {isLoading ? (
                  <Loading />
                ) : reservations && reservations.length > 0 ? (
                  <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center text-center py-7">
                      <img
                        src={reservations[currentReservationIndex].image}
                        alt={reservations[currentReservationIndex].itemName}
                        className="w-[80px] h-[80px] object-cover mb-5"
                      />
                      <div className="mb-2">
                        {reservations[currentReservationIndex].itemName}
                      </div>
                      <div>
                        <span className="font-bold text-[#FF7009]">
                          {new Date(reservations[currentReservationIndex].needReceiveTime).toLocaleDateString()}
                        </span>
                        {""}까지 <br /> 동아리연합회실로 방문해주세요.
                      </div>
                    </div>
                    <div
                      onClick={handleCancelReservation}
                      className="flex justify-center w-fit px-5 py-1 rounded-[20px] text-[13px] text-[#583D2C] bg-[#D2B48C] cursor-pointer"
                    >
                      예약 취소
                    </div>
                    <div className="flex items-center mt-4 text-[#996515] text-[16px] space-x-4">
                      <button
                        onClick={handlePrev}
                        className="hover:text-[#FF7009]"
                      >
                        <img src={images.left} alt="left" />
                      </button>
                      <span className="text-[11px]">
                        {currentReservationIndex + 1}/{reservations.length}
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
    </>
  );
}
