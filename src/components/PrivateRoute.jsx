import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("Token");
  const role = localStorage.getItem("role");

  if (!token) {
    alert("로그인 후 이용할 수 있는 페이지입니다.");
    return <Navigate to="/admin/adminlogin" replace />;
  }

  // 토큰에서 만료 시간 가져오기
  const decodedToken = JSON.parse(atob(token.split('.')[1])); // JWT 토큰에서 payload 부분을 디코딩
  const expirationTime = decodedToken.exp * 1000; // exp는 초 단위이므로 밀리초로 변환
  const currentTime = Date.now();

  // 만료된 토큰 처리
  if (currentTime > expirationTime) {
    alert("세션이 만료되었습니다. 다시 로그인해주세요.");
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    return <Navigate to="/admin/adminlogin" replace />;
  }

  // 권한 확인
  if (role !== "ROLE_ADMIN") {
    alert("관리자만 이용할 수 있는 페이지입니다.");
    return <Navigate to="/admin/adminlogin" replace />;
  }

  return children;
};

export default PrivateRoute;
