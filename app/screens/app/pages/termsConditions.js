import { StyleSheet, View } from "react-native";
import { MediumText } from "../../../Components/Text/Headings/Headings";
import { Colors } from "../../../utils/constants/colors/colors";
import { ScrollView } from "react-native-gesture-handler";

export const TermsConditions = () => {
    return (
        <ScrollView>
            <View style={styles.container}>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>Accounts:</MediumText> When you create an account with us, you must provide accurate
                    and complete information. You are solely responsible for maintaining the confidentiality of your account and password and for
                    restricting access to your device. You agree to accept responsibility for all activities that occur under your account or
                    password.
                </MediumText>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>Product Information:</MediumText> We strive to provide accurate product and pricing
                    information, but errors may occur. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update
                    information at any time without prior notice.
                </MediumText>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>User Conduct:</MediumText> You agree not to use the Website or Mobile App for any
                    unlawful purpose or to violate any laws in your jurisdiction. You also agree not to engage in any conduct that restricts or
                    inhibits any other user from using or enjoying the Website or Mobile App.
                </MediumText>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>Intellectual Property:</MediumText> The Website and Mobile App, including all content,
                    features, and functionality, are owned by Plant Mart and are protected by international copyright, trademark, patent, trade
                    secret, and other intellectual property or proprietary rights laws.
                </MediumText>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>Limitation of Liability:</MediumText> In no event shall Plant Mart, nor its directors,
                    employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive
                    damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your
                    access to or use of or inability to access or use the Website or Mobile App; (ii) any conduct or content of any third party on the
                    Website or Mobile App; (iii) any content obtained from the Website or Mobile App; and (iv) unauthorized access, use, or alteration
                    of your transmissions or content, whether based on warranty, contract, tort (including negligence), or any other legal theory,
                    whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have
                    failed of its essential purpose.
                </MediumText>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>Changes to Terms:</MediumText> We reserve the right, at our sole discretion, to modify
                    or replace these terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms
                    taking effect. What constitutes a material change will be determined at our sole discretion.
                </MediumText>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>Governing Law:</MediumText> These Terms shall be governed and construed in accordance
                    with the laws of Netherlands, without regard to its conflict of law provisions.
                </MediumText>
                <MediumText style={{ marginBottom: 10 }}>
                    <MediumText style={{ fontWeight: "bold" }}>Contact Us:</MediumText> If you have any questions about these Terms, please contact us
                    at support@plantmart.com.
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
    }
});
