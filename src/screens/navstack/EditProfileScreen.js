import * as React from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { useIsFocused } from '@react-navigation/native';

import { fetchGolfCoursesFromFireStore, updateUserDoc } from '../../firestore/queries';

function EditProfileScreen({ route, navigation }) {
    const [user, setUser] = React.useState({});
    const [email, setEmail] = React.useState('');
    const [name, setName] = React.useState('');
    const [handicap, setHandicap] = React.useState('');
    const [homeClub, setHomeClub] = React.useState('');

    const [golfCourses, setGolfCourses] = React.useState([]);
    const [dropDownGolfCourses, setDropDownGolfCourses] = React.useState([]);

    const isFocused = useIsFocused();

    React.useEffect(() => {
        setName(route.params.name);
        setHandicap(route.params.hcp);
        setHomeClub(route.params.home_club);
        getAndSetGolfCoursesData();
    }, [isFocused]);

    const getAndSetGolfCoursesData = async () => {
        const golfCoursesData = await fetchGolfCoursesFromFireStore();
        setGolfCourses(golfCoursesData);
        setDropDownGolfCourses(golfCoursesData.map(course => (
            {key: course.id, value: course.name}
        )));
    }

    const handleSaveButton = async () => {
        const docUpdated = await updateUserDoc({uid: route.params.id, name: name, hcp: handicap, club: homeClub});
        if (docUpdated) {
            navigation.navigate("Profile");
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            onPress={() => {Keyboard.dismiss}}
        >
            <View style={{width: "100%"}}>
                <View style={{width: "100%", borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                    <Text>Account Details</Text>
                </View>
                
                <View style={styles.inputContainer}>
                    <View style={styles.inputBox}>
                        <Text>Email</Text>
                        <TextInput
                            placeholder={email}
                            value={email}
                            // onChangeText={text => setEmail(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text>Full Name</Text>
                        <TextInput
                            placeholder={name}
                            value={name}
                            onChangeText={text => setName(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text>Hcp</Text>
                        <TextInput
                            placeholder={handicap}
                            value={handicap}
                            onChangeText={text => setHandicap(text)}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <Text>Home Club</Text>
                        <SelectList 
                            setSelected={(val) => setHomeClub(val)} 
                            data={dropDownGolfCourses} 
                            save="key"
                            // dropdownShown={False}
                            maxHeight={200}
                        />
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSaveButton}
                >
                    <Text style={{fontSize: 25}}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Profile")}
                >
                    <Text style={{fontSize: 25}}>Go Back</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 40,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#a6d7de",
    width: "100%",
    padding: 10,
    margin: 5,
    borderRadius: 10
  },
  inputContainer: {
    width: '100%'
  },
  inputBox: {
    width: "100%",
    marginTop: 10
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
})