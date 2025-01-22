import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";
import Login from "../pages/Admin/Login";
import RentalItems from "../pages/Admin/RentalItems/RentalItems";
import AddRentalItem from "../pages/Admin/RentalItems/addRentalItem";
import EditRentalItem from "../pages/Admin/RentalItems/editRentalItem";
import AdminHeader from "../components/AdminHeader";

const Admin = () => {
  return (
    // 배경 하얀색으로 깔려구 h설정함
    <div className="bg-[#ffffff] h-[100vh] px-4 py-8">
      <AdminHeader />
      <Routes>
        <Route path="/Main" element={<AdminMain />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/RentalItems" element={<RentalItems />} />
        <Route path="/AddRentalItem" element={<AddRentalItem />} />
        <Route path="/EditRentalItem/:id" element={<EditRentalItem />} />
      </Routes>
    </div>
  );
};

export default Admin;
