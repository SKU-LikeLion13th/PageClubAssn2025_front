import { NavLink } from "react-router-dom";
import Header from "./Header";

export default function Menu() {
  return (
    <div className="flex flex-col items-center text-center bg-[#FAF4EF] min-h-screen px-4 py-8">
      <Header />
      {/* 메인 콘텐츠 */}
      <div className="flex flex-col items-center mt-5 flex-grow">
        {/* 페이지로고 */}
        <div className="text-[#996515] font-normal text-[65px]">MENU</div>
        <div className="w-full">
          {/* 책 배경 이미지 */}
          <img
            className="absolute w-[75%] max-w-[500px] h-auto top-[28%] left-0 "
            src="/assets/images/MenuBook.png"
            alt="책 배경 이미지"
          />
          <NavLink to="/Introduction">
            <button className="absolute w-[180px] h-12 border-2 top-[34%] left-[36%] transform -translate-x-[16%] -translate-y-[-75%]"></button>
          </NavLink>
          <NavLink to="/SNS">
            <button className="absolute w-28 h-[42px] border-2 top-[42%] left-[37%] transform -translate-x-[16%] -translate-y-[-90%]"></button>
          </NavLink>
          <NavLink to="/AboutUs">
            <button className="absolute w-[120px] h-[42px] border-2 top-[50%] left-[40%] transform -translate-x-[16%] -translate-y-[-78%]"></button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
