import React, { useState } from 'react';
import axios from 'axios';
import { images } from '../../../utils/images';
import { NavLink, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';
import Modal from 'react-modal';
import { IoClose } from 'react-icons/io5';

export default function ClubMember() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem('Token');
  const userRole = localStorage.getItem('role');

  const handleDelete = (member) => {
    setSelectedMember(member);
    setModalIsOpen(true);
  };
  
  // 검색 버튼 클릭 시 호출되는 함수
  const handleSearch = async () => {
    if (!token || userRole !== 'ROLE_ADMIN') {
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
      setSearchResults(response.data);
      console.log(response.data);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.clear();
        navigate('/admin/login');
      }
      console.error(err);
    }
  };

  const openModal = (member) => {
    setSelectedMember(member);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedMember(null);
    setModalIsOpen(false);
  };

  const confirmDelete = async () => {
    if (!selectedMember) return;
  
    try {
      await axios.delete(
        `${API_URL}/admin/join-club`, 
        {
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            clubName: selectedMember.clubName,
            memberId: selectedMember.studentId
          },
        }
      );
      setSearchResults((prevResults) =>
        prevResults.filter((result) => result.studentId !== selectedMember.studentId)
      );
      setDeleteSuccess(true); // 삭제 성공 상태 업데이트
      setTimeout(() => setDeleteSuccess(false), 3000); // 3초 후 상태 초기화
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px]">동아리원 관리</div>
        <div className="flex justify-end w-10/12 mx-auto border-b-2 border-[#D1D1D3]">
          <NavLink to='/admin/addClubMember' className="flex w-fit h-fit px-2 py-0.5 text-[8px] bg-[#D1D1D3] rounded-[4px] mb-2">+ 추가</NavLink>
        </div>
      </div>

      <div className="flex justify-center px-3 items-center w-10/12 mt-5 py-0.5 font-PretendardVariable border-[1px] border-[#3F3F3F] rounded-[50px] text-[11px] focus:outline-none focus:ring-2 focus:ring-[#D1D1D3]">
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
          className="flex w-[15px] cursor-pointer h-[15px]"
          onClick={handleSearch}
        />
      </div>

      {searchResults.length === 0 && (
        <div className="flex justify-between w-10/12 my-2 text-[11px] text-[#FF4242] font-PretendardVariable">
          <div className="flex">선택할 동아리원이 없다면 멤버로 먼저 관리하세요.</div>
          <NavLink to="/admin/memberManage" className="flex">
            멤버관리
            <img src={images.click} alt="click" className="ml-1 w-[15px] h-[15px]" />
          </NavLink>
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="flex flex-col w-10/12 border-t-[2px] border-[#D1D1D3] mt-5">
          {searchResults.map((result, index) => (
            <div
              key={`${result.studentId}-${index}`}
              className="flex flex-col text-[13px] font-PretendardVariable border-b-[2px] border-[#D1D1D3]"
            >
              <div className='flex flex-col w-full mt-5'>
                    <div className='flex mb-3'>
                      <div className='flex w-1/2'>
                        <div className='flex'>이름</div>
                        <div className='flex ml-3 px-5 border-b border-[#D1D1D3]'>{result.studentName}</div>
                      </div>
                      <div className='flex w-1/2'>
                        <div className='flex'>학번</div>
                        <div className='flex ml-3 px-5 border-b border-[#D1D1D3]'>{result.studentId}</div>
                      </div>
                    </div>

                    <div className='flex justify-center w-full'>
                        <div className='flex'>소속 동아리</div>
                        <div className='flex ml-3 px-5 border-b border-[#D1D1D3]'>{result.clubName}</div>
                      </div>
                  </div>

                  <div className='flex justify-end w-full my-3'>
                    <button
                      className="flex w-fit h-fit px-3 py-0.5 text-[8px] font-Y_spotlight bg-[#D1D1D3] rounded-[4px]"
                      onClick={() => handleDelete(result)}
                    >
                      삭제
                    </button>
                  </div>
            </div>
          ))}
        </div>
      )}

      {/* 삭제 확인 모달 */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Confirm Delete"
        ariaHideApp={false}
        style={{
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            border: 'none',
            backgroundColor: 'transparent',
          },
        }}
      >
        <div className='flex flex-col items-start w-fit font-PretendardVariable border-[1px] border-[#3F3F3F] rounded-[12px]'>
          <div className='flex justify-end w-full p-2'>
            <IoClose className='flex cursor-pointer' onClick={closeModal} />
          </div>
          <div className='flex flex-col items-start w-full pb-5 px-14'>
            {deleteSuccess ? (
              <div className='flex justify-center w-full my-2 text-[13px] text-[#FF4242]'>
                삭제가 완료되었습니다.
              </div>
            ) : (
              <>
                <div className='flex flex-col'>
                  <div className='flex text-[10px]'>이름 : <div className='ml-3'>{selectedMember?.studentName}</div></div>
                  <div className='flex text-[10px]'>학번 : <div className='ml-3'>{selectedMember?.studentId}</div></div>
                  <div className='flex text-[10px]'>동아리 : <div className='ml-3'>{selectedMember?.clubName}</div></div>
                </div>
                <h2 className='flex justify-center w-full my-2'>삭제하시겠습니까?</h2>            
                <div className='flex justify-center w-full mt-3'>
                  <button
                    className='flex px-2.5 py-0.5 text-[10px] rounded-[4px] mr-2 bg-[#D1D1D3]'
                    onClick={() => confirmDelete(selectedMember)}
                  >
                    예
                  </button>
                  <button
                    className='flex px-2.5 py-0.5 text-[10px] rounded-[4px] bg-[#D1D1D380]'
                    onClick={closeModal}
                  >
                    아니요
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}
