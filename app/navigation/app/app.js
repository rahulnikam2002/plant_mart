import { Text } from "react-native";
import { View, Button } from "react-native";
// Context
import { AuthContext } from "../../context/auth/auth.context";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { CustomBottomSheet } from "../../Components/BottomSheet/BottomSheet";
import { SCREEN_HEIGHT } from "@gorhom/bottom-sheet";
import { TextInput } from "react-native-gesture-handler";
import { BottomSheet } from "../../Components/BottomSheet/BottomSheetWrapper";

export const App = () => {
  const { logoutUser } = useContext(AuthContext);
  const [snapToIndex, setSnapToIndex] = useState(-1);

  const sheetRef = useRef(null);
  const snapPoints = useMemo(() => ["2%","15%", "50%", "80%", "90%"], []);

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log(index);
    if (index == 0) {
      setSnapToIndex(-1);
      sheetRef.current?.close();
    }
  }, []);
  
  return (
    <View style={{ height: SCREEN_HEIGHT, paddingTop: 50 }}>
      <Text>App</Text>
      <Button
        onPress={() => logoutUser()}
        title="Logout"
      />
      <View
        style={
          snapToIndex && {
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
          }
        }>
        <BottomSheet snapToIndex={snapToIndex} setSnapToIndex={setSnapToIndex}>
          <Text>Hello</Text>
        </BottomSheet>
      </View>
    </View>
  );
};
