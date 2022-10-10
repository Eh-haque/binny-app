import React from "react";
import { Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, StatusBar } from "react-native";
import Welcome from "./screens/Welcome/Welcome";
import { mainColor, secondaryColor } from "./utils/colors";
import Login from "./screens/Authenticate/Login";
import Signup from "./screens/Authenticate/Signup";
import TabNavigation from "./components/TabNavigation";

const stackOptions = {
    headerStyle: {
        backgroundColor: "#000000",
    },
    headerTintColor: secondaryColor,
    headerTitleAlign: "center",
};

export default function App() {
    const Stack = createNativeStackNavigator();
    // console.log(Appearance.getColorScheme());

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Log in"
                    component={Login}
                    options={stackOptions}
                />
                <Stack.Screen
                    name="Sign up"
                    component={Signup}
                    options={stackOptions}
                />
                {/* <Stack.Screen
                    name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Setting"
                    component={Setting}
                    options={stackOptions}
                />
                <Stack.Screen
                    name="Feedback"
                    component={Feedback}
                    options={stackOptions}
                /> */}

                <Stack.Screen
                    name="TabNavigation"
                    component={TabNavigation}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>

            <StatusBar style="auto" />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: mainColor,
        alignItems: "center",
        justifyContent: "center",
    },
});
