import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={styles.profileScreenContainer}>
      <Text>This is the Profile Screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    profileScreenContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
