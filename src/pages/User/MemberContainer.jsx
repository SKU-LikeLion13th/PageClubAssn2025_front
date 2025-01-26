import React, { useEffect, useState, useRef } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import axios from "axios";
import { API_URL } from "../../config";

export default function MemberContainer() {
  const [userData, setUserData] = useState(null); // userData 초기값을 null로 설정
  const [selectedClub, setSelectedClub] = useState(null); // selectedClub 초기값을 null로 설정
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // 드롭다운 영역 참조

  useEffect(() => {
    const token = localStorage.getItem("Token");

    // 유저 데이터 가져오기
    axios
      .get(`${API_URL}/mypage`, {
        headers: {
          "Accept": "*/*",
          "Authorization": `${token}`,
        },
      })
      .then((response) => {
        setUserData(response.data); // userData 업데이트
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });

    // 동아리 목록 가져오기
    axios
      .get(`${API_URL}/joined-list`, {
        headers: {
          "Accept": "*/*",
          "Authorization": `${token}`,
        },
      })
      .then((response) => {
        // 이미지 데이터를 파싱하여 추가
        const clubsWithLogo = response.data.map(item => ({
          ...item,
          logo: `data:image/jpeg;base64,${item.logo}`, // 이미지 데이터 파싱
        }));
        // 첫 번째 동아리를 기본 선택으로 설정
        if (clubsWithLogo.length > 0) {
          setSelectedClub(clubsWithLogo[0]);
        }
        setUserData(prevState => ({
          ...prevState,
          clubs: clubsWithLogo
        }));
      })
      .catch((error) => {
        console.error("Error fetching joined clubs:", error);
      });
  }, []);

  const handleClubSelect = (club) => {
    setSelectedClub(club); // 선택된 동아리 설정
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // 드롭다운 외부 클릭 시 드롭다운 닫기
    }
  };

  useEffect(() => {
    // 외부 클릭 감지
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!userData || !userData.clubs) {
    return <div>Loading...</div>; // userData나 userData.clubs가 없을 때 로딩 화면 표시
  }

  return (
    <div className="relative w-full min-h-screen">
      {/* 드롭다운 컨테이너 */}
      <div className="relative flex flex-col items-center w-full mt-5 text-[14px] font-Moneygraphy">
        <div
          className="flex items-center bg-[#ffffff] w-[80%] px-4 py-2 border-[#D2B48C] rounded-[10px] cursor-pointer relative z-10"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <div>
            {/* selectedClub이 있을 경우 로고를 표시 */}
            {selectedClub && (
              <img
                src={selectedClub.logo} // 선택된 동아리 로고
                alt="clubLogo"
                className="w-[60px] object-cover rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center">
              {selectedClub?.name}
              <IoCaretDownOutline className="ml-2" />
            </div>
            <div>{userData.name}</div>
          </div>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef} // 드롭다운 영역 참조
            className="flex flex-col bg-[#ffffff] w-10/12 rounded-[10px] shadow-lg absolute mt-0 z-50"
          >
            {/* userData.clubs이 있을 경우 목록을 표시 */}
            {userData.clubs.map((club) => (
              <div
                key={club.name}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] first:rounded-t-[10px] last:rounded-b-[10px]"
                onClick={() => handleClubSelect(club)}
              >
                <img
                  src={club.logo} // 동아리 로고
                  alt={`${club.name} logo`}
                  className="w-[40px] h-[40px] object-cover rounded-full mr-3"
                />
                <span>{club.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
