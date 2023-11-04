import { Dimensions } from "react-native";
import { StatusBar } from "react-native";

export const DeviceInfo = {
  notchHeight: StatusBar.currentHeight,
  screenHeight: Dimensions.get("screen").height
};
