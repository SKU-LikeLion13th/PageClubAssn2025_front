import React from "react";
import { images } from "../../../utils/images";

export const RentalConfirm = ({ itemId, closeModal, nextStep, itemName }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg py-10 px-10 bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center">
          <div className="title">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div>
            <p>예약하시겠습니까?</p>
            <div className="flex justify-center items-center w-full">
              <button onClick={nextStep}>예</button>
              <button onClick={closeModal}>아니오</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RentalSuccess = ({ itemId, closeModal, nextStep, itemName }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg py-10 px-10 bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center">
          <div className="title">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div>
            <p>다음챕터입니다.</p>
            <div className="flex justify-center items-center w-full">
              <button>예</button>
              <button>아니오</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

