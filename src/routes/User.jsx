import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../pages/User/Maintest";
import ExcellentClub from "../pages/User/ExcellentClub/ExcellentClub";
import RentalItems from "../pages/User/RentalItems";
import Login from "../pages/User/Login/Login";
import LoginFailureModal from "./../pages/User/Login/LoginFailureModal";
import UserAgreement from "../pages/User/Login/UserAgreement";
import ClubMemberCard from "../pages/User/ClubMemberCard";

const User = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/excellentclub" element={<ExcellentClub />} />
        <Route path="/rentalitems" element={<RentalItems />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login-failure" element={<LoginFailureModal />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/member-card" element={<ClubMemberCard />} />
      </Routes>
    </div>
  );
};

export default User;
