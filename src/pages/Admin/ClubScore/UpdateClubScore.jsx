import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

const UpdateClubScore = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState("1분기");
  const quarters = ["1분기", "2분기", "3분기", "4분기"];
  const [scores, setScores] = useState([
    { ranking: 1, clubName: "", score: "" },
    { ranking: 2, clubName: "", score: "" },
    { ranking: 3, clubName: "", score: "" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("Token");

        const clubsResponse = await axios.get(`${API_URL}/admin/club/all`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setClubs(clubsResponse.data);

        const scoresResponse = await axios.get(`${API_URL}/club-scores/all`, {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "multipart/form-data",
          },
        });

        if (scoresResponse.data && scoresResponse.data.length > 0) {
          const top3Scores = scoresResponse.data
            .filter((score) => score.ranking <= 3)
            .sort((a, b) => a.ranking - b.ranking);

          if (top3Scores.length > 0 && top3Scores[0].quarter) {
            setSelectedQuarter(top3Scores[0].quarter);
          }

          setScores(
            scores.map((score, index) => ({
              ...score,
              clubName: top3Scores[index]?.clubName || "",
              score: top3Scores[index]?.score.toString() || "",
            }))
          );
        }
      } catch (error) {
        const errorStatus = error.status;
        if (errorStatus === 401) {
          navigate("/admin/adminlogin");
        } else {
          console.error("Error fetching data:", error);
          alert("데이터를 불러오는 중 오류가 발생했습니다.");
        }
      } finally {
        setLoading(false); // 데이터 로딩 후 loading 상태를 false로 설정
      }
    };

    fetchInitialData();
  }, []);

  const handleClubChange = (ranking, newClub) => {
    setScores(
      scores.map((item) =>
        item.ranking === ranking ? { ...item, clubName: newClub } : item
      )
    );
  };

  const handleScoreChange = (ranking, newScore) => {
    if (!/^\d*$/.test(newScore)) return;
    setScores(
      scores.map((item) =>
        item.ranking === ranking ? { ...item, score: newScore } : item
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("Token");
      const submitData = scores.map((item) => ({
        quarter: selectedQuarter,
        ranking: item.ranking,
        clubName: item.clubName,
        score: parseInt(item.score, 10),
      }));

      await axios.post(
        `${API_URL}/admin/club-scores/add-or-update`,
        submitData,
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("점수가 성공적으로 저장되었습니다.");
      navigate("/admin/club-score-management");
    } catch (error) {
      const errorStatus = error.status;
      if (errorStatus === 401) {
        navigate("/admin/adminlogin");
      } else {
        console.error("Error submitting scores:", error);
        alert("점수 저장 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="min-h-screen mx-6 mt-6 font-Y_spotlight">
      {/* 타이틀 */}
      <div>
        <p className="text-[30px] text-center">활동 점수 수정</p>
        <div className="flex justify-end mb-3">
          <button
            onClick={handleSubmit}
            className="h-[16px] w-[42px] text-[7.08px] bg-[#D1D1D3] rounded-[4.72px]">
            수정
          </button>
        </div>
        <p className="border border-[#D1D1D3]"></p>
      </div>

      {/* 분기 셀렉트박스 */}
      <select
        value={selectedQuarter}
        onChange={(e) => setSelectedQuarter(e.target.value)}
        className="font-Moneygraphy mx-4 mt-5 mb-6 h-[25px] text-[12px] bg-transparent border border-[#D1D1D3] rounded-[4.72px] focus:outline-none">
        {quarters.map((quarter) => (
          <option key={quarter} value={quarter}>
            {quarter}
          </option>
        ))}
      </select>

      {/* 로딩상태 */}
      {loading ? (
          <Loading />
      ) : (
        // 동아리 리스트
        <div className="mx-5">
          {scores.map((item) => (
            <div
              key={item.ranking}
              className="font-PretendardVariable text-[14px] flex mb-4 pb-5">
              <div className="mr-5">
                <p>{item.ranking}등</p>
              </div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <p>동아리명</p>
                  <div className="flex-1 ml-2">
                    <select
                      value={item.clubName}
                      onChange={(e) =>
                        handleClubChange(item.ranking, e.target.value)
                      }
                      className="w-full text-[12px] font-semibold text-center border-b border-[#3F3F3F]/[.5] bg-transparent focus:outline-none">
                      <option value="">동아리 선택</option>
                      {clubs.map((club) => (
                        <option key={club.id} value={club.name}>
                          {club.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center">
                  <p>점수</p>
                  <div className="relative flex-1 ml-2">
                    <input
                      type="text"
                      value={item.score}
                      onChange={(e) =>
                        handleScoreChange(item.ranking, e.target.value)
                      }
                      className="w-full text-[12px] font-semibold text-center border-b-[0.35px] border-[#3F3F3F]/[.5] bg-transparent focus:outline-none pr-4"
                    />
                    <span className="absolute right-0 top-0 text-[12px] font-semibold">
                      점
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateClubScore;
