import React, { useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import Header from "../../../components/Header";
import { API_URL } from "../../../config";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function UserAgreement() {
  const navigate = useNavigate();
  const location = useLocation();
  const studentInfo = location.state?.studentInfo;
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
    items: false,
    purpose: false,
    duration: false,
  });

  const [expandedSections, setExpandedSections] = useState({
    items: false,
    purpose: false,
    duration: false,
  });

  const handleAllCheck = () => {
    const newState = !allChecked;
    setAllChecked(newState);
    setIndividualChecks({
      items: newState,
      purpose: newState,
      duration: newState,
    });
  };

  const handleIndividualCheck = (key) => {
    const updatedChecks = {
      ...individualChecks,
      [key]: !individualChecks[key],
    };
    setIndividualChecks(updatedChecks);
    setAllChecked(
      Object.values(updatedChecks).every((checked) => checked === true)
    );
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const MainCheckbox = ({ checked, onChange }) => (
    <label className="relative w-6 h-6 cursor-pointer">
      <input
        type="checkbox"
        className="w-full h-full appearance-none border border-[#D2B48C] rounded-sm bg-white checked:border-[#996515] cursor-pointer"
        checked={checked}
        onChange={onChange}
      />
      {checked && (
        <svg
          className="absolute top-1/2 left-1/2 w-[18px] h-[18px] -translate-x-1/2 -translate-y-1/2 text-[#996515] pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      )}
    </label>
  );

  const CustomCheckbox = ({ checked, onChange }) => (
    <div className="relative w-5 h-5 cursor-pointer" onClick={onChange}>
      <svg
        className={`w-5 h-5 ${
          checked ? "text-[#996515]" : "text-[#996515] opacity-50"
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );

  const handleAgreement = async () => {
    try {
      if (!studentInfo) {
        navigate("/login");
        return;
      }

      const response = await axios.post(`${API_URL}/agree`, studentInfo, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      localStorage.setItem("Token", response.data.accessToken);
      localStorage.setItem("role", response.data.role);

      navigate("/");
    } catch (error) {
      console.error("UserAgreement 에러 : ", error);
    }
  };

  return (
    <>
      <Header />

      <div className="w-full min-h-[calc(100vh-130px)]">
        <div className="flex flex-col items-center text-center font-Moneygraphy">
          <div className="mt-10 w-[296px] h-[87px] bg-[#FFFFFF] border border-[#D2B48C] rounded-lg flex justify-center items-center mb-10">
            <p className="font-Ownglyph_PDH text-[25px] text-[#996515]">
              Page 웹사이트 사용을 위한
              <br /> 개인정보 수집 이용 및 제공 동의서
            </p>
          </div>

          <div className="text-[13px] text-[#3F3F3F] space-y-5">
            <p>
              제41대 동아리연합회는 동아리에 소속된 학우들에게
              <br /> 아래와 같이 개인정보 수집 이용 및 제3자에게 제공하고자
              합니다.
            </p>
            <p>
              내용을 정독 하신 후,
              <br /> 동의 여부를 결정해주길 바랍니다.
            </p>
          </div>

          <div className="w-[85%] mt-10 space-y-2">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={handleAllCheck}>
              <MainCheckbox checked={allChecked} onChange={handleAllCheck} />
              <span className="text-[17.15px] text-[#3F3F3F]">전체 동의</span>
            </div>

            <p className="font-PretendardVariable text-[#999999] text-[8px] text-left">
              *위의 개인정보 수집•이용에 대한 동의를 거부할 권리가 있습니다.
              <br />
              이에 대한 항목에 동의를 거부할 경우, Page 웹사이트 사용이 제한 될
              수 있습니다.
            </p>

            {/* 수집 이용 항목 */}
            <div className="w-[47%] text-[#996515]">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <CustomCheckbox
                    checked={individualChecks.items}
                    onChange={() => handleIndividualCheck("items")}
                  />
                  <span
                    className="text-[14.51px]"
                    onClick={() => toggleSection("items")}>
                    수집 이용 항목
                  </span>
                </div>
                <span onClick={() => toggleSection("items")}>
                  {expandedSections.items ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </span>
              </div>
              {expandedSections.items && (
                <div className="ml-7 mt-1 pb-1 border-b border-[#D2B48C80]">
                  <p className="font-PretendardVariable text-left text-[10px] text-[#996515]">
                    이름, 학번
                  </p>
                </div>
              )}
            </div>

            {/* 수집 이용 목적 */}
            <div className="w-[47%] text-[#996515]">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <CustomCheckbox
                    checked={individualChecks.purpose}
                    onChange={() => handleIndividualCheck("purpose")}
                  />
                  <span
                    className="text-[14.51px]"
                    onClick={() => toggleSection("purpose")}>
                    수집 이용 목적
                  </span>
                </div>
                <span onClick={() => toggleSection("purpose")}>
                  {expandedSections.purpose ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </span>
              </div>
              {expandedSections.purpose && (
                <div className="ml-7 mt-1 pb-1 border-b border-[#D2B48C80]">
                  <p className="font-PretendardVariable text-left text-[10px] text-[#996515]">
                    동아리원증 발급
                  </p>
                </div>
              )}
            </div>

            {/* 보유 기간 */}
            <div className="w-[47%] text-[#996515]">
              <div className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center space-x-2">
                  <CustomCheckbox
                    checked={individualChecks.duration}
                    onChange={() => handleIndividualCheck("duration")}
                  />
                  <span
                    className="text-[14.51px]"
                    onClick={() => toggleSection("duration")}>
                    보유 기간
                  </span>
                </div>

                <span onClick={() => toggleSection("duration")}>
                  {expandedSections.duration ? (
                    <MdOutlineKeyboardArrowUp />
                  ) : (
                    <MdOutlineKeyboardArrowDown />
                  )}
                </span>
              </div>
              {expandedSections.duration && (
                <div className="ml-7 mt-1 pb-1 border-b border-[#D2B48C80]">
                  <p className="font-PretendardVariable text-left text-[6px] text-[#996515]">
                    수집 이용 동의일로부터터
                    <br />
                    개인정보 수집 이용 목적을 달성할 때까지
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* 확인 버튼 */}
          <button
            className={`w-24 h-9 rounded-lg text-lg mt-14 mb-16 ${
              allChecked
                ? "bg-[#D2B48C] text-[#583D2C]"
                : "bg-[#D2B48C80] text-[#583D2C80]"
            }`}
            disabled={!allChecked}
            onClick={handleAgreement}>
            확인
          </button>
        </div>
      </div>
    </>
  );
}
