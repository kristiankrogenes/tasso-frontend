import * as React from 'react';

import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HighScoreScreen from '../screens/HighScoreScreen';
import LoginScreen from '../screens/LoginScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function NavStack() {

    const Tab = createBottomTabNavigator();

    return (
        <Tab.Navigator 
            initialRouteName="Home"
            screenOptions={{ headerStyle: { backgroundColor: '#427AA1' } }}
        >
            <Tab.Screen 
                name="HIGH SCORES"
                component={HighScoreScreen}
                options={{
                    // tabBarActiveBackgroundColor: '#FFF000',
                    
                    tabBarLabel: 'high_score',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="table" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Login"
                component={LoginScreen}
                options={{
                tabBarLabel: 'login',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account" color={color} size={size} />
                    ),
                }}
            /> */}
        </Tab.Navigator>
    );
}