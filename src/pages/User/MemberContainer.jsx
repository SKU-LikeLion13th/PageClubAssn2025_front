import React, { useEffect, useState, useRef } from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../config";

export default function MemberContainer() {
  const navigate = useNavigate();

  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState({
    logo: "", // 기본값을 빈 문자열로 설정
    clubName: "",
    name: "",
    clubs: [],
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("Token");

    const fetchData = async () => {
      try {
        const [userResponse, clubsResponse] = await Promise.all([
          axios.get(`${API_URL}/mypage`, {
            headers: { Authorization: `${token}` },
          }),
          axios.get(`${API_URL}/joined-list`, {
            headers: { Authorization: `${token}` },
          }),
        ]);

        const clubsWithLogo = clubsResponse.data.map((club) => ({
          ...club,
          logo: club.logo.startsWith("data:image")
            ? club.logo
            : `data:image/png;base64,${club.logo}`,
        }));

        const updatedUserData = {
          ...userResponse.data,
          logo: userResponse.data.logo.startsWith("data:image")
            ? userResponse.data.logo
            : `data:image/png;base64,${userResponse.data.logo}`,
          clubs: clubsWithLogo,
        };

        setUserData(updatedUserData);
      } catch (error) {
        console.error("Error fetching data:", error);
        localStorage.clear();
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const handleClubSelect = async (club) => {
    try {
      const token = localStorage.getItem("Token");
      await axios.post(
        `${API_URL}/changeIconClub`,
        { clubId: club.id },
        {
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setUserData((prevData) => ({
        ...prevData,
        clubId: club.id,
        clubName: club.name,
        logo: club.logo.startsWith("data:image")
          ? club.logo
          : `data:image/png;base64,${club.logo}`,
      }));

      setIsDropdownOpen(false);
    } catch (error) {
      console.error("Error changing club:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-[40px] text-[#996515]">
        Loading...
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* 드롭다운 컨테이너 */}
      <div className="relative flex flex-col items-center w-full mt-5 text-[14px] font-Moneygraphy">
        <div
          className="flex items-center bg-[#ffffff] w-[80%] px-4 py-2 border-[#D2B48C] rounded-[10px] cursor-pointer relative z-10"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          <div>
            {/* selectedClub이 있을 경우 로고를 표시 */}
            {userData && (
              <img
                src={userData.logo} // 선택된 동아리 로고
                alt="clubLogo"
                className="w-[60px] object-cover rounded-full"
              />
            )}
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-center">
              {userData?.clubName}
              <IoCaretDownOutline className="ml-2" />
            </div>
            <div>{userData.name}</div>
          </div>
        </div>

        {isDropdownOpen && (
          <div
            ref={dropdownRef} // 드롭다운 영역 참조
            className="flex flex-col bg-[#ffffff] w-10/12 rounded-[10px] shadow-lg absolute mt-0 z-50">
            {/* userData.clubs이 있을 경우 목록을 표시 */}
            {userData.clubs.map((club) => (
              <div
                key={club.name}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-[#f8f8f8] first:rounded-t-[10px] last:rounded-b-[10px]"
                onClick={() => handleClubSelect(club)}>
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
