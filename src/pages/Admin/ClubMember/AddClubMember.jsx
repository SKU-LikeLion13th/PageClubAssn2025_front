import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { images } from '../../../utils/images';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaAngleDown } from "react-icons/fa6";
import { API_URL } from '../../../config';

export default function AddClubMember() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]); // 선택된 멤버 관리
  const [error, setError] = useState('');
  const [selectedClub, setSelectedClub] = useState('');
  const [clubs, setClubs] = useState([]); // 동아리 목록 상태 추가
  const [isOpen, setIsOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false); // 업로드 진행 상태를 관리
  const fileInputRef = useRef(null); // 파일 입력을 위한 ref
  const navigate = useNavigate();

  // API에서 동아리 목록 가져오기
  useEffect(() => {
    const fetchClubs = async () => {
      const token = localStorage.getItem('Token');
      if (!token) {
        setError('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/admin/club/summary`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        if (response.status === 200) {
          setClubs(response.data); // API에서 받아온 데이터 저장
          setSelectedClub(response.data[0]?.name || ''); // 기본 선택값 설정
        } else {
          throw new Error('Failed to fetch clubs');
        }
      } catch (error) {
        console.error('Error fetching clubs:', error);
        setError('동아리 데이터를 불러오는 데 실패했습니다.');
      }
    };

    fetchClubs();
  }, []);

  const handleSelect = (clubName) => {
    setSelectedClub(clubName);
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

        // 검색 결과가 없으면 에러 메시지 설정
        if (response.data.length === 0) {
          setError('존재하지 않는 멤버입니다. \n멤버 추가에서 먼저 추가해주세요.');
        } else {
          setError(''); // 검색 결과가 있으면 에러 메시지 초기화
        }
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

      await Promise.all(promises);
      alert('선택한 멤버가 성공적으로 추가되었습니다.');
      setSelectedMembers([]);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.error('Error adding members:', error);
      setError('멤버 추가 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleFileSelect = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    if (!['xlsx', 'xls'].includes(fileExtension)) {
      setError('엑셀 파일(.xlsx 또는 .xls)만 업로드 가능합니다.');
      return;
    }

    const token = localStorage.getItem('Token');
    if (!token) {
      setError('인증 토큰이 없습니다. 로그인 후 다시 시도해주세요.');
      return;
    }

    setIsUploading(true); // 업로드 시작 상태 설정
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(
        `${API_URL}/admin/excel/upload`, 
        formData,
        {
          headers: {
            'Authorization': `${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert('엑셀 파일이 성공적으로 업로드되었습니다.');
      }
    } catch (error) {
      console.error('파일 업로드 중 오류가 발생했습니다:', error);
      setError('파일 업로드에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

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
                  key={index} // 고유하지 않지만, 순서가 변경되지 않으면 괜찮을 수 있음
                  onClick={() => handleSelect(club.name)}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                >
                  {club.name}
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
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
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

      {isUploading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="flex items-center justify-center p-4 bg-white rounded-lg shadow-md animate-pulse">
            <span className="text-lg">파일을 업로드 중입니다. 잠시만 기다려주세요...</span>
          </div>
        </div>
      )}

      {/* 엑셀 파일 관리 버튼 및 파일 업로드 */}
      <div className='flex justify-end w-[80%]'>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
        />
        <div
          className={`flex w-fit h-fit px-3 py-0.5 text-[8px] font-Y_spotlight 
            ${isUploading ? 'bg-gray-400' : 'bg-[#D1D1D3] hover:bg-gray-300'} 
            rounded-[4px] mt-2 mb-2 cursor-pointer transition-colors`}
          onClick={handleFileSelect}
          style={{ pointerEvents: isUploading ? 'none' : 'auto' }}
        >
          {isUploading ? '업로드 중...' : '엑셀 파일 관리'}
        </div>
      </div>

      <div className="flex flex-col items-center border-[1px] border-[#3F3F3F] rounded-[12px] w-10/12 h-[500px] overflow-y-auto">
        <div className="flex justify-between w-[100%] text-[14px] h-fit py-1.5 border-b-[1px] border-[#3F3F3F]">
          <div className="flex justify-center w-1/3">학번</div>
          <div className="flex justify-center w-1/3">이름</div>
          <div className="flex justify-center w-1/3">선택</div>
        </div>

        {searchResults.map((result) => (
          <div className="flex w-full my-3 text-[13px]" key={result.studentId}> {/* studentId를 key로 사용 */}
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

        {error && (
          <div
            className="flex justify-center mt-11 text-center w-fit h-full text-[12px] text-red-500 my-3"
            style={{ whiteSpace: 'pre-line' }} // 줄바꿈을 반영하도록 설정
          >
            {error}
          </div>
        )}
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
