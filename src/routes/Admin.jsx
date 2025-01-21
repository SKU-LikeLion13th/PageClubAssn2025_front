import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";

const User = () => {
  return (
    // 배경 하얀색으로 깔려구 h설정함
    <div className="bg-[#ffffff] h-[100vh]">
      <Routes>
        <Route path="/Main" element={<AdminMain />} />
      </Routes>
    </div>
  );
};

export default User;
