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
import axios from "axios";

export default function Signup({ navigation }) {
    const [name, onChangeName] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [error, setError] = React.useState({});
    const [active, setActive] = React.useState(0);

    const handleSignup = async () => {
        if (!name.trim()) {
            setError({ name: "Name is required" });
        } else if (!email.trim()) {
            setError({ email: "Email is required" });
        } else if (!password.trim()) {
            setError({ password: "Password is required" });
        } else {
            setError({});

            const payload = {
                name: name,
                email: email,
                password: password,
            };
            try {
                const data = await axios.post(
                    "https://map-api.makereal.click/signup",
                    payload
                );
                console.log(data);
                setError({ response: data.data.message });

                if (data.data.message == "Signup successful") {
                    setTimeout(() => {
                        setError({});
                        navigation.navigate("Log in");
                    }, 1500);
                }
            } catch (error) {
                console.error(error.response.data);
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

            <View>
                <Text style={{ color: "red" }}>
                    {error?.name ||
                        error?.email ||
                        error?.password ||
                        error?.validation}
                </Text>
                <Text style={{ color: "#fff" }}>{error?.response}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        setActive(1);
                        handleSignup();
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
