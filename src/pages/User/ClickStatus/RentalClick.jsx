import React, { useState, useEffect } from "react";
import axios from "axios";
import RibbonBackground from "../../../components/RibbonBackground";
import MemberContainer from "./MemberContainer";
import Header from "../../../components/Header";
import Loading from "../../../components/Loading";
import { images } from '../../../utils/images';
import { API_URL } from '../../../config';

export default function RentalClick() {
  const [rentItems, setRentItems] = useState([]);
  const [currentReservationIndex, setCurrentReservationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const decodeBase64Image = (base64String) => {
    if (!base64String?.startsWith('data:image')) {
      return `data:image/jpeg;base64,${base64String}`;
    }
    return base64String;
  };

useEffect(() => {
  const token = localStorage.getItem("Token");

  if (!token) {
    console.error("토큰이 없습니다.");
    return;
  }

  axios
    .get(`${API_URL}/item-rent/rent-list`, {
      headers: { "Authorization": token },
    })
    .then((response) => {
      const processedItems = response.data.map(item => ({
        ...item,
        image: item.image ? decodeBase64Image(item.image) : null
      }));

      setRentItems(processedItems);
    })
    .catch((error) => console.error("사용자 데이터 가져오기 오류:", error))
    .finally(() => setIsLoading(false));
}, []);

  const isOverdue = (item) => {
    if (!item?.needReturnTime) return false;
    const returnDate = new Date(item.needReturnTime);
    const today = new Date();
    return returnDate < today;
  };
  

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };  

  const DateInfo = ({ rentItem }) => (
    rentItem ? (
      isOverdue(rentItem) ? (
        <div className="font-bold text-center">
          <div><span className="text-[#FF7009]">연체</span>되었습니다.</div>
          빠른 시일 내에 동아리연합회실로 반납해주세요.
        </div>
      ) : (
        <div>
          대여일 : {formatDate(rentItem.rentTime)} <br />
          반납일 : {formatDate(rentItem.needReturnTime)}
        </div>
      )
    ) : null
  );

  const handleNavigation = (direction) => {
    setCurrentReservationIndex((prev) => 
      direction === "next" 
        ? (prev < rentItems.length - 1 ? prev + 1 : 0)
        : (prev > 0 ? prev - 1 : rentItems.length - 1)
    );
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-[40px] text-[#996515]">
  //       <Loading />
  //     </div>
  //   );
  // }

  return (
    <>
      <Header />
      <div className="relative w-full min-h-[calc(100vh-100px)]">
        <RibbonBackground />
        <div className="w-11/12 mx-auto text-[#996515] flex flex-col items-center">
          <h1 className="text-[50px] mt-7">MY PAGE</h1>
          <MemberContainer />
          <div className="flex flex-col items-center w-full">
            <h2 className="text-[35px] mt-7">대여 현황</h2>
            <div className="relative font-Moneygraphy flex justify-center items-center w-[85%] h-[22rem] px-10 text-[15px] bg-white border border-[#D2B48C] rounded-[13px] mt-7">
              {isLoading ? (
                <Loading />
              ) : rentItems.length > 0 ? (
                <div className='flex flex-col items-center'>
                  <div className="flex flex-col items-center py-5 text-center">
                    {rentItems[currentReservationIndex] && (
                      <>
                        <img
                          src={rentItems[currentReservationIndex].image}
                          alt={rentItems[currentReservationIndex].itemName}
                          className="w-[90px] h-[90px] object-cover mb-4"
                        />
                        <div className='w-full mb-5'>{rentItems[currentReservationIndex].itemName}</div>
                        <DateInfo rentItem={rentItems[currentReservationIndex]} />
                      </>
                    )}
                  </div>
                  <div className="flex items-center mt-5 mb-3 text-[#996515] text-[15px] space-x-4">
                    <button onClick={() => handleNavigation("prev")} className="hover:text-[#FF7009]">
                      <img src={images.left} alt="left" />
                    </button>
                    <span className='text-[10px]'>{currentReservationIndex + 1}/{rentItems.length}</span>
                    <button onClick={() => handleNavigation("next")} className="hover:text-[#FF7009]">
                      <img src={images.right} alt="right" />
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
    </>
  );
}
