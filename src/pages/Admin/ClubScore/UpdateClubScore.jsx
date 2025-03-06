import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { useNavigate } from "react-router-dom";
import { BiSolidTrash } from "react-icons/bi";

const UpdateClubScore = () => {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [selectedQuarter, setSelectedQuarter] = useState("1분기");
  const quarters = ["1분기", "2분기", "3분기", "4분기"];
  const [scores, setScores] = useState([
    { clubId: null, clubName: "", score: "" },
    { clubId: null, clubName: "", score: "" },
    { clubId: null, clubName: "", score: "" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("Token");

        // 동아리 목록 가져오기
        const clubsResponse = await axios.get(`${API_URL}/admin/club/summary`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        setClubs(clubsResponse.data);

        try {
          // 점수 데이터 가져오기 - 404 오류를 별도로 처리하기 위해 별도의 try/catch 블록 사용
          const scoresResponse = await axios.get(
            `${API_URL}/admin/club-scores/all`,
            {
              headers: {
                Authorization: `${token}`,
                "Content-Type": "multipart/form-data",
              },
            }
          );

          if (scoresResponse.data && scoresResponse.data.length > 0) {
            const clubScores = scoresResponse.data.sort(
              (a, b) => b.score - a.score
            ); // 점수 기준 내림차순 정렬

            if (clubScores.length > 0 && clubScores[0].quarter) {
              setSelectedQuarter(clubScores[0].quarter);
            }

            // 기존 데이터를 이용해 scores 상태 설정 (clubId 포함)
            setScores(
              clubScores.map((score) => ({
                clubId: score.clubId || null,
                clubName: score.clubName || "",
                score: score.score.toString() || "",
              }))
            );

            // 초기 데이터가 3개 미만이면 빈 항목 추가
            if (clubScores.length < 3) {
              const emptyEntries = Array(3 - clubScores.length)
                .fill()
                .map(() => ({
                  clubId: null,
                  clubName: "",
                  score: "",
                }));
              setScores((prevScores) => [...prevScores, ...emptyEntries]);
            }
          }
        } catch (scoresError) {
          // 404 에러일 경우 아무 처리 없이 기본값 유지
          if (scoresError.response && scoresError.response.status !== 404) {
            // 404가 아닌 다른 에러는 알림 표시
            console.error("Error fetching scores:", scoresError);
            alert("점수 데이터를 불러오는 중 오류가 발생했습니다.");
          }
        }
      } catch (error) {
        // 동아리 목록 가져오기 또는 전체적인 오류 처리
        if (error.response && error.response.status === 401) {
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
  }, [navigate]);

  const handleClubChange = (index, newClubId, newClubName) => {
    setScores((prevScores) =>
      prevScores.map((item, idx) =>
        idx === index
          ? { ...item, clubId: newClubId, clubName: newClubName }
          : item
      )
    );
  };

  const handleScoreChange = (index, newScore) => {
    if (!/^\d*$/.test(newScore)) return;
    setScores((prevScores) =>
      prevScores.map((item, idx) =>
        idx === index ? { ...item, score: newScore } : item
      )
    );
  };

  const handleAddClub = () => {
    setScores((prevScores) => [
      ...prevScores,
      { clubId: null, clubName: "", score: "" },
    ]);
  };

  const handleRemoveClub = async (index) => {
    if (scores.length <= 1) return; // 최소 1개의 항목은 유지

    const scoreItem = scores[index];

    // UI에서 먼저 항목 제거 (즉시 반응을 위해)
    setScores((prevScores) => prevScores.filter((_, idx) => idx !== index));

    // API 호출이 필요한 경우에만 서버에 삭제 요청
    if (scoreItem.clubId) {
      try {
        const token = localStorage.getItem("Token");

        await axios.delete(
          `${API_URL}/admin/club-scores/delete/${scoreItem.clubId}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        alert(`${scoreItem.clubName} 동아리의 점수가 삭제되었습니다.`);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate("/admin/adminlogin");
        } else {
          console.error("Error deleting club score:", error);
          alert("점수 삭제 중 오류가 발생했습니다.");
        }
      }
    }
  };

  const handleSubmit = async () => {
    try {
      // 빈 항목 검증
      const invalidEntries = scores.filter(
        (item) => item.clubName === "" || item.score === ""
      );

      if (invalidEntries.length > 0) {
        alert("모든 동아리명과 점수를 입력해주세요.");
        return;
      }

      const token = localStorage.getItem("Token");
      const submitData = scores.map((item) => ({
        quarter: selectedQuarter,
        clubName: item.clubName,
        score: parseInt(item.score, 10) || 0, // 점수가 비어있으면 0으로 처리
      }));

      console.log(submitData);
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
      if (error.response && error.response.status === 401) {
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
        <div className="flex justify-end mt-2 mb-3 space-x-2">
          <button
            onClick={handleAddClub}
            className="h-[16px] w-[42px] text-[7.08px] bg-[#D1D1D3] rounded-[4.72px]">
            추가
          </button>
          <button
            onClick={handleSubmit}
            className="h-[16px] w-[42px] text-[7.08px] bg-[#D1D1D3] rounded-[4.72px]">
            저장
          </button>
        </div>
        <p className="border border-[#D1D1D3]"></p>
      </div>

      {/* 분기 셀렉트박스 */}
      <select
        value={selectedQuarter}
        onChange={(e) => setSelectedQuarter(e.target.value)}
        className="font-Moneygraphy mx-4 mt-5 h-[25px] text-[12px] bg-transparent border border-[#D1D1D3] rounded-[4.72px] focus:outline-none">
        {quarters.map((quarter) => (
          <option key={quarter} value={quarter}>
            {quarter}
          </option>
        ))}
      </select>

      {/* 로딩상태 */}
      {loading ? (
        <div className="mt-10 text-center">Loading...</div>
      ) : (
        // 동아리 리스트
        <div className="mx-5 mt-5">
          {scores.map((item, index) => (
            <div
              key={`club-score-${index}`}
              className="font-PretendardVariable text-[14px] flex mb-4 pb-5 relative">
              <div className="flex items-center flex-1">
                <div className="flex-1 mr-2">
                  <div className="flex items-center mb-2">
                    <p>동아리명</p>
                    <div className="flex-1 ml-2">
                      <select
                        value={item.clubName}
                        onChange={(e) => {
                          const selectedOption =
                            e.target.options[e.target.selectedIndex];
                          const clubId =
                            selectedOption.getAttribute("data-club-id");
                          handleClubChange(
                            index,
                            clubId ? parseInt(clubId, 10) : null,
                            e.target.value
                          );
                        }}
                        className="w-full text-[12px] font-semibold text-center border-b border-[#3F3F3F]/[.5] bg-transparent focus:outline-none">
                        <option value="" data-club-id="">
                          동아리 선택
                        </option>
                        {clubs.map((club) => (
                          <option
                            key={club.clubId}
                            value={club.name}
                            data-club-id={club.clubId}>
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
                          handleScoreChange(index, e.target.value)
                        }
                        className="w-full text-[12px] font-semibold text-center border-b-[0.35px] border-[#3F3F3F]/[.5] bg-transparent focus:outline-none pr-4"
                      />
                      <span className="absolute right-0 top-0 text-[12px] font-semibold">
                        점
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveClub(index)}
                  className="text-[10px] text-red-500 w-4 h-4 flex items-center justify-center rounded-full">
                  <BiSolidTrash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UpdateClubScore;
