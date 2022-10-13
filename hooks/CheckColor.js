import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckColor = () => {
    const [modalVisible, setModalVisible] = React.useState(false);
    const [activeColor, setActiveColor] = React.useState("");
    const [activeName, setActiveName] = React.useState("");
    const [garbageColor, setGarbageColor] = React.useState("");
    const [recycleColor, setRecycleColor] = React.useState("");
    const [gardenColor, setGardenColor] = React.useState("");

    React.useEffect(() => {
        const getColors = async () => {
            try {
                const garbageColor = await AsyncStorage.getItem(
                    "@garbageColor"
                );
                if (garbageColor !== null) {
                    setGarbageColor(garbageColor);
                }
                const recycleColor = await AsyncStorage.getItem(
                    "@recycleColor"
                );
                if (recycleColor !== null) {
                    setRecycleColor(recycleColor);
                }
                const gardenColor = await AsyncStorage.getItem("@gardenColor");
                if (gardenColor !== null) {
                    setGardenColor(gardenColor);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getColors();
    }, [modalVisible]);

    return {
        modalVisible,
        setModalVisible,
        activeColor,
        setActiveColor,
        activeName,
        setActiveName,
        garbageColor,
        setGarbageColor,
        recycleColor,
        setRecycleColor,
        gardenColor,
        setGardenColor,
    };
};

export default CheckColor;
