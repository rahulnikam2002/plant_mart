import { StyleSheet, View } from "react-native";
import { MediumText } from "../../../Components/Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";
import { ScrollView } from "react-native-gesture-handler";

export const PrivacyPolicies = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <MediumText style={styles.heading}>Privacy Policy for Plant Mart</MediumText>

                <MediumText style={styles.paragraph}>Effective Date: [Insert Date]</MediumText>

                <MediumText style={styles.paragraph}>
                    At Plant Mart, we are committed to protecting the privacy and security of your personal information. This Privacy Policy describes
                    how we collect, use, and disclose information when you use our mobile application (the "App") and the services offered through the
                    App (the "Services").
                </MediumText>

                <MediumText style={styles.subHeading}>Information We Collect</MediumText>

                <MediumText style={styles.paragraph}>When you use Plant Mart, we may collect the following types of information:</MediumText>

                <MediumText style={styles.paragraph}>
                    1. Personal Information: When you create an account, make a purchase, or communicate with us, we may collect personal information
                    such as your name, email address, phone number, and shipping address.
                </MediumText>

                <MediumText style={styles.paragraph}>
                    2. Payment Information: If you make a purchase through the App, we will collect payment information, such as credit card details
                    or other payment method information.
                </MediumText>

                <MediumText style={styles.paragraph}>
                    3. Device Information: We may collect information about the device you use to access the App, including the device model,
                    operating system version, unique device identifiers, and mobile network information.
                </MediumText>

                <MediumText style={styles.paragraph}>
                    4. Usage Information: We may collect information about how you use the App, such as the pages you view, the products you browse or
                    purchase, and your interactions with our advertisements.
                </MediumText>

                <MediumText style={styles.paragraph}>
                    5. Location Information: With your consent, we may collect information about your precise or approximate location when you use
                    certain features of the App.
                </MediumText>

                <MediumText style={styles.subHeading}>How We Use Your Information</MediumText>

                <MediumText style={styles.paragraph}>We may use the information we collect for the following purposes:</MediumText>

                <MediumText style={styles.paragraph}>1. To provide and maintain the App and Services;</MediumText>

                <MediumText style={styles.paragraph}>2. To process and fulfill your orders and requests;</MediumText>

                <MediumText style={styles.paragraph}>
                    3. To communicate with you, including responding to your inquiries and providing customer support;
                </MediumText>

                <MediumText style={styles.paragraph}>4. To personalize your experience and provide tailored content and recommendations;</MediumText>

                <MediumText style={styles.paragraph}>5. To improve our products, services, and marketing efforts;</MediumText>

                <MediumText style={styles.paragraph}>6. To detect, prevent, and address technical issues or security breaches; and</MediumText>

                <MediumText style={styles.paragraph}>7. To comply with legal and regulatory requirements.</MediumText>

                <MediumText style={styles.subHeading}>Data Sharing and Disclosure</MediumText>

                <MediumText style={styles.paragraph}>We may share your information with third parties for the following purposes:</MediumText>

                <MediumText style={styles.paragraph}>
                    1. With service providers who assist us in operating the App and providing the Services, such as payment processors, shipping
                    companies, and marketing partners;
                </MediumText>

                <MediumText style={styles.paragraph}>2. With your consent or at your direction;</MediumText>

                <MediumText style={styles.paragraph}>
                    3. In connection with a business transaction, such as a merger, acquisition, or sale of assets;
                </MediumText>

                <MediumText style={styles.paragraph}>
                    4. To comply with legal obligations, such as responding to subpoenas or court orders; and
                </MediumText>

                <MediumText style={styles.paragraph}>
                    5. To protect our rights, property, or safety, or the rights, property, or safety of others.
                </MediumText>

                <MediumText style={styles.subHeading}>Your Choices</MediumText>

                <MediumText style={styles.paragraph}>
                    You may have certain rights and choices regarding the information we collect and how it is used:
                </MediumText>

                <MediumText style={styles.paragraph}>
                    1. Account Information: You may update or delete your account information at any time by logging into your account settings.
                </MediumText>

                <MediumText style={styles.paragraph}>
                    2. Location Information: You can control whether we collect location information through your device settings or the App's
                    settings.
                </MediumText>

                <MediumText style={styles.paragraph}>
                    3. Marketing Communications: You can opt out of receiving promotional emails or push notifications by following the instructions
                    in those communications or by contacting us directly.
                </MediumText>

                <MediumText style={styles.subHeading}>Data Retention</MediumText>

                <MediumText style={styles.paragraph}>
                    We will retain your information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer
                    retention period is required or permitted by law.
                </MediumText>

                <MediumText style={styles.subHeading}>Security</MediumText>

                <MediumText style={styles.paragraph}>
                    We take reasonable measures to protect the security of your information, but no method of transmission over the Internet or
                    electronic storage is completely secure. Therefore, we cannot guarantee absolute security.
                </MediumText>

                <MediumText style={styles.subHeading}>Children's Privacy</MediumText>

                <MediumText style={styles.paragraph}>
                    Plant Mart is not intended for children under the age of 13, and we do not knowingly collect personal information from children
                    under 13. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us
                    so that we can delete the information.
                </MediumText>

                <MediumText style={styles.subHeading}>Changes to this Privacy Policy</MediumText>

                <MediumText style={styles.paragraph}>
                    We may update this Privacy Policy from time to time by posting a new version on this page. We will notify you of any material
                    changes by email or through the App. Your continued use of the App after any such changes constitutes your acceptance of the
                    revised Privacy Policy.
                </MediumText>

                <MediumText style={styles.subHeading}>Contact Us</MediumText>

                <MediumText style={styles.paragraph}>
                    If you have any questions or concerns about this Privacy Policy, please contact us at [Insert Contact Information].
                </MediumText>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        marginTop: 1,
        paddingVertical: 10,
        paddingHorizontal: 15
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 10
    },
    subHeading: {
        fontSize: 20,
        fontWeight: "bold",
        marginTop: 20,
        marginBottom: 10
    },
    paragraph: {
        fontSize: 16,
        marginBottom: 10,
        marginTop: 10
    }
});
