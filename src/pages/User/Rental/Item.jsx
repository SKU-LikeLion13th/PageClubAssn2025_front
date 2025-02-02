import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../config";
import { images } from "../../../utils/images";
import RentalNote from "./RentalNote";
import { RentalConfirm, RentalSuccess, RentalLimit } from "./RModal";

const Item = () => {
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null); // 선택된 아이템 객체
  const [items, setItems] = useState([]); // 아이템 상태값
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [modalStep, setModalStep] = useState(1); // 모달 단계
  const [isLoading, setIsLoading] = useState(true); //로딩

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
    fetchItems(); // 처음 마운트될 때 데이터 가져오기
  }, []);

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
      <div className="flex justify-center items-center h-screen text-[40px] text-[#996515]">
        Loading...
      </div>
    );
  }

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white w-full rounded-xl h-[150px] px-5 py-4 border-[2px] border-[#D2B48C] mb-4"
        >
          <div className="item flex justify-start text-xs h-full">
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
            <div className="itemcontent pl-4 w-full pt-1">
              <div className="itemname flex justify-between items-center mb-1">
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
              <img src={images.line} className="pb-2 pt-1" alt="line" />
              <div className="grid grid-cols-2 text-center gap-5 mt-2">
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
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50 bg-black bg-opacity-30">
          {modalStep === 1 && selectedItem && (
            <div className="bg-[#FFF6EC] w-[375px] p-5">
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
                setModalStep={setModalStep} // 추가됨!
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
              <RentalLimit closeModal={closeModal} />
            </div>
          )}
          {modalStep === 6 && (
            <div className="w-[450px] h-[55rem] p-5">
              <RentalLimit closeModal={closeModal} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
