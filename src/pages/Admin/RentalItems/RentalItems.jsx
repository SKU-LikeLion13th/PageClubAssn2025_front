import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function RentalItems() {
  const [items, setItems] = useState([
    { id: 1, name: "콘셉트", total: "*" },
    { id: 2, name: "기도방석", total: "10개" },
    { id: 3, name: "네트", total: "2개" },
    { id: 4, name: "농구공", total: "7개" },
    { id: 5, name: "배구공", total: "2개" },
    { id: 6, name: "축구공", total: "2개" },
    { id: 7, name: "셔틀콕", total: "14개" },
  ]);

  const handleUpdateItem = (updatedItem) => {
    setItems((prevItems) =>
      prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="px-4 font-Y_spotlight">
      <div className="flex flex-col items-center mt-6">
        <p className="text-[2rem]">대여 물품 관리</p>
        <NavLink to="/admin/AddRentalItem" className="ml-auto">
          <button className="w-[2.5rem] h-[1rem] bg-[#D1D1D3] text-[7px] rounded-[5px]">
            + 추가
          </button>
        </NavLink>
      </div>
      {/* 물품 리스트 */}
      <div className="mt-6 space-y-4 font-PretendardVariable">
        {items.map((item) => (
          <div key={item.id} className="relative">
            <div className="border-[1.5px] border-[#D1D1D3]" />
            {/* 수정 버튼 */}
            <NavLink to={`/admin/EditRentalItem/${item.id}`}>
              <div className="absolute top-0 right-0 pt-2 pr-3 text-sm text-blue-500 no-underline">
                <div className="flex items-center justify-center">
                  <img
                    src="/assets/images/edit.png"
                    alt=""
                    className="w-[0.5rem] h-[0.5rem]"
                  />
                  <p className="pl-1 text-[#3f3f3f] text-[0.7rem]">수정</p>
                </div>
              </div>
            </NavLink>
            <div className="flex flex-col items-start pt-4 pb-2 pl-3">
              {/* 물품명 */}
              <div className="flex items-center space-x-2">
                <label className="text-sm">물품명</label>
                <input
                  type="text"
                  value={item.name}
                  readOnly
                  className="text-sm text-center bg-transparent border-b border-gray-300 focus:outline-none"
                />
              </div>

              {/* 총 수량 */}
              <div className="flex items-center mt-2 space-x-2">
                <label className="text-sm">총 수량</label>
                <input
                  type="text"
                  value={item.total}
                  readOnly
                  className="text-sm text-center bg-transparent border-b border-gray-300 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="border-[1.5px] border-[#D1D1D3] mt-3" />
    </div>
  );
}
