import axios from "axios";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login({ navigation }) {
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [error, setError] = React.useState({});
    const [active, setActive] = React.useState(0);

    const handleLogin = async () => {
        if (!email.trim()) {
            setError({ email: "Email is required" });
        } else if (!password.trim()) {
            setError({ password: "Password is required" });
        } else {
            setError({});

            const payload = {
                email: email,
                password: password,
            };
            try {
                const data = await axios.post(
                    "https://map-api.makereal.click/login",
                    payload
                );
                setError({ response: data.data.message });

                if (data.data.message == "Login successful") {
                    await AsyncStorage.setItem("@binnyToken", data.data.token);
                    setTimeout(() => {
                        setError({});
                        navigation.navigate("TabNavigation");
                    }, 1500);
                }
            } catch (error) {
                setError({ validation: error.response.data.message });
            }
        }
    };

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
                    <Text style={styles.inputText}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={onChangeEmail}
                        placeholder="Enter email..."
                        value={email}
                    />
                    {/* <Text style={{ color: "red" }}>{error?.email}</Text> */}
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
                    {/* <Text style={{ color: "red" }}>{error?.password}</Text> */}
                </View>
            </View>

            <View>
                <Text style={{ color: "red" }}>
                    {error?.email || error?.password || error?.validation}
                </Text>
                <Text style={{ color: "#fff" }}>{error?.response}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        setActive(1);
                        handleLogin();
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
                        Log In
                    </Text>
                </Pressable>

                <Pressable style={{ marginTop: "10%" }} onPress={() => ""}>
                    <Text style={styles.otherText}>FORGOT PASSWORD?</Text>
                </Pressable>
            </View>

            <Pressable onPress={() => navigation.navigate("Sign up")}>
                <Text style={styles.otherText}>NEW TO THE APP? SIGN UP</Text>
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
