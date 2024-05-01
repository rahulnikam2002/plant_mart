import { ActivityIndicator, Image, ScrollView, StyleSheet, View } from "react-native";
import { HeadingText, MediumText, SmallHeadingText, SmallText, SubHeadingText } from "../../../Components/Text/Headings/Headings";
import { BottomTabs } from "../../../Components/NavigationComponents/BottomTabs/BottomTabs";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../../utils/constants/colors/colors";
import { TouchableButton } from "../../../Components/Button/Button";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { useCallback, useContext, useEffect, useState } from "react";
import { errorToast } from "../../../utils/toasts/toasts";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip";
import { AuthContext } from "../../../context/auth/auth.context";

const HorizontalMenuCard_ICON_SIZE = 20;

export const ProfileScreen = () => {
    const { getUserAuthToken, logoutUser } = useContext(AuthContext);
    const [userDetails, setUserDetails] = useState([]);
    const [loading, setLoading] = useState();
    const navigation = useNavigation();

    const fetchUserDetails = useCallback(async () => {
        try {
            setLoading(true);
            const userAuthToken = await getUserAuthToken();
            const getProfileDetails = await axios.get(`${networkIP}/api/user/get/user/details`, {
                headers: {
                    "user-auth-token": userAuthToken
                }
            });
            const response = getProfileDetails.data;
            setUserDetails(response);
            setLoading(false);
        } catch (error) {
            errorToast("Something went wrong", "Team is working on this issue, try again! ");
        }
    }, [userDetails]);

    useEffect(() => {
        navigation.addListener("focus", () => {
            fetchUserDetails();
        });
    }, [navigation]);

    console.log({ userDetails });

    return (
        <View style={{ height: "100%", width: "100%" }}>
            <ScrollView style={{ height: "100%", width: "100%" }}>
                <View style={[styles.container]}>
                    <View>
                        <MediumText sx={styles.headerTitle}>
                            Hey!{" "}
                            {!loading ? (
                                userDetails?.name
                            ) : (
                                <ActivityIndicator
                                    color={"black"}
                                    size={16}
                                />
                            )}
                        </MediumText>
                        <SmallText
                            color={Colors.lightBlack[1]}
                            sx={{ fontFamily: fonts.Montserrat[500] }}>
                            Explore Plant Mart
                        </SmallText>
                    </View>

                    {/* CTS */}
                    <View style={[styles.ctaSection]}>
                        <TouchableOpacity
                            activeOpacity={0.7}
                            onPress={() => navigation.navigate("UserOrdersScreen")}
                            style={[styles.singleCTABox, styles.blackThemeBTN]}>
                            <Icon
                                name="leaf-outline"
                                type="ionicon"
                                color={Colors.white}
                            />
                            <MediumText
                                sx={styles.ctsBtnText}
                                color={Colors.white}>
                                My Orders
                            </MediumText>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate("GetSupport")}
                            style={styles.singleCTABox}>
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
                    <View style={{ marginTop: 10 }}>
                        {accountSettings.map((item, index) => (
                            <HorizontalMenuCard
                                key={item.id}
                                title={item.title}
                                icon={item.icon}
                                screenName={item.screenName}
                                showBorderBottom={index != accountSettings.length - 1}
                            />
                        ))}
                    </View>
                </View>
                {/* <View style={[styles.container]}>
                    <MediumText sx={styles.containerTitle}>My Activity</MediumText>
                    <View style={{ marginTop: 10 }}>
                        {myActivity.map((item, index) => (
                            <HorizontalMenuCard
                                key={item.id}
                                title={item.title}
                                icon={item.icon}
                                screenName={item.screenName}
                                showBorderBottom={index != myActivity.length - 1}
                            />
                        ))}
                    </View>
                </View> */}
                <View style={[styles.container]}>
                    <MediumText sx={styles.containerTitle}>Earn With Plant Mart</MediumText>
                    <View style={{ marginTop: 10 }}>
                        {earnWithPlantMart.map((item, index) => (
                            <HorizontalMenuCard
                                key={item.id}
                                title={item.title}
                                icon={item.icon}
                                screenName={item.screenName}
                                showBorderBottom={index != earnWithPlantMart.length - 1}
                            />
                        ))}
                    </View>
                </View>
                <View style={[styles.container, { marginBottom: 50 }]}>
                    <MediumText sx={styles.containerTitle}>Feedback and Information</MediumText>
                    <View style={{ marginTop: 10 }}>
                        {feedbackAndInformation.map((item, index) => (
                            <HorizontalMenuCard
                                key={item.id}
                                title={item.title}
                                icon={item.icon}
                                screenName={item.screenName}
                                showBorderBottom={index != feedbackAndInformation.length - 1}
                            />
                        ))}
                    </View>
                </View>
            </ScrollView>
            <View style={styles.bottomTabs}>
                <BottomTabs navigation={navigation} />
            </View>
        </View>
    );
};

