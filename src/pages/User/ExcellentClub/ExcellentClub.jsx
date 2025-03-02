import React, { useEffect, useState, useRef } from "react";
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
  const [currentIndexes, setCurrentIndexes] = useState({});
  const intervalIds = useRef({});

  useEffect(() => {
    const token = localStorage.getItem("Token");

    setIsLoading(true);

    axios
      .get(`${API_URL}/club-scores/ranked`, {
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

  useEffect(() => {
    clubScore.forEach((item) => {
      const sameRankTeams = clubScore.filter((team) => team.ranking === item.ranking);

      if (sameRankTeams.length > 1 && !intervalIds.current[item.ranking]) {
        intervalIds.current[item.ranking] = setInterval(() => {
          setCurrentIndexes((prevIndexes) => {
            const currentIndex = prevIndexes[item.ranking] || 0;
            return {
              ...prevIndexes,
              [item.ranking]: (currentIndex + 1) % sameRankTeams.length,
            };
          });
        }, 2500);
      }
    });

    clubScore.forEach((item) => {
      const sameRankTeams = clubScore.filter((team) => team.ranking === item.ranking);
      if (sameRankTeams.length <= 1 && intervalIds.current[item.ranking]) {
        clearInterval(intervalIds.current[item.ranking]);
        intervalIds.current[item.ranking] = null;
      }
    });

  }, [clubScore]);

  return (
    <div className="relative min-h-[calc(100vh-200px)]">
      <Header />

      <div className="z-20">
        <div className="flex justify-center w-fit mx-auto text-[25.5px] text-[#996515] border-[0.5px] border-[#996515] bg-[#ffffff] rounded-[62px] mt-8 px-11 py-1">
          {clubScore.length > 0 ? clubScore[0].quarter : ""} 활동 점수 TOP3
        </div>

        <div className="flex items-center justify-center w-full">
          {isLoading ? (
            <div className="flex flex-col items-center w-full loading">
              <Loading />
            </div>
          ) : clubScore.length > 0 ? (
            <div className="top-[14%] flex flex-col items-center">
              <Score scores={clubScore} currentIndexes={currentIndexes} />
              <ScoreList scores={clubScore} currentIndexes={currentIndexes} />
            </div>
          ) : (
            <div className="z-10 flex items-center justify-center w-9/12 mt-[4rem]">
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