import { NavLink } from "react-router-dom";

export default function MainHeader() {
  return (
    <div className="flex justify-between items-center w-full h-8 px-4">
      <div className="flex justify-between items-center w-full max-w-4xl pr-2">
        <img
          className="w-16 h-auto"
          src="/assets/images/PageLogo.png"
          alt="Page 로고"
        />
        <nav className="flex gap-4 items-center">
          {" "}
          {/* items-center를 추가하여 세로 정렬을 맞춤 */}
          <NavLink to="/mypage" className="">
            <img
              className="object-contain"
              src="/assets/images/UserIcon.png"
              alt="사용자 아이콘"
            />
          </NavLink>
          <NavLink to="/menu" className="">
            <img
              className="object-contain"
              src="assets/images/MenuIcon.png"
              alt="메뉴 아이콘"
            />
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
