import { NavLink } from "react-router-dom";

import MainHeader from "../../components/MainHeader";

export default function Main() {
  return (
    <div className="flex flex-col items-center text-center bg-[#FAF4EF] min-h-screen py-8">
      <MainHeader />
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col w-full mt-5">
        {" "}
        {/* 페이지로고 */}
        <div className="flex justify-center">
          <img src="/assets/images/PAGE.png" alt="" className="w-[260px]" />
        </div>
        <div className="max-w-[500px]:w-full relative">
          {/* 책 배경 이미지 */}
          <img
            className="max-w-[500px]:absolute max-w-[500px]:left-0 mt-[13%]"
            src="/assets/images/MainBook.png"
            alt="책 배경 이미지"
          />
          <NavLink to="/rentalitems">
            {/* absolute w-[200px] h-12 border-2 top-[30%] max-w-[500px]:left-[45%] transform -translate-x-[34%] z-10 */}
            <button className="absolute w-[130px] h-12 border-2 top-[20%] max-w-[500px]:left-[30%] transform -translate-x-[65%] z-10"></button>
          </NavLink>
          <NavLink to="/">
            <button className="absolute w-[130px] h-12 border-2 top-[33%] max-w-[500px]:left-[30%] transform -translate-x-[57%] z-10"></button>
          </NavLink>
          <NavLink to="/excellentClub">
            <button className="absolute w-[170px] h-12 border-2 top-[46%] max-w-[500px]:left-[30%] transform -translate-x-[37%] z-10"></button>
          </NavLink>
          <NavLink to="/classSchedule">
            <button className="absolute w-[140px] h-12 border-2 top-[58.5%] max-w-[500px]:left-[30%] transform -translate-x-[37%] z-10"></button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
