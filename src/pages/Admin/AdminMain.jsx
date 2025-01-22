import React from "react";

export default function Admin() {
  const menuItems = [
    { label: "물품 예약 현황", link: "/admin/" },
    { label: "물품 대여 현황", link: "/admin/" },
    { label: "대여 물품 관리", link: "/admin/RentalItems" },
    { label: "동아리원 관리", link: "/admin/" },
    { label: "동아리 관리", link: "/admin/" },
    { label: "활동 점수 관리", link: "/admin/" },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-[#ffffff] text-[#585858]">
      <div className="mt-4">
        <img
          src="/assets/images/PageLogo.png"
          alt=""
          className="w-[55px] h-[44px]"
        />
      </div>

      {/* Main Content */}
      <main className="mt-6 flex flex-col items-center gap-6 w-60 font-Y_spotlight text-[28px]">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => (window.location.href = item.link)}
            className="w-[13rem] h-[4.2rem] py-3 border border-[#585858] rounded-lg text-center hover:bg-white hover:text-black transition"
          >
            {item.label}
          </button>
        ))}
      </main>
    </div>
  );
}
