import React from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';

import ScoreListItem from '../components/ScoreListItem';

export default function HighScoreScreen() {
    const [hsRoundData, setHsRoundData] = React.useState([
        {id: 1, name: "Kristian Walseth Krøgenes", club: "Asker Golfklubb", score: "84"},
        {id: 2, name: "Vemund Thallaug Lund", club: "Asker Golfklubb", score: "99"},
        {id: 3, name: "Erik Galler", club: "Asker Golfklubb", score: "105"},
        {id: 4, name: "Jens Hovem Leonhardsen", club: "Asker Golfklubb", score: "112"},
    ]);

    return (
        <View style={styles.highScoreScreenContainer}>
            {hsRoundData.map((round) => (
                <ScoreListItem 
                    key={round.id}
                    id={round.id}
                    name={round.name}
                    club={round.club}
                    score={round.score}
                />
            ))}
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
