import React, { useState, useEffect } from "react";
import { FaPencil } from "react-icons/fa6";
import { BiSolidTrash } from "react-icons/bi";
import axios from "axios";
import { API_URL } from "../../../config";
import ClubDeleteModal from "./ClubDeleteModal";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading";

// 개별 동아리
function ClubItem({ club, onDeleteClick }) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-2 border-t-2 border-gray-300">
      <p className="text-[15px]">{club.name}</p>
      <div className="flex">
        <button
          onClick={() => navigate("/admin/club-edit", { state: { club } })}
          className="font-Y_spotlight h-[16px] w-[42px] text-[7.08px] text-[#3F3F3F] flex justify-center items-center">
          <FaPencil className="text-[#D1D1D3] mr-1" />
          수정
        </button>
        <button
          onClick={() => onDeleteClick(club)}
          className="text-[7.08px] text-[#FF4242] flex justify-center items-center">
          <BiSolidTrash size={14} />
        </button>
      </div>
    </div>
  );
}

export default function ClubManagement() {
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("Token");
      if (!token) {
        throw new Error("토큰이 없습니다. 로그인하세요.");
      }

      const response = await axios.get(`${API_URL}/admin/club/all`, {
        headers: {
          Authorization: `${token}`,
        },
      });

      setClubs(response.data);
    } catch (error) {
      const errorStatus = error.status;
      if (errorStatus == 401) {
        navigate("/admin/adminlogin");
      } else {
        console.error("동아리 데이터 받아오기 실패", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  const handleDeleteClick = (club) => {
    setSelectedClub(club);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedClub(null);
  };

  const handleDeleteConfirm = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token || !selectedClub) return;

      await axios.delete(`${API_URL}/admin/club`, {
        headers: {
          Authorization: `${token}`,
        },
        data: {
          id: selectedClub.id,
        },
      });

      // 모달 닫고 데이터 새로고침
      handleCloseModal();
      fetchClubs();
    } catch (error) {
      const errorStatus = error.status;
      if (errorStatus == 401) {
        navigate("/admin/adminlogin");
      } else {
        console.error("동아리 삭제 중 오류 발생:", error);
      }
    }
  };

  return (
    <div className="min-h-screen mx-6 mt-6 font-Y_spotlight">
      {/* 타이틀 */}
      <div>
        <p className="text-[30px] text-center">동아리 관리</p>
        <div className="flex justify-end mb-3">
          <button
            className="h-[16px] w-[42px] text-[7.08px] text-[#3F3F3F] bg-gray-300 rounded-[4.72px]"
            onClick={() => {
              navigate("/admin/club-add");
            }}>
            + 추가
          </button>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="font-PretendardVariable">
          {clubs.map((club) => (
            <ClubItem
              key={club.id}
              club={club}
              onDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      )}

      {showDeleteModal && (
        <ClubDeleteModal
          club={selectedClub}
          onClose={handleCloseModal}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
