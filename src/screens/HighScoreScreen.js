import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
    return (
        <View style={styles.highScoreScreenContainer}>
            <Text>This is the High Score Screen.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    highScoreScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
