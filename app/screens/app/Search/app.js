import { View } from "react-native";
import { CustomSafeAreaView } from "../../../Components/SafeAreaView/SafeAreaView";
import { MediumText, SmallText } from "../../../Components/Text/Headings/Headings";
import { Icon } from "@rneui/base";
import { IconButton } from "../../../Components/Icons/Icon";
import { TextInput } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { Colors } from "../../../utils/constants/colors/colors";
import { fonts } from "../../../utils/constants/fonts/fonts";
import { cahceSearch, searchData } from "../../../Static/data/search/data";
import { useCallback, useMemo, useState } from "react";
import { HorizontalBanner } from "../../../Components/Advertisement/Banners/Horizontal/Horizontal";
import { SingleBannerAds, multipleBaneerAds } from "../../../Static/data/Ads/Ads";
import { HorizontalBannerArea } from "../../../Components/Advertisement/BannerArea/HorizontalArea/HorizontalArea";
import { networkIP } from "../../../utils/constants/ip";

import * as Speech from "expo-speech";
import axios from "axios";

export const SearchScreen = () => {
    const [showSearchResult, setShowSearchResult] = useState(false);
    const [searchItems, setSearchItems] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const fetchSearchData = useMemo(async () => {
        try {
            if (searchTerm.length > 0) {
                // console.log("loading...");
                setLoading(true);
                const data = await axios.get(`${networkIP}/api/products/search/product?name=${searchTerm}`);
                setSearchResults(data.data);
                setSearchItems(data.data);
                // console.log(data.data);
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    }, [searchTerm]);
    // const handleSearchInput = (query) => {
    //     if (query.length > 0) {
    //         setShowSearchResult(true);
    //         setSearchTerm(query);
    //         const s = searchItems.filter((item) => item.plantName.toLowerCase().includes(query.toLowerCase()));
    //         setSearchResults(s);
    //     } else {
    //         setSearchResults([]);
    //         setShowSearchResult(false);
    //     }
    // };

    const highlightSearchTerm = (plantName) => {
        // console.log()
        const index = plantName.toLowerCase().indexOf(searchTerm.toLowerCase());
        // console.log({ plantName, index });
        if (index !== -1) {
            return (
                <>
                    {plantName.substring(0, index)}
                    <MediumText sx={{ fontFamily: fonts.Montserrat[600] }}>{plantName.substring(index, index + searchTerm.length)}</MediumText>
                    {plantName.substring(index + searchTerm.length)}
                </>
            );
        }
        return <MediumText>{plantName.substring(0, 50)}</MediumText>;
    };

    const speak = () => {
        Speech.speak(searchTerm, { language: "indian" });
    };

    return (
        <View>
            <View style={styles.searchHeader}>
                <View style={styles.searchInnerContainer}>
                    <TouchableOpacity
                        style={styles.headerIcon}
                        onPress={() => navigation.goBack()}>
                        <Icon
                            name="arrow-back-outline"
                            type="ionicon"
                        />
                    </TouchableOpacity>
                    <View style={styles.searchBar}>
                        <TextInput
                            onChangeText={(text) => setSearchTerm(text)}
                            autoFocus={true}
                            style={styles.searchInput}
                            placeholder="Search for products"
                        />
                    </View>
                    <TouchableOpacity onPress={() => speak()}>
                        <Icon
                            name="mic-outline"
                            type="ionicon"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.searchResultsAre, !searchItems || searchTerm.length === 0 ? { display: "none" } : null]}>
                <View style={styles.allSearchResArea}>
                    {searchItems &&
                        searchItems.map((item, index) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("singleProductsScreen", { productId: item._id })}
                                    key={index}
                                    style={styles.singleSearchResult}>
                                    <View style={styles.singleSearchResultLeft}>
                                        <Icon
                                            name="search-outline"
                                            type="ionicon"
                                            color={Colors.lightBlack[3]}
                                            style={{ marginRight: 10 }}
                                        />
                                        <MediumText>{highlightSearchTerm(item.productName)}</MediumText>
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                </View>
            </View>
            {!showSearchResult && (
                <View>
                    {/* <View style={styles.recentSearches}>
                        <MediumText sx={{ fontFamily: fonts.Montserrat[500], marginBottom: 10 }}>Recent Searches</MediumText>
                        <View style={styles.recentSearchesInnerContainer}>
                            {cahceSearch &&
                                cahceSearch.map((item, index) => (
                                    <TouchableOpacity
                                        style={styles.cahceSearchSingleTab}
                                        key={index}>
                                        <SmallText
                                            color={Colors.lightBlack[2]}
                                            sx={{ fontFamily: fonts.Montserrat[500] }}>
                                            {item}
                                        </SmallText>
                                    </TouchableOpacity>
                                ))}
                        </View>
                    </View> */}

                    <View style={styles.bannerArea}>
                        <HorizontalBannerArea data={multipleBaneerAds} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    searchHeader: {
        // borderBottomColor: Colors.lightBlack[3,
        backgroundColor: Colors.white
    },
    headerIcon: {
        width: "100%"
    },
    searchBar: {
        width: "80%"
    },
    searchInnerContainer: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    searchInput: {
        fontFamily: fonts.Montserrat[500],
        fontSize: 15
    },
    singleSearchResult: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingVertical: 8
    },
    singleSearchResultRight: {
        flexDirection: "row"
    },
    singleSearchResultLeft: {
        flexDirection: "row",
        alignItems: "center"
    },
    allSearchResArea: {
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
        marginTop: 1
    },
    cahceSearchSingleTab: {
        borderWidth: 1,
        borderColor: "rgba(27, 31, 35, 0.05)",
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 50,
        backgroundColor: "white"
    },
    recentSearches: {
        backgroundColor: Colors.white,
        marginTop: 2,
        padding: 20
    },
    recentSearchesInnerContainer: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 5
    },
    bannerArea: {
        margin: 10
    }
});
