import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";
import ClubMember from "../pages/Admin/ClubMember/ClubMember";
import AddClubMember from "../pages/Admin/ClubMember/AddClubMember";
import Login from "../pages/Admin/Login";

const Admin = () => {
  return (
    // 배경 하얀색으로 깔려구 h설정함
    <div className="bg-[#ffffff] h-[100vh]">
      <Routes>
        <Route path="/adminMain" element={<AdminMain />} />
        <Route path="/clubMember" element={<ClubMember />} />
        <Route path="/addclubMember" element={<AddClubMember />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Admin;