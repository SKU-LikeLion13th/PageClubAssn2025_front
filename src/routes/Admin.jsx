import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";
import ClubMember from "../pages/Admin/ClubMember/ClubMember";
import AddClubMember from "../pages/Admin/ClubMember/AddClubMember";
import AddMember from "../pages/Admin/ClubMember/AddMember";
import DeleteMember from "../pages/Admin/ClubMember/DeleteMember";
import MemberManage from '../pages/Admin/ClubMember/MemberManage';
import Login from "../pages/Admin/Login";
import RentalStatus from "../pages/Admin/ItemsStatus/RentalStatus";
import ReserveStatus from "../pages/Admin/ItemsStatus/ReserveStatus";
import RentalItems from "../pages/Admin/RentalItems/RentalItems";
import AddRentalItem from "../pages/Admin/RentalItems/addRentalItem";
import EditRentalItem from "../pages/Admin/RentalItems/editRentalItem";
import AdminHeader from "../components/AdminHeader";

const Admin = () => {
  return (
    // 배경 하얀색으로 깔려구 h설정함
    <div className="bg-[#ffffff] min-h-screen px-4 py-8">
      <AdminHeader />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Main" element={<AdminMain />} />
        <Route path="/RentalItems" element={<RentalItems />} />
        <Route path="/AddRentalItem" element={<AddRentalItem />} />
        <Route path="/EditRentalItem/:id" element={<EditRentalItem />} />
        <Route path="/rentalstatus" element={<RentalStatus/>}/>
        <Route path="/reservestatus" element={<ReserveStatus/>}/>
        <Route path="/adminMain" element={<AdminMain />} />
        <Route path="/clubMember" element={<ClubMember />} />
        <Route path="/addclubMember" element={<AddClubMember />} />
        <Route path="/addMember" element={<AddMember />} />
        <Route path="/deleteMember" element={<DeleteMember />} />
        <Route path="/memberManage" element={<MemberManage />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default Admin;
