import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 최대 파일 크기 5MB (5 * 1024 * 1024)

export default function EditRentalItem({ handleUpdateItem }) {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [count, setCount] = useState("");
  const [image, setImage] = useState(null); // 실제 이미지 파일 상태
  const [imagePreview, setImagePreview] = useState(""); // 미리보기 이미지 상태
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      const token = localStorage.getItem("Token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
      try {
        const response = await axios.get(`${API_URL}/admin/item/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const data = response.data;
        setName(data.name);
        setCount(data.count);

        // 서버에서 가져온 이미지가 Base64 문자열로 되어있다면 이를 디코딩해서 미리보기 설정
        if (data.image) {
          const decodedImage = `data:image/jpeg;base64,${data.image}`;
          setImagePreview(decodedImage); // Base64로 디코딩된 이미지를 미리보기로 설정
        }
      } catch (error) {
        console.error("Error fetching item:", error);
      }
    };
    fetchItem();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 파일 크기 확인
      if (file.size > MAX_FILE_SIZE) {
        setErrorMessage(
          "파일 크기가 너무 큽니다. 최대 5MB까지 업로드 가능합니다."
        );
        setImage(null); // 파일 초기화
        setImagePreview(""); // 미리보기 초기화
      } else {
        setErrorMessage(""); // 오류 메시지 초기화
        setImage(file); // 실제 이미지 파일 설정
        setImagePreview(URL.createObjectURL(file)); // 미리보기 설정
      }
    } else {
      // 파일을 선택하지 않았을 때 처리 (이미지 제거)
      setImage(null);
      setImagePreview("");
    }
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem("Token"); // 토큰 확인
    if (!token) {
      alert("로그인이 필요합니다.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("itemId", id);
      formData.append("name", name);
      formData.append("count", parseInt(count, 10));

      // 이미지가 있을 때만 파일 추가
      if (image) {
        formData.append("image", image); // 올바르게 `image` 필드에 파일 추가
      }

      const response = await axios.put(`${API_URL}/admin/item`, formData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      console.log("응답 상태 코드:", response.status);

      // 응답 상태 코드가 201일 경우 처리
      if (response.status === 201) {
        alert("수정이 완료되었습니다.");
        setTimeout(() => {
          window.location.href = "/admin/RentalItems";
        }, 500);
      } else {
        alert("수정에 실패했습니다.");
      }
    } catch (error) {
      console.error("Error updating item:", error.response?.data); // 응답 오류 메시지 출력
      alert("오류가 발생했습니다.");
    }
  };

  const handleDelete = async () => {
    const confirmation = window.confirm("정말 이 물품을 삭제하시겠습니까?");
    if (confirmation) {
      const token = localStorage.getItem("Token");
      if (!token) {
        alert("로그인이 필요합니다.");
        return;
      }
      try {
        const response = await axios.delete(`${API_URL}/admin/item/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.status === 200) {
          alert("물품이 삭제되었습니다.");
          window.location.href = "/admin/RentalItems";
        } else {
          alert("삭제에 실패했습니다.");
        }
      } catch (error) {
        console.error("Error deleting item:", error);
        alert("삭제 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="font-Y_spotlight px-4">
      <div className="flex flex-col items-center mt-6">
        <p className="text-[2rem]">대여 물품 수정</p>
      </div>
      <div className="mt-6 space-y-4">
        <div className="border-[1.5px] border-[#D1D1D3]" />
        <div className="flex justify-between px-2 font-PretendardVariable">
          <div className="flex justify-between w-full">
            <div>
              <label className="text-sm mr-2">물품명</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="text-sm text-center bg-transparent border-b border-gray-300 focus:outline-none"
              />
            </div>
            <div>
              <img
                src="/assets/images/delete.png"
                alt="Delete"
                onClick={handleDelete}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="flex px-2 font-PretendardVariable">
          <label className="text-sm mr-2">총 수량</label>
          <input
            type="text"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            className="border-b border-gray-300 text-sm bg-transparent focus:outline-none text-center"
          />
        </div>
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
        {/* 파일 크기 초과시 오류 메시지 */}
        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
        )}
        {imagePreview && (
          <div className="mt-2 flex justify-center">
            <img
              src={imagePreview}
              alt="Image Preview"
              className="w-32 h-32 object-contain"
            />
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={handleUpdate}
            className="w-[3rem] h-[1rem] bg-[#D1D1D3] rounded flex items-center justify-center text-[7px]"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
