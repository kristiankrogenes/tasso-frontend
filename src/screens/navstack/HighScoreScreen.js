import * as React from 'react';
import { StyleSheet, ScrollView, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import ScoreListItem from '../../components/ScoreListItem';

import { useIsFocused } from '@react-navigation/native';

import { fetchGolfCoursesFromFireStore, fetchRoundScoresFromFireStore } from '../../firestore/queries';

export default function HighScoreScreen() {

    const isFocused = useIsFocused();

    const [golfCourses, setGolfCourses] = React.useState([]);
    const [dropDownGolfCourses, setDropDownGolfCourses] = React.useState([]);

    const [roundScores, setRoundScores] = React.useState([]);

    const [selected, setSelected] = React.useState("");

    React.useEffect(() => {
        getAndSetGolfCoursesData();
    }, [isFocused]);

    React.useEffect(() => {
        getRoundScoresData();
    }, [selected]);

    const getAndSetGolfCoursesData = async () => {
        const golfCoursesData = await fetchGolfCoursesFromFireStore();
        setGolfCourses(golfCoursesData);
        setDropDownGolfCourses(golfCoursesData.map(course => (
            {key: course.id, value: course.name}
        )));
    }

    const getRoundScoresData = async () => {
        const roundScoresData = await fetchRoundScoresFromFireStore(selected);
        setRoundScores(roundScoresData);
    }

    return (
        <View style={styles.highScoreScreenContainer}>
            <View style={styles.dropdownContainer}>
                <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={dropDownGolfCourses} 
                    save="key"
                    placeholder="Choose club"
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
