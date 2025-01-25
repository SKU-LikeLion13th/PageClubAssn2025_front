import React from "react";

export default function LoginFailureModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 w-full h-screen flex justify-center items-center bg-[#000000]/[.35]">
      <div className="w-[80%] text-center">
        <div className="relative h-[130px] bg-[#FFFFFF] font-Moneygraphy text-[#996515] border border-[#D2B48C] rounded-lg flex items-center justify-center">
          <button
            onClick={onClose}
            className="absolute top-1 right-2 text-[#996515] font-bold">
            x
          </button>
          <p>
            동아리원만 이용 가능합니다. <br />
            이름과 학번을 다시 확인해주세요.
          </p>
        </div>
      </div>
    </div>
  );
}
