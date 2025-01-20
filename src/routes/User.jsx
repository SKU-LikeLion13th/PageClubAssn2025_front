import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Main from '../pages/User/Maintest'
import ExcellentClub from '../pages/User/ExcellentClub/ExcellentClub';
import RentalItems from '../pages/User/RentalItems';
import ClassSchedule from '../pages/User/ClassSchedule/ClassSchedule';
import Reservation from '../pages/User/ReservationClick/Reservation';
import Rental from '../pages/User/RentalClick/Rental';

const User = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Main/>}/>
        <Route path = "/excellentclub" element={<ExcellentClub/>}/>
        <Route path = "/classSchedule" element={<ClassSchedule/>}/>
        <Route path = "/reservation" element={<Reservation/>}/>
        <Route path = "/rental" element={<Rental/>}/>
        <Route path = "/rentalitems" element={<RentalItems/>}/>
      </Routes>
    </div>
  );
};

export default User;