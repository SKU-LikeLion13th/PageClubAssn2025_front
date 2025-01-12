import React, { useState } from "react";

export default function UserAgreement() {
  const [allChecked, setAllChecked] = useState(false);
  const [individualChecks, setIndividualChecks] = useState({
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

  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="w-full h-[calc(100vh-35px)]">
      <div className="flex flex-col items-center text-center font-Moneygraphy">
        {/* 개인정보 수집 타이틀 */}
        <div className="w-[76%] h-[87px] bg-[#FFFFFF] border border-[#D2B48C] rounded-lg flex justify-center items-center mb-10">
          <p className="font-Ownglyph_PDH text-[25px] text-[#996515]">
            Page 웹사이트 사용을 위한
            <br /> 개인정보 수집 이용 및 제공 동의서
          </p>
        </div>

        {/* 개인정보 수집 안내 */}
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

        {/* 개인정보 동의란 */}
        <div className="w-[76%] mt-10 space-y-3">
          {/* 전체 동의 */}
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5"
              checked={allChecked}
              onChange={handleAllCheck}
            />
            <span className="text-[15px] text-[#3F3F3F] font-bold">
              전체 동의
            </span>
          </label>
          <p className="text-[#999999] text-[12px]">
            *위의 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.
            <br /> 이에 대한 동의를 거부할 경우, Page 웹사이트 사용이 제한될 수
            있습니다.
          </p>

          {/* 개별 항목 */}
          {/* 수집 이용 항목 */}
          <div>
            <div className="flex justify-between items-center pb-2 cursor-pointer">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={individualChecks.items}
                  onChange={() => handleIndividualCheck("items")}
                />
                <span
                  className="text-[14px] text-[#3F3F3F] cursor-pointer"
                  onClick={() => toggleSection("items")}>
                  수집 이용 항목
                </span>
              </label>
              <span
                className="text-[14px] text-[#3F3F3F]"
                onClick={() => toggleSection("items")}>
                {expandedSection === "items" ? "▲" : "▼"}
              </span>
            </div>
            {expandedSection === "items" && (
              <p className="mt-2 text-[13px] text-[#3F3F3F]">이름, 학번</p>
            )}
          </div>

          {/* 수집 이용 목적 */}
          <div>
            <div className="flex justify-between items-center pb-2 cursor-pointer">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={individualChecks.purpose}
                  onChange={() => handleIndividualCheck("purpose")}
                />
                <span
                  className="text-[14px] text-[#3F3F3F] cursor-pointer"
                  onClick={() => toggleSection("purpose")}>
                  수집 이용 목적
                </span>
              </label>
              <span
                className="text-[14px] text-[#3F3F3F]"
                onClick={() => toggleSection("purpose")}>
                {expandedSection === "purpose" ? "▲" : "▼"}
              </span>
            </div>
            {expandedSection === "purpose" && (
              <p className="mt-2 text-[13px] text-[#3F3F3F]">동아리원증 발급</p>
            )}
          </div>

          {/* 보유 기간 */}
          <div>
            <div className="flex justify-between items-center pb-2 cursor-pointer">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  checked={individualChecks.duration}
                  onChange={() => handleIndividualCheck("duration")}
                />
                <span
                  className="text-[14px] text-[#3F3F3F] cursor-pointer"
                  onClick={() => toggleSection("duration")}>
                  보유 기간
                </span>
              </label>
              <span
                className="text-[14px] text-[#3F3F3F]"
                onClick={() => toggleSection("duration")}>
                {expandedSection === "duration" ? "▲" : "▼"}
              </span>
            </div>
            {expandedSection === "duration" && (
              <p className="mt-2 text-[13px] text-[#3F3F3F]">
                수집 이용 목적 달성 시
                <br />
                기본적으로 개인정보는 즉시 파기 처리
              </p>
            )}
          </div>
        </div>

        {/* 확인 버튼 */}
        <button
          className="w-24 h-9 bg-[#D2B48C80] text-[#583D2C80] rounded-lg text-lg"
          disabled={!allChecked}>
          확인
        </button>
      </div>
    </div>
  );
}
