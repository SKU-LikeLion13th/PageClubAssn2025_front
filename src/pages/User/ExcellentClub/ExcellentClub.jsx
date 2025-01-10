import React from "react";
import RibbonBackground from "./RibbonBackground";
import Score from "./Score";
import ScoreList from "./ScoreList";

export default function ExcellentClub() {
  return (
    <div className="relative font-Ownglyph_PDH text-[#996516]">
      {/* 리본 배경 */}
      <RibbonBackground />

      {/* 콘텐츠 */}
      <div className="flex flex-col items-center">
        {/* TOP3 점수 */}
        <Score />

        {/* 순위 목록 */}
        <ScoreList />
      </div>
    </div>
  );
}
