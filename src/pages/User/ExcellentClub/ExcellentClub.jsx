import React from "react";
import RibbonBackground from "./RibbonBackground";
import Score from "./Score";
import ScoreList from "./ScoreList";

export default function ExcellentClub() {
  return (
    <div className="relative min-h-screen w-full">
      <RibbonBackground />

        {/* 콘텐츠 */}
        <div className="flex flex-col items-center h-full z-10">
          {/* TOP3 점수 */}
          <Score />

          {/* 순위 목록 */}
          <ScoreList />
      </div>
    </div>
  );
}
