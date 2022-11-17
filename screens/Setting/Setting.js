import React, { useContext } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    RefreshControl,
    View,
    FlatList,
    Pressable,
    ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { secondaryColor } from '../../utils/colors';
import ColorPallet from '../../components/ColorPallet';
import CheckLog from '../../hooks/CheckLog';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../../hooks/DataContext';
import SearchBar from 'react-native-dynamic-search-bar';

export let colorRefresh = false;

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Setting({ navigation }) {
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const { token } = CheckLog();

    const [address, onChangeAddress] = React.useState('');
    const [text, setText] = React.useState('Enter address...');
    const [configData, setConfigData] = React.useState([]);
    const [error, setError] = React.useState({});

    React.useEffect(() => {
        if (address.trim()) {
            axios
                .post(
                    `https://gisweb.casey.vic.gov.au/IntraMaps22A/ApplicationEngine/Search/?infoPanelWidth=0&mode=Refresh&form=918fd81b-bb3e-4bd1-8c78-1bd5b11fe1aa&resubmit=false&IntraMapsSession=${token}`,
                    { fields: [address] }
                )
                .then((res) => {
                    setConfigData(res.data.fullText);
                })
                .catch((err) => {
                    if (err.response.data) {
                        setError({ server: 'Something went wrong' });
                    }
                    console.error({ configData: err.response.data });
                });
        } else {
            setConfigData([]);
        }
    }, [address]);

    const {
        modalVisible,
        setModalVisible,
        activeColor,
        setActiveColor,
        activeName,
        setActiveName,
        garbageColor,
        recycleColor,
        gardenColor,
        setAddressData,
    } = useContext(DataContext);

    const onPressFunction = async (item) => {
        onChangeAddress('');
        setText(item.displayValue);
        await AsyncStorage.setItem('@addressName', JSON.stringify(item));
        setAddressData(item);

        setConfigData([]);
        setError({ res: 'Address selected successfully.' });

        navigation.navigate('Home');
    };

    const renderItem = ({ item, i }) => (
        <Pressable
            key={i}
            style={({ pressed }) => [
                {
                    backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
                },
                styles.wrapperCustom,
            ]}
            onPress={() => onPressFunction(item)}
        >
            <Text style={styles.text}>{item.displayValue}</Text>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.inputText}>Set home address</Text>
                <SearchBar
                    style={styles.input}
                    placeholder={text}
                    onPress={() => alert('Search Address')}
                    onChangeText={(text) => onChangeAddress(text)}
                    onClearPress={() => {
                        setText('Enter address...');
                        setConfigData([]);
                        setError({});
                    }}
                />

                {/* <TextInput
                    style={styles.input}
                    onChangeText={onChangeAddress}
                    placeholder="Enter address..."
                    value={address || text || ''}
                /> */}
            </View>

            {configData?.length > 0 && (
                <View style={styles.card}>
                    <FlatList
                        data={configData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    />
                </View>
            )}

            <View style={styles.inputContainer}>
                <Text style={[styles.inputText, { marginTop: 25 }]}>
                    Set bin colors
                </Text>
            </View>

            <Pressable
                style={styles.textContainer}
                onPress={() => {
                    setActiveColor(garbageColor);
                    setActiveName('garbageColor');
                    setModalVisible(true);
                }}
            >
                <Icon
                    name="label"
                    size={50}
                    color={`${garbageColor ? garbageColor : 'green'}`}
                />
                <Text style={styles.text}>Garbage bin</Text>
            </Pressable>

            <Pressable
                style={styles.textContainer}
                onPress={() => {
                    setActiveColor(recycleColor);
                    setActiveName('recycleColor');
                    setModalVisible(true);
                }}
            >
                <Icon
                    name="label"
                    size={50}
                    color={`${recycleColor ? recycleColor : 'blue'}`}
                />
                <Text style={styles.text}>Recycling bin</Text>
            </Pressable>

            <Pressable
                style={styles.textContainer}
                onPress={() => {
                    setActiveColor(gardenColor);
                    setActiveName('gardenColor');
                    setModalVisible(true);
                }}
            >
                <Icon
                    name="label"
                    size={50}
                    color={`${gardenColor ? gardenColor : secondaryColor}`}
                />
                <Text style={styles.text}>Garden bin</Text>
            </Pressable>

            <ColorPallet
                activeColor={activeColor}
                activeName={activeName}
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
            />

            {/* {error.server && (
                <Text style={{ color: "red" }}>{error.server}</Text>
            )} */}
            {error.res && (
                <Text style={{ color: '#fff', marginTop: 50 }}>
                    {error.res}
                </Text>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },

    inputContainer: {
        margin: 10,
        width: '80%',
    },
    inputText: {
        color: '#ffffff',
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 18,
    },
    input: {
        width: '100%',
        height: 50,
        borderWidth: 1,
        padding: 10,
        marginTop: 10,
        backgroundColor: '#ffffff',
        borderRadius: 5,
    },

    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },

    card: {
        position: 'absolute',
        zIndex: 99,
        left: '10%',
        right: '10%',
        top: 100,
        bottom: '10%',
        backgroundColor: '#2E2E2E',
        borderRadius: 5,
        shadowColor: '#fff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    wrapperCustom: {
        width: '80%',
        padding: 5,
        margin: 5,
        backgroundColor: '#2E2E2E',
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 5,
    },
});
