import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    Modal,
    Pressable,
} from "react-native";
import React from "react";
import ColorPicker from "react-native-wheel-color-picker";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ColorPallet({
    activeColor,
    activeName,
    modalVisible,
    setModalVisible,
}) {
    const handleColor = async (color) => {
        await AsyncStorage.setItem(`@${activeName}`, color);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ScrollView>
                        <ColorPicker
                            color={activeColor}
                            thumbSize={20}
                            sliderSize={20}
                            gapSize={20}
                            // onColorChange={(c) => console.log(c)}
                            onColorChangeComplete={(color) =>
                                handleColor(color)
                            }
                        />
                        {/* <Button title="revert" onPress={() => picker.revert()} /> */}
                    </ScrollView>

                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Text style={styles.textStyle}>Done</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 30,
        backgroundColor: "#000",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#fff",
        shadowOffset: {
            width: 5,
            height: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        elevation: 5,
    },
    button: {
        borderRadius: 20,
        paddingHorizontal: 50,
        paddingVertical: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
    },
});
