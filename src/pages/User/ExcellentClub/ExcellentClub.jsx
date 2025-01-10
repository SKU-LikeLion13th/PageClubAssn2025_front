import React from "react";
import RibbonBackground from "./RibbonBackground";
import Score from "./Score";
import ScoreList from "./ScoreList";

export default function ExcellentClub() {
  return (
    <div className="min-h-screen">
      {/* 리본 배경 */}
      <RibbonBackground />

      {/* 콘텐츠 */}
      <div className="relative z-10 flex flex-col items-center font-Ownglyph_PDH text-[#996516]">
        {/* TOP3 점수 */}
        <Score />

        {/* 순위 목록 */}
        <ScoreList />
      </div>
    </div>
  );
}
