import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CheckLog = () => {
    const [isTokenExits, setIsTokenExits] = React.useState(false);

    React.useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem("@binnyToken");
                if (value !== null) {
                    setIsTokenExits(true);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getToken();
    }, []);

    return { isTokenExits, setIsTokenExits };
};

export default CheckLog;
