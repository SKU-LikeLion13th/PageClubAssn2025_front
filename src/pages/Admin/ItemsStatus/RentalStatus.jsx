import React, { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import axios from "axios";

const RentalStatus = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");

      try {
        const result = await axios.get(`${API_URL}/admin/item-rent/rent-list`, {
          headers: { Authorization: token },
        });
        const items = result.data.map((item) => {
          //날짜 변환
          let rentDate = new Date(item.rentTime);
          let returnDeadLine = new Date(item.returnDeadLine);
          const formattedRentTime = rentDate.toLocaleDateString("ko-KR");
          const formattedReturnDeadLine = returnDeadLine.toLocaleDateString("ko-KR");
          //연체 여부
          const status = item.NO_DELAY ? "연체" : "연체 아님";
  
          return { ...item, rentTime: formattedRentTime, returnDeadLine: formattedReturnDeadLine, status };
        });
        setData(items);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.error("권한 없음. 관리자 토큰을 확인해주세요.");
        } else {
          if(err.response){
            console.error(err);
          }
        }
        setError(err);
      }
    };

    fetchData();
  }, []);

  const hasData = data !== null && data.length > 0;

  const handleReturn = async (itemRentId) => {
    const token = localStorage.getItem("Token");
    try {
      const response = await axios.post(`${API_URL}/admin/item-rent`, { itemRentId }, {
        headers: { Authorization: token },
      });
      if (response.status === 200){
        alert("반납 처리에 성공하였습니다.")
        setData((prevData) => prevData.filter((item) => item.itemRentId !== itemRentId));
      }
    } catch (err) {
      console.error("반납 처리 실패", err);
      if (err.response) {
        const statusCode = err.response.status;
        if (statusCode === 401) {
          localStorage.clear();
        }
      }
      alert("반납 처리에 실패했습니다.");
    }
  };
  

  return (
    <div>
      <div className="min-h-screen font-Y_spotlight">
        <div className="mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b-2 border-[#12172B]">
          <div className="flex w-full justify-center text-2xl">
            물품 대여 현황
          </div>
        </div>
        {/* <div className='bg-gray-500 w-full h-[2px] rounded-xl' /> */}
        <div className="mt-4 mx-1">
          {error ? (
            <p className="text-gray-400 mx-auto w-10/12">
              에러가 발생했습니다. 잠시 후 다시 시도해주세요.
            </p>
          ) : data === null ? (
            <p className="text-gray-400 mx-auto w-10/12">
              데이터를 불러오는 중입니다...
            </p>
          ) : hasData ? (
            data.map((result) => (
              <div className="w-10/12 mx-auto border-b border-[#000000] ">
                <div
                  key={result.itemRentId}
                  className="my-4 flex flex-col justify-between px-1 text-sm "
                >
                  <div className="font-PretendardVariable">
                    <p>이름 : {result.name}</p>
                    <p>학번 : {result.studentId}</p>
                    <p>동아리 : {result.iconClub}</p>
                    <p>대여 물품 : {result.itemName}</p>
                    <p>수량 : {result.count}</p>
                    <p>대여일 : {result.rentTime}</p>
                    <p>반납일 : {result.returnDeadLine}</p>
                    <p>연체 현황 : {result.status}</p>
                  </div>
                  <div className="flex items-end justify-end text-xs mt-3">
                    <button className="bg-[#D1D1D3] text-[#3F3F3F] p-1 px-3 rounded-lg" onClick={() => handleReturn(result.itemRentId)}>
                      반납 완료
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 mx-auto w-10/12">
              대여 내역이 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RentalStatus;
