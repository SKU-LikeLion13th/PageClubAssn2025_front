import { NavLink } from "react-router-dom";
import { images } from "../utils/images";

export default function MainHeader() {
  return (
    <div className="flex items-center justify-between w-full h-8 px-4">
      <div className="flex items-center justify-between w-full max-w-4xl pr-2">
        <NavLink to='/'>
          <img
            className="w-16 h-auto"
            src="/assets/images/PageLogo.png"
            alt="Page 로고"
          />
        </NavLink>
        <nav className="flex items-center gap-4">
          <NavLink to="/mypage" className="">
            <img
              className="object-contain"
              src={images.UserIcon}
              alt="사용자 아이콘"
            />
          </NavLink>
          <NavLink to="/menu" className="">
            <img
              className="object-contain"
              src={images.MenuIcon}
              alt="메뉴 아이콘"
            />
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
