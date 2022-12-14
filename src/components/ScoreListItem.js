import * as React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

export default function ScoreListItem(props) {
    return (
        <View style={styles.listItemContainer}>
            <Text style={[styles.textStyle, styles.idBox]}>{props.id}</Text>
            <View style={{flex: 8, paddingLeft: 10}}>
                <View style={styles.topInfoBox}>
                    <View>
                        <Text style={styles.textStyle}>{props.date}</Text>
                        <Text style={[styles.textStyle, {fontWeight: 'bold'}]}>{props.name}</Text>
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.textStyle}>Brutto </Text>
                        <View style={{backgroundColor: 'lightgrey', borderRadius: 14, padding: 5}}>
                            <Text style={styles.textStyle}>{props.score}</Text>
                        </View>
                    </View>
                </View>
                <Text style={[styles.textStyle, {paddingTop: 5}]}>{props.club} 18 Holes / Par {props.par}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listItemContainer: {
        width: '95%',
        height: 85,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#FFFFFF',
        padding: 10,
        borderRadius: 5,

        shadowColor: '#171717',
        shadowOffset: {width: -1, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    topInfoBox: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 5,
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
    },
    textStyle: {
        fontSize: Platform.OS === "ios" ? 15 : 12
    }
});