import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../pages/User/Maintest";
import ExcellentClub from "../pages/User/ExcellentClub/ExcellentClub";
import RentalItems from "../pages/User/RentalItems";
import Login from "../pages/User/Login/Login";
import LoginFailureModal from "./../pages/User/Login/LoginFailureModal";
import UserAgreement from "../pages/User/Login/UserAgreement";
import MyPage from "../pages/User/Login/MyPage";
import ClubMemberCard from "../pages/User/ClubMemberCard";
import ClassSchedule from "../pages/User/ClassSchedule/ClassSchedule";
import Reservation from "../pages/User/ReservationClick/Reservation";
import Rental from "../pages/User/RentalClick/Rental";
import Menu from "../pages/User/Menu/Menu";
import Introduction from "../pages/User/Menu/Introduction";
import SNS from "../pages/User/Menu/SNS";
import AboutUs from "../pages/User/Menu/AboutUs";

const User = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login-failure" element={<LoginFailureModal />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/member-card" element={<ClubMemberCard />} />
        <Route path="/" element={<Main />} />
        <Route path="/excellentclub" element={<ExcellentClub />} />
        <Route path="/rentalitems" element={<RentalItems />} />
        <Route path="/classSchedule" element={<ClassSchedule />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/rental" element={<Rental />} />
        <Route path="/rentalitems" element={<RentalItems />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/sns" element={<SNS />} />
        <Route path="/aboutus" element={<AboutUs />} />
    
      </Routes>
    </div>
  );
};

export default User;

