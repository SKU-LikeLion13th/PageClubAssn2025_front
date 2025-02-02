import axios from "axios";
import { API_URL } from "../../../config";
import {images} from "../../../utils/images"

export const RentalConfirm = ({ item, closeModal, nextStep, setModalStep }) => {
  const handleConfirm = async () => {
    const token = localStorage.getItem("Token");

    if (!token) {
      console.error("Token is missing");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/item-rent`,
        { itemId: item.id, count: 1 },
        { headers: { Authorization: token } }
      );

      console.log("예약 성공:", response.data);
      nextStep(); // 성공하면 다음 단계로 이동
    } catch (error) {
      if (error.response && error.response.status === 403) {
        if (error.response.data === "물품은 세 종류까지만 대여가 가능합니다.") {
          setModalStep(4); //setModalStep을 사용하여 모달 변경
          return;
        }
        if (error.response.data === "미반납") {
          setModalStep(5); //setModalStep을 사용하여 모달 변경
          return;
        }
        if (error.response.data === "수량초과") {
          setModalStep(6); //setModalStep을 사용하여 모달 변경
          return;
        }
      }
      console.error("예약 실패:", error);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative rounded-lg w-3/4 h-1/3 bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{item.name}</div>
          <img src={item.image} className="rounded-full h-28" />
          <div className="mt-4 text-center">
            <p>
              <span className="text-[#FF7009]">예약</span>하시겠습니까?
            </p>
            <div className="flex justify-center items-center w-full text-sm mt-2">
              <button
                onClick={handleConfirm} // 클릭 시 handleConfirm 실행
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                예
              </button>
              <button
                onClick={closeModal}
                className="bg-[#e8d9c5] text-[#a08b78] py-[1px] px-4 rounded-xl ml-1"
              >
                아니오
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export const RentalSuccess = ({ item, closeModal }) => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{item.name}</div>
          <img src={item.image} className="rounded-full h-28" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              예약 완료 되었습니다.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RentalLimit = ({ closeModal }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="mt-4 text-center leading-[22px]">
            <p>
              3개가 한계.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const NoneRental = ({ itemId, closeModal, itemName }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              예약 완료 되었습니다.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RentalOver = ({ itemId, closeModal, itemName }) => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-black bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="title text-xl mb-2">{itemName}</div>
          <img src={images.cushion} className="rounded-full" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              예약 완료 되었습니다.
              <br />
              <span className="text-[#FF7009]">12월 26일</span>까지
              <br />
              동아리연합회의실로 방문해주세요.
            </p>
            <div className="flex justify-center items-center w-full mt-4 text-sm">
              <button
                onClick={closeModal}
                className="bg-[#D2B48C] text-[#583D2C] py-[1px] px-6 rounded-xl mr-1"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
