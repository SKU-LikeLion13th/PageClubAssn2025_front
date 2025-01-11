import React from "react";
import Item from "./Item";

const RentalItems = () => {
  return (
    <div className="relative min-h-screen w-full text-[#996515]">
      <div className="flex flex-col justify-center items-center">
        <div className="title mt-12 mb-9 px-12 py-1 bg-white rounded-3xl border-2 border-[#D2B48C]">
          <p className="text-xl">대여 물품 LIST</p>
        </div>
        <div className="itemslist font-Moneygraphy w-[90%]">
          <Item/>
        </div>
      </div> 
    </div>
  );
};

export default RentalItems;
