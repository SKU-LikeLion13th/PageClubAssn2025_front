import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { IoCaretDownOutline } from "react-icons/io5";
import Header from "../../components/Header";
import PageBackground from "../../components/PageBack";
import axios from "axios";
import { API_URL } from "../../config";

export default function ClubMemberCard() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [userData, setUserData] = useState({
    logo: "",
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
    <>
      <PageBackground />

      <div className="relative z-10 w-full min-h-[calc(100vh-75px)] flex flex-col items-center">
        <Header />

        {/* 성결대 로고 */}
        <div className="mt-10">
          <img
            src="https://i.namu.wiki/i/KKQ4uvGiknbINplKFU848NUDYuecDZlrh8XlSxbPyPaz5eOXAevvPJPeIaf3qtmUuH78TvfyQoap9WTgynGNbg.svg"
            className="w-24 h-24"
            alt="성결대학교 로고"
          />
        </div>

        {/* 성결대학교 동아리원증 타이틀 */}
        <div className="h-[45.22px] flex justify-center items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-full px-3 my-12">
          <img
            src="assets/images/PageLogo.png"
            alt="pageLogo"
            className="h-[36.6px]"
          />
          <p className="text-2xl text-[#996515] pr-3">성결대학교 동아리원증</p>
        </div>

        {/* 동아리원증 */}
        <div className="w-[90%] font-Moneygraphy text-center bg-[#FFFBFB] border border-[#D2B48C] rounded-2xl">
          <div className="relative min-h-[140px] flex items-center px-3">
            <img
              src={userData.logo}
              alt="clubLogo"
              className="object-cover w-[92.42px] h-[92.42px]"
            />

            <div className="text-[#996515] flex-1 flex flex-col justify-center items-center relative">
              {/* 동아리선택 드롭다운 토글 */}
              <div
                className="w-full flex items-center cursor-pointer px-4 relative"
                onClick={() => {
                  if (userData.clubs.length > 1) {
                    setIsDropdownOpen(!isDropdownOpen);
                  }
                }}
              >
                <p
                  className={`text-center flex-1 ${
                    userData.clubName.length > 10 ? "text-base" : "text-lg"
                  }`}
                >
                  {userData.clubName}
                </p>
                <IoCaretDownOutline className="text-[#D2B48C] absolute right-0" />
              </div>

              {/* 드롭다운 */}
              {userData.clubs.length > 1 && isDropdownOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-[45px] w-[230px] bg-[#FFFFFF] border border-[#D2B48C] rounded-lg z-50 max-h-[200px] overflow-y-auto"
                >
                  {userData.clubs
                    .filter((club) => club.id !== userData.clubId)
                    .map((club) => (
                      <div
                        key={club.id}
                        className="flex items-center p-2 hover:bg-[#f0f0f0] cursor-pointer"
                        onClick={() => handleClubSelect(club)}
                      >
                        <img
                          src={club.logo}
                          alt={`${club.name} logo`}
                          className="w-[40px] h-[40px] object-cover rounded-full mr-3"
                        />
                        <span className="text-[#996515] text-sm">
                          {club.name}
                        </span>
                      </div>
                    ))}
                </div>
              )}

              <div className="w-full flex justify-end">
                <p className="w-[95%] my-3 border-t-[0.1px] border-[#D2B48C]"></p>
              </div>
              <p className="text-[25px]">{userData.name}</p>
            </div>
          </div>

          <div className="font-PretendardVariable min-h-[60px] text-[14px] text-[#583D2C] bg-[#D2B48C] rounded-b-xl flex justify-center items-center">
            <p>
              위 동아리원증은
              <br />
              성결대학교 동아리원임을 증명합니다.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
