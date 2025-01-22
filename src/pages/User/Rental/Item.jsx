import { Link } from "react-router-dom";
import React, { useState } from "react";
import { images } from "../../../utils/images";
import RentalNote from "./RentalNote";
import { RentalConfirm } from "./RModal";
import { RentalSuccess } from "./RModal";

const Item = () => {
  const [selectedItemId, setSelectedItemId] = useState(null); // 선택된 아이템 ID
  const [selectedItemName, setSelectedItemName] = useState(null); // 선택된 아이템 이름
  const [showModal, setShowModal] = useState(false); // 모달 표시 상태
  const [modalStep, setModalStep] = useState(1); // 모달 단계

  // 임시 데이터
  const items = [
    {
      id: 1,
      name: "기도방석",
      total: 5,
      rented: 2,
      waiting: 1,
      available: 2,
    },
    {
      id: 2,
      name: "간이 탁구 네트",
      total: 10,
      rented: 6,
      waiting: 2,
      available: 2,
    },
    {
      id: 3,
      name: "경식 야구공",
      total: 8,
      rented: 4,
      waiting: 1,
      available: 3,
    },
  ];
  // 예약 버튼 클릭 핸들러
  const handleReserve = (id, name) => {
    setSelectedItemId(id); // 선택한 아이템 ID 설정
    setSelectedItemName(name);
    setShowModal(true); // 모달 열기
    setModalStep(1);
  };
  // 모달 닫기 핸들러
  const closeModal = () => {
    setShowModal(false);
    setSelectedItemId(null);
    setSelectedItemName(null);
    setModalStep(1);
  };
  const nextStep = () => {
    setModalStep((prevStep) => prevStep + 1); // 다음 단계로 이동
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white w-full rounded-xl h-[150px] px-5 py-4 border-[2px] border-[#D2B48C] mb-4"
        >
          <div className="item flex justify-start text-xs h-full">
            <div className="img-status flex flex-col h-full justify-between items-center w-[37%]">
              <img src={images.cushion} className="w-full" alt="이미지" />
              <p className="rounded-xl px-[9px] py-1 bg-[#FFCB99]">대여 가능</p>
            </div>
            <div className="itemcontent pl-4 w-full">
              <div className="itemname flex justify-between items-center mb-1">
                <p className="text-xl">{item.name}</p>
                <button
                  onClick={() => handleReserve(item.id, item.name)}
                  className="rounded-xl px-4 h-5 bg-[#D2B48C] text-[#583D2C]"
                >
                  예약하기
                </button>
              </div>
              <img src={images.line} className="pb-2 pt-1" />
              <div className="grid grid-cols-2 text-center gap-5 mt-2">
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  총 개수 : {item.total}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  대여 중 : {item.rented}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  예약 대기 : {item.waiting}개
                </p>
                <p className="rounded-lg border-[1px] border-[#D2B48C]">
                  대여 가능 : {item.available}개
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
      {/* 모달 */}
      {showModal && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center z-50">
          {modalStep === 1 && (
            <div className="bg-[#FFF6EC] w-[100%] p-5">
              <RentalNote
                itemId={selectedItemId}
                itemName={selectedItemName}
                closeModal={closeModal}
                nextStep={nextStep}
              />
            </div>
          )}
          {modalStep === 2 && (
            <RentalConfirm
              itemId={selectedItemId}
              itemName={selectedItemName}
              closeModal={closeModal}
              nextStep={nextStep}
            />
          )}
          {modalStep === 3 && (
            <RentalSuccess 
            itemId={selectedItemId}
            itemName={selectedItemName}
            closeModal={closeModal} />
          )}
        </div>
      )}
    </div>
  );
};

export default Item;
