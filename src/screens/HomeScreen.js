import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import { signOut } from "firebase/auth";
import { auth } from '../../firebase';

export default function HomeScreen({ navigation }) {
    const [loggedInUserEmail, setLoggedInUserEmail] = React.useState(auth.currentUser?.email);
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate("Login")
            })
            .catch(error => alert(error.message))
    }

    return (
        // <View style={styles.homeScreenContainer}>
        //     <Text>This is the Home Screen.</Text>
        // </View>

        <View style={styles.container}>
            <Text>Email: {loggedInUserEmail}</Text>
            <TouchableOpacity
                onPress={handleSignOut}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    homeScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
});
