import * as React from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import ScoreListItem from '../../components/ScoreListItem';

import { useIsFocused } from '@react-navigation/native';
import { auth } from '../../../firebase';
import { fetchAllPersonalScoresFromFirestore } from '../../firestore/queries';

const wait = async (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HighScoreScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [roundScores, setRoundScores] = React.useState([]);

    React.useEffect(() => {
        getAllPersonalRoundScoresData(auth.currentUser.uid);
    }, [isFocused]);

    const getAllPersonalRoundScoresData = async (user_id) => {
        const roundScoresData = await fetchAllPersonalScoresFromFirestore(user_id);
        setRoundScores(roundScoresData);
    }

    return (
        <View style={styles.personalScoreContainer}>
            <ScrollView style={styles.scrollViewBox}>
                <View style={styles.scoreListContainer}>
                    {roundScores.map((round) => (
                        <View key={round.id} style={{marginTop: 8, marginBottom: 8}}>
                            <ScoreListItem 
                                key={round.id}
                                id={round.id}
                                name={round.name}
                                club={round.club}
                                score={round.score}
                                date={round.date}
                                par={round.par}
                            />
                        </View>
                    ))}
                </View>
            </ScrollView>
            <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{fontSize: 25}}>Go Back</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    personalScoreContainer: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#EFF5F5',
        padding: 10,
        alignItems: 'center',
        marginBottom: 20
    },
    scrollViewBox: {
        width: '100%',
        // marginBottom: 20,
    },
    scoreListContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
		width: '100%',
		alignItems: "center",
		backgroundColor: "#a6d7de",
		padding: 10,
		margin: 5,
		borderRadius: 10,
        marginTop: 10,
	},
});
