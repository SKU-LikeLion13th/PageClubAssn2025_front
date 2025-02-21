import React, { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import axios from "axios";

const ReserveStatus = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  //내용 받아오기
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");

      try {
        const result = await axios.get(`${API_URL}/admin/item-rent/book-list`, {
          headers: { Authorization: token },
        });

        const items = result.data.map((item) => {
          // 년/월/일 형식으로 bookTime 변환
          let bookDate = new Date(item.bookTime);

          if (isNaN(bookDate)) {
            bookDate = new Date(item.bookTime.replace(" ", "T")); // 공백 수정
          }

          if (isNaN(bookDate)) {
            console.error("Invalid date format:", item.bookTime);
            return { ...item, bookTime: "잘못된 날짜" };
          }

          const formattedBookTime = bookDate.toLocaleDateString("ko-KR");
          return { ...item, bookTime: formattedBookTime };
        });

        setData(items);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.error("권한 없음. 관리자 토큰을 확인해주세요.");
        } else {
          console.error(err);
        }
        setError(err);
      }
    };

    fetchData();
  }, []);

  // 수령 확인
  const handleReceiveClick = async (itemRentId) => {
    const token = localStorage.getItem("Token");
    try {
      const body = { itemRentId };
      const response = await axios.post(`${API_URL}/admin/item-rent`, body,
        {
          headers: { Authorization: token }
        }
      )
      if (response.status === 200) {
        alert("수령완료 처리되었습니다.");
        setData((prevData) => prevData.filter((item) => item.itemRentId !== itemRentId));
      }
    } catch (error) {
      console.error("수령 처리 실패", error);
      alert("수령 처리에 실패하였습니다.");

      if (error.response) {
        const statusCode = error.response.status;
        //console.log(statusCode)
      }
    }
  };
  //예약 취소 
  const handleCancelClick = async (itemRentId) => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.delete(`${API_URL}/admin/item-rent`,
        {
          headers: { Authorization: token },
          data : {itemRentId}
        }
      )
      if (response.status === 200) {
        alert("예약 취소 처리되었습니다.");
        setData((prevData) => prevData.filter((item) => item.itemRentId !== itemRentId));
      }
    } catch (error) {
      console.error("예약취소 처리 실패", error);
      alert("예약취소 처리에 실패하였습니다.");

      if (error.response) {
        const statusCode = error.response.status;
        //console.log(statusCode)
      }
    }
  };

  const hasData = data !== null && data.length > 0;

  return (
    <div>
      <div className="min-h-screen font-Y_spotlight">
        <div className="mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b-2 border-[#12172B]">
          <div className="flex w-full justify-center text-2xl">물품 예약 현황</div>
        </div>

        <div className="mt-4 mx-1">
          {error ? (
            <p className="text-gray-400 mx-auto w-10/12">
              에러가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
          ) : data === null ? (
            <p className="text-gray-400 mx-auto w-10/12">데이터를 불러오는 중입니다...</p>
          ) : hasData ? (
            data.map((result) => (
              <div key={result.itemRentId} className="w-10/12 mx-auto border-b border-[#000000]">
                <div className="my-4 flex flex-col justify-between px-1 text-sm">
                  <div className="font-PretendardVariable">
                    <p>이름 : {result.name}</p>
                    <p>학번 : {result.studentId}</p>
                    <p>동아리 : {result.iconClub}</p>
                    <p>대여 물품 : {result.itemName}</p>
                    <p>수량 : {result.count}</p>
                    <p>예약일 : {result.bookTime}</p>
                  </div>
                  <div className="flex items-end justify-end text-xs mt-3">
                    <button
                      className="bg-[#D1D1D3] text-[#3F3F3F] p-1 px-3 rounded-lg"
                      onClick={() => handleReceiveClick(result.itemRentId)}
                    >
                      수령 확인
                    </button>
                    <button className="bg-[#D1D1D3] text-[#3F3F3F] p-1 px-3 rounded-lg ml-1"
                    onClick={() => handleCancelClick(result.itemRentId)}>
                      예약 취소
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 mx-auto w-10/12 font-PretendardVariable">
              예약 내역이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReserveStatus;
