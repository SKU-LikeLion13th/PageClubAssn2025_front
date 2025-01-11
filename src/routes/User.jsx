import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Main from "../pages/User/Maintest";
import ExcellentClub from "../pages/User/ExcellentClub/ExcellentClub";
import RentalItems from "../pages/User/RentalItems";
import Login from "../pages/User/Login/Login";

const User = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/excellentclub" element={<ExcellentClub />} />
        <Route path="/rentalitems" element={<RentalItems />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default User;
