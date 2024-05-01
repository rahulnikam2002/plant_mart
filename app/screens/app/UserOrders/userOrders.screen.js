import { FlatList, Image, StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../../../Components/Text/Headings/Headings";
import { useCallback, useContext, useEffect, useState } from "react";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip";
import { AuthContext } from "../../../context/auth/auth.context";
import { errorToast } from "../../../utils/toasts/toasts";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const UserOrdersScreen = () => {
    const navigation = useNavigation();
    const { getUserAuthToken } = useContext(AuthContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userAuthToken, setUserAuthToken] = useState();

    const fetchOrderedProducts = useCallback(async () => {
        try {
            setLoading(true);
            const userAuthToken = await getUserAuthToken();
            setUserAuthToken(userAuthToken);
            const orderedProducts = await axios.get(`${networkIP}/api/orders/users/orders`, {
                headers: {
                    "user-auth-token": userAuthToken
                }
            });
            const response = orderedProducts.data;
            setProducts(response.reverse());
            // console.log(response);
            setLoading(false);
        } catch (error) {
            // Debugging
            console.log(error.response);
            setLoading(false);
            errorToast("Server issue", "Try again after sometime");
        }
    }, []);

    useEffect(() => {
        navigation.addListener("focus", () => {
            fetchOrderedProducts();
        });
    }, []);

    return (
        <View style={{ marginTop: 5 }}>
            {!loading ? (
                <FlatList
                    data={products}
                    renderItem={({ item, index }) => (
                        <SingleOrderedProductCard
                            productImg={item.product.product?.featuredImages[0]}
                            productName={item.product.product?.productName}
                            orderId={item._id}
                            userAuthToken={userAuthToken}
                            productObjId={item.product._id}
                        />
                    )}
                />
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

const SingleOrderedProductCard = ({ productName, productImg, orderId, userAuthToken, productObjId }) => {
    const navigation = useNavigation();

    const handleSigleOrderClick = () => {
        navigation.navigate("SingleOrderDetails", { orderId, userAuthToken, productObjId });
    };

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSigleOrderClick}
            style={styles.SingleOrderedProductCard}>
            <View style={styles.SingleOrderedProductCard_left}>
                <Image
                    style={styles.SingleOrderedProductCard_img}
                    width={100}
                    height={100}
                    source={{ uri: productImg }}
                />
            </View>
            <View style={styles.SingleOrderedProductCard_right}>
                <MediumText sx={styles.SingleOrderedProductCard_productTitle}>On the way, Delivered by 13 Apr</MediumText>
                <MediumText color={Colors.lightBlack[1]}>{productName}</MediumText>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    SingleOrderedProductCard: {
        backgroundColor: Colors.white,
        marginBottom: 5,
        paddingHorizontal: 15,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        gap: 15
    },
    SingleOrderedProductCard_img: {
        borderRadius: 5
    },
    SingleOrderedProductCard_right: {
        width: "75%",
        paddingHorizontal: 10
    },
    SingleOrderedProductCard_left: {
        width: "25%"
    },
    SingleOrderedProductCard_productTitle: {
        fontFamily: fonts.Montserrat[600]
    }
});
