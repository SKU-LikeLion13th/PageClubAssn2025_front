import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../config";

export default function RentalItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    if (!token) {
      console.log("Token is missing");
      return;
    }

    const fetchItems = async () => {
      try {
        const response = await axios.get(`${API_URL}/admin/item/all`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        // 응답 데이터가 유효한지 확인
        if (response.data && Array.isArray(response.data)) {
          const sortedItems = response.data.sort(
            (a, b) => a.name.localeCompare(b.name, "ko") // 가나다 순 정렬
          );
          setItems(sortedItems); // 상태 업데이트
        } else {
          console.log("No items found");
        }
      } catch (error) {
        console.error("Error fetching rental items:", error);
      } finally {
        setLoading(false); // 로딩 상태 해제
      }
    };

    fetchItems();
  }, []);

  return (
    <div className="px-4 font-Y_spotlight">
      <div className="flex flex-col items-center mt-6">
        <p className="text-[2rem]">대여 물품 관리</p>
        <NavLink to="/admin/AddRentalItem" className="ml-auto">
          <button className="w-[2.5rem] h-[1rem] bg-[#D1D1D3] text-[7px] rounded-[5px]">
            + 추가
          </button>
        </NavLink>
      </div>

      {/* 로딩 상태 표시 */}
      {loading ? (
        <div className="flex items-center justify-center mt-6">
          <p className="text-sm">로딩 중...</p>
        </div>
      ) : (
        // 물품 리스트
        <div className="mt-6 space-y-4 font-PretendardVariable">
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.id} className="relative">
                <div className="border-[1.5px] border-[#D1D1D3]" />
                {/* 수정 버튼 */}
                <NavLink to={`/admin/EditRentalItem/${item.id}`}>
                  <div className="absolute top-0 right-0 pt-2 pr-3 text-sm text-blue-500 no-underline">
                    <div className="flex items-center justify-center">
                      <img
                        src="/assets/images/edit.png"
                        alt=""
                        className="w-[0.5rem] h-[0.5rem]"
                      />
                      <p className="pl-1 text-[#3f3f3f] text-[0.7rem]">수정</p>
                    </div>
                  </div>
                </NavLink>
                <div className="flex flex-col items-start pt-4 pb-2 pl-3">
                  {/* 물품명 */}
                  <div className="flex items-center space-x-2">
                    <label className="text-sm">물품명</label>
                    <input
                      type="text"
                      value={item.name}
                      readOnly
                      className="text-sm text-center bg-transparent border-b border-gray-300 focus:outline-none"
                    />
                  </div>

                  {/* 총 수량 */}
                  <div className="flex items-center mt-2 space-x-2">
                    <label className="text-sm">총 수량</label>
                    <input
                      type="text"
                      value={`총 ${item.count}개`}
                      readOnly
                      className="text-sm text-center bg-transparent border-b border-gray-300 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-sm">물품이 없습니다.</p>
          )}
        </div>
      )}

      <div className="border-[1.5px] border-[#D1D1D3] mt-3 mb-8" />
    </div>
  );
}
