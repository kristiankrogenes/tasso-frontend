import { StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NavStack from './src/components/NavStack.js';
import LoginScreen from './src/screens/LoginScreen';


export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{gestureEnabled: false}}>
        <Stack.Screen
          name="NavStack"
          component={NavStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login"
          component={LoginScreen} 
        />
      </Stack.Navigator>
    </NavigationContainer>
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
