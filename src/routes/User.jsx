import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Main from '../pages/User/Maintest'
import ExcellentClub from '../pages/User/ExcellentClub/ExcellentClub';
import RentalItems from '../pages/User/Rental/RentalItems';
import RentalNote from '../pages/User/Rental/RentalNote';

const User = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Main/>}/>
        <Route path = "/excellentclub" element={<ExcellentClub/>}/>
        
        <Route path = "/rentalitems" element={<RentalItems/>}/>
        <Route path = "/rentalnote" element={<RentalNote/>}/>
      </Routes>
    </div>
  );
};

export default User;