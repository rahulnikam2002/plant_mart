import { StyleSheet, View } from "react-native";
import { MediumText, SmallText } from "../../../../Components/Text/Headings/Headings";
import { Colors } from "../../../../utils/constants/colors/colors";
import { fonts } from "../../../../utils/constants/fonts/fonts";
import { Input } from "../../../../Components/Input/Input";
import { TouchableButton } from "../../../../Components/Button/Button";
import { useCallback, useContext, useEffect, useState } from "react";
import { pinCodes } from "../../../../Static/data/pincodes/pincodes";
import { errorToast, successToast } from "../../../../utils/toasts/toasts";
import axios from "axios";
import { AuthContext } from "../../../../context/auth/auth.context";
import { networkIP } from "../../../../utils/constants/ip";

export const NewAddress = () => {
    const { getUserAuthToken } = useContext(AuthContext);

    // States
    const [streetAddress, setStreetAddress] = useState("");
    const [landMark, setLandMark] = useState("");
    const [pinCode, setPinCode] = useState("");
    const [btnHidden, setBtnHidden] = useState(true);
    const [isPinCodeValid, setIsPinCodeValid] = useState(false);
    const [pinCodeLocation, setPinCodeLocation] = useState("");

    const handlePinCode = (pinCode) => {
        console.log({ pinCode });
        const area = pinCodes[pinCode];
        if (area) {
            setPinCode(pinCode);
            setPinCodeLocation(area.location);
            setIsPinCodeValid(true);
        } else {
            setIsPinCodeValid(false);
            if (pinCode.length === 6 && !area) {
                errorToast("We don't deliver at this location", "Currently we don't deliver at this pin code, soon we will!");
                setPinCode("");
                return;
            }
            if (pinCode.length >= 6) {
                setPinCode("");
                errorToast("Pincode must be 6 digit only", "You might have enter more than 6 digit");
                return;
            } else {
                setPinCode(pinCode);
            }
        }
    };

    const handleInputChange = () => {
        if (streetAddress.length >= 5 && isPinCodeValid) {
            setBtnHidden(false);
        } else {
            setBtnHidden(true);
        }
    };

    const addNewAddress = useCallback(async () => {
        try {
            setBtnHidden(true);
            const userAuthToken = await getUserAuthToken();
            const newAddress = await axios.post(
                `${networkIP}/api/user/address/new`,
                {
                    streetAddress: streetAddress,
                    mainLocation: pinCodeLocation,
                    landMark,
                    pinCode
                },
                {
                    headers: {
                        "user-auth-token": userAuthToken
                    }
                }
            );
            console.log(newAddress.data);
            successToast("New address created", "Your new address is added!");
            setBtnHidden(false);
        } catch (error) {
            setBtnHidden(false);

            errorToast("Address didn't saved", "Something went wrong while saving the address, please try again");
        }
    }, [streetAddress, landMark, pinCode]);

    useEffect(() => {
        handleInputChange();
    }, [streetAddress, landMark, pinCode]);

    return (
        <View style={styles.main}>
            <View style={styles.noteBox}>
                <View style={styles.note}>
                    <SmallText sx={styles.noteText}>Make sure you enter a valid address and the address must belongs to Pune city only!</SmallText>
                </View>
            </View>
            <View style={styles.inputArea}>
                <Input
                    onSubmit={() => {}}
                    onChange={(e) => setStreetAddress(e)}
                    placeholder={"Street Address"}
                    sx={styles.input}
                    value={streetAddress}
                />
                <Input
                    onSubmit={() => {}}
                    onChange={(e) => setLandMark(e)}
                    placeholder={"Landmark"}
                    sx={styles.input}
                    value={landMark}
                />
                <Input
                    onSubmit={() => {}}
                    onChange={handlePinCode}
                    keyboardType="numeric"
                    placeholder={"Pincode"}
                    sx={styles.input}
                    value={pinCode}
                />
                {isPinCodeValid && (
                    <Input
                        onSubmit={{}}
                        editable={false}
                        onChange={{}}
                        sx={styles.input}
                        value={pinCodeLocation}
                    />
                )}
            </View>
            <View style={styles.saveBtn}>
                <TouchableButton
                    txtWidth={"100%"}
                    btnWidth={"100%"}
                    title={"Add New Address"}
                    hidden={btnHidden}
                    onPress={addNewAddress}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        height: "100%"
    },
    note: {
        backgroundColor: Colors.backgroundWhite,
        padding: 10,
        borderRadius: 5
    },
    noteBox: {
        backgroundColor: Colors.white,
        padding: 10
    },
    noteText: {
        fontFamily: fonts.Montserrat[500]
    },
    inputArea: {
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        marginTop: 1,
        paddingBottom: 10
    },
    input: {
        height: 50
    },
    saveBtn: {
        marginTop: 20,
        backgroundColor: Colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
        marginTop: 1,
        position: "absolute",
        bottom: 0
    }
});
