import { NavLink } from "react-router-dom";
import Header from "../../../components/Header";

export default function Menu() {
  return (
    <div className="flex flex-col items-center min-h-screen text-center">
      <Header />
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full mt-5">
        {/* 페이지로고 */}
        <div className="text-[#996515] font-normal text-[65px]">MENU</div>
        <div className="max-w-[500px]:w-full relative mb-5">
          {/* 책 배경 이미지 */}
          <img
            className="max-w-[500px]:absolute max-w-[500px]:left-0 mt-[10%] w-[78%]"
            src="/assets/images/MenuBook.png"
            alt="책 배경 이미지"
          />
          <NavLink to="/Introduction">
            <button className="absolute w-[180px] h-[42px] top-[25.5%] max-w-[500px]:left-[45%] transform -translate-x-[40%] z-10 ">
              <div className="text-[150%] pr-9 text-[#3f3f3f] flex justify-center items-center">
                동아리연합회 소개
              </div>
            </button>
          </NavLink>
          <NavLink to="/SNS">
            <button className="absolute w-32 h-[40px] top-[38.5%] max-w-[500px]:left-[50%] transform -translate-x-[48%] z-10 ">
              <div className="text-[150%] pr-8 text-[#3f3f3f] flex justify-center items-center">
                SNS
              </div>
            </button>
          </NavLink>
          <NavLink to="/AboutUs">
            <button className="absolute w-[140px] h-[40px] top-[51%] max-w-[500px]:left-[30%] transform -translate-x-[36%] z-10 ">
              <div className="text-[150%] pr-12 text-[#3f3f3f] flex justify-center items-center">
                만든이들
              </div>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
