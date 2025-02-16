import React from 'react'
import { images } from '../../../utils/images';
import { NavLink } from 'react-router-dom';

export default function MemberManage() {
  return (
    <div className='flex flex-col items-center w-full min-h-screen mt-10'>
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px] mb-5">멤버 관리</div>
        <div className="flex justify-end w-10/12 mx-auto border-b-2 border-[#D1D1D3]"></div>
      </div>

      <div className='flex flex-col items-center w-10/12 text-[15x] text-[#FF4242] font-PretendardVariable mt-12'>
        <NavLink to='/admin/addMember' className='flex items-center mb-5'>
          <div className='flex'>멤버 추가</div>
          <img src={images.click} alt="click" className="ml-2 w-[15px] h-[15px]" />
        </NavLink>
        
        <NavLink to='/admin/deleteMember' className='flex items-center'>
          <div className='flex'>멤버 삭제</div>
          <img src={images.click} alt="click" className="ml-2 w-[15px] h-[15px]" />
        </NavLink>
      </div>
    </div>
  )
}
