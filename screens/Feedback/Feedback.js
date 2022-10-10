import React from "react";
import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
} from "react-native";
import { secondaryColor } from "../../utils/colors";

export default function Feedback({ navigation }) {
    const [subject, onChangeSubject] = React.useState(null);
    const [details, onChangeDetails] = React.useState(null);
    const [active, setActive] = React.useState(0);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Subject</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeSubject}
                    placeholder="Enter subject..."
                    value={subject}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Details</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeDetails}
                    value={details}
                    placeholder="Enter details..."
                />
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        setActive(1);
                        navigation.navigate("Home");
                    }}
                    style={
                        active === 1
                            ? styles.activeButton
                            : styles.inActiveButton
                    }
                >
                    <Text
                        style={
                            active === 1
                                ? [{ color: "#fff" }, styles.buttonText]
                                : [{ color: "#906500" }, styles.buttonText]
                        }
                    >
                        Submit
                    </Text>
                </Pressable>
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
    },
    input: {
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        backgroundColor: "#ffffff",
        borderRadius: 5,
    },

    // button style
    buttonContainer: {
        marginVertical: 25,
        width: "80%",
    },
    activeButton: {
        backgroundColor: secondaryColor,
        padding: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: "#906500",
        borderRadius: 5,
    },
    inActiveButton: {
        backgroundColor: "transparent",
        padding: 15,
        margin: 5,
        borderWidth: 1,
        borderColor: "#906500",
        borderRadius: 5,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
    },
});
