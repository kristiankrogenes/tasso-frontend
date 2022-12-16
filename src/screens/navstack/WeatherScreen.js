import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Keyboard, ScrollView, Alert } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'
import { useIsFocused } from '@react-navigation/native';

import { fetchGolfCoursesFromFireStore } from '../../firestore/queries';
import { fetchWeatherFromLonLat } from '../../api/weatherAPI';

import WeatherListItem from '../../components/WeatherListItem';

function WeatherScreen({ navigation }) {

    const isFocused = useIsFocused();

    const [weatherData, setWeatherData] = React.useState([]);
    const [golfCourses, setGolfCourses] = React.useState([]);
    const [dropDownGolfCourses, setDropDownGolfCourses] = React.useState([]);
    const [selected, setSelected] = React.useState("");

    React.useEffect(() => {
        getAndSetGolfCoursesData();
    }, [isFocused]);

    const getAndSetGolfCoursesData = async () => {
        const golfCoursesData = await fetchGolfCoursesFromFireStore();
        setGolfCourses(golfCoursesData);
        setDropDownGolfCourses(golfCoursesData.map(course => (
            {key: course.id, value: course.name}
        )));
    }

    const handleClickWeatherAPIButton = async () => {
        if (selected === "") {
            console.log("NOT.")
            createAlert();
        } else {
            console.log("YES.")
            const courseToCheck = golfCourses.find(course => {
                return course.id === selected
            });
            const lat = courseToCheck.lat;
            const lon = courseToCheck.lon;
            const weather = await fetchWeatherFromLonLat(lat, lon);
            setWeatherData(weather);
        }
    }

    const createAlert = () =>
        Alert.alert(
            "Not valid place",
            "You have to choose a course to check the weather.",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        );

    return (
        <View style={styles.weatherContainer}>
            <View style={styles.dropdownContainer}>
                <SelectList 
                    setSelected={(val) => setSelected(val)} 
                    data={dropDownGolfCourses} 
                    save="key"
                    placeholder="Choose club"
                    maxHeight={200}
                />
            </View>
            {/* <View style={{display: "flex", flexDirection: "row"}}>
                <Text>Time</Text>
                <Text>Weather</Text>
                <Text>Temp.</Text>
                <Text>Precip mm.</Text>
                <Text>Wind(Gust) m/s</Text>
            </View> */}

            <ScrollView 
                style={styles.scrollViewBox}
            >
                {weatherData.map((weather) => {
                    
                    return (
                        <View key={weather.id_key} style={{width: "100%", alignItems: "center", marginTop: 5}}>
                            {weather.isNewDate ? <Text style={{margin: 10}}>{weather.date.slice(0, 10)}</Text> : <></>}
                            <WeatherListItem 
                                hour={weather.date.slice(-2)}
                                weatherIconCode={weather.icon}
                                temp={weather.temp}
                                precip={weather.precip}
                                windSpeed={weather.wind_speed}
                                windGustSpeed={weather.wind_gust_speed}
                                windDirection={weather.wind_direction}
                                weatherDescription={weather.weather_description}
                            />
                        </View>
                    );
                })}
            </ScrollView>

            <View style={{width: "100%"}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleClickWeatherAPIButton}
                >
                    <Text style={{fontSize: 25}}>Check Weather</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={{fontSize: 25}}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default WeatherScreen;

const styles = StyleSheet.create({
    weatherContainer: {
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        margin: 10,
    },
    dropdownContainer: {
        width: '100%',

    },
    button: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#a6d7de",
        padding: 10,
        marginBottom: 20,
        borderRadius: 10
    },
    scrollViewBox: {
        width: '100%',
        marginBottom: 20
    },
});