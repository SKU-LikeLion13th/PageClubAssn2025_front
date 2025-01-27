import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminHeader from "../components/AdminHeader";
import AdminMain from "../pages/Admin/AdminMain";
import AdminLogin from "../pages/Admin/AdminLogin";
import RentalItems from "../pages/Admin/RentalItems/RentalItems";
import AddRentalItem from "../pages/Admin/RentalItems/addRentalItem";
import EditRentalItem from "../pages/Admin/RentalItems/editRentalItem";
import RentalStatus from "../pages/Admin/ItemsStatus/RentalStatus";
import ReserveStatus from "../pages/Admin/ItemsStatus/ReserveStatus";
import ClubMember from "../pages/Admin/ClubMember/ClubMember";
import AddClubMember from "../pages/Admin/ClubMember/AddClubMember";
import AddMember from "../pages/Admin/ClubMember/AddMember";
import DeleteMember from "../pages/Admin/ClubMember/DeleteMember";
import MemberManage from "../pages/Admin/ClubMember/MemberManage";
import PrivateRoute from "../components/PrivateRoute";

const Admin = () => {
  return (
    <div className="bg-[#ffffff] min-h-screen px-4 py-8">
      <AdminHeader />
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/" element={<PrivateRoute><AdminMain /></PrivateRoute>} />
        <Route path="/RentalItems" element={<PrivateRoute><RentalItems /></PrivateRoute>} />
        <Route path="/AddRentalItem" element={<PrivateRoute><AddRentalItem /></PrivateRoute>} />
        <Route path="/EditRentalItem/:id" element={<PrivateRoute><EditRentalItem /></PrivateRoute>} />
        <Route path="/rentalstatus" element={<PrivateRoute><RentalStatus /></PrivateRoute>} />
        <Route path="/reservestatus" element={<PrivateRoute><ReserveStatus /></PrivateRoute>} />
        <Route path="/clubMember" element={<PrivateRoute><ClubMember /></PrivateRoute>} />
        <Route path="/addclubMember" element={<PrivateRoute><AddClubMember /></PrivateRoute>} />
        <Route path="/addMember" element={<PrivateRoute><AddMember /></PrivateRoute>} />
        <Route path="/deleteMember" element={<PrivateRoute><DeleteMember /></PrivateRoute>} />
        <Route path="/memberManage" element={<PrivateRoute><MemberManage /></PrivateRoute>} />
      </Routes>
    </div>
  );
};

export default Admin;
