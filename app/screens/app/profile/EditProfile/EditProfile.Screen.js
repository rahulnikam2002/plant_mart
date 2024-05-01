import { StyleSheet, View } from "react-native";
import { MediumText } from "../../../../Components/Text/Headings/Headings";
import { Input } from "../../../../Components/Input/Input";
import { Colors } from "../../../../utils/constants/colors/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableButton } from "../../../../Components/Button/Button";
import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { networkIP } from "../../../../utils/constants/ip";
import { AuthContext } from "../../../../context/auth/auth.context";
import { errorToast, successToast } from "../../../../utils/toasts/toasts";

export const EditProfileScreen = ({ navigation }) => {
    const { getUserAuthToken, logoutUser } = useContext(AuthContext);

    const [userName, setUserName] = useState("");
    const [btnLoading, setBtnLoading] = useState(false);

    const handleUpdateProfile = useCallback(async () => {
        try {
            setBtnLoading(true);
            const userAuthToken = await getUserAuthToken();
            console.log({ userAuthToken });
            const update = await axios.post(
                `${networkIP}/api/user/profile/update`,
                { userName: userName.trim() },
                {
                    headers: {
                        "user-auth-token": userAuthToken
                    }
                }
            );
            const response = update.data;
            setBtnLoading(false);
            if (response.isProfileUpdated) {
                successToast("Profile Updated", "Your profile has been successfully updated.");
                navigation.navigate("ProfileScreen");
                return;
            }
            return errorToast("Profile Update Failed", "An error occurred while updating your profile. Please try again later.");
        } catch (error) {
            setBtnLoading(false);
            console.log(error);
        }
    }, [userName]);

    return (
        <View style={styles.container}>
            <View style={styles.innerContainerOne}>
                <Input
                    onChange={(e) => setUserName(e)}
                    onSubmit={handleUpdateProfile}
                    placeholder={"Full Name"}
                    sx={{ height: 50, borderRadius: 5 }}
                />
            </View>

            <View style={styles.updateBtn}>
                <TouchableButton
                    txtWidth={"100%"}
                    btnWidth={"100%"}
                    title={"Update Profile"}
                    hidden={!userName}
                    loading={btnLoading}
                    onPress={handleUpdateProfile}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    innerContainerOne: {
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    updateBtn: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 0,
        width: "100%"
    }
});
