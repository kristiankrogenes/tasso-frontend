import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

export default function WeatherListItem(props) {
    return (
        <View style={styles.listItemContainer}>
            <Text style={styles.idBox}>{props.hour}</Text>
            <Image 
                style={{width: 50, height: 50}}
                source={{uri: `https://www.weatherbit.io/static/img/icons/${props.weatherIconCode}.png`}} 
            />
            <Text style={styles.idBox}>{props.temp}°C</Text>
            <Text style={styles.idBox}>{props.precip} mm</Text>
            <Text style={styles.idBox}>{props.windSpeed}({props.windGustSpeed}) {props.windDirection}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        width: '95%',
        height: 85,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,

        shadowColor: '#171717',
        shadowOffset: {width: -1, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    idBox: {
        flex: 1,
        textAlign: 'center',
        fontSize: Platform.OS === "ios" ? 15 : 12,
    },
});