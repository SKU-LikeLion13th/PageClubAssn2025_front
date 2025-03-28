import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

export default function ClubAdd() {
  const navigate = useNavigate();

  const [clubName, setClubName] = useState("");
  const [logoFile, setLogoFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인하세요.");
      }

      const formData = new FormData();
      formData.append("clubName", clubName);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await axios.post(`${API_URL}/admin/club/add`, formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(-1);
    } catch (error) {
      const errorStatus = error.status;
      if (errorStatus == 401) {
        navigate("/admin/adminlogin");
      } else {
        console.error("동아리 추가 중 오류 발생:", error);
      }
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  // 버튼 비활성화 상태를 결정하는 조건
  const isSubmitDisabled = !logoFile;

  return (
    <div className="font-Y_spotlight mt-6 min-h-screen mx-5">
      <p className="text-[30px] text-center mb-6">동아리 추가</p>
      <p className="border border-[#D1D1D3] mb-6"></p>

      <form
        onSubmit={handleSubmit}
        className="font-PretendardVariable mx-6 text-[14.02px] text-[#3F3F3F]">
        <div>
          <label htmlFor="clubName" className="mr-2">
            동아리명
          </label>
          <input
            id="clubName"
            type="text"
            value={clubName}
            onChange={(e) => setClubName(e.target.value)}
            className="text-center border-b border-[#D1D1D3]"
            required
          />
        </div>

        <div className="mt-1 flex items-center space-x-2">
          <label>동아리 로고</label>
          <div className="relative font-Y_spotlight w-[30.67px] h-[12px] bg-[#D1D1D3] rounded text-[#3F3F3F] text-[5.17px] flex justify-center items-center cursor-pointer">
            파일 선택
            <input
              id="clubLogo"
              type="file"
              accept="image/*"
              onChange={handleLogoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>
        </div>

        {previewLogo && (
          <img src={previewLogo} alt="동아리 로고" className="object-cover" />
        )}

        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={isSubmitDisabled}
            className={`font-Y_spotlight w-[42px] h-[16.43px] rounded text-[7.08px] ${
              isSubmitDisabled
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-[#D1D1D3] text-[#3F3F3F]"
            }`}>
            확인
          </button>
        </div>
      </form>
    </div>
  );
}
