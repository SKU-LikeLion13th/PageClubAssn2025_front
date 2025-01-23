import React, { useState, useEffect } from 'react';
import axios from 'axios'; // axios import
import { images } from '../../../utils/images';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { API_URL } from '../../../config';

export default function AddClubMember() {
  const clubs = [
    "멋쟁이사자처럼",
    "동아리연합회",
    "애드마인",
    "페가수스"
  ];

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]); // 선택된 멤버 관리
  const [error, setError] = useState('');
  const [selectedClub, setSelectedClub] = useState(clubs[0]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (club) => {
    setSelectedClub(club);
    setIsOpen(false); // 선택 시 드롭다운 닫힘
  };

  const handleClickOutside = (e) => {
    if (isOpen && e.target.closest('.relative') === null) {
      setIsOpen(false); // 외부 클릭 시 닫히게
    }
  };

  const handleSearch = async () => {
    const token = localStorage.getItem('Token');
    const userRole = localStorage.getItem('role');

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
        `${API_URL}/admin/member/find?keyword=${encodeURIComponent(searchKeyword)}`, {
          headers: {
            Authorization: `${token}`,
            Accept: '*/*',
          },
        });

      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
        throw new Error('Network response was not ok');
      }

    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const handleCheckboxChange = (member) => {
    setSelectedMembers((prevSelected) => {
      if (prevSelected.includes(member)) {
        // 이미 선택된 멤버라면 제거
        return prevSelected.filter((m) => m !== member);
      } else {
        // 새로 선택된 멤버 추가
        return [...prevSelected, member];
      }
    });
  };

  const handleAddMembers = async () => {
    const token = localStorage.getItem('Token');

    if (!token) {
      setError('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    try {
      const promises = selectedMembers.map((member) =>
        axios.post(
          `${API_URL}/admin/join-club/add`,
          {
            studentId: member.studentId,
            studentName: member.name,
            clubName: selectedClub,
          },
          {
            headers: {
              Authorization: `${token}`,
              Accept: '*/*',
              'Content-Type': 'application/json',
            },
          }
        )
      );

      await Promise.all(promises); // 모든 요청 완료 시까지 대기
      alert('선택한 멤버가 성공적으로 추가되었습니다.');
      setSelectedMembers([]); // 선택 초기화
      navigate('/admin/clubMember');
    } catch (error) {
      console.error('Error adding members:', error);
      setError('멤버 추가 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside); // 외부 클릭 이벤트
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, [isOpen]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-10 font-PretendardVariable">
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px] mb-5">동아리원 추가</div>
        <div className="flex justify-end w-10/12 mx-auto border-b-2 border-[#D1D1D3]"></div>
      </div>

      <div className="flex justify-between w-10/12 mt-3">
        <div className="relative flex items-center" onClick={() => setIsOpen(!isOpen)}>
          <div className="flex text-[14px]">{selectedClub}</div>
          <FaAngleDown className="flex ml-2 cursor-pointer" />
          {isOpen && (
            <div className="absolute mt-2 text-[14px] w-full bg-white border rounded shadow -left-1 top-5">
              {clubs.map((club, index) => (
                <div
                  key={index}
                  onClick={() => handleSelect(club)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {club}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center w-1/3 border-b-[1px] border-[#D1D1D3]">
          <input
            placeholder="학번 또는 이름"
            className="flex text-center outline-none w-full text-[12px]"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <img src={images.search} alt="search" className="flex w-[15px] h-[15px]" onClick={handleSearch} />
        </div>
      </div>

      <div className="flex justify-between w-10/12 my-2 text-[11px] text-[#FF4242] font-PretendardVariable">
        <div className="flex">선택할 동아리원이 없다면 멤버로 먼저 관리하세요.</div>
        <NavLink to='/admin/memberManage' className="flex">
          멤버관리
          <img src={images.click} alt="click" className="ml-1 w-[15px] h-[15px]" />
        </NavLink>
      </div>

      <div className='flex justify-end w-[80%]'>
        <div className="flex w-fit h-fit px-3 py-0.5 text-[8px] font-Y_spotlight bg-[#D1D1D3] rounded-[4px] mt-2 mb-2">엑셀 파일 관리</div>
      </div>

      <div className="flex flex-col items-center border-[1px] border-[#3F3F3F] rounded-[12px] w-10/12 h-[500px]">
        <div className="flex justify-between w-[100%] text-[14px] h-fit py-1.5 border-b-[1px] border-[#3F3F3F]">
          <div className="flex justify-center w-1/3">학번</div>
          <div className="flex justify-center w-1/3">이름</div>
          <div className="flex justify-center w-1/3">선택</div>
        </div>

        {searchResults.map((result, index) => (
          <div className="flex w-full my-3 text-[13px]" key={index}>
            <div className="flex justify-center w-1/3">{result.studentId}</div>
            <div className="flex justify-center w-1/3">{result.name}</div>
            <label className="flex justify-center w-1/3">
              <input
                type="checkbox"
                className="flex justify-center"
                onChange={() => handleCheckboxChange(result)}
              />
            </label>
          </div>
        ))}
      </div>

      <div
        className="flex w-fit h-fit px-2 py-0.5 text-[8px] bg-[#D1D1D3] rounded-[4px] mt-5 cursor-pointer"
        onClick={handleAddMembers}
      >
        + 추가
      </div>
    </div>
  );
}
