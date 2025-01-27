import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import LoginFailureModal from "./LoginFailureModal";
import RibbonBackground from "../../../components/RibbonBackground";
import axios from "axios";
import { API_URL } from "../../../config";

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
    e.preventDefault(); // Prevent default form submission

    // 토큰이 있을 수 있으니 삭제하기
    localStorage.clear();

    try {
      const response = await axios.post(`${API_URL}/login`, studentInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.role === "ROLE_ADMIN") {
        window.location.reload();
      } else {
        // 토큰 저장
        localStorage.setItem("Token", response.data.accessToken);
        localStorage.setItem("role", response.data.role);

        navigate("/", { replace: true });
      }
    } catch (error) {
      const status = error.response.status;

      //400에러 data : "학번이 올바른지 확인해주세요."
      if (status === 400) {
        //LoginFailureModal 띄우기
        setShowModal(true);

        setStudentInfo({
          name: "",
          studentId: "",
        });
      }
      //401에러 Unauthorized - 개인정보 동의 안했을 경우
      else if (status === 401) {
        navigate("/user-agreement", { state: { studentInfo } });
      } else {
        console.error("Unexpected error:", error);
        alert("예기치 않은 오류가 발생했습니다.");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Header />

      <div className="w-full h-[calc(100vh-95px)] flex justify-center items-center">
        <div className="w-[75%] text-center">
          <div className="font-Ownglyph_PDH text-[#996515] text-[65px]">
            LOGIN
          </div>

          <form onSubmit={handleLogin} className="font-Moneygraphy">
            <div className="my-24 space-y-8">
              {/* 이름 입력 */}
              <div className="flex items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-lg h-11">
                <label className="ml-5 pr-4 mr-4 text-[#996515] border-r-[0.5px] border-[#CBB189]">
                  이름
                </label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="text-[14px] placeholder-[#9965154D] outline-none text-[#996515]"
                  name="name"
                  value={studentInfo.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* 학번 입력 */}
              <div className="flex items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-lg h-11">
                <label className="ml-5 pr-4 mr-4 text-[#996515] border-r-[0.5px] border-[#CBB189]">
                  학번
                </label>
                <input
                  type="text"
                  placeholder="20251234"
                  className="text-[14px] placeholder-[#9965154D] outline-none text-[#996515]"
                  name="studentId"
                  value={studentInfo.studentId}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            {/* 로그인 버튼 - 동적 스타일링 */}
            <button
              type="submit"
              className={`w-24 h-9 rounded-lg text-lg ${
                isFormFilled
                  ? "bg-[#D2B48C] text-[#583D2C]" // 활성화 버튼
                  : "bg-[#D2B48C80] text-[#583D2C80]" // 비활성화 버튼
              }`}
              disabled={!isFormFilled}>
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
