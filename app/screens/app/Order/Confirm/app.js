import { Animated, View } from "react-native";
import { MediumText, SmallHeadingText, SmallText } from "../../../../Components/Text/Headings/Headings";
import { StyleSheet } from "react-native";
import { fonts } from "../../../../utils/constants/fonts/fonts";
import { Colors } from "../../../../utils/constants/colors/colors";
import { IconButton } from "../../../../Components/Icons/Icon";
import Success from "../../../../Static/lottie/success.json";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Audio } from "expo-av";
import { InfoBox } from "../../../../Components/Box/Info/InfoBox";
import { Icon } from "@rneui/base";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

export const OrderConfirmScreen = ({ route, navigation }) => {
    const lottieAnimationRef = useRef();

    const { estimateDelivery, orderId, totalAmount, totalProducts, userName, userAddress } = route.params.data;

    const orderDetailsObject = [
        {
            title: "Order ID",
            icon: "pricetag-outline",
            iconType: "ionicon",
            value: orderId.substring(0, 15) + "...",
            showCTA: false
        },
        {
            title: "Total Amount",
            icon: "currency-rupee",
            iconType: "material-community",
            value: `₹${totalAmount}`,
            showCTA: false
        },
        {
            title: "Total Items",
            icon: "leaf-outline",
            iconType: "ionicon",
            value: totalProducts,
            showCTA: false
        },
        {
            title: "Estimate Delivery",
            icon: "car-outline",
            iconType: "ionicon",
            value: estimateDelivery,
            showCTA: true,
            screenName: ""
        },
        {
            title: "Order Status",
            icon: "cube-outline",
            iconType: "ionicon",
            value: "Processing",
            showCTA: true,
            screenName: "UserOrdersScreen"
        },
        {
            title: "Delivery Type",
            icon: "speedometer-outline",
            iconType: "ionicon",
            value: "Superfast", //* Standard or super fast
            showCTA: true,
            screenName: ""
        },
        {
            title: "Contact us",
            icon: "call-outline",
            iconType: "ionicon",
            value: "+918767213959", //* Standard or super fast
            showCTA: true,
            screenName: ""
        }
    ];

    useEffect(() => {
        lottieAnimationRef.current?.play(0, 50);
    }, []);

    const [sound, setSound] = useState();

    async function playSound() {
        console.log("Loading Sound");
        const { sound } = await Audio.Sound.createAsync(require("../../../../Static/audio/successAudioTrack.m4a"));
        setSound(sound);

        console.log("Playing Sound");
        await sound.playAsync(); // Wait for playback to finish before continuing
    }

    useEffect(() => {
        // Check if the sound is already loaded
        if (!sound) {
            playSound();
        }
        // Cleanup function
        return () => {
            if (sound) {
                console.log("Unloading Sound");
                sound.unloadAsync();
            }
        };
    }, [sound]);
    return (
        <View style={styles.container}>
            <View style={styles.upperContainer}>
                <View style={styles.successBox}>
                    <View style={styles.upperBox}>
                        <View style={styles.text}>
                            <SmallHeadingText
                                color={Colors.white}
                                sx={{ fontFamily: fonts.Montserrat[600], textAlign: "center" }}>
                                Your order has been placed ❤️
                            </SmallHeadingText>
                            <SmallText
                                color={Colors.lightBlack[1]}
                                sx={{
                                    textAlign: "center",
                                    marginHorizontal: 30,
                                    marginVertical: 5
                                }}>
                                The order confirmation and invoice has been sent you by your email address
                            </SmallText>
                        </View>
                        {/* <View style={styles.orderInfo}>
              <View style={styles.orderInfoSingleBox}>
                <MediumText
                  sx={{
                    fontFamily: fonts.Montserrat[500],
                    textAlign: "center"
                  }}
                  color={Colors.white}>
                  ₹1446
                </MediumText>
                <SmallText
                  sx={{ textAlign: "center" }}
                  color={Colors.lightBlack[1]}>
                  Total amount
                </SmallText>
              </View>
              <View style={styles.orderInfoSingleBox}>
                <MediumText
                  sx={{
                    fontFamily: fonts.Montserrat[500],
                    textAlign: "center"
                  }}
                  color={Colors.white}>
                  2
                </MediumText>
                <SmallText
                  color={Colors.lightBlack[1]}
                  sx={{ textAlign: "center" }}>
                  Items ordered
                </SmallText>
              </View>
              <View style={styles.orderInfoSingleBox}>
                <MediumText
                  sx={{
                    fontFamily: fonts.Montserrat[500],
                    textAlign: "center"
                  }}
                  color={Colors.white}>
                  2 Days
                </MediumText>
                <SmallText
                  color={Colors.lightBlack[1]}
                  sx={{ textAlign: "center" }}>
                  Delivery
                </SmallText>
              </View>
            </View> */}
                        <Animated.View
                            style={{
                                position: "absolute",
                                width: "100%",
                                top: -35,
                                alignSelf: "center"
                                // left: "50%"
                            }}>
                            <View
                                style={{
                                    height: 70,
                                    backgroundColor: Colors.white,
                                    width: 70,
                                    alignSelf: "center",
                                    borderRadius: 50
                                }}>
                                <LottieView
                                    ref={lottieAnimationRef}
                                    source={Success}
                                    loop={false}
                                    autoPlay
                                />
                            </View>
                        </Animated.View>
                    </View>
                    <View style={styles.lowerBox}>
                        <SmallText
                            color={Colors.white}
                            sx={{ fontFamily: fonts.Montserrat[500], textAlign: "center" }}>
                            Thank you for shopping with us 😁
                        </SmallText>
                    </View>
                </View>
            </View>

            <ScrollView
                alwaysBounceVertical={true}
                bounces>
                <View>
                    <InfoBox
                        boxTitle={() => <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Order details</MediumText>}
                        showRightIcon={true}
                        headerStyles={{ paddingBottom: 1 }}
                        // showRightText={true}
                        rightText={"Details"}
                        leftIcon={{
                            iconName: "gift-outline",
                            iconType: "ionicon"
                        }}
                        onRightIconPress={() => navigation.navigate("UserOrdersScreen")}>
                        <View style={styles.orderDetailsBody}>
                            {orderDetailsObject &&
                                orderDetailsObject.map((item, index) => (
                                    <View
                                        style={styles.singleOrderDetailBox}
                                        key={index}>
                                        <Icon
                                            style={styles.iconContainer}
                                            name={item.icon}
                                            type={item.iconType}
                                            solid={false}
                                            size={15}
                                        />
                                        <View style={styles.orderDetailsItemInner}>
                                            <View>
                                                <SmallText color={Colors.lightBlack[2]}>{item.title}</SmallText>
                                                <SmallText sx={{ fontFamily: fonts.Montserrat[600] }}>{item.value}</SmallText>
                                            </View>
                                            {/* {item.showCTA && (
                                                <TouchableOpacity style={{ position: "relative", top: -5 }}>
                                                    <Icon
                                                        type="ionicon"
                                                        name="chevron-forward-outline"
                                                        color={Colors.lightBlack[1]}
                                                    />
                                                </TouchableOpacity>
                                            )} */}
                                        </View>
                                    </View>
                                ))}
                        </View>
                    </InfoBox>

                    <View style={{ marginTop: 5 }}>
                        <InfoBox
                            boxTitle={() => <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Customer details</MediumText>}
                            showRightIcon={true}
                            headerStyles={{ paddingBottom: 1 }}
                            // showRightText={true}
                            rightText={"Details"}
                            leftIcon={{
                                iconName: "person-outline",
                                iconType: "ionicon"
                            }}>
                            <View style={{ paddingVertical: 10 }}>
                                <MediumText>
                                    Deliver to:{" "}
                                    <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
                                        {userName}, {userAddress.postalCode}
                                    </MediumText>
                                </MediumText>
                                <SmallText color={Colors.lightBlack[2]}>
                                    {`${userAddress.street}, ${userAddress.area}, ${userAddress.landMark}, Pune, Maharashtra, ${userAddress.postalCode}`}
                                    <SmallText>+918767213959</SmallText>
                                </SmallText>
                            </View>
                        </InfoBox>
                    </View>
                    <View style={{ marginTop: 5 }}>
                        <InfoBox
                            boxTitle={() => <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>You earned some seeds 🥳</MediumText>}
                            showRightIcon={true}
                            headerStyles={{ paddingBottom: 1 }}
                            // showRightText={true}
                            rightText={"Details"}
                            leftIcon={{
                                iconName: "search-outline",
                                iconType: "ionicon"
                            }}>
                            <View style={{ paddingVertical: 10 }}>
                                <SmallText color={Colors.lightBlack[2]}>
                                    You have earned{" "}
                                    <SmallText
                                        color={Colors.bgBlack}
                                        sx={{ fontFamily: fonts.Montserrat[500] }}>
                                        159 seed
                                    </SmallText>{" "}
                                    by placing this order, You can use this seed next time while doing checkout and you may get some discount using
                                    these seed!
                                </SmallText>
                            </View>
                        </InfoBox>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: "100%"
    },
    upperContainer: {
        backgroundColor: Colors.white,
        marginBottom: 2
    },
    successBox: {
        marginHorizontal: 15,
        marginBottom: 20,
        marginTop: 50,
        position: "relative"
    },
    upperBox: {
        backgroundColor: Colors.bgBlack,
        paddingBottom: 10,
        paddingTop: 55,
        paddingHorizontal: 15,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20
    },
    lowerBox: {
        backgroundColor: Colors.black[9],
        borderBottomRightRadius: 20,
        borderBottomLeftRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    orderInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 10
    },
    orderInfoSingleBox: {
        width: "33.33%"
    },
    orderDetailsBody: {
        paddingVertical: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "flex-start",
        rowGap: 10
    },
    iconContainer: {
        alignSelf: "flex-start",
        marginVertical: 5
    },
    singleOrderDetailBox: {
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 0
        // },
        // shadowOpacity: 0.5,
        // elevation: 10,
        // shadowRadius: 12.35,
        // backgroundColor: "white",
        paddingVertical: 5,
        paddingHorizontal: 10,
        width: "49%",
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "gainsboro"
    },
    orderDetailsItemInner: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    }
});
