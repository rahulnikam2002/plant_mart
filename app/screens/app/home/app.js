import { Button, StatusBar } from "react-native";
import { Text, View } from "react-native";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  useAnimatedStyle,
  interpolate
} from "react-native-reanimated";
import { IconButton } from "../../../Components/Icons/Icon";
import {
  MediumText,
  SmallHeadingText,
  SubHeadingText
} from "../../../Components/Text/Headings/Headings";
import { StyleSheet } from "react-native";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { ClickSeachBar } from "../../../Components/Search/ClickSearchBar/ClickSearchBar";
import { BottomTabs } from "../../../Components/NavigationComponents/BottomTabs/BottomTabs";
import { Colors } from "../../../utils/constants/colors/colors";
import { HorizontalBanner } from "../../../Components/Advertisement/Banners/Horizontal/Horizontal";
import { HorizontalBannerArea } from "../../../Components/Advertisement/BannerArea/HorizontalArea/HorizontalArea";
import {
  SingleBannerAds,
  multipleBaneerAds
} from "../../../Static/data/Ads/Ads";
import { SeactionHeader } from "../../../Components/Headers/SectionHeader/SeactionHeader";
import { CircleCategory } from "../../../Components/Category/CircleCategory/CircleCategory";
import { categoriesData } from "../../../Static/data/categories/data";
import { ScrollView } from "react-native";
import { RefreshControl } from "react-native";
import { useState } from "react";
import { useCallback } from "react";
import { ProductGridLayout } from "../../../Components/Products/Layouts/Grid/Grid";
import { products } from "../../../Static/data/products/data";

export const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [categories, setCategories] = useState(categoriesData)

  // Drawer navigation
  const drawerProgress = useDrawerProgress();
  const viewStyles = useAnimatedStyle(() => {
    const scale = interpolate(drawerProgress.value, [0, 1], [1, 0.8]);
    const borderRadius = interpolate(drawerProgress.value, [0, 1], [0, 20]);
    return {
      transform: [{ scale }],
      borderRadius
    };
  });

  const onRefresh = useCallback(() => {
    const suffleArray = categoriesData.sort(() => 0.5 - Math.random()).slice(0,11)
    setCategories(suffleArray)
  }, []);

  return (
    <Animated.View style={[viewStyles, styles.homeMain]}>
      <StatusBar backgroundColor={Colors.bgBlack}/>
      <HomeHeader navigation={navigation}></HomeHeader>
      <View style={{ marginBottom: 5 }}>
        <ClickSeachBar
          placeHolder="Search for plants"
          onPress={() => navigation.navigate("searchScreen")}
        />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            colors={[Colors.bgBlack, "red", "green"]}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.bannerArea}>
          <HorizontalBannerArea data={SingleBannerAds} />
        </View>

        <View style={styles.bannerArea}>
          <HorizontalBannerArea data={multipleBaneerAds} />
        </View>

        <View>
          <SeactionHeader
            title={"Categories"}
            onPress={() => console.log(true)}
          />
          <CircleCategory
            data={categories}
            maxItems={10}
            scrollable
          />
        </View>

        <View style={{ marginTop: 5 }}>
          <SeactionHeader
            title={"Top products"}
            onPress={() => navigation.navigate("productsScreen")}
          />
          <ProductGridLayout products={products} />
        </View>

        <View style={[styles.bannerArea]}>
          <HorizontalBannerArea data={SingleBannerAds} />
        </View>

        <View style={[{ marginTop: 0 }, styles.lastSection]}>
          <SeactionHeader
            title={"Max Selling"}
            onPress={() => console.log(true)}
          />
          <ProductGridLayout products={products} />
        </View>
      </ScrollView>

      <View style={styles.bottomTabs}>
        <BottomTabs navigation={navigation} />
      </View>
    </Animated.View>
  );
};

export const HomeHeader = ({ navigation }) => {
  return (
    <View style={styles.header}>
      <IconButton
        name="menu-outline"
        size={25}
        type="ionicon"
        onPress={() => navigation.toggleDrawer()}
      />
      <SmallHeadingText
        sx={{
          fontFamily: fonts.Montserrat[600],
          position: "relative",
          top: 5
        }}>
        Plant Mart
      </SmallHeadingText>
      <View style={{ flexDirection: "row" }}>
        <IconButton
          name="cart-outline"
          size={25}
          type="ionicon"
          onPress={() => navigation.navigate("cartScreen")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  homeMain: {
    height: "100%",
    backgroundColor: "white",
    paddingHorizontal: 10
  },
  bottomTabs: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "white",
    paddingBottom: 5,
    borderTopColor: Colors.backgroundWhite,
    borderTopWidth: 1
  },
  bannerArea: {
    marginVertical: 10
  },
  lastSection: {
    marginBottom: 80
  }
});
