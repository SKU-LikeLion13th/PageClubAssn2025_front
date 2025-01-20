import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../pages/User/Main";
import Menu from "../pages/User/Menu/Menu";
import Introduction from "../pages/User/Menu/Introduction";
import SNS from "../pages/User/Menu/SNS";
import AboutUs from "../pages/User/Menu/AboutUs";
import ExcellentClub from "../pages/User/ExcellentClub/ExcellentClub";
// import RentalItems from "../pages/User/RentalItems";

const User = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/sns" element={<SNS />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/excellentclub" element={<ExcellentClub />} />
        {/* <Route path="/rentalitems" element={<RentalItems />} /> */}
      </Routes>
    </div>
  );
};

export default User;
