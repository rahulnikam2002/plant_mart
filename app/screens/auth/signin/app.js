import { Text, View } from "react-native";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import {
  MediumText,
  SmallText,
  SubHeadingText
} from "../../../Components/Text/Headings/Headings";
import { StatusBar } from "expo-status-bar";
import { useGoogleFonts } from "../../../Hooks/Fonts/useFonts";
import { Input } from "../../../Components/Input/Input";
import { Button, TouchableButton } from "../../../Components/Button/Button";
import { useState } from "react";
import { HeaderCard } from "../../../Components/containers/Header/HeaderCard";
import { BottomSheet } from "../../../Components/BottomSheet/BottomSheetWrapper";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip";
import { BottomSheetHeader } from "../../../Components/BottomSheet/Header/header";
import { BottomSheetBody } from "../../../Components/BottomSheet/Body/Body";

export const SignInScreen = ({ navigation }) => {
  const [isInputValid, setIsInputValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [bottomSheetBtnLoading, setBottomSheetBtnLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [snapToIndex, setSnapToIndex] = useState(-1);

  let { fontError, fontsLoaded } = useGoogleFonts();
  if (!fontsLoaded && !fontError) {
    return null;
  }

  const handleInputChange = (text) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Example email regex
    const regex = new RegExp(emailRegex);
    if (regex.test(text)) {
      setIsInputValid(true);
      setEmail(text);
    } else {
      setIsInputValid(false);
      setEmail(null);
    }
  };

  const handleSignIn = async () => {
    if (isInputValid) {
      if (loading !== true) {
        setLoading(true);
        const response = await axios.post(
          `${networkIP}/api/user/authentication/check/email`,
          { email }
        );
        setLoading(false);
        const responseObject = response.data;
        if (responseObject.isUserRegistered) {
          return navigation.navigate("password");
        }
        setSnapToIndex(1);
        // return navigation.navigate("otpscreen");
      }
    }
  };

  const handleSignUpRedirection = () => {
    setBottomSheetBtnLoading(true);
    setTimeout(() => {
      setBottomSheetBtnLoading(false);
      navigation.navigate("otpscreen")
    }, 2000);
  }

  return (
    <CustomSafeAreaView style={{ height: "100%" }}>
      <StatusBar
        backgroundColor={Colors.bgBlack}
        style="inverted"
      />
      <View style={styles.container}>
        <HeaderCard
          enableBackButton={false}
          text={"Enter your email to proceed!"}
          subText={"Membership application"}
        />
        <View style={styles.bottomContainer}>
          <View style={styles.bottomInnerArea}>
            <Input
              placeholder="Email id"
              onChange={(text) => handleInputChange(text)}
              onSubmit={() => handleSignIn()}
            />
            <SmallText
              color={Colors.lightBlack}
              sx={{ fontFamily: "Montserrat_400Regular", marginTop: 10 }}>
              Continuing will agree to our Terms and Conditions and allow{" "}
              <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
                Plant Mart
              </Text>{" "}
              to access your{" "}
              <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
                cookies
              </Text>{" "}
              and{" "}
              <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
                cache
              </Text>{" "}
              and we don't share your information or credentials with anyone.
            </SmallText>
          </View>
          <View style={styles.button}>
            <TouchableButton
              title={"Agree and Continue"}
              hidden={!isInputValid}
              onPress={() => handleSignIn()}
              loading={loading}
            />
          </View>
        </View>
      </View>
      <View
        style={
          snapToIndex && {
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%"
          }
        }>
        <BottomSheet
          snaps={["35", "35%"]}
          snapToIndex={snapToIndex}
          setSnapToIndex={setSnapToIndex}>
          <BottomSheetHeader
            closeBottomSheet={setSnapToIndex}
            heading="Choose sign in option"
          />
          <BottomSheetBody>
            <MediumText>
              Sorry, it appears you're not registered. Would you like to create
              a new account?
            </MediumText>
          </BottomSheetBody>
          <View style={styles.bottomSheetCTA}>
            <TouchableButton loading={bottomSheetBtnLoading} btnWidth={"100%"} txtWidth={"100%"} onPress={() => handleSignUpRedirection()} title={"Create account"} hidden={false} />
          </View>
        </BottomSheet>
      </View>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%"
  },
  bottomContainer: {
    backgroundColor: Colors.white,
    height: "70%"
  },
  bottomInnerArea: {
    paddingHorizontal: 25,
    paddingTop: 20,
    height: "30%"
  },
  button: {
    height: "60%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 25
  },
  bottomSheetCTA: {
    paddingHorizontal: 20,
    marginBottom: 10
  }
});
