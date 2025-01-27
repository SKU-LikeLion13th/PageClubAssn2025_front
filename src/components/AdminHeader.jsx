import { NavLink, useNavigate } from "react-router-dom";
import { images } from "../utils/images";

export default function Header() {
  const navigate = useNavigate();

  // 이전 페이지로 이동
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* 헤더 */}
      <div className="flex items-center justify-between w-full max-w-4xl px-2">
        <NavLink to="/admin/">
          <img
            src={images.adHome}
            alt="홈 아이콘"
            className="w-[19px] h-[22px]"
          />
        </NavLink>
        <button onClick={goBack}>
          <img
            src={images.adBack}
            alt="뒤로 가기 아이콘"
            className="w-[10px] h-[20px]"
          />
        </button>
      </div>
    </div>
  );
}
