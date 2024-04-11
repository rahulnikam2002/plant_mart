import { Image, StyleSheet, View } from "react-native";
import { HeadingText, MediumText, SmallHeadingText, SmallText, SubHeadingText } from "../../../Components/Text/Headings/Headings";
import { BottomTabs } from "../../../Components/NavigationComponents/BottomTabs/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/constants/colors/colors";
import { TouchableButton } from "../../../Components/Button/Button";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";

export const ProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={{ height: "100%" }}>
            <View style={[styles.container]}>
                <View>
                    <MediumText sx={styles.headerTitle}>Hey! Rahul Nikam</MediumText>
                    <SmallText
                        color={Colors.lightBlack[1]}
                        sx={{ fontFamily: fonts.Montserrat[500] }}>
                        Explore Plant Mart
                    </SmallText>
                </View>

                {/* CTS */}
                <View style={styles.ctaSection}>
                    <TouchableOpacity style={styles.singleCTABox}>
                        <Icon
                            name="leaf-outline"
                            type="ionicon"
                        />
                        <MediumText sx={styles.ctsBtnText}>Orders</MediumText>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.singleCTABox}>
                        <Icon
                            name="headset-outline"
                            type="ionicon"
                        />
                        <MediumText sx={styles.ctsBtnText}>Help Center</MediumText>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.container]}>
                <MediumText sx={styles.containerTitle}>Account Settings</MediumText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        paddingVertical: 10,
        paddingHorizontal: 15,
        // elevation: 10,
        marginBottom: 2
    },
    headerTitle: {
        fontFamily: fonts.Montserrat[600],
        fontSize: 15
    },
    ctaSection: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15
    },
    singleCTABox: {
        width: "49%",
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 10,
        borderRadius: 5,
        gap: 10,
        borderColor: Colors.black[3],
        // borderWidth: 1
        elevation: 5,
        backgroundColor: Colors.white
    },
    ctsBtnText: {
        fontFamily: fonts.Montserrat[600]
    },
    containerTitle: {
        fontFamily: fonts.Montserrat[600],
        fontSize: 13
    }
});