const HorizontalMenuCard = ({ icon, title, screenName, showBorderBottom }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            style={[styles.HorizontalMenuCard, showBorderBottom && styles.borderBottom]}
            onPress={() => navigation.navigate(screenName)}>
            <View style={styles.HorizontalMenuCard_left}>
                {icon && icon()}
                <MediumText sx={styles.HorizontalMenuCard_title}>{title}</MediumText>
            </View>
            <View style={styles.HorizontalMenuCard_right}>
                <Icon
                    type="ionicon"
                    name="chevron-forward-outline"
                    color={Colors.black[9]}
                />
            </View>
        </TouchableOpacity>
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
    },
    HorizontalMenuCard: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 5,
        paddingBottom: 10
    },
    HorizontalMenuCard_left: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    HorizontalMenuCard_title: {
        fontFamily: fonts.Montserrat[500],
        fontSize: 13
    },
    bottomTabs: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "white",
        paddingBottom: 5,
        borderTopColor: Colors.backgroundWhite,
        borderTopWidth: 1,
        width: "100%"
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBlockColor: Colors.bgGrey
    },
    blackThemeBTN: {
        backgroundColor: Colors.black[10]
    }
});

const accountSettings = [
    {
        id: 1,
        title: "Plant Mart Plus",
        screenName: "PlantMartPlus",
        icon: () => (
            <Icon
                name="heart-half-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    },
    {
        id: 2,
        title: "Edit Profile",
        screenName: "EditProfileScreen",
        icon: () => (
            <Icon
                name="person-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    },
    {
        id: 4,
        title: "Add New Address",
        screenName: "NewAddressScreen",
        icon: () => (
            <Icon
                name="locate-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    }
];

const myActivity = [
    {
        id: 1,
        title: "Questions and Answers",
        screenName: "plantMartPlus",
        icon: () => (
            <Icon
                name="chatbubbles-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    }
];

const earnWithPlantMart = [
    {
        id: 1,
        title: "Affiliate Program",
        screenName: "AffiliateProgram",
        icon: () => (
            <Icon
                name="card-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    },
    {
        id: 2,
        title: "Referral Program",
        screenName: "ReferralProgram",
        icon: () => (
            <Icon
                name="pricetags-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    }
];

const feedbackAndInformation = [
    {
        id: 1,
        title: "Terms & Conditions",
        screenName: "TermsConditions",
        icon: () => (
            <Icon
                name="document-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    },
    {
        id: 3,
        title: "Privacy Policies",
        screenName: "PrivacyPolicies",
        icon: () => (
            <Icon
                name="checkbox-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    },
    // {
    //     id: 4,
    //     title: "FAQs",
    //     screenName: "faqs",
    //     icon: () => (
    //         <Icon
    //             name="help-circle-outline"
    //             type="ionicon"
    //             size={HorizontalMenuCard_ICON_SIZE}
    //         />
    //     )
    // },
    {
        id: 5,
        title: "Feedback",
        screenName: "Feedback",
        icon: () => (
            <Icon
                name="chatbox-ellipses-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    },
    ,
    // {
    //     id: 6,
    //     title: "Report Product Issues",
    //     screenName: "plantMartPlus",
    //     icon: () => (
    //         <Icon
    //             name="reader-outline"
    //             type="ionicon"
    //             size={HorizontalMenuCard_ICON_SIZE}
    //         />
    //     )
    // },
    {
        id: 7,
        title: "Get Support",
        screenName: "GetSupport",
        icon: () => (
            <Icon
                name="headset-outline"
                type="ionicon"
                size={HorizontalMenuCard_ICON_SIZE}
            />
        )
    }
];
