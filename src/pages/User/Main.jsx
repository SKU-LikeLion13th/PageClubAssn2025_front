import { NavLink } from "react-router-dom";
import { images } from "../../utils/images";
import "../../css/Main.css";
import MainHeader from "../../components/MainHeader";
import { DiJava } from "react-icons/di";

export default function Main() {
  return (
    <div className="flex flex-col items-center min-h-screen py-8 text-center">
      <MainHeader />
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full mt-5">
        {" "}
        {/* 페이지로고 */}
        <NavLink to="/" className="flex justify-center">
          <img src={images.page} alt="" className="w-[260px]" />
        </NavLink>
        <div className="max-w-[500px]:w-full relative">
          {/* 책 배경 이미지 */}
          <img
            className="max-w-[500px]:absolute max-w-[500px]:left-0 mt-[13%] w-[78%]"
            src="/assets/images/MainBook.png"
            alt="책 배경 이미지"
          />

          <NavLink to="/rentalitems">
            <button className="absolute w-[35%] h-[8.5%] top-[20%] max-w-[500px]:left-[30%] transform -translate-x-[65%] z-10 ">
              <div className="text-[160%] pr-5 text-[#3f3f3f] flex justify-center items-center">
                대여사업
              </div>
            </button>
          </NavLink>
          <NavLink to="/member-card">
            <button className="absolute w-[35%] h-[8.5%] top-[33%] max-w-[500px]:left-[30%] transform -translate-x-[57%] z-10 ">
              <div className="text-[160%] pr-5 text-[#3f3f3f] flex justify-center items-center">
                동아리원증
              </div>
            </button>
          </NavLink>
          <NavLink to="/excellentclub">
            <button className="absolute w-[42%] h-[8.5%] top-[46%] max-w-[500px]:left-[30%] transform -translate-x-[37%] z-10 ">
              <div className="text-[150%] pr-5 text-[#3f3f3f] flex justify-center items-center">
                활동 점수 Top3
              </div>
            </button>
          </NavLink>
          <NavLink to="/classSchedule">
            <button className="absolute w-[35%] h-[8.5%] top-[58.5%] max-w-[500px]:left-[30%] transform -translate-x-[37%] z-10 ">
              <div className="text-[160%] pr-5 text-[#3f3f3f] flex justify-center items-center">
                빈 강의실
              </div>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
