import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config";

export default function AddRentalItem() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook
  const [name, setName] = useState(""); // 물품명
  const [count, setCount] = useState(""); // 물품 개수
  const [image, setImage] = useState(null); // 이미지 (파일)
  const [imagePreview, setImagePreview] = useState(""); // 이미지 미리보기

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file)); // 선택한 파일 미리보기
    }
  };

  const handleAddItem = async () => {
    if (!name || !count || !image) {
      alert("모든 항목을 입력해주세요.");
      return;
    }

    const token = localStorage.getItem("Token"); // 토큰 가져오기
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("count", parseInt(count)); // count를 숫자로 변환
      formData.append("image", image);

      const response = await fetch(`${API_URL}/admin/item`, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
        },
        body: formData, // FormData로 요청
      });

      if (response.ok) {
        alert("대여 물품이 추가되었습니다.");
        navigate("/admin/RentalItems"); // 대여 물품 목록 페이지로 리다이렉트
      } else {
        const data = await response.json();
        alert(
          `대여 물품 추가에 실패했습니다. ${data.message || "알 수 없는 오류"}`
        );
      }
    } catch (error) {
      console.error("API 호출 실패:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="px-4 font-Y_spotlight">
      <div className="flex flex-col items-center mt-6">
        <p className="text-[2rem]">대여 물품 추가</p>
      </div>
      <div className="mt-6 space-y-4">
        <div className="border-[1.5px] border-[#D1D1D3]" />
        {/* 물품명 입력 */}
        <div className="flex justify-between px-2 font-PretendardVariable">
          <div>
            <label className="mr-2 text-sm">물품명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-sm text-center bg-transparent border-b border-gray-300 focus:outline-none"
            />
          </div>
        </div>
        {/* 총 수량 입력 */}
        <div className="flex px-2 font-PretendardVariable">
          <label className="mr-2 text-sm">총 수량</label>
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="text-sm text-center bg-transparent border-b border-gray-300 focus:outline-none"
          />
        </div>
        {/* 이미지 입력 (파일 선택) */}
        <div className="flex items-center px-2 font-PretendardVariable">
          <label htmlFor="file-upload" className="mr-2 text-sm cursor-pointer">
            사진
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          {/* 파일 선택 버튼 */}
          <button
            onClick={() => document.getElementById("file-upload").click()}
            className="w-[2.5rem] h-[1rem] bg-[#D1D1D3] rounded-[3.5px] text-[6.5px] font-Y_spotlight"
          >
            파일 선택
          </button>
        </div>
        {/* 이미지 미리보기 */}
        {imagePreview && (
          <div className="flex justify-center mt-2">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="object-contain w-32 h-32"
            />
          </div>
        )}
        {/* 추가 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleAddItem} // 추가 버튼에서 handleAddItem 호출
            className="w-[3rem] h-[1rem] bg-[#D1D1D3] rounded flex items-center justify-center text-[7px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
