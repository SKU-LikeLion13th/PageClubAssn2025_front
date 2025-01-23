import React, { useState } from 'react';
import { images } from '../../../utils/images';
import { NavLink } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";

export default function AddClubMember() {
    const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태
    const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-10 font-PretendardVariable">
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px] mb-5">동아리원 추가</div>
        <div className="flex justify-end w-10/12 mx-auto border-b-2 border-[#D1D1D3]"></div>
      </div>

      <div className='flex justify-between w-10/12 mt-3'>
        <div className='flex items-center'>
          <div className='flex text-[15px]'>동아리연합회</div>
          <FaAngleDown className='flex ml-2' />
        </div>
        
        <div className='flex items-center w-1/3 border-b-[1px] border-[#D1D1D3]'>
          <input placeholder='학번 또는 이름' className='flex text-center outline-none w-full text-[12px]'/>
          <img src={images.search} alt="search" className='flex w-fit h-fit' />
        </div>
      </div>

      <div className="flex justify-between w-10/12 my-2 text-[11px] text-[#FF4242] font-PretendardVariable">
        <div className="flex">선택할 동아리원이 없다면 멤버로 먼저 관리하세요.</div>
        <NavLink className="flex">
          멤버관리
          <img src={images.click} alt="click" className="w-fit h-fit" />
        </NavLink>
      </div>

      <div className='flex justify-end w-[80%]'>
        <div className="flex w-fit h-fit px-3 py-0.5 text-[8px] font-Y_spotlight bg-[#D1D1D3] rounded-[4px] mt-2 mb-2">엑셀 파일 관리</div>
      </div>

      <div className='flex flex-col items-center border-[1px] border-[#3F3F3F] rounded-[12px] w-10/12 h-[500px]'>
        <div className='flex justify-between w-[100%] text-[14px] h-fit py-1.5 border-b-[1px] border-[#3F3F3F]'>
          <div className='flex justify-center w-1/3'>학번</div>
          <div className='flex justify-center w-1/3'>이름</div>
          <div className='flex justify-center w-1/3'>선택</div>
        </div>

        <div className='flex w-full my-3 text-[13px]'>
          <div className='flex justify-center w-1/3'>학번</div>
          <div className='flex justify-center w-1/3'>이름</div>
          <label className='flex justify-center w-1/3'>
            <input type='checkbox' className='flex justify-center' />
          </label>
        </div>
      </div>

      <div className="flex w-fit h-fit px-2 py-0.5 text-[8px] bg-[#D1D1D3] rounded-[4px] mt-5">+ 추가</div>
    </div>
  )
}
