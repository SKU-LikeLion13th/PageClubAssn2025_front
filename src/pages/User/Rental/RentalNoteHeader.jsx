import { NavLink, useNavigate } from "react-router-dom";
import { images } from "../../../utils/images";

export default function Header({ closeModal }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center w-full px-4">
      {/* 헤더 */}
      <div className="flex justify-between items-center w-full max-w-4xl px-2">
        <NavLink to="/">
          <img
            src="/assets/images/Home.png"
            alt="홈 아이콘"
            className="w-[19px] h-[22px]"
          />
        </NavLink>
        <button onClick={closeModal}>
          <img src={images.outimg} alt="나가기 아이콘" className="w-4" />
        </button>
      </div>
    </div>
  );
}
