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
            className="max-w-[500px]:absolute max-w-[500px]:left-0 mt-[10%]"
            src="/assets/images/MenuBook.png"
            alt="책 배경 이미지"
          />
          <NavLink to="/Introduction">
            <button className="absolute w-[200px] h-12 border-2 top-[25%] max-w-[500px]:left-[45%] transform -translate-x-[34%] z-10"></button>
          </NavLink>
          <NavLink to="/SNS">
            <button className="absolute w-36 h-[47px] border-2 top-[38%] max-w-[500px]:left-[50%] transform -translate-x-[40%] z-10"></button>
          </NavLink>
          <NavLink to="/AboutUs">
            <button className="absolute w-[140px] h-[47px] border-2 top-[50%] max-w-[500px]:left-[30%] transform -translate-x-[30%] z-10"></button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
