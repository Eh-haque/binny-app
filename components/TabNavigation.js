import { SafeAreaView, StyleSheet, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home/Home";
import Feedback from "../screens/Feedback/Feedback";
import Setting from "../screens/Setting/Setting";
import Icon from "react-native-vector-icons/MaterialIcons";
import { secondaryColor } from "../utils/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screen names
const homeScreen = "Home";
const settingScreen = "Settings";
const feedbackScreen = "Feedback";
const logoutScreen = "Logout";

export default function TabNavigation({ navigation }) {
    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator
            initialRouteName={homeScreen}
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: "#000000",
                },
                headerTintColor: secondaryColor,
                headerTitleAlign: "center",
                tabBarStyle: {
                    backgroundColor: "#000000",
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let routeName = route.name;

                    if (routeName === homeScreen) {
                        iconName = "home";
                    } else if (routeName === settingScreen) {
                        iconName = "settings";
                    } else if (routeName === feedbackScreen) {
                        iconName = "feedback";
                    } else if (routeName === logoutScreen) {
                        iconName = "logout";
                        iconName === focused
                            ? navigation.navigate("Home")
                            : "logout";
                    }

                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: "#ffffff",
                tabBarInactiveTintColor: secondaryColor,
            })}
        >
            <Tab.Screen
                name={homeScreen}
                component={Home}
                options={{ headerShown: false }}
            />
            <Tab.Screen name={settingScreen} component={Setting} />
            <Tab.Screen name={feedbackScreen} component={Feedback} />
            <Tab.Screen
                name={logoutScreen}
                component={function TabNavigation() {
                    return (
                        <SafeAreaView style={styles.container}>
                            <Icon
                                onPress={async () => {
                                    navigation.navigate("Log in");
                                    await AsyncStorage.removeItem(
                                        "@binnyToken"
                                    );
                                    await AsyncStorage.removeItem("@addressName");
                                }}
                                name={"logout"}
                                size={50}
                                color={secondaryColor}
                            />
                        </SafeAreaView>
                    );
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
        alignItems: "center",
        justifyContent: "space-around",
    },
});
