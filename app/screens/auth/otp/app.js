import { StatusBar, TextInput } from "react-native";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { HeaderCard } from "../../../Components/containers/Header/HeaderCard";
import { TouchableButton } from "../../../Components/Button/Button";
import { Colors } from "../../../utils/constants/colors/colors";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { useGoogleFonts } from "../../../Hooks/Fonts/useFonts";
import { SmallText } from "../../../Components/Text/Headings/Headings";
import { Text } from "react-native";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip";
import { resolveObjectURL } from "buffer";
import { successToast } from "../../../utils/toasts/toasts";
import { toastConfig } from "../../../utils/toasts/config";
import Toast from "react-native-toast-message";

export const OTPScreen = ({ route, navigation }) => {
  const { email, key } = route.params;
  // console.log("the data we got is ==> ",{email, key})
  const [validOTP, setValidOTP] = useState(false);
  const [loading, setLoading] = useState(false);
  let { fontError, fontsLoaded } = useGoogleFonts();
  const [time, setTime] = useState(120);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer;

    if (isRunning) {
      timer = setInterval(() => {
        if (time > 0) {
          setTime((prevTime) => prevTime - 1);
        } else {
          clearInterval(timer);
        }
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isRunning, time]);

  const minutes = String(Math.floor(time / 60)).padStart(2, "0");
  const seconds = String(time % 60).padStart(2, "0");
  const formattedTime = `${minutes}:${seconds}`;

  const [otp, setOTP] = useState(["", "", "", ""]);
  const inputRefs = [
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef()
  ];

  const handleOtpChange = (text, index) => {
    console.log(otp);
    if (text.length === 1) {
      setOTP((prevOTP) => {
        const newOTP = [...prevOTP];
        newOTP[index] = text;
        return newOTP;
      });

      // Move focus to the next input field
      if (index < 3) {
        inputRefs[index + 1].current.focus();
      }
    } else if (text.length === 0) {
      setOTP((prevOTP) => {
        const newOTP = [...prevOTP];
        newOTP[index] = "";
        return newOTP;
      });

      // Move focus to the previous input field
      if (index > 0) {
        inputRefs[index - 1].current.focus();
      }
    }
  };

  useEffect(() => {
    if (otp.join("").length === 4 && Number(otp.join("")) !== NaN) {
      setValidOTP(true);
    } else {
      setValidOTP(false);
    }
  }, [otp]);

  useEffect(() => {
    successToast("OTP sent ❤️", "We have successfully sent you OTP");
  }, []);

  const handleCheckPassword = async () => {
    if (validOTP) {
      setLoading(true);
      const OTP = otp.join("");
      const response = await axios.post(
        `${networkIP}/api/user/authentication/verify/otp`,
        { email, otp: OTP, key }
      );
      const responseObject = response.data;
      console.log(responseObject);
      setLoading(false);
      if (responseObject.type === "SUCCESS") {
        navigation.navigate("password", { email, key });
      }
    }
  };

  return (
    <CustomSafeAreaView style={{ height: "100%" }}>
      <StatusBar
        backgroundColor={Colors.bgBlack}
        style="inverted"
      />
      <HeaderCard
        navigation={navigation}
        enableBackButton={true}
        text={"Enter the OTP, We've sent you on email"}
        subText={"Verify OTP"}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.bottomInnerArea}>
          <View style={styles.container}>
            {otp.map((value, index) => (
              <TextInput
                key={index}
                style={[styles.OTPinput]}
                value={value}
                cursorColor={Colors.bgBlack}
                onChangeText={(text) => handleOtpChange(text, index)}
                keyboardType="numeric"
                maxLength={1}
                ref={inputRefs[index]}
              />
            ))}
          </View>
          <SmallText
            color={Colors.lightBlack}
            sx={{ fontFamily: "Montserrat_400Regular", marginTop: 10 }}>
            We have sent you a 4 digit OTP on your email{" "}
            <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
              {email},
            </Text>
            If you didn't received it, please do check youe spam folder too!
            This OTP will get expired in{" "}
            <Text style={{ fontFamily: "Montserrat_600SemiBold" }}>
              {formattedTime}
            </Text>
          </SmallText>
        </View>
        <View style={styles.button}>
          <TouchableButton
            title={"Continue"}
            onPress={() => handleCheckPassword()}
            loading={loading}
            hidden={!validOTP}
          />
        </View>
      </View>
      <Toast
        config={toastConfig}
        autoHide={true}
        // visibilityTime={5000}
        topOffset={70}
      />
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    height: "70%",
    backgroundColor: Colors.white
  },
  bottomInnerArea: {
    // flexDirection: "row",
    width: "100%",
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
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  OTPinput: {
    width: "22%",
    height: 70,
    borderWidth: 1,
    borderRadius: 5,
    textAlign: "center",
    borderColor: Colors.lightBlack[3],
    fontSize: 25,
    fontFamily: "Montserrat_600SemiBold"
  }
});
