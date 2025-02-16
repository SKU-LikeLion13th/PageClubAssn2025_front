import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 추가
import axios from "axios";
import { API_URL } from '../../../config';

export default function AddMember() {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // useNavigate 초기화

  const handleAddMember = async () => {
    const role = isAdmin ? "ROLE_ADMIN" : "ROLE_MEMBER"; // 관리자 여부에 따라 역할 설정
    const payload = { studentId, name, role };
    const token = localStorage.getItem('Token');

    try {
      const response = await axios.post(
        `${API_URL}/admin/member/add`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            Authorization: `${token}`,
          },
        }
      );

      if (response.status === 201) {
        setMessage("멤버가 성공적으로 추가되었습니다!");
        navigate("/admin/clubMember"); // 성공 시 페이지 이동
      } else {
        setMessage("멤버 추가에 실패했습니다.");
      }
    } catch (error) {
      if (error.response) {
        setMessage(`오류: ${error.response.data.message || "추가 실패"}`);
      } else {
        setMessage("네트워크 오류 또는 서버 문제로 추가에 실패했습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-10">
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px] mb-5">멤버 추가</div>
        <div className="flex justify-end w-10/12 mx-auto border-b-2 border-[#D1D1D3]"></div>
      </div>

      <div className="flex my-4 text-[11px] text-[#FF4242] font-PretendardVariable">
        학번이 틀릴 경우 수정이 불가하므로 정확하게 작성해주세요.
      </div>

      <div className="flex flex-col items-center w-10/12 font-PretendardVariable">
        <div className="flex justify-center w-full text-[13px]">
          <div className="flex mb-4">
            <div className="flex items-center mr-5">
              <label className="flex">
                이름
                <input
                  type="text"
                  className="flex text-center w-1/2 ml-5 outline-none border-b-[1px] border-[#D1D1D3]"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </label>
            </div>
            <div className="flex items-center">
              <label className="flex">
                학번
                <input
                  type="text"
                  className="flex text-center w-1/2 ml-5 outline-none border-b-[1px] border-[#D1D1D3]"
                  value={studentId}
                  onChange={(e) => setStudentId(e.target.value)}
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start w-full text-[13px]">
          <label className="flex items-center">
            관리자
            <input
              type="checkbox"
              className="flex ml-5"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
        </div>

        <div className="flex justify-end w-full">
          <button
            className="flex w-fit h-fit px-3 py-0.5 mt-5 text-[9px] bg-[#D1D1D3] rounded-[4px]"
            onClick={handleAddMember}
          >추가</button>
        </div>
      </div>

      {message && (
        <div className="flex justify-center w-10/12 mt-5 text-[12px] text-[#FF4242] font-PretendardVariable">
          {message}
        </div>
      )}
    </div>
  );
}
