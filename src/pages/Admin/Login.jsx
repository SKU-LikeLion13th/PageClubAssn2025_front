import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../config";

export default function Login() {
  const [studentInfo, setStudentInfo] = useState({
    studentId: "",
    name: "",
  });
  const [idValid, setIdValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const navigate = useNavigate();

  // 입력값 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setStudentInfo({
      ...studentInfo,
      [name]: value,
    });

    // 학번 유효성 검사
    if (name === "studentId") {
      const idValid = /^[A-Za-z0-9]{8,}$/.test(value);
      setIdValid(idValid);
    }

    // 이름 유효성 검사
    if (name === "name") {
      const nameValid = /^[가-힣]{2,}$/.test(value);
      setNameValid(nameValid);
    }
  };

  useEffect(() => {
    setNotAllow(!(idValid && nameValid));
  }, [idValid, nameValid]);

  // 로그인 핸들러
  const handleLogin = async () => {
    // 기존 토큰 삭제
    localStorage.clear();

    try {
      const response = await axios.post(`${API_URL}/login`, studentInfo);
      const { accessToken, role } = response.data;

      // 로그인 성공 처리
      localStorage.setItem("Token", accessToken);
      localStorage.setItem("role", role);

      if (role === "ROLE_ADMIN") {
        navigate("/admin/Main"); // 관리자 페이지로 이동
      } else {
        setModalOpen(true); // 일반 사용자 모달 띄우기
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert("학번 또는 이름이 잘못되었습니다.");
      } else {
        alert("서버 오류가 발생했습니다.");
      }
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="container mt-7 w-[70%] p-2 mb-8 font-Y_spotlight">
          <span className="text-2xl font-semibold">
            학번과 이름을
            <br />
            입력해주세요
          </span>
          <form className="inputbox mt-7">
            {/* 학번 입력 */}
            <div className="idbox flex flex-col">
              <span className="id text-base ml-1">학번</span>
              <input
                type="text"
                name="studentId"
                value={studentInfo.studentId}
                onChange={handleInputChange}
                className="idinput border mt-1 p-3 rounded-lg"
                placeholder="20190826"
              />
              {!idValid && studentInfo.studentId.length > 0 && (
                <div className="text-xs text-red-500 mt-2 ml-2">
                  숫자 8자를 입력해주세요
                </div>
              )}
            </div>

            {/* 이름 입력 */}
            <div className="namebox flex flex-col mt-5">
              <span className="name text-base ml-1">이름</span>
              <input
                type="text"
                name="name"
                value={studentInfo.name}
                onChange={handleInputChange}
                className="nameinput border mt-1 p-3 rounded-lg"
                placeholder="홍길동"
              />
              {!nameValid && studentInfo.name.length > 0 && (
                <div className="text-xs text-red-500 mt-2 ml-2">
                  한글 이름을 입력해주세요 (최소 2글자)
                </div>
              )}
            </div>
          </form>

          {/* 로그인 버튼 */}
          <button
            onClick={handleLogin}
            disabled={notAllow}
            className="submit mt-10 w-[100%] h-14 rounded-full bg-[#FFF6EC] text-[#744A2F] shadow-lg disabled:bg-[#dadada] disabled:text-white"
          >
            로그인
          </button>

          {/* 모달 */}
          {modalOpen && (
            <div className="modal">
              <div className="modal-content">
                <h3>일반 사용자 로그인</h3>
                <p>로그인이 완료되었습니다.</p>
                <button onClick={() => setModalOpen(false)}>확인</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
