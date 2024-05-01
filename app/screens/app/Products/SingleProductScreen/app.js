import { ActivityIndicator, Animated } from "react-native";
import { MediumText, SmallText } from "../../../../Components/Text/Headings/Headings";
import { useCallback, useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { StyleSheet } from "react-native";
import { fonts } from "../../../../utils/constants/fonts/fonts";
import { ProductPageHeader } from "../../../../Components/Headers/PageHeader/ProductsPage/ProductPageHeader";
import { Colors } from "../../../../utils/constants/colors/colors";
import LottieView from "lottie-react-native";
import fastDeliveryLottieJSON from "../../../../Static/lottie/fastDelivery.json";
import { TouchableButton } from "../../../../Components/Button/Button";
import { Icon } from "@rneui/base";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { TouchableOpacity } from "react-native";
import { pinCodes } from "../../../../Static/data/pincodes/pincodes";
import { errorToast, infoToast, successToast } from "../../../../utils/toasts/toasts";
import { useRoute } from "@react-navigation/native";
import axios from "axios";
import { networkIP } from "../../../../utils/constants/ip";
import { AuthContext } from "../../../../context/auth/auth.context";

const IMGHEIGHT = 350;

export const SingleProductScreen = ({ navigation }) => {
    const { getUserAuthToken } = useContext(AuthContext);
    const { singleProductData, productId } = useRoute().params;
    // const { productImg, productName, description, productSalePrice, productPrice } = singleProductData;
    const [productDetails, setProductDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [finalProductPrice, setFinalProductPrice] = useState();

    // Cart related
    const [updateQuantity, setProductQuantity] = useState(1);

    const getProductDetails = useCallback(async () => {
        try {
            setLoading(true);
            const productData = await axios.get(`${networkIP}/api/products/search/id/${productId}`);
            const response = productData.data;
            setProductDetails(response);
            console.log({ response });
            setFinalProductPrice(response.salePrice);
            setLoading(false);
        } catch (error) {
            errorToast("Server issue", "unable to load data, try again");
        }
    }, [productId]);

    const addProductToCart = async () => {
        try {
            const userAuthToken = await getUserAuthToken();
            const addToCart = await axios.post(
                `${networkIP}/api/cart/add/product`,
                { productId, quantity: updateQuantity },
                {
                    headers: {
                        "user-auth-token": userAuthToken
                    }
                }
            );

            console.log(addToCart.data);
        } catch (error) {
            console.error(error);
        }
    };

    const directPurchase = async () => {
        await addProductToCart();
        navigation.navigate("cartScreen");
    };

    useEffect(() => {
        getProductDetails();
    }, [productId]);

    return !loading && productDetails ? (
        <View style={{ height: "100%" }}>
            <ProductPageHeader
                title={"Product"}
                subTitle={productDetails?.productName?.substring(0, 30) + "..."}
                showSubTitle={true}
                showLogo={false}
                showCart={true}
                showWishlist={false}
            />
            <ScrollView keyboardShouldPersistTaps={"always"}>
                {/* Product images */}
                <ProductImages
                    image={productDetails.featuredImages && productDetails.featuredImages.length >= 2 ? productDetails.featuredImages[0] : null}
                />

                <View style={styles.mainInfoSection}>
                    {/* Product name price info */}
                    <ProductInfo
                        productName={productDetails.productName}
                        salePrice={productDetails.salePrice}
                        originalPrice={productDetails.originalPrice}
                        description={productDetails.productDescription}
                        productPrice={finalProductPrice}
                        addProductToCart={addProductToCart}
                        directPurchase={directPurchase}
                        sciName={productDetails.scientificName}
                    />

                    {/* Delivery & services */}
                    <QuantitySelection
                        setFinalProductPrice={setFinalProductPrice}
                        productSalePrice={productDetails.salePrice}
                        setProductQuantity={setProductQuantity}
                        updateQuantity={updateQuantity}
                    />

                    {/* Express delivery */}
                    <ExpressDeliveryContainer />

                    {/* Check devlivery option */}
                    <CheckDelivery addProductToCart={addProductToCart} />

                    {/* Delivery & services */}
                    <DeliveryAndServices />

                    <ProductDescription description={productDetails.productDescription} />
                    {/* <View style={{ marginVertical: 40 }}></View> */}
                </View>
            </ScrollView>
        </View>
    ) : (
        <View style={{ height: "100%", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
            <ActivityIndicator
                size={30}
                color={Colors.bgBlack}
            />
        </View>
    );
};

const ProductImages = ({ image }) => {
    return (
        <View style={{ backgroundColor: Colors.white }}>
            <Animated.Image
                style={styles.banner}
                source={{
                    uri: image
                }}
                resizeMode={"cover"}></Animated.Image>
        </View>
    );
};

const ProductInfo = ({ productName, salePrice, originalPrice, description, productPrice, addProductToCart, sciName, directPurchase }) => {
    return (
        <View style={styles.productInfo}>
            <MediumText sx={{ fontFamily: fonts.Montserrat[500], fontSize: 15, marginBottom: 5 }}>
                {productName} | {sciName}
            </MediumText>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <MediumText
                    color={Colors.lightBlack[1]}
                    sx={{ fontSize: 12 }}>
                    MRP <MediumText sx={{ textDecorationLine: "line-through", fontSize: 12 }}>₹{originalPrice}</MediumText>
                </MediumText>
                <MediumText>
                    <MediumText
                        color={Colors.black[10]}
                        sx={{ fontFamily: fonts.Montserrat[500], fontSize: 20 }}>
                        ₹{salePrice}
                    </MediumText>
                </MediumText>
            </View>
            <View style={styles.shortDescription}>
                <SmallText
                    color={Colors.black[9]}
                    sx={{ marginVertical: 5, fontFamily: fonts.Montserrat[500] }}>
                    {description?.substring(0, 200)}...
                </SmallText>
            </View>
            <TouchableButton
                hidden={false}
                onPress={directPurchase}
                title={`Buy now | ${productPrice}`}
                txtWidth={"100%"}
                btnWidth={"100%"}
            />
        </View>
    );
};

const ExpressDeliveryContainer = () => {
    return (
        <View style={styles.fastDeliverySection}>
            <View
                style={{
                    height: 30,
                    width: 30,
                    backgroundColor: Colors.white,
                    alignSelf: "flex-start"
                }}>
                <LottieView
                    source={fastDeliveryLottieJSON}
                    autoPlay={true}
                    loop={true}
                />
            </View>
            <View>
                <SmallText>
                    <SmallText sx={{ fontFamily: fonts.Montserrat[600] }}>Plant Mart Express</SmallText> 1 Day Delivery
                </SmallText>
            </View>
        </View>
    );
};

const DeliveryAndServices = () => {
    const getTomDate = () => {
        let today = new Date();

        // Array of month names
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        // Get the day, month, and year
        let day = today.getDate();
        let monthIndex = today.getMonth();
        let year = today.getFullYear();

        // Format the date
        let formattedDate = day + " " + monthNames[monthIndex] + " " + year;

        console.log(formattedDate);
        return formattedDate;
    };
    return (
        <View style={styles.DeliveryAndServices}>
            <View style={styles.sectionHeader}>
                <MediumText sx={{ fontFamily: fonts.Montserrat[600], marginBottom: 10 }}>Delivery & Services</MediumText>
                <Icon
                    type="ionicon"
                    name="chevron-forward-outline"
                />
            </View>
            <View style={styles.DeliveryAndServices_specs}>
                <View style={styles.DeliveryAndServices_singleSpecs}>
                    {/* <View
                        style={{
                            height: 30,
                            width: 30,
                            backgroundColor: Colors.white,
                            alignSelf: "flex-start"
                        }}>
                        <LottieView
                            source={deliveryManLottieJSON}
                            autoPlay={true}
                            loop={false}
                        />
                    </View> */}
                    <View>
                        <MediumText sx={{ fontFamily: fonts.Montserrat[500], fontSize: 13 }}>Get it by, {getTomDate()}</MediumText>
                        <SmallText color={Colors.lightBlack[1]}>We have same day delivery option for our customers</SmallText>
                    </View>
                </View>
                <View style={styles.DeliveryAndServices_singleSpecs}>
                    {/* <View
                        style={{
                            height: 30,
                            width: 30,
                            backgroundColor: Colors.white,
                            alignSelf: "flex-start"
                        }}>
                        <LottieView
                            source={returnDeliveryLottieJSON}
                            autoPlay={true}
                            loop={false}
                        />
                    </View> */}
                    <View>
                        <MediumText sx={{ fontFamily: fonts.Montserrat[500], fontSize: 13 }}>Hassle free 7 days Return & Exchange</MediumText>
                        <SmallText color={Colors.lightBlack[1]}>We offer 7 days return & exchange</SmallText>
                    </View>
                </View>
            </View>
        </View>
    );
};

const QuantitySelection = ({ setFinalProductPrice, productSalePrice, updateQuantity, setProductQuantity }) => {
    const incrementCount = () => {
        setProductQuantity((prevCount) => prevCount + 1);
    };

    const decrementCount = () => {
        setProductQuantity((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
    };

    useEffect(() => {
        setFinalProductPrice(Number(productSalePrice) * updateQuantity);
    }, [updateQuantity]);

    return (
        <View style={styles.QuantitySelectionSection}>
            <View style={styles.sectionHeader}>
                <View>
                    <MediumText sx={{ fontFamily: fonts.Montserrat[600], marginBottom: 5 }}>Select Quantity</MediumText>
                    <SmallText color={Colors.lightBlack[1]}>Select number of quantity you need to order.</SmallText>
                </View>
                <Icon
                    type="ionicon"
                    name="chevron-forward-outline"
                />
            </View>
            <View></View>
            <View style={styles.QuantitySelectionOptions}>
                <MediumText sx={{ fontSize: 20, fontFamily: fonts.Montserrat[500] }}>{updateQuantity}</MediumText>
                <View style={styles.increAndDec}>
                    <TouchableOpacity
                        style={styles.QuantityBtns}
                        onPress={decrementCount}>
                        <MediumText sx={{ fontSize: 30 }}>-</MediumText>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.QuantityBtns}
                        onPress={incrementCount}>
                        <MediumText sx={{ fontSize: 30 }}>+</MediumText>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const CheckDelivery = ({ scrollViewRef, addProductToCart }) => {
    const [pinCode, setPinCode] = useState();
    const [showMsg, setShowMsg] = useState("");

    const handlePinCode = () => {
        if (!pinCode) {
            infoToast("Enter pincode", "Please enter your pincode");
            return setShowMsg(`Please enter your pincode`);
        }

        if (pinCode.length !== 6) {
            infoToast("Incorrect pincode", "Pincode must be of 6 digit");
            return setShowMsg(`You have entered ${pinCode.length} digits`);
        }
        if (pinCodes[pinCode] === undefined) {
            infoToast("Sorry!", "Currently we dont delivery at this location");
            return setShowMsg(`Currently we dont delivery at this location`);
        }

        successToast("✅ Express delivery is Available", `1 day express delivery is availabe at ${pinCodes[pinCode].location}`);
        return setShowMsg(`1 day express delivery is availabe at ${pinCodes[pinCode].location}`);
    };
    return (
        <View style={styles.CheckDelivery}>
            <View style={styles.sectionHeader}>
                <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>Check Delivery</MediumText>
                <Icon
                    type="ionicon"
                    name="chevron-forward-outline"
                />
            </View>
            <SmallText color={Colors.lightBlack[1]}>Enter your pin code and get delivery details.</SmallText>
            <View style={styles.CheckDeliveryInputContainer}>
                <TextInput
                    value={pinCode}
                    onChangeText={(pinCode) => setPinCode(pinCode)}
                    style={styles.CheckDeliveryInput}
                    keyboardType="phone-pad"
                    placeholder="Enter you pincode"
                    onSubmitEditing={handlePinCode}
                />
                <TouchableOpacity
                    onPress={handlePinCode}
                    style={styles.CheckDeliveryInputBtn}>
                    <MediumText
                        color={Colors.lightBlack[2]}
                        sx={{ textAlign: "center", fontFamily: fonts.Montserrat[500] }}>
                        Check
                    </MediumText>
                </TouchableOpacity>
            </View>
            {showMsg && <SmallText sx={{ marginBottom: 10 }}>{showMsg}</SmallText>}
            <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 10, alignItems: "center" }}>
                <View style={{ width: "48%" }}>
                    <TouchableButton
                        sx={{ backgroundColor: Colors.bgGrey }}
                        textSx={{ color: Colors.bgBlack }}
                        title={"Add to wishlist"}
                        txtWidth={"100%"}
                        btnWidth={"100%"}
                        loading={false}
                        hidden={false}
                        onPress={() => console.log("Adding to wishlist...")}
                    />
                </View>
                <View style={{ width: "48%" }}>
                    <TouchableButton
                        title={"Add to cart"}
                        txtWidth={"100%"}
                        btnWidth={"100%"}
                        loading={false}
                        hidden={false}
                        onPress={addProductToCart}
                    />
                </View>
            </View>
        </View>
    );
};

const ProductDescription = ({ description }) => {
    return (
        <View style={styles.productInfo}>
            <View style={styles.sectionHeader}>
                <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>Product Description</MediumText>
                <Icon
                    type="ionicon"
                    name="chevron-forward-outline"
                />
            </View>

            <View>
                <SmallText
                    color={Colors.black[9]}
                    sx={{ fontSize: 12 }}
                    mergeStyle={true}>
                    {description}
                </SmallText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    banner: {
        height: IMGHEIGHT
    },
    productInfo: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 2
    },
    mainInfoSection: {
        height: "100%"
    },
    sectionHeader: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fastDeliverySection: {
        backgroundColor: Colors.white,
        marginBottom: 2,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10,
        alignItems: "center"
    },
    addToCartBtn: {
        marginHorizontal: 15,
        marginVertical: 10,
        position: "absolute",
        bottom: 0
    },
    DeliveryAndServices: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 2
    },
    DeliveryAndServices_specs: {
        gap: 10
    },
    DeliveryAndServices_singleSpecs: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        // borderWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 5,
        backgroundColor: Colors.bgGrey,
        borderRadius: 10
    },
    QuantitySelectionSection: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 2
    },
    QuantitySelectionOptions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    increAndDec: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    QuantityBtns: {
        backgroundColor: Colors.bgGrey,
        width: 50,
        height: 50,
        borderRadius: 50,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    CheckDelivery: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 2
    },
    CheckDeliveryInputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10
    },
    CheckDeliveryInput: {
        borderWidth: 1,
        borderColor: Colors.bgGrey,
        // backgroundColor: Colors.,
        height: 45,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        fontFamily: fonts.Montserrat[500],
        fontSize: 17,
        width: "70%"
    },
    CheckDeliveryInputBtn: {
        width: "25%",
        backgroundColor: Colors.bgGrey,
        height: 45,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5
    },
    shortDescription: {
        backgroundColor: Colors.bgGrey,
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginVertical: 10
    }
});
