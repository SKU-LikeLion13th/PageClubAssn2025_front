import React from "react";
import Header from "../../components/Header";
import PageBackground from "../../components/PageBack";

export default function ClubMemberCard() {
  return (
    <>
      <PageBackground />
      <Header />

      <div className="relative z-10 w-full h-[calc(100vh-95px)] flex flex-col items-center">
        {/* 성결대 로고 */}
        <div className="mt-10">
          <img
            src="https://i.namu.wiki/i/KKQ4uvGiknbINplKFU848NUDYuecDZlrh8XlSxbPyPaz5eOXAevvPJPeIaf3qtmUuH78TvfyQoap9WTgynGNbg.svg"
            className="w-24 h-24"
            alt="성결대학교 로고"
          />
        </div>
        {/* 성결대학교 동아리원증 타이틀 */}
        <div className="h-[45.22px] flex justify-center items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-full px-3 my-12">
          <img
            src="assets/images/PageLogo.png"
            alt="page 로고"
            className="h-[36.6px]"
          />
          <p className="text-2xl text-[#996515] pr-3">성결대학교 동아리원증</p>
        </div>
        {/* 동아리원증 */}
        <div className="w-[90%] font-Moneygraphy text-center bg-[#FFFBFB] border border-[#D2B48C] rounded-2xl">
          <div className="min-h-[140px] flex items-center px-3">
            <img
              src="assets/images/likelion.png"
              alt="동아리 로고"
              className=""
            />
            <div className="text-[#996515] flex-1 flex flex-col justify-center items-center">
              <p className="text-lg">성결대 멋쟁이사자처럼 ▼</p>
              <p className="w-[90%] my-3 border-t-[0.1px] border-[#997C6E] flex items-center"></p>
              <p className="text-[25px]">구혜원</p>
            </div>
          </div>

          <div className="font-PretendardVariable min-h-[60px] text-[14px] text-[#583D2C] bg-[#D2B48C] rounded-b-xl flex justify-center items-center">
            <p>
              위 동아리원증은
              <br />
              성결대학교 동아리원임을 증명합니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
