import * as React from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import ScoreListItem from '../../components/ScoreListItem';

import { useIsFocused } from '@react-navigation/native';

import { fetchGolfCoursesFromFireStore, fetchRoundScoresFromFireStore } from '../../firestore/queries';

const wait = async (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function HighScoreScreen() {

    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = React.useState(false);

    const [golfCourses, setGolfCourses] = React.useState([]);
    const [dropDownGolfCourses, setDropDownGolfCourses] = React.useState([]);

    const [roundScores, setRoundScores] = React.useState([]);

    const [selected, setSelected] = React.useState("");

    React.useEffect(() => {
        getAndSetGolfCoursesData();
    }, [isFocused]);

    React.useEffect(() => {
        getRoundScoresData(selected);
    }, [selected]);

    const onRefresh = React.useCallback((gc_selected) => {
        setRefreshing(true);
        getRoundScoresData(gc_selected);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const getAndSetGolfCoursesData = async () => {
        const golfCoursesData = await fetchGolfCoursesFromFireStore();
        setGolfCourses(golfCoursesData);
        setDropDownGolfCourses(golfCoursesData.map(course => (
            {key: course.id, value: course.name}
        )));
    }

    const getRoundScoresData = async (golf_course_id) => {
        const roundScoresData = await fetchRoundScoresFromFireStore(golf_course_id);
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

            <ScrollView 
                style={styles.scrollViewBox}
                refreshControl={
                    <RefreshControl
                      refreshing={refreshing}
                      onRefresh={() => onRefresh(selected)}
                    />
                }
            >
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
