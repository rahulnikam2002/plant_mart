import React, { createContext, useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLogin, setIsLogin] = useState(true);

    const loginUser = (token) => {
        setIsLoading(true);
        console.log({ token });
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

    const getUserAuthToken = async () => {
        console.log("inside context");
        let token;
        try {
            const res = await SecureStore.getItemAsync("userAuthToken");
            return res; // Return the result obtained from SecureStore.getItemAsync
        } catch (error) {
            console.error("Error while fetching user auth token:", error);
            // Handle the error accordingly
        }
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
        <AuthContext.Provider value={{ isLoading, isLogin, loginUser, registerUser, logoutUser, getUserAuthToken }}>{children}</AuthContext.Provider>
    );
};
