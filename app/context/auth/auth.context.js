import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  const loginUser = (token) => {
    setIsLoading(true);
    SecureStore.setItemAsync("userAuthToken", token).then((res) => {
      setIsLoading(false);
      setIsLogin(true);
    });
  };

  const registerUser = (token) => {
    setIsLoading(true);
    SecureStore.setItemAsync("userAuthToken", token).then((res) => {
      setIsLoading(false);
      setIsLogin(true);
    });
  };

  const logoutUser = () => {
    setIsLoading(true);
    SecureStore.deleteItemAsync("userAuthToken").then((res) => {
      setIsLoading(false);
      setIsLogin(false);
    });
  };

  useEffect(() => {
    SecureStore.getItemAsync("userAuthToken").then((res) => {
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
