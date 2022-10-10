import React from "react";
import { Appearance } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import Welcome from "./screens/Welcome/Welcome";
import { mainColor } from "./utils/colors";
import Login from "./screens/Authenticate/Login";
import Signup from "./screens/Authenticate/Signup";

export default function App() {
    const Stack = createNativeStackNavigator();
    console.log(Appearance.getColorScheme());
    return (
        <NavigationContainer>
            {/* <SafeAreaView style={styles.container}> */}
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Welcome}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Log in" component={Login} />
                <Stack.Screen name="Sign up" component={Signup} />
            </Stack.Navigator>

            <StatusBar style="auto" />
        </NavigationContainer>
        //   </SafeAreaView>
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
