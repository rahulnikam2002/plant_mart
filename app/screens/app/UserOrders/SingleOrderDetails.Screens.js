import { ActivityIndicator, Image, View } from "react-native";
import { MediumText, SmallHeadingText, SmallText } from "../../../Components/Text/Headings/Headings";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip";
import { errorToast } from "../../../utils/toasts/toasts";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { Icon } from "@rneui/base";
import { TouchableButton } from "../../../Components/Button/Button";
import { useNavigation } from "@react-navigation/native";

const formatDate = (dateObj) => {
    const timestamp = dateObj;
    const date = new Date(timestamp);

    const options = { year: "numeric", month: "short", day: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
};

export const SingleOrderDetails = ({ route }) => {
    const navigation = useNavigation();
    const { orderId, userAuthToken, productObjId } = route.params;
    const [orderDetail, setOrderDetails] = useState();
    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const fetchSingleOrderDetails = useCallback(async () => {
        try {
            setLoading(true);
            const singleOrderDetails = await axios.post(
                `${networkIP}/api/orders/users/orders/single`,
                { orderId, productObjId },
                {
                    headers: {
                        "user-auth-token": userAuthToken
                    }
                }
            );
            const response = singleOrderDetails.data;
            console.log("New res =================>", response);
            setOrderDetails(response);
            setLoading(false);
        } catch (error) {
            console.log({ error });
            setLoading(false);
            errorToast("Server Issue", "Try again after sometime");
        }
    }, [orderDetail]);

    const cancelOrder = async () => {
        try {
            setBtnLoading(true);
            const cancellingOrder = await axios.put(
                `${networkIP}/api/orders/cancel`,
                {
                    orderId,
                    productId: productObjId,
                    updateStatusTo: "Cancelled"
                },
                {
                    headers: {
                        "user-auth-token": userAuthToken
                    }
                }
            );

            const response = cancellingOrder.data;
            setBtnLoading(false);
            navigation.goBack();
        } catch (error) {
            console.log(error);
            setBtnLoading(false);
            errorToast("Something went wrong", "Please try again!");
        }
    };

    useEffect(() => {
        fetchSingleOrderDetails();
    }, []);

    return (
        <View>
            {!loading && orderDetail ? (
                <View style={{ marginTop: 1 }}>
                    <View style={styles.container}>
                        <SmallText
                            sx={{ fontFamily: fonts.Montserrat[500] }}
                            color={Colors.lightBlack[2]}>
                            Order id: {orderId}
                        </SmallText>
                    </View>
                    <View style={styles.container}>
                        <View style={styles.prodArea}>
                            <View style={{ width: "70%" }}>
                                <SmallHeadingText sx={{ fontFamily: fonts.Montserrat[500] }}>
                                    {orderDetail?.singleProduct[0].product.productName}
                                </SmallHeadingText>
                                <MediumText
                                    sx={{ fontFamily: fonts.Montserrat[600] }}
                                    color={Colors.lightBlack[2]}>
                                    ₹{orderDetail?.singleProduct[0].price}
                                </MediumText>
                                <MediumText
                                    sx={{ fontFamily: fonts.Montserrat[500], marginTop: 10 }}
                                    color={Colors.lightBlack[2]}>
                                    Orderd on: {formatDate(orderDetail.createdAt)}
                                </MediumText>
                                <MediumText
                                    sx={{ fontFamily: fonts.Montserrat[500] }}
                                    color={Colors.lightBlack[2]}>
                                    Product was ordered on Plat Mart
                                </MediumText>
                            </View>
                            <View>
                                <Image
                                    width={80}
                                    height={80}
                                    style={styles.prodImg}
                                    source={{ uri: orderDetail?.singleProduct[0].product.featuredImages[0] }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <MediumText sx={{ fontFamily: fonts.Montserrat[600], fontSize: 16 }}>Shipping Status</MediumText>
                        {orderDetail?.singleProduct[0]?.deliveryStatus == "Processing" && <InProgressTimeLine />}
                        {orderDetail?.singleProduct[0]?.deliveryStatus == "Cancelled" && <CancelledTimeLine />}
                        {orderDetail?.singleProduct[0]?.deliveryStatus == "Delivered" && <DeliveredTimeLine />}
                    </View>
                    <View style={styles.container}>
                        <MediumText sx={{ fontFamily: fonts.Montserrat[600], fontSize: 16 }}>Shipping Address</MediumText>
                        <View style={{ marginTop: 10 }}>
                            <MediumText>{`${orderDetail?.deliveryAddress.street}, ${orderDetail?.deliveryAddress.area}, ${orderDetail?.deliveryAddress.landMark}, Pune, Maharashtra - ${orderDetail?.deliveryAddress.postalCode}`}</MediumText>
                        </View>
                    </View>
                    {orderDetail?.singleProduct[0]?.deliveryStatus !== "Cancelled" &&
                        orderDetail?.singleProduct[0]?.deliveryStatus !== "Delivered" && (
                            <View style={styles.container}>
                                <TouchableButton
                                    hidden={false}
                                    btnWidth={"100%"}
                                    txtWidth={"100%"}
                                    title={"Cancel Order"}
                                    onPress={cancelOrder}
                                    loading={btnLoading}
                                />
                            </View>
                        )}
                </View>
            ) : (
                <View style={{ height: "100%", justifyContent: "center" }}>
                    <ActivityIndicator
                        size={30}
                        color={Colors.black[10]}
                    />
                </View>
            )}
        </View>
    );
};

const InProgressTimeLine = ({ orderDetail }) => {
    return (
        <View style={{ flexDirection: "column", alignSelf: "flex-start", marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Icon
                    type="ionicon"
                    name="checkmark-circle-sharp"
                    color={Colors.green.bsae}
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Order Confirmed by Plant Mart</MediumText>
            </View>
            <View style={styles.line}></View>
            <View style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Icon
                    type="ionicon"
                    name="checkmark-circle-sharp"
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>On the way</MediumText>
            </View>
        </View>
    );
};

const CancelledTimeLine = ({ orderDetail }) => {
    return (
        <View style={{ flexDirection: "column", alignSelf: "flex-start", marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Icon
                    type="ionicon"
                    name="checkmark-circle-sharp"
                    color={Colors.green.bsae}
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Order Confirmed by Plant Mart</MediumText>
            </View>
            <View style={styles.line}></View>
            <View style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Icon
                    type="ionicon"
                    name="checkmark-circle-sharp"
                    color={Colors.red[9]}
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Order was cancelled</MediumText>
            </View>
        </View>
    );
};

const DeliveredTimeLine = ({ orderDetail }) => {
    return (
        <View style={{ flexDirection: "column", alignSelf: "flex-start", marginTop: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Icon
                    type="ionicon"
                    name="checkmark-circle-sharp"
                    color={Colors.green.bsae}
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Order Confirmed by Plant Mart</MediumText>
            </View>
            <View style={styles.line}></View>
            <View style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Icon
                    type="ionicon"
                    name="checkmark-circle-sharp"
                    color={Colors.green.bsae}
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Out for delivery</MediumText>
            </View>
            <View style={styles.line}></View>
            <View style={{ alignSelf: "flex-start", flexDirection: "row", alignItems: "center", gap: 5 }}>
                <Icon
                    type="ionicon"
                    name="checkmark-circle-sharp"
                    color={Colors.green.bsae}
                />
                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Order delivered</MediumText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginBottom: 1,
        paddingHorizontal: 15,
        paddingVertical: 10
    },
    prodImg: {
        borderRadius: 5
    },
    prodArea: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    bulletPoint: {
        height: 10,
        width: 10,
        borderRadius: 50,
        backgroundColor: Colors.green.bsae
    },
    line: {
        width: 2,
        height: 30,
        backgroundColor: Colors.green.bsae,
        position: "relative",
        left: 10
    }
});
