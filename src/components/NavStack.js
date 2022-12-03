import * as React from 'react';

import { HomeScreen, ProfileScreen, HighScoreScreen } from '../screens/navstack/index';

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
        </Tab.Navigator>
    );
}