import React from "react";
import { useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <div className="flex justify-center font-Ownglyph_ryurue text-[15px] pt-8 pb-4 bg-transparent text-[#d2b48c]">
      제41대 함께 채워나갈 우리의 이야기, Page 동아리연합회
    </div>
  );
}
