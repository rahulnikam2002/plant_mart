import { useState, useEffect } from "react";
import {
  useFonts,
  GildaDisplay_400Regular
} from "@expo-google-fonts/gilda-display";
import { Montserrat_400Regular, Montserrat_600SemiBold } from "@expo-google-fonts/montserrat";

export function useGoogleFonts() {
  let [fontsLoaded, fontError] = useFonts({
    GildaDisplay_400Regular,
    Montserrat_400Regular,
    Montserrat_600SemiBold
  });

  return { fontsLoaded, fontError };
}
