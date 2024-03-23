import { View } from "react-native";
import { MediumText, SmallHeadingText, SmallText } from "../../Text/Headings/Headings";
import { CustomSafeAreaView } from "../../SafeAreaView/SafeAreaView";
import { Avatar, Icon } from "@rneui/base";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { useContext } from "react";
import { AuthContext } from "../../../context/auth/auth.context";

export const DrawerContents = ({ navigation }) => {
    const { logoutUser } = useContext(AuthContext);
    return (
        <CustomSafeAreaView
            style={{
                height: "100%",
                // justifyContent: "space-between",
                paddingHorizontal: 20
            }}>
            <View>
                <Avatar
                    size={64}
                    rounded
                    source={{
                        uri: "https://cdn.pixabay.com/photo/2020/09/18/05/58/lights-5580916__340.jpg"
                    }}
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[600], marginTop: 5 }}>Rahul Rajesh Nikam</MediumText>
                <SmallText sx={{ fontFamily: fonts.Montserrat[400] }}>codewithrahulnikam@gmail.com</SmallText>
            </View>

            <View>
                {MenuItems.map((item, index) => (
                    <TouchableOpacity
                        style={styles.singleMenuItem}
                        onPress={() => navigation.navigate(item.toScreen)}
                        key={index}>
                        <Icon
                            type="material"
                            name={item.icon}
                            size={20}
                            color={Colors.bgBlack}
                        />
                        <MediumText sx={{ marginLeft: 10, fontFamily: fonts.Montserrat[500] }}>{item.name}</MediumText>
                    </TouchableOpacity>
                ))}
            </View>
            <View>
                <TouchableOpacity
                    style={[styles.singleMenuItem, { marginBottom: 50 }]}
                    onPress={() => logoutUser()}>
                    <Icon
                        type="material"
                        name="logout"
                    />

                    <MediumText sx={{ marginLeft: 10, fontFamily: fonts.Montserrat[500] }}>Logout</MediumText>
                </TouchableOpacity>
            </View>
        </CustomSafeAreaView>
    );
};

const styles = StyleSheet.create({
    singleMenuItem: {
        flexDirection: "row",
        alignItems: "center",
        // backgroundColor: Colors.bgBlack,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black[1]
    }
});

const MenuItems = [
    {
        name: "Home",
        icon: "home",
        toScreen: "homeScreen"
    },
    {
        name: "All products",
        icon: "grass",
        toScreen: "productsScreen"
    },

    {
        name: "Wishlist",
        icon: "favorite",
        toScreen: "homeScreen"
    },
    {
        name: "Check diseases",
        icon: "bug-report",
        toScreen: "homeScreen"
    },
    {
        name: "My account",
        icon: "account-circle",
        toScreen: "ProfileScreen"
    },
    {
        name: "Settings",
        icon: "settings",
        toScreen: "homeScreen"
    }
];
