import React from "react";
import { images } from "../../../utils/images";

export const RentalConfirm = ({ itemId, closeModal, nextStep, itemName }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-1/3 bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div className="mt-4 text-center">
            <p>
              <span className="text-[#FF7009]">예약</span>하시겠습니까?
            </p>
            <div className="flex justify-center items-center w-full text-sm mt-2">
              <button
                onClick={nextStep}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                예
              </button>
              <button
                onClick={closeModal}
                className="bg-[#e8d9c5] text-[#a08b78] py-[1px] px-4 rounded-xl ml-1"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RentalSuccess = ({ itemId, closeModal, itemName }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              예약 완료 되었습니다.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RentalLimit = ({ itemId, closeModal, itemName }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              예약 완료 되었습니다.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NoneRental = ({ itemId, closeModal, itemName }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              예약 완료 되었습니다.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RentalOver = ({ itemId, closeModal, itemName }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              예약 완료 되었습니다.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
