import { NavLink } from "react-router-dom";
import Header from "../../../components/Header";
import PageBackground from "../PageBackground";

export default function SNS() {
  return (
    <div className="relative py-8">
      <Header />
      <PageBackground />
      <div className="flex flex-col items-center text-center bg-[#FAF4EF] min-h-screen py-8">
        {/* 메인 콘텐츠 */}
        <div className="flex flex-col items-center mt-5 flex-grow w-full z-10 relative">
          {" "}
          {/* relative 추가 */}
          {/* 페이지로고 */}
          <div className="text-[#996515] font-normal text-[65px]">SNS</div>
          <img
            src="../../assets/images/PageLogo.png"
            alt=""
            className="w-[8rem] mt-12"
          />
          <div className="flex flex-col items-center">
            {" "}
            {/* items-center로 정렬 */}
            <div className="flex w-[18rem] h-[5rem] items-center justify-between border border-[#D2B48C] rounded-[10px] mt-6 px-4 bg-white">
              <img src="../../assets/images/instagram.png" alt="" />
              <div className="pr-8 font-Moneygraphy font-normal text-[15px] text-[#996515]">
                <p>인스타그램</p>
                <p>@sku_dongari41</p>
              </div>
            </div>
            <div className="flex w-[18rem] h-[5rem] items-center justify-between border border-[#D2B48C] rounded-[10px] mt-6 px-4 bg-white">
              <img src="../../assets/images/naver_cafe.png" alt="" />
              <div className="pr-4 font-Moneygraphy font-normal text-[15px] text-[#996515]">
                <p>네이버카페</p>
                <p>'성결대학교 동아리연합회'</p>
              </div>
            </div>
            <div className="flex w-[18rem] h-[5rem] items-center justify-between border border-[#D2B48C] rounded-[10px] mt-6 px-4 bg-white">
              <img src="../../assets/images/kakao.png" alt="" />
              <div className="pr-6 font-Moneygraphy font-normal text-[15px] text-[#996515]">
                <p>카카오채널</p>
                <p>'성결대 동아리연합회'</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
