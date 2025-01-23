import { NavLink } from "react-router-dom";
import Header from "../../../components/Header";

export default function Menu() {
  return (
    <div className="flex flex-col items-center text-center bg-[#FAF4EF] min-h-screen">
      <Header />
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col mt-5 w-full">
        {/* 페이지로고 */}
        <div className="text-[#996515] font-normal text-[65px]">MENU</div>
        <div className="max-w-[500px]:w-full relative">
          {/* 책 배경 이미지 */}
          <img
            className="max-w-[500px]:absolute max-w-[500px]:left-0 mt-[20%]"
            src="/assets/images/MenuBook.png"
            alt="책 배경 이미지"
          />
          <NavLink to="/Introduction">
            <button className="absolute w-[200px] h-12 border-2 top-[30%] max-w-[500px]:left-[45%] transform -translate-x-[34%] z-10"></button>
          </NavLink>
          <NavLink to="/SNS">
            <button className="absolute w-36 h-[47px] border-2 top-[42%] max-w-[500px]:left-[50%] transform -translate-x-[40%] z-10"></button>
          </NavLink>
          <NavLink to="/AboutUs">
            <button className="absolute w-[140px] h-[47px] border-2 top-[54%] max-w-[500px]:left-[30%] transform -translate-x-[30%] z-10"></button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
