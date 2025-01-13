import { NavLink, useNavigate } from "react-router-dom";

export default function Main() {
  return (
    <div className="flex flex-col items-center text-center bg-[#FAF4EF] min-h-screen px-4 py-8">
      {/* 헤더 */}
      <header className="flex justify-between items-center w-full max-w-4xl">
        <img
          className="w-16"
          src="/assets/images/PageLogo.png"
          alt="Page 로고"
        />
        <nav className="flex gap-4">
          <button className="w-8 h-8">
            <img src="/assets/images/UserIcon.png" alt="사용자 아이콘" />
          </button>
          <button className="w-8 h-8">
            <img src="assets/images/MenuIcon.png" alt="메뉴 아이콘" />
          </button>
        </nav>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex flex-col items-center mt-5 static">
        {/* 페이지로고 */}
        <img src="/assets/images/PAGE.png" alt="" className="max-w-full" />
        <div className="w-full h-auto">
          {/* 책 배경 이미지 */}
          <img
            className="absolute w-[75%] max-w-[500px] h-auto top-[30%] left-0 "
            src="/assets/images/MainBook.png"
            alt="책 배경 이미지"
          />
          <NavLink to="/">
            <button className="absolute w-32 h-12 border-2 top-1/3 left-1/3 transform -translate-x-[16%] -translate-y-[-75%]"></button>
          </NavLink>
          <NavLink to="/">
            <button className="absolute w-32 h-12 border-2 top-[42.2%] left-[36%] transform -translate-x-[16%] -translate-y-[-75%]"></button>
          </NavLink>
          <NavLink to="/">
            <button className="absolute w-40 h-12 border-2 top-[51%] left-[41%] transform -translate-x-[16%] -translate-y-[-75%]"></button>
          </NavLink>
          <NavLink to="/">
            <button className="absolute w-32 h-12 border-2 top-[59%] left-[41%] transform -translate-x-[9%] -translate-y-[-82%]"></button>
          </NavLink>
        </div>
      </main>
    </div>
  );
}
