import React from "react";

export default function ClubDeleteModal({ club, onClose, onConfirm }) {
  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center bg-[#000000A6]">
      <div className="w-[315px] text-center flex justify-center">
        <div className="relative w-[255px] h-[166px] bg-[#FFFFFF] font-PretendardVariable border border-[#3F3F3F] rounded-xl flex flex-col items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-0 right-1 text-[#3F3F3F]">
            x
          </button>
          <div className="text-[10.65px] mb-2">
            <p className="mb-1">동아리명:</p>
            <p>{club?.name}</p>
          </div>

          <p className="text-[15px] font-semibold mb-3">삭제하시겠습니까?</p>

          <div className="font-Y_spotlight text-[7.08px]">
            <button
              onClick={onConfirm}
              className="w-[42px] h-[16.43px] bg-[#D1D1D3] text-[#3F3F3F] rounded-[4.72px] mr-2">
              예
            </button>
            <button
              onClick={onClose}
              className="w-[42px] h-[16.43px] bg-[#D1D1D380] text-[#3F3F3F80] rounded-[4.72px]">
              아니오
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
