import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const CheckLog = () => {
    const [token, setToken] = React.useState(false);
    const [isTokenExits, setIsTokenExits] = React.useState(false);

    React.useEffect(() => {
        const getToken = async () => {
            try {
                const { data } = await axios.get(
                    'https://map-api.makereal.click/token'
                );
                setToken(data.session.token);
            } catch (e) {
                console.log(e);
            }
        };
        getToken();
    }, []);

    React.useEffect(() => {
        const getToken = async () => {
            try {
                const value = await AsyncStorage.getItem('@binnyToken');
                if (value !== null) {
                    const data = await axios.get(
                        `https://map-api.makereal.click/check_token/${value}`
                    );

                    if (data.data.status == true) {
                        setIsTokenExits(true);
                    } else {
                        setIsTokenExits(false);
                    }
                }
            } catch (e) {
                console.log(e);
            }
        };
        getToken();
    }, []);

    return { isTokenExits, setIsTokenExits, token };
};

export default CheckLog;
