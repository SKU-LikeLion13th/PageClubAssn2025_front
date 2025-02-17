import React, { useState, useEffect } from 'react';
import { images } from '../../../utils/images';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import Modal from 'react-modal';
import { IoClose } from "react-icons/io5";

export default function DeleteMember() {
  const [studentId, setStudentId] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [message, setMessage] = useState('');
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState('');
  const [deleteAllModalIsOpen, setDeleteAllModalIsOpen] = useState(false);
  const token = localStorage.getItem('Token');

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  const handleSearch = async () => {
    // 검색어가 비어있는 경우 처리
    if (!studentId.trim()) {
      setMessage('검색어를 입력해주세요.');
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/admin/member/find?keyword=${encodeURIComponent(studentId)}`,
        {
          headers: {
            Authorization: `${token}`,
            Accept: '*/*',
          },
        }
      );

      // 검색 결과가 있는 경우
      if (response.data && response.data.length > 0) {
        setSearchResults(response.data);
        setMessage(''); // 이전 메시지 초기화
      } else {
        // 검색 결과가 없는 경우
        setSearchResults([]);
        setMessage('존재하지 않는 멤버입니다.');
      }
    } catch (error) {
      console.error('검색 중 오류 발생:', error);
      setSearchResults([]);
      setMessage('서버와의 연결에 실패했습니다.');
    }
  };

  // 나머지 기존 코드는 동일하게 유지...
  const handleDelete = (id) => {
    setCurrentStudentId(id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}/admin/member/delete?studentId=${encodeURIComponent(currentStudentId)}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      
      setMessage('삭제가 성공적으로 완료되었습니다.');
      setSearchResults((prevResults) => prevResults.filter((result) => result.studentId !== currentStudentId));
      setIsOpen(false);
      handleSearch();
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('학번이 올바른지 확인해주세요.');
      } else {
        setMessage('서버와의 연결에 실패했습니다.');
      }
    }
  };

  const handleDeleteAll = () => {
    setDeleteAllModalIsOpen(true);
  };
  
  const confirmDeleteAll = async () => {
    try {
      await axios.delete(`${API_URL}/admin/all-member`, {
        headers: {
          Authorization: `${token}`,
        },
      });
  
      setMessage('모든 멤버가 성공적으로 삭제되었습니다.');
      setSearchResults([]);
    } catch (error) {
      setMessage('서버와의 연결에 실패했습니다.');
    } finally {
      setDeleteAllModalIsOpen(false);
    }
  };
  
  const closeDeleteAllModal = () => {
    setDeleteAllModalIsOpen(false);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen mt-10">
      <div className="flex flex-col w-full font-Y_spotlight">
        <div className="flex justify-center text-[30px]">멤버 삭제</div>

        <div className='flex mt-2 justify-end w-10/12 mx-auto border-b-2 border-[#D1D1D3]'>
          <div className="flex">
            <NavLink to="/admin/addMember" className="flex w-fit h-fit px-2 py-0.5 text-[8px] bg-[#D1D1D3] rounded-[4px] mb-2">
              + 추가
            </NavLink>
          </div>
          <div className="flex ml-2">
          <NavLink
            to="#"
            className="flex w-fit h-fit px-2 py-0.5 text-[8px] bg-[#D1D1D3] rounded-[4px] mb-2"
            onClick={handleDeleteAll}
          >
            - 모든 멤버 삭제
          </NavLink>
          </div>
        </div>
      </div>

      <div className="flex justify-center px-3 items-center w-10/12 mt-5 py-0.5 font-PretendardVariable border-[1px] border-[#3F3F3F] rounded-[50px] text-[11px] focus:outline-none focus:ring-2 focus:ring-[#D1D1D3]">
        <input
          type="text"
          placeholder="학번 8자리 입력"
          className="w-full text-center"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && studentId.trim() !== '') { // studentId가 비어있지 않은 경우만 검색
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

      <div className="flex justify-between w-10/12 my-2 text-[11px] text-[#FF4242] font-PretendardVariable">
        <div className="flex">선택할 동아리원이 없다면 멤버로 먼저 관리하세요.</div>
        <NavLink to="/admin/memberManage" className="flex">
          멤버관리
          <img src={images.click} alt="click" className="ml-1 w-[15px] h-[15px]" />
        </NavLink>
      </div>

      {message && (
        <div className="flex justify-center w-10/12 font-PretendardVariable my-2 text-[12px] text-[#FF4242]">
          {message}
        </div>
      )}

      {searchResults.length > 0 && (
        <div className="flex flex-col w-10/12 mt-5">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="flex flex-col text-[13px] font-PretendardVariable border-b border-[#D1D1D3]]"
            >
              <div className='flex w-full'>
                <div className='flex w-1/2'>
                  <div className='flex'>이름</div>
                  <div className='flex ml-3 px-5 border-b border-[#D1D1D3]'>{result.name}</div>
                </div>

                <div className='flex w-1/2'>
                  <div className='flex'>학번</div>
                  <div className='flex ml-3 px-5 border-b border-[#D1D1D3]'>{result.studentId}</div>
                </div>
              </div>

              <div className='flex justify-end w-full my-3'>
                <button
                  className="flex w-fit h-fit px-3 py-0.5 text-[8px] font-Y_spotlight bg-[#D1D1D3] rounded-[4px]"
                  onClick={() => handleDelete(result.studentId)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center w-10/12 border-b-[2px] border-[#D1D1D3]"></div>

      {searchResults.length > 0 && (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Confirm Delete" style={{
          content: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 0,
            margin: 'auto',
            border: 'none',
            backgroundColor: 'transparent',
            width: 'fit-content',
          },
        }}>
          <div className='flex flex-col w-fit items-center font-PretendardVariable border-[1px] border-[#3F3F3F] rounded-[12px]'>
            <div className='flex justify-end w-full p-2'>
              <IoClose className='flex' onClick={closeModal} />
            </div>
            <div className='flex flex-col items-start w-full pb-5 px-14'>
              <div className='flex flex-col'>
                <div className='flex text-[10px]'>이름 : {searchResults[0].name}</div>
                <div className='flex text-[10px]'>학번 : {searchResults[0].studentId}</div>
              </div>

              <h2 className='flex justify-center w-full my-2'>삭제하시겠습니까?</h2>

              <div className='flex justify-center w-full'>
                <button className='flex px-2.5 py-0.5 text-[10px] rounded-[4px] mr-2 bg-[#D1D1D3]' onClick={confirmDelete}>예</button>
                <button className='flex px-2.5 py-0.5 text-[10px] rounded-[4px] bg-[#D1D1D380]' onClick={closeModal}>아니요</button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      <Modal isOpen={deleteAllModalIsOpen} onRequestClose={closeDeleteAllModal} contentLabel="Confirm Delete All" style={{
        content: {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 0,
          margin: 'auto',
          border: 'none',
          backgroundColor: 'transparent',
          width: 'fit-content',
        },
      }}>
        <div className='flex flex-col w-fit items-center font-PretendardVariable border-[1px] border-[#3F3F3F] rounded-[12px]'>
          <div className='flex justify-end w-full p-2'>
            <IoClose className='flex' onClick={closeDeleteAllModal} />
          </div>
          <div className='flex flex-col items-center w-full pb-5 px-14'>
            <h2 className='flex justify-center w-full my-2'>모든 멤버를 삭제하시겠습니까?</h2>
            <div className='flex justify-center w-full'>
              <button className='flex px-2.5 py-0.5 text-[10px] rounded-[4px] mr-2 bg-[#D1D1D3]' onClick={confirmDeleteAll}>예</button>
              <button className='flex px-2.5 py-0.5 text-[10px] rounded-[4px] bg-[#D1D1D380]' onClick={closeDeleteAllModal}>아니요</button>
            </div>
          </div>
        </div>
      </Modal>

    </div>
  );
}
