import { StatusBar } from "react-native";
import { CustomSafeAreaView } from "../../../../Components/SafeAreaView/SafeAreaView";
import { Colors } from "../../../../utils/constants/colors/colors";
import { HeaderCard } from "../../../../Components/containers/Header/HeaderCard";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { PasswordInput } from "../../../../Components/Input/Input";
import { TouchableButton } from "../../../../Components/Button/Button";
import { useContext, useState } from "react";
import { validationByRegex } from "../../../../utils/helpers/validation/validation";
import { AuthContext } from "../../../../context/auth/auth.context";
import axios from "axios";
import { networkIP } from "../../../../utils/constants/ip";
import Toast from "react-native-toast-message";
import {
  errorToast,
  infoToast,
  showToast,
  successToast
} from "../../../../utils/toasts/toasts";
import { toastConfig } from "../../../../utils/toasts/config";

export const PasswordScreen = ({ route, navigation }) => {
  const { loginUser, registerUser } = useContext(AuthContext);

  let key = undefined;
  let authMode = "signin";
  const { name } = navigation.getState()?.routes[1];
  // console.log({ compRoute: navigation.getState()?.routes, name });
  if (name === "otpscreen") {
    // console.log(true);
    key = route.params.key;
    authMode = "signup";
  }
  const email = route?.params?.email;
  console.log({ key, email, authMode });
  const [loading, setLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const [password, setPassword] = useState(null);
  const handleValidatePassword = (password) => {
    // console.log(password);
    const isPasswordValid = validationByRegex(
      password,
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*])[A-Za-z\d@#$%^&+=!*]{8,}$/
    );
    setValidPassword(isPasswordValid);
    if (isPasswordValid) {
      setPassword(password);
    } else {
      setPassword(null);
    }
  };
  const handleCheckPassword = async () => {
    console.log(true);
    if (authMode == "signin") {
      if (!email) {
        return errorToast("Incorrect credentials", "You must enter email ");
      }
      const signIn = await handleSignIn(email, password);
    } else {
      if (!email && !password && !key) {
        return errorToast(
          "Incorrect credentials",
          "You must enter valid password"
        );
      }
      const signUp = await handleSignUp(email, password, key);
    }
  };

  const handleSignIn = async (email, password) => {
    // sign in code
    setLoading(true);
    const response = await axios.post(
      `${networkIP}/api/user/authentication/signin`,
      { email, password }
    );
    const responseObject = response.data;
    setLoading(false);
    console.log(responseObject);
    if (responseObject.type !== "SUCCESS") {
      return handleShowToasts(responseObject.code);
    }
    console.log(responseObject.userAuthToken);
    return loginUser(responseObject.userAuthToken);
  };

  const handleSignUp = async (email, password, key) => {
    // sign up code
    setLoading(true);
    const response = await axios.post(
      `${networkIP}/api/user/authentication/signup/`,
      { email, password, key, userName: "Rahul Nikam" }
    );
    const responseObject = response.data;
    setLoading(false);
    if (responseObject.type !== "SUCCESS") {
      return handleShowToasts(responseObject.code);
    }
    console.log(responseObject);
    return registerUser(responseObject.userAuthToken);
  };

  const handleShowToasts = (res) => {
    switch (res) {
      case 1:
        infoToast("Server issue", "Something went wrong!");
        break;
      case 2:
        infoToast("Already registered", "We found this was registered");
        break;
      case 3:
        errorToast("Server issue", "Something went wrong!");
        break;
      case 4:
        infoToast("Password is missing", "Please enter your email");
        break;
      case 5:
        infoToast("Invalid Credentials", "Check your email and password");
        break;
      default:
        break;
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
        text={
          authMode === "signup"
            ? "Create secure password to continue"
            : "Enter your password to continue"
        }
        subText={"Create Password"}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.bottomInnerArea}>
          <PasswordInput
            placeholder={"Password"}
            onChange={(text) => handleValidatePassword(text)}
          />
        </View>
        <View style={styles.button}>
          <TouchableButton
            title={"Continue"}
            onPress={() => handleCheckPassword()}
            loading={loading}
            hidden={!validPassword}
          />
        </View>
      </View>
      <Toast
        config={toastConfig}
        autoHide={true}
        visibilityTime={5000}
        topOffset={60}
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
    paddingHorizontal: 25,
    paddingTop: 20,
    height: "30%"
  },
  button: {
    height: "60%",
    alignItems: "flex-start",
    justifyContent: "flex-end",
    paddingHorizontal: 25
  }
});
