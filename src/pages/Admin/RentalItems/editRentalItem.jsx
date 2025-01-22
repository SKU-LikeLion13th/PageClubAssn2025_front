import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../../config";

export default function EditRentalItem({ handleUpdateItem }) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`${API_URL}/admin/item/${id}`);
        const data = await response.json();
        setName(data.name);
        setCount(data.count);
        setImage(data.image);
        setImagePreview(data.image);
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("count", count);
      if (image) {
        formData.append("image", image);
      }

      const response = await fetch(`${API_URL}/admin/item/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        const updatedItem = await response.json();
        handleUpdateItem(updatedItem); // 부모 컴포넌트로 수정된 물품 전달
        alert("수정이 완료되었습니다.");
      } else {
        alert("수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating item:", error);
      alert("오류가 발생했습니다.");
    }
  };

  return (
    <div className="font-Y_spotlight px-4">
      <div className="mt-6 flex flex-col items-center">
        <p className="text-[2rem]">대여 물품 수정</p>
      </div>
      <div className="mt-6 space-y-4">
        {/* 물품명 입력 */}
        <div className="flex justify-between px-2 font-PretendardVariable">
          <div>
            <label className="text-sm mr-2">물품명</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border-b border-gray-300 text-sm bg-transparent focus:outline-none text-center"
            />
          </div>
        </div>
        {/* 총 수량 입력 */}
        <div className="flex px-2 font-PretendardVariable">
          <label className="text-sm mr-2">총 수량</label>
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="border-b border-gray-300 text-sm bg-transparent focus:outline-none text-center"
          />
        </div>
        {/* 이미지 입력 */}
        <div className="flex items-center px-2 font-PretendardVariable">
          <label htmlFor="file-upload" className="text-sm mr-2 cursor-pointer">
            사진
          </label>
          <input
            id="file-upload"
            type="file"
            onChange={handleImageChange}
            className="hidden"
          />
          <button
            onClick={() => document.getElementById("file-upload").click()}
            className="w-[2.5rem] h-[1rem] bg-[#D1D1D3] rounded-[3.5px] text-[6.5px] font-Y_spotlight"
          >
            파일 선택
          </button>
        </div>
        {/* 이미지 미리보기 */}
        {imagePreview && (
          <div className="mt-2 flex justify-center">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-32 h-32 object-contain"
            />
          </div>
        )}
        {/* 수정 완료 버튼 */}
        <div className="flex justify-end">
          <button
            onClick={handleUpdate} // 수정 버튼에서 handleUpdate을 호출
            className="w-[3rem] h-[1rem] bg-[#D1D1D3] rounded flex items-center justify-center text-[7px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
