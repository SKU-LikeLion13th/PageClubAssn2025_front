import React from "react";
import { Link } from "react-router-dom";
import { images } from "../../../utils/images";
import RentalNote from "./RentalNote";

const Item = () => {
  // 임시 데이터
  const items = [
    {
      id: 1,
      name: "기도방석",
      total: 5,
      rented: 2,
      waiting: 1,
      available: 2,
    },
    {
      id: 2,
      name: "간이 탁구 네트",
      total: 10,
      rented: 6,
      waiting: 2,
      available: 2,
    },
    {
      id: 3,
      name: "경식 야구공",
      total: 8,
      rented: 4,
      waiting: 1,
      available: 3,
    },
  ];

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white w-full rounded-xl h-[150px] px-5 py-4 border-[2px] border-[#D2B48C] mb-4"
        >
          <div className="item flex justify-start text-xs h-full">
            <div className="img-status flex flex-col h-full justify-between items-center w-[37%]">
              <img src={images.cushion} className="w-full" alt="이미지" />
              <p className="rounded-xl px-[9px] py-1 bg-[#FFCB99]">대여 가능</p>
            </div>
            <div className="itemcontent pl-4 w-full">
              <div className="itemname flex justify-between items-center mb-1">
                <p className="text-xl">{item.name}</p>
                <Link to="/rentalnote">
                  <button className="rounded-xl px-4 h-5 bg-[#D2B48C] text-[#583D2C]">
                    예약하기
                  </button>
                </Link>
              </div>
              <img src={images.line} className="pb-2 pt-1" />
              <div className="grid grid-cols-2 text-center gap-5 mt-2">
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  총 개수 : {item.total}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  대여 중 : {item.rented}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  예약 대기 : {item.waiting}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  대여 가능 : {item.available}개
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Item;
