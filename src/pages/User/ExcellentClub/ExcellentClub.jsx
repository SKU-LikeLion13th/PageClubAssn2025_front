import React, { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import Score from "./Score";
import ScoreList from "./ScoreList";
import Header from "../../../components/Header";
import axios from "axios";
import { API_URL } from "../../../config";
import Loading from "../../../components/Loading";
import '../../../css/ExcellentClub.css'; 

export default function ExcellentClub() {
  const [clubScore, setClubScore] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    setIsLoading(true);

    axios
      .get(`${API_URL}/club-scores/all`, {
        headers: {
          Authorization: `${token}`,
          Accept: "*/*",
        },
      })
      .then((response) => {
        const decodedData = response.data.map((item) => ({
          ...item,
          logo: item.logo.startsWith("data:image")
            ? item.logo
            : `data:image/png;base64,${item.logo}`,
        }));

        setClubScore(decodedData);
      })
      .catch((error) => {
        console.error("Error fetching joined clubs:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-[40px] text-[#996515]">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="relative w-full min-h-[calc(100vh-130px)] mb-4">
        {/* 리본 배경 */}
        <div className="ribbon-background">
          <img src={images.ribbon} className="w-full opacity-50" alt="ribbon" />
        </div>

        {/* 콘텐츠 */}
        <div className="flex flex-col items-center h-full">
          {/* TOP3 점수 */}
          <Score scores={clubScore} />

          {/* 순위 목록 */}
          <ScoreList scores={clubScore} />
        </div>
      </div>
    </>
  );
}
