import React from "react";
import { images } from "../../../utils/images.jsx";
import RentalNoteHeader from "./RentalNoteHeader.jsx";

const RentalNote = ({ itemId, closeModal, nextStep }) => {
  console.log(itemId);
  return (
    <div className="min-h-screen w-full">
      <div className="pt-8">
        <RentalNoteHeader closeModal={closeModal} />
      </div>
      <div className="mt-[10%] flex items-center justify-center text-center">
        <div>
          <div className="title text-xl leading-none text-[#996515] bg-white mx-5 py-5 rounded-xl border-[1px] border-[#D2B48C]">
            물품 대여 시,
            <br />
            유의사항 안내드립니다.
          </div>
          <div className="pt-8 font-Moneygraphy text-xs">
            <div className="part1 pb-3">
              <p>
                <span className="px-5 py-1 rounded-2xl bg-white border-[1px] border-[#D2B48C] text-[#996515]">
                  이용 대상
                </span>
              </p>
              <p className="mt-3">
                대여 서비스는 <span className="text-[#FF7009]">동아리원</span>만
                이용 가능합니다.
              </p>
            </div>
            <img src={images.rentalline} className="my-2" />
            <div className="part2 py-3">
              <p>
                <span className="px-5 py-1 rounded-2xl bg-white border-[1px] border-[#D2B48C] text-[#996515]">
                  대여 및 반납
                </span>
              </p>
              <p className="my-4 leading-6">
                대여 기간은 <span className="text-[#FF7009]">7일</span> 입니다.{" "}
                <br />
                대여 물품은{" "}
                <span className="text-[#FF7009]">
                  1인당 최대 3가지 종류, 최대 5개
                </span>
                까지 가능합니다.
                <br />
                대여 및 반납은 동아리연합회{" "}
                <span className="text-[#FF7009]">지킴이 시간</span>에만
                가능합니다. <br />
              </p>
              <div className="bg-white rounded-xl py-2 border-[1px] border-[#D2B48C]">
                <p>동아리연합회 지킴이 시간</p>
                <p className="py-3">
                  월요일 - 목요일 : 10:00 - 17:30
                  <br />
                  금요일 : 10:00 - 15:00
                </p>
                <p className="text-[#FF7009] text-[10px]">*주말/공휴일 제외</p>
              </div>
            </div>
            <img src={images.rentalline} className="my-2" />
            <div className="part3 py-3">
              <p>
                <span className="px-5 py-1 rounded-2xl bg-white border-[1px] border-[#D2B48C] text-[#996515]">
                  유의사항
                </span>
              </p>
              <p className="pt-5 leading-6">
                예약 시간 안에 <span className="text-[#FF7009]">미대여</span> 시
                예약은 <span className="text-[#FF7009]">취소</span>됩니다.{" "}
                <br />
                <span className="text-[#FF7009]">
                  반납 3회 지연 및 미반납 1회
                </span>{" "}
                시 대여 서비스가 <span className="text-[#FF7009]">제한</span>
                됩니다.
              </p>
              <button
                className="mt-10 px-5 py-1 rounded-lg bg-white border-[1px] border-[#D2B48C] text-[#996515]"
                onClick={nextStep}
              >
                위 내용을 확인했습니다.
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentalNote;
