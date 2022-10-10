import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { secondaryColor } from "../utils/colors";

const Button = ({ active, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={active === 1 ? styles.activeButton : styles.inActiveButton}
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
    );
};

export default Button;

const styles = StyleSheet.create({
    activeButton: {
        backgroundColor: secondaryColor,
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#906500",
        width: "80%",
        borderRadius: 10,
    },
    inActiveButton: {
        backgroundColor: "transparent",
        padding: 10,
        margin: 5,
        borderWidth: 1,
        borderColor: "#906500",
        width: "80%",
        borderRadius: 10,
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "bold",
    },
});
