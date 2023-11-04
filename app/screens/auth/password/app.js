import { StatusBar } from "react-native";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { Colors } from "../../../utils/constants/colors/colors";
import { HeaderCard } from "../../../Components/containers/Header/HeaderCard";
import { StyleSheet } from "react-native";
import { View } from "react-native";
import { PasswordInput } from "../../../Components/Input/Input";
import { TouchableButton } from "../../../Components/Button/Button";
import { useContext, useState } from "react";
import { validationByRegex } from "../../../utils/helpers/validation/validation";
import { AuthContext } from "../../../context/auth/auth.context";

export const PasswordScreen = ({ navigation }) => {
  const { loginUser } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [validPassword, setValidPassword] = useState(false);
  const handleValidatePassword = (password) => {
    console.log(password);
    const isPasswordValid = validationByRegex(
      password,
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!*])[A-Za-z\d@#$%^&+=!*]{8,}$/
    );
    setValidPassword(isPasswordValid);
  };
  const handleCheckPassword = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      loginUser("rahul", "nikam");
    }, 2000);
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
        text={"Enter your password to continue"}
        subText={"Password"}
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
