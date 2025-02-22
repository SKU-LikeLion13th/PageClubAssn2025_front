import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useLogin } from '../components/AuthProvider';
import ExcellentClub from '../pages/User/ExcellentClub/ExcellentClub';
import RentalItems from '../pages/User/Rental/RentalItems';
import Login from '../pages/User/Login/Login';
import UserAgreement from '../pages/User/Login/UserAgreement';
import MyPage from '../pages/User/Login/MyPage';
import ClubMemberCard from '../pages/User/ClubMemberCard';
import ClassSchedule from '../pages/User/ClassSchedule/ClassSchedule';
import Reservation from '../pages/User/ClickStatus/Reservation';
import RentalClick from '../pages/User/ClickStatus/RentalClick';
import Menu from '../pages/User/Menu/Menu';
import Introduction from '../pages/User/Menu/Introduction';
import SNS from '../pages/User/Menu/SNS';
import AboutUs from '../pages/User/Menu/AboutUs';
import Main from '../pages/User/Main';
import Footer from '../components/Footer';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useLogin();

  if (!isLoggedIn) {
    setTimeout(() => {
      alert("로그인 후 이용 가능합니다.");
    }, 0);

    return <Navigate to="/login" />;
  }

  return children;
};


const User = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* 로그인하지 않아도 되는 페이지들 */}
        <Route path="/" element={<Main />} />
        <Route path="/excellentclub" element={<ExcellentClub />} />
        <Route path="/classSchedule" element={<ClassSchedule />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/sns" element={<SNS />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* 로그인 후 접근해야 하는 페이지들 */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/mypage" element={ <ProtectedRoute><MyPage /></ProtectedRoute> } />
        <Route path="/member-card" element={ <ProtectedRoute><ClubMemberCard /></ProtectedRoute>} />
        <Route path="/rentalitems" element={ <ProtectedRoute><RentalItems /></ProtectedRoute> } />
        <Route path="/reservation" element={ <ProtectedRoute><Reservation /></ProtectedRoute> } />
        <Route path="/rentalclick" element={ <ProtectedRoute><RentalClick /></ProtectedRoute> } />
      </Routes>
      <Footer className="text-[#d2b48c] pb-5 pt-8" />
    </AuthProvider>
  );
};

export default User;
