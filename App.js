import React, { useState } from "react";
// import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    SafeAreaView,
    TextInput,
    View,
    ScrollView,
    FlatList,
    Pressable,
    StatusBar,
    Button,
} from "react-native";
import axios from "axios";

export default function App() {
    const [text, setText] = React.useState("");
    const [selectedText, setSelectedText] = React.useState("");
    const [session, setSession] = React.useState(null);
    const [configData, setConfigData] = React.useState([]);

    React.useEffect(() => {
        if (text.length < 1) {
            setConfigData([]);
        } else {
            axios
                .get("https://simple-scraping.vercel.app/token")
                .then((res) => {
                    setSession(res.data.token);
                    // console.log(res.data.status);
                })
                .catch((err) => setSession({ token: err.response.data }));
        }
    }, [text]);

    React.useEffect(() => {
        axios
            .post(
                `https://gisweb.casey.vic.gov.au/IntraMaps90/ApplicationEngine/Search/?infoPanelWidth=0&mode=Refresh&form=918fd81b-bb3e-4bd1-8c78-1bd5b11fe1aa&resubmit=false&IntraMapsSession=${session}`,
                { fields: [text] }
            )
            .then((res) => setConfigData(res.data.fullText))
            .catch((err) => {
                console.error({ configData: err.response.data });
                if (err.response.data.Message == "Session Timeout") {
                    axios.get("https://simple-scraping.vercel.app/start_app");
                }
            });
    }, [text]);

    const [itemConfig, setItemConfig] = useState({});
    const onPressFunction = (item) => {
        setConfigData([]);
        setSelectedText(item.displayValue);
        setItemConfig(item);
    };

    const [mainData, setMainData] = useState([]);
    React.useEffect(() => {
        axios
            .post(
                `https://gisweb.casey.vic.gov.au/IntraMaps90/ApplicationEngine/Search/Refine/Set?IntraMapsSession=${session}`,
                {
                    dbKey: itemConfig.dbKey,
                    infoPanelWidth: 0,
                    mapKey: itemConfig.mapKey,
                    mode: "Refresh",
                    selectionLayer: itemConfig.selectionLayer,
                    zoomType: "current",
                }
            )
            .then((res) =>
                setMainData(res.data.infoPanels.info1.feature.fields)
            )
            .catch((err) => console.error({ mainData: err.response.data }));
    }, [itemConfig]);

    let filteredData = [];
    mainData.forEach((item) => {
        if (item.name == "Address") {
            filteredData.push(item);
        }
        if (item.name == "Garbage Collection") {
            filteredData.push(item);
        }
        if (item.name == "Recycling Collection") {
            filteredData.push(item);
        }
        if (item.name == "Garden Collection") {
            filteredData.push(item);
        }
        if (item.name == "Street Sweeping") {
            filteredData.push(item);
        }
        if (item.name == "Ward Name") {
            filteredData.push(item);
        }
    });

    const renderItem = ({ item, i }) => (
        <Pressable
            key={i}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? "rgb(210, 230, 255)" : "white",
                },
                styles.wrapperCustom,
            ]}
            onPress={() => onPressFunction(item)}
        >
            <Text style={styles.text}>{item.displayValue}</Text>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={(text) => setText(text)}
                placeholder="Search your address"
                value={text}
            />

            {configData?.length > 0 && (
                <View style={styles.card}>
                    <FlatList data={configData} renderItem={renderItem} />
                </View>
            )}

            {selectedText && (
                <View
                    style={{
                        width: "80%",
                        marginVertical: 5,
                    }}
                >
                    <Text>Showing result for: </Text>
                    <Text style={{ fontWeight: "bold" }}>{selectedText}</Text>
                </View>
            )}

            <ScrollView
                style={{
                    width: "80%",
                    marginVertical: 10,
                }}
            >
                {filteredData.length > 1
                    ? filteredData?.map((dt, i) => (
                          <View style={styles.table} key={i}>
                              <Text style={styles.tableTitle}>{dt.name}: </Text>
                              <Text style={styles.tableData}>{dt.value}</Text>
                          </View>
                      ))
                    : ""}
            </ScrollView>

            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        marginTop: StatusBar.currentHeight,
    },

    card: {
        position: "absolute",
        zIndex: 99,
        left: "10%",
        right: "10%",
        top: 70,
        bottom: "10%",
        backgroundColor: "#fff",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    input: {
        height: 40,
        minWidth: "80%",
        margin: 12,
        borderWidth: 2,
        borderRadius: 5,
        borderColor: "#ddd",
        padding: 10,
    },
    text: {
        fontSize: 16,
    },
    wrapperCustom: {
        width: "80%",
        padding: 5,
        margin: 5,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
    },
    table: {
        flexDirection: "row",
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#ddd",
    },
    tableTitle: {
        fontWeight: "bold",
        width: "30%",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 5,
    },
    tableData: {
        width: "70%",
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 5,
    },
});