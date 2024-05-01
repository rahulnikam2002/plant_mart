/**
 * @responsibility
 *  - This page this responsible for rendering cart screen and its components!
 *
 * @components:
 *  - user info and address details
 *  - in any bank offers/discounts
 *  - Cart items
 *  - All coupons
 *  - price summary
 *  - place order button
 *
 * @functionalities
 *  - Basic cart functionalities
 *  - Generating order id from server
 *  - initiating Razorpay SDK
 *  - Processing and handling payment and edge cases
 *  - Success Redirecting to order completed screen
 */

import { ActivityIndicator, Image, Text } from "react-native";
import { View } from "react-native";
import { ProductPageHeader } from "../../../Components/Headers/PageHeader/ProductsPage/ProductPageHeader";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { TouchableOpacity } from "react-native";
import { MediumText, SmallText } from "../../../Components/Text/Headings/Headings";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { TouchableButton } from "../../../Components/Button/Button";
import { Icon } from "@rneui/base";
import { useCallback, useContext, useState } from "react";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip.js";
import { errorToast } from "../../../utils/toasts/toasts.js";
import { toastConfig } from "../../../utils/toasts/config";
import Toast from "react-native-toast-message";
import RazorpayCheckout from "react-native-razorpay";
import { BackHandler } from "react-native";
import { useEffect } from "react";
import { InfoBox } from "../../../Components/Box/Info/InfoBox.js";
import { AuthContext } from "../../../context/auth/auth.context.js";
import { ScrollView } from "react-native-gesture-handler";
import { AnimatePresence, MotiView } from "moti";

