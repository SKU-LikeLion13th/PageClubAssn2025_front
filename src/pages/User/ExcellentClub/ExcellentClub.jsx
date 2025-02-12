import React, { useEffect, useState } from "react";
import RibbonBackground from "../../../components/RibbonBackground";
import Score from "./Score";
import ScoreList from "./ScoreList";
import Header from "../../../components/Header";
import axios from "axios";
import { API_URL } from "../../../config";

export default function ExcellentClub() {
  const [clubScore, setClubScore] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    axios
    .get(`${API_URL}/club-scores/all`, {
      headers: {
        "Authorization" : `${token}`,
        "Accept" : "*/*",
      },
    })
    .then((response) => {
      // Base64 이미지 디코딩
      const decodedData = response.data.map((item) => ({
        ...item,
        logo: item.logo.startsWith("data:image")
          ? item.logo
          : `data:image/png;base64,${item.logo}`, // Base64 이미지 변환
      }));

      setClubScore(decodedData);
    })
    .catch((error) => {
      console.error("Error fetching joined clubs:", error);
    })
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      <Header />
      <RibbonBackground />

      {/* 콘텐츠 */}
      <div className="z-10 flex flex-col items-center h-full">
        {/* TOP3 점수 */}
        <Score scores={clubScore} />

        {/* 순위 목록 */}
        <ScoreList scores={clubScore} />
      </div>
    </div>
  );
}
