import React from 'react';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome/Welcome';
import { mainColor, secondaryColor } from './utils/colors';
import Login from './screens/Authenticate/Login';
import Signup from './screens/Authenticate/Signup';
import TabNavigation from './components/TabNavigation';
import CheckLog from './hooks/CheckLog';
import DataProvider from './hooks/DataContext';
import { StatusBar } from 'expo-status-bar';

const stackOptions = {
    headerStyle: {
        backgroundColor: mainColor,
    },
    headerTintColor: secondaryColor,
    headerTitleAlign: 'center',
};

export default function App() {
    const { isTokenExits } = CheckLog();
    const Stack = createNativeStackNavigator();

    // console.log(Appearance.getColorScheme());

    return (
        <DataProvider>
            <NavigationContainer theme={DarkTheme}>
                <Stack.Navigator initialRouteName={'Welcome'}>
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

                <StatusBar
                    style="light"
                    animated={true}
                    backgroundColor={mainColor}
                />
            </NavigationContainer>
        </DataProvider>
    );
}
