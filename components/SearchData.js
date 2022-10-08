import {
    FlatList,
    StyleSheet,
    Text,
    TextInput,
    View,
    Pressable,
} from "react-native";
import React from "react";

export default function SearchData({
    onChangeText,
    text,
    selectedText,
    configData,
    onPressFunction,
}) {
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
        <View style={styles.searchPopover}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
            />

            {selectedText && (
                <View style={{ width: "80%", marginVertical: 5 }}>
                    <Text>Showing result for: </Text>
                    <Text style={{ fontWeight: "bold" }}>{selectedText}</Text>
                </View>
            )}

            <View style={[styles.card, styles.shadowProp]}>
                {configData?.length > 0 && (
                    <FlatList data={configData} renderItem={renderItem} />
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchPopover: {
        position: "relative",
    },
    input: {
        height: 40,
        minWidth: "80%",
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 5,
        maxHeight: "80%",
    },
    shadowProp: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
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
    },
});
