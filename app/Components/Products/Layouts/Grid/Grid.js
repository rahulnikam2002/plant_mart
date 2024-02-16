import { Text } from "react-native";
import { View } from "react-native";
import { FlatList } from "react-native";
import { ProductCard } from "../../Card/ProductCard";
import { Colors } from "../../../../utils/constants/colors/colors";
import { Animated } from "react-native";
import { useCallback, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { RefreshControl } from "react-native-gesture-handler";

export const ProductGridLayout = ({ products, maxCount = "unlimited", refreshControl }) => {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        refreshControl();
    }, []);

    return (
        <FlatList
            refreshControl={
                <RefreshControl
                    colors={[Colors.bgBlack, "red", "green"]}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            style={{ width: "100%", backgroundColor: Colors.backgroundWhite }}
            numColumns={2}
            scrollEnabled
            data={products}
            renderItem={({ item, index }) => {
                const featuredImage = item.featuredImages && item.featuredImages.length >= 2 ? item.featuredImages[0] : null;
                return (
                    <ProductCard
                        sx={index % 2 === 0 ? { paddingRight: 1 } : { paddingLeft: 1 }}
                        productName={item.productName}
                        categories={item.categories}
                        id={item._id}
                        productImg={featuredImage}
                        productPrice={item.originPrice}
                        productSalePrice={item.salePrice}
                        ratings={item.ratings}
                        stars={item.stars}
                        key={item.id}
                        offer={item.offer}
                        imageGallery={item.featuredImages && item.featuredImages.length >= 2 ? item.featuredImages : null}
                        description={item.productDescription}
                    />
                );
            }}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};
