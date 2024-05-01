import { ActivityIndicator, View } from "react-native";
import { MediumText } from "../../../Components/Text/Headings/Headings";
import { ProductPageHeader } from "../../../Components/Headers/PageHeader/ProductsPage/ProductPageHeader";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { cahceSearch } from "../../../Static/data/search/data";
import { RoundedCarousel } from "../../../Components/Carousel/RoundedCarousel/Carousel";
import { HorizontalBannerArea } from "../../../Components/Advertisement/BannerArea/HorizontalArea/HorizontalArea";
import { multipleBaneerAds } from "../../../Static/data/Ads/Ads";
import { ProductGridLayout } from "../../../Components/Products/Layouts/Grid/Grid";
import { hugeProducts, products } from "../../../Static/data/products/data";
import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip";
import { errorToast } from "../../../utils/toasts/toasts";
import { TextInput } from "react-native";

export const ProductsScreen = ({ route }) => {
    const [allProducts, setAllProducts] = useState();
    const [loading, setLoading] = useState(true);
    const [refresPage, setRefreshPage] = useState(false);
    const title = route.params?.title;

    const fetchAllProducts = useCallback(async () => {
        try {
            console.log("inside");
            const getAllProducts = await axios.get(`${networkIP}/api/products/search`);
            const products = getAllProducts.data;
            setAllProducts(products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
            errorToast("Something went wrong", "Please try again");
        }
    }, [setAllProducts]);

    useEffect(() => {
        fetchAllProducts();
    }, [fetchAllProducts]);

    return (
        <View style={{ height: "100%" }}>
            {loading && (
                <View style={styles.pageLoader}>
                    <ActivityIndicator
                        color={Colors.bgBlack}
                        size={30}
                    />
                </View>
            )}
            <View style={styles.header}>
                <ProductPageHeader
                    title={title ? title : "Products"}
                    subTitle={`${allProducts && allProducts.length}  Items`}
                />
            </View>
            <View style={styles.categoryFilter}>{/* <RoundedCarousel data={cahceSearch} /> */}</View>
            {!loading && allProducts && (
                <View style={styles.productsArea}>
                    <ProductGridLayout
                        refreshControl={fetchAllProducts}
                        products={allProducts}
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.white
    },
    categoryFilter: {
        backgroundColor: Colors.white,
        paddingHorizontal: 15,
        marginTop: 2
    },
    productsArea: {
        backgroundColor: Colors.white,
        paddingHorizontal: 2,
        // paddingVertical: 15,
        marginTop: 1
    },
    pageLoader: {
        height: "100%",
        // backgroundColor: "#00000040",
        position: "absolute",
        top: 0,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 500
    }
});
