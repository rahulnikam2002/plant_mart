import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect } from "react";
import { App } from "./app/app";
import { Auth } from "./auth/auth";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../context/auth/auth.context";

export const Navigation = () => {
  const { isLogin, isLoading } = useContext(AuthContext);
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator
          s
          size={50}
          color={"#000"}
        />
      </View>
    );
  }
  // useEffect(() => {
  //   checkLoginStatus();
  // }, []);
  return (
    <NavigationContainer>{isLogin ? <App /> : <Auth />}</NavigationContainer>
  );
};
