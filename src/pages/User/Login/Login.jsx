import React from "react";

export default function Login() {
  return (
    <>
      <div className="w-full h-[calc(100vh-35px)] flex justify-center items-center">
        <div className="w-[75%] text-center">
          <div className="font-Ownglyph_PDH text-[#996515] text-[65px]">
            LOGIN
          </div>

          <form className="font-Moneygraphy">
            <div className="space-y-8 my-24">
              {/* 이름 입력 */}
              <div className="flex items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-lg h-11 px-4 py-2">
                <label className="mr-4 text-[#996515]">이름</label>
                <input
                  type="text"
                  placeholder="홍길동"
                  className="flex-grow outline-none text-[#996515]"
                />
              </div>

              {/* 학번 입력 */}
              <div className="flex items-center bg-[#FFFFFF] border border-[#D2B48C] rounded-lg px-4 py-2">
                <label className="mr-4 text-[#996515]">학번</label>
                <input
                  type="text"
                  placeholder="20251234"
                  className="flex-grow outline-none text-[#996515]"
                />
              </div>
            </div>

            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-24 h-9 bg-[#D2B48C80] text-[#583D2C80] rounded-lg text-lg">
              로그인
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
