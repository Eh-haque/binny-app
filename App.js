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
import CheckLog from "./hooks/CheckLog";
import Home from "./screens/Home/Home";
import DataProvider from "./hooks/DataContext";

const stackOptions = {
    headerStyle: {
        backgroundColor: "#000000",
    },
    headerTintColor: secondaryColor,
    headerTitleAlign: "center",
};

export default function App() {
    const { isTokenExits } = CheckLog();
    const Stack = createNativeStackNavigator();

    // console.log(Appearance.getColorScheme());

    return (
        <DataProvider>
            <NavigationContainer>
                <Stack.Navigator initialRouteName={"Welcome"}>
                    <Stack.Screen
                        name="TabNavigation"
                        component={TabNavigation}
                        options={{ headerShown: false }}
                    />

                    <Stack.Screen
                        name="Welcome"
                        component={
                            isTokenExits === true ? TabNavigation : Welcome
                        }
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
                </Stack.Navigator>

                <StatusBar style="auto" backgroundColor="#000" />
            </NavigationContainer>
        </DataProvider>
    );
}
