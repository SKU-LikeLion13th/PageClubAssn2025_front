import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import LoginFailureModal from "./LoginFailureModal";
import axios from "axios";
import { API_URL } from "../../../config";
import { images } from "../../../utils/images";

export default function Login() {
  const navigate = useNavigate();
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    studentId: "",
  });
  const [showModal, setShowModal] = useState(false);

  // 이름, 학번 입력
  const handleInputChange = (e) => {
    setStudentInfo({
      ...studentInfo,
      [e.target.name]: e.target.value,
    });
  };

  // 이름과 학번 모두 입력되었는지 확인
  const isFormFilled =
    studentInfo.name.trim() !== "" && studentInfo.studentId.trim() !== "";

  const handleLogin = async (e) => {
    e.preventDefault();

    // 기존 토큰 삭제
    localStorage.clear();

    try {
      const response = await axios.post(`${API_URL}/login`, studentInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      // 로그인 성공 → 토큰 저장 후 홈으로 이동
      localStorage.setItem("Token", response.data.accessToken);
      localStorage.setItem("role", response.data.role);
      navigate("/", { replace: true });
    } catch (error) {
      // error.response가 존재하는지 먼저 확인
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          setShowModal(true);
          setStudentInfo({ name: "", studentId: "" });
        } else if (status === 401) {
          navigate("/user-agreement", { state: { studentInfo } });
        } else {
          console.error("서버 오류:", error);
          alert("예기치 않은 오류가 발생했습니다.");
        }
      } else {
        console.error("네트워크 오류 또는 서버 응답 없음:", error);
        alert("서버에 연결할 수 없습니다. 인터넷 상태를 확인하세요.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />

      <div className="relative w-full min-h-[calc(100vh-130px)] flex justify-center items-center">
        {/* 리본 배경 */}
        <div className="absolute flex items-center justify-center w-full h-full">
          <img src={images.ribbon} className="w-full " alt="ribbon" />
        </div>

        <div className="z-[50] w-[75%] text-center">
          <div className="font-Ownglyph_PDH text-[#996515] text-[65px]">
            LOGIN
          </div>

          <form onSubmit={handleLogin} className="font-Moneygraphy">
            <div className="my-24 space-y-8">
              {/* 이름 입력 */}
              <div className="flex flex-wrap items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-lg h-auto min-h-11 py-2">
                <label className="w-14 ml-3 pr-3 mb-0 text-[#996515] border-r-[0.5px] border-[#CBB189] ">
                  이름
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="flex-1 min-w-0 ml-3 md:ml-4 text-[14px] placeholder-[#9965154D] outline-none text-[#996515]"
                  name="name"
                  value={studentInfo.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* 학번 입력 */}
              <div className="flex flex-wrap items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-lg h-auto min-h-11 py-2">
                <label className="w-14 ml-3 pr-3 mb-0 text-[#996515] border-r-[0.5px] border-[#CBB189]">
                  학번
                </label>
                <input
                  type="text"
                  placeholder="20251234"
                  className="flex-1 min-w-0 ml-3 md:ml-4 text-[14px] placeholder-[#9965154D] outline-none text-[#996515]"
                  name="studentId"
                  value={studentInfo.studentId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className={`w-24 h-9 rounded-lg text-lg ${
                isFormFilled
                  ? "bg-[#D2B48C] text-[#583D2C]" // 활성화 버튼
                  : "bg-[#D2B48C80] text-[#583D2C80]" // 비활성화 버튼
              }`}
              disabled={!isFormFilled}
            >
              로그인
            </button>
          </form>
        </div>
      </div>

      {/* 모달 */}
      {showModal && <LoginFailureModal onClose={handleCloseModal} />}
    </>
  );
}
