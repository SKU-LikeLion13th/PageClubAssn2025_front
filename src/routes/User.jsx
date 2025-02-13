import React from "react";
import { Route, Routes } from "react-router-dom";
import ExcellentClub from "../pages/User/ExcellentClub/ExcellentClub";
import RentalItems from "../pages/User/Rental/RentalItems";
import Login from "../pages/User/Login/Login";
import UserAgreement from "../pages/User/Login/UserAgreement";
import MyPage from "../pages/User/Login/MyPage";
import ClubMemberCard from "../pages/User/ClubMemberCard";
import ClassSchedule from "../pages/User/ClassSchedule/ClassSchedule";
import Reservation from "../pages/User/Reservation";
import RentalClick from "../pages/User/RentalClick";
import Menu from "../pages/User/Menu/Menu";
import Introduction from "../pages/User/Menu/Introduction";
import SNS from "../pages/User/Menu/SNS";
import AboutUs from "../pages/User/Menu/AboutUs";
import Main from "../pages/User/Main";
import Footer from "../components/Footer";

const User = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/member-card" element={<ClubMemberCard />} />
        <Route path="/" element={<Main />} />
        <Route path="/excellentclub" element={<ExcellentClub />} />
        <Route path="/rentalitems" element={<RentalItems />} />
        <Route path="/classSchedule" element={<ClassSchedule />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/rentalclick" element={<RentalClick />} />
        <Route path="/rentalitems" element={<RentalItems />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/sns" element={<SNS />} />
        <Route path="/aboutus" element={<AboutUs />} />
      </Routes>
      <Footer className="text-[#d2b48c] pb-5" />
    </div>
  );
};

export default User;
