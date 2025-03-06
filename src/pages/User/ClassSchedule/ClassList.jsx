import React, { useState, useRef, useEffect } from 'react';
import classroomData from '../../../utils/classroom.json';
import { IoCaretDownOutline } from "react-icons/io5";

export default function ClassList() {
  const [selectedBuilding, setSelectedBuilding] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [rooms, setRooms] = useState([]);
  const [selectedImage, setSelectedImage] = useState("");
  const [isBuildingOpen, setIsBuildingOpen] = useState(false);
  const [isRoomOpen, setIsRoomOpen] = useState(false);
  
  const buildingDropdownRef = useRef(null);
  const roomDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buildingDropdownRef.current && !buildingDropdownRef.current.contains(event.target)) {
        setIsBuildingOpen(false);
      }
      if (roomDropdownRef.current && !roomDropdownRef.current.contains(event.target)) {
        setIsRoomOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleBuildingSelect = (building) => {
    setSelectedBuilding(building);
    setRooms(classroomData[building]?.rooms || []);
    setSelectedRoom("");
    setSelectedImage("");
    setIsBuildingOpen(false);
  };

  const handleRoomSelect = (room) => {
    setSelectedRoom(room);
    setIsRoomOpen(false);
  };

  const handleSearch = () => {
    if (selectedBuilding && selectedRoom) {
      const image = classroomData[selectedBuilding]?.images[selectedRoom];
      setSelectedImage(image || "");
    }
  };

  return (
    <div className="flex flex-col items-center text-[#996515]">
      <div className="flex justify-center pt-6 text-[45px]">강의실 시간표</div>

      <div className="flex w-9/12 px-12 py-1 mt-8 font-Moneygraphy text-[10px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[15px] text-[#996515]">
        {/* 건물 선택 */}
        <div className="relative w-full" ref={buildingDropdownRef}>
          <div 
            className="flex items-center justify-between w-full cursor-pointer"
            // onClick={() => setIsBuildingOpen(!isBuildingOpen)}
          >
            <span>{selectedBuilding || "건물"}</span>
            <IoCaretDownOutline />
          </div>
          
          {isBuildingOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#D2B48C] rounded-md shadow-lg z-10">
              {Object.keys(classroomData).map((building) => (
                <div
                  key={building}
                  className="px-2 py-1 hover:bg-[#F5DEB3] cursor-pointer"
                  onClick={() => handleBuildingSelect(building)}
                >
                  {building}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="border-[#D2B48C] mx-7 border-r-[1px]"></div>

        {/* 강의실 선택 */}
        <div className="relative w-full" ref={roomDropdownRef}>
          <div 
            className="flex items-center justify-between w-full cursor-pointer"
            onClick={() => rooms.length > 0 && setIsRoomOpen(!isRoomOpen)}
          >
            <span>{selectedRoom || "강의실"}</span>
            <IoCaretDownOutline />
          </div>
          
          {isRoomOpen && (
            <div className="absolute top-full left-0 w-full mt-1 bg-white border border-[#D2B48C] rounded-md shadow-lg z-10">
              {rooms.map((room) => (
                <div
                  key={room}
                  className="px-2 py-1 hover:bg-[#F5DEB3] cursor-pointer"
                  onClick={() => handleRoomSelect(room)}
                >
                  {room}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <button
        className="flex w-fit px-4 mt-2 ml-[62%] justify-end text-[12px] bg-[#D2B48C] rounded-[11px]"
        onClick={handleSearch}
      >
        조회
      </button>

      <div className="flex flex-col items-center m-8">
        {selectedImage ? (
          <img
            src={selectedImage}
            alt={`${selectedBuilding} ${selectedRoom}`}
            className="w-fit object-cover border border-[#D2B48C] rounded-[20px]"
          />
        ) : (
          <div className="w-[265%] h-[25rem] flex items-center justify-center font-Moneygraphy text-[15px] bg-[#ffffff] border-[1px] border-[#D2B48C] rounded-[13px] text-[#996515]">
            Coming Soon!
          </div>
        )}
      </div>
    </div>
  );
}
