import { StyleSheet, View } from "react-native";
import { MediumText } from "../../../Components/Text/Headings/Headings";
import { BottomTabs } from "../../../Components/NavigationComponents/BottomTabs/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/constants/colors/colors";
import { TouchableButton } from "../../../Components/Button/Button";

export const ProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ height: "100%", paddingHorizontal: 10 }}>
            <MediumText>Hello Profile</MediumText>
            <TouchableButton
                title={"Add New Address"}
                onPress={() => navigation.navigate("NewAddressScreen")}
                hidden={false}
            />
            <TouchableButton
                title={"Confirm Order"}
                onPress={() => navigation.navigate("orderConfirmScreen")}
                hidden={false}
            />
            <View style={styles.bottomTabs}>
                <BottomTabs navigation={navigation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    bottomTabs: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        paddingBottom: 5,
        borderTopColor: Colors.backgroundWhite,
        borderTopWidth: 1
    }
});
