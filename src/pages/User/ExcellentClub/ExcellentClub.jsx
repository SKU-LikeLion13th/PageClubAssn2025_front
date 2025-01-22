import React from "react";
import RibbonBackground from "../../../components/RibbonBackground";
import Score from "./Score";
import ScoreList from "./ScoreList";
import Header from "../../../components/Header";

export default function ExcellentClub() {
  return (
    <div className="relative w-full min-h-screen">
      <RibbonBackground />

        {/* 콘텐츠 */}
        <div className="z-10 flex flex-col items-center h-full">
          {/* TOP3 점수 */}
          <Score />

        {/* 순위 목록 */}
        <ScoreList />
      </div>
    </div>
  );
}
