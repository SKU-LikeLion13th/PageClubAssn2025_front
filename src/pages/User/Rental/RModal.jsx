import axios from "axios";
import { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import { images } from "../../../utils/images";
import Loading from "../../../components/Loading";

//이름 찾기 커스텀 훅
export const useUserName = () => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserName = async () => {
      const token = localStorage.getItem("Token");
      if (!token) return;

      try {
        const response = await axios.get(`${API_URL}/mypage`, {
          headers: { Authorization: token },
        });

        if (response.data && response.data.name) {
          setUserName(response.data.name);
        }
      } catch (error) {
        console.error("사용자 정보 가져오기 실패:", error);
      }
    };

    fetchUserName();
  }, []);

  return userName;
};

export const RentalConfirm = ({
  item,
  closeModal,
  nextStep,
  setModalStep,
  setSelectedItem,
}) => {
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
      let needReceiveTime = new Date(response.data.needReceiveTime);
      const formattedNeedReceiveTime =
        needReceiveTime.toLocaleDateString("ko-KR");
      setSelectedItem((prev) => ({
        ...prev,
        needReceiveTime: formattedNeedReceiveTime,
      }));

      nextStep(); // 성공하면 다음 단계로 이동
    } catch (error) {
      if (error.response && error.response.status === 403) {
        if (error.response.data === "물품은 세 종류까지만 대여가 가능합니다." || error.response.data ==="물픔은 최대 5개까지만 대여가 가능합니다.") {
          setModalStep(4);
          return;
        }
        if (
          error.response.data === "미반납 1회로 대여 서비스가 제한되었습니다."
        ) {
          setModalStep(5);
          return;
        }
        if (
          error.response.data ===
          "반납 3회 지연으로 대여 서비스가 제한되었습니다."
        ) {
          setModalStep(6);
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
                onClick={handleConfirm}
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
              {/* <button onClick={() => setModalStep(5)}>
                미반납 제한 테스트
              </button>
              <button onClick={() => setModalStep(6)}>
                반납 지연 제한 테스트
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const RentalSuccess = ({ item, closeModal }) => {
  console.log(item);
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
              <span className="text-[#FF7009]">{item.needReceiveTime}</span>까지
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

//수량 초과, 종류 초과
export const RentalLimit = ({ closeModal }) => {
  const userName = useUserName();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userName) {
      setLoading(false);
    }
  }, [userName]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[40%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
          {loading ? (
            <Loading/>
          ) : (
            <>
              <p className="mr-1 text-2xl mb-5">{userName}</p>
              <img src={images.quantity} className="rounded-full mr-1" />
              <div className="mt-4 text-center leading-[22px]">
                <p>
                  <span className="text-[#FF7009]">
                    최대 물품 대여 및 예약 수량 초과
                  </span>
                  로<br />
                  대여가 불가합니다.
                  <br />
                  <span className="text-[#FF7009]">
                    기존 대여 물품 반납 및 예약 취소
                  </span>{" "}
                  후,
                  <br />
                  이용해주세요.
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};


//미반납
export const NoneReturn = ({ closeModal }) => {
  const userName = useUserName();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userName) {
      setLoading(false);
    }
  }, [userName]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[35%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
        {loading ? (
            <Loading/>
          ) : (
            <>
          <p className="mr-1 text-2xl mb-5">{userName}</p>
          <img src={images.quantity} className="rounded-full mr-1" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              <span className="text-[#FF7009]">미반납 1회</span>
              로<br />
              대여 서비스가 제한되었습니다.
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
          </>
          )}
        </div>
      </div>
    </div>
  );
};

//반납3회 지연
export const ReturnOver = ({ closeModal }) => {
  const userName = useUserName();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userName) {
      setLoading(false);
    }
  }, [userName]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-opacity-30">
      <div className="relative rounded-lg w-3/4 h-[35%] bg-white shadow-lg text-[#3F3F3F]">
        <div className="flex flex-col justify-center items-center h-full">
        {loading ? (
            <Loading/>
          ) : (
            <>
          <p className="mr-1 text-2xl mb-5">{userName}</p>
          <img src={images.quantity} className="rounded-full mr-1" />
          <div className="mt-4 text-center leading-[22px]">
            <p>
              <span className="text-[#FF7009]">반납 3회 지연</span>
              으로
              <br />
              대여 서비스가 제한되었습니다.
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
          </>
          )}
        </div>
      </div>
    </div>
  );
};
