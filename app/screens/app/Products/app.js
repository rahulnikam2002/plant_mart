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
import { useEffect, useState } from "react";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip";

export const ProductsScreen = ({ route }) => {
  const [allProducts, setAllProducts] = useState();
  const [loading, setLoading] = useState(true);
  const title = route.params?.title;

  const fetchAllProducts = async () => {
    const getAllProducts = await axios.get(`${networkIP}/api/products/search`);
    const products = getAllProducts.data;
    setAllProducts(hugeProducts)
    setLoading(false)
  }

  useEffect(() => {
    fetchAllProducts()
  }, []);

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
          subTitle={"35622 Items"}
        />
      </View>
      <View style={styles.categoryFilter}>
        <RoundedCarousel data={cahceSearch} />
      </View>
      {!loading && allProducts && (
        <View style={styles.productsArea}>
          <ProductGridLayout products={allProducts} />
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
    paddingVertical: 15,
    marginTop: 2
  },
  productsArea: {
    backgroundColor: Colors.white,
    paddingHorizontal: 2,
    // paddingVertical: 15,
    marginTop: 1,
    marginBottom: "30%"
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
