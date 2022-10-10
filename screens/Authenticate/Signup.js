import {
    Pressable,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
} from "react-native";
import React from "react";
import { secondaryColor } from "../../utils/colors";

export default function Signup({ navigation }) {
    const [name, onChangeName] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [password, onChangePassword] = React.useState(null);
    const [active, setActive] = React.useState(0);

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Name</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeName}
                        placeholder="Your name..."
                        value={name}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        placeholder="Enter email..."
                        value={email}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputText}>Password</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangePassword}
                        value={password}
                        placeholder="Enter password..."
                        secureTextEntry={true}
                    />
                </View>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        setActive(1);
                        navigation.navigate("Log in");
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
                        Sign Up
                    </Text>
                </Pressable>
            </View>

            <Pressable onPress={() => navigation.navigate("Log in")}>
                <Text style={styles.otherText}>ALREADY HAVE AN ACCOUNT?</Text>
            </Pressable>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "space-around",
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
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#906500",
        borderRadius: 20,
    },
    inActiveButton: {
        backgroundColor: "transparent",
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#906500",
        borderRadius: 20,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
    },

    otherText: {
        color: "#979797",
        textAlign: "center",
        fontWeight: "bold",
    },
});
