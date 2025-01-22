import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <div
      className={`flex justify-center font-Ownglyph_ryurue text-[15px] ${
        isAdminPage
          ? "bg-white text-[#D1D1D3]" // /admin 경로일 때
          : "bg-transparent text-[#d2b48c]" // 기본 경로일 때
      }`}
    >
      제41대 함께 채워나갈 우리의 이야기, Page 동아리연합회
    </div>
  );
}
