import React, { useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    RefreshControl,
    View,
    Text,
    StyleSheet,
} from 'react-native';
import { secondaryColor } from '../../utils/colors';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DataContext } from '../../hooks/DataContext';

const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Home({ navigation }) {
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const {
        refreshing,
        setRefreshing,
        name,
        mainData,
        garbageColor,
        recycleColor,
        gardenColor,
    } = useContext(DataContext);

    let garbageData = '';
    let recycleData = '';
    let gardenData = '';

    mainData.forEach((item) => {
        if (item.caption == 'Garden Collection') {
            garbageData = item?.value?.value;
        }
        if (item.caption == 'Recycling Collection') {
            recycleData = item?.value?.value;
        }
        if (item.caption == 'Garden Collection') {
            gardenData = item?.value?.value;
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView
                contentContainerStyle={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text
                    style={{
                        color: secondaryColor,
                        fontSize: 50,
                        marginBottom: 25,
                    }}
                >
                    Binny
                </Text>

                <Icon name="home" size={50} color={'#ffffff'} />

                <Text style={[styles.text, { marginBottom: 30 }]}>
                    {name || 'Not found'}
                </Text>

                <View style={styles.textContainer}>
                    <View>
                        <Icon
                            name="label"
                            size={50}
                            color={`${garbageColor ? garbageColor : 'green'}`}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Garbage bin</Text>
                        <Text style={styles.text}>
                            {garbageData || 'Not found'}
                        </Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <View>
                        <Icon
                            name="label"
                            size={50}
                            color={`${recycleColor ? recycleColor : 'blue'}`}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Recycle bin</Text>
                        <Text style={styles.text}>
                            {recycleData || 'Not found'}
                        </Text>
                    </View>
                </View>
                <View style={styles.textContainer}>
                    <View>
                        <Icon
                            name="label"
                            size={50}
                            color={`${
                                gardenColor ? gardenColor : secondaryColor
                            }`}
                        />
                    </View>
                    <View>
                        <Text style={styles.text}>Garden bin</Text>
                        <Text style={styles.text}>
                            {gardenData || 'Not found'}
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },
    text: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginHorizontal: 10,
        marginVertical: 4,
    },
    textContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '80%',
        marginVertical: 20,
    },
});
