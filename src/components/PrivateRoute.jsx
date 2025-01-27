import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role"); // 로컬스토리지에서 role 가져오기

  if (role !== "ROLE_ADMIN") {
    alert("관리자만 이용할 수 있는 페이지입니다."); // 경고 메시지 띄우기
    return <Navigate to="/login" replace />; // 로그인 페이지로 리다이렉트
  }

  return children; // ROLE_ADMIN일 경우 컴포넌트 렌더링
};

export default PrivateRoute;
