import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { secondaryColor } from "../../utils/colors";

export default function Setting() {
    const [address, onChangeAddress] = React.useState(null);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Set home address</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeAddress}
                    placeholder="Enter address..."
                    value={address}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={[styles.inputText, { marginTop: 25 }]}>
                    Set bin colors
                </Text>
            </View>

            <View style={styles.textContainer}>
                <Icon name="label" size={50} color="green" />
                <Text style={styles.text}>Garbage bin</Text>
            </View>
            <View style={styles.textContainer}>
                <Icon name="label" size={50} color="blue" />
                <Text style={styles.text}>Recycling bin</Text>
            </View>
            <View style={styles.textContainer}>
                <Icon name="label" size={50} color={secondaryColor} />
                <Text style={styles.text}>Garden bin</Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "100%",
    },

    inputContainer: {
        margin: 10,
        width: "80%",
    },
    inputText: {
        color: "#ffffff",
        textAlign: "left",
        fontWeight: "bold",
        fontSize: 18,
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        backgroundColor: "#ffffff",
        borderRadius: 5,
    },

    text: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        marginHorizontal: 10,
    },
    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        width: "80%",
    },
});