export const CartPage = ({ navigation }) => {
    const { getUserAuthToken, logoutUser } = useContext(AuthContext);

    // * Initializing required useStates
    const [totalCartAmount, setTotalCartAmount] = useState(144699);
    const [checkoutLoading, setCheckoutLoading] = useState(false);
    const [fullScreenLoader, setFullScreenLoader] = useState(false);
    const [authToken, setAuthToken] = useState("");

    // cart product related only
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    // Screen loading related only
    const [loading, setLoading] = useState(false);

    // User address only
    const [userDetails, setUserDetails] = useState(null);
    const [userAddress, setUserAddress] = useState(null);
    const [addressPopupOpen, setAddressPopupOpen] = useState(false);

    // Order btn loading
    const [orderBtnLoading, setOrderBtnLoading] = useState(false);

    // * Invkoking razorpay skd
    // const handleUserCheckout = async () => {
    //     // * Showing button loading
    //     setCheckoutLoading(true);
    //     try {
    //         // * Generating order id before proceeding to checkout screen
    //         const generateOrderId = await axios.post(`${networkIP}/api/payments/order`, { amount: totalCartAmount });

    //         const orderIdObject = generateOrderId.data;
    //         // * Stop button laoding. Ref line no: 33
    //         setCheckoutLoading(false);

    //         // * Checking if order id doesn't exist
    //         if (!orderIdObject.id) {
    //             errorToast("Checkout failed", "Please try again to checkout!");
    //             return;
    //         }

    //         // * If order id exist, We need to create a payment option object whhere we will store all payment information!
    //         const options = {
    //             description: "Plant Mart order summary",
    //             image: "https://res.cloudinary.com/dhelycucn/image/upload/v1699949404/global/Logo/ic_launcher_qotxxt.png",
    //             currency: "INR",
    //             key: "rzp_test_WEdUuBSsAktdDV",
    //             amount: orderIdObject.amount,
    //             name: "Rahul Rajesh Nikam",
    //             order_id: orderIdObject.id,
    //             theme: { color: Colors.bgBlack },
    //             method: "netbanking",
    //             bank: "HDFC"
    //         };

    //         // * If razorpay sdk fails
    //         if (!RazorpayCheckout) {
    //             errorToast("Payment Initialization Error", "Failed to initialize Payment. Please try again.");
    //             return;
    //         }

    //         // * Authorizing payment and transferring user to payment screen
    //         const authorizePayment = await RazorpayCheckout.open(options);

    //         // * Once user did payment we start screen loading, so and will check for payment status (Completed || on Hold || failed)
    //         setFullScreenLoader(true);

    //         /*
    //          * @Callback: Verifying the success callback. If successful, the response will include:
    //          *   - Order ID
    //          *   - Payment ID
    //          *   - Razorpay signature (HMAC SHA256)
    //          */

    //         if (authorizePayment.razorpay_signature && authorizePayment.razorpay_payment_id && authorizePayment.razorpay_order_id) {
    //             // * Verifying signature
    //             verifyPaymentSignature(authorizePayment);
    //         } else {
    //             // * If succes callback fails, we stop showing loading screen and in this case payment is failed!
    //             setFullScreenLoader(false);
    //             errorToast("Payment failed or on hold", "Let us check the status and will update it in you orders");
    //         }
    //     } catch (checkoutError) {
    //         //* Catching all possible exception
    //         console.log(checkoutError);
    //         setFullScreenLoader(false);
    //         errorToast("Checkout failed", "Our bad! kindly try again ❤️");
    //     }
    // };

    /*
     * @Note: This step is essential to authenticate the details returned to the checkout screen
     *        for successful payments. It ensures the integrity and validity of the received information.
     */

    const verifyPaymentSignature = async (paymentData) => {
        try {
            /*
             * @Request: sending #POST reuest to server to authenticate the payment status
             * @Status: either fully completed or failed
             * @Body: - Razorpay Order ID
             *        - Razoorpay Payment ID
             *        - Razoorpay Signature
             *
             * @Response:
             *  - Success:  {"code": 200, "msg": "Payment Successful"}
             *  - Failed:  {"code": 7, "msg": "Payment Failed"}
             */

            const verfySignature = await axios.post(`${networkIP}/api/payments/verify`, {
                orderId: paymentData.razorpay_order_id,
                paymentId: paymentData.razorpay_payment_id,
                razorpaySignature: paymentData.razorpay_signature
            });
            // * Extracting data object from res
            const signatureData = verfySignature.data;

            // * Stop loading screen (fullScreenLoading)
            setFullScreenLoader(false);

            // * if payment fails
            if (signatureData.code !== 200) {
                errorToast("Payment Unsuccessful", "No funds were debited from your account.");
            }

            // * if success, redirecting user  to order confirm screen
            navigation.navigate("orderConfirmScreen");
        } catch (paymentError) {
            //* Catching all possible exception
            console.log(paymentError);
            errorToast("Payment Unsuccessful", "No funds were debited from your account.");
        }
    };

    const handleUserCheckout = useCallback(async () => {
        try {
            setOrderBtnLoading(true);
            let productsStructure = [];
            let totalAmount = 0;
            if (products.length > 1) {
                for (product in products) {
                    const quantity = Number(products[product].quantity);
                    const productPrice = Number(products[product].productId.salePrice);
                    totalAmount += quantity * productPrice;
                    productsStructure.push({ product: products[product].productId._id, quantity, price: quantity * productPrice });
                }
            } else {
                const quantity = Number(products[0].quantity);
                const productPrice = Number(products[0].productId.salePrice);
                totalAmount = quantity * productPrice;
                productsStructure.push({ product: products[0].productId._id, quantity, price: quantity * productPrice });
            }

            if (!authToken) {
                const userAuthToken = await getUserAuthToken();
                setAuthToken(userAuthToken);
            }

            const { _id, ...restAddress } = userAddress;
            const makeNewOrder = await axios.post(
                `${networkIP}/api/orders/new`,
                {
                    products: productsStructure,
                    deliveryStatus: "Processing",
                    totalAmount,
                    totalProducts: productsStructure.length,
                    deliveryAddress: restAddress
                },
                {
                    headers: {
                        "user-auth-token": authToken
                    }
                }
            );
            const newOrder = makeNewOrder.data;
            setOrderBtnLoading(false);

            const today = new Date();
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1); // Add a day to today's date

            const formattedDate = formatDate(tomorrow);

            if (newOrder.orderStatus) {
                navigation.navigate("orderConfirmScreen", {
                    data: {
                        orderId: newOrder.createNewOrderToDatabase._id,
                        totalAmount: newOrder.createNewOrderToDatabase.totalAmount,
                        totalProducts: newOrder.createNewOrderToDatabase.totalProducts,
                        estimateDelivery: formattedDate,
                        userAddress: newOrder.createNewOrderToDatabase.deliveryAddress,
                        userName: userDetails.name
                    }
                });
                return;
            }
            return errorToast("Something went wrong", "Please try ordering again from cart");
        } catch (error) {
            setOrderBtnLoading(false);
            errorToast("Something went wrong", "Please try ordering again from cart");
            console.log(error);
        }
    }, [products, userAddress]);

    const fetchProductsFromCart = useCallback(async () => {
        try {
            setLoading(true);
            const userAuthToken = await getUserAuthToken();
            console.log({ userAuthToken });
            setAuthToken(userAuthToken);
            const products = await axios.get(`${networkIP}/api/cart/get/product`, {
                headers: {
                    "user-auth-token": userAuthToken
                }
            });

            setProducts(products.data);
            setUserDetails(products.data[0]?.userId);
            setUserAddress(products.data[0]?.userId.address[0]);

            let sum = 0;
            for (let i = 0; i < products.data.length; i++) {
                let quantity = products.data[i].quantity * products.data[i].productId.salePrice;
                sum = sum + quantity;
            }

            // Update the totalCartAmount state with the calculated sum
            setTotalPrice(sum);
            setLoading(false);
        } catch (error) {
            const { tokenExired } = error.response.data;

            if (tokenExired) {
                logoutUser();
            }

            setLoading(false);
            errorToast("Something went wrong!", "Please try again to fetch all products");
        }
    }, [products]);

    useEffect(() => {
        const backAction = () => {
            navigation.navigate("homeScreen");
            return true;
        };

        const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
        fetchProductsFromCart();

        return () => backHandler.remove();
    }, []);

    return (
        // Div => View
        <View>
            <ScrollView style={styles.parent}>
                <View style={styles.header}>
                    <ProductPageHeader
                        title={"Shopping cart"}
                        showSubTitle={false}
                        showLogo={false}
                        showCart={false}
                    />
                </View>

                <View style={{ marginTop: 5 }}>
                    {products.length > 0 && (
                        <InfoBox
                            boxTitle={() => (
                                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>
                                    Expected delivery in <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>1 Days</MediumText>
                                </MediumText>
                            )}
                            leftIcon={{
                                iconName: "time-outline",
                                iconType: "ionicon",
                                iconColor: Colors.green.bsae,
                                iconSize: 20
                            }}
                            onRightIconPress={() => setAddressPopupOpen(true)}>
                            <View style={styles.userInfo}>
                                <View style={styles.userAddress}>
                                    {userDetails && userAddress ? (
                                        <View style={styles.userAddressSectionLeft}>
                                            <MediumText>
                                                Deliver to:{" "}
                                                <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
                                                    {userDetails.name}, {userAddress.postalCode}
                                                </MediumText>
                                            </MediumText>
                                            <SmallText color={Colors.lightBlack[2]}>
                                                {`${userAddress.street}, ${userAddress.area}, ${userAddress.landMark}, Pune, Maharashtra, ${userAddress.postalCode}`}
                                                {/* <SmallText>+918767213959</SmallText> */}
                                            </SmallText>
                                        </View>
                                    ) : (
                                        <View>
                                            <MediumText>Loading...</MediumText>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </InfoBox>
                    )}
                </View>

                <View style={{ marginTop: 5 }}>
                    <InfoBox
                        leftIcon={{
                            iconName: "cart-outline",
                            iconType: "ionicon",
                            iconSize: 20,
                            iconColor: Colors.green.bsae
                        }}
                        boxTitle={() => <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Product List</MediumText>}
                        showRightIcon={false}>
                        {!loading && products.length > 0 ? (
                            <View style={styles.productsListContainer}>
                                <AnimatePresence>
                                    {products &&
                                        products.map((item, index) => (
                                            <MotiView
                                                key={item.productId._id}
                                                from={{ opacity: 0, translateY: -100 }}
                                                animate={{ opacity: 1, translateY: 0 }}
                                                exit={{ opacity: 0, translateX: -300 }}
                                                transition={{ duration: 500 }}>
                                                <SingleProductDisplay
                                                    productName={item.productId.productName}
                                                    productImg={item.productId?.featuredImages[0]}
                                                    productPrice={item.productId.salePrice}
                                                    quantity={item.quantity}
                                                    productId={item.productId._id}
                                                    authToken={authToken}
                                                    fetchProductsFromCart={fetchProductsFromCart}
                                                    setLoading={setLoading}
                                                />
                                            </MotiView>
                                        ))}
                                </AnimatePresence>
                            </View>
                        ) : (
                            <View style={{ paddingVertical: 10 }}>
                                <MediumText>No Products in Cart</MediumText>
                            </View>
                        )}
                    </InfoBox>
                </View>

                <View style={{ marginTop: 5 }}>
                    <InfoBox
                        leftIcon={{
                            iconName: "pricetag-outline",
                            iconType: "ionicon",
                            iconSize: 20,
                            iconColor: Colors.green.bsae
                        }}
                        boxTitle={() => <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Delivery & Payment Mode</MediumText>}
                        showRightIcon={false}
                        showRightText={true}
                        // rightText={() => (
                        //     <TouchableOpacity style={styles}>
                        //         <SmallText
                        //             sx={{ fontFamily: fonts.Montserrat[500] }}
                        //             color={Colors.red.base}>
                        //             All Coupons
                        //         </SmallText>
                        //     </TouchableOpacity>
                        // )}
                    >
                        <View style={{ paddingVertical: 10 }}>
                            <MediumText>
                                We currently support only{" "}
                                <MediumText
                                    sx={{ fontFamily: fonts.Montserrat[500] }}
                                    color={Colors.black[10]}>
                                    Cash on Delivery
                                </MediumText>
                            </MediumText>
                        </View>
                    </InfoBox>
                </View>

                <View style={{ marginTop: 5, marginBottom: 100 }}>
                    <InfoBox
                        leftIcon={{
                            iconName: "card-outline",
                            iconType: "ionicon",
                            iconSize: 20,
                            iconColor: Colors.green.bsae
                        }}
                        boxTitle={() => <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Price Summary</MediumText>}
                        showRightIcon={false}>
                        <View>
                            <View style={[styles.spaceBwtween, styles.singlePriceList]}>
                                <SmallText>Total MRP</SmallText>
                                <SmallText
                                    sx={{
                                        fontFamily: fonts.Montserrat[500]
                                    }}>
                                    ₹{totalPrice}
                                </SmallText>
                            </View>
                            <View style={[styles.spaceBwtween, styles.singlePriceList]}>
                                <SmallText>Discount on MRP</SmallText>
                                <SmallText
                                    sx={{
                                        fontFamily: fonts.Montserrat[500]
                                    }}
                                    color={Colors.green.bsae}>
                                    0
                                </SmallText>
                            </View>
                            <View style={[styles.spaceBwtween, styles.singlePriceList]}>
                                <SmallText>Coupon Discount</SmallText>
                                <SmallText
                                    sx={{
                                        fontFamily: fonts.Montserrat[500]
                                    }}
                                    color={Colors.red.base}>
                                    Apply Coupon
                                </SmallText>
                            </View>
                        </View>
                        <View style={styles.calcAmoutSec}>
                            <View style={styles.spaceBwtween}>
                                <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>Total Amount</MediumText>
                                <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>₹{totalPrice}</MediumText>
                            </View>
                        </View>
                    </InfoBox>
                </View>

                <Toast config={toastConfig} />

                {fullScreenLoader && (
                    <View style={styles.fullScreenLoading}>
                        <ActivityIndicator
                            color={Colors.bgBlack}
                            size={30}
                        />
                    </View>
                )}
            </ScrollView>
            <View style={styles.checkoutSection}>
                <TouchableButton
                    title={"Place Order"}
                    // onPress={() => deleteThisLater()}
                    onPress={() => handleUserCheckout()}
                    // onPress={() => navigation.navigate("orderConfirmScreen")}
                    txtWidth={"100%"}
                    btnWidth={"100%"}
                    hidden={!products.length > 0}
                    loading={orderBtnLoading}
                />
            </View>

            {loading && (
                <View style={{ position: "absolute", top: 0, width: "100%", height: "100%", backgroundColor: "#00000080", justifyContent: "center" }}>
                    <ActivityIndicator
                        color={Colors.black[10]}
                        size={30}
                    />
                </View>
            )}

            <AnimatePresence>
                {addressPopupOpen && (
                    <MotiView
                        onTouchStart={() => setAddressPopupOpen(false)}
                        from={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.addressPopup}>
                        <MotiView
                            onTouchStart={(e) => e.stopPropagation()}
                            from={{ height: "0%" }}
                            animate={{ height: "50%" }}
                            exit={{ height: "0%" }}
                            transition={{ type: "timing" }}
                            style={styles.innerAddressTab}>
                            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                                <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>Select Address</MediumText>
                                <TouchableOpacity onPress={() => setAddressPopupOpen(false)}>
                                    <Icon
                                        name="close"
                                        type="ionicon"
                                    />
                                </TouchableOpacity>
                            </View>

                            <View>
                                <ScrollView style={{ height: "80%", paddingBottom: 40 }}>
                                    {userDetails &&
                                        userAddress &&
                                        userDetails.address.map((item, index) => (
                                            <TouchableOpacity
                                                onPress={() => {
                                                    setUserAddress(userDetails.address[index]);
                                                    setAddressPopupOpen(false);
                                                }}
                                                key={index}
                                                style={styles.singleAddress_popup}>
                                                <View style={styles.userAddressSectionLeft}>
                                                    <MediumText>
                                                        Deliver to:{" "}
                                                        <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
                                                            {userDetails.name}, {item.postalCode}
                                                        </MediumText>
                                                    </MediumText>
                                                    <SmallText color={Colors.lightBlack[2]}>
                                                        {`${item.street}, ${item.area}, ${item.landMark}, Pune, Maharashtra, ${item.postalCode}`}
                                                        {/* <SmallText>+918767213959</SmallText> */}
                                                    </SmallText>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                </ScrollView>
                                <View style={{ marginTop: 10 }}>
                                    <TouchableButton
                                        onPress={() => navigation.navigate("NewAddressScreen")}
                                        btnWidth={"100%"}
                                        txtWidth={"100%"}
                                        hidden={false}
                                        title="Create New Address"
                                    />
                                </View>
                            </View>
                        </MotiView>
                    </MotiView>
                )}
            </AnimatePresence>
        </View>
    );
};

const SingleProductDisplay = ({ productName, quantity, productImg, productPrice, productId, authToken, fetchProductsFromCart, setLoading }) => {
    const [newQuantity, setNewQuantity] = useState(quantity);

    const handleRemoveFromCart = async () => {
        try {
            setLoading(true);
            const deleteProduct = await axios.post(
                `${networkIP}/api/cart/delete/product`,
                { productId },
                {
                    headers: {
                        "user-auth-token": authToken
                    }
                }
            );

            await fetchProductsFromCart();
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleIncrementQuantity = async () => {
        try {
            setLoading(true);
            let updatedQuantity = newQuantity + 1;
            const incrementQuantity = await axios.post(
                `${networkIP}/api/cart/add/product`,
                { productId, quantity: updatedQuantity },
                {
                    headers: {
                        "user-auth-token": authToken
                    }
                }
            );

            await fetchProductsFromCart();

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleDecrementQuantity = async () => {
        try {
            setLoading(true);
            let updatedQuantity = newQuantity - 1;
            const incrementQuantity = await axios.post(
                `${networkIP}/api/cart/add/product`,
                { productId, quantity: updatedQuantity },
                {
                    headers: {
                        "user-auth-token": authToken
                    }
                }
            );

            await fetchProductsFromCart();

            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        setNewQuantity(quantity);
    }, [quantity]);

    return (
        <View>
            {/* img */}
            <View style={styles.SingleProductDisplay}>
                <Image
                    style={styles.SingleProductDisplay_IMG}
                    source={{ uri: productImg }}
                    width={100}
                    height={120}
                />
                <View style={styles.SingleProductDisplay_Desc}>
                    <View>
                        <MediumText sx={{ fontSize: 13, fontFamily: fonts.Montserrat[500] }}>{productName}</MediumText>
                        <View style={{ marginTop: 5, flexDirection: "row", alignItems: "center", gap: 10 }}>
                            <View style={styles.SingleProductDisplay_Desc_quantity}>
                                <MediumText sx={{ fontFamily: fonts.Montserrat[500], fontSize: 10 }}>Quantity: {quantity}</MediumText>
                            </View>
                            <View>
                                <MediumText
                                    sx={{ fontFamily: fonts.Montserrat[500] }}
                                    color={Colors.green.bsae}>
                                    ₹{productPrice * quantity}
                                </MediumText>
                            </View>
                        </View>
                    </View>
                    <View>
                        <MediumText
                            sx={{
                                fontFamily: fonts.Montserrat[500],
                                fontSize: 10,
                                marginVertical: 5,
                                backgroundColor: Colors.green[9],
                                paddingVertical: 4,
                                paddingHorizontal: 5,
                                borderRadius: 5
                            }}
                            color={Colors.green.bsae}>
                            1 day fast delivery available
                        </MediumText>
                        <View style={styles.SingleProductDisplay_Desc_actions}>
                            <TouchableOpacity
                                onPress={handleRemoveFromCart}
                                style={[styles.SingleProductDisplay_Desc_actionsSingle, styles.deleteProduct]}>
                                <Icon
                                    type="ionicon"
                                    name="trash-outline"
                                    size={20}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handleDecrementQuantity}
                                style={styles.SingleProductDisplay_Desc_actionsSingle}>
                                <Icon
                                    type="ionicon"
                                    name="remove"
                                    size={20}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleIncrementQuantity}
                                style={styles.SingleProductDisplay_Desc_actionsSingle}>
                                <Icon
                                    type="ionicon"
                                    name="add"
                                    size={20}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    parent: {
        height: "100%"
    },
    header: {
        backgroundColor: Colors.white,
        marginBottom: 2
    },
    addreddSecHeaderLeft: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    // ctaIcon: {
    //   position: "relative",
    //   top: -5,
    //   right: -5
    // },
    userAddress: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10
        // paddingHorizontal: 10
    },
    checkoutSection: {
        position: "absolute",
        bottom: 0,
        backgroundColor: Colors.white,
        width: "100%",
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    couponSection: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5
    },
    couponHeaderLeft: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    couponHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    priceSection: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginTop: 5
    },
    spaceBwtween: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    singlePriceList: {
        marginVertical: 6
    },
    calcAmoutSec: {
        borderTopWidth: 0.5,
        borderTopColor: Colors.lightBlack[3],
        marginTop: 8,
        paddingVertical: 5,
        paddingBottom: 15
    },
    fullScreenLoading: {
        height: "100%",
        justifyContent: "center",
        backgroundColor: "#00000080",
        position: "absolute",
        top: 0,
        width: "100%"
    },
    productsListContainer: {
        paddingVertical: 10
    },
    SingleProductDisplay: {
        marginVertical: 5,
        flexDirection: "row",
        gap: 10,
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: Colors.backgroundWhite,
        borderRadius: 2,
        paddingVertical: 10
    },
    SingleProductDisplay_IMG: {
        borderRadius: 2,
        width: "30%",
        resizeMode: "cover"
    },
    SingleProductDisplay_Desc: {
        width: "65%"
    },
    SingleProductDisplay_Desc_quantity: {
        fontFamily: fonts.Montserrat[500],
        backgroundColor: Colors.backgroundWhite,
        alignSelf: "flex-start",
        borderRadius: 50,

        // height: 25,
        // width: 25,
        paddingVertical: 5,
        paddingHorizontal: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center"
    },
    SingleProductDisplay_Desc_actions: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        marginTop: 5
    },
    SingleProductDisplay_Desc_actionsSingle: {
        backgroundColor: Colors.backgroundWhite,
        width: 25,
        height: 25,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    deleteProduct: {
        // backgroundColor: Colors.red.base
    },
    addressPopup: {
        position: "absolute",
        top: 0,
        height: "100%",
        width: "100%",
        backgroundColor: "#00000060"
    },
    innerAddressTab: {
        backgroundColor: Colors.white,
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 15,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15
    },
    singleAddress_popup: {
        backgroundColor: Colors.backgroundWhite,
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    }
});

/*

<View style={styles.userAddressSectionLeft}>
          <MediumText>
            Deliver to:{" "}
            <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
              Rahul Rajesh Nikam
            </MediumText>
          </MediumText>
          <SmallText>House No - 5, Nikam House, Samarth Nagar, Murde, 415709</SmallText>
        </View>
        <View style={styles.userAddressSectionRight}>
          <TouchableOpacity>
            <MediumText sx={{ fontFamily: fonts.Montserrat[500] }} color={Colors.red.base}>CHANGE</MediumText>
          </TouchableOpacity>
        </View>

*/

/**
 * @Tomo tasks
 * Write edge cases for generating orders
 * Fix Razorpay Payment bugs | imp
 * Initiate user Payments
 * Complete order's confirm screen | imp
 * Handle unsuccess payments
 * Build single product screen
 */

function formatDate(date) {
    const day = date.getDate();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();

    // Add the ordinal suffix for the day
    const suffixes = ["st", "nd", "rd"];
    const suffix = day < 4 ? suffixes[day - 1] : "th";

    return `${day}${suffix} ${monthNames[monthIndex]} ${year}`;
}
