import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { images } from "../../../utils/images";
import RentalNote from "./RentalNote";
import Loading from "../../../components/Loading";
import {
  RentalConfirm,
  RentalSuccess,
  RentalLimit,
  NoneReturn,
  ReturnOver,
} from "./RModal";

// 한글 초성 리스트
const HANGUL_INITIALS = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

const Item = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 객체
  const [items, setItems] = useState([]); // 아이템 상태값
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [modalStep, setModalStep] = useState(1); // 모달 단계
  const [isLoading, setIsLoading] = useState(true); //로딩
  const itemRefs = useRef({});

  const fetchItems = async () => {
    const token = localStorage.getItem("Token");

    try {
      const response = await axios.get(`${API_URL}/item-rent/list`, {
        headers: { Authorization: token },
      });

      const updatedItems = response.data.map((item) => ({
        ...item,
        available: item.count - item.rentingCount,
        status:
          item.count - (item.rentingCount + item.bookingCount) > 0
            ? "대여 가능"
            : "대여 불가능",
        image: `data:image/jpeg;base64,${item.image}`,
      }));

      setItems(updatedItems); // 상태 업데이트
    } catch (error) {
      console.error(error);
      localStorage.clear();
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // 초성 추출 함수
  const getInitial = (char) => {
    const uni = char.charCodeAt(0);
    if (uni >= 0xac00 && uni <= 0xd7a3) {
      const index = Math.floor((uni - 0xac00) / 588);
      return HANGUL_INITIALS[index];
    }
    return char;
  };

  // 초성 분류 함수
  const getInitialCategory = (name) => {
    const firstChar = name.charAt(0);
    if (/[0-9]/.test(firstChar)) return "1";
    if (/[A-Za-z]/.test(firstChar)) return "A";

    const initial = getInitial(firstChar);
    if (HANGUL_INITIALS.includes(initial)) return initial;
    return "기타";
  };

  // 아이템을 초성별로 분류
  const categorizedItems = items.reduce((acc, item) => {
    const category = getInitialCategory(item.name);

    if (!acc[category]) acc[category] = [];
    acc[category].push(item);

    return acc;
  }, {});

  const scrollToCategory = (category) => {
    if (categorizedItems[category] && categorizedItems[category].length > 0) {
      const firstItem = categorizedItems[category][0]; // 해당 카테고리의 첫 번째 아이템
      const itemElement = itemRefs.current[firstItem.id]; // 해당 아이템의 ref

      if (itemElement) {
        itemElement.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };
  // 네비게이션 바에서 순서 조정
  const navigationCategories = ["1", "A", ...HANGUL_INITIALS, "기타"].filter(
    (category) =>
      categorizedItems[category] && categorizedItems[category].length > 0
  );

  // 예약 버튼 클릭 핸들러
  const handleReserve = (item) => {
    document.body.style.overflow = "hidden";
    setSelectedItem(item);
    setShowModal(true);
    setModalStep(1);
  };

  // 모달 닫기 + 최신 데이터 반영
  const closeModal = () => {
    document.body.style.overflow = "auto";
    setShowModal(false);
    setSelectedItem(null);
    setModalStep(1);
    fetchItems(); // 최신 데이터 불러오기
  };

  const nextStep = () => {
    setModalStep((prevStep) => prevStep + 1);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center mt-[50%] text-[40px] text-[#996515]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {/* 네비게이션 바 */}
      <div className="fixed ml-[360px] max-[500px]:right-0">
        <div className="absolute flex flex-col items-end w-full leading-10">
          {navigationCategories.map((category) => (
            <button
              key={category}
              className="px-2 py-1 rounded-md bg-[#d2b48c00] text-[#583D2C] text-[7px]"
              onClick={() => scrollToCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      {items.map((item) => (
        <div
          key={item.id}
          ref={(el) => (itemRefs.current[item.id] = el)} // 여기에서 ref 저장
          className="bg-white w-full rounded-xl h-[150px] px-5 py-4 border-[2px] border-[#D2B48C] mb-4"
        >
          <div className="flex justify-start h-full text-xs item">
            <div className="img-status flex flex-col h-full justify-between items-center w-[37%]">
              <img
                src={item.image}
                className="w-full rounded-full"
                alt="이미지"
              />
              <p
                className={`rounded-xl px-[9px] py-1 ${
                  item.status === "대여 가능"
                    ? "bg-[#FFCB99]"
                    : "bg-[#FF7009] text-[#FDF1F5]"
                }`}
              >
                {item.status}
              </p>
            </div>
            <div className="w-full pt-1 pl-4 itemcontent">
              <div className="flex items-center justify-between mb-1 itemname">
                <p
                  style={{
                    fontSize: `${Math.max(
                      0.9,
                      1.5 - item.name.length * 0.05
                    )}rem`,
                  }}
                  className="w-[60%]"
                >
                  {item.name}
                </p>
                <button
                  onClick={() => handleReserve(item)}
                  className={`rounded-xl px-4 h-5 mb-1 w-[40%] ${
                    item.status === "대여 가능"
                      ? "bg-[#D2B48C] text-[#583D2C]"
                      : "bg-gray-400 text-gray-200 cursor-not-allowed"
                  }`}
                  disabled={item.status === "대여 불가능"}
                >
                  예약하기
                </button>
              </div>
              <img src={images.line} className="pt-1 pb-2" alt="line" />
              <div className="grid grid-cols-2 gap-5 mt-2 text-center">
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  총 개수 : {item.count}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  대여 중 : {item.rentingCount}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  예약 : {item.bookingCount}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  대여가능 :{" "}
                  {item.count - (item.rentingCount + item.bookingCount)}개
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* 모달 */}
      {showModal && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-30">
          {modalStep === 1 && selectedItem && (
            <div className="bg-[#FFF6EC] w-[375px] max-[500px]:w-full max-[500px]:flex max-[500px]:items-center p-5">
              <RentalNote
                item={selectedItem}
                closeModal={closeModal}
                nextStep={nextStep}
              />
            </div>
          )}
          {modalStep === 2 && selectedItem && (
            <div className="w-[450px] h-[55rem] p-5">
              <RentalConfirm
                item={selectedItem}
                closeModal={closeModal}
                nextStep={nextStep}
                setModalStep={setModalStep}
                setSelectedItem={setSelectedItem} // ✅ 추가
              />
            </div>
          )}
          {modalStep === 3 && selectedItem && (
            <div className="w-[450px] h-[55rem] p-5">
              <RentalSuccess item={selectedItem} closeModal={closeModal} />
            </div>
          )}
          {modalStep === 4 && (
            <div className="w-[450px] h-[55rem] p-5">
              <RentalLimit closeModal={closeModal} />
            </div>
          )}
          {modalStep === 5 && (
            <div className="w-[450px] h-[55rem] p-5">
              <NoneReturn closeModal={closeModal} />
            </div>
          )}
          {modalStep === 6 && (
            <div className="w-[450px] h-[55rem] p-5">
              <ReturnOver closeModal={closeModal} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
