// AuthProvider.jsx

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const axiosInstance = axios.create({
    baseURL: "https://pageback.sku-sku.com",
  });

  useEffect(() => {
    const token = localStorage.getItem('Token');
    
    if (token) {
      setIsLoggedIn(true);
    }

    axiosInstance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('Token');
        if (token) {
          config.headers['Authorization'] = `${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('Token');
          setIsLoggedIn(false);  // 로그아웃 처리
          alert("로그인 후 이용 가능합니다.");
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [navigate, axiosInstance]);

  return (
    <LoginContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
