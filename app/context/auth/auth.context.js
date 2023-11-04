import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const loginUser = ({ userName, userPassword }) => {
    setIsLoading(true);
    setTimeout(() => {
      SecureStore.setItemAsync("token", "mytoken").then((res) => {
        setIsLoading(false);
        setIsLogin(true);
      });
    }, 3000);
  };

  const registerUser = ({ userName, userPassword }) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      SecureStore.setItemAsync("token", "mytoken").then((res) => {
        setIsLogin(true);
      });
    }, 3000);
  };

  const logoutUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      SecureStore.deleteItemAsync("token").then((res) => {
        setIsLogin(false);
      });
    }, 3000);
  };

  useEffect(() => {
    SecureStore.getItemAsync("token").then((res) => {
      console.log(res);
      if (res) {
        setIsLogin(true);
      }
      setIsLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoading, isLogin, loginUser, registerUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
