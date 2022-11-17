import React, { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckLog from './CheckLog';
import axios from 'axios';

export const DataContext = createContext();

const DataProvider = (props) => {
    const { token } = CheckLog();

    const [refreshing, setRefreshing] = React.useState(false);
    const [name, setName] = React.useState('');
    const [addressData, setAddressData] = React.useState('');
    const [mainData, setMainData] = React.useState([]);

    // colors
    const [modalVisible, setModalVisible] = React.useState(false);
    const [activeColor, setActiveColor] = React.useState('');
    const [activeName, setActiveName] = React.useState('');
    const [garbageColor, setGarbageColor] = React.useState('');
    const [recycleColor, setRecycleColor] = React.useState('');
    const [gardenColor, setGardenColor] = React.useState('');

    React.useEffect(() => {
        const getData = async () => {
            try {
                const value = await AsyncStorage.getItem('@addressName');
                if (value !== null) {
                    setAddressData(JSON.parse(value));
                }
            } catch (e) {
                console.log(e);
            }
        };
        getData();
    }, [refreshing]);

    React.useEffect(() => {
        if (addressData.dbKey) {
            setName(addressData.displayValue);
            axios
                .post(
                    `https://gisweb.casey.vic.gov.au/IntraMaps22A/ApplicationEngine/Search/Refine/Set?IntraMapsSession=${token}`,
                    {
                        dbKey: addressData.dbKey,
                        infoPanelWidth: 0,
                        mapKey: addressData.mapKey,
                        mode: 'Refresh',
                        selectionLayer: addressData.selectionLayer,
                        zoomType: 'current',
                    }
                )
                .then((res) => {
                    setMainData(res.data.infoPanels.info1.feature.fields);
                })
                .catch((err) => console.error({ mainData: err.response.data }));
        }
    }, [addressData]);

    // colors
    React.useEffect(() => {
        const getColors = async () => {
            try {
                const garbageColor = await AsyncStorage.getItem(
                    '@garbageColor'
                );
                if (garbageColor !== null) {
                    setGarbageColor(garbageColor);
                }
                const recycleColor = await AsyncStorage.getItem(
                    '@recycleColor'
                );
                if (recycleColor !== null) {
                    setRecycleColor(recycleColor);
                }
                const gardenColor = await AsyncStorage.getItem('@gardenColor');
                if (gardenColor !== null) {
                    setGardenColor(gardenColor);
                }
            } catch (e) {
                console.log(e);
            }
        };
        getColors();
    }, [modalVisible]);

    return (
        <DataContext.Provider
            value={{
                refreshing,
                setRefreshing,
                name,
                mainData,
                setMainData,

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
                setAddressData,
            }}
        >
            {props.children}
        </DataContext.Provider>
    );
};

export default DataProvider;
