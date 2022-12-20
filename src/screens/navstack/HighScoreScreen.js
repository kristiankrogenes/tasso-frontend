import * as React from 'react';
import { StyleSheet, ScrollView, RefreshControl, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import ScoreListItem from '../../components/ScoreListItem';

import { fetchRoundScoresFromFireStore } from '../../firestore/queries';

import { useDispatch, useSelector  } from "react-redux";

export default function HighScoreScreen() {

    const thisUsersHomeClub = {
        id: useSelector((state) => state.user.value.home_club.id), 
        name: useSelector((state) => state.user.value.home_club.name)
    };
    const courses = useSelector((state) => state.golfCourses.value);
    const dropDownGolfCourses = courses.map(course => ({key: course.id, value: course.name}));

    const [refreshing, setRefreshing] = React.useState(false);

    const [roundScores, setRoundScores] = React.useState([]);

    const [selected, setSelected] = React.useState(thisUsersHomeClub.id);

    React.useEffect(() => {
        getRoundScoresData(selected);
    }, [selected]);

    const onRefresh = React.useCallback((gc_selected) => {
        setRefreshing(true);
        const updateScores = async () => await getRoundScoresData(gc_selected).then(() => setRefreshing(false));
        updateScores();
    }, []);

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
                    defaultOption={{key: thisUsersHomeClub.id, value: thisUsersHomeClub.name}}
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
