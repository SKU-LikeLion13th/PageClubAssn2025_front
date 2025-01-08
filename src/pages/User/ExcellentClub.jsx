import React from 'react';

export default function ExcellentClub() {
    return (
        <div className='relative font-Ownglyph_PDH text-[#996516]'>
            {/* 리본 배경 */}
            <div className='flex absolute z-[0] top-[220px] left-[149px] w-[226px] h-[250px] bg-center bg-cover' style={{ backgroundImage: `url('assets/images/ribbon2.png')` }}></div>
            <div className='flex absolute z-[0] top-[415px] w-[253px] h-[255px] bg-center bg-cover' style={{ backgroundImage: `url('assets/images/ribbon1.png')` }}></div>
            
            {/* content */}
            <div className='flex flex-col items-center'>
                <div className='flex text-[25.5px] 
                border-[0.5px] border-[#996515] bg-[#fdfdfd] rounded-[62px] 
                mt-10 px-8 py-1'>1분기 활동 점수 TOP3</div>

                <div className='flex flex-col mt-12'>
                    <div className='flex h-max-fit'>
                        <div className='flex flex-col items-center justify-end'>
                            <img className='size-[60px]' src="assets/images/pegasuss.png" alt="페가수스" />
                            <div className='flex my-1 mx-auto font-Moneygraphy text-[8px] text-[#3f3f3f]'>페가수스</div>
                            <div className='flex justify-center items-center w-[90px] h-[80px] bg-[#D2B48C] bg-opacity-20 rounded-t-[10px]'>2</div>
                        </div>
            
                        <div className='flex flex-col items-center justify-end'>
                            <img className='mb-1 size-6' src="assets/images/Win.png" alt="win" />
                            <img className='size-[80px]' src="assets/images/likelion.png" alt="페가수스" />
                            <div className='flex my-1 mx-auto font-Moneygraphy text-[8px] text-[#3f3f3f]'>성결대학교 멋쟁이사자처럼</div>
                            <div className='flex justify-center items-center mx-2 w-[90px] h-[100px] bg-[#D2B48C] bg-opacity-20 rounded-t-[10px]'>1</div>
                        </div>

                        <div className='flex flex-col items-center justify-end'>
                            <img className='size-[50px]' src="assets/images/admin.png" alt="페가수스" />
                            <div className='flex my-1 mx-auto font-Moneygraphy text-[8px] text-[#3f3f3f]'>애드마인</div>
                            <div className='flex justify-center items-center w-[90px] h-[60px] bg-[#D2B48C] bg-opacity-20 rounded-t-[10px]'>3</div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col font-Moneygraphy absolute z-[20] top-[400px] w-[330px] bg-[#ffffff] border-[1px] border-[#d2b48c] rounded-[10px]'>
                    <div className='flex px-3 py-4'>
                        <div className='flex justify-start text-[14px] w-[50px]'>1st</div>
                        <div className='flex justify-center text-[15px] flex-grow'>성결대 멋쟁이사자처럼</div>
                        <div className='flex justify-end text-[10px]'>
                            <div className='flex px-2 items-center border-[1px] border-[#d2b48c] rounded-[20px]'>300점</div>
                        </div>
                    </div>

                    <div className='flex px-3 py-4 border-y-[1px] border-[#d2b48c]'>
                        <div className='flex justify-start text-[14px] w-[50px]'>2nd</div>
                        <div className='flex justify-center text-[15px] flex-grow'>페가수스</div>
                        <div className='flex justify-end text-[10px]'>
                            <div className='flex px-2 items-center border-[1px] border-[#d2b48c] rounded-[20px]'>200점</div>
                        </div>
                    </div>

                    <div className='flex px-3 py-4'>
                        <div className='flex justify-start text-[14px] w-[50px]'>3rd</div>
                        <div className='flex justify-center text-[15px] flex-grow'>애드마인</div>
                        <div className='flex justify-end text-[10px]'>
                            <div className='flex px-2 items-center border-[1px] border-[#d2b48c] rounded-[20px]'>100점</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
