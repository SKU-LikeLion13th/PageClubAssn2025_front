import React, { useState, useEffect } from "react";

const RentalStatus = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 임시 데이터 설정
    const mockData = [
      // {
      //   itemRentId: 1,
      //   name: "홍길동",
      //   studentId: "20230001",
      //   iconClub: "로봇 동아리",
      //   itemName: "라즈베리파이",
      //   count: 1,
      //   rentTime: "2025-01-20",
      // },
      // {
      //   itemRentId: 2,
      //   name: "김철수",
      //   studentId: "20230002",
      //   iconClub: "코딩 동아리",
      //   itemName: "아두이노 키트",
      //   count: 2,
      //   rentTime: "2025-01-18",
      // },
    ];
    setData(mockData);
  }, []);

  const hasData = data !== null && data.length > 0;

  return (
    <div>
      <div className="min-h-screen font-Y_spotlight">
        <div className="mt-20 flex justify-between items-center w-10/12 mx-auto pt-4 pb-6 border-b-2 border-[#12172B]">
          <div className="flex w-full justify-center text-2xl">물품 예약 현황</div>
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
              <div className="w-10/12 mx-auto border-b border-[#000000]">
                <div
                  key={result.itemRentId}
                  className="my-4 flex flex-col justify-between px-1 text-sm"
                >
                  <div className="font-PretendardVariable">
                    <p>이름 : {result.name}</p>
                    <p>학번 : {result.studentId}</p>
                    <p>동아리 : {result.iconClub}</p>
                    <p>대여 물품 : {result.itemName}</p>
                    <p>수량 : {result.count}</p>
                    <p>예약일 : {result.rentTime}</p>
                  </div>
                  <div className="flex items-end justify-end text-xs mt-3">
                    <button
                      className="bg-[#D1D1D3] text-[#3F3F3F] p-1 px-3 rounded-lg"
                    >
                      수령 확인
                    </button>
                    <button
                      className="bg-[#D1D1D3] text-[#3F3F3F] p-1 px-3 rounded-lg ml-1"
                    >
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

export default RentalStatus;
