import React, { useEffect, useState } from "react";
import { images } from "../../../utils/images";
import Score from "./Score";
import ScoreList from "./ScoreList";
import Header from "../../../components/Header";
import axios from "axios";
import { API_URL } from "../../../config";
import Loading from "../../../components/Loading";
import "../../../css/ExcellentClub.css";

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
  
  return (
    <div className="relative min-h-screen">
      <Header />

      {/* 활동점수 Top 3 제목 */}
      <div className="z-10">
        <div className="flex justify-center w-fit mx-auto text-[25.5px] text-[#996515] border-[0.5px] border-[#996515] bg-[#ffffff] rounded-[62px] mt-8 px-11 py-1">
          {/* {clubScore.length > 0 ? clubScore[0].quarter : ""}  */}
          활동 점수 TOP3
        </div>

        <div className="flex items-center justify-center w-full">
          {isLoading ? (
            <div className="flex flex-col items-center top-1/2">
              <Loading />
            </div>
          ) : clubScore.length > 0 ? (
            <div className="top-[14%] flex flex-col items-center">
              <Score scores={clubScore} currentIndexes={currentIndexes} />
              <ScoreList scores={clubScore} currentIndexes={currentIndexes} />
            </div>
          ) : (
            <div className="flex items-center justify-center w-9/12 ready">
              <div className="w-full h-[22rem] flex items-center justify-center font-Moneygraphy text-[15px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[13px] text-[#996515]">
                Comming Soon!
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 리본 배경 */}
      <div className="absolute top-24 z-0 max-[500px]:w-full">
        <img src={images.ribbon} className="w-full opacity-50" alt="ribbon" />
      </div>
    </div>
  );  
}
