import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { DrawerNavigation } from "../../Components/NavigationComponents/Drawer/Drawer";
import { CartPage } from "../../screens/app/Cart/app";
import { SearchScreen } from "../../screens/app/Search/app";
import { useGoogleFonts } from "../../Hooks/Fonts/useFonts";
import { useState } from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { useEffect } from "react";
import { ProductsScreen } from "../../screens/app/Products/app";
import { OrderConfirmScreen, orderConfirmScreen } from "../../screens/app/Order/Confirm/app";
import { IconButton } from "../../Components/Icons/Icon";
import { MediumText } from "../../Components/Text/Headings/Headings";
import { fonts } from "../../utils/constants/fonts/fonts";
import { SingleProductScreen } from "../../screens/app/Products/SingleProductScreen/app";
import { ProfileScreen } from "../../screens/app/profile/Profile";
import { NewAddress } from "../../screens/app/profile/Address/NewAddress.Screen";

const Stack = createStackNavigator();

export const App = () => {
    const { fontError, fontsLoaded } = useGoogleFonts();
    const [fontLoading, setFontLoading] = useState(fontsLoaded);

    console.log({ fontsLoaded });

    useEffect(() => {
        if (fontsLoaded) {
            setFontLoading(true);
        }
    }, [fontsLoaded]);

    return fontLoading ? (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
            }}>
            <Stack.Screen
                name="customDrawer"
                component={DrawerNavigation}
            />
            <Stack.Screen
                name="cartScreen"
                component={CartPage}
            />
            <Stack.Screen
                name="searchScreen"
                component={SearchScreen}
            />
            <Stack.Screen
                name="productsScreen"
                component={ProductsScreen}
            />
            <Stack.Screen
                options={{
                    headerShown: true,
                    title: "Profile",
                    headerTitleAlign: "center"
                }}
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <Stack.Screen
                name="singleProductsScreen"
                options={({ navigation }) => ({
                    // gestureDirection: "vertical",
                    // gestureResponseDistance: 250,
                    gestureEnabled: false,
                    headerShown: false
                })}
                component={SingleProductScreen}
            />
            <Stack.Screen
                name="orderConfirmScreen"
                component={OrderConfirmScreen}
                options={({ navigation }) => ({
                    // gestureDirection: "vertical",
                    // gestureResponseDistance: 250,
                    gestureEnabled: false,
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerShown: true,
                    headerLeft: () => (
                        <View style={{ position: "relative", top: -5 }}>
                            <IconButton
                                type="ionicon"
                                name="arrow-back-outline"
                                onPress={() => navigation.navigate("homeScreen")}
                            />
                        </View>
                    ),
                    headerTitleAlign: "center",
                    title: "Order overview",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="NewAddressScreen"
                component={NewAddress}
                options={({ navigation }) => ({
                    // gestureDirection: "vertical",
                    // gestureResponseDistance: 250,
                    gestureEnabled: false,
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerShown: true,
                    headerTitleAlign: "center",
                    title: "New Address",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
        </Stack.Navigator>
    ) : (
        <View
            style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                height: "100%"
            }}>
            <ActivityIndicator
                size={50}
                color={"#000"}
            />
        </View>
    );
};
