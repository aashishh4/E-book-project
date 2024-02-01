import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(localStorage.getItem('login') === 'true');
  const navigate = useNavigate();


  const login = () => {
    localStorage.setItem('login', 'true');
    setIsLogin(true);
    // toast.success("Login successfully");
  };

  const logout = () => {
    localStorage.setItem('login', 'false');
    setIsLogin(false);
    //document.location.reload()
    // setTimeout(() => {
      navigate('/');
    // }, 1000)
  };

 

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
