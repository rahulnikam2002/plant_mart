import { StyleSheet, View } from "react-native";
import { MediumText } from "../../../Components/Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";

export const ReferralProgram = () => {
    return (
        <View>
            <View style={styles.container}>
                <MediumText>
                    Discover the full spectrum of botanical offerings with Plant Mart Plus. Our extensive inventory features a wide array of plants,
                    tools, and accessories to enhance your indoor and outdoor spaces. Elevate your gardening experience with our exclusive 'Plus'
                    services, meticulously crafted to meet your unique needs. To access our 'Plus' services or for further inquiries, please reach out
                    to us:{"\n\n"} 📞 Phone: 8767213959 {"\n\n"} 📧 Email: reply@plantmart.com{"\n\n"} 📞 WhatsApp: 8767213959{"\n\n"} Let Plant Mart
                    Plus be your partner in cultivating lush, vibrant environments tailored to your vision.
                </MediumText>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginTop: 1,
        paddingVertical: 10,
        paddingHorizontal: 15
    }
});
