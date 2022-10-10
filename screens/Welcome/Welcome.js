import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { secondaryColor } from "../../utils/colors";
import Button from "../../components/Button";

const Welcome = ({ navigation }) => {
    const [active, setActive] = React.useState(0);

    return (
        <View style={styles.container}>
            <Text style={{ color: secondaryColor, fontSize: 50 }}>Binny</Text>
            <Image
                style={styles.image}
                source={require("../../media/images/binny.jpeg")}
            />
            <Text style={{ color: secondaryColor, fontSize: 20 }}>
                rolling your wheely bins.
            </Text>

            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => {
                        setActive(0);
                        navigation.navigate("Log in");
                    }}
                    style={[
                        { marginBottom: 20 },
                        active === 0
                            ? styles.activeButton
                            : styles.inActiveButton,
                    ]}
                >
                    <Text
                        style={
                            active === 0
                                ? [{ color: "#fff" }, styles.buttonText]
                                : [{ color: "#906500" }, styles.buttonText]
                        }
                    >
                        Log in
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {
                        setActive(1);
                        navigation.navigate("Sign up");
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
                        Sign up
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    text: {
        color: "#906500",
    },
    image: {
        height: 250,
        width: 250,
        margin: 25,
        borderRadius: 50,
    },

    // button style
    buttonContainer: {
        marginTop: 50,
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
});

export default Welcome;
