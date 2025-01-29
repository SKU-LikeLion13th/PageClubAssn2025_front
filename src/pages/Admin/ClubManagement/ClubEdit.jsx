import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

export default function ClubEdit() {
  const navigate = useNavigate();
  const location = useLocation();
  const club = location.state?.club;

  const [clubName, setClubName] = useState(club?.name || "");
  const [logoFile, setLogoFile] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);

  // Base64 이미지 처리
  const displayImage = club?.logo ? `data:image/png;base64,${club.logo}` : null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인하세요.");
      }

      const formData = new FormData();
      formData.append("id", club.id);
      formData.append("name", clubName);

      if (logoFile) {
        // 새로운 파일이 있을 때만 추가
        formData.append("logo", logoFile);
      }

      await axios.put(`${API_URL}/admin/club`, formData, {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(-1);
    } catch (error) {
      console.error("동아리 수정 중 오류 발생:", error);
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreviewLogo(URL.createObjectURL(file));
    }
  };

  return (
    <div className="font-Y_spotlight mt-6 min-h-screen mx-5">
      <p className="text-[30px] text-center mb-6">동아리 수정</p>
      <p className="border border-[#D1D1D3] mb-6"></p>

      {/* 수정 폼 */}
      <form
        onSubmit={handleSubmit}
        className="font-PretendardVariable mx-6 text-[14.02px] text-[#3F3F3F]">
        {/* 동아리명 */}
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

        {/* 동아리 로고 */}
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

        {/* 새로 선택한 이미지 또는 기존 Base64 이미지 표시 */}
        {(previewLogo || displayImage) && (
          <img
            src={previewLogo || displayImage}
            alt="동아리 로고"
            className="object-cover"
          />
        )}

        {/* 수정 버튼 */}
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            className="font-Y_spotlight w-[42px] h-[16.43px] bg-[#D1D1D3] text-[#3F3F3F] rounded text-[7.08px]">
            확인
          </button>
        </div>
      </form>
    </div>
  );
}
