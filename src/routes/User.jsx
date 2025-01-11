import React from 'react';
import {Route, Routes, useLocation} from "react-router-dom";
import Main from '../pages/User/Maintest'
import ExcellentClub from '../pages/User/ExcellentClub/ExcellentClub';
import RentalItems from '../pages/User/RentalItems';
import ClassSchedule from '../pages/User/ClassSchedule/ClassSchedule';
import NoReservation from '../pages/User/ReservationClick/NoReservation';
import YesReservation from '../pages/User/ReservationClick/YesReservation';
import NoRental from '../pages/User/RentalClick/NoRental';
import YesRental from '../pages/User/RentalClick/YesRental';

const User = () => {
  return (
    <div>
      <Routes>
        <Route path = "/" element = {<Main/>}/>
        <Route path = "/excellentclub" element={<ExcellentClub/>}/>
        <Route path = "/classSchedule" element={<ClassSchedule/>}/>
        <Route path = "/noReservation" element={<NoReservation/>}/>
        <Route path = "/yesReservation" element={<YesReservation/>}/>
        <Route path = "/noRental" element={<NoRental/>}/>
        <Route path = "/yesRental" element={<YesRental/>}/>
        <Route path = "/rentalitems" element={<RentalItems/>}/>
      </Routes>
    </div>
  );
};

export default User;