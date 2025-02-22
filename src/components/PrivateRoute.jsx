import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const role = localStorage.getItem("role");

  if (!role) {
    alert("로그인 후 이용할 수 있는 페이지입니다.");
    return <Navigate to="/admin/adminlogin" replace />;
  }

  if (role !== "ROLE_ADMIN") {
    alert("관리자만 이용할 수 있는 페이지입니다.");
    return <Navigate to="/admin/adminlogin" replace />;
  }

  return children;
};

export default PrivateRoute;
