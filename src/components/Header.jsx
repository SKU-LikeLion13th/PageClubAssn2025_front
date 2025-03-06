import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { images } from "../utils/images";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="z-10 flex items-center justify-between w-full px-4 pt-8">
      {/* 헤더 */}
      <div className="flex items-center justify-between w-full max-w-4xl px-2">
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
