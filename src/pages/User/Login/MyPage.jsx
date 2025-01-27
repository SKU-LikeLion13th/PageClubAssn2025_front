import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoCaretDownOutline } from "react-icons/io5";
import Header from "../../../components/Header";
import { API_URL } from "../../../config";
import axios from "axios";
import { images } from "../../../utils/images";

export default function MyPage() {
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

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

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

  const handleNavigate = (src) => {
    navigate(`/${src}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-[40px] text-[#996515]">
        Loading...
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="relative w-full h-[calc(100vh-95px)] flex justify-center ">
        {/* 리본 배경 */}
        <div className="absolute flex items-center justify-center w-full h-full">
          <img src={images.ribbon} className=" w-full" alt="ribbon" />
        </div>

        <div className="z-[50] font-Moneygraphy text-[#996515] w-[85%] text-center">
          <div className="mt-12 mb-10">
            <div className="font-Ownglyph_PDH text-[55px]">MY PAGE</div>
          </div>

          <div className="relative flex flex-col items-center mb-4">
            <div
              className="flex items-center w-full bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div>
                {userData && (
                  <img
                    src={userData.logo}
                    alt="clubLogo"
                    className="object-cover w-[50px] h-[50px]"
                  />
                )}
              </div>
              <div className="flex-1 flex-col flex items-center justify-center pr-1">
                <div className="flex w-full items-center justify-between">
                  <p className="flex-1 text-center">{userData?.clubName}</p>
                  <p className="ml-2">
                    <IoCaretDownOutline className="text-[#D2B48C]" />
                  </p>
                </div>
                <div className="mt-1 pr-5 text-[#996515] text-[15px]">
                  {userData?.name}
                </div>
              </div>
            </div>

            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-1 w-full bg-[#FFFFFF] border border-[#D2B48C] rounded-lg z-50 max-h-[200px] overflow-y-auto">
                {userData.clubs
                  .filter((club) => club.id !== userData.clubId)
                  .map((club) => (
                    <div
                      key={club.id}
                      className="flex items-center p-2 hover:bg-[#f0f0f0] cursor-pointer"
                      onClick={() => handleClubSelect(club)}>
                      <img
                        src={club.logo}
                        alt={`${club.name} logo`}
                        className="w-[50px] h-[50px] object-cover rounded-full mr-3"
                      />
                      <span>{club.name}</span>
                    </div>
                  ))}
              </div>
            )}
          </div>

          <div className="mt-8 mb-4">
            <p className="font-Ownglyph_PDH text-[32.21px]">물품대여</p>
            <button
              className="w-[75%] bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg mb-3"
              onClick={() => handleNavigate("reservation")}>
              나의 예약 현황
            </button>
            <button
              className="w-[75%] bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg mb-3"
              onClick={() => handleNavigate("rental")}>
              나의 대여 현황
            </button>
          </div>

          <div className="mb-4">
            <p className="font-Ownglyph_PDH text-[32.21px]">동아리원증</p>
            <button
              className="w-[75%] bg-[#FFFFFF] border border-[#D2B48C] p-3 rounded-lg"
              onClick={() => handleNavigate("member-card")}>
              {userData.name}님의 동아리원증
            </button>
          </div>

          <div>
            <button
              onClick={handleLogout}
              className="w-[97px] h-[37.96px] bg-[#D2B48C] text-[16px] text-[#583D2C] rounded-xl mt-8">
              로그아웃
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
