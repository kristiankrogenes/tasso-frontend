import * as React from 'react';
import { StyleSheet, ScrollView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import ScoreListItem from '../components/ScoreListItem';

export default function HighScoreScreen() {
    const hsRoundData = [
        {id: 1, name: "Kristian Walseth Krøgenes", club: "Asker Golfklubb", score: "84"},
        {id: 2, name: "Vemund Thallaug Lund", club: "Asker Golfklubb", score: "99"},
        {id: 3, name: "Erik Galler", club: "Asker Golfklubb", score: "105"},
        {id: 4, name: "Jens Hovem Leonhardsen", club: "Asker Golfklubb", score: "112"},
        {id: 5, name: "Fredrik Haustein", club: "Asker Golfklubb", score: "84"},
        {id: 6, name: "Torkil Seljestokken", club: "Asker Golfklubb", score: "99"},
        {id: 7, name: "Lars Moen", club: "Asker Golfklubb", score: "105"},
        {id: 8, name: "Thorvald Hillesøy", club: "Asker Golfklubb", score: "112"},
        {id: 9, name: "Kasper Lien Oftebro", club: "Asker Golfklubb", score: "84"},
        {id: 10, name: "Kristian Walseth Krøgenes", club: "Asker Golfklubb", score: "84"},
        {id: 11, name: "Vemund Thallaug Lund", club: "Asker Golfklubb", score: "99"},
        {id: 12, name: "Erik Galler", club: "Asker Golfklubb", score: "105"},
        {id: 13, name: "Jens Hovem Leonhardsen", club: "Asker Golfklubb", score: "112"},
        {id: 14, name: "Fredrik Haustein", club: "Asker Golfklubb", score: "84"},
        {id: 15, name: "Torkil Seljestokken", club: "Asker Golfklubb", score: "99"},
        {id: 16, name: "Lars Moen", club: "Asker Golfklubb", score: "105"},
        {id: 17, name: "Thorvald Hillesøy", club: "Asker Golfklubb", score: "112"},
        {id: 18, name: "Kasper Lien Oftebro", club: "Asker Golfklubb", score: "84"},
    ];

    const [selected, setSelected] = React.useState("");

    const golfclub_data = [
        {key: '1', value: 'Asker Golfklubb'},
        {key: '2', value: 'Holtsmark Golfklubb'},
        {key: '3', value: 'Oslo Golfklubb'},
        {key: '4', value: 'Le Rovedine Golf Club'},
        {key: '5', value: 'Ballerud Golfklubb', disabled: true},
        {key: '6', value: 'Asker Golfklubb'},
        {key: '7', value: 'Holtsmark Golfklubb'},
        {key: '8', value: 'Oslo Golfklubb'},
        {key: '9', value: 'Le Rovedine Golf Club'},
    ];

    return (
        <View style={styles.highScoreScreenContainer}>
            <View style={styles.dropdownContainer}>
                <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={golfclub_data} 
                    save="value"
                    // dropdownShown={False}
                    maxHeight={200}
                />
            </View>

            <View style={{display: 'flex', flexDirection: 'row', padding: 10, width: '95%'}}>
                <Text style={{flex: 1, textAlign: 'center'}}>#</Text>
                <Text style={{flex: 3, textAlign: 'center'}}>Name</Text>
                <Text style={{flex: 3, textAlign: 'center'}}> Club</Text>
                <Text style={{flex: 1, textAlign: 'center'}}>Score</Text>
            </View>

            <ScrollView style={styles.scrollViewBox}>
                <View style={styles.scoreListContainer}>
                    {hsRoundData.map((round) => (
                        <View key={round.id} style={{marginTop: 8, marginBottom: 8}}>
                            <ScoreListItem 
                                key={round.id}
                                id={round.id}
                                name={round.name}
                                club={round.club}
                                score={round.score}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    highScoreScreenContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#EFF5F5',
        // padding: 10,
        alignItems: 'center'
    },
    dropdownContainer: {
        padding: 10,
        width: '100%',
        marginBottom: 25,
    },
    scrollViewBox: {
        width: '100%',
    },
    scoreListContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
