import React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { secondaryColor } from "../../utils/colors";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home({ navigation }) {
    const [active, setActive] = React.useState(0);

    return (
        <SafeAreaView style={styles.container}>
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
                6 Arron Court, Endeavour Hills
            </Text>

            <View style={styles.textContainer}>
                <View>
                    <Icon name="label" size={50} color="green" />
                </View>
                <View>
                    <Text style={styles.text}>Garbage bin</Text>
                    <Text style={styles.text}>Weekly on Tuesday</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Icon name="label" size={50} color="blue" />
                </View>
                <View>
                    <Text style={styles.text}>Garbage bin</Text>
                    <Text style={styles.text}>Weekly on Tuesday</Text>
                </View>
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Icon name="label" size={50} color={secondaryColor} />
                </View>
                <View>
                    <Text style={styles.text}>Garbage bin</Text>
                    <Text style={styles.text}>Weekly on Tuesday</Text>
                </View>
            </View>
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
