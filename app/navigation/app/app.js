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
import { UserOrdersScreen } from "../../screens/app/UserOrders/userOrders.screen";
import { Icon } from "@rneui/base";
import { SingleOrderDetails } from "../../screens/app/UserOrders/SingleOrderDetails.Screens";
import { PlantMartPlus } from "../../screens/app/pages/plantMartPlus";
import { AffiliateProgram } from "../../screens/app/pages/affiliateProgram";
import { ReferralProgram } from "../../screens/app/pages/referralProgram";
import { TermsConditions } from "../../screens/app/pages/termsConditions";
import { PrivacyPolicies } from "../../screens/app/pages/privacyPolicies";
import { Feedback } from "../../screens/app/pages/feedback";
import { GetSupport } from "../../screens/app/pages/getSupport";
import { EditProfileScreen } from "../../screens/app/profile/EditProfile/EditProfile.Screen";

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
                options={({ navigation }) => ({
                    headerShown: false,
                    title: "Profile",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
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
            <Stack.Screen
                name="UserOrdersScreen"
                component={UserOrdersScreen}
                options={({ navigation }) => ({
                    // gestureDirection: "vertical",
                    // gestureResponseDistance: 250,
                    gestureEnabled: false,
                    // cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "My Orders",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="SingleOrderDetails"
                component={SingleOrderDetails}
                options={({ navigation }) => ({
                    gestureDirection: "vertical",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Order Details",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="PlantMartPlus"
                component={PlantMartPlus}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Plant Mart Plus",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="AffiliateProgram"
                component={AffiliateProgram}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Our Affiliate Program",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="ReferralProgram"
                component={ReferralProgram}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Our Referral Program",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="TermsConditions"
                component={TermsConditions}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Terms & Conditions",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="PrivacyPolicies"
                component={PrivacyPolicies}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Privacy Policies",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="Feedback"
                component={Feedback}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Feedback",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="GetSupport"
                component={GetSupport}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Get Support",
                    headerTitleStyle: { fontFamily: fonts.Montserrat[600], fontSize: 16 }
                })}
            />
            <Stack.Screen
                name="EditProfileScreen"
                component={EditProfileScreen}
                options={({ navigation }) => ({
                    gestureDirection: "horizontal",
                    gestureResponseDistance: 500,
                    gestureEnabled: true,
                    headerShown: true,
                    headerTitleAlign: "left",
                    title: "Edit Profile",
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
