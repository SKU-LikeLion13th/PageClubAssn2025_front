import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
import Page404 from '../pages/User/Page404';

const isTokenValid = () => {
  const token = localStorage.getItem('Token');
  if (!token) return false;

  try {
    const tokenParts = token.replace('Bearer ', '').split('.');
    if (tokenParts.length !== 3) {
      console.error('Invalid token format');
      return false;
    }

    const decodedPayload = JSON.parse(atob(tokenParts[1]));
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedPayload.exp < currentTime) {
      console.warn('Token expired');
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isTokenValid()) {
    alert('로그인이 필요합니다.');
    return <Navigate to="/login" replace />;
  }
  return children;
};

const User = () => {
  return (
    <div>
      <Routes>
        {/* 로그인 없이 접근 가능한 페이지 */}
        <Route path="/" element={<Main />} />
        <Route path="/excellentclub" element={<ExcellentClub />} />
        <Route path="/classSchedule" element={<ClassSchedule />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/introduction" element={<Introduction />} />
        <Route path="/sns" element={<SNS />} />
        <Route path="/aboutus" element={<AboutUs />} />

        {/* 로그인 후 접근해야 하는 페이지 */}
        <Route path="/login" element={<Login />} />
        <Route path="/user-agreement" element={<UserAgreement />} />
        <Route path="/mypage" element={<ProtectedRoute><MyPage /></ProtectedRoute>} />
        <Route path="/member-card" element={<ProtectedRoute><ClubMemberCard /></ProtectedRoute>} />
        <Route path="/rentalitems" element={<ProtectedRoute><RentalItems /></ProtectedRoute>} />
        <Route path="/reservation" element={<ProtectedRoute><Reservation /></ProtectedRoute>} />
        <Route path="/rentalclick" element={<ProtectedRoute><RentalClick /></ProtectedRoute>} />

        {/* 404 페이지 */}
        <Route path="*" element={<Page404 />} />
      </Routes>
      <Footer className="text-[#d2b48c] pb-5 pt-8" />
    </div>
  );
};

export default User;
