import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

export default function ClubScoreManagement() {
  const [scores, setScores] = useState([]);
  const [noData, setNoData] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClubScores = async () => {
      try {
        const token = localStorage.getItem("Token");
        const response = await axios.get(`${API_URL}/club-scores/all`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        // top 3
        const top3Scores = response.data
          .filter((score) => score.ranking <= 3)
          .sort((a, b) => a.ranking - b.ranking);

        setScores(top3Scores);
        setNoData(false);
      } catch (error) {
        console.error("예기치 못한 에러가 발생했습니다.", error);

        // 404 에러 처리
        if (error.response && error.response.status === 404) {
          setNoData(true);
        }
      }
    };

    fetchClubScores();
  }, []);

  const navigateUpdateScore = () => {
    navigate("/admin/update-club-score");
  };

  return (
    <div className="font-Y_spotlight mt-6 min-h-screen mx-6">
      {/* 타이틀 */}
      <div>
        <p className="text-[30px] text-center">활동 점수 관리</p>
        <div className="flex justify-end mb-3">
          <button
            className="h-[16px] w-[42px] text-[7.08px] bg-[#D1D1D3] rounded-[4.72px]"
            onClick={navigateUpdateScore}>
            수정
          </button>
        </div>
        <p className="border border-[#D1D1D3] mb-6"></p>
      </div>

      {/* 데이터 없음 메시지 */}
      {noData && (
        <div className="text-center py-10">
          <p>데이터가 없습니다.</p>
        </div>
      )}

      {/* 동아리 리스트 */}
      {!noData && (
        <div className="mx-7">
          {scores.map((item) => (
            <div
              key={`${item.ranking}`}
              className="font-PretendardVariable text-[14px] flex mb-4 pb-5">
              <div className="mr-5">
                <p>{item.ranking}등</p>
              </div>

              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <p>동아리명 </p>
                  <div className="ml-2 flex-1">
                    <p className="font-semibold text-[12px] text-center border-b border-[#3F3F3F]/[.5]">
                      {item.clubName}
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <p>점수</p>
                  <div className="ml-2 flex-1">
                    <p className="font-semibold text-[12px] text-center border-b-[0.35px] border-[#3F3F3F]/[.5]">
                      {item.score}점
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
