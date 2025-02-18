import { NavLink, useNavigate } from "react-router-dom";
import { images } from "../utils/images";

export default function Header() {
  const navigate = useNavigate();

  // 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex justify-between items-center w-full px-4 pt-8 z-10">
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full max-w-4xl px-2">
        <NavLink to="/">
          <img
            src={images.Home}
            alt="홈 아이콘"
            className="w-[19px] h-[22px]"
          />
        </NavLink>
        <button onClick={goBack}>
          <img
            src={images.Back}
            alt="뒤로 가기 아이콘"
            className="w-[10px] h-[20px]"
          />
        </button>
      </div>
    </div>
  );
}
