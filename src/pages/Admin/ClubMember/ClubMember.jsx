import React, { useState } from 'react';
import axios from 'axios';
import { images } from '../../../utils/images';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

export default function ClubMember() {
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 키워드 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [error, setError] = useState(''); // 에러 상태
  // const navigate = useNavigate();

  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = async () => {
    const token = localStorage.getItem('Token');
    const userRole = localStorage.getItem('role');
    console.log(token);
  
    if (!token) {
      setError('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }
  
    if (userRole !== 'ROLE_ADMIN') {
      setError('관리자 권한이 없습니다.');
      return;
    }
  
    try {
      const response = await axios.get(
        `${API_URL}/admin/join-club/search?keyword=${encodeURIComponent(searchKeyword)}`,
        {
          headers: {
            Authorization: `${token}`,
            Accept: '*/*',
          },
        }
      );
      console.log(response);
      setSearchResults(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        setError('인증 오류: 다시 로그인 해주세요.');
        // localStorage.clear();
        // navigate('/admin/login');
      } else {
        setError('검색 중 문제가 발생했습니다.');
      }
      console.error(err);
    }
  };
  

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px]">동아리원 관리</div>
        <div className="flex justify-end w-10/12 mx-auto border-b-2 border-[#D1D1D3]">
          <div className="flex w-fit h-fit px-2 py-0.5 text-[8px] bg-[#D1D1D3] rounded-[4px] mb-2">+ 추가</div>
        </div>
      </div>

      <div className="flex justify-center px-3 items-center w-10/12 mt-5 py-0.5 font-PretendardVariable max-w-[500px] border-[1px] border-[#3F3F3F] rounded-[50px] text-[14px] focus:outline-none focus:ring-2 focus:ring-[#D1D1D3]">
        <input
          type="text"
          placeholder="이름이나 학번 또는 소속 동아리명 입력해주세요."
          className="w-full text-center"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        <img
          src={images.search}
          alt="search"
          className="flex cursor-pointer w-fit h-fit"
          onClick={handleSearch} // 클릭 이벤트 추가
        />
      </div>

      <div className="flex justify-between w-10/12 my-2 text-[12px] text-[#FF4242] font-PretendardVariable">
        <div className="flex">선택할 동아리원이 없다면 멤버로 먼저 관리하세요.</div>
        <NavLink className="flex">
          멤버관리
          <img src={images.click} alt="click" className="w-fit h-fit" />
        </NavLink>
      </div>

      {error && <div className="mt-2 text-sm text-red-500">{error}</div>}

      {searchResults.length > 0 && (
        <div className="flex flex-col w-10/12 mt-5">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="flex justify-between p-2 text-sm border-b border-gray-300"
            >
              <div>
                <div>이름</div>
                <div>{result.studentName}</div>
              </div>

              <div>
                <div>학번</div>
                <div>({result.studentId})</div>
              </div>

              <div>
                <div>소속 동아리</div>
                <div>{result.clubName}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end w-10/12 border-b-[2px] border-[#D1D1D3]">
        <div className="flex w-fit h-fit px-3 py-0.5 text-[8px] font-Y_spotlight bg-[#D1D1D3] rounded-[4px] mb-5">삭제</div>
      </div>
    </div>
  );
}
