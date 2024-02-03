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

import { ActivityIndicator, Text } from "react-native";
import { View } from "react-native";
import { ProductPageHeader } from "../../../Components/Headers/PageHeader/ProductsPage/ProductPageHeader";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { TouchableOpacity } from "react-native";
import {
  MediumText,
  SmallText
} from "../../../Components/Text/Headings/Headings";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { IconButton } from "../../../Components/Icons/Icon";
import { TouchableButton } from "../../../Components/Button/Button";
import { Icon } from "@rneui/base";
import { useState } from "react";
import axios from "axios";
import { networkIP } from "../../../utils/constants/ip.js";
import { errorToast } from "../../../utils/toasts/toasts.js";
import { toastConfig } from "../../../utils/toasts/config";
import Toast from "react-native-toast-message";
import RazorpayCheckout from "react-native-razorpay";
import { BackHandler } from "react-native";
import { useEffect } from "react";
import { InfoBox } from "../../../Components/Box/Info/InfoBox.js";

export const CartPage = ({ navigation }) => {
  // * Initializing required useStates
  const [totalCartAmount, setTotalCartAmount] = useState(144699);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [fullScreenLoader, setFullScreenLoader] = useState(false);

  // * Invkoking razorpay skd
  const handleUserCheckout = async () => {
    // * Showing button loading
    setCheckoutLoading(true);
    try {
      // * Generating order id before proceeding to checkout screen
      const generateOrderId = await axios.post(
        `${networkIP}/api/payments/order`,
        { amount: totalCartAmount }
      );

      const orderIdObject = generateOrderId.data;
      // * Stop button laoding. Ref line no: 33
      setCheckoutLoading(false);

      // * Checking if order id doesn't exist
      if (!orderIdObject.id) {
        errorToast("Checkout failed", "Please try again to checkout!");
        return;
      }

      // * If order id exist, We need to create a payment option object whhere we will store all payment information!
      const options = {
        description: "Plant Mart order summary",
        image:
          "https://res.cloudinary.com/dhelycucn/image/upload/v1699949404/global/Logo/ic_launcher_qotxxt.png",
        currency: "INR",
        key: "rzp_test_WEdUuBSsAktdDV",
        amount: orderIdObject.amount,
        name: "Rahul Rajesh Nikam",
        order_id: orderIdObject.id,
        theme: { color: Colors.bgBlack },
        method: "netbanking",
        bank: "HDFC"
      };

      // * If razorpay sdk fails
      if (!RazorpayCheckout) {
        errorToast(
          "Payment Initialization Error",
          "Failed to initialize Payment. Please try again."
        );
        return;
      }

      // * Authorizing payment and transferring user to payment screen
      const authorizePayment = await RazorpayCheckout.open(options);

      // * Once user did payment we start screen loading, so and will check for payment status (Completed || on Hold || failed)
      setFullScreenLoader(true);

      /*
       * @Callback: Verifying the success callback. If successful, the response will include:
       *   - Order ID
       *   - Payment ID
       *   - Razorpay signature (HMAC SHA256)
       */

      if (
        authorizePayment.razorpay_signature &&
        authorizePayment.razorpay_payment_id &&
        authorizePayment.razorpay_order_id
      ) {
        // * Verifying signature
        verifyPaymentSignature(authorizePayment);
      } else {
        // * If succes callback fails, we stop showing loading screen and in this case payment is failed!
        setFullScreenLoader(false);
        errorToast(
          "Payment failed or on hold",
          "Let us check the status and will update it in you orders"
        );
      }
    } catch (checkoutError) {
      //* Catching all possible exception
      console.log(checkoutError);
      setFullScreenLoader(false);
      errorToast("Checkout failed", "Our bad! kindly try again ❤️");
    }
  };

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

      const verfySignature = await axios.post(
        `${networkIP}/api/payments/verify`,
        {
          orderId: paymentData.razorpay_order_id,
          paymentId: paymentData.razorpay_payment_id,
          razorpaySignature: paymentData.razorpay_signature
        }
      );
      // * Extracting data object from res
      const signatureData = verfySignature.data;

      // * Stop loading screen (fullScreenLoading)
      setFullScreenLoader(false);

      // * if payment fails
      if (signatureData.code !== 200) {
        errorToast(
          "Payment Unsuccessful",
          "No funds were debited from your account."
        );
      }

      // * if success, redirecting user  to order confirm screen
      navigation.navigate("orderConfirmScreen");
    } catch (paymentError) {
      //* Catching all possible exception
      console.log(paymentError);
      errorToast(
        "Payment Unsuccessful",
        "No funds were debited from your account."
      );
    }
  };

  useEffect(() => {
    const backAction = () => {
      navigation.navigate("homeScreen");
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    // Div => View
    <View style={styles.parent}> 
      <View style={styles.header}>
        <ProductPageHeader
          title={"Shopping cart"}
          showSubTitle={false}
          showLogo={false}
          showCart={false}
        />
      </View>

      <View style={{ marginTop: 5 }}>
        <InfoBox
          boxTitle={() => (
            <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>
              Expected delivery in{" "}
              <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
                2 Days
              </MediumText>
            </MediumText>
          )}
          leftIcon={{
            iconName: "time-outline",
            iconType: "ionicon",
            iconColor: Colors.green.bsae,
            iconSize: 20
          }}>
          <View style={styles.userInfo}>
            <View style={styles.userAddress}>
              <View style={styles.userAddressSectionLeft}>
                <MediumText>
                  Deliver to:{" "}
                  <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
                    Rahul Rajesh Nikam, 415709
                  </MediumText>
                </MediumText>
                <SmallText color={Colors.lightBlack[2]}>
                  House No - 5, Nikam House, Samarth Nagar, Murde, Khed,
                  Ratnagiri, 415709, <SmallText>+918767213959</SmallText>
                </SmallText>
              </View>
            </View>
          </View>
        </InfoBox>
      </View>

      <View style={{ marginTop: 5 }}>
        <InfoBox
          leftIcon={{
            iconName: "cart-outline",
            iconType: "ionicon",
            iconSize: 20,
            iconColor: Colors.green.bsae
          }}
          boxTitle={() => (
            <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>
              Product List
            </MediumText>
          )}
          showRightIcon={false}></InfoBox>
      </View>

      <View style={{ marginTop: 5 }}>
        <InfoBox
          leftIcon={{
            iconName: "pricetag-outline",
            iconType: "ionicon",
            iconSize: 20,
            iconColor: Colors.green.bsae
          }}
          boxTitle={() => (
            <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>
              Best Coupons for you
            </MediumText>
          )}
          showRightIcon={false}
          showRightText={true}
          rightText={() => (
            <TouchableOpacity style={styles}>
              <SmallText
                sx={{ fontFamily: fonts.Montserrat[500] }}
                color={Colors.red.base}>
                All Coupons
              </SmallText>
            </TouchableOpacity>
          )}></InfoBox>
      </View>

      <View style={{ marginTop: 5 }}>
        <InfoBox
          leftIcon={{
            iconName: "card-outline",
            iconType: "ionicon",
            iconSize: 20,
            iconColor: Colors.green.bsae
          }}
          boxTitle={() => (
            <MediumText sx={{ fontFamily: fonts.Montserrat[500] }}>
              Price Summary
            </MediumText>
          )}
          showRightIcon={false}>
          <View>
            <View style={[styles.spaceBwtween, styles.singlePriceList]}>
              <SmallText>Total MRP</SmallText>
              <SmallText
                sx={{
                  fontFamily: fonts.Montserrat[500]
                }}>
                ₹1586
              </SmallText>
            </View>
            <View style={[styles.spaceBwtween, styles.singlePriceList]}>
              <SmallText>Discount on MRP</SmallText>
              <SmallText
                sx={{
                  fontFamily: fonts.Montserrat[500]
                }}
                color={Colors.green.bsae}>
                -₹140
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
              <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
                Total Amount
              </MediumText>
              <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>
                ₹1446
              </MediumText>
            </View>
          </View>
        </InfoBox>
      </View>

      <View style={styles.checkoutSection}>
        <TouchableButton
          title={"Place Order"}
          onPress={() => handleUserCheckout()}
          // onPress={() => navigation.navigate("orderConfirmScreen")}
          txtWidth={"100%"}
          btnWidth={"100%"}
          hidden={false}
          loading={checkoutLoading}
        />
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
    </View>
  );
};

const styles = StyleSheet.create({
  parent: {
    height: "100%"
  },
  header: {
    backgroundColor: Colors.white
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
