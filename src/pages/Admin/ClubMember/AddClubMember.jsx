import React, { useState } from 'react';
import { images } from '../../../utils/images';
import { NavLink } from 'react-router-dom';

export default function AddClubMember() {
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-10">
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px]">동아리원 관리</div>
        <div className="flex justify-end  w-10/12 mx-auto border-b-2 border-[#D1D1D3]">
          <div className="flex w-fit h-fit px-2 py-0.5 text-[8px] bg-[#D1D1D3] rounded-[4px] mb-2">+ 추가</div>
        </div>
      </div>

      <div className="flex justify-center px-3 items-center  w-10/12 mt-5 py-0.5 font-PretendardVariable max-w-[500px] border-[1px] border-[#3F3F3F] rounded-[50px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#D1D1D3]">
        <input
          type="text"
          placeholder="이름이나 학번 또는 소속 동아리명 입력해주세요."
          className="w-full text-center"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <img
          src={images.search}
          alt="search"
          className="flex cursor-pointer w-fit h-fit"
        />
      </div>

      <div className="flex justify-between w-10/12 my-2 text-[12px] text-[#FF4242] font-PretendardVariable">
        <div className="flex">선택할 동아리원이 없다면 멤버로 먼저 관리하세요.</div>
        <NavLink className="flex">
          멤버관리
          <img src={images.click} alt="click" className="w-fit h-fit" />
        </NavLink>
      </div>

      <div className='flex justify-end w-[80%]'>
        <div className="flex w-fit h-fit px-3 py-0.5 text-[8px] font-Y_spotlight bg-[#D1D1D3] rounded-[4px] mb-5">엑셀 파일 관리</div>
      </div>

      <div className=' flex border-[1px] border-[#3F3F3F] rounded-[12px] w-10/12 h-10/12'>
        <div className='flex justify-between w-[100%] h-fit py-1 border-b-[1px] border-[#3F3F3F]'>
          <div className='flex justify-center w-1/3'>학번</div>
          <div className='flex justify-center w-1/3'>이름</div>
          <div className='flex justify-center w-1/3'>선택</div>
        </div>
      </div>
    </div>
  )
}
