import React, { useState } from 'react';
import classroomData from '../../../utils/classroom.json';
import { IoCaretDownOutline } from "react-icons/io5";

export default function ClassList() {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");

  const handleBuildingChange = (e) => {
    const building = e.target.value;
    setSelectedBuilding(building);
    setRooms(classroomData[building]?.rooms || []);
    setSelectedRoom("");
    setSelectedImage("");
  };

  const handleRoomChange = (e) => {
    const room = e.target.value;
    setSelectedRoom(room);
  };

  const handleSearch = () => {
    if (selectedBuilding && selectedRoom) {
      const image = classroomData[selectedBuilding]?.images[selectedRoom];
      setSelectedImage(image || "");
    }
  };

  return (
    <div className="flex flex-col items-center text-[#996515]">
      {/* 제목 */}
      <div className="flex justify-center pt-6 text-[45px]">강의실 시간표</div>

      <div className="flex w-fit px-11 py-0.5 mt-11 font-Moneygraphy text-[10px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[15px] text-[#996515]">
        {/* 건물 선택 */}
        <div className="flex items-center">
          <select
            name="building"
            id="building"
            className="appearance-none"
            value={selectedBuilding}
            onChange={handleBuildingChange}
          >
            <option value="">건물</option>
            {Object.keys(classroomData).map((building) => (
              <option key={building} value={building}>
                {building}
              </option>
            ))}
          </select>
          <IoCaretDownOutline />
        </div>

        <div className="border-[#D2B48C] mx-7 border-r-[1px]"></div>

        {/* 강의실 선택 */}
        <div className="flex items-center">
          <select
            name="classroom"
            id="classroom"
            className="appearance-none"
            value={selectedRoom}
            onChange={handleRoomChange}
            disabled={!rooms.length} // 건물이 선택되지 않으면 비활성화
          >
            <option value="">강의실</option>
            {rooms.map((room) => (
              <option key={room} value={room}>
                {room}
              </option>
            ))}
          </select>
          <IoCaretDownOutline className="ml-2" />
        </div>
      </div>

      {/* 조회 버튼 */}
      <button
        className="flex w-fit px-4 mt-2 ml-[48%] justify-end text-[12px] bg-[#D2B48C] rounded-[11px]"
        onClick={handleSearch}
      >
        조회
      </button>

      {/* 선택된 건물 및 강의실 사진 */}
      {selectedImage && (
        <div className="flex flex-col items-center m-8">
          <img
            src={selectedImage}
            alt={`${selectedBuilding} ${selectedRoom}`}
            className="w-fit object-cover border border-[#D2B48C] rounded-[20px]"
          />
        </div>
      )}
    </div>
  );
}
