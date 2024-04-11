import { View } from "react-native";
import { MediumText } from "../../Text/Headings/Headings";
import { FlatList } from "react-native";
import { Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export const CircleCategory = ({ data, scrollable = true, maxItems = 10 }) => {
    const navigation = useNavigation();
    return (
        <View>
            {scrollable && (
                <FlatList
                    data={data}
                    horizontal
                    //   shouldRasterizeIOS
                    automaticallyAdjustsScrollIndicatorInsets
                    showsHorizontalScrollIndicator={false}
                    bounces
                    // scrollEventThrottle={5}
                    snapToEnd
                    renderItem={({ item }) => (
                        <View style={{ marginRight: 10 }}>
                            <TouchableOpacity onPress={() => navigation.navigate("productsScreen")}>
                                <Image
                                    source={{ uri: item.image }}
                                    width={80}
                                    height={80}
                                    borderRadius={50}
                                />
                                <MediumText sx={{ textAlign: "center", marginTop: 5 }}>{item.title}</MediumText>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
        </View>
    );
};
