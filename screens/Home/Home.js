import React, { useEffect } from "react";
import {
    SafeAreaView,
    ScrollView,
    RefreshControl,
    View,
    Text,
    StyleSheet,
} from "react-native";
import { secondaryColor } from "../../utils/colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import CheckColor from "../../hooks/CheckColor";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CheckLog from "../../hooks/CheckLog";

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const { token } = CheckLog();

    const [garbageColor, setGarbageColor] = React.useState("");
    const [recycleColor, setRecycleColor] = React.useState("");
    const [gardenColor, setGardenColor] = React.useState("");
    useEffect(() => {
        const getColors = async () => {
            try {
                const garbageColor = await AsyncStorage.getItem(
                    "@garbageColor"
                );
                if (garbageColor !== null) {
                    setGarbageColor(garbageColor);
                }
                const recycleColor = await AsyncStorage.getItem(
                    "@recycleColor"
                );
                if (recycleColor !== null) {
                    setRecycleColor(recycleColor);
                }
                const gardenColor = await AsyncStorage.getItem("@gardenColor");
                if (gardenColor !== null) {
                    setGardenColor(gardenColor);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getColors();
    }, [refreshing]);

    const [address, setAddress] = React.useState({});
    const [mainData, setMainData] = React.useState([]);
    React.useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem("@addressName");
                if (value !== null) {
                    setAddress(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [refreshing]);

    React.useEffect(() => {
        axios
            .post(
                `https://gisweb.casey.vic.gov.au/IntraMaps90/ApplicationEngine/Search/Refine/Set?IntraMapsSession=${token}`,
                {
                    dbKey: address.dbKey,
                    infoPanelWidth: 0,
                    mapKey: address.mapKey,
                    mode: "Refresh",
                    selectionLayer: address.selectionLayer,
                    zoomType: "current",
                }
            )
            .then((res) =>
                setMainData(res.data.infoPanels.info1.feature.fields)
            )
            .catch((err) => console.error({ mainData: err.response.data }));
    }, [address, refreshing]);

    let garbageData = {};
    let recycleData = {};
    let gardenData = {};
    mainData?.forEach((item) => {
        // if (item.name == "Address") {
        //     filteredData.push(item);
        // }
        if (item.name == "Garbage Collection") {
            garbageData = item;
        }
        if (item.name == "Recycling Collection") {
            recycleData = item;
        }
        if (item.name == "Garden Collection") {
            gardenData = item;
        }
        // if (item.name == "Street Sweeping") {
        //     filteredData.push(item);
        // }
        // if (item.name == "Ward Name") {
        //     filteredData.push(item);
        // }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text
                    style={{
                        color: secondaryColor,
                        fontSize: 50,
                        marginBottom: 25,
                    }}
                >
                    Binny
                </Text>

                <Icon name="home" size={50} color={"#ffffff"} />

                <Text style={[styles.text, { marginBottom: 30 }]}>
                    {address?.displayValue || "Not found"}
                </Text>

                <View style={styles.textContainer}>
                    <View>
                        <Icon
                            name="label"
                            size={50}
                            color={`${garbageColor ? garbageColor : "green"}`}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Garbage bin</Text>
                        <Text style={styles.text}>
                            {garbageData?.value || "Not found"}
                        </Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <View>
                        <Icon
                            name="label"
                            size={50}
                            color={`${recycleColor ? recycleColor : "blue"}`}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Recycle bin</Text>
                        <Text style={styles.text}>
                            {recycleData?.value || "Not found"}
                        </Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <View>
                        <Icon
                            name="label"
                            size={50}
                            color={`${
                                gardenColor ? gardenColor : secondaryColor
                            }`}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Garden bin</Text>
                        <Text style={styles.text}>
                            {gardenData?.value || "Not found"}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 10,
        marginVertical: 4,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "80%",
        marginVertical: 20,
    },
});
