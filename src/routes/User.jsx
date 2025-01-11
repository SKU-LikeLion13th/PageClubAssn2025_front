import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Main from '../pages/User/Maintest'
import ExcellentClub from '../pages/User/ExcellentClub/ExcellentClub';
import RentalItems from '../pages/User/RentalItems';
import ClassSchedule from '../pages/User/ClassSchedule/ClassSchedule';
import NoReservation from '../pages/User/ReservationClick/NoReservation';
import YesReservation from '../pages/User/ReservationClick/YesReservation';

const User = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Main/>}/>
        <Route path = "/excellentclub" element={<ExcellentClub/>}/>
        <Route path = "/classSchedule" element={<ClassSchedule/>}/>
        <Route path = "/noReservation" element={<NoReservation/>}/>
        <Route path = "/yesReservation" element={<YesReservation/>}/>
        <Route path = "/rentalitems" element={<RentalItems/>}/>
      </Routes>
    </div>
  );
};

export default User;