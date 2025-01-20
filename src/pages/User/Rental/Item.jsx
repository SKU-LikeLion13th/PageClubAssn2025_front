import React from 'react';
import { images } from '../../../utils/images';

const Item = () => {
    return (
        <div className='bg-white w-full rounded-xl h-[150px] px-5 py-4 border-[2px] border-[#D2B48C]'>
          <div className="item flex justify-start text-xs h-full">
            <div className="img-status flex flex-col h-full justify-between items-center w-[37%]">
              <img src={images.cushion} className="w-full" alt="이미지" />
              <p className='rounded-xl px-[9px] py-1 bg-[#FFCB99]'>대여 가능</p>
            </div>
            <div className="itemcontent pl-4 w-full">
              <div className="itemname flex justify-between items-center mb-1"> 
                <p className='text-xl'>기도방석</p>
                <button className='rounded-xl px-4 h-5 bg-[#D2B48C] text-[#583D2C]'>예약하기</button> 
              </div>
              <img src={images.line} className='pb-2 pt-1'/>
              <div className="grid grid-cols-2 text-center gap-5 mt-2">
                <p className='rounded-lg border-[1px] border-[#D2B48C]'>총 개수 : 0개</p>
                <p className='rounded-lg border-[1px] border-[#D2B48C]'>대여 중 : 0개</p>
                <p className='rounded-lg border-[1px] border-[#D2B48C]'>예약 대기 : 0개</p>
                <p className='rounded-lg border-[1px] border-[#D2B48C]'>대여 가능 : 0개</p>
              </div>
            </div>
          </div>
        </div>
    );
};

export default Item;