import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavStack from './src/components/NavStack';
import { WelcomeScreen, LoginScreen, RegisterScreen } from './src/screens/welcome/index';
import { EditProfileScreen, WeatherScreen, PersonalScoreScreen } from './src/screens/navstack/index';

import { Provider } from "react-redux";
import { store } from "./src/store/index";

export default function App() {

    const Stack = createNativeStackNavigator();

    return (
        <Provider store={store}>
            <NavigationContainer>
                <Stack.Navigator 
                    initialRouteName="Welcome" 
                    screenOptions={{
                        headerLeft: null, 
                        gestureEnabled: false, 
                        headerBackVisible: false
                    }}
                >
                    <Stack.Screen
                        name="NavStack"
                        component={NavStack}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen 
                        name="Welcome"
                        component={WelcomeScreen} 
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen 
                        name="Login"
                        component={LoginScreen} 
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen 
                        name="Register"
                        component={RegisterScreen} 
                        options={{
                            headerShown: false,
                        }}
                    />
                    <Stack.Screen 
                        name="EditProfile"
                        component={EditProfileScreen} 
                        options={{
                            title: "Edit Profile", 
                            headerLeft: null, 
                            gestureEnabled: false
                        }}
                    />
                    <Stack.Screen 
                        name="Weather"
                        component={WeatherScreen} 
                        options={{
                            title: "Weather Forecast", 
                            headerLeft: null, 
                            gestureEnabled: false
                        }}
                    />
                    <Stack.Screen 
                        name="PersonalScores"
                        component={PersonalScoreScreen} 
                        options={{
                            title: "My Rounds", 
                            headerLeft: null, 
                            gestureEnabled: false
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
