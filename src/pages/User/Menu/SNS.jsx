import { NavLink } from "react-router-dom";
import Header from "../../../components/Header";
import PageBack from "../../../components/PageBack";
import { images } from "../../../utils/images";

export default function SNS() {
  const insta = "https://www.instagram.com/sku_dongari41/";
  const naverCafe = "https://cafe.naver.com/0skudongari";
  const kakao = "http://pf.kakao.com/_hKYxixl";

  return (
    <div className="">
      <Header />
      <PageBack />
      <div className="flex flex-col items-center text-center min-h-screen py-8">
        {/* 메인 콘텐츠 */}
        <div className="relative z-10 flex flex-col items-center flex-grow w-full mt-5">
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
            <div
              onClick={() => {
                window.open(insta);
              }}
              className="flex w-[18rem] h-[5rem] items-center justify-between border border-[#D2B48C] rounded-[10px] mt-6 px-4 bg-white"
            >
              <img src={images.insta} alt="" />
              <div className="pr-8 font-Moneygraphy font-normal text-[15px] text-[#996515]">
                <p>인스타그램</p>
                <p>@sku_dongari41</p>
              </div>
            </div>
            <div
              onClick={() => {
                window.open(naverCafe);
              }}
              className="flex w-[18rem] h-[5rem] items-center justify-between border border-[#D2B48C] rounded-[10px] mt-6 px-4 bg-white"
            >
              <img src={images.naver} alt="" />
              <div className="pr-4 font-Moneygraphy font-normal text-[15px] text-[#996515]">
                <p>네이버카페</p>
                <p>'성결대학교 동아리연합회'</p>
              </div>
            </div>
            <div
              onClick={() => {
                window.open(kakao);
              }}
              className="flex w-[18rem] h-[5rem] items-center justify-between border border-[#D2B48C] rounded-[10px] mt-6 px-4 bg-white"
            >
              <img src={images.kakao} alt="" />
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
