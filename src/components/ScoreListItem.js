import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

export default function ScoreListItem(props) {

    return (
        <View style={styles.listItemContainer}>
            <Text style={styles.idBox}>{props.id}</Text>
            <Text style={styles.textBox}>{props.name}</Text>
            <Text style={styles.textBox}>{props.club}</Text>
            <Text style={styles.idBox}>{props.score}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey'
    },
    idBox: {
        flex: 1,
        textAlign: 'center'
    },
    textBox: {
        flex: 3,
        textAlign: 'center'
    }
});